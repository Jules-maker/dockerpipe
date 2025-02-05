# Use the official Node.js image based on Alpine Linux, je peux faire 18-alpine pour la version 18
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Protect the application from the most common security risks
RUN useradd -m appuser
USER appuser

# Install dependencies
RUN npm install

# Copy the rest of the application code, refer to the current directory defined with WORKDIR
COPY . .

# Expose the port the app runs on, on pourrait mettre des variables, et un .env à ../ au même niveau que le docker-compose.yml
EXPOSE 3005

# Command to run the application
CMD ["node", "admin.js"]