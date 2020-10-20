import React, { Component, lazy, Suspense } from 'react'
import styles from './home.module.less'
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
