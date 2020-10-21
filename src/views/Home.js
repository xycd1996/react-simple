/*
 * @Author: Cao_ming
 * @Date: 2020-10-20 18:46:14
 * @LastEditTime: 2020-10-21 15:47:31
 * @LastEditors: Cao_ming
 * @FilePath: \react-simple\src\views\Home.js
 */
import React, { Component, lazy, Suspense } from 'react'
import styles from './home.module.css'
import Student from './cls'

const Header = lazy(() => import('../components/Header'))
const Footer = lazy(() => import('../components/Footer'))

export default class Home extends Component {
  _query = () => {
    console.log('foobar'.includes('foo'))
  }

  _select = async () => {
    const res = await fetch('http://58.42.4.33:20004/ts_shop/material/list', {
      method: 'POST',
    })
    console.log(await res.json())
  }

  componentDidMount() {
    this._query()
    this._select()
    console.log(Student.age)
    console.log(Student.name)
  }

  render() {
    return (
      <div className={styles.home}>
        Home-{Student.age}-{Student.name}-{Student.getCount()}
        <Suspense fallback={<>loading...</>}>
          <Header />
          <Footer />
        </Suspense>
      </div>
    )
  }
}
