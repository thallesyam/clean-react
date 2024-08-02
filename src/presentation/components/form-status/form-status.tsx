import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import Spinner from '../spinner/spinner'
import Context from '@/presentation/contexts/form/form-context'

const FormStatus = () => {
  const { state: { isLoading, mainError } } = useContext(Context)

  return (
    <div data-testid="errorWrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && <span className={Styles.error}>{mainError}</span>}
    </div>
  )
}

export default FormStatus