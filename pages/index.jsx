import Head from 'next/head'
import Section1 from '../components/Frontend/Pages/Home'
import {connect, fetchIcoBalance,fetchUserBalance,buyTokens,salePrice,soldTokens} from '../components/Backend/Funtions/web3Functions'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'


const Home = (props) => {
const router=useRouter() 
const [acc,setAcc]=useState('')
const [myBalance,setBalance]=useState(0)
const [icoBalance,setIcoBlanace]=useState(0)
const [tokensSold,setTokensSold]=useState(0)
const [price,setPrice]=useState(0)
const [loadingBuy,setLoading]=useState(false)
let tokenNumberRef = useRef()

async function buy(){
 let _price=await salePrice()
  setLoading(true)
  await buyTokens(tokenNumberRef.current.value,_price)
  setLoading(false)
  router.push('/')

}

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    const functionCalls=async()=>{
    
   
      setAcc(await connect(),{signal})
      setBalance(await fetchUserBalance(),{signal})
      setIcoBlanace(await fetchIcoBalance(),{signal})
      setTokensSold(await soldTokens(),{signal})
      setPrice(await salePrice(),{signal})
    }
    functionCalls()
 return ()=>{
  controller.abort()
 }
  },[acc])
  
  return (
    <div>
      <Head>
        <title>TOKEN SALE ICO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section1 load={loadingBuy} tokenRef={tokenNumberRef} price={price} sold={tokensSold}  buy={buy} icoBalance={icoBalance} connect={connect} address={acc} myTokens={myBalance} /> 
    </div>
  )
}

export default Home 
