import React, { useContext } from 'react'
import { eventContext } from '../../../pages'

function Nav(props) {

  return (
    <ul className='nav space-y-4'>
    <div className=''>
    <li className='text-xl text-white'>{props.myTokens}</li>
    <li className='text-sm text-white'>my tokens</li>
    </div>
    <li className=' text-right'>{props.address != '' ?<p className='address'>{props.address}</p>:<button onClick={props.connect} className='px-3 py-1 rounded-full text-sm bg-white '>Connect Wallet</button>}</li>
</ul>  )
}

export default Nav