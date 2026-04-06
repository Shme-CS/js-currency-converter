# Currency Converter - Real-Time Exchange Rates

A professional currency converter web application built with HTML5, CSS3, and Vanilla JavaScript. Convert between multiple currencies using live exchange rate data from a public API.

![Currency Converter](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow.svg)

## 🔗 Live Demo

- **🌐 Live App**: [https://shme-cs.github.io/js-currency-converter/](https://shme-cs.github.io/js-currency-converter/)
- **📦 GitHub Repository**: [https://github.com/Shme-CS/js-currency-converter](https://github.com/Shme-CS/js-currency-converter)

## 🎯 Overview

Currency Converter is a production-quality web application that provides real-time currency conversion using live exchange rates. Built without frameworks, it demonstrates professional API integration, asynchronous JavaScript, and modern UI/UX design.

## ✨ Features

### Core Features
- **Real-Time Conversion**: Live exchange rates from ExchangeRate-API
- **12+ Currencies**: Support for major world currencies (USD, EUR, GBP, JPY, CAD, AUD, INR, ETB, and more)
- **Instant Updates**: Real-time conversion as you type
- **Currency Swap**: Quick swap between from/to currencies
- **Exchange Rate Display**: Shows current exchange rate and last update time
- **Copy to Clipboard**: One-click copy of conversion results

### Advanced Features
- **Currency Flags**: Visual currency identification with flag emojis
- **Quick Convert**: Favorite currencies for fast access
- **Conversion History**: Track your last 10 conversions
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Loading States**: Professional loading spinner during API calls
- **Error Handling**: Graceful error messages with retry option
- **LocalStorage**: Saves preferences and conversion history
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Accessibility**: ARIA labels and keyboard navigation support

## 🚀 Technologies Used

- **HTML5**: Semantic markup and modern structure
- **CSS3**:
  - CSS Variables for theming
  - Flexbox and Grid layouts
  - Smooth animations and transitions
  - Media queries for responsiveness
- **JavaScript (ES6+)**:
  - Async/Await for API calls
  - Fetch API for HTTP requests
  - Modular architecture
  - LocalStorage API
  - Event handling
  - Error handling
- **API**: ExchangeRate-API (https://exchangerate-api.com)

## 📁 Project Structure

```
js-currency-converter/
│
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Complete styling with themes
├── js/
│   └── script.js          # Application logic and API integration
├── assets/
│   ├── flags/             # Currency flag assets
│   └── icons/             # Icon assets
└── README.md              # Project documentation
```

## 🎮 How to Use

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Shme-CS/js-currency-converter.git
```

2. Navigate to the project directory:
```bash
cd js-currency-converter
```

3. Open `index.html` in your browser:
```bash
# On macOS
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```

Or use a local development server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

### Using the Converter

1. **Enter Amount**: Input the amount you want to convert
2. **Select From Currency**: Choose the source currency
3. **Select To Currency**: Choose the target currency
4. **View Result**: See the converted amount instantly
5. **Swap Currencies**: Click the swap button to reverse conversion
6. **Quick Convert**: Click favorite currencies for fast conversion
7. **Copy Result**: Click copy button to copy the result
8. **View History**: Check your recent conversions
9. **Toggle Theme**: Switch between light and dark modes

## 🎨 Supported Currencies

| Code | Currency | Flag |
|------|----------|------|
| USD | US Dollar | 🇺🇸 |
| EUR | Euro | 🇪🇺 |
| GBP | British Pound | 🇬🇧 |
| JPY | Japanese Yen | 🇯🇵 |
| CAD | Canadian Dollar | 🇨🇦 |
| AUD | Australian Dollar | 🇦🇺 |
| INR | Indian Rupee | 🇮🇳 |
| ETB | Ethiopian Birr | 🇪🇹 |
| CHF | Swiss Franc | 🇨🇭 |
| CNY | Chinese Yuan | 🇨🇳 |
| SEK | Swedish Krona | 🇸🇪 |
| NZD | New Zealand Dollar | 🇳🇿 |

## 💻 Code Architecture

### Modular Functions
```javascript
initializeApp()              // Initialize the application
fetchExchangeRates()         // Fetch rates from API
populateCurrencyDropdowns()  // Populate currency selectors
handleAmountInput()          // Process amount input
handleCurrencyChange()       // Handle currency selection
convertCurrency()            // Perform conversion
updateConversionResult()     // Update UI with result
swapCurrencies()             // Swap from/to currencies
showLoadingState()           // Show loading spinner
hideLoadingState()           // Hide loading spinner
showError()                  // Display error message
hideError()                  // Hide error message
toggleTheme()                // Switch themes
copyResult()                 // Copy to clipboard
addToHistory()               // Add to conversion history
saveUserPreferences()        // Save to localStorage
loadUserPreferences()        // Load from localStorage
```

### State Management
```javascript
const state = {
    exchangeRates: {},
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    amount: 1,
    lastUpdated: null,
    theme: 'light',
    conversionHistory: []
};
```

### API Integration
```javascript
// Fetch exchange rates
async function fetchExchangeRates() {
    const response = await fetch(`${API_URL}${state.fromCurrency}`);
    const data = await response.json();
    state.exchangeRates = data.rates;
}
```

## 🎯 Code Quality

### Best Practices
- ✅ Modular function design
- ✅ Minimal global variables
- ✅ Async/await for API calls
- ✅ Comprehensive error handling
- ✅ Optimized DOM updates
- ✅ Clean code structure
- ✅ Detailed comments

### Performance Optimizations
- Efficient DOM manipulation
- CSS transforms for animations
- Event delegation
- LocalStorage caching

### Accessibility Features
- Semantic HTML elements
- ARIA labels
- Keyboard navigation
- Focus indicators
- Screen reader support

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: < 480px

### Mobile Optimizations
- Touch-friendly buttons
- Optimized layouts
- Readable font sizes
- Simplified navigation

## 🔧 Customization

### Adding More Currencies

Edit the `CURRENCIES` object in `js/script.js`:

```javascript
const CURRENCIES = {
    USD: { name: 'US Dollar', flag: '🇺🇸' },
    // Add more currencies
    BRL: { name: 'Brazilian Real', flag: '🇧🇷' }
};
```

### Changing Theme Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --success-color: #10b981;
}
```

### Using Different API

Update the API URL in `js/script.js`:

```javascript
const API_URL = 'https://your-api-url.com/';
```

## 📊 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

## 🚀 Future Improvements

- [ ] Historical exchange rate charts
- [ ] Multiple currency comparison
- [ ] Offline mode with cached rates
- [ ] Currency trend indicators
- [ ] Export conversion history
- [ ] More currency options
- [ ] Rate alerts and notifications
- [ ] Progressive Web App (PWA)
- [ ] Multi-language support
- [ ] Advanced filtering options

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License:

```
MIT License

Copyright (c) 2024 Currency Converter

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

Created with ❤️ by [Shme-CS](https://github.com/Shme-CS)

## 🙏 Acknowledgments

- Exchange rates provided by [ExchangeRate-API](https://exchangerate-api.com)
- Flag emojis from Unicode standard
- Design inspired by modern fintech applications
- Color palette inspired by Tailwind CSS

---

⭐ Star this repository if you found it helpful!

📧 Questions? Open an issue or reach out!

🔗 **Links**:
- [GitHub Repository](https://github.com/Shme-CS/js-currency-converter)
- [Live Demo](https://shme-cs.github.io/js-currency-converter/)
- [Report Bug](https://github.com/Shme-CS/js-currency-converter/issues)
- [Request Feature](https://github.com/Shme-CS/js-currency-converter/issues)
