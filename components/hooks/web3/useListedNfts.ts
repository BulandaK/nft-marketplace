import { CryptoHookFactory } from '@/types/hook';
import { Nft } from '@_types/nft';
import useSWR from 'swr';

type UseListedNftsResponse = object;
type ListedNftsHookFactory = CryptoHookFactory<unknown, UseListedNftsResponse>;

export type UseListedNftsHook = ReturnType<ListedNftsHookFactory>;

export const hookFactory: ListedNftsHookFactory =
  ({ contract }) =>
  () => {
    const { data, ...swr } = useSWR(
      contract ? 'web3/useListedNfts' : null,
      async () => {
        const coreNfts = (await contract!.getAllNftsOnSale());

        const nfts = [] as unknown;
        return nfts;
      }
    );
    return {
      ...swr,
      data: data || [],
    };
  };
