# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy your application files (server.js and other dependencies)
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your application will listen on
EXPOSE 3000

# Start your application when the container starts
CMD [ "node", "server.js" ]

