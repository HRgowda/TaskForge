# We are doing multi-stage build in order to reduce the size of the image's.

# Stage 1 :
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install all dependencies (including TypeScript & Prisma for build)
RUN npm install

# Copy the rest of the project
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build TypeScript files
RUN npm run build

# Remove dev dependencies and unnecessary files to reduce image size
RUN npm prune --production && rm -rf src

# Use a smaller final runtime image
# Stage 2
FROM node:20-alpine AS runner

WORKDIR /app

# Copy production dependencies and built files from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Ensure Prisma Client exists (this avoids the missing `/app/prisma` issue)
COPY --from=builder /app/prisma ./prisma

# Set the command to run the app
CMD ["node", "dist/index.js"]
