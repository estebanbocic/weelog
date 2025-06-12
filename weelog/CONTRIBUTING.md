# Contributing to WeeLog

Thank you for your interest in contributing to WeeLog! This document provides guidelines for contributing to the project.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Run tests: `npm test`

## Project Structure

```
weelog/
├── src/
│   └── weelog.ts          # Main library source
├── dist/                  # Built distributions (generated)
├── examples/              # Usage examples
├── test/                  # Test files
├── rollup.config.js       # Build configuration
├── package.json           # Package configuration
└── README.md              # Documentation
```

## Building

The project uses Rollup to create multiple distributions:

- **ES Modules**: `dist/weelog.esm.js`
- **CommonJS**: `dist/weelog.cjs`
- **TypeScript**: `dist/weelog.d.ts`

Run `npm run build` to generate all distributions.

## Testing

We maintain comprehensive tests for both ES modules and CommonJS compatibility:

- `npm test` - Run all tests
- Test files validate both module systems work correctly

## Code Style

- Use TypeScript for type safety
- Follow existing code patterns and naming conventions
- Add JSDoc comments for public APIs
- Ensure compatibility with both Node.js and browser environments

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes with appropriate tests
3. Update documentation if needed
4. Ensure all tests pass
5. Submit a pull request with clear description

## Reporting Issues

When reporting bugs or requesting features:

- Use clear, descriptive titles
- Provide steps to reproduce issues
- Include environment details (Node.js version, browser, etc.)
- Share relevant code examples

## Feature Requests

WeeLog aims to be lightweight yet powerful. When suggesting features:

- Explain the use case and benefits
- Consider impact on bundle size
- Ensure compatibility with existing APIs

## Release Process

Releases follow semantic versioning:

- **Patch** (x.x.X): Bug fixes, documentation updates
- **Minor** (x.X.x): New features, backwards compatible
- **Major** (X.x.x): Breaking changes

## License

By contributing, you agree that your contributions will be licensed under the MIT License.