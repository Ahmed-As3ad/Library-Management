import CryptoJS from 'crypto-js'

export const cryptos = (plaintext = '') => {
    const crypto = CryptoJS.AES.encrypt(plaintext, process.env.SECRETKEY_DEV).toString();
    return crypto
}

export const decryption = (ciphered='') => {
    const decrypt = CryptoJS.AES.decrypt(ciphered, process.env.SECRETKEY_DEV).toString(CryptoJS.enc.Utf8);
    return decrypt
}