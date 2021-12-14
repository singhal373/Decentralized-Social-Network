import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import UserPage from './UserPage';
import './styles/Home.css';



class Newsfeed extends Component {
  componentDidMount() {
    console.log(this.props)
  }

  constructor(props) {
    super(props);
    this.state = {
      showUser: false,
      user: null
    };
    this.togglePopup = this.togglePopup.bind(this)
  }

  togglePopup(tup) {
    this.setState({
      user: tup
    })
    this.setState({
      showUser: !this.state.showUser
    });
  }

  render() {
    console.log("In render")
    return (
      <div className="container-fluid mt-5 pt-5" style={{overflow: 'auto', height: 'inherit', display: 'block'}}>
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
                <div className="card mb-4" >
                <div className="card-header">
                    <small className="text-muted">Create a new post</small>
                </div>
                <ul id="postList" className="list-group list-group-flush">
                  <form onSubmit={(event) => {
                        event.preventDefault()
                        const text = this.content.value
                        this.props.createPost(text)
                      }}>
                    <li className="list-group-item">
                        <textarea 
                        class="form-control form-rounded" 
                        placeholder="Type something.." 
                        ref={(input) => { this.content = input}}
                        rows="3" />
                    </li>
                    <li className="list-group-item py-2">
                      <button type="submit" className="float-right">
                          Post
                      </button>
                    </li>
                  </form>
                </ul>
                </div>
            </div>
          </main>
        </div>
          {[...this.props.posts].reverse().map((post, key) => {
          return (
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
              <div className="content mr-auto ml-auto">
                    <div className="card mb-4" key={key}>
                      <div className="card-header">
                          <small className="text-muted">
                              {/* <Link to={post[0].author} target="_blank"> */}
                              <button class="link" onClick={(event) => {
                            this.togglePopup([post[1], post[0].author])
                              }}>
                                {post[1].name != 0 ? window.web3.utils.toAscii(post[1].name).replace(/\u0000/g, "") : "user"}
                              </button>
                              {/* </Link> */}
                          </small>
                      </div>
                      <ul id="postList" className="list-group list-group-flush">
                        <li className="list-group-item">
                          <p>{post[0].content}</p>
                        </li>
                        <li key={key} className="list-group-item py-2">
                          <small className="float-left mt-1 pr-5">
                              TIPS: {window.web3.utils.fromWei(post[0].tipAmount.toString(), 'Ether')} ETH
                          </small>
                          <button 
                          className="float-right"
                          style={{margin: "5px"}}
                          onClick={(event) => {
                            const amt = window.web3.utils.toWei('0.1', 'Ether')
                            this.props.tipPost(post[0].id, amt)
                          }}>
                              TIP 0.1 ETH
                          </button>
                          <button 
                          className="float-right"
                          style={{margin: "5px"}}
                          onClick={(event) => {
                            const amt = window.web3.utils.toWei('0.5', 'Ether')
                            this.props.tipPost(post[0].id, amt)
                          }}>
                              TIP 0.5 ETH
                          </button>
                        </li>
                      </ul>
                    </div>
              </div>
            </main>
          </div>
                  )
          })}
          { this.state.showUser ? 
          <UserPage
            closePopup={this.togglePopup}
            user={this.state.user}
          />
          : null
        }
        </div>
    );
  }
}

export default Newsfeed;