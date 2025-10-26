'use client';
import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  createDefaultState,
  createWeb3State,
  loadContract,
  Web3State,
} from './utils';
import { BrowserProvider } from 'ethers/providers';
import { setupHooks } from '@/components/hooks/web3/setupHooks';

const Web3Context = createContext<Web3State>(createDefaultState());

interface Web3ProviderProps {
  children: React.ReactNode;
}

const Web3Provider: FunctionComponent<Web3ProviderProps> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  useEffect(() => {
    async function initWeb3() {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const provider = new BrowserProvider(window.ethereum as any);
      const contract = await loadContract('NftMarket', provider);

      setWeb3Api(
        createWeb3State({
          ethereum: window.ethereum,
          provider,
          contract,
          isLoading: false,
        })
      );
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
