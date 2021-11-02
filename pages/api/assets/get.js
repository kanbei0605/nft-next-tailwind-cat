// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const assets = require('../database.json');

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function handler(req, res) {
    let detectedHats = []
    let detectedShirts = []
    let detectedHomes = []
    if (['Upsidedown', 'Special Zombie', 'Skeleton', 'Robot', 'Lucky', 'Demon', 'Celestial', 'Angel', 'Alien'].indexOf(req.query.home.toLowerCase()) >= 0) {
        detectedHats = assets.hats
        detectedShirts = assets.shirts
        detectedHomes = assets.homes.filter(home => home.url.toLowerCase().indexOf('/' + req.query.home.toLowerCase().replace('_', ' ')) > 0)
    } else {
        detectedHats = assets.hats.filter(hat => hat.url.toLowerCase().indexOf('/' + req.query.hat.toLowerCase()) > 0)
        detectedShirts = assets.shirts.filter(shirt => shirt.url.toLowerCase().indexOf('/' + req.query.shirt.toLowerCase()) > 0)
        detectedHomes = assets.homes.filter(home => home.url.toLowerCase().indexOf('/' + req.query.home.toLowerCase().replace('_', ' ')) > 0)
    }
    res.status(200).json({ 
        hat: detectedHats[Math.floor(Math.random() * detectedHats.length)],
        shirt: detectedShirts[Math.floor(Math.random() * detectedShirts.length)],
        home: detectedHomes[Math.floor(Math.random() * detectedHomes.length)],
    })
}
  