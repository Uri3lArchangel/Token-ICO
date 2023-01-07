const tokenContract = artifacts.require('Token')

module.exports = function (deployer){
     deployer.deploy(tokenContract,10000000000)

}