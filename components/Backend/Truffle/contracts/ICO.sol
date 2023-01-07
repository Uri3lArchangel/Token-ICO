//SPDX-License-Identifier:MIT

pragma solidity 0.8.17;
import './Token.sol';

contract ICO{
    Token public tokenContract;
    uint256 public salePrice;
    address payable public admin;
    uint256 public tokensSold=0;

    constructor(Token _tokenAddress,uint256 _salePrice){
        tokenContract =_tokenAddress;
        salePrice = _salePrice;
        admin=payable(msg.sender);
    }
    event Sold(
        address indexed _buyer,
        uint256 _amount
    );
       function add(uint x, uint y) internal pure returns (uint z) {
        require((z = x + y) >= x, "ds-math-add-overflow");
    }
    function sub(uint x, uint y) internal pure returns (uint z) {
        require((z = x - y) <= x, "ds-math-sub-underflow");
    }
    function mul(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x, "ds-math-mul-overflow");
    }
    function ICOBalance()view public returns(uint256){
        return tokenContract.balanceOf(address(this));
            }
    

    function buyTokens(uint256 _amount) public payable returns(bool success) {
        require(msg.value == mul(_amount,salePrice),'must transfer right amount of ether');
        require(tokenContract.balanceOf(address(this)) >= _amount ,'must have sufficient tokens');
        tokenContract.transfer(msg.sender, _amount);
        admin.transfer(mul(_amount,salePrice));
        tokensSold= add(tokensSold, _amount);
        emit Sold(msg.sender,_amount);
        return true;
    }

    function endSale() public {
        require(msg.sender == admin);
        tokenContract.transfer(admin,tokenContract.balanceOf(address(this)));
        selfdestruct(admin);
        
    }

}