"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class Encryptor {
    encrypt(input) {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.hash(input, 10, (err, hashValue) => {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(hashValue);
                }
            });
        });
    }
    compare(hashValue, value) {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.compare(value, hashValue, (err, result) => {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(result);
                }
            });
        });
    }
}
exports.default = Encryptor;
