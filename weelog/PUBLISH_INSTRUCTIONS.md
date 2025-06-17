# NPM Publish Instructions for WeeLog v2.1.2

## Pre-publish Checklist ✓

- [x] Version updated to 2.1.2 in package.json
- [x] CHANGELOG.md updated with v2.1.2 release notes
- [x] All documentation files included in package.json files array
- [x] Package built successfully with latest changes
- [x] Timestamp formatting fix applied and tested
- [x] Comprehensive documentation added

## Manual Publish Steps

1. **Navigate to weelog directory:**
   ```bash
   cd weelog
   ```

2. **Verify package contents:**
   ```bash
   npm pack --dry-run
   ```

3. **Login to npm (if not already logged in):**
   ```bash
   npm login
   ```

4. **Publish to npm:**
   ```bash
   npm publish
   ```

## What's New in v2.1.2

### Fixed
- Human-readable timestamp formatting now applies to timestamps inside JSON objects
- Timestamps in data objects are consistently formatted when useHumanReadableTimestamp is enabled

### Added
- Comprehensive METHODS_AND_OPTIONS.md reference guide
- QUICK_REFERENCE.md for easy method lookup
- Complete "When to Use" guidance for every option and method
- Enhanced documentation with categorized method sections

### Files Included in Package
- dist/ (built package files)
- src/ (source TypeScript files)
- README.md (updated with comprehensive API reference)
- METHODS_AND_OPTIONS.md (detailed method and option guide)
- QUICK_REFERENCE.md (quick lookup guide)
- LICENSE

## Verification After Publish

Check that the package is available:
```bash
npm view weelog@2.1.2
```

The package is now ready for manual npm publish with all latest updates and comprehensive documentation.