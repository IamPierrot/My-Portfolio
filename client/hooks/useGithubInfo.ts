import { useState, useEffect, useCallback, useMemo } from 'react';
import { Octokit } from "octokit";
import { RespositoryResponse, UserInfoResponse } from "../types/Response";

const apiKey = import.meta.env.TOKEN;

const author = { name: "IamPierrot", token: apiKey };

const octokit = new Octokit({ auth: author.token });

export const useOctokitRequest = <T>(
  route: string,
  options?: Record<string, any>
) => {
  const [result, setResult] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await octokit.request(route, options);
      setResult(response.data);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch data: ${err}`);
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [route, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { result, isLoading, error };
};

export const useGithubRepos = () => {
  const { result, error } = useOctokitRequest<RespositoryResponse[]>(
    "GET /users/{username}/repos",
    {
      username: author.name,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      per_page: 100,
      type: 'all'
    }
  );

  const filteredResult = useMemo(() => {
    return result?.filter((repo) => !repo.fork) || [];
  }, [result]);

  return { result: filteredResult, error };
};

export const useGithubInfo = () => {
  const { result, error } = useOctokitRequest<UserInfoResponse>(
    "GET /users/{username}",
    {
      username: author.name,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  return { result, error };
};
