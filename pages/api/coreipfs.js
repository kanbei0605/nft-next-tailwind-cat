// const ipfsClient = require("ipfs-http-client");
// const ipfs = new ipfsClient({ host : 'localhost', port:'5001', protocol :'http' });

const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
const { pinataApiKey, pinataSecretApiKey, APP_NAME } = require("../../config");
const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey);

export default async function coreipfs (req, res) {
    if (req.method === "POST") {
        let { id, hat, shirt, home } = req.body;
        // const file = fs.readFileSync(`../../art_temp/${id}.png`);

        const readableStreamForFile = fs.createReadStream(`art_temp/${id}.png`);
        const options = {
            pinataMetadata: {
                name: APP_NAME,
                keyvalues: {
                    name: APP_NAME,
                    description: `${APP_NAME} is generating perfect image combination`
                }
            },
            pinataOptions: {
                cidVersion: 0
            }
        };
        pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
            //handle results here
            const body = {
                "description": "Friendly OpenSea Creature that created from cat.", 
                "external_url": "https://www.metahomes.com", 
                "image": `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`, 
                "name": "Cat's home",
                "attributes": [ 
                    {
                      "trait_type": "hat", 
                      "value": hat
                    }, 
                    {
                      "trait_type": "shirt", 
                      "value": shirt
                    }, 
                    {
                      "trait_type": "home", 
                      "value": home
                    }, 
                ], 
            };
            const options = {
                pinataMetadata: {
                    name: 'JSON'
                },
                pinataOptions: {
                    cidVersion: 0
                }
            };
            pinata.pinJSONToIPFS(body, options).then((result1) => {
                //handle results here
                console.log(result1)
                res.status(200).json({
                    IpfsHash: result1.IpfsHash,
                    PinSize: result1.PinSize
                })
            }).catch((err) => {
                //handle error here
                console.log(err);
                res.status(500).send();
            });
        }).catch((err) => {
            //handle error here
            console.log(err);
            res.status(500).send();
        });
    
    } else {
        res.status(404).send();
    }
}

