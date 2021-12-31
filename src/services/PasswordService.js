import crypto from 'crypto';

const SALT_LEN = 32;
const KEY_LEN = 64;

const PasswordService = {
  _serializeHash({ salt, hash }) {
    const saltString = salt.toString('hex');
    const hashString = hash.toString('hex');

    return `${saltString}:${hashString}`;
  },
  _deserializeHash(hashString) {
    const parsed = hashString.split(':');
    const salt = Buffer.from(parsed[0], 'hex');
    const hash = Buffer.from(parsed[1], 'hex');

    return {
      salt,
      hash,
    };
  },

  hash(password) {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(SALT_LEN, (err, salt) => {
        if (err) {
          reject(err);
          return;
        }

        crypto.scrypt(password, salt, KEY_LEN, (err, hash) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(this._serializeHash({ salt, hash }));
        });
      });
    });
  },

  verify({ password, hash }) {
    return new Promise((resolve, reject) => {
      const parsedHash = this._deserializeHash(hash);
      const keyLen = parsedHash.hash.length;
      const salt = parsedHash.salt;

      crypto.scrypt(password, salt, keyLen, (err, hashedPassword) => {
        if (err) reject(err);

        resolve(crypto.timingSafeEqual(hashedPassword, parsedHash.hash));
      });
    });
  },
};

export default PasswordService;
