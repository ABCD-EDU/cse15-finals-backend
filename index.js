// @ts-nocheck
const express = require('express');
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(fileUpload());

app.post('/extract-text', (req, res) => {
  if (!req.files && !req.files.pdfFile) {
    res.status(400);
    res.end();
  }

  // TODO: send result of parsed PDF to python server
  pdfParse(req.files.pdfFile).then((result) => {
    res.send(result.text);
  });
});

app.listen(8080, () => {
  console.log(`Server started on port 8080`);
});
