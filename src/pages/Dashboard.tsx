import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import React from "react";
import { useActiveAccount } from "thirdweb/react";
import { toast } from "react-toastify";
import { Loader2, UserPlus, Wallet } from "lucide-react";
import { client } from "../client";
import { defineChain } from "thirdweb/chains";

function Dashboard({ onSuccess }: { onSuccess?: () => void }) {
  const [_name, setName] = React.useState<string>("");
  const [_age, setAge] = React.useState<number>();
  const account = useActiveAccount();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const contract = getContract({
    client,
    chain: defineChain(11155111),
    address: import.meta.env.VITE_APP_CONTRACT_ADDRESS,
  });

  console.log("contract: ", contract);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) {
      toast.error("Please connect your wallet first.");
      return;
    }
    if (!_name.trim() || _age <= 0) {
      toast.error("Please provide valid name and age.");
      return;
    }

    setIsSubmitting(true);
    try {
      const transaction = await prepareContractCall({
        contract,
        method:
          "function createPerson(string _name, uint256 _age) returns (bool)",
        params: [_name, BigInt(_age)],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      console.log("Transaction hash:", transactionHash);
      setName("");
      setAge(0);
      toast.success("Person created successfully! Transaction pending...");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error executing contract function:", error);
      toast.error("Error creating person. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = _name.trim() && _age > 0;
  const isButtonDisabled = !isFormValid || isSubmitting || !account;

  return (
    <div
      className="flex items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-2 sm:px-4 lg:px-8"
      style={{ background: "rgba(0, 0, 0, 0.05)" }}
    >
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <UserPlus className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Person
          </h1>
          <p className="text-gray-600">
            Add a new person to the blockchain network
          </p>
        </div>

        {!account && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center">
            <Wallet className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800 text-sm">
              Please connect your wallet to continue
            </p>
          </div>
        )}

        <div className="bg-gray-800 bg-shadow-white rounded-xl shadow-lg text-gray-300 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Name *
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter person's name"
                value={_name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Age *
              </label>
              <input
                id="age"
                type="number"
                placeholder="Enter age"
                min="0"
                max="150"
                value={_age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`
                w-full py-3 px-4 rounded-lg font-medium transition-all duration-200
                ${
                  isButtonDisabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-green-600 hover:cursor-pointer text-white hover:from-green-700 hover:to-indigo-700 transform hover:scale-105"
                }
                flex items-center justify-center space-x-2
              `}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Person...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Create Person</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            This transaction will be recorded on the Ethereum Sepolia testnet
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
