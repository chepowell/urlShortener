# Use the official NestJS base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build the NestJS app
RUN npm run build

# Expose API port
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start:prod"]
