const router = require("express").Router();
const whatsappRouter = require("./whatsapp");
const uploadRouter = require("./upload");

router.get("/", (req, res) => {
  res.json({
    status: "👋",
    message: "Bienvenido a la API para enviar mensajes de Whatsapp.",
  });
});

router.use("/whatsapp", whatsappRouter);
router.use("/upload", uploadRouter);

module.exports = router;
