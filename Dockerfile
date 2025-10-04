# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy only package.json and lock file first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project (except ignored by .dockerignore)
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose API port
EXPOSE 5000

# Start app
CMD ["npm", "run", "dev"]