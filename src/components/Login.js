import React, { Component } from 'react';
import logo from './images/bg1.5.PNG';
import Registration from './Registration';
import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {createBrowserHistory} from "history";

// function reg(){

//     const navigate = useNavigate();

//   const routeChange = () =>{ 
//     let path = `url(${Registration})`; 
//     navigate(path);
//   }
// }

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openReg: false,
        };
        this.toggleOpenReg = this.toggleOpenReg.bind(this)
    }
    
    toggleOpenReg() {
        this.setState({
        openReg: !this.state.openReg
        });
    }

  render() {



    return (
        <div className="container-fluid mt-5 pt-5" style={{ backgroundImage: `url(${logo})` , backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh' }}>    
            {this.props.errorMessage ? "Wrong username or password" : ""
            }
                <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
                    <h3 style={{ color: 'white' }}>Log in</h3>
                <form onSubmit={(event) => {
                                        event.preventDefault()
                                        const name = this.uname.value
                                        const pass = this.pwd.value
                                        this.props.checkCreds(name, pass)
                                        console.log(name)
                                        console.log(pass)
                                        }}>
                    <div className="form-group">
                        <label style={{ color: 'white' }}>Username:</label>
                        <input type="string" className="form-control" placeholder="Enter Name" ref={(input) => { this.uname = input}}/>
                    </div>
                    <div className="form-group">
                        <label style={{ color: 'white' }}>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" ref={(input) => { this.pwd = input}}/>
                    </div>
                    <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                    </form>
                    <button 
                        class="link"
                        onClick={(event) => {
                            this.toggleOpenReg()
                        }}>
                        New User? Register.
                    </button>
                </main>
            <br/><br/>
            {this.state.openReg ? 
            <Registration
            createUser={this.props.createUser}
            /> 
            : ""}
        </div>

 );
  }
}

export default Login;