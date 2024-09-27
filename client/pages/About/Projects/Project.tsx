import React, { useState, useEffect, useCallback } from "react";
import { useGithubRepos } from "../../../hooks/useGithubInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { BlockLoading } from "../../../components";
import { RespositoryResponse } from "../../../types/Response";

const Projects: React.FC = () => {
  const { result, isLoading } = useGithubRepos();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResult, setFilteredResult] = useState(result);

  useEffect(() => {
    setFilteredResult(
      result?.filter((repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [result, searchTerm]);

  const formatLastCommitTime = (lastPushDate: string) => {
    const now = new Date();
    const lastPush = new Date(lastPushDate);
    const diffInSeconds = Math.floor(
      (now.getTime() - lastPush.getTime()) / 1000,
    );

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };

  const getLanguageColor = useCallback((language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: "bg-yellow-600",
      TypeScript: "bg-blue-600",
      Python: "bg-green-600",
      Java: "bg-red-600",
      CSS: "bg-pink-600",
      "C#": "bg-purple-600",
      "C++": "bg-indigo-600",
    };
    return colors[language] || "bg-gray-600";
  }, []);

  if (isLoading) return <BlockLoading />;

  return (
    <div className="flex flex-col text-white">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="mb-4 flex items-center justify-between">
            <SearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RepoStats
              totalPublicRepos={
                filteredResult?.filter((repo) => !repo.private).length || 0
              }
              mostUsedLanguage={getMostUsedLanguage(filteredResult)}
            />
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full table-fixed overflow-hidden rounded-xl">
              <TableHeader />
              <tbody className="divide-y divide-gray-700">
                {filteredResult
                  ?.filter((repo) => !repo.private)
                  .map((repo, index) => (
                    <RepoRow
                      key={repo.id}
                      repo={repo}
                      index={index}
                      getLanguageColor={getLanguageColor}
                      formatLastCommitTime={formatLastCommitTime}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <div className="relative text-gray-400 focus-within:text-gray-300">
    <div className="pointer-events-none absolute inset-y-0 left-1 flex items-center pl-3">
      <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
    </div>
    <input
      type="text"
      className="shadow-xs block h-11 w-80 rounded-full border border-gray-700 bg-gray-800 py-2.5 pl-12 pr-5 text-base font-normal text-white placeholder-gray-500 focus:outline-none"
      placeholder="Search for repository"
      value={value}
      onChange={onChange}
    />
  </div>
);

interface RepoStatsProps {
  totalPublicRepos: number;
  mostUsedLanguage: string;
}

const RepoStats: React.FC<RepoStatsProps> = ({
  totalPublicRepos,
  mostUsedLanguage,
}) => (
  <div className="rounded-lg bg-gray-800 p-4 text-right">
    <p className="text-sm font-semibold text-gray-300">
      Total Public Respositories: {totalPublicRepos}
    </p>
    <p className="text-sm font-semibold text-gray-300">
      Most Used Language: {mostUsedLanguage}
    </p>
  </div>
);

const TableHeader: React.FC = () => (
  <thead>
    <tr className="bg-gray-800">
      <th className="w-1/4 p-5 text-left text-sm font-bold capitalize leading-6 text-gray-300">
        Repository
      </th>
      <th className="w-1/5 p-5 text-left text-sm font-bold capitalize leading-6 text-gray-300">
        Owner
      </th>
      <th className="w-1/6 p-5 text-left text-sm font-bold capitalize leading-6 text-gray-300">
        Stars
      </th>
      <th className="w-1/6 p-5 text-left text-sm font-bold capitalize leading-6 text-gray-300">
        Language
      </th>
      <th className="w-1/5 p-5 text-left text-sm font-bold capitalize leading-6 text-gray-300">
        Last Commit
      </th>
    </tr>
  </thead>
);

interface RepoRowProps {
  repo: RespositoryResponse;
  index: number;
  getLanguageColor: (language: string) => string;
  formatLastCommitTime: (lastPushDate: string) => string;
}

const RepoRow: React.FC<RepoRowProps> = ({
  repo,
  index,
  getLanguageColor,
  formatLastCommitTime,
}) => (
  <motion.tr
    className={`group font-extrabold transition-all duration-500 hover:bg-gray-900 ${getLanguageColor(repo.language || "")}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    <td className="truncate p-5 text-sm font-bold leading-6 text-gray-800 group-hover:text-white">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="group-hover:text-white group-hover:underline"
      >
        {repo.name}
      </a>
    </td>
    <td className="truncate p-5 text-sm leading-6 text-gray-800 group-hover:text-white">
      {repo.owner.login}
      {repo.owner.login !== "IamPierrot" && " (collab)"}
    </td>
    <td className="truncate p-5 text-sm leading-6 text-gray-800 group-hover:text-white">
      <FontAwesomeIcon icon={faStar} className="mr-1 text-yellow-500" />
      {repo.stargazers_count}
    </td>
    <td className="truncate p-5 text-sm leading-6 text-gray-800 group-hover:text-white">
      {repo.language || "N/A"}
    </td>
    <td className="truncate p-5 text-sm leading-6 text-gray-800 group-hover:text-white">
      {formatLastCommitTime(repo.pushed_at || "")}
    </td>
  </motion.tr>
);

const getMostUsedLanguage = (
  repos: RespositoryResponse[] | undefined,
): string => {
  if (!repos) return "N/A";
  const languageCounts: { [key: string]: number } = repos
    .filter((repo) => !repo.private)
    .reduce((acc: { [key: string]: number }, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});
  const sortedLanguages = Object.entries(languageCounts).sort(
    (a, b) => b[1] - a[1],
  );
  return sortedLanguages[0]?.[0] || "N/A";
};

export default Projects;
