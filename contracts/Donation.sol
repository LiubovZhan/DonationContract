//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

contract Donation {

  address payable public ownerOfContract;
  address[] public donators;
  uint[] public donations;
  mapping (uint=>address) public ownerOfDonations;


  constructor() {
    ownerOfContract = payable(msg.sender);
  }

  function gatherDonation() public payable {
    require(msg.value >= .001 ether);
    donators.push(msg.sender);
    donations.push(msg.value);
    uint keyAsLastDonation = donations.length -1;
    ownerOfDonations[keyAsLastDonation] = msg.sender;

  }

  function transferDonation(address toTransfer) public payable {
    require(msg.sender == ownerOfContract);
    ownerOfContract.transfer(address(toTransfer).balance);
  }

  function getDonators() public view returns (address[] memory) {
    return donators;
  }

  function getDonations(address toUser) public view returns (uint[] memory) {
    uint8 length = 0;
    for (uint i = 0; i <donations.length; i++){
      if (ownerOfDonations[i] == toUser){
        length++;
        }
    }

    uint[] memory donationUser = new uint[](length);
    uint8 x = 0;
    for (uint i = 0; i <donations.length; i++){
      if (ownerOfDonations[i] == toUser){
        donationUser[x] = donations[i];
      }
      x++;
    }

    return donationUser;
  } 

}
