# Use the official Node image
FROM node:18

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the Next.js port
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]
