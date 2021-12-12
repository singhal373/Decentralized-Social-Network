import React, { Component } from 'react';

class Registration extends Component {

  render() {
    return (
<div className="container-fluid mt-5 pt-5" style={{ backgroundImage: `url(${logo})` , backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh' }}>    
<form>            
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
                    <label style={{ color: 'white' }}>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label style={{ color: 'white' }}>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-left" style={{ color: 'white' }}>
                    Registered user? <a href="#">Click here.</a>
                </p>
                </main>
                </div>
            </form>
            </div>
    );
  }
}

export default Registration;