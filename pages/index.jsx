import Head from 'next/head'
import Image from 'next/image'
import Section1 from '../components/Frontend/Pages/Home'
import Section2 from '../components/Frontend/Pages/Section2'
import {connect, fetchIcoBalance,fetchUserBalance,buyTokens,salePrice,soldTokens} from '../components/Backend/Funtions/web3Functions'
import { useEffect, useState,createContext } from 'react'
import { useRouter } from 'next/router'


const Home = (props) => {
const router=useRouter() 
const [acc,setAcc]=useState('')
const [myBalance,setBalance]=useState(0)
const [icoBalance,setIcoBlanace]=useState(0)
const [tokensSold,setTokensSold]=useState(0)
const [price,setPrice]=useState(0)
let tokenNumber=0

async function buy(){
 let _price=await salePrice()
  await buyTokens(tokenNumber,_price)
  router.push('/')

}
function change(e){
tokenNumber=e.target.value
}
  useEffect(() => {
    
  
    return async() => {
      setAcc(await connect())
      console.log(acc)
      setBalance(await fetchUserBalance())
      setIcoBlanace(await fetchIcoBalance())
      setTokensSold(await soldTokens())
      setPrice(await salePrice())
    }
  }, [acc])
  
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section1 price={price} sold={tokensSold} change={change} buy={buy} icoBalance={icoBalance} connect={connect} address={acc} myTokens={myBalance} /> 
    </div>
  )
}

export default Home 
