const SHA256 = require("crypto-js/sha256")

/*
Block Class
*/

class Block {
  constructor(timestamp, data) {
    this.index = 0
    this.timestamp = timestamp
    this.data = data
    this.previousHash = "0"
    this.hash = this.calculateHash()
    this.nonce = 0
  }

  calculateHash() {
    // Hash function
    return SHA256(
      this.index + this.previousHash + this.timestamp + this.data + this.nonce
    ).toString()
  }

  mineBlock(difficulty) {
    // Set difficulty level
  }
}

/*
Blockchain Class
*/

class Blockchain {
  constructor() {
    this.chain = [this.createGenesis()]
  }

  createGenesis() {
    return new Block(0, "06/21/2018", "Genesis block", "0")
  }

  latestBlock() {
    return this.chain[this.chain.length - 1]
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.latestBlock().hash
    newBlock.hash = newBlock.calculateHash()
    this.chain.push(newBlock)
  }

  checkValid() {
    for (let i = 1; i < this.chain.lenght; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }

      if (currentBlock.previousHash !== previousBlock) {
        return false
      }
    }

    return true
  }
}

let jsChain = new Blockchain()
jsChain.addBlock(new Block("06/22/18", { amount: 5 }))
jsChain.addBlock(new Block("06/22/18", { amount: 10 }))

console.log(JSON.stringify(jsChain, null, 4))
console.log("Is blockchain valid? " + jsChain.checkValid())
