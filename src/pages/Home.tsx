import {
  CheckoutWidget,
  useActiveAccount,
  useWalletBalance,
  //   useConnectModal,
} from "thirdweb/react";
import { client } from "../client";
import { sepolia, base } from "thirdweb/chains";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Dashboard";
import {
  Wallet,
  Coins,
  UserPlus,
  X,
  ExternalLink,
  Home as HomeIcon,
} from "lucide-react";
import React from "react";
import { usePeople } from "../contexts/usePeople";

function Home() {
  const account = useActiveAccount();
  const people = usePeople();
  const { data: balance } = useWalletBalance({
    client,
    chain: sepolia,
    address: account?.address,
  });
  //   const { connect, isConnecting } = useConnectModal();
  const [showDashboard, setShowDashboard] = React.useState(false);

  //   const formatAddress = (address: string) => {
  //     return `${address.slice(0, 6)}...${address.slice(-4)}`;
  //   };

  console.log("Peaople: ", people);

  //   const openEtherscan = () => {
  //     if (account?.address) {
  //       window.open(
  //         `https://sepolia.etherscan.io/address/${account.address}`,
  //         "_blank"
  //       );
  //     }
  //   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 pt-[100px]">
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
      />
      {/* <CheckoutWidget
        client={client}
        chain={base}
        amount="0.01" // in native tokens (ETH), pass tokenAddress to charge in a specific token (USDC, USDT, etc.)
        seller="0x123...abc" // the wallet address that will receive the payment
        name="Premium Course"
        description="Complete guide to web3 development"
        image="/public/mine.jpeg"
        onSuccess={() => {
          alert("Purchase successful!");
        }}
      /> */}
      ;{/* Header */}
      {/* <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <HomeIcon className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Web3 Dashboard
              </h1>
            </div>

            {account ? (
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Connected
                </div>
                <button
                  onClick={openEtherscan}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                >
                  <span className="text-sm font-medium">
                    {formatAddress(account.address)}
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                disabled={isConnecting}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
              >
                <Wallet className="w-5 h-5" />
                <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
              </button>
            )}
          </div>
        </div>
      </header> */}
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Web3 Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your blockchain interactions, create smart contract records,
            and explore the possibilities of decentralized applications.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Wallet Status
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {account ? "Connected" : "Not Connected"}
                </p>
              </div>
              <Wallet className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Balance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {balance
                    ? `${balance.displayValue} ${balance.symbol}`
                    : "0 ETH"}
                </p>
              </div>
              <Coins className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Create Person Record
            </h3>
            <p className="text-gray-600 mb-6">
              Add a new person to the blockchain smart contract. This
              transaction will be recorded on the Sepolia testnet.
            </p>

            <button
              onClick={() => setShowDashboard(true)}
              disabled={!account}
              className={`
                bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg
                font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200
                flex items-center space-x-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <UserPlus className="w-5 h-5" />
              <span>Open Dashboard</span>
            </button>

            {!account && (
              <p className="text-sm text-red-600 mt-3">
                Please connect your wallet to access the dashboard
              </p>
            )}
          </div>
        </div>

        {/* People List */}
        <div className="mt-12">
          <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            People List
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-lg border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b text-left">ID</th>
                  <th className="px-4 py-2 border-b text-left">Name</th>
                  <th className="px-4 py-2 border-b text-left">Age</th>
                  <th className="px-4 py-2 border-b text-left">Creator</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(people) && people.length > 0 ? (
                  people.map((person: any) => (
                    <tr key={person.id.toString()} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">
                        {person.id.toString()}
                      </td>
                      <td className="px-4 py-2 border-b">{person.name}</td>
                      <td className="px-4 py-2 border-b">
                        {person.age.toString()}
                      </td>
                      <td className="px-4 py-2 border-b">
                        <span className="font-mono text-xs bg-gray-100 rounded px-2 py-1">
                          {person.creator}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No people found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">
              Using Sepolia Testnet
            </h4>
            <p className="text-blue-700">
              This application runs on the Ethereum Sepolia testnet. You'll need
              testnet ETH to perform transactions.
            </p>
          </div>
        </div>
      </main>
      {/* Dashboard Modal */}
      {showDashboard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Create Person
              </h3>
              <button
                onClick={() => setShowDashboard(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <Dashboard />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
