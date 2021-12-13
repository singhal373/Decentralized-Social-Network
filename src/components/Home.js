import React, { Component } from 'react';
import Web3 from 'web3'
import SocialNetwork from '../abis/SocialNetwork.json';
import Main from './Main';
import Newsfeed from './Newsfeed';
import UserPage  from './UserPage';
import './styles/Home.css';

class Home extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      socialNetwork: null,
      postCount: 0,
      posts: [],
      loading: true, // default
    }    
    this.createPost = this.createPost.bind(this)
    this.tipPost = this.tipPost.bind(this)

  }

  createPost(content) {
    this.setState({ loading: true })
    this.state.socialNetwork.methods.createPost(content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  };

  tipPost(id, tipAmount) {
    this.setState({loading: true})
    this.state.socialNetwork.methods.tipPost(id).send({ from: this.state.account, value: tipAmount})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  };

  async loadBlockchainData() {
    const web3 = window.web3

    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = SocialNetwork.networks[networkId]
    if( networkData) {
      const socialNetwork = new web3.eth.Contract(SocialNetwork.abi, networkData.address)
      console.log(socialNetwork)
      this.setState({socialNetwork})
      const postCount = await socialNetwork.methods.postCount().call()
      this.setState({ postCount })
      console.log("Number of posts", postCount)

      // Load Posts      
      // const result = await socialNetwork.createPost('Some post content', { from: accounts[1] })

      for (var i = 1; i <= postCount; i++) {
        const post = await socialNetwork.methods.posts(i).call()
        // console.log(post)
        this.setState({
          posts: [...this.state.posts, post]
        }, () => {
          console.log(this.state.posts)
        })
      }
      console.log(this.state.posts.length, {posts: this.state.posts})
      console.log("Done loading blockchain")
      this.setState({ loading: false})
    } else {
      window.alert('SocialNetwork contract is not deployed to detected network.')
    }
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Please install MetaMask!')
    }
  }

  render() {
    return (
      <div className="fill-window" >
        <nav className="navbar navbar-dark fixed-top bg-dark text-white flex-md-nowrap p-2 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0">
          <large>CoinMonk</large>
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <medium className="text-white">
                <medium id="account">Account: {this.state.account}</medium>
              </medium>
            </li>
          </ul>
        </nav>
      { this.state.loading
        ? <div id="loader" className="text-center mt-5 pt-5 text-white"><p>Loading...</p></div>
        : <Newsfeed
            author={this.state.account}
            posts={this.state.posts}
            createPost={this.createPost}
            tipPost={this.tipPost}
          />  
       }
    </div>
    );
  }
}

export default Home;
