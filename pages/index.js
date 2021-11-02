import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import About from '../components/About';
import Collections from '../components/Collections';
import FAQ from '../components/FAQ';

import Web3 from "web3";

const axios = require("axios").default;

import { contractAddress } from '../config';

export default function Home() {
  const [ walletAddress, setWalletAddress ] = useState(null)
  const [ cats, setCats ] = useState([]);

  async function signIn() {
    if (typeof window.web3 !== 'undefined') {
      // Use existing gateway
      window.web3 = new Web3(window.ethereum);
     
    } else {
      alert("No Ethereum interface injected into browser. Read-only access");
    }

    window.ethereum.enable()
        .then(function (accounts) {
            window.web3.eth.net.getNetworkType()
            // checks if connected network is mainnet (change this to rinkeby if you wanna test on testnet)
            .then((network) => {
                console.log(network);
                if(network != "main"){
                    alert("You are on " + network+ " network. Change network to mainnet or you won't be able to do anything here")
                } else {
                  let wallet = accounts[0]
                  setWalletAddress(wallet)
                  getCats();
                }
                // setSignedIn(true)
                // callContractData(wallet)
            }).catch(function (err) {
                console.log(err)
            });  
    
        })
        .catch(function (error) {
            // Handle error. Likely the user rejected the login
            console.error(error)
        })
  }
  useEffect( async() => { 
      // signIn()
  }, [])


  const getCats = async () => {
    let cats_temp = [
      // {url: '/resources/cat.png'}
    ];
    let res = {};
    do {
      res = await axios.request({
        method: 'GET',
        // owner=${walletAddress}&
        // asset_contract_address=${contractAddress}&
        url: `https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=50&collection=cool-cats-nft&owner=${walletAddress}`
      })
      if (res.data.assets.length > 0) {
        cats_temp = cats_temp.concat(res.data.assets)
      }
      console.log(res.data.assets)
    } while(res.data.assets.length > 0 && cats_temp.length < 100);
    
    setCats(cats_temp);
  }

  return (
    <>
      <Head>
        <title>NFT GENERATOR[CAT]</title>
        <meta name="description" content="nextjs app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar walletAddress={walletAddress} setWalletAddress={setWalletAddress} signIn={signIn}/>
      <main className="bg-blue-300">
        <Banner />
        <Collections cats={cats} walletAddress={walletAddress}/>
        <About />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
