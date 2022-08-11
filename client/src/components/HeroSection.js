import '../App.css';
import './HeroSection.css';
import Dropzone from "./Dropzone";
import React, { useCallback, useState, useEffect } from "react";
import { useEthers, useEtherBalance, useContractFunction, useCall } from '@usedapp/core';
import { utils, Contract, BigNumber } from 'ethers';
import { notaryAbi } from '../constants/notaryAbi'
import sha256 from 'crypto-js/sha256';

const convertToString = (buffer) => {
  return new Uint8Array(buffer).map((val) => val.toString()).join(',');
}

function HeroSection() {
  const { account } = useEthers()
  const etherBalance = useEtherBalance(account)
  const [file, setFile] = useState(undefined)
  const [fileName, setFileName] = useState(undefined)
  const [txHash, setTxHash] = useState(undefined)
  const [hideCert, setHideCert] = useState(false)

  const [cert, setCert] = useState(false)

  const notaryInterface = new utils.Interface(notaryAbi)
  const notaryAddress = '0x6e3d243ffFf77cC40f12ba718F90A1F75de541D7'
  const contract = new Contract(notaryAddress, notaryInterface)

  const exists = useCall(file && account && {
    contract,
    method: 'checkHash',
    args: [account, file],
  })

  const { state, send } = useContractFunction(contract, 'addHash')

  const sendFile = () => {
    const currentTimestamp = new Date().valueOf()
    send(file, parseInt(currentTimestamp / 1000))
  }

  const onDrop = useCallback(async(acceptedFiles) => {
    const file = acceptedFiles[acceptedFiles.length - 1];
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = async() => {
      const binaryStr = reader.result
      const hashDigest = sha256(convertToString(binaryStr)).toString();
      setFile(hashDigest)
    }
    reader.readAsArrayBuffer(file)

    setFileName(acceptedFiles[acceptedFiles.length - 1].path)
  }, []);

  useEffect(() => {
    if(state.status === 'Success') {
      setCert(true)
      setTxHash(state.transaction.hash)
      console.log(state)
    }
  }, [state, state.status])

  useEffect(() => {
    if (hideCert) {
      window.print()
    }
  }, [hideCert])

  return cert ? 
  (
    <div>
    <div className='hero-container'>
    <h1 style={{color: 'black'}}>File Certification</h1>
    <p style={{color: 'black', fontSize: '20px'}}> {`This is the certificate for the owner of the Ethereum address: ${account}`}</p>
    <h2 style={{color: 'black', margin: '10px 0px'}}> {`for file name: ${fileName}`}</h2>
    <p style={{color: 'black', fontSize: '20px', margin: '10px 0px'}}> {`The file SHA256 digital signature is: ${file}`}</p>
    <h2 style={{color: 'black', margin: '10px 0px'}}> https://goerli.etherscan.io</h2>
    <p style={{color: 'black', fontSize: '20px', margin: '10px 0px'}}> {`The Ethereum blockchain transaction hash is: ${txHash}`}</p>
    {!hideCert && <button style={{fontSize: '20px', backgroundColor: 'green', color: '#fff', padding: '8px 20px', borderRadius: '5px', 
    margin: '10px 0px', border: 'none', cursor: 'pointer'}} onClick={() => {setHideCert(true)}}>Print certificate</button>}
    </div>
    </div>
  )
  :(
    <div className='hero-container'>
      <video src='/videos/video-2.mp4' autoPlay loop muted />
      <h1>Decentralized File Notarization</h1>
      {account && <p> Select a document and have it certified in the Ethereum blockchain</p>}
      
      <main className="dropzone">
      <h2 className="text-center" style={{color: 'white'}}>Certify and Verify the existence and possession of any file</h2>
      {account && <p style={{color: 'white'}}>{`Connected as Ethereum address: ${account}`}</p>}
      {account && <p style={{color: 'red'}}>{`MAKE SURE YOU ARE CONNECTED TO THE GOERLI TEST NETWORK`}</p>}
      {account && etherBalance && <p style={{color: 'white', margin: '10px 0px'}}>{`Ether balance: ${etherBalance.div(BigNumber.from(10).pow(15)).toNumber() / 1000}`}</p>}
      {account && <Dropzone onDrop={onDrop} accept={"/*"} />}
      {account && state.status !== 'None' && <h2 className="text-center" style={{color: 'white'}}>Transaction status: {state.status}</h2>}
      {account && fileName && <p style={{color: 'white', margin: '10px 0px'}}>{'File name: ' + fileName}</p>}
      {account && file && <button disabled={(state.status !== 'None' && state.status !== 'Exception') || exists?.value[0]} 
      style={{fontSize: '20px', backgroundColor: '#ff9800', color: '#fff', padding: '8px 20px', borderRadius: '5px', margin: '10px 0px', 
      border: 'none', cursor: 'pointer', }} onClick={sendFile}>Continue Certification</button>}
      {account && file && (exists?.value[0] ? <h2 style={{color: 'white'}}>File hash already exists on the Ethereum network</h2> : 
      <h2 style={{color: 'white'}}>The file hash does not exist on the Ethereum network</h2>)}
    </main>
    </div>
  );
}

export default HeroSection;