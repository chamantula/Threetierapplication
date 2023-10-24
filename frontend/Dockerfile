# Use an official lightweight Node.js image
FROM node:14-slim

# Create a directory to store your website files
WORKDIR /app

# Copy the contents of your frontend project into the container
COPY . .

# Expose the port on which your website will run (e.g., port 80)
EXPOSE 80

# Define the command to run your website (e.g., a simple HTTP server)
CMD ["npx", "http-server", "-p", "80"]

