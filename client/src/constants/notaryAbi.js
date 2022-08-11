export const notaryAbi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "singleHash",
          "type": "string"
        },
        {
          "internalType": "uint",
          "name": "timestamp",
          "type": "uint"
        }
      ],
      "name": "addHash",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "hashValue",
          "type": "string"
        }
      ],
      "name": "checkHash",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getHashes",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "hashValue",
              "type": "string"
            },
            {
              "internalType": "uint32",
              "name": "timestamp",
              "type": "uint32"
            }
          ],
          "internalType": "struct Notary.Hash[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  