# Step 1: Build stage
FROM node:22-alpine AS builder  
# Use alpine for smaller image size
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Step 2: development stage
FROM node:22-alpine AS runner   
# Use alpine for smaller image size
WORKDIR /app  

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy only necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/.env ./.env 
COPY --from=builder /app/package.json ./package.json

USER nextjs                        
 # Switch to non-root user
EXPOSE 3000
CMD ["yarn", "start"]