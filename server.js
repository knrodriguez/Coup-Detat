const express = require('express');
const app = express();
const PORT = process.env.PORT || 1337;

app.use(express.static(__dirname + '/public'))

app.get('*', (req, res, next) => {
    try {
        res.sendFile(__dirname + '/public/index.html')
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
