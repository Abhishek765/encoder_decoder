# Encoder_Decoder
Web App for strings Encoding-Decoding without any built-in functions😁😉📷

# How To Run the Project

## There are two ways to install the project:

### 1. Conventional Way


***1.*** Open Project Folder</br>

***2.*** To install all dependencies open Command Prompt and run
```
npm i
```
***3.*** To install all client dependencies open client folder and again run 
 ```
 npm i
 ```
***4.*** To run the server-
```
npm server.js or nodemon server.js
```
***5.*** To run the client-
```
yarn start
```




# Alorithm:
I am using the concept of Hashing:
1. Like we can hash the strings with their hash values (short strings), here keys- strings, and value-shortstrings<br>

`let hasMap = new Map();
`

<br>

2. for encoding- I used `encodeStr(longStr)`- which takes long string and give me back the short string

```js
// For encoding
const encodeStr = (longStr) => {
    let sample = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let shortStr = generateRandomStr(5, sample);
    hasMap[shortStr] = longStr;
    return shortStr;
}
```

3. Generator function `generateRandomStr(len, chars)` to generate random strings of a particular length `len` from the given available samples `chars`, 
  which contains  alphanumeric characters.  

```js
const generateRandomStr = (len, chars) => {
    let result = '';
    for (let i = len; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
```
 
4. For decoding the the shortStr - `decode(shortStr)` , we can simply get the original string from Hashmap created.

```js
// Decodes a shortened string to its original string.
const decode = (shortStr) => {
    return hasMap[shortStr];
}

```
5. Then we can simply utilize these functions to build the required APIs.
```js
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

```

6. In Frontend- we have single comonent which displays two input fields, buttons and text(for answer): 
```js
 <div className="region_container">
      <form method="POST">
        <div className="encode_region">

          <div className="region_style encoded_input_region">
            <input type="text" name="original" id="original" placeholder="Put your original String Here..." value={original_string.original}
              onChange={handleOriginal}
              autoComplete="off"
            />
            <button type="submit" className="btn_encode" onClick={postOriginal}>Encode the String</button>
          </div>
          <h4 className="decoded_string">Encoded str: {encodedStr}</h4>

        </div>
      </form>

      <form method="POST">
        <div className="decode_region">
          <div className="region_style decode_input_region">
            <input type="text" name="encode" id="encode" placeholder="Put your original String Here..." value={coded_string.encode}
              onChange={handleCoded}
              autoComplete="off"
            />
            <button type="submit" className="btn_encode" onClick={postEncoded}>Decode the String</button>
          </div>
          <h4 className="encoded_string">Original string: {originalStr}</h4>

        </div>
      </form>

    </div>
```

[Live Demo Link](https://www.youtube.com/watch?v=iJW0KMNjN60)


# Screenshots and Different testcases:

<img src="https://github.com/Abhishek765/encoder_decoder/blob/master/Demo_images/start.png" width="auto" height="300">&#160;&#160;&#160;
<img src="https://github.com/Abhishek765/encoder_decoder/blob/master/Demo_images/encoding.png" width="auto" height="300">&#160;&#160;&#160;
<img src="https://github.com/Abhishek765/encoder_decoder/blob/master/Demo_images/decoding.png" width="auto" height="300">&#160;&#160;&#160;
<img src="https://github.com/Abhishek765/encoder_decoder/blob/master/Demo_images/Long_strings_test.png" width="auto" height="300">&#160;&#160;&#160;
<img src="https://github.com/Abhishek765/encoder_decoder/blob/master/Demo_images/Empty_string_test.png" width="auto" height="300">&#160;&#160;&#160;

