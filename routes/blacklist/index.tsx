/** @jsx h */
import { Handler, PageProps } from "https://deno.land/x/fresh@1.0.2/server.ts";
import { h } from "preact";
import { AbiBlacklist } from "../../utils/abi.ts";
import { callMoralisApi, isError } from "../../utils/api.ts";
import { getEllipsisTxt } from "../../utils/index.ts";

interface IBlacklistProps {
  total: number;
  page: number;
  page_size: number;
  result: Result[];
}

interface Result {
  transaction_hash: string;
  address: string;
  block_timestamp: string;
  block_number: string;
  block_hash: string;
  data: {
    _account: string;
  };
}

export const handler: Handler<IBlacklistProps> = async (_req, ctx) => {
  const result = await callMoralisApi<IBlacklistProps>(
    "/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/events?chain=eth&topic=Blacklisted%28address%29",
    "POST",
    AbiBlacklist
  );
  if (isError(result)) {
    return new Response("", {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }
  return ctx.render(result);
};

export default function Blacklist({ data }: PageProps<IBlacklistProps>) {
  return (
    <div style={{ textOverflow: "clip" }}>
      <h1 style={{ textOverflow: "wrap" }}>Latest Blacklistsed Wallets</h1>
      <h3>
        Current Blacklister:{" "}
        <a
          href={`https://etherscan.io/address/${data.result[0].address}`}
          target="_blank"
        >
          {getEllipsisTxt(data.result[0].address)}
        </a>
      </h3>
      <div style={{ display: "grid", gap: 32 }}>
        {data.result.map((event, index) => (
          <div
            key={`${event.transaction_hash}-${index}`}
            style={{
              display: "grid",
              gap: 12,
              padding: 16,
              border: "1px solid black",
              borderRadius: 15,
              maxWidth: 600,
              textOverflow: "clip",
              wordBreak: "break-word",
            }}
          >
            <span>
              <a
                href={`https://etherscan.io/address/${event.data._account}`}
                target="_blank"
              >
                {event.data._account}
              </a>
            </span>
            <a
              href={`https://etherscan.io/tx/${event.transaction_hash}`}
              target="_blank"
            >
              <strong>
                {new Date(event.block_timestamp).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </strong>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
