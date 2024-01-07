import React from 'react'

const Dice = (props) => {
  return (
    <div className='dice-face' style={{backgroundColor:props.isHeld?"#59E391":"white"}}
    onClick={props.holdDice}>
      <h2>{props.value}</h2>
    </div>
  )
}

export default Dice
