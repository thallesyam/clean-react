import React, { memo } from 'react'
import Styles from './login-header-styles.scss'
import Logo from '@/presentation/components/logo/logo'

const LoginHeader = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo />
        <h1>4Dev - Enquete para Programadores</h1>
      </header>
    </div>
  )
}

export default memo(LoginHeader)