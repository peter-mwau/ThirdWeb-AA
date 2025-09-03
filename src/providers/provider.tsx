import React, { createContext, useContext, useEffect } from "react";
import { getContract } from "thirdweb";
import { client } from "../client";
import { defineChain } from "thirdweb/chains";

const ContractContext = createContext<any>(null);

export function useContract() {
  return useContext(ContractContext);
}

export function ContractProvider({ children }: { children: React.ReactNode }) {
  const contract = getContract({
    client,
    chain: defineChain(11155111),
    address: import.meta.env.VITE_APP_CONTRACT_ADDRESS,
  });

  useEffect(() => {
    console.log("ContractProvider - contract: ", contract);
  }, [contract]);

  return (
    <ContractContext.Provider value={contract}>
      {children}
    </ContractContext.Provider>
  );
}
