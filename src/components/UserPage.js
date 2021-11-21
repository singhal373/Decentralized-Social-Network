import React, { Component } from 'react';

class UserPage extends Component {

  render() {
    return (
      <div className="container-fluid mt-5 pt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
                <div className="card mb-4" >
                <div className="card-header">
                    <h1> Satoshi Nakamoto </h1>
                </div> 
                <div class="py-2">
                  <img src={require(".\\img\\profile-placeholder.png")} class="rounded mx-auto d-block" />
                </div>
                <div class="container table-responsive py-2"> 
                <table class="table table-bordered table-hover">
                  <tbody>
                    <tr>
                      <th scope="row">Account ID</th>
                      <td>0xd87d7Ac86EFe595F6710DBb73a470804EcDE5C33</td>
                    </tr>
                    <tr>
                      <th scope="row">Date joined</th>
                      <td>18 Oct 2021</td>
                    </tr>
                  </tbody>
                </table>
                </div>
                </div>
            </div>
          </main>
        </div>  
      </div>
    );
  }
}

export default UserPage;