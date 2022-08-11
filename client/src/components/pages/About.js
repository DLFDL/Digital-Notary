import React from 'react';
import '../../App.css';


export default function About() {


  return (
    <div className='hero-container'>
      <video src='/videos/video-2.mp4' autoPlay loop muted />
      <div style={{fontSize: '20px', padding: '20px', backgroundColor: 'black', color: 'white'}}>
      <p>
        The difficulty in protecting intellectual property is one of many problems that blockchain can potentially help.
        Decentralized, open and cryptographic character of blockchain allows people to trust each other and makes the intermediaries unnecessary. 
        Digital Notary is a web-based service thanks to which anyone can generate a confirmation that intellectual good existed at a certain moment and was in its possession. 
        By using the website, users can provide indisputable evidence of the existence of an intellectual good. The evidence is obtained by creating a digital fingerprint in the form of a cryptographic hash, and by adding a trusted time-stamping mechanism, defining the specific moment of the date and time in which it was created. 
        The hash constitutes the exact contents of the file uploaded. The hash function is only one-way, and it is infeasible to reverse it, so one cannot get a file from a hash. 
        Digital Notary does not receive a file and it is not possible to read its content. 
        The file itself is not available to the public, but the use of cryptography allows one to check with complete certainty whether the file was modified after placing it on a blockchain. 
        When the same file is uploaded again, the same hash will be created and then verify that the hash already exists on the Ethereum network. Even the slightest change in the input data will cause a complete change in the hash. </p>
      </div>
    </div>
  )

}