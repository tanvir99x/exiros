import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected(),
    walletConnect({
      projectId: "YOUR_WALLETCONNECT_PROJECT_ID"
    })
  ],
  transports: {
    [base.id]: http(),
  },
});
