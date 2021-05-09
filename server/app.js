const express = require('express');
const app = express();
const PORT = 5000;
// Middleware for json
app.use(express.json());

app.use(require('./route/endpoints'));

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})
