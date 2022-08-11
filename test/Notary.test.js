const {  time, loadFixture,} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { constants } = require("ethers");

describe("Notary", function () {
  async function deployNotary() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Notary = await ethers.getContractFactory("Notary");
    const notary = await Notary.deploy();
    return { notary, owner, otherAccount };
    }

    it('Deploys correctly and has an address', async function () {
      const { notary } = await loadFixture(deployNotary);
      expect(notary.address).to.be.properAddress
    });

    it('Returns correct hash', async () => {
      const { notary, owner } = await loadFixture(deployNotary);
      await notary.addHash('testHash', 1)
      const hashes = await notary.getHashes(owner.address)
      expect(hashes).to.deep.eq([['testHash', constants.One]])
    })
      
    it('Cannot override hash', async () => {
      const { notary } = await loadFixture(deployNotary);
      await notary.addHash('testHash', 1)
      await expect(notary.addHash('testHash', 2)).to.be.reverted
    })

    it('Do not overflowed timestamp', async () => {
      const { notary } = await loadFixture(deployNotary);
      await expect(notary.addHash('testHash', new Date().valueOf())).not.to.be.reverted
    })

    it('Checks if hash exists', async () => {
      const { notary, owner } = await loadFixture(deployNotary);
      await notary.addHash('testHash', 1)
      const hashes = await notary.getHashes(owner.address)
      expect(hashes).to.deep.eq([['testHash', constants.One]])
      expect(await notary.checkHash(owner.address, 'testHash')).to.be.true
      expect(await notary.checkHash(owner.address, 'testHash2')).to.be.false
    })
})