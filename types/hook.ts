import { MetaMaskInpageProvider } from '@metamask/providers';
import { Contract } from 'ethers';
import { BrowserProvider } from 'ethers';
import { SWRResponse } from 'swr';

export type Web3Dependencies = {
  provider: BrowserProvider;
  contract: Contract;
  ethereum: MetaMaskInpageProvider;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CryptoHookFactory<D = any, P = any> = {
  (d: Partial<Web3Dependencies>): CryptoHandlerHook;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CryptoHandlerHook<D = any, P = any> = (
  params: P
) => CryptoSWRResponse<D>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CryptoSWRResponse<D = any> = SWRResponse<D>;

// export type CryptoHookFactory<D = any,P = any> = {
//   (d: Partial<Web3Dependencies>): (params: P) => SWRResponse<D>;
// };
