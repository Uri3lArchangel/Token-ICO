//SPDX-License-Identifier:MIT

pragma solidity 0.8.17;


contract Token {
string public name = "Trojan Horse Token";
string public symbol="THT";
uint8 public decimals = 0;
uint256 public initialSupply=0;
uint256 public totalSupply=0;
address public owner;
mapping(address => uint256) public balanceOf;
mapping(address => mapping(address => uint256)) public allowance;
mapping(address => bool) public isMinter;
mapping(address => uint256) public isHolders;
uint256 public Holders=0;

constructor (uint256 _supply) {
initialSupply = _supply;
totalSupply=_supply;
owner=msg.sender;
decimals = 0;
balanceOf[owner]=initialSupply;
isMinter[owner]=true;
isHolders[msg.sender]=1;
Holders=Holders+1;
}
event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
);
event Approval(address indexed _owner,
address indexed _spender,
uint256 _value
);

event MinterAdded(
    address indexed _minter
);

event MinterRemoved(
    address indexed _minter
);
    function add(uint x, uint y) internal pure returns (uint z) {
        require((z = x + y) >= x, "ds-math-add-overflow");
    }
     function sub(uint x, uint y) internal pure returns (uint z) {
        require((z = x - y) <= x, "ds-math-sub-underflow");
    }

function transfer(address _to,uint256 _value) public returns (bool success) {
    require(_to != address(0),'Reciepient address cannot be zero address');
    require(balanceOf[msg.sender] >= _value,'must have sufficient amount to send');
    balanceOf[_to]= add(balanceOf[_to],_value);
    balanceOf[msg.sender]= sub(balanceOf[msg.sender],_value);
    if(isHolders[_to] == 0){
        Holders=add(Holders,1);
        isHolders[_to]=1;
    }
    emit Transfer(msg.sender, _to, _value);
    return true;

}
function increaseAllowance(address _spender,uint256 _value) public returns (bool success){
    require(_spender != address(0),'Spender address cannot be zero address');
    require(balanceOf[msg.sender] >= _value,'must have sufficient amount to aprove');
    allowance[msg.sender][_spender]=add(allowance[msg.sender][_spender],_value);
    emit Approval(msg.sender, _spender, _value);
    return true;
}
function decreaseAllowance(address _spender,uint256 _value) public returns (bool success){
    require(_spender != address(0),'Spender address cannot be zero address');
    require(balanceOf[msg.sender] >= _value,'must have sufficient amount to aprove');
    allowance[msg.sender][_spender]=sub(allowance[msg.sender][_spender],_value);
    emit Approval(msg.sender, _spender, _value);
    return true;
}
function transferFrom(address _from,address _to,uint256 _value) public returns(bool success) {
    require(_from != address(0));
    require(_to != address(0));
    require(balanceOf[_from] >= _value,"cannot transfer more than balance");
    require(allowance[_from][msg.sender] >= _value,'cannot perform delegated transfer greater than allowance');
    balanceOf[_from] = sub(balanceOf[_from],_value);
    balanceOf[_to]=add(balanceOf[_to],_value);
    allowance[_from][msg.sender] = sub(allowance[_from][msg.sender],_value);
    emit Transfer(_from, _to, _value);

    return true;
}
function addMinter(address _minter) public returns (bool success) {
    require(_minter != address(0));
    require(msg.sender == owner);
    isMinter[_minter] = true;
    emit MinterAdded(_minter);
    return true;
}
function removeMinter(address _minter) public returns (bool success){
    require(_minter != address(0));
    require(msg.sender == owner);
    require(isMinter[_minter] == true);
    isMinter[_minter] = false;
    emit MinterRemoved(_minter);
    return true;
}
function renounceMinter() public {
    require(isMinter[msg.sender] == true);
    require(msg.sender != owner);
    isMinter[msg.sender] = false;
    emit MinterRemoved(msg.sender);

}
function mint(address _account,uint256 _value) public returns (bool success){
require(_account != address(0));
require(isMinter[msg.sender] == true);
balanceOf[_account] = add(balanceOf[_account], _value);
totalSupply=add(totalSupply,_value);
if(isHolders[_account] == 0){
        Holders=add(Holders,1);
        isHolders[_account]=1;
    }
emit Transfer(address(0), _account, _value);
return true;
}

function burn(address _account,uint256 _value) public returns (bool success){
    require(_account != address(0));
    require(isMinter[msg.sender] == true);
    require(balanceOf[_account] >= _value);
    balanceOf[_account] = sub(balanceOf[_account], _value);
    emit Transfer(_account,address(0),  _value);

    return true;
}
}