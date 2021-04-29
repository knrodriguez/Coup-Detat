const express = require('express');
const app = express();
const PORT = process.env.PORT || 1337;

app.use(express.static(__dirname + '/public'))

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
