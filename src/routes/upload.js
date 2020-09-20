const uploadRouter = require("express").Router();
const multer = require("multer");
const upload = multer();
const ImageKit = require("imagekit");
const imagekit = new ImageKit({
  publicKey: process.env.IMKIT_PUBLIC_KEY,
  privateKey: process.env.IMKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMKIT_ENDPOINT,
});

uploadRouter.post("/files", upload.array("files"), async (req, res) => {
  try {
    const { files } = req;
    const filesUploaded = [];

    for (let file of files) {
      const resUpload = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
      });

      filesUploaded.push({
        url: resUpload.url,
        type: file.mimetype.split("/")[0],
      });
    }

    res.json({
      status: 201,
      message: "Los archivos se subieron satisfactoriamente.",
      filesUploaded,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = uploadRouter;
