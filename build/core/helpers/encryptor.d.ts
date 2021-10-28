export default class Encryptor {
    encrypt(input: string): Promise<string>;
    compare(hashValue: string, value: string): Promise<boolean>;
}
