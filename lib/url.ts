import qs from "query-string";

interface FormUrlParamsOptions {
  params: string;
  key: string;
  value: string;
}

export function formUrlParams({ params, key, value }: FormUrlParamsOptions) {
  const queryString = qs.parse(params);
  // { query: "test"}
  queryString[key] = value;
  // { query: "test", page: 1}
  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  });
  // query=test&page=1
}

interface RemoveUrlParamsOptions {
  params: string;
  keysToRemove: string[];
}

export function removeUrlParams({
  params,
  keysToRemove,
}: RemoveUrlParamsOptions) {
  const queryString = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete queryString[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: queryString,
    },
    { skipNull: true },
  );
}
