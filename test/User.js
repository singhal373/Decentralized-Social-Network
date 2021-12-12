const User = artifacts.require('User')

contract('user', () => {
  
  it("Is able to create user", async () => {
    const acc = await User.deployed()

    const name = web3.utils.fromAscii("satoshi")
    const fname = web3.utils.fromAscii("Satoshi")
    const lname = web3.utils.fromAscii("Nakamoto")
    const tr = await acc.createUser(name,fname,lname)

    assert.isOk(tr)
  })

  it("Is able to retrieve user information", async () => {
    const acc = await User.deployed()
    const Id = 1
    
    const user = await acc.getUser.call(Id)
    const name = web3.utils.toAscii(user[1]).replace(/\u0000/g, '')

    assert.equal(name, "satoshi")
  });

})