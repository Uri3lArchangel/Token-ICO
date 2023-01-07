import React from 'react'
import Section2 from '../components/Frontend/Pages/Section2'
import {getHolders} from '../components/Backend/Funtions/web3Functions'


function Stats(props) {
  return (
    <div >
        <Section2 h={props.h} />
    </div>
  )
}

export default Stats

export async function getStaticProps(){
  let h=  await getHolders()
  console.log(h)
  return{
    props:{
    h
    }
  }
  }