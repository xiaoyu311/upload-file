import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  state = {
    imgRul:""
  }
  handlechange = (e) => {
    const file = e.target.files[0]//选择文件
    const reader = new FileReader() //准备读取文件
    reader.onload = (event) => {
      // let data = {
      //   file:event.target.result  文件只有在onload里面才能读取到文件的真是数据
      // }
      let formData = new FormData()
      formData.append('avatar', file)
      // 这样，可以保证 multipart/form-data


      //axios 不能发送文件 需要发送multipart/form-data 类型的文件就可以了
      axios.post('http://192.168.0.119:3008/touxiang', formData)
      .then( res => {
        this.setState({imgRul:`http://192.168.0.119:3008/uploads/avatars/${res.data.filename}`})
      })
    }
    reader.readAsDataURL(file)//读取文件
  }
  render() {
    return (
      <div className="App">
        <label style={{display:'block', width:'100px', height:'100px', border:'2px solid #000', background:`url(${this.state.imgRul})`, backgroundSize:'100px 100px'}}>
          <input type="file" style={{width:'0', height:'0', border:'0', outline:'none'}} onChange={this.handlechange} />
        </label>

      </div>
    );
  }
}

export default App;
