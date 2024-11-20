# Use an official node image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . ./

# Debugging: List files to ensure src is copied
RUN ls -la
RUN ls -la src/
RUN ls -la src/App.tsx
RUN ls -la src/App.css

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 4173

# Start the application using the built files and expose to host
CMD ["npm", "run", "preview", "--host"]
