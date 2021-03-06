import React, { Component } from 'react';
import logo from './images/bg1.5.PNG';
import Newsfeed from './Newsfeed';
import UserPage  from './UserPage';
import Login from './Login';

class Registration extends Component {


  render() {
    return (

            <form onSubmit={(event) => {
                        event.preventDefault()
                        const name = window.web3.utils.fromAscii(this.content.value)
                        const pass = this.content2.value
                        console.log(name)
                        console.log(pass)
                        this.props.createUser(name, pass)
                        console.log("name")

                      }}>            
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
         
                        <h3 style={{ color: 'white' }}>Register</h3>
                    
                    <div className="form-group">
                        <label style={{ color: 'white' }}>First name</label>
                        <input type="text" className="form-control" placeholder="First name" />
                    </div>

                    <div className="form-group">
                        <label style={{ color: 'white' }}>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" />
                    </div>

                    <div className="form-group">
                        <label style={{ color: 'white' }}>User name</label>
                        <input type="text" className="form-control" placeholder="Enter username" ref={(input) => { this.content = input}}/>
                    </div>

                    <div className="form-group">
                        <label style={{ color: 'white' }}>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" ref={(input) => { this.content2 = input}}/>
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                    
                    </main>
                </div>
            </form>
    );
  }
}

export default Registration;