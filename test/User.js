const User = artifacts.require('User')

contract('user', () => {
  
  it("Is able to create user", async () => {
    const acc = await User.deployed()

    const name = web3.utils.fromAscii("satoshi")
    const fname = web3.utils.fromAscii("Satoshi")
    const lname = web3.utils.fromAscii("Nakamoto")
    const pass = "pass"
    const tr = await acc.createUser(name, pass)

    assert.isOk(tr)
  })

})