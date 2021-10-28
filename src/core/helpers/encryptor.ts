import bcrypt from "bcrypt";

export default class Encryptor {
  public encrypt(input: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(input, 10, (err, hashValue) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(hashValue);
        }
      });
    });
  }

  public compare(hashValue: string, value: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(value, hashValue, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }
}
