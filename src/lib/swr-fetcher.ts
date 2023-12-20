const swrFetcher = async (...args: any[]) => {
  return fetch(...(args as [RequestInfo, RequestInit])).then(res => res.json());
};

export default swrFetcher;
