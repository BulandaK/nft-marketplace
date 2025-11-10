const instance = await NftMarket.deployed();

instance.mintToken('https://lavender-perfect-slug-342.mypinata.cloud/ipfs/bafkreid7lhrg5njwaktbdexaifa3mtx373p6ewo4p67qgybqx2m7uwt5ay','500000000000000000',{ value: '25000000000000000', from: accounts[0] });
instance.mintToken('https://lavender-perfect-slug-342.mypinata.cloud/ipfs/bafkreifszxremdyjegmlbkmcq4wd5gmembzyucs6lylczbwnfpm226tdpy','500000000000000000',{ value: '25000000000000000', from: accounts[0] });