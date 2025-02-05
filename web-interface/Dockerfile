# Use the official Node.js image based on Alpine Linux
FROM node:18-alpine

#Create a non-root user and group
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Change ownership of the application files
# RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]
