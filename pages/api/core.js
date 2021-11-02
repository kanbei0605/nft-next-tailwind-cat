// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

import { v4 as uuidv4 } from 'uuid';

const assets = require('./database.json');
import { baseUrl } from '../../config';

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let { hatId, shirtId, homeId, hatPos, shirtPos, homePos} = req.body;
            console.log(hatId)
            console.log(shirtId)
            console.log(homeId)
            let homeInfo = assets.homes.filter(home => home.id === homeId)[0];
            let hatInfo = assets.hats.filter(hat => hat.id === hatId)[0];
            let shirtInfo = assets.shirts.filter(shirt => shirt.id === shirtId)[0];
            console.log(homeInfo)
            console.log(hatInfo)
            console.log(shirtInfo)
    
            const canvas = createCanvas(homePos.wid, homePos.hei)
            const context = canvas.getContext('2d')
    
            try {
                let imgHome = await loadImage(`${baseUrl}${homeInfo.url}`);
                context.drawImage(imgHome, homePos.x, homePos.y, homePos.wid, homePos.hei)
                let imgHat = await loadImage(`${baseUrl}${hatInfo.url}`);
                context.drawImage(imgHat, hatPos.x, hatPos.y, hatPos.wid, hatPos.hei)
                let imgShirt = await loadImage(`${baseUrl}${shirtInfo.url}`);
                context.drawImage(imgShirt, shirtPos.x, shirtPos.y, shirtPos.wid, shirtPos.hei)
                const buffer = canvas.toBuffer('image/png')
                const name = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
                console.log(name)
                await fs.writeFileSync(`art_temp/${name}.png`, buffer);
                res.status(200).json({
                    success: true,
                    id: name,
                    msg: "New image has been generated successfully"
                });
            } catch (err) {
                console.log(err)
                res.status(500).send();
            }
    
        } catch(err) {
            console.log(err)
            res.status(200).json({
                success: false,
                msg: "Fail"
            })
        }
    } else {
        res.status(500).send()
    }
}
  