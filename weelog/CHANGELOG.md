# Changelog

All notable changes to WeeLog will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.2] - 2025-06-17

### Added
- Comprehensive METHODS_AND_OPTIONS.md reference guide with detailed flag descriptions
- QUICK_REFERENCE.md for easy access to all methods and options
- Complete "When to Use" guidance for every constructor option and method
- Enhanced documentation sidebar with categorized method sections
- Usage scenarios and best practices for development vs production setups

### Fixed
- Human-readable timestamp formatting now applies to timestamps inside JSON objects
- Timestamps in data objects are now consistently formatted when useHumanReadableTimestamp is enabled
- Added processDataTimestamps function to handle nested timestamp formatting

### Changed
- Updated main README.md with expanded API reference including default values and use cases
- Enhanced package.json to include all new documentation files
- Improved documentation structure with comprehensive method categorization

## [2.1.1] - 2025-06-16

### Added
- Human-readable timestamp option with `useHumanReadableTimestamp` flag
- Enhanced color logging with improved browser and Node.js detection
- ANSI color support for Node.js environments
- Better fallback handling for console styling

### Changed
- Improved timestamp formatting with user-friendly options
- Enhanced color output reliability across different environments
- Updated documentation with timestamp formatting examples

### Fixed
- Color logging issues in modern browsers and Node.js
- Browser environment detection for console styling
- Fallback behavior when console styling is not supported

## [2.1.0] - 2025-06-16

### Added
- Enhanced documentation website with comprehensive feature guides
- Professional tabbed interface for documentation sections
- In-depth feature explanations with practical examples
- Improved code examples and framework integration guides
- Clean repository structure with proper npm exclusions

### Changed
- Updated website documentation to reflect all advanced features
- Reorganized documentation sections for better user experience
- Enhanced README with complete API reference and usage examples

## [2.0.5] - 2025-06-14

### Changed
- Updated package version for deployment
- Ready for NPM publication

## [2.0.5] - 2025-06-14

### Changed
- Enhanced README support section with comprehensive help resources
- Added direct links to documentation, GitHub discussions, and live demo
- Improved getting help guidance for users

## [2.0.4] - 2025-06-14

### Changed
- Force NPM metadata refresh for repository and homepage URLs
- Updated package repository URL to https://github.com/estebanbocic/weelog
- Updated homepage URL to https://weelog.estebanbocic.com
- Improved NPM package metadata for better discoverability

## [2.0.3] - 2025-06-14

### Changed
- Updated package repository URL to https://github.com/estebanbocic/weelog
- Updated homepage URL to https://weelog.estebanbocic.com
- Improved NPM package metadata for better discoverability

## [2.0.2] - 2025-06-12

### Added
- **Inline Memory Tracking**: New `logMemoryInline` option displays live memory usage in each log entry
- Memory usage displayed as formatted MB with 2 decimal places (e.g., "Memory: 23.15 MB")
- Separate control from analytics - you can track memory for analytics without showing it inline
- Real-time visibility into memory allocation patterns during development

### Changed
- Enhanced Logger constructor with `logMemoryInline` parameter
- Improved memory tracking granularity and formatting
- Updated documentation with inline memory tracking examples

### Fixed
- Resolved critical debug function export issue in both ES modules and CommonJS builds
- Fixed rollup configuration for proper named exports compatibility

## [2.0.1] - 2025-06-12

### Added
- Comprehensive test suite for both ES modules and CommonJS compatibility
- Documentation validation tests
- Build verification for all distribution formats

### Fixed
- Export compatibility issues between module systems
- TypeScript definitions alignment with runtime exports

## [2.0.0] - 2025-06-12

### Added
- **Performance Tracking**: Built-in timing capabilities with `startPerformanceTimer()` and `endPerformanceTimer()`
- **Memory Monitoring**: Real-time heap usage tracking and reporting
- **Advanced Analytics**: Comprehensive logging statistics and insights
- **Search Functionality**: Query logs by level, context, time range, and custom criteria
- **Session Management**: Unique session IDs and data export capabilities
- **Stack Trace Capture**: Automatic stack traces with `trace()` method
- **Log History**: Configurable history with search and export features
- **Context Logging**: Enhanced context support with data objects
- **Interceptor Support**: Custom log processing with callback hooks

### Changed
- **BREAKING**: Enhanced Logger constructor with new options structure
- **BREAKING**: Improved log entry format with additional metadata
- Upgraded TypeScript definitions for better IDE support
- Enhanced browser and Node.js compatibility

### Removed
- **BREAKING**: Deprecated legacy configuration options

## [1.0.0] - 2025-06-12

### Added
- Initial release of WeeLog
- Basic logging levels (debug, info, warn, error)
- Named function exports for quick usage
- Logger class for advanced configuration
- Browser and Node.js compatibility
- TypeScript support
- Multiple distribution formats (ES modules, CommonJS, UMD)
- Lightweight design with zero dependencies