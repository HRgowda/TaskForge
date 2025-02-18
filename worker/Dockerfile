# Stage 1: Build
FROM node:20-alpine AS builder  
# Use Alpine 3.21 or similar (since OpenSSL 3 is now default)

WORKDIR /app

# Install OpenSSL 3.x and compatibility libraries for Prisma
RUN apk add --no-cache openssl libssl3

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./  

RUN npm install

# Copy the rest of the project
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build TypeScript files
RUN npm run build

# Remove dev dependencies and unnecessary files
RUN npm prune --production && rm -rf src

# Stage 2: Final runtime
FROM node:20-alpine AS runner 

WORKDIR /app

# Install OpenSSL 3.x and compatibility libraries for the runtime stage
RUN apk add --no-cache openssl libssl3

# Copy production dependencies and built files from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Set the command to run the app
CMD ["node", "dist/index.js"]
