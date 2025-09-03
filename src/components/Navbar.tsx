import { ConnectButton, darkTheme } from "thirdweb/react";
import { client } from "../client";
import viteLogo from "/vite.svg";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";

function Navbar() {
  const wallets = [
    inAppWallet({
      // available auth methods
      auth: { options: ["discord", "passkey", "google", "github", "guest"] },
      // app metadata
      metadata: {
        name: "Test App",
        image: {
          src: "/public/vite.svg",
          width: 50,
          height: 50,
        },
      },
      // enable gasless transactions for the wallet
      executionMode: {
        mode: "EIP7702",
        sponsorGas: true,
      },
      smartAccount: {
        chain: sepolia,
        sponsorGas: true,
      },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
  ];
  return (
    <div
      className="flex flex-row justify-between items-center p-4 bg-gray-800 text-white fixed top-4 left-1/2 transform -translate-x-1/2 w-[95vw] max-w-4xl rounded-xl shadow-lg z-50"
      style={{ backdropFilter: "blur(8px)" }}
    >
      <img src={viteLogo} alt="Logo" className="h-8 w-8" />
      <div className="space-x-4">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/about" className="hover:underline">
          About
        </a>
        <a href="/contact" className="hover:underline">
          Contact
        </a>
      </div>
      <div>
        <ConnectButton
          client={client}
          wallets={wallets}
          theme={darkTheme({
            colors: {
              modalBg: "#1a1a1a",
            },
          })}
        />
      </div>
    </div>
  );
}

export default Navbar;
