const hre = require("hardhat");
const { verify } = require("./verify")
const fs = require("fs");
async function main() {
  const _metadataUri = 'https://gateway.pinata.cloud/ipfs/https://gateway.pinata.cloud/ipfs/QmX2ubhtBPtYw75Wrpv6HLb1fhbJqxrnbhDo1RViW3oVoi';
  const Avax = await hre.ethers.getContractFactory("AVAXGods");
  const AVAXGods = await Avax.deploy(_metadataUri);
  await AVAXGods.deployed();
  console.log(`deployed at ${AVAXGods.address}`);

  //verifiying smart contract on etherscan
  let arguments = [_metadataUri]
  if (process.env.SNOWTRACE_API_KEY) {
    try {
      console.log("Verifying...")
      await verify(AVAXGods.address, arguments)
    } catch (error) {
      console.log("something wrong try again");
    }
  }

  // storing address and abi in json format 
  const data = {
    address: AVAXGods.address,
    abi: JSON.parse(AVAXGods.interface.format('json'))
  }
  fs.writeFileSync('./AVAXGods.json', JSON.stringify(data))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
