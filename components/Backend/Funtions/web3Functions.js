import Web3 from "web3";
import tokenabi from '../Truffle/build/contracts/Token.json'
import icoabi from '../Truffle/build/contracts/ICO.json'
let infuraurl='https://goerli.infura.io/v3/011b1e17991746548b8fc0eac345158e'
let icoAddress = '0x3Ed4125dB2dCC0507370C3e4E61B134DF628DAE7'
export let tokenAddress = '0x8a3E336Ec3181511563b063BFC68ED6a5dCB343C'

const web3 = new Web3(Web3.givenProvider || infuraurl)



async function init() {
    try{
const token = new web3.eth.Contract(tokenabi.abi,tokenAddress)
return token
    }catch(err){
        console.error(err)
    }
}
export async function init2(){
    try{

    
    const ico = new web3.eth.Contract(icoabi.abi,icoAddress)
    let data={
        ico,icoAddress
    }
    return data
}catch(err){
    console.error(err)
}
}
export async function connect(){
    if(window.web3 || window.ethereum){
        if(await web3.eth.net.getId() == 5){

        
        try{
    let Account = await web3.eth.requestAccounts()
    return Account
        }
        catch(err){
            console.error(err)
        }
    }else{
        alert("Wrong network please switch to Goerli ETH testnet")
    }
    }else{
        window.alert("please enable or install a wallet like metamask")
    }
 }

 export async function fetchIcoBalance(){
    if(await web3.eth.net.getId() == 5){
        try{
    let token = await init()
    return await token.methods.balanceOf(icoAddress).call()
        }catch(err){
            console.error(err)
        }
    }
        else{
            alert("Wrong network please switch to Goerli ETH testnet")
        }
 }

 export async function fetchUserBalance(){
    if( await web3.eth.net.getId() == 5){
        try{
    let token = await init()
    let Acc = (await connect())[0]
    return await token.methods.balanceOf(Acc).call()
        }catch(err){
            console.error(err)
        }
    }else{
        alert("Wrong network please switch to Goerli ETH testnet")

    }
 }

 export async function buyTokens(a,b){
    if(await web3.eth.net.getId() == 5){
        try{
        let Acc = (await connect())[0]
    let ico = (await init2()).ico
    await ico.methods.buyTokens(a).send({from:Acc,value:a*b})

        }catch(err){
            console.error(err)
        }
    }else{
        alert("Wrong network please switch to Goerli ETH testnet")

    }
 }
 export async function salePrice(){
    if(await web3.eth.net.getId() == 5){
        try{
            let ico = (await init2()).ico
            return await ico.methods.salePrice().call() 

        }catch(err){
            console.error(err)
        }

    }else{
        alert("Wrong network please switch to Goerli ETH testnet")

    }
 
 }
 export async function soldTokens(){

    if(await web3.eth.net.getId() == 5){
        try{
            let ico = (await init2()).ico
    return await ico.methods.tokensSold().call() 

        }catch(err){
            console.error(err)
        }
    }else{
        alert("Wrong network please switch to Goerli ETH testnet")

    }

 }
export async function getHolders(){
    if(await web3.eth.net.getId() == 5){
        try{
            let token = await init()
            return await token.methods.Holders().call()

        }catch(err){
            console.error(err)
        }
    }else{
        alert("Wrong network please switch to Goerli ETH testnet")

    }
   
    }