import { CryptoHookFactory } from "@/types/hook";
import useSWR from "swr";

type UseListedNftsResponse = object
type ListedNftsHookFactory = CryptoHookFactory<unknown, UseListedNftsResponse>

export type UseListedNftsHook = ReturnType<ListedNftsHookFactory>

export const hookFactory: ListedNftsHookFactory = ({contract}) => () => {
  const {data, ...swr} = useSWR(
    contract ? "web3/useListedNfts" : null,
    async () => {
      const nfts = [] as unknown;
      return nfts;
    }
  )
  return {
    ...swr,
    data: data || [],
  };
}