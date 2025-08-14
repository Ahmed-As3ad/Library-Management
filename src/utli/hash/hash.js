import bcrypt from 'bcryptjs'
export const generateHash = ({ plaintext = '' } = {}) => {
    const hash = bcrypt.hashSync(plaintext, +process.env.SALT)
    return hash
}

export const CompareHash = ({ plaintext = '', hashValue = '' } = {}) => {
    const compare = bcrypt.compareSync(plaintext, hashValue)
    return compare
}