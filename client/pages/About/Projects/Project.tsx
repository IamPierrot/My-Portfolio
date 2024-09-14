import React, { useState, useEffect } from "react";
import { useGithubRepos } from "../../../hooks/useGithubInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const Projects: React.FC = () => {
  const { result } = useGithubRepos();
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

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: "bg-yellow-800",
      TypeScript: "bg-blue-800",
      Python: "bg-green-800",
      Java: "bg-red-800",
      CSS: "bg-pink-800",
      "C#": "bg-purple-800",
      "C++": "bg-indigo-800",
    };
    return colors[language] || "bg-gray-800";
  };

  return (
    <>
      <div className="flex flex-col text-white">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="relative mb-4 text-gray-400 focus-within:text-gray-300">
              <div className="mb-4 flex items-center justify-between">
                <div className="relative text-gray-400 focus-within:text-gray-300">
                  <div className="pointer-events-none absolute inset-y-0 left-1 flex items-center pl-3">
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="text-gray-500"
                    />
                  </div>
                  <input
                    type="text"
                    id="default-search"
                    className="shadow-xs block h-11 w-80 rounded-full border border-gray-700 bg-gray-800 py-2.5 pl-12 pr-5 text-base font-normal text-white placeholder-gray-500 focus:outline-none"
                    placeholder="Search for repository"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="rounded-lg bg-gray-800 p-4 text-right">
                  <p className="text-sm font-semibold text-gray-300">
                    Total Public Repos:{" "}
                    {filteredResult?.filter((repo) => !repo.private).length ||
                      0}
                  </p>
                  <p className="text-sm font-semibold text-gray-300">
                    Most Used Language:{" "}
                    {filteredResult
                      ? Object.entries(
                          filteredResult
                            .filter((repo) => !repo.private)
                            .reduce(
                              (acc, repo) => {
                                if (repo.language) {
                                  acc[repo.language] =
                                    (acc[repo.language] || 0) + 1;
                                }
                                return acc;
                              },
                              {} as { [key: string]: number },
                            ),
                        ).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="overflow-hidden">
                <table className="min-w-full table-fixed overflow-hidden rounded-xl">
                  <thead>
                    <tr className="bg-gray-800">
                      <th
                        scope="col"
                        className="w-1/4 p-5 text-left text-sm font-semibold capitalize leading-6 text-gray-300"
                      >
                        Repository
                      </th>
                      <th
                        scope="col"
                        className="w-1/5 p-5 text-left text-sm font-semibold capitalize leading-6 text-gray-300"
                      >
                        Owner
                      </th>
                      <th
                        scope="col"
                        className="w-1/6 p-5 text-left text-sm font-semibold capitalize leading-6 text-gray-300"
                      >
                        Stars
                      </th>
                      <th
                        scope="col"
                        className="w-1/6 p-5 text-left text-sm font-semibold capitalize leading-6 text-gray-300"
                      >
                        Language
                      </th>
                      <th
                        scope="col"
                        className="w-1/5 p-5 text-left text-sm font-semibold capitalize leading-6 text-gray-300"
                      >
                        Last Commit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredResult
                      ?.filter((repo) => !repo.private)
                      .map((repo, index) => (
                        <motion.tr
                          key={repo.id}
                          className={`transition-all duration-500 hover:bg-gray-800 ${getLanguageColor(repo.language || "")}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <td className="truncate p-5 text-sm font-bold leading-6 text-gray-300">
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {repo.name}
                            </a>
                          </td>
                          <td className="truncate p-5 text-sm font-medium leading-6 text-gray-300">
                            {repo.owner.login}
                            {repo.owner.login !== "IamPierrot" && " (collab)"}
                          </td>
                          <td className="truncate p-5 text-sm font-medium leading-6 text-gray-300">
                            <FontAwesomeIcon
                              icon={faStar}
                              className="mr-1 text-yellow-500"
                            />
                            {repo.stargazers_count}
                          </td>
                          <td className="truncate p-5 text-sm font-medium leading-6 text-gray-300">
                            {repo.language || "N/A"}
                          </td>
                          <td className="truncate p-5 text-sm font-medium leading-6 text-gray-300">
                            {formatLastCommitTime(repo.pushed_at || "")}
                          </td>
                        </motion.tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
