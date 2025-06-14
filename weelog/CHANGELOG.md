# Changelog

All notable changes to WeeLog will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.4] - 2025-06-14

### Changed
- Updated package version for deployment
- Ready for NPM publication

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