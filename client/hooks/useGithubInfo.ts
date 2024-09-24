import { useState, useEffect, useMemo } from 'react';
import { Octokit } from "octokit";
import { RespositoryResponse, UserInfoResponse } from "../types/Response";
import config from '../config';

const apiKey = config.GITHUB_TOKEN;

const author = { name: "IamPierrot", token: apiKey };


const fetchData = async (requestFunc: () => Promise<any>, setResult: Function, setError: Function, abortController: AbortController) => {
  try {
    const response = await requestFunc();
    if (!abortController.signal.aborted) {
      setResult(response.data);
      setError(null);
    }
  } catch (err: any) {
    if (!abortController.signal.aborted) {
      const errorMessage = err?.message || 'An unknown error occurred';
      setError(`Failed to fetch data: ${errorMessage}`);
      console.error("Error:", err);
    }
  }
};

// Fetch Github Repos
export const useGithubRepos = () => {
  const octokit = useMemo(() => new Octokit({ auth: author.token, request: { timeout: 10000 } }), [author.token]);
  const [result, setResult] = useState<RespositoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchRepos = async () => {
      setIsLoading(true);
      await fetchData(
        () => octokit.request("GET /users/{username}/repos", {
          username: author.name,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
          type: 'all',
          sort: 'pushed',
          direction: 'desc',
          signal: abortController.signal,
        }),
        (data: RespositoryResponse[]) => {
          const filteredRepos = data.filter((repo: RespositoryResponse) => !repo.fork);
          setResult(filteredRepos);
        },
        setError,
        abortController
      );
      setIsLoading(false);
    };

    fetchRepos();

    return () => abortController.abort();
  }, []);

  return { result, isLoading, error };
};

export const useGithubInfo = () => {
  const octokit = useMemo(() => new Octokit({ auth: author.token, request: { timeout: 10000 } }), [author.token]);
  const [result, setResult] = useState<UserInfoResponse | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchUserInfo = async () => {
      setIsLoading(true);
      await fetchData(
        () => octokit.request("GET /users/{username}", {
          username: author.name,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
          signal: abortController.signal,
        }),
        (data: UserInfoResponse) => setResult(data),
        setError,
        abortController
      );
      setIsLoading(false);
    };

    fetchUserInfo();

    return () => abortController.abort();
  }, []);

  return { result, isLoading, error };
};
