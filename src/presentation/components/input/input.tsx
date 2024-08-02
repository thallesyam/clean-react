import React, {  FocusEvent, InputHTMLAttributes, useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = InputHTMLAttributes<HTMLInputElement>

const Input = (props: Props) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]

  const getStatus = (): string => {
    return error ? '🔴' : '🟢'
  }

  const getTitle = (): string => {
    return error ? error : 'Tudo certo!'
  }

  const enableInput = (event: FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })

  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} data-testid={props.name} readOnly onFocus={enableInput} onChange={handleChange} />
      <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>
        {getStatus()}
      </span>
    </div>
  )
}

export default Input