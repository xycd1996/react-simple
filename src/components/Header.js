import { Button } from 'antd'
import React from 'react'
import styles from './header.module.scss'

const Header = () => {
  return (
    <div className={styles.header}>
      这是一个按钮
      <Button type="primary">你好</Button>
    </div>
  )
}

export default Header
