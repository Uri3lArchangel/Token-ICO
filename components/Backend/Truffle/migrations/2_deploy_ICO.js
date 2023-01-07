const tokenContract = artifacts.require('Token')
const icoContract = artifacts.require('ICO')
const price = 1000000000000000

module.exports = function (deployer){
     deployer.deploy(icoContract,tokenContract.address,price)
console.log(tokenContract.address)
}