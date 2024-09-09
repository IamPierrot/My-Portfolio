import React, { useState, useEffect } from "react";
import { useGithubInfo } from "../../../hooks/useGithubInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import { Loading } from "../../../components";
import { motion } from "framer-motion";

const Projects: React.FC = () => {
  const { result, loading } = useGithubInfo();
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
      JavaScript: "bg-yellow-100",
      TypeScript: "bg-blue-100",
      Python: "bg-green-100",
      Java: "bg-red-100",
      CSS: "bg-pink-100",
      "C#": "bg-purple-100",
      "C++": "bg-indigo-100",
    };
    return colors[language] || "bg-gray-100";
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="relative mb-4 text-gray-500 focus-within:text-gray-900">
                <div className="mb-4 flex items-center justify-between">
                  <div className="relative text-gray-500 focus-within:text-gray-900">
                    <div className="pointer-events-none absolute inset-y-0 left-1 flex items-center pl-3">
                      <FontAwesomeIcon
                        icon={faSearch}
                        className="text-gray-400"
                      />
                    </div>
                    <input
                      type="text"
                      id="default-search"
                      className="shadow-xs block h-11 w-80 rounded-full border border-gray-300 bg-transparent py-2.5 pl-12 pr-5 text-base font-normal text-gray-900 placeholder-gray-400 focus:outline-none"
                      placeholder="Search for repository"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="rounded-lg bg-gray-100 p-4 text-right">
                    <p className="text-sm font-semibold text-gray-700">
                      Total Public Repos:{" "}
                      {filteredResult?.filter((repo) => !repo.private).length ||
                        0}
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
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
                      <tr className="bg-gray-50">
                        <th
                          scope="col"
                          className="w-1/4 p-5 text-left text-sm font-semibold capitalize leading-6 text-gray-900"
                        >
                          Repository
                        </th>
                        <th
                          scope="col"
                          className="w-1/5 p-5 text-left text-sm font-semibold capitalize leading-6 text-gray-900"
                        >
                          Owner
                        </th>
                        <th
                          scope="col"
                          className="w-1/6 p-5 text-left text-sm font-semibold capitalize leading-6 text-gray-900"
                        >
                          Stars
                        </th>
                        <th
                          scope="col"
                          className="w-1/6 p-5 text-left text-sm font-semibold capitalize leading-6 text-gray-900"
                        >
                          Language
                        </th>
                        <th
                          scope="col"
                          className="w-1/5 p-5 text-left text-sm font-semibold capitalize leading-6 text-gray-900"
                        >
                          Last Commit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                      {filteredResult
                        ?.filter((repo) => !repo.private)
                        .map((repo, index) => (
                          <motion.tr
                            key={repo.id}
                            className={`transition-all duration-500 hover:bg-gray-50 ${getLanguageColor(repo.language || "")}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <td className="truncate p-5 text-sm font-bold leading-6 text-gray-900">
                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {repo.name}
                              </a>
                            </td>
                            <td className="truncate p-5 text-sm font-medium leading-6 text-gray-900">
                              {repo.owner.login}
                            </td>
                            <td className="truncate p-5 text-sm font-medium leading-6 text-gray-900">
                              <FontAwesomeIcon
                                icon={faStar}
                                className="mr-1 text-yellow-400"
                              />
                              {repo.stargazers_count}
                            </td>
                            <td className="truncate p-5 text-sm font-medium leading-6 text-gray-900">
                              {repo.language || "N/A"}
                            </td>
                            <td className="truncate p-5 text-sm font-medium leading-6 text-gray-900">
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
      )}
    </>
  );
};

export default Projects;
