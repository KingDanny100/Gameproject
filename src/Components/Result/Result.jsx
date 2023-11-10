import React from 'react'
import './Result.css'
import Button from '../Button/Button'

const Result = (props) => {
  return (
    <div className='result_div'>
        <div className='cover_modal'>
            {props.finished ? <h1>GOOD JOB!!!</h1> : <h1>GAMEOVER!!!</h1>}
            <p>{props.message}</p>
            <Button onClick={props.restartFunc} title='Play Again' />
        </div>
    </div>
  )
}

export default Result