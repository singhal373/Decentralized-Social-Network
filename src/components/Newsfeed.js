import React, { Component } from 'react';


class Newsfeed extends Component {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    // console.log("Hello")
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
                          <small className="text-muted">{post.author}</small>
                      </div>
                      <ul id="postList" className="list-group list-group-flush">
                        <li className="list-group-item">
                          <p>{post.content}</p>
                        </li>
                        <li key={key} className="list-group-item py-2">
                          <small className="float-left mt-1 pr-5">
                              TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                          </small>
                          <button 
                          className="float-right"
                          onClick={(event) => {
                            const amt = window.web3.utils.toWei('0.1', 'Ether')
                            this.props.tipPost(post.id, amt)
                          }}>
                              TIP 0.1 ETH
                          </button>
                        </li>
                      </ul>
                    </div>
              </div>
            </main>
          </div>
                  )
          })}
        </div>
    );
  }
}

export default Newsfeed;