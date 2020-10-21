import React, { Component } from 'react'
import Stud from './cls3'

export default class Footer extends Component {
  render() {
    return (
      <div>
        {process.env.NODE_ENV}|||
        {Stud.name} - {Stud.age} - {Stud.getCount()}
        -Footer
        <img src={require('../assets/1.gif')} />
        <img src={require('../assets/2.jpeg')} />
        <img src={require('../assets/3.png')} />
      </div>
    )
  }
}