import { MetaMaskInpageProvider } from '@metamask/providers';
import { Contract } from 'ethers';
import { BrowserProvider } from 'ethers';
import { SWRResponse } from 'swr';

export type Web3Dependencies = {
  provider: BrowserProvider;
  contract: Contract;
  ethereum: MetaMaskInpageProvider;
};


export type CryptoHookFactory = {
  (d: Partial<Web3Dependencies>): CryptoHandlerHook;
};

export type CryptoSWRResponse = SWRResponse;

export type CryptoHandlerHook = (params: string) => CryptoSWRResponse;



