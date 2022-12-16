const express = require('express')
const docsRouter = require('./routes/docs')
const log=console.log

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", docsRouter)
const port=4000
app.listen(port, function () { 
    log("Listening on port "+port)
})