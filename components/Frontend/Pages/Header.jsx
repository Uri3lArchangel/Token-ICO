import React, { useRef } from 'react'
import Image from 'next/legacy/image'
import Horse from '../../Images/bg3.png'
import { useRouter } from 'next/router'
import Web3 from 'web3'
import {tokenAddress} from '../../Backend/Funtions/web3Functions'

function Header(props) {
  const router = useRouter()
  function stats(){
    router.push('Stats')
  }
  return (
    <div>
    <div className='mt-6 space-y-8 section1Text'>
      <div className='bg-cyan-400 absolute imageDiv hidden w-fit h-fit rounded-full '>
      <Image src={Horse} className=' rounded-full' layout='intrinsic'/>
      </div>
    <h1 className='text-2xl font-serif font-bold text-white'>TROJAN HORSE <br /> TOKEN</h1>
    <p className='text-white'>Lorem ipsum, dolor sit amet consectetur Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, quidem! Molestias saepe reiciendis quibusdam nulla! adipisicing elit. Alias molestiae a dolorem incidunt unde doloremque tempora dicta fugit cum? Fugiat tempora quis dignissimos laudantium deserunt delectus fugit odio vel hic distinctio quas labore, earum alias numquam tenetur culpa aspernatur quod libero? Voluptates, error? Doloremque, temporibus obcaecati odio beatae sed amet!</p>
   <h1 className='text-center my-4 text-3xl font-bold text-white'>Price:0.01ETH </h1>
    <input ref={props.tokenRef} min={1} max={props.icoBalance} type="number" className='block text-center mx-auto rounded-full w-full h-8 px-2 outline-none' placeholder='Input the amount of tokens you wnat to purchase' />
    {props.load?<h3 className='text-center mx-auto text-white w-fit'>Loading Please Wait ....</h3>:<button className='block mx-auto bg-black/40 border-2 text-cyan-500 w-full h-8 rounded-full hover:border-cyan-300 hover:text-cyan-500/60 border-cyan-500' onClick={props.buy}>Buy Tokens</button>}
    </div>
    <p className='addressToken'> Token Address: <br /> {tokenAddress}</p>
    <div className='mt-40 progressFooter space-y-6'>
        <button className='block mx-auto border-2 text-cyan-500 w-full h-8 rounded-full hover:border-cyan-300 hover:text-cyan-500/60 border-cyan-500 bg-transparent' onClick={stats}>Stats</button>
        <progress className='w-full' value={props.sold} max={10000000}></progress>
        <p className='text-white text-center text-xl font-bold'>{props.icoBalance} Tokens Left</p>
    </div>
</div>
  )
}

export default Header