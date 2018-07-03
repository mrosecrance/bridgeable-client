# Bridgeable Client

A React web client which interacts with a express 'server' which communicates with the twillio api. 
It reads phone numbers and names off a CSV file, then generates a form to text those people 
with a customizable message.

### Run locally:
Copy the .env.template files to .env and fill in the values

Run the Client:
```bash
npm run start
```

Run the Server from the server directory:
```bash
cd server
node --harmony server.js
```
