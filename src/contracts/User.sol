pragma solidity ^0.5.0;

contract User{

	mapping(uint => Account) public users;
	mapping(address => Account) public accounts;
	mapping (bytes32 => bytes32) public names;
	uint public totalUsers = 0;

	
	struct Account{
		uint id;
		bytes32 name;
		uint256 dateOfJoining;

	}

	event UserCreated(
		uint id,
		bytes32 name
	);

	event LoggedIn(
		bool b1
	);

	function login(bytes32 name, string memory pass) public{
		require(name.length > 0);
		require(bytes(pass).length > 0);
		bytes32 p1 = names[name];
		require(p1 > 0);
		bytes32 p2 = keccak256(abi.encodePacked(pass));
		address addr = msg.sender;
		Account memory acc = accounts[addr];
		emit LoggedIn(p1==p2 && name==acc.name);
	}

	function createUser(bytes32 _name, string memory _pass) public {
		require(_name.length > 0);
		require(bytes(_pass).length > 0);
		totalUsers++;
		address addr = msg.sender;
		uint256 _dateOfJoining = block.timestamp;
		Account memory acc = Account(totalUsers, _name, _dateOfJoining);
		users[totalUsers] = acc;
		accounts[addr] = acc;
		names[_name] = keccak256(abi.encodePacked(_pass));
		emit UserCreated(totalUsers, _name);
	}
}