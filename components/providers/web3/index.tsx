import { createContext, FunctionComponent, useContext, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Web3Context = createContext<any>(null);

interface Web3ProviderProps {
  children: React.ReactNode;
}

const Web3Provider: FunctionComponent<Web3ProviderProps> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState({ test: ' Hello provider!' });

  return (
    <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
  );
};

export function useWeb3() {
  return useContext(Web3Context);
}

export default Web3Provider;
