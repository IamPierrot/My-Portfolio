import { useState, useEffect } from 'react';
import { Octokit } from "octokit";
import { RespositoryResponse, UserInfoResponse } from "../types/Response";

const apiKey = import.meta.env.TOKEN;

const author = { name: "IamPierrot", token: apiKey };

const octokit = new Octokit({ auth: author.token, request: { timeout: 10000 } });

export const useGithubRepos = () => {
  const [result, setResult] = useState<RespositoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      setIsLoading(true);
      try {
        const response = await octokit.request("GET /users/{username}/repos", {
          username: author.name,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
          type: 'all',
          sort: 'pushed',
          direction: 'desc'
        });
        const filteredRepos = response.data.filter((repo: RespositoryResponse) => !repo.fork);
        setResult(filteredRepos);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch repositories: ${err}`);
        console.error("Error fetching repositories:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return { result, isLoading, error };
};

export const useGithubInfo = () => {
  const [result, setResult] = useState<UserInfoResponse | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      try {
        const response = await octokit.request("GET /users/{username}", {
          username: author.name,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });
        console.log(response.data);
        setResult(response.data as UserInfoResponse);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch user info: ${err}`);
        console.error("Error fetching user info:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return { result, isLoading, error };
};
