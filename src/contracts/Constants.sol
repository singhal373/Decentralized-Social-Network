pragma solidity ^0.5.0;

library Constants {
    string public constant SocialNetworkName = "IBC Decentralized Social Network";
    
    function getNetworkName() public pure returns(string memory){
      return SocialNetworkName;
    }
}