const config = require('config')

// Nodejs encryption with CTR
const crypto = require("crypto");
const algorithm = "aes-128-cbc";
const salt = "foobar";
const hash = crypto.createHash("sha1");

hash.update(salt);

// `hash.digest()` returns a Buffer by default when no encoding is given
let key = hash.digest().slice(0, 16);
// const secretkey = config.get('cryptoKey');
// const key = crypto.createHash('sha256').update(String(secretkey)).digest('base64').substr(0, 32);
const iv = crypto.randomBytes(16);

exports.encrypt= function (text) {
  console.log(key.toString());
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString('hex') };
}

exports.decrypt = function (text) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  
  return decrypted.toString();
}

