import React from 'react'
import Header from './Header'
import Nav from './Nav'

function Section1(props) {
  return (
    <div className='section1 pb-10'>
      <Nav connect={props.connect} address={props.address} myTokens={props.myTokens} />
        <Header sold={props.sold} price={props.price} change={props.change} buy={props.buy} icoBalance={props.icoBalance} />
</div>
  )
}

export default Section1