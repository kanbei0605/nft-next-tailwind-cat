import React, { Component, useState, useRef } from "react";
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import axios from 'axios';

import Web3 from "web3";

import Loader from './Loader';
import ProgressBar from './ProgressBar';

import { ABI, contractAddress } from '../config';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
    },
};

Modal.setAppElement('#modal-root');


export default function Collections({cats, walletAddress}) {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const imgRefCat = useRef(null);
    const imgRefHat = useRef(null);
    const imgRefShirt = useRef(null);
    const imgRefHome = useRef(null);
    const [loadingImg, setLoadingImg] = useState(false);
    const [uploadingToServer, setUploadingToServer] = useState(false);
    const [uploadingToServerP, setUploadingToServerP] = useState(0);

    const [minting, setMinting] = useState(0);

    const [hat, setHat] = useState(-1);
    const [shirt, setShirt] = useState(-1);
    const [home, setHome] = useState(-1);
    const [hatPos, setHatPos] = useState({x: 0, y: 0, wid: 576, hei: 576});
    const [shirtPos, setShirtPos] = useState({x: 0, y: 0, wid: 576, hei: 576});
    const [homePos, setHomePos] = useState({x: 0, y: 0, wid: 576, hei: 576});

    const [pinataIpfs, setPianataIpfs] = useState('');

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    function openModal(catUrl, name, description, traitHat, traitShirt, traitHome) {
        setIsOpen(true);
        setLoadingImg(true);
        setName("")
        setDescription("")
        
        axios.get(`/api/assets/get?home=${traitHome}&shirt=${traitShirt}&hat=${traitHat}`).then(({data}) => {
            console.log(data)
            imgRefCat.current.src = catUrl;
            imgRefHat.current.src = data.hat.url;
            imgRefShirt.current.src = data.shirt.url;
            imgRefHome.current.src = data.home.url;

            setHat(data.hat)
            setShirt(data.shirt)
            setHome(data.home)
            
            setLoadingImg(false)
        }).catch(err => {
            setLoadingImg(false)
            console.log(err)
        });
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal() {
        if (!loadingImg) {
            setPianataIpfs("")
            setIsOpen(false);
            setMinting(0)
        }
    }

    const uploadImage = async () => {
        setMinting(1)
        setUploadingToServer(true);
        let timer = setInterval(() => {
            if (uploadingToServerP < 90) {
                setUploadingToServerP(uploadingToServerP + 10);
            } else {

            }
        }, 50);
        let res = await axios.post('/api/core', { hatId: hat.id, shirtId: shirt.id, homeId: home.id, hatPos, shirtPos, homePos });
        setUploadingToServerP(0);
        setUploadingToServer(false);
        if (res.data.success) {
            let res1 = await axios.post('/api/coreipfs', { id: res.data.id, hat: hat.color, shirt: shirt.color, home: home.color });
            clearInterval(timer);
            setPianataIpfs(res1.data.IpfsHash)
            
            const catsContract = new window.web3.eth.Contract(ABI, contractAddress)
            const amountToSend = window.web3.utils.toWei('0.05', "ether")
            console.log(amountToSend)
            const minted = await catsContract.methods.mintTokens(1, [`https://gateway.pinata.cloud/ipfs/${res1.data.IpfsHash}`]).send({from: walletAddress, value: amountToSend}) 
            console.log(minted)
            setMinting(2)
            setName('')
            setDescription('')
            window.open(
                'https://testnets.opensea.io/account',
                '_blank' // <- This is what makes it open in a new window.
            );
        } else {
            console.log(res.data.msg)
        }
    }

    return (
        <section id="collections" className="overflow-hidden text-gray-700 ">
            <div className="px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                <section className="dark:bg-gray-800">
                    <div className="max-w-3xl px-6 py-6 mx-auto text-left">
                        <h1 className="font-namunbrush text-3xl font-semibold text-gray-800 dark:text-gray-100">My Collections</h1>
                    </div>
                </section>
                <div className={`grid grid-cols-4 gap-4 relative`}>
                    { cats.length === 0 ? <Loader /> :
                        cats.map((cat, id) => {
                            let traitShirt = cat.traits.filter(trait => trait.trait_type == 'shirt')[0].value;
                            let traitHat = cat.traits.filter(trait => trait.trait_type == 'hats')[0].value;
                            let traitHome = cat.traits.filter(trait => trait.trait_type == 'tier')[0].value;
                            return (
                                <div key={id} className="px-4">
                            
                                    <img 
                                        className="object-cover w-full h-auto mt-2" 
                                        src={`${cat.image_thumbnail_url}`} 
                                        alt="CAT NFT" 
                                    />
                            
                                    <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                                        <span className="text-xl"></span>
                                        <span className="text-xl" data-tip data-for={`tooltip-info-${id}`}>
                                            <img src="https://img.icons8.com/color/24/000000/general-mandatory-action.png" />
                                        </span>
                                        <ReactTooltip id={`tooltip-info-${id}`} place="top" effect="solid" className="max-w-xs">
                                            <>
                                                <p>Name: {cat.name}</p>
                                                <p>Description: {cat.description}</p>
                                            </>
                                        </ReactTooltip>
                                        <span className="text-xl text-white uppercase cursor-pointer" onClick={() => openModal(cat.image_thumbnail_url, cat.name, cat.description, traitHat, traitShirt, traitHome)}>create</span>
                                    </div>
                                </div>
                            )
                        }) }
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="w-full" style={{width: '576px', height: '576px'}}>
                    {loadingImg && <Loader />}
                    <div className={`mx-auto w-full h-full ${loadingImg ? 'hidden' : ''}`}>
                        <img className="absolute" style={{
                            top: `${homePos.y}px`,
                            left: `${homePos.x}px`,
                            width: `${homePos.wid}px`,
                        }} src="" ref={imgRefHome}></img>
                        <img className="absolute" style={{
                            top: `${hatPos.y}px`,
                            left: `${hatPos.x}px`,
                            width: `${hatPos.wid}px`,
                        }} src="" ref={imgRefHat}></img>
                        <img className="absolute" style={{
                            top: `${shirtPos.y}px`,
                            left: `${shirtPos.x}px`,
                            width: `${shirtPos.wid}px`,
                        }} src="" ref={imgRefShirt}></img>
                        <img className="absolute" src="" alt="CAT" ref={imgRefCat} style={{
                            top: "10px",
                            left: "10px",
                            width: "50px",
                            height: "50px",
                        }}/>
                    </div>
                    { uploadingToServer ? <Loader /> : "" }
                    <button 
                        className="flex items-center text-5xl -mt-24 uppercase border w-4/5 justify-center mx-auto px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-transparent-600 rounded-md hover:bg-pink-500 focus:outline-none focus:ring focus:ring-transparent-300 focus:ring-opacity-80 mx-auto my-3"
                        onClick={uploadImage}
                    >
                        {minting == 0 && 'Mint'}
                        {minting == 1 && 'Minting'}
                        {minting == 2 && 'Minted'}
                    </button>
                </div>
            </Modal>
        </section>
    )
}