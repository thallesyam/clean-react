import React, {  InputHTMLAttributes, memo } from 'react'
import Styles from './input-styles.scss'

type Props = InputHTMLAttributes<HTMLInputElement>

const Input = (props: Props) => {
  
  return (
    <div className={Styles.inputWrap}>
      <input {...props}  />
      <span className={Styles.status}>🔴</span>
    </div>
  )
}

export default memo(Input)