# DStocks

DStocks is a meme trading platform where users can buy, sell, and track the popularity of internet memes as virtual assets.

The idea behind DStocks is to turn memes into a market-driven experience. Just like stocks, memes gain or lose value based on trends, popularity, and user activity. Users can discover trending memes, invest in their favorites, track their portfolio, and watch how the meme market changes over time.

---

## Features

### Meme Marketplace
- Browse trending memes available for trading
- Buy and sell meme assets
- Track meme prices and popularity
- Experience a simulated meme economy

### Meme Charts
- Visualize meme performance over time
- Track price fluctuations using interactive charts
- Display market trends using Chart.js


### Trending Feed
- Explore popular memes in the community
- Discover rising and declining memes
- Sort memes based on market activity

### Meme Integration
- Integrated Giphy API to fetch and display memes
- Adds a dynamic and entertaining experience to the platform

### Authentication
- Secure user authentication
- Google OAuth integration using Passport.js

---

## Tech Stack

### Frontend
- React.js
- JavaScript
- CSS
- Axios
- Chart.js

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- Passport.js
- Google OAuth

### APIs
- Giphy API

---

## Project Structure
DStocks
|
├── Frontend
│ ├── src
│ ├── components
│ └── pages
|
├── Backend
│ ├── controllers
│ ├── models
│ ├── routes
│ └── config
|
└── README.md


---

## Installation and Setup

### Clone the repository

```bash
git clone <repository-url>
cd Backend
npm install

.env
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

Further improvements
# Optimise Data storage
# Speed up the retrieval of the stock prices
# Improve UI / UX
# Make it publicly available
# Integrate sockets for real time communication - Chat rooms
# Introduce IPO based features and chart predictions 
