/*
 * @Author: Cao_ming
 * @Date: 2020-10-20 14:50:30
 * @LastEditTime: 2020-10-21 15:46:18
 * @LastEditors: Cao_ming
 * @FilePath: \react-simple\src\index.js
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Home from './views/Home'
import 'antd/dist/antd.less'

class App extends Component {
  render() {
    return (
      <div>
        hello world
        <Home />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
