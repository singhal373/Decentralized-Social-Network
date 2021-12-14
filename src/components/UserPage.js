import React, { Component } from 'react';

class UserPage extends Component {

  componentDidMount() {
    console.log("this should be Account", this.props.user[0])
    console.log("this should be address", this.props.user[1])
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div className="container-fluid mt-1 pt-1">
            <div className="row">
              <main role="main" className="col-lg-12 ml-auto mr-auto">
                <div className="content mr-auto ml-auto">
                    <div className="card mb-4" >
                    <div className="card-header">
                        <h1><centre> {this.props.user[0].name != 0 ? window.web3.utils.toAscii(this.props.user[0].name).replace(/\u0000/g, "") : "user"}</centre></h1>
                    </div> 
                    <div class="py-2">
                      <img src={require("./img/profile-placeholder.png")} class="rounded mx-auto d-block" />
                    </div>
                    <div class="container table-responsive py-2"> 
                    <table class="table table-bordered table-hover">
                      <tbody>
                        <tr>
                          <th scope="row">Account ID</th>
                          <td>{this.props.user[1]}</td>
                        </tr>
                        <tr>
                          <th scope="row">Date joined</th>
                          <td>{Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(this.props.user[0].dateOfJoining * 1000))}</td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                    </div>
                </div>
              </main>
            </div>  
            <button onClick={(event) => {
                            this.props.closePopup(null)
                              }}>
                                Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;