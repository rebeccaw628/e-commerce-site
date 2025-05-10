import { useEffect, useState } from "react";
import { type ProductDbResponse } from "../services/product-services";

export interface useQueryParams<A extends unknown[] = unknown[]> {
  fetchFn: (...args: A) => Promise<ProductDbResponse>[];
  args?: A;
  dependencies?: unknown[];
}

export default function useQuery(params: useQueryParams) {
  const [data, setData] = useState<ProductDbResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchStatus, setFetchStatus] = useState<
    "LOADING" | "SUCCESS" | "FAILURE" | "PENDING"
  >("PENDING");

  const { fetchFn, args = [], dependencies = [] } = params;

  const fetchData = (firstFetch: boolean) => {
    firstFetch && setFetchStatus("LOADING");
    fetchFn(...args)
      .then((result) => {
        setFetchStatus("SUCCESS");
        setData(result);
      })
      .catch((err) => {
        setFetchStatus("FAILURE");
        setError(err);
      });
  };
  useEffect(() => {
    fetchData(true);
  }, dependencies);

  return {
    reset: fetchData,
    data,
    error,
    isSuccess: fetchStatus === "SUCCESS",
    isFail: fetchStatus === "FAILURE",
    isLoading: fetchStatus === "LOADING",
  };
}
