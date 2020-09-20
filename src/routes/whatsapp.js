const whatsappRouter = require("express").Router();
const { MessageType } = require("@adiwajshing/baileys");
const {
  connectToWhatsapp,
  connectToWhatsappByFile,
  client,
} = require("../config/whatsappConnection");
const messageSchema = require("../models/messageSchema");
const axios = require("axios").default;

connectToWhatsappByFile();

whatsappRouter.post("/connect", async (req, res) => {
  try {
    await connectToWhatsapp();

    res.json({
      status: 200,
      message: "Conexión correcta con Whatsapp.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

whatsappRouter.post("/send", async (req, res) => {
  try {
    if (req.body === undefined) throw new Error("ValidationError");

    const { error } = await messageSchema.validateAsync(req.body);

    if (error !== undefined) throw new Error("ValidationError");

    const { phone, message, files } = req.body;

    const id = `593${phone}@s.whatsapp.net`;

    await client.sendMessage(id, message, MessageType.text);

    if (files) {
      for (const file of files) {
        const fileR = await axios.get(file.url, {
          responseType: "arraybuffer",
        });
        const buffer = Buffer.from(fileR.data, "binary");

        if (file.type === "image") {
          await client.sendMessage(id, buffer, MessageType.image);
        } else if (file.type === "video") {
          await client.sendMessage(id, buffer, MessageType.video);
        }
      }
    }

    res.json({
      status: 201,
      message: "Mensaje enviado correctamente.",
    });
  } catch (err) {
    console.error(err);
    if (err.message.includes(`ValidationError`) || err.details) {
      res.status(400).json({
        status: 400,
        message: `El cuerpo de la petición debe contener los campos 'phone', 'message', y opcionalmente 'files'`,
        details: err.details,
      });
    } else if (err.message.includes(`'jid'`)) {
      res.status(403).json({
        status: 403,
        message: "No estás autenticado para enviar mensajes.",
      });
    } else {
      res.status(500).json({
        error: err,
      });
    }
  }
});

module.exports = whatsappRouter;
