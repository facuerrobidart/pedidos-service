# Use an official Node.js runtime as the base image
FROM node:23-slim

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json before app code for layer caching
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app code
COPY . .

# Expose the port your app runs on (adjust if different)
# Puse 3003 para que no choque con el 3000 del otro back si lo probamos localmente
EXPOSE 3003

# Start the app
CMD [ "npm", "start" ]