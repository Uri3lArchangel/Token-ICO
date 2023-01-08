import Head from 'next/head'
import Image from 'next/image'
import Section1 from '../components/Frontend/Pages/Home'
import Section2 from '../components/Frontend/Pages/Section2'
import {connect, fetchIcoBalance,fetchUserBalance,buyTokens,salePrice,soldTokens} from '../components/Backend/Funtions/web3Functions'
import { useEffect, useState,createContext, useRef } from 'react'
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
//  alert(`${tokenNumberRef.current.value} and ${_price}`)
  setLoading(true)
  await buyTokens(tokenNumberRef.current.value,_price)
  setLoading(false)
  router.push('/')

}

  useEffect(() => {
    
  
    return async() => {
      setAcc(await connect())
      console.log(acc)
      setBalance(await fetchUserBalance())
      setIcoBlanace(await fetchIcoBalance())
      setTokensSold(await soldTokens())
      console.log('effect')
      setPrice(await salePrice()) 
    }
  },[])
  
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section1 load={loadingBuy} tokenRef={tokenNumberRef} price={price} sold={tokensSold}  buy={buy} icoBalance={icoBalance} connect={connect} address={acc} myTokens={myBalance} /> 
    </div>
  )
}

export default Home 
