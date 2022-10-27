import { useEffect, useState } from "react";
import type { PassingData } from "../types/dataTypes";

const useFetchData = () => {
  const [data, setData] = useState<PassingData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const URL = 'https://flask-nfl-stats-api.onrender.com';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/passing`);

        if (!response.ok) {
          const message = `${response.status} ${response.statusText}`;
          throw new Error(message);
        }

        const data = await response.json();
        setData(data.data);
        setLoading(false);

      } catch (err: any) {
        // only network errors (so throw error from above check)
        console.error(err);
        setError(`An error has occurred - ${err}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;
