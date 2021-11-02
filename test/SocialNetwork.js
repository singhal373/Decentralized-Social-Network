/* eslint-disable no-undef */
const SocialNetwork = artifacts.require("./SocialNetwork.sol");
const Constants = artifacts.require("./Constants.sol");


require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('SocialNetwork', ([deployer, author, tipper]) => {
  let socialNetwork, constants
  before(async () => {
    socialNetwork = await SocialNetwork.deployed()
    constants = await Constants.deployed()
  })

  describe('Deployment', async () => {
    it('Successful Deployment', async () => {
      const address = await socialNetwork.address
      assert.notEqual(address, undefined)
      assert.notEqual(address, null)
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
    })

    it('Social Network has a name', async () => {
      assert.equal(await socialNetwork.name(), await constants.getNetworkName())
    })
  })

  describe('Posts', async () => {
    let result, postCount

    before(async () => {
      result = await socialNetwork.createPost('Some post content', { from: author })
      postCount = await socialNetwork.postCount()
    })

    it('creates posts', async () => {
      // SUCCESS
      assert.equal(postCount, 1)
      const event = result.logs[0].args
      assert.equal(event.author, author, 'Correct author')
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'Correct Id')
      assert.equal(event.content, 'Some post content', 'Correct content')
      assert.equal(event.tipAmount, '0', 'Correct tip amount')

      // FAILURE: Reject the post in case of no content
      await socialNetwork.createPost('', { from: author }).should.be.rejected;
    })

    it('lists posts', async() => {
      const post = await socialNetwork.posts(postCount)
      assert.equal(post.id.toNumber(), postCount.toNumber(), 'Correct Id')
      assert.equal(post.content, 'Some post content', 'Correct content')
      assert.equal(post.tipAmount, '0', 'Correct tip amount')
      assert.equal(post.author, author, 'Correct author')
    })

    it('allow tipping', async()=>{

      let originalBal, newBal,tipAmount
      originalBal = new web3.utils.BN(await web3.eth.getBalance(author))
      result = await socialNetwork.tipPost(postCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })

      // SUCCESS
      const event = result.logs[0].args
      assert.equal(event.author, author, 'Correct author')
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'Correct Id')
      assert.equal(event.content, 'Some post content', 'Correct content')
      assert.equal(event.tipAmount, '1000000000000000000', 'tip amount verified')

      // Check that the author received funds
      newBal = new web3.utils.BN(await web3.eth.getBalance(author))
      tipAmount = new web3.utils.BN(web3.utils.toWei('1', 'Ether'))
      const exepectedBalance = originalBal.add(tipAmount)
      assert.equal(newBal.toString(), exepectedBalance.toString())

      // FAILURE: Post id doesn't exist
      await socialNetwork.tipPost(99, { from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
      await socialNetwork.tipPost(0, { from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
    })
  })
})
