import React, { Component, lazy, Suspense } from 'react'
import styles from './home.module.less'

const Header = lazy(() => import('../components/Header'))
const Footer = lazy(() => import('../components/Footer'))

export default class Home extends Component {
  render() {
    return (
      <div className={styles.home}>
        Home
        <Suspense fallback={<>loading...</>}>
          <Header />
          <Footer />
        </Suspense>
      </div>
    )
  }
}
