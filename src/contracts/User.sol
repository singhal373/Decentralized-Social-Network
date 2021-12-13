pragma solidity ^0.5.0;

contract User{

	mapping(uint => Account) public users;
	mapping(address => bytes32) public usernames;
	mapping (bytes32 => bytes32) public names;
	uint public totalUsers = 0;

	
	struct Account{
		uint id;
		bytes32 name;
		// address addr;
	}

	// event UserCreated(
	// 	uint id,
	// 	string name
	// );

	event LoggedIn(
		bool b1
	);

	function login(bytes32 name, string memory pass) public returns(bool){
		bytes32 p1 = names[name];
		bytes32 p2 = keccak256(abi.encodePacked(pass));
		emit LoggedIn(p1==p2);
	}

	function createUser(bytes32 _name) public {
		totalUsers++;
		address addr = msg.sender;
		Account memory acc = Account(totalUsers, _name);
		users[totalUsers] = acc;
		usernames[addr] = _name;
		// names[_name] = totalUsers;
		// emit UserCreated(id, name);
	}

	// function getUser(address pubkey) view public returns(uint, string memory){
	// 	emit UserReturned(
	// 		account[pubkey].id,
	// 		account[pubkey].name
	// 	);
	// }
}