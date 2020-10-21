/*
 * @Author: Cao_ming
 * @Date: 2020-10-20 14:50:30
 * @LastEditTime: 2020-10-21 14:02:27
 * @LastEditors: Cao_ming
 * @FilePath: \react-simple\src\components\Header.js
 */
import { Button } from 'antd'
import React from 'react'
import styles from './header.module.less'
import Stu from './cls1'
import Stu2 from './cls2'

const Header = () => {
  return (
    <div className={styles.header}>
      这是一个按钮 - {Stu.age} - {Stu.name} - {Stu.name}
      {Stu2.age} - {Stu2.name} - {Stu2.getCount()}
      <Button type='primary'>你好</Button>
    </div>
  )
}

export default Header
