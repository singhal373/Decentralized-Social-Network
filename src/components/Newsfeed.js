import React, { Component } from 'react';

class Newsfeed extends Component {

  render() {
    return (
      <div className="container-fluid mt-5 pt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
                <div className="card mb-4" >
                <div className="card-header">
                    <small className="text-muted">Post Author: Satoshi Nakamoto</small>
                </div>
                <ul id="postList" className="list-group list-group-flush">
                    <li className="list-group-item">
                    <p>Hello, this is the genesis post on IBC decentralized network</p>
                    </li>
                    <li className="list-group-item py-2">
                    <small className="float-left mt-1 pr-5">
                        TIPS: {window.web3.utils.fromWei('100000000000000000', 'Ether')} ETH
                    </small>
                    <button className="float-right">
                        TIP 0.1 ETH
                    </button>
                    </li>
                </ul>
                </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Newsfeed;