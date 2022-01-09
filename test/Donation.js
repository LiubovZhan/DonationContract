const { expect } = require("chai");

describe("Donation contract", function() {
 

    it("Should check the owner is valid", async function () {
      const [owner] = await ethers.getSigners();
      const Donation = await ethers.getContractFactory("Donation");
      const contract = await Donation.deploy();

      await contract.deployed();
      
      expect(await contract.ownerOfContract()).to.equal(await owner.address);
      });
    
    it("Should accept donations from the donator", async function () {
      const [sender] = await ethers.getSigners();
      const Donation = await ethers.getContractFactory("Donation");
      const contract = await Donation.deploy();

      await contract.deployed();

      await expect(() =>
        contract.gatherDonation({ value: 200 })
      ).to.changeEtherBalance(sender, -200);

      });

    it("Should transfer donations to address", async function () {
      const [owner, recipient] = await ethers.getSigners();
      const Donation = await ethers.getContractFactory("Donation");
      const contract = await Donation.deploy();

      await contract.deployed();

      await expect(() =>
        contract.transferDonation(recipient.address,{ value: 100 })
      ).to.changeEtherBalance(recipient, +100);

      });
    
  
});