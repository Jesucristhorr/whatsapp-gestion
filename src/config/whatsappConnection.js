const { WAConnection } = require("@adiwajshing/baileys");
const client = new WAConnection();
const fs = require("fs");

const connectToWhatsappByFile = async () => {
  try {
    client.loadAuthInfo("./auth_info.json");
    await client.connect();
  } catch (err) {
    if (err.message.includes("ENOENT")) {
      console.info(
        `El archivo de autenticación no existe, vaya a la ruta [/api/v1/whatsapp/connect] para conectarse.`
      );
    }
  }
};

const connectToWhatsapp = async () => {
  try {
    await client.connect();
    const cred = client.base64EncodedAuthInfo();
    fs.writeFileSync("./auth_info.json", JSON.stringify(cred, null, "\t"));
  } catch (err) {
    console.error(err);
  }
};

module.exports = { connectToWhatsapp, connectToWhatsappByFile, client };
