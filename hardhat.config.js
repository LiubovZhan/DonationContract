require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
  
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const { privateKey} = require('./secrets.json');
const { url } = require('./secrets.json');

module.exports = {
  solidity: "0.7.3",
  networks: {
    rinkeby: {
      url: [url], 
      accounts: [privateKey]
     },
   }
};
