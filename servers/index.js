const express = require('express');
const app = express();
const router = require('./router');

app.use(express.static("upload"));

app.use("/api", router);

app.listen(8090, () => {
  console.log('Server is running on port 8090')
});