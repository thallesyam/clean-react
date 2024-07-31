import React from 'react'
import Styles from './login-styles.scss'

const Login = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}></header>
      <form className={Styles.form}></form>
      <footer className={Styles.footer}></footer>
    </div>
  )
}

export default Login