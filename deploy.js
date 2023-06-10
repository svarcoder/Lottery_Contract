require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");

const provider = new HDWalletProvider(
  process.env.SECRET_WALLET_PHRASE,
  process.env.INFURA_RINKEBY_API
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attemting to deploy a contract from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });

  console.log("Contract deployed to: ", result.options.address);
  provider.engine.stop();
};

deploy();

//first deployed lottery contract address(Rinkeby Network): 0xEC3E966B1fb5C2d17DDDBaF8516D5797C2A13Cf4;
