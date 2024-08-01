import React, { HTMLAttributes } from 'react'
import Styles from './spinner-styles.scss'

type Props = HTMLAttributes<HTMLElement>

const Spinner = (props: Props) => {
  return (
    <div {...props} className={[Styles.spinner, props.className].join(" ")}>
    </div>
  )
}

export default Spinner