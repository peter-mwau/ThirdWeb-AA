import { ConnectButton, darkTheme } from "thirdweb/react";
import { client } from "../client";
import viteLogo from "/vite.svg";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";

function Navbar({
  currentPage,
  setCurrentPage,
  darkMode,
}: {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  darkMode: boolean;
}) {
  const wallets = [
    inAppWallet({
      // available auth methods
      auth: { options: ["discord", "passkey", "google", "github", "facebook"] },
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
      className="flex flex-row justify-between items-center p-4 bg-gray-900/70 text-white fixed top-4 left-1/2 transform -translate-x-1/2 w-[95vw] max-w-4xl rounded-xl shadow-lg z-50"
      style={{ backdropFilter: "blur(8px)" }}
    >
      <img src={viteLogo} alt="Logo" className="h-8 w-8" />
      <div className="hidden md:flex items-center space-x-8">
        {[
          { name: "Home", page: "home" },
          { name: "Test", page: "test" },
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => setCurrentPage && setCurrentPage(item.page)}
            className={`relative transition-all duration-300 group font-medium py-2
                  ${
                    currentPage === item.page
                      ? "text-[#20ff96] font-semibold"
                      : "text-gray-300 hover:text-[#20ff96] font-normal"
                  }
                `}
          >
            {item.name}
            <span
              className={`absolute -bottom-0.5 left-0 h-0.5 transition-all duration-300
                    ${
                      currentPage === item.page
                        ? "bg-gradient-to-r from-[#20ff96] to-[#00cc75] w-full"
                        : "bg-gradient-to-r from-[#20ff96] to-[#00cc75] w-0 group-hover:w-full"
                    }
                  `}
            ></span>
          </button>
        ))}
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
