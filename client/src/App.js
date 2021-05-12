import React, { useState } from 'react'
import './App.css';

const App = () => {

  const [original_string, setOriginalString] = useState({
    original: ""
  })
  const [coded_string, setCodedString] = useState({
    encode: ""
  })

  const [originalStr, setOriginalStr] = useState("");
  const [encodedStr, setEncodedStr] = useState("");

  const handleOriginal = (event) => {

    let name = event.target.name;
    let value = event.target.value;
    setOriginalString({ ...original_string, [name]: value });

  }
  const handleCoded = (event) => {

    let name = event.target.name;
    let value = event.target.value;
    setCodedString({ ...coded_string, [name]: value });

  }
  // For setting the Key,value in localstorage
  const setLocaleStorage = async (newEncode, newOriginal) => {

    let obj = JSON.parse(localStorage.getItem('user-info')) || {};
    let newObj = { ...obj, [newEncode]: newOriginal };

    console.log(`user : ${JSON.stringify(newObj)}`);
    if (newObj) {
      localStorage.setItem("user-info", JSON.stringify(newObj));
    }
  }

  // Getter method to get the values of a particular code
  const getFromLocaleStorage = (code) => {
    return JSON.parse(localStorage.getItem(code));
  }


  // For Encoding
  const postOriginal = async (event) => {
    event.preventDefault();
    const { original } = original_string;

    if (!original) {
      window.alert("Please Fill the entry");
      return;
    }

    const res = await fetch("/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        original
      })
    });

    if (res.status === 422 || res.status === 500) {
      alert("Something Went Wrong!!!")
    }
    else {
      const data = await res.json();

      if (data.res === 422 || data.res === 500 || !data) {
        window.alert("Something Went Wrong!!!");
        console.log("Something Went Wrong!!!");
      }
      else {
        let { encode } = data;
        console.log(`data: ${encode}`);
        setLocaleStorage(encode, original);
        setEncodedStr(encode);
      }
    }

  }

  // For Decoding 
  const postEncoded = async (event) => {
    event.preventDefault();
    const { encode } = coded_string;

    if (!encode) {
      window.alert("Please Fill the entry");
      return;
    }
    // Getting the object from localstorage
    let newUser = getFromLocaleStorage("user-info");

    // If key exists
    if (encode in newUser) {
      let originalStr = newUser[encode];
      console.log(`Key data: ${originalStr}`);
      setOriginalStr(originalStr);
    }
    else {
      window.alert("Code is Invalid")
      // const res = await fetch("/restore", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     encode
      //   })
      // });

      // const data = await res.json();

      // if (data.res === 422 || !data) {
      //   window.alert("Something Went Wrong!!!");
      //   console.log("Something Went Wrong!!!");
      // }
      // else {
      //   let { original } = data;
      //   console.log(`data: ${original}`);
      //   setOriginalStr(original);
      // }
    }
  }


  return (
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
  )
}

export default App;
