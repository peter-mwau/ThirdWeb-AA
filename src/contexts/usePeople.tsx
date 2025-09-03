import { readContract } from "thirdweb";
import { useContract } from "../providers/provider";
import React, { createContext, useContext, useEffect, useState } from "react";

type Person = {
  name: string;
  id: bigint;
  age: bigint;
  creator: string;
  exists: boolean;
};

const PeopleContext = createContext<Person[] | null>(null);

export function usePeople() {
  return useContext(PeopleContext);
}

export function PeopleProvider({ children }: { children: React.ReactNode }) {
  const contract = useContract();
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    async function fetchPeople() {
      if (!contract) return;
      try {
        const data = await readContract({
          contract,
          method:
            "function getAllPersons() view returns ((string name, uint256 id, uint256 age, address creator, bool exists)[])",
          params: [],
        });
        setPeople(data as Person[]);
      } catch (err) {
        setPeople([]);
      }
    }
    fetchPeople();
  }, [contract]);

  return (
    <PeopleContext.Provider value={people}>{children}</PeopleContext.Provider>
  );
}
