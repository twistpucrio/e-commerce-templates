# E-Commerce Templates

A vanilla JavaScript e-commerce application with MVC architecture and comprehensive testing.

## Project Structure

```
src/
├── app.css              # Application styles
├── app.js               # Main application file
├── index.html           # Main HTML page
├── main.css             # Additional styles
├── main.js              # Additional JavaScript
└── core/
    └── EcommerceAPI.js   # Core API functionality

tests/
├── test-runner.html     # Test runner page
├── app.test.js          # Test specifications
├── tests.html           # Additional test file
└── tests.js             # Additional test file
```

## Getting Started

1. Clone the repository
2. Open `src/index.html` in your browser to run the application
3. Open `tests/test-runner.html` in your browser to run the tests

## Running Tests

### Browser-based Testing

This project uses Mocha and Chai for testing in the browser:

1. **Open the test runner**:
   - Navigate to `tests/test-runner.html`
   - Open it in your web browser (Chrome, Firefox, Safari, etc.)

2. **View test results**:
   - Tests will run automatically when the page loads
   - Results are displayed in the browser with green checkmarks for passing tests
   - Any failures will be highlighted in red with error details

### Test Framework

- **Mocha**: JavaScript test framework
- **Chai**: Assertion library with `expect` syntax
- **Test files**: Located in the `tests/` directory

### Example Test

```javascript
describe('EcommerceAPI Tests', () => {
    let api;

    beforeEach(() => {
        api = new EcommerceAPI();
    });

    describe('foo function', () => {
        it('should return "bar"', () => {
            const result = api.foo();
            expect(result).to.equal('bar');
        });
    });
});
```

## Development

- Pure vanilla JavaScript (no frameworks)
- MVC architecture pattern
- Browser-compatible ES6+ features
- Comprehensive test coverage

## Browser Support

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge