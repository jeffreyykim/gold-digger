# GoldDigger
Live Preview: 

A web application for gold investment with live price tracking and simulated gold purchasing.

## Description

GoldDigger is a modern web application that allows users to invest in gold with real-time price updates. The app features a clean interface displaying current gold prices per ounce and enables users to make investment calculations and transactions.

## Features

- **Live Price Tracking**: Real-time gold price updates with connection status indicators
- **Investment Calculator**: Calculate gold ounces based on investment amount
- **Transaction Processing**: Submit and track gold investment transactions
- **Responsive Design**: Clean, modern interface optimized for all devices
- **Investment Summary**: Detailed transaction confirmations with transaction IDs

## Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Node.js with native HTTP module
- **Styling**: Custom CSS with Google Fonts (Poppins, Roboto, Saira Stencil One)
- **Development**: Nodemon for hot reloading

## API Endpoints

### POST `/api/invest`
Submit a gold investment transaction.

**Request Body:**
```json
{
  "date": "2025-08-10",
  "amountInvested": 1000.00,
  "amountPaid": 1000.00,
  "pricePerOz": 2045.50,
  "goldSold": 0.489
}
```

**Response:**
```json
{
  "success": true,
  "message": "Investment recorded successfully",
  "transactionId": 1723286400000
}
```

## Project Structure

```
gold-digger/
├── server.js              # Main server file
├── package.json           # Project dependencies and scripts
├── requests.http          # API testing requests
├── public/                # Static files served to clients
│   ├── index.html         # Main application page
│   ├── index.js           # Frontend JavaScript logic
│   ├── index.css          # Application styles
│   ├── gold.png           # Gold icon/favicon
│   ├── image.png          # Additional images
│   └── 404.html           # Error page
└── utils/                 # Server utilities
    ├── getContentType.js  # MIME type helper
    ├── sendResponse.js    # Response helper
    └── serveStatic.js     # Static file server
```

## Development

- **Port**: The application runs on port 8000 by default
- **Hot Reload**: Use `npm run dev` for automatic server restart on file changes
- **Static Files**: All public assets are served from the `/public` directory

## Features in Detail

### Price Simulation
The application simulates real-time gold price fluctuations with:
- Base price around $2045.50 per ounce
- Random price changes between -$5 and +$5
- Price bounds between $1800 and $2500
- Update intervals between 2-5 seconds

### Investment Processing
- Validates investment amounts
- Calculates gold ounces with 3 decimal precision
- Generates unique transaction IDs
- Provides detailed investment summaries

## Author

Jeffrey Kim


*Note: This application uses simulated gold prices for demonstration purposes. For real gold trading, please consult with licensed financial advisors and use regulated trading platforms.*