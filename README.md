## DoiT Dapp
This application is built with the following technologies:

1. NodeJS verion 14.18.1
2. NPM version 6.14.15
3. Solidity version ^0.8.0
4. ReactJS version ^17.0.2
5. HardHat version ^2.8.2
6. Alchemy
7. Rinkeby
8. Web3Modal version 1.9.5

### This is how you can install and setup this Dapplication
Please, ensure that you have NodeJS installed on your device.

1. Clone this Repository(Repo) with the following command `git clone https://github.com/Bonifaceebuka/doit.git`
2. Move to the DIR of the Repo `cd doit`
3. Install NPM packages with `npm install`.
4. Run npx hardhat node to start your local ethereum Node.
5. Run npx hardhat compile to compile the Smart Contract
6. Run npx hardhat run scripts/deploy.js --network localhost to deploy the smart contract.
7. Edit the files and add the address of your smart contract after deployment where you have `SMART CONTRACT ADDRESS`
8. Start the application with `npm run start`
	Visit localhost:3000/ to see the front-end of the application
### The Screenshots of the front-end of the Dapp

Visit https://doitdapp.herokuapp.com/ to see the live version of this application
### Connect your wallet
<img src="https://github.com/Bonifaceebuka/doit/blob/main/screenshots/login.PNG">

### Choose your wallet provider
<img src="https://github.com/Bonifaceebuka/doit/blob/main/screenshots/wallet.PNG">

### Create a To-do
<img src="https://github.com/Bonifaceebuka/doit/blob/main/screenshots/create.PNG">

### List of the To-dos
<img src="https://github.com/Bonifaceebuka/doit/blob/main/screenshots/list.PNG">

### Edit a selected To-do
<img src="https://github.com/Bonifaceebuka/doit/blob/main/screenshots/edit.PNG">

