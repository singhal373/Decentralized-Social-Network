pragma solidity ^0.5.0;

contract SocialNetwork {
  string public name; // state variable
  uint public postCount = 0;
  mapping(uint => Post) public posts;

  struct Post {
    uint id;
    string content;
    uint tipAmount;
    address author;
  }


  event PostCreated(
      uint id,
      string content,
      uint tipAmount,
      address payable author
  );

  event PostTipped(
      uint id,
      string content,
      uint tipAmount,
      address payable author
  );

  constructor() public {
    name = "Decentralized Social Network App";
  }

  function createPost(string memory _postContent) public {
    require(bytes(_postContent).length > 0);
    postCount ++;
    posts[postCount] = Post(postCount, _postContent, 0, msg.sender);
    emit PostCreated(postCount, _postContent, 0, msg.sender);
  }

  function tipPost(uint _id) public payable{
    require(_id > 0 && _id <= postCount);
    Post memory _post = posts[_id];
    address payable _author = address(uint160(_post.author));
    address(_author).transfer(msg.value);
    _post.tipAmount = msg.value + _post.tipAmount;
    posts[_id] = _post;
    emit PostTipped(postCount, _post.content, _post.tipAmount,_author);
  }

}