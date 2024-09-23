# Use official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy the rest of the application, including server.js and data.json
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the Node.js server
CMD ["node", "server.js"]
