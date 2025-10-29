import { CryptoHookFactory } from '@/types/hook';
import useSWR from 'swr';

const NETWORKS: { [k: string]: string } = {
  1: 'Ethereum Main Network',
  3: 'Ropsten Test Network',
  4: 'Rinkeby Test Network',
  5: 'Goerli Test Network',
  42: 'Kovan Test Network',
  56: 'Binance Smart Chain',
  1337: 'Ganache',
};

type UseNetworkResponse = {
  isLoading: boolean;
};

type NetworkHookFactory = CryptoHookFactory<string, UseNetworkResponse>;

export type UseNetworkHook = ReturnType<NetworkHookFactory>;

export const hookFactory: NetworkHookFactory =
  ({ provider, isLoading }) =>
  () => {
    const { data, isValidating, ...swr } = useSWR(
      provider ? 'web3/useNetwork' : null,
      async () => {
        const chainId = (await provider!.getNetwork()).chainId;
        debugger;
        if (!chainId) {
          throw 'Cannot retreive network. Please, refresh browser or connect to other one.';
        }

        const chainIdStr = chainId.toString();

        return NETWORKS[chainIdStr];
      },
      {
        revalidateOnFocus: false,
      }
    );

    return {
      ...swr,
      data,
      isValidating,
      isLoading: isLoading || isValidating,
    };
  };
