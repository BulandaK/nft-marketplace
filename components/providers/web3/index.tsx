'use client';
import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createDefaultState, Web3State } from './utils';
import { BrowserProvider } from 'ethers/providers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Web3Context = createContext<Web3State>(createDefaultState());

interface Web3ProviderProps {
  children: React.ReactNode;
}

const Web3Provider: FunctionComponent<Web3ProviderProps> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  useEffect(() => {
    function initWeb3() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const provider = new BrowserProvider(window.ethereum as any);

      setWeb3Api({
        ethereum: window.ethereum,
        provider: null,
        contract: null,
        isLoading: false,
      });
    }

    initWeb3();
  }, []);

  return (
    <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
  );
};

export function useWeb3() {
  return useContext(Web3Context);
}

export default Web3Provider;
