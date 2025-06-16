#!/bin/bash

# Production startup script for WeeLog documentation site
echo "Starting WeeLog production deployment..."

# Build the application
echo "Building application..."
npm run build

# Check if build was successful
if [ ! -f "dist/index.js" ] || [ ! -f "dist/public/index.html" ]; then
    echo "Build failed - required files not found"
    exit 1
fi

echo "Build successful. Starting production server..."

# Start the production server
NODE_ENV=production node dist/index.js