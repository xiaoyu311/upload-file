import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  state = {
    imgRul:""
  }
  handlechange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      // let data = {
      //   file:event.target.result
      // }
      let formData = new FormData()
      formData.append('avatar', file)
      // 这样，可以保证 multipart/form-data
      axios.post('http://192.168.0.119:3008/touxiang', formData)
      .then( res => {
        this.setState({imgRul:`http://192.168.0.119:3008/uploads/avatars/${res.data.filename}`})
      })
    }
    reader.readAsDataURL(file)
  }
  render() {
    return (
      <div className="App">
        <img src={this.state.imgRul} alt="img" />
        <input type="file" onChange={this.handlechange} />
      </div>
    );
  }
}

export default App;
