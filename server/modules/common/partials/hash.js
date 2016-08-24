'use strict';

const passwordHash = require('password-hash');

class Hash {
    constructor() {}
    
    static compareHashedPasswords(password, hash) {
        const verified = passwordHash.verify(password, hash);
        return verified;
    }
    
    static generatePasswordHash(password) { 
        const hash = passwordHash.generate(password);
        return hash;
    }
}

module.exports = Hash;