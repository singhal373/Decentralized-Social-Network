pragma solidity ^0.5.0;

contract User{

	mapping(uint => Account) account;
	mapping (bytes32 => uint) public names;

	uint totalUsers = 0;

	
	struct Account{
		uint id;
		bytes32 name;
		bytes32 firstName;
    	bytes32 lastName;
	}

	function createUser(bytes32 _name, bytes32 _firstname, bytes32 _lastname) public returns(uint){
		totalUsers++;
		account[totalUsers] = Account(totalUsers, _name, _firstname, _lastname);
		names[_name] = totalUsers;
		return totalUsers;
	}

	function getUser(uint _id) view public returns(uint, bytes32){
		return(
			account[_id].id,
			account[_id].name
		);
	}
}