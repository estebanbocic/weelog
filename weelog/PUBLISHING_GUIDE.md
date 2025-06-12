# WeeLog NPM Publishing Guide

## Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://npmjs.com)
2. **Node.js**: Ensure you have Node.js 12+ installed
3. **NPM CLI**: Make sure npm is installed and updated

## Step-by-Step Publishing Instructions

### 1. Verify Package Structure

Your package should have this structure:
```
weelog/
├── dist/
│   ├── weelog.cjs.js     # CommonJS build
│   ├── weelog.esm.js     # ES Module build
│   ├── weelog.d.ts       # TypeScript definitions
├── src/
│   └── weelog.ts         # Source code
├── package.json          # Package configuration
├── README.md            # Documentation
├── LICENSE              # MIT License
├── .npmignore           # Files to exclude from npm
└── tsconfig.json        # TypeScript config
```

### 2. Login to NPM

```bash
npm login
```

Enter your NPM username, password, and email when prompted.

### 3. Verify Login

```bash
npm whoami
```

This should display your NPM username.

### 4. Check Package Name Availability

```bash
npm view weelog
```

If the package doesn't exist, you'll see an error (which is good - means the name is available).

### 5. Test the Package Locally

```bash
# Navigate to the weelog directory
cd weelog

# Install dependencies (if any)
npm install

# Run tests (if configured)
npm test

# Create a test build
npm run build
```

### 6. Verify Package Contents

```bash
npm pack --dry-run
```

This shows what files will be included in the package without creating the actual tarball.

### 7. Publish to NPM

```bash
# For first-time publishing
npm publish

# If you need to publish a specific version
npm publish --tag latest

# For beta/pre-release versions
npm publish --tag beta
```

### 8. Verify Publication

```bash
# Check if package is published
npm view weelog

# Install your own package to test
npm install weelog
```

## Alternative: Scoped Package

If "weelog" is taken, you can publish as a scoped package:

1. Update `package.json`:
```json
{
  "name": "@yourusername/weelog",
  "version": "1.0.0"
}
```

2. Publish with public access:
```bash
npm publish --access public
```

## Version Management

### Updating Versions

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major

# Then publish the new version
npm publish
```

## Troubleshooting

### Common Issues

1. **Package name already exists**
   - Choose a different name or use a scoped package
   - Check: `npm view package-name`

2. **Authentication errors**
   - Verify login: `npm whoami`
   - Re-login: `npm logout && npm login`

3. **Permission errors**
   - Ensure you're the package owner
   - Use `npm owner add username package-name`

4. **Build errors**
   - Verify all files in `dist/` are present
   - Check `package.json` entry points are correct

### Package Validation

Before publishing, ensure:
- [ ] All files in `dist/` directory exist
- [ ] `package.json` has correct entry points
- [ ] README.md is comprehensive
- [ ] LICENSE file is included
- [ ] Version number is appropriate

## Post-Publication

### Update Documentation

1. Add NPM badge to README:
```markdown
[![npm version](https://badge.fury.io/js/weelog.svg)](https://badge.fury.io/js/weelog)
```

2. Update GitHub repository (if applicable)
3. Share on social media/developer communities

### Maintenance

- Monitor for issues on NPM and GitHub
- Respond to user feedback
- Regular updates and security patches
- Maintain semantic versioning

## Security Considerations

- Never include sensitive data in the package
- Use `.npmignore` to exclude development files
- Regularly audit dependencies: `npm audit`
- Consider enabling 2FA on your NPM account

## Quick Command Reference

```bash
# Essential commands
npm login                    # Login to NPM
npm whoami                   # Check current user
npm view weelog              # Check if package exists
npm publish                  # Publish package
npm version patch            # Bump patch version
npm unpublish package@version # Remove specific version (within 24h)

# Testing commands
npm pack                     # Create tarball locally
npm pack --dry-run          # Preview package contents
npm install -g weelog       # Test global installation
```

## Support

If you encounter issues:
1. Check NPM documentation: [docs.npmjs.com](https://docs.npmjs.com)
2. NPM support: [npmjs.com/support](https://npmjs.com/support)
3. Community help: [stackoverflow.com](https://stackoverflow.com/questions/tagged/npm)

---

**Ready to publish?** Follow the steps above and your WeeLog package will be available to millions of JavaScript developers worldwide!