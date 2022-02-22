require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.5.3",
  paths:{
    artifacts:'./src/artifacts',
  },
  networks:{
    hardhat:{
      chainId:31337
    },
    rinkeby:{
      url:'https://eth-rinkeby.alchemyapi.io/v2/g5UObLj-OFZHyAD_nrEmGZNS0zPiPFKz',
      accounts:['0xc42167d564177aa5a2edff67d073824f89f4b8b7d2ccd1db5c2ab058c7165e05']
    }
  }
};
