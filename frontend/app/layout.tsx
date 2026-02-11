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
      <body>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <AuthKitProvider
              config={{
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
