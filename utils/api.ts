import { MORALIS_WEB3_API_KEY } from "../config/env.ts";

const BASE_URL = "https://deep-index.moralis.io/api/v2";

export const callMoralisApi = async <T>(
  path: string,
  method: string,
  body?: any
): Promise<T | { error: boolean }> => {
  const req = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": `${MORALIS_WEB3_API_KEY}`,
    },
    method,
    body: method === "GET" ? undefined : JSON.stringify(body),
  });
  if ([401, 400, 500].includes(req.status)) return { error: true };
  const result: T = await req.json();
  return result;
};

// deno-lint-ignore no-explicit-any
export const isError = (data: any): data is { error: boolean } =>
  "error" in data;
// deno-lint-ignore no-explicit-any
export const isValidKey = (data: any): data is { version: string } =>
  "version" in data;
