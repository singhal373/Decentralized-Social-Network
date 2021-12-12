/* eslint-disable no-undef */
const SocialNetwork = artifacts.require("SocialNetwork");
const Constants = artifacts.require("Constants");
const User = artifacts.require("User");

module.exports = function(deployer) {
  deployer.deploy(Constants);
  deployer.link(Constants, SocialNetwork);
  deployer.deploy(SocialNetwork);
  deployer.deploy(User);
};