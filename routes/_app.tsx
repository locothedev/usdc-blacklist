// routes/_app.tsx
/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";

export default function App(props: AppProps) {
  return (
    <>
      <Head>
        <title>USDC BRRRRR</title>
        <meta
          name="description"
          content="See latest USDC centralized actions. Blacklisted Wallets. New Mints. Top Holders and much more!"
        />
        <link href="/style.css" rel="stylesheet" />
        <link rel="icon" type="image/x-icon" href="/logo.svg" />
      </Head>
      <div id="layout" style={{ padding: 16 }}>
        <props.Component />
      </div>
    </>
  );
}
