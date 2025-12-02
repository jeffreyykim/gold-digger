import http from 'node:http'
import path from 'node:path'
import { serveStatic } from './utils/serveStatic.js'

const PORT = process.env.PORT || 8000
const __dirname = import.meta.dirname

function parseJSON(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/api/invest') {
        try {
            const investmentData = await parseJSON(req);
            
            console.log('Investment received:', {
                date: investmentData.date,
                amountInvested: investmentData.amountInvested,
                amountPaid: investmentData.amountPaid,
                pricePerOz: investmentData.pricePerOz,
                goldSold: investmentData.goldSold
            });
            
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ 
                success: true, 
                message: 'Investment recorded successfully',
                transactionId: Date.now()
            }));
            return;
        } catch (error) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: 'Invalid data' }));
            return;
        }
    }
    
    await serveStatic(req, res, __dirname)
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})