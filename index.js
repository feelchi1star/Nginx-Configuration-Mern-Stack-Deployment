const {
  scrypt,
  randomFill,
  createCipheriv,
  createDecipheriv,
} = require('node:crypto');
const promise= require("util").promisify

const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';

// First, we'll generate the key. The key length is dependent on the algorithm.
// In this case for aes192, it is 24 bytes (192 bits).
const encrypt = async (message) => {
    
   await scrypt(password, 'salt', 24, (err, key) => {
        if (err) throw err;
        // Then, we'll generate a random initialization vector
        randomFill(new Uint8Array(16), (err, iv) => {
            if (err) throw err;

    const cipher = createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log(encrypted);
  });
});
}

const decrypt =async (msg) => {
    
   await scrypt(password, 'salt', 24, (err, key) => {
        if (err) {
            console.log(err.name,err.message)
    return
        }
        // The IV is usually passed along with the ciphertext.
        const iv = Buffer.alloc(16, 0); // Initialization vector.
        
        const decipher = createDecipheriv(algorithm, key, iv);
        // Encrypted using same algorithm, key and iv.


        const encrypted =
  'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log(decrypted);
    });

}

encrypt(JSON.stringify({ m: 5, o: 3 }))
decrypt("15e84ee7fb4c95fccc9fc31bf0a23987")
