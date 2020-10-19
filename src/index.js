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
