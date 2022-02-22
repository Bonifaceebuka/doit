const hre = require("hardhat");

async function main() {

  const Todo = await hre.ethers.getContractFactory("TodoDapp");
  const todo = await Todo.deploy();
  await todo.deployed();

  console.log("Todo Dapp deployed to:", todo.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
