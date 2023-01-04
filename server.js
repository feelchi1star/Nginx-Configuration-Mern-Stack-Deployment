// Node.js program to demonstrate the
// cipher.final() method

// Importing crypto module
const crypto = require('crypto');
const Scrypt = require("util").promisify(crypto.scrypt)
const RandomFill = require("util").promisify(crypto.randomFill)

// Creating and initializing algorithm and password
const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';
const encrypt = async (msg) => {
    
    // Getting key for the cipher object
    const key = await Scrypt(password, 'salt', 24);
    
    const vi = await RandomFill(new Uint8Array(16))
    console.log(vi)
// Creating and initializing the static iv
// const iv = Buffer.alloc(16, 0);
// const iv = Buffer.alloc(16, 0);
    
// Creating and initializing the cipher object
const cipher =await crypto.createCipheriv(algorithm, key, vi);

// Updating the cipher with the data
// by using update() method
let value = cipher.update(msg, 'utf8', 'hex');

    
// Getting buffer value
// by using final() method
 value += cipher.final('hex');

// Display the result
console.log("buffer :- " + value);
}

encrypt('some clear text data')