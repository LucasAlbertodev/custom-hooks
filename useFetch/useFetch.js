import { useState, useEffect } from "react";

const localCache = {

}

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getFetch();
  }, [url]);

  const setLoadingState = () => {
    setState({ ...state, isLoading: true });
  };

  const getFetch = async () => {
    if (localCache[url]) {
      console.log(('usando cache'))
      setState({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        error: null,
      })
      return;
    }
    setLoadingState();

    const res = await fetch(url);

    //sleep
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (!res.ok) {
      setState({
        data: null,
        isloading: false,
        hasError: true,
        error: {
          code: res.status,
          message: `An error occurred while fetching data: ${res.statusText}`,
        },
      });
      return;
    }

    const data = await res.json();
    setState({
      data,
      isLoading: false,
      hasError: false,
      error: null,
    });

    localCache[url]=data;

    console.log(data);
  };

  return {
    data: state.data,
    isLoading: state.loading,
    hasError: state.error,
  };
};
