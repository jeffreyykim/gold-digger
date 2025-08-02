import http from 'node:http'
import path from 'node:path'
import { serveStatic } from './utils/serveStatic.js'


const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {

    const pathToResource = path.join(__dirname, 'public', 'index.html')
    await serveStatic(__dirname, res)

})


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})