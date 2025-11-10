import { FunctionComponent } from 'react';
import NFTItem from '../item';
import { Nft } from '@/types/nft';

type NFTSListProps = {
  nfts: Nft[];
};

const NFTList: FunctionComponent<NFTSListProps> = ({ nfts }) => {
  return (
    <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
      {nfts.map((nft, i) => (
        <div
          key={nft.meta.image}
          className="flex flex-col rounded-lg shadow-lg overflow-hidden"
        >
          <NFTItem item={nft} />
        </div>
      ))}
    </div>
  );
};

export default NFTList;
