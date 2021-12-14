import React, { Component } from 'react';
import Web3 from 'web3'
import SocialNetwork from '../abis/SocialNetwork.json';
import User from '../abis/User.json';
import Main from './Main';
import Newsfeed from './Newsfeed';
import UserPage  from './UserPage';
import './styles/Home.css';
import Login from './Login';

class Home extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      username: 0,
      socialNetwork: null,
      postCount: 0,
      posts: [],
      loading: true, // default
      user: null,
      userCount: 0,
      accounts: [],
      loggedIn: false,
      errorMessage: false,
    }    
    this.createPost = this.createPost.bind(this)
    this.tipPost = this.tipPost.bind(this)
    this.checkCreds = this.checkCreds.bind(this)
    this.logOut = this.logOut.bind(this)
    this.createUser = this.createUser.bind(this)
  }

  componentDidMount() {
    let loggedIn = window.localStorage.getItem('loggedIn')
      this.setState({
          loggedIn 
      })
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

  checkCreds(username, password) {
    this.setState({username: username})
    window.localStorage.setItem('loggedIn', true)
    window.localStorage.setItem('username', username)
    this.setState({loggedIn: true})
  }

  logOut() {
    this.setState({loggedIn: false})
    window.localStorage.clear();
  }

  createUser(name, pass) {
    this.state.user.methods.createUser(name, pass).send({ from: this.state.account})
    .once('receipt', (receipt) => {
      window.localStorage.setItem('loggedIn', true)
      this.setState({ loggedIn: true })
      this.setState({ username: name})
    })
  }


  async loadBlockchainData() {
    const web3 = window.web3

    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = SocialNetwork.networks[networkId]
    let done = 0

    const networkData_ = User.networks[networkId]
    if(networkData_) {
      const user = new web3.eth.Contract(User.abi, networkData_.address)
      console.log(user)
      this.setState({user})
      const userCount = await user.methods.totalUsers().call()
      this.setState({userCount})

      for (var i = 1; i <= userCount; i++) {
        const account = await user.methods.users(i).call()
        // console.log(post)
        this.setState({
          accounts: [...this.state.accounts, account]
        }, () => {
          console.log(this.state.accounts)
        })
      }

      const my_acct = await user.methods.accounts(this.state.account).call()
      const name = my_acct === 0 ? web3.utils.fromAscii("user") : my_acct.name
      console.log("Username", name)
      this.setState({username: name})

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
          const acct = await user.methods.accounts(post.author).call()
          this.setState({
            posts: [...this.state.posts, [post, acct]]
          }, () => {
            console.log(this.state.posts)
          })
        }
        console.log(this.state.posts.length, {posts: this.state.posts})
        console.log("Done loading blockchain")
        // this.setState({ loading: false})
        done = done + 1
      } else {
        window.alert('SocialNetwork contract is not deployed to detected network.')
      }

      // const account = await user.methods.accounts(this.state.account).call()
      // this.setState({})
      
      // this.setState({ loading: false})
      done = done + 1
    } else {
      window.alert('SocialNetwork contract is not deployed to detected network.')
    }

    if (done == 2) {
      this.setState({ loading: false})
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
              {/* <medium className="text-white"> */}
                {/* <medium id="account">Account: {this.state.account}</medium> */}
                {this.state.loggedIn ? 
                  <medium className="text-white">
                  <medium id="account">Account: {this.state.account}</medium><button class="button-54" onClick={this.logOut}>   Logout
                  </button></medium>: <medium className="text-white">
                  <medium id="account">Account: {this.state.account}</medium></medium>
                }
            </li>
          </ul>
        </nav>
        {this.state.loading ?
            <div id="loader" className="text-center mt-5 pt-5 text-white"><p>Loading...</p></div>
            : this.state.loggedIn ? 
            <Newsfeed
                author={this.state.account}
                posts={this.state.posts}
                createPost={this.createPost}
                tipPost={this.tipPost}
              />
           : <Login
                user={this.state.account}
                // contract={this.state.user}
                checkCreds={this.checkCreds}
                errorMessage={this.state.errorMessage}
                createUser={this.createUser}
           />
        }
    </div>
    );
  }
}

export default Home;
