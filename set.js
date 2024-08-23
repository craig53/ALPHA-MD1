const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUZrSW5Fdi91RUZFNzF5Zm90RFVkSGNKVzJMSWhGVUNSZW15QVd5b2IwWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVEVMLytSVUVPZUdTL1BFTFlSVVUwa1FuWm9sY2Z1ZWdaVDdFQTlNU2JBST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwRE9iUVlqZGM3c3dkSy9rOU53QmV1OC9QOG5PWGdrZjgwNVc3V0RiV1dFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwY2ZIaElkVUN0RDJrQjdMS214a1BDT000UDR5cHduNWZESjRacFRJR1FFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndHa0ZsUzNHZlY2WUppR09KaUNxendFbTVlcStqV0w4WnVNQ1I1THcrbDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhST01tWVI3UjZNQ29hYWE3Yk42YmY2RjJkK2RYTWd0cUhIYTJmN0pwems9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0Z3NmMyUm13dEwyNkNjRU5hUjZBejZ4NVdkTzlaQ3ltZ2tNWThtM0VYdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNUw4a2thcGFVQllWZHhjbE5vOWxaenZZaWZtdHcreGNsRXRQQlZpaEh6VT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZsd0Q1cWlVNUYyOGFwcjJlNTIyY1hQTXpQMDhZWERIWE5odjM2SlpmR0M2RzNwUTJUU0oxQU04TFJXOGJJQUJ3dFFWb2ZzYTVSaC9nNFRTS05YZ0NBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgsImFkdlNlY3JldEtleSI6ImdoT1NnUEhGRlRKVW56bDhyMkIvcXY0RmhseEN2d1RhMXNaMlA0MTdqSzQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzE0MjU0MTE1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkY5NDlCMkUwOEY0OUJCNTQ5MTBFOThEMTI4NkY4QkE3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjQyNzE5NTB9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI2MzcxNDI1NDExNUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyQ0JFRDFDREFBNEIyOTY1QkFENjg1N0RCQTc5NTI3QiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI0MjcxOTUwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJSYlNkYUVmTlRNMlA3a2VrM0FwY25nIiwicGhvbmVJZCI6IjQyNTBjY2YxLWUxMTctNDcwMy1iNzI0LTM1YmNiZmU3YzMwNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDSWY4N1lvQ1RSa3NYbndWaFk1cEdMRzBadWM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOXpCQktGRHUybnZwSW4yeGE0K0FGNUwra3l3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlNLVEROSzRWIiwibWUiOnsiaWQiOiIyNjM3MTQyNTQxMTU6MkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLGgcOqw6sifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xTbzR2a0JFTCthbWJZR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjNyRTRVVzYxNFR6NHVnOWh5cWowb002K0xwQ2VmWWxsQllTTTZLNEJySFU9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImFjOWRQRmdJS1ZYWE12RjM2WkFzcWF3OEZWSEhoak9FRTd1UmpzYU5ZSkZmaFlwczhGMyt4R2d6ZlFVRjh4RWZKZ3h5TXdHS3FObld0bTFaV0pIREJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ1cXJ1a0R5Ykh4WENBMFNOVmFuYzVXR2sxZUlZZlJPOHBDSlFueDk0THl6TlpwL3UvVkxLekxYd0ZaYW5mZkwzQm5lOFhYVFdEaHptWkY2cVhrNUFDUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxNDI1NDExNToyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmQ2eE9GRnV0ZUU4K0xvUFljcW85S0RPdmk2UW5uMkpaUVdFak9pdUFheDEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQyNzE5NDgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTFRQIn0=",
    PREFIXE: process.env.PREFIX || "/",
    OWNER_NAME: process.env.OWNER_NAME || "Rizz",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 263714254115",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
