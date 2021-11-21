import React, { Component } from 'react';
import logo from './img/sosh_logo.PNG';

const styles = {
   backgroundColor:"#f0f",
   fontSize: 10,
   color: 'white',
   padding: '10px'
}

class Main extends Component {

  constructor (props) {
    super(props)
    this.state = {
      inputValue: '',
      backgroundcolor: '#C5F1F6'
    }
  }

  render() {
    const mystyle = {
      color: "white",
      backgroundColor: "#C5F1F6",
      padding: "10px",
      fontFamily: 'lucida grande'
    };
  return (
    <div class="container">
    <form onSubmit={(event) => {
    event.preventDefault()
    const content = this.postContent.value
    this.props.createPost(content)
    }}>

    <div class="row" style={{backgroundColor: this.state.backgroundcolor}}>
    <div class="col-10">
    <br></br>
    <br></br>
    <h1 style={mystyle}>
      BITSOSH
    </h1>
    <br></br>
    <br></br>
    </div>

    <div class="col-90">
    <br></br>
    <img src={logo} className="App-logo" alt="logo" />
    <br></br>
    <br></br>
    </div>
    </div>

    <div class="row">
    <div class="col-10">
    <br></br>
    <br></br>
    <br></br>
    <label for="label"> Whats on your mind today? </label>
    <br></br>
    <br></br>
    </div>
    </div>

    <div class="row">
    <div class="col-10">
    <textarea 
       rows = "10" 
       cols = "140" 
       id="postContent"
       name = "form-control"  
       ref={(input) => { this.postContent = input }}
       placeholder="Share your thoughts here.."
       required/>
    </div> 
    </div>

    <div class="row">
    <div class="col-7">
    <br></br>
    <button type="submit" className="btn btn-primary btn-info">Post</button>
    </div>
    </div>
    </form>
    </div>
  );
  }
}

export default Main;