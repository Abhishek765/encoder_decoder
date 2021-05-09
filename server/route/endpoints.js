const express = require('express');

const router = express.Router();

// ! Logic for Encoding Decoding
let hasMap = new Map();

const generateRandomStr = (len, chars) => {
    let result = '';
    for (let i = len; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
// For encoding
const encodeStr = (longStr) => {
    let sample = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let shortStr = generateRandomStr(5, sample);
    hasMap[shortStr] = longStr;
    return shortStr;
}

// Decodes a shortened string to its original string.
const decode = (shortStr) => {
    return hasMap[shortStr];
}


//! ROUTES
router.get('/', (req, res) => {
    res.status(200).send(`Home Welcome to Home`);
})

router.post('/shorten', (req, res) => {

    const { original } = req.body;

    if (!original) {
        return res.status(422).json({ error: "Please fill the data properly" });
    }
    try {
        // else encode the string and send back to front-end
        let shortStr = encodeStr(original);
        console.log(`shortStr Here`, shortStr);

        return res.status(200).json({ encode: shortStr });
    } catch (error) {
        console.log(error.message)
    }

})

router.post('/restore', (req, res) => {

    const { encode } = req.body;

    if (!encode) {
        return res.status(422).json({ error: "Please fill the data properly" });
    }
    try {
        // else decode the string and send back to front-end
        let longStr = decode(encode);
        console.log(`LongStr Here`, longStr);

        return res.status(200).json({ original: longStr });
    } catch (error) {
        console.log(error.message)
    }

})


module.exports = router;