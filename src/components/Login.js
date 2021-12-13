import React, { Component } from 'react';
import logo from './images/bg1.5.PNG';

class Login extends Component {

  render() {
    return (
        <div className="container-fluid mt-5 pt-5" style={{ backgroundImage: `url(${logo})` , backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh' }}>    
<form>
<main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>

                <h3 style={{ color: 'white' }}>Log in</h3>

                <div className="form-group">
                    <label style={{ color: 'white' }}>Name:</label>
                    <input type="email" className="form-control" placeholder="Enter Name" />
                </div>

                <div className="form-group">
                    <label style={{ color: 'white' }}>Password:</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label style={{ color: 'white' }} className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                <p style={{ color: 'white' }} className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
                </main>
            </form>
            </div>

 );
  }
}

export default Login;