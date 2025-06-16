# Deployment Configuration Guide

## Current Status
Your project is properly configured for deployment with:
- ✅ Build command: `npm run build` (working)
- ✅ Start command: `npm start` (working)
- ✅ Production server on port 5000
- ✅ Static file serving configured

## Required .replit Configuration

Since the .replit file is missing, create one with this content:

```toml
run = "npm start"
modules = ["nodejs-20"]

[nix]
channel = "stable-23_11"

[deployment]
run = ["sh", "-c", "npm start"]
deploymentTarget = "cloudrun"

[[ports]]
localPort = 5000
externalPort = 80

[env]
NODE_ENV = "production"
```

## Deployment Steps

### Option 1: Manual .replit Creation
1. In Replit Shell, run:
   ```bash
   cat > .replit << 'EOF'
   run = "npm start"
   modules = ["nodejs-20"]
   
   [nix]
   channel = "stable-23_11"
   
   [deployment]
   run = ["sh", "-c", "npm start"]
   deploymentTarget = "cloudrun"
   
   [[ports]]
   localPort = 5000
   externalPort = 80
   
   [env]
   NODE_ENV = "production"
   EOF
   ```

### Option 2: Replit Deployments Interface
1. Click "Deploy" button in Replit
2. Configure these settings:
   - **Build Command**: `npm run build`
   - **Run Command**: `npm start`
   - **Port**: 5000
   - **Environment**: Production

## Verification

Your project build process works correctly:
- Frontend builds to `dist/public/`
- Backend bundles to `dist/index.js`
- Server serves on `0.0.0.0:5000`
- Static files served in production mode

The deployment should work once the .replit file is created with the proper configuration.