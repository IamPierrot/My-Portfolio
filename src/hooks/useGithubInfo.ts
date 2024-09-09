import { useState, useEffect, useCallback, useMemo } from 'react';
import { Octokit } from "octokit";
import Response from "../types/Response";

const apiKey = import.meta.env.TOKEN;

const author = { name: "IamPierrot", token: apiKey };

export const useGithubInfo = () => {
  const [result, setResult] = useState<Response[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const octokit = useMemo(() => new Octokit({ auth: author.token }), []);

  const fetchGithubInfo = useCallback(async () => {
    try {
      setLoading(true);
      const response = await octokit.request("GET /users/{username}/repos", {
        username: author.name,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
        per_page: 100,
      });
      setResult(response.data.filter((repo) => !repo.fork));
      setError(null);
    } catch (err) {
      setError('Failed to fetch GitHub information');
    } finally {
      setLoading(false);
    }
  }, [octokit]);

  useEffect(() => {
    fetchGithubInfo();
  }, [fetchGithubInfo]);

  return { result, loading, error };
};
