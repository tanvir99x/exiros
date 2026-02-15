"use client";

import "../styles/globals.css";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "../lib/wagmi";
import { AuthKitProvider } from "@farcaster/auth-kit";
import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

const queryClient = new QueryClient();

function MiniAppReady() {
  useEffect(() => {
    async function init() {
      try {
        await sdk.actions.ready();
        console.log("Mini App Ready ✅");
      } catch (err) {
        console.log("Not inside Farcaster");
      }
    }

    init();
  }, []);

  return null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="base:app_id"
          content="697efc162aafa0bc9ad8a3c4"
        />
      </head>

      <body>
        <MiniAppReady />

        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <AuthKitProvider
              config={{
                domain: "exiros.vercel.app",
                siweUri: "https://exiros.vercel.app",
                relay: "https://relay.farcaster.xyz",
                rpcUrl: "https://mainnet.optimism.io",
              }}
            >
              {children}
            </AuthKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
