"use client";

import "../styles/globals.css";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "../lib/wagmi";
import { AuthKitProvider } from "@farcaster/auth-kit";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Base App Verification */}
        <meta
          name="base:app_id"
          content="697efc162aafa0bc9ad8a3c4"
        />
      </head>

      <body>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <AuthKitProvider
              config={{
                domain: "exiros.vercel.app", // ⚠️ change if your domain is different
                siweUri: "https://exiros.base.vercel.app",
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
