pragma solidity ^0.5.0;
import {Constants} from "./Constants.sol";

contract SocialNetwork {
  string public name; // state variable
  uint public postCount = 0;
  mapping(uint => Post) public posts;

  struct Post {
    address author;
    uint id;
    string content;
    uint tipAmount;
  }

  event PostCreated(
      address payable author,
      uint id,
      string content,
      uint tipAmount
  );

  event PostTipped(
      address payable author,
      uint id,
      string content,
      uint tipAmount
  );

  constructor() public {
    name = Constants.getNetworkName();
  }

  function createPost(string memory _postContent) public {
    require(bytes(_postContent).length > 0);
    postCount ++;
    posts[postCount] = Post(msg.sender, postCount, _postContent, 0);
    emit PostCreated(msg.sender,postCount, _postContent, 0);
  }

  function tipPost(uint _id) public payable{
    require(_id > 0 && _id <= postCount);
    Post memory _post = posts[_id];
    address payable _author = address(uint160(_post.author));
    address(_author).transfer(msg.value);
    _post.tipAmount = msg.value + _post.tipAmount;
    posts[_id] = _post;
    emit PostTipped(_author,postCount, _post.content, _post.tipAmount);
  }

}