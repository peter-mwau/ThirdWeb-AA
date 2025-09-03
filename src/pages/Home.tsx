import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { client } from "../client";
import { sepolia } from "thirdweb/chains";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Dashboard";
import { Wallet, Coins, UserPlus, X, ExternalLink } from "lucide-react";
import React, { useEffect } from "react";
import { usePeople } from "../contexts/usePeople";
import {
  defineChain,
  getContract,
  prepareContractCall,
  readContract,
} from "thirdweb";
import { sendTransaction } from "thirdweb";
import { toast } from "react-toastify";

function Home() {
  const account = useActiveAccount();
  const people = usePeople();
  const { data: balance } = useWalletBalance({
    client,
    chain: sepolia,
    address: account?.address,
  });

  const [showDashboard, setShowDashboard] = React.useState(false);
  const [isRemoving, setIsRemoving] = React.useState(false);
  const [removeId, setRemoveId] = React.useState<bigint | null>(null);
  const [removeName, setRemoveName] = React.useState<string>("");
  const [showRemoveModal, setShowRemoveModal] = React.useState(false);
  const [tokenBalance, setTokenBalance] = React.useState<string | null>(null);
  const [isTokenLoading, setIsTokenLoading] = React.useState(false);

  const contract = getContract({
    client,
    chain: defineChain(11155111),
    address: import.meta.env.VITE_APP_CONTRACT_ADDRESS,
  });

  //   const openEtherscan = () => {
  //     if (account?.address) {
  //       window.open(
  //         `https://sepolia.etherscan.io/address/${account.address}`,
  //         "_blank"
  //       );
  //     }
  //   };

  useEffect(() => {
    async function fetchTokenBalance() {
      if (!contract || !account?.address) {
        setTokenBalance(null);
        return;
      }
      setIsTokenLoading(true);
      try {
        const data = await readContract({
          contract,
          method: "function balanceOf(address account) view returns (uint256)",
          params: [account.address],
        });
        // Format balance (assume 18 decimals)
        const formatted = data ? (Number(data) / 1e18).toFixed(2) : "0.00";
        setTokenBalance(formatted);
      } catch (err) {
        console.error("Error fetching token balance: ", err);
        setTokenBalance(null);
      } finally {
        setIsTokenLoading(false);
      }
    }
    fetchTokenBalance();
  }, [account]);

  const removePerson = async () => {
    if (!contract || !account || removeId === null || !removeName) return;
    try {
      setIsRemoving(true);
      const transaction = await prepareContractCall({
        contract,
        method:
          "function removePerson(uint256 _id, string _name) returns (bool)",
        params: [removeId, removeName],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      console.log("Transaction hash:", transactionHash);
      toast.success("Person removed successfully! Transaction pending...");
      setShowRemoveModal(false);
      setRemoveId(null);
      setRemoveName("");
    } catch (error) {
      console.error("Error executing contract function:", error);
      toast.error(
        "Error removing person. " +
          (error instanceof Error ? error.message : String(error))
      );
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Background will be here from vanta.js */}

      {/* Main Content Overlay */}
      <div className="relative z-10 pt-8 pb-16 px-4">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName="bg-gray-800/90 backdrop-blur-sm text-white"
          progressClassName="bg-gradient-to-r from-indigo-500 to-purple-500"
        />

        {/* Header Section */}
        <header className="max-w-6xl mx-auto mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-down">
            Test
            <span className="text-transparent pl-2 bg-clip-text bg-gradient-to-r from-indigo-400 to-green-400">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Manage your blockchain interactions, create smart contract records,
            and explore the possibilities of decentralized applications.
          </p>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div
              className="bg-gray-900/70 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Wallet Status
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {account ? "Connected" : "Not Connected"}
                  </p>
                  {account && (
                    <div className="flex items-center mt-2">
                      <span className="text-xs font-mono text-gray-400 truncate max-w-[120px]">
                        {account.address.slice(0, 6)}...
                        {account.address.slice(-4)}
                      </span>
                      <ExternalLink className="w-3 h-3 ml-1 text-indigo-400" />
                    </div>
                  )}
                </div>
                <div className="p-3 bg-indigo-500/20 rounded-full">
                  <Wallet className="w-6 h-6 text-indigo-400" />
                </div>
              </div>
            </div>

            <div
              className="bg-gray-900/70 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    ETH Balance
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {balance?.displayValue.slice(0, 6)} ETH
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Sepolia Testnet</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-full">
                  <Coins className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>

            <div
              className="bg-gray-900/70 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Token Balance
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {isTokenLoading
                      ? "Loading..."
                      : tokenBalance !== null
                      ? `${tokenBalance} PNR`
                      : "0 PNR"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PNR Token</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-full">
                  <Coins className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div
            className="bg-gray-900/70 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserPlus className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Create Person Record
              </h3>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                Add a new person to the blockchain smart contract. This
                transaction will be recorded on the Sepolia testnet.
              </p>

              <button
                onClick={() => setShowDashboard(true)}
                disabled={!account}
                className={`
                  bg-gradient-to-r from-indigo-500 to-green-500 text-white px-8 py-4 rounded-xl
                  font-medium hover:from-green-600 hover:to-indigo-600 transition-all duration-300
                  flex items-center space-x-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed
                  shadow-lg hover:shadow-indigo-500/30 relative overflow-hidden group
                `}
              >
                <span className="absolute inset-0 bg-white/10 group-hover:bg-white/5 transition-all duration-300 transform group-hover:scale-110"></span>
                <UserPlus className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Open Dashboard</span>
              </button>

              {!account && (
                <p className="text-sm text-red-400 mt-4">
                  Please connect your wallet to access the dashboard
                </p>
              )}
            </div>
          </div>

          {/* People List */}
          <div
            className="bg-gray-900/70 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <h4 className="text-2xl font-bold text-white mb-6 text-center">
              People Records
            </h4>

            {Array.isArray(people) && people.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {people.map((person: any, index: number) => (
                  <div
                    key={person.id.toString()}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 animate-fade-in"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-mono px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">
                        ID: {person.id.toString()}
                      </span>
                      <button
                        onClick={() => {
                          setRemoveId(person.id);
                          setRemoveName(person.name);
                          setShowRemoveModal(true);
                        }}
                        disabled={isRemoving}
                        className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full hover:bg-red-500/30 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Remove
                      </button>
                    </div>

                    <h5 className="text-lg font-semibold text-white mb-2">
                      {person.name}
                    </h5>

                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span>Age: {person.age.toString()}</span>
                      <span className="text-xs font-mono truncate max-w-[100px]">
                        {person.creator.slice(0, 6)}...
                        {person.creator.slice(-4)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  No people records found
                </div>
                <p className="text-sm text-gray-500">
                  Add your first person using the dashboard
                </p>
              </div>
            )}
          </div>

          {/* Network Info */}
          <div
            className="mt-8 text-center animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="inline-flex items-center bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-300 rounded-full px-4 py-2 text-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
              Using Sepolia Testnet • Testnet ETH required for transactions
            </div>
          </div>
        </main>
      </div>

      {/* Dashboard Modal */}
      {showDashboard && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-gray-900/90 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-gray-700/30">
              <h3 className="text-xl font-semibold text-white">
                Create Person Record
              </h3>
              <button
                onClick={() => setShowDashboard(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700/50"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <Dashboard onSuccess={() => setShowDashboard(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Remove Confirmation Modal */}
      {showRemoveModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gray-900/90 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-2xl max-w-sm w-full p-6 animate-scale-in">
            <h3 className="text-lg font-bold text-white mb-4">
              Confirm Removal
            </h3>
            <p className="mb-6 text-gray-300">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-white">{removeName}</span>{" "}
              (ID:{" "}
              <span className="font-mono text-indigo-300">
                {removeId?.toString()}
              </span>
              )?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRemoveModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 font-medium hover:bg-gray-700 transition-colors"
                disabled={isRemoving}
              >
                Cancel
              </button>
              <button
                onClick={removePerson}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center"
                disabled={isRemoving}
              >
                {isRemoving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Removing...
                  </>
                ) : (
                  "Confirm Remove"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
