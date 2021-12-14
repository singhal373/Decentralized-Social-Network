import React, { Component } from 'react';
import logo from './images/bg1.5.PNG';
import Registration from './Registration';
import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {createBrowserHistory} from "history";

function reg(){

    const navigate = useNavigate();

  const routeChange = () =>{ 
    let path = `url(${Registration})`; 
    navigate(path);
  }
}

class Login extends Component {

    
  render() {



    return (
        <div className="container-fluid mt-5 pt-5" style={{ backgroundImage: `url(${logo})` , backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh' }}>    
<form onSubmit={(event) => {
                        event.preventDefault()
                        const name = this.content.value
                        const pass = this.content2.value
                        console.log(name)
                        console.log(pass)

                        reg()
                      //  this.props.createPost(text)
                      }}>
<main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>

                <h3 style={{ color: 'white' }}>Log in {this.props.user}</h3>

                <div className="form-group">
                    <label style={{ color: 'white' }}>Name:</label>
                    <input type="string" className="form-control" placeholder="Enter Name" ref={(input) => { this.content = input}}/>
                </div>

                <div className="form-group">
                    <label style={{ color: 'white' }}>Password:</label>
                    <input type="password" className="form-control" placeholder="Enter password" ref={(input) => { this.content2 = input}}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label style={{ color: 'white' }} className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                
                </main>
            </form>
            </div>

 );
  }
}

export default Login;