const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0dERm9CVzJYMUFUTUNXRG1pbDdhWlE2TE5RY0VDMzdtMmN5cVhYNUFXdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVXBMNjFVN3pHaENocUtvWUl5a2hsY2R3dUk5OGJpY05xM1h5dnhxazFpaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBQkYrZm5nMDdvWUtiTmFRdW1OU1ZpUkdGVitRNnQvWlM5NGYzVTdwSkZvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzUG9Langzb0t2WjI1VTJpUFlYTlF5SUM2V1NUMSt3SWxDei9LVHNVeUNBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhNY25wR2VVODVlWXlKd2UyTThJOTN1Nm1IckNCNUJSblJBSzhLeVF0bm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlyTEFtMU1hMnRQUU1kQVRpZkgvT3E2WERMSWFRZlh1cWxvU2FTS1JDbDQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0V2N3hsSnhFUElodGFJaW1WK2lIRUlBbmJ0Mk93eVNocWJPNXE3TXRYUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSlg3M3k5OFpISmdXdlkyMUt1NXhRYjE4ZktyMFl2ai83L1JyS3pxYzFoaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImQvUEk5RnNQQWtOUlhYQ0UycU5rc2JhVHFCWW84NC9WVmRPaGlMc2JEN1h0UGY4bE5vbkZlR1pGSnhqZ001TUpKd0MrWFk4eEhLN0FlZlVrZXVHbUF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIsImFkdlNlY3JldEtleSI6IjNISnQyb1BFZEhGSTRBNzU4cUtEbXNNTk9qQUY0SWtJa3FMWVIzZ1VzQWM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzE0MjU0MTE1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkRGMTc5NjkyREIyMzI4NjhFOTlERUNDMEI5OENBNUFGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjUwMTU2MTd9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkJENmZTT0Z1VHp1Wk1pYWc0R1h6RmciLCJwaG9uZUlkIjoiYzk2OWFmZWYtNzJlNC00M2U2LWEzMTgtMzEzODJmZWQzMzk4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRsa1F0ZVhoejdLRytpSjBQeGYrb2FVMDNTMD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5czBQNUdwWUZZTkRCTlE4cEU2MERhdFpMRnM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUjhCNzlDUzYiLCJtZSI6eyJpZCI6IjI2MzcxNDI1NDExNTo1QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMU280dmtCRUsvTXhyWUdHQVVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIzckU0VVc2MTRUejR1ZzloeXFqMG9NNitMcENlZllsbEJZU002SzRCckhVPSIsImFjY291bnRTaWduYXR1cmUiOiJ1Nml6N3RhV3FlZzdVMzFNSDNsNlJlRTVFN3lpRDY5UndOTkFzekNWVjNudWdzalJqV2hDMk9NZXJTcFhsU0ZuWU03SnhHbXVCZ3pvd2p4eWxhaXhCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiMUcxK1BnNzBDckNMblAxbC9JNFNyaS9XMUlOOUNwRVhUK3pjK2dNTmVhVXlvcndGeTVVcWpHMHF1WUpSbm9yRVlaN1F4SE1STmVkTXc3VkI5Y1ZvQVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3MTQyNTQxMTU6NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkNnhPRkZ1dGVFOCtMb1BZY3FvOUtET3ZpNlFubjJKWlFXRWpPaXVBYXgxIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI1MDE1NjEyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxUUSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Rizz",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " keithkeizzah",              
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
    CHATBOT : process.env.PM_CHATBOT || 'no',
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
