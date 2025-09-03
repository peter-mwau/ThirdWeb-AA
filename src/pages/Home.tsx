import {
  //   CheckoutWidget,
  useActiveAccount,
  useWalletBalance,
} from "thirdweb/react";
import { client } from "../client";
import { sepolia } from "thirdweb/chains";

function Home() {
  const account = useActiveAccount();
  const { data: balance } = useWalletBalance({
    client,
    chain: sepolia,
    address: account?.address,
  });
  return (
    <div className="h-[100vh] flex items-center justify-center bg-gray-200">
      <h1 className="text-3xl font-semibold italic pt-[100px]">Home Page</h1>
      <p>Wallet address: {account?.address || "Not Connected"}</p>
      <p>
        Wallet balance: {balance?.displayValue} {balance?.symbol}
      </p>
      {/* <BuyWidget
        client={client}
        chain={base}
        amount="0.01"
        title="Get funds"
        // ... theme, onSuccess, onError, etc.
      /> */}
      {/* <CheckoutWidget
        client={client}
        chain={base}
        amount="0.001" // in native tokens (ETH), pass tokenAddress to charge in a specific token (USDC, USDT, etc.)
        seller="0x123...abc" // the wallet address that will receive the payment
        name="Premium Course"
        description="Complete guide to web3 development"
        image="/public/mine.jpeg"
        onSuccess={() => {
          alert("Purchase successful!");
        }}
      /> */}
      ;
    </div>
  );
}

export default Home;
