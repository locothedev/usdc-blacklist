#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import { MORALIS_WEB3_API_KEY } from "./config/env.ts";
import { callMoralisApi, isValidKey } from "./utils/api.ts";

if (!MORALIS_WEB3_API_KEY) {
  console.error("MORALIS_WEB3_API_KEY is not set");
  Deno.exit(1);
} else {
  const checkValidApiKey = await callMoralisApi<{ version: string }>(
    "/web3/version",
    "GET"
  );

  if (!isValidKey(checkValidApiKey)) {
    console.error("Invalid MORALIS_WEB3_API_KEY");
    Deno.exit(1);
  } else {
    console.log("Valid MORALIS_WEB3_API_KEY");
  }
}

await dev(import.meta.url, "./main.ts");
