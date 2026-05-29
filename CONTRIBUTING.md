# Contributing to PLATEX

Thank you for your interest in contributing to PLATEX! Here's a guide to help you get started.

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the maintainers.

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem** in as many details as possible
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed** and point out what exactly is the problem with that behavior
* **Explain which behavior you expected to see instead** and why

### Suggesting Enhancements

When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior** and the expected enhanced behavior

### Pull Requests

* Fill in the required template
* Include appropriate test cases
* Follow the JavaScript styleguide
* End all files with a newline
* Avoid platform-dependent code

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/platex.git
   cd platex
   ```

3. Install dependencies:
   ```bash
   npm install
   npx playwright install chromium
   ```

4. Make your changes
5. Test your changes locally:
   ```bash
   node platex.js -m 12-AB-34
   ```

6. Commit your changes with clear commit messages
7. Push to your fork and create a pull request

## Styleguide

### JavaScript

* Use 4 spaces for indentation
* Use const/let, avoid var
* Use meaningful variable names
* Add comments for complex logic
* Keep functions small and focused

### Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

Example:
```
Add retry logic for failed API requests

- Implement exponential backoff
- Log retry attempts
- Fixes #42
```

## License

By contributing to PLATEX, you agree that your contributions will be licensed under its MIT License.

## Questions?

Feel free to open an issue or reach out to the maintainers.
