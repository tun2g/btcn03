const db= require('../configs/connectString')

const CryptoJS = require("crypto-js");
const hashLength = 64;

const pgUser = {
    
    allUser: async () => {
        try {
            const rs = await db.any('SELECT * FROM "USERS"');
            return rs;
        } catch (err) {
            console.log(err);
        }
    },

    addUser: async (user) => {
        try {
            const findUser = await pgUser.findUser(user.username);
            const findEmail = await pgUser.findEmail(user.email);
            if (findUser || findEmail) {
                return "Username or Email has already exists!";
            }
            const ID = await pgUser.findMaxID();
            let max
            !ID?max=0:max=ID.max
            const salt = Date.now().toString(16);
            const pwSalt = user.password + salt;
            const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex);
            const date = new Date().toISOString();
            const rs = await db.one(
                'INSERT INTO "USERS"("ID", "USERNAME", "PASSWORD", "NAME", "EMAIL", "DOB", "PERMISSION") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [max + 1, user.username, pwHashed + salt, user.name, user.email, date, 0]
            );
            return rs;
        } catch (err) {
            console.log(err);
            return "Failed!";
        }
    },

    checkLoginUser: async (user) => {
        try {
            const findUser = await pgUser.findUser(user.username);
            if (!findUser) {
                return "Username not exists!";
            }
            const pwDb = findUser.PASSWORD;
            const pwSalt = user.password + pwDb.slice(hashLength);
            const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex);
            if (pwDb === pwHashed + pwDb.slice(hashLength)) {
                return findUser;
            }
            return false;
        } catch (err) {
            console.log(err);
        }
    },

    findUser: async (username) => {
        try {
            const rs = await db.one('SELECT * FROM "USERS" WHERE "USERNAME"=$1', [username]);
            console.log(rs);
            return rs;
        } catch (err) {
            console.log(err);
        }
    },

    findEmail: async (email) => {
        try {
            const rs = await db.one('SELECT * FROM "USERS" WHERE "EMAIL"=$1', [email]);
            console.log(rs);
            return rs;
        } catch (err) {
            console.log(err);
        }
    },

    findMaxID: async () => {
        try {
            const rs = await db.one('SELECT MAX("ID") FROM "USERS"');
            return rs;
        } catch (err) {
            console.log(err);
        }
    },
};

module.exports = pgUser;
