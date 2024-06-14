import { useEffect, useState } from "react";

function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(
    url => {
      const fetchData = async () => {
        try {
          const response = await fetch(url,options);
          const data = await response.data();
          setIsLoading(false);
          setData(data);
        } catch (error) {
          setError(error);
          setIsLoading(false);
        }
      };
      fetchData();
    },
    [url]
  );
  return { data, isLoading, error };
}

export default useFetch;
