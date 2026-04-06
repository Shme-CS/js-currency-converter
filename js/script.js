// ===================================
// Currency Converter Application
// ===================================

// API Configuration
const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

// Currency data with flags
const CURRENCIES = {
    USD: { name: 'US Dollar', flag: '🇺🇸' },
    EUR: { name: 'Euro', flag: '🇪🇺' },
    GBP: { name: 'British Pound', flag: '🇬🇧' },
    JPY: { name: 'Japanese Yen', flag: '🇯🇵' },
    CAD: { name: 'Canadian Dollar', flag: '🇨🇦' },
    AUD: { name: 'Australian Dollar', flag: '🇦🇺' },
    INR: { name: 'Indian Rupee', flag: '🇮🇳' },
    ETB: { name: 'Ethiopian Birr', flag: '🇪🇹' },
    CHF: { name: 'Swiss Franc', flag: '🇨🇭' },
    CNY: { name: 'Chinese Yuan', flag: '🇨🇳' },
    SEK: { name: 'Swedish Krona', flag: '🇸🇪' },
    NZD: { name: 'New Zealand Dollar', flag: '🇳🇿' }
};

// Application State
const state = {
    exchangeRates: {},
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    amount: 1,
    lastUpdated: null,
    theme: 'light',
    conversionHistory: []
};

// DOM Elements
const elements = {
    amount: document.getElementById('amount'),
    fromCurrency: document.getElementById('fromCurrency'),
    toCurrency: document.getElementById('toCurrency'),
    fromFlag: document.getElementById('fromFlag'),
    toFlag: document.getElementById('toFlag'),
    swapButton: document.getElementById('swapButton'),
    resultSection: document.getElementById('resultSection'),
    resultValue: document.getElementById('resultValue'),
    resultCurrency: document.getElementById('resultCurrency'),
    rateText: document.getElementById('rateText'),
    lastUpdated: document.getElementById('lastUpdated'),
    copyButton: document.getElementById('copyButton'),
    loadingSpinner: document.getElementById('loadingSpinner'),
    errorMessage: document.getElementById('errorMessage'),
    errorText: document.getElementById('errorText'),
    retryButton: document.getElementById('retryButton'),
    themeToggle: document.getElementById('themeToggle'),
    favoritesGrid: document.getElementById('favoritesGrid'),
    historyList: document.getElementById('historyList'),
    clearHistoryButton: document.getElementById('clearHistoryButton')
};

// ===================================
// Initialize Application
// ===================================
function initializeApp() {
    console.log('Initializing Currency Converter...');
    
    // Load saved preferences
    loadUserPreferences();
    
    // Populate currency dropdowns
    populateCurrencyDropdowns();
    
    // Setup event listeners
    setupEventListeners();
    
    // Fetch initial exchange rates
    fetchExchangeRates();
    
    // Setup favorites
    setupFavorites();
    
    // Load conversion history
    loadConversionHistory();
}

// ===================================
// Populate Currency Dropdowns
// ===================================
function populateCurrencyDropdowns() {
    const fromSelect = elements.fromCurrency;
    const toSelect = elements.toCurrency;
    
    // Clear existing options
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';
    
    // Add currency options
    Object.keys(CURRENCIES).forEach(code => {
        const currency = CURRENCIES[code];
        
        const fromOption = document.createElement('option');
        fromOption.value = code;
        fromOption.textContent = `${code} - ${currency.name}`;
        if (code === state.fromCurrency) fromOption.selected = true;
        fromSelect.appendChild(fromOption);
        
        const toOption = document.createElement('option');
        toOption.value = code;
        toOption.textContent = `${code} - ${currency.name}`;
        if (code === state.toCurrency) toOption.selected = true;
        toSelect.appendChild(toOption);
    });
    
    // Update flags
    updateCurrencyFlags();
}


// ===================================
// Setup Event Listeners
// ===================================
function setupEventListeners() {
    // Amount input
    elements.amount.addEventListener('input', handleAmountInput);
    
    // Currency selection
    elements.fromCurrency.addEventListener('change', handleCurrencyChange);
    elements.toCurrency.addEventListener('change', handleCurrencyChange);
    
    // Swap button
    elements.swapButton.addEventListener('click', swapCurrencies);
    
    // Copy button
    elements.copyButton.addEventListener('click', copyResult);
    
    // Retry button
    elements.retryButton.addEventListener('click', fetchExchangeRates);
    
    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Clear history
    elements.clearHistoryButton.addEventListener('click', clearHistory);
}

// ===================================
// Fetch Exchange Rates from API
// ===================================
async function fetchExchangeRates() {
    try {
        showLoadingState();
        hideError();
        
        const response = await fetch(`${API_URL}${state.fromCurrency}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch exchange rates');
        }
        
        const data = await response.json();
        
        state.exchangeRates = data.rates;
        state.lastUpdated = new Date(data.date);
        
        hideLoadingState();
        convertCurrency();
        
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        hideLoadingState();
        showError('Failed to fetch exchange rates. Please check your connection and try again.');
    }
}

// ===================================
// Handle Amount Input
// ===================================
function handleAmountInput(event) {
    const value = parseFloat(event.target.value);
    
    if (isNaN(value) || value < 0) {
        state.amount = 0;
        return;
    }
    
    state.amount = value;
    convertCurrency();
}

// ===================================
// Handle Currency Change
// ===================================
function handleCurrencyChange(event) {
    const selectId = event.target.id;
    
    if (selectId === 'fromCurrency') {
        state.fromCurrency = event.target.value;
        fetchExchangeRates();
    } else {
        state.toCurrency = event.target.value;
        convertCurrency();
    }
    
    updateCurrencyFlags();
    saveUserPreferences();
}

// ===================================
// Convert Currency
// ===================================
function convertCurrency() {
    if (!state.exchangeRates[state.toCurrency]) {
        return;
    }
    
    const rate = state.exchangeRates[state.toCurrency];
    const result = state.amount * rate;
    
    updateConversionResult(result, rate);
    addToHistory(state.amount, state.fromCurrency, result, state.toCurrency);
}

// ===================================
// Update Conversion Result Display
// ===================================
function updateConversionResult(result, rate) {
    elements.resultValue.textContent = result.toFixed(2);
    elements.resultCurrency.textContent = state.toCurrency;
    elements.rateText.textContent = `1 ${state.fromCurrency} = ${rate.toFixed(4)} ${state.toCurrency}`;
    
    if (state.lastUpdated) {
        elements.lastUpdated.textContent = `Updated: ${formatDate(state.lastUpdated)}`;
    }
    
    elements.resultSection.classList.add('active');
}


// ===================================
// Swap Currencies
// ===================================
function swapCurrencies() {
    // Swap state
    const temp = state.fromCurrency;
    state.fromCurrency = state.toCurrency;
    state.toCurrency = temp;
    
    // Update dropdowns
    elements.fromCurrency.value = state.fromCurrency;
    elements.toCurrency.value = state.toCurrency;
    
    // Update flags
    updateCurrencyFlags();
    
    // Fetch new rates and convert
    fetchExchangeRates();
    
    // Save preferences
    saveUserPreferences();
}

// ===================================
// Update Currency Flags
// ===================================
function updateCurrencyFlags() {
    elements.fromFlag.textContent = CURRENCIES[state.fromCurrency]?.flag || '🏳️';
    elements.toFlag.textContent = CURRENCIES[state.toCurrency]?.flag || '🏳️';
}

// ===================================
// Copy Result to Clipboard
// ===================================
async function copyResult() {
    const resultText = `${elements.resultValue.textContent} ${state.toCurrency}`;
    
    try {
        await navigator.clipboard.writeText(resultText);
        
        // Show feedback
        const originalText = elements.copyButton.innerHTML;
        elements.copyButton.innerHTML = '<span>✓ Copied!</span>';
        
        setTimeout(() => {
            elements.copyButton.innerHTML = originalText;
        }, 2000);
        
    } catch (error) {
        console.error('Failed to copy:', error);
    }
}

// ===================================
// Loading State Management
// ===================================
function showLoadingState() {
    elements.loadingSpinner.classList.add('active');
    elements.resultSection.classList.remove('active');
}

function hideLoadingState() {
    elements.loadingSpinner.classList.remove('active');
}

// ===================================
// Error Handling
// ===================================
function showError(message) {
    elements.errorText.textContent = message;
    elements.errorMessage.classList.add('active');
}

function hideError() {
    elements.errorMessage.classList.remove('active');
}

// ===================================
// Theme Toggle
// ===================================
function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    
    // Update icon
    elements.themeToggle.querySelector('.theme-icon').textContent = 
        state.theme === 'light' ? '🌙' : '☀️';
    
    saveUserPreferences();
}

// ===================================
// Setup Favorite Currencies
// ===================================
function setupFavorites() {
    const favorites = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR'];
    
    elements.favoritesGrid.innerHTML = '';
    
    favorites.forEach(code => {
        const currency = CURRENCIES[code];
        if (!currency) return;
        
        const item = document.createElement('div');
        item.className = 'favorite-item';
        item.innerHTML = `
            <span class="favorite-flag">${currency.flag}</span>
            <span class="favorite-code">${code}</span>
        `;
        
        item.addEventListener('click', () => {
            state.toCurrency = code;
            elements.toCurrency.value = code;
            updateCurrencyFlags();
            convertCurrency();
            saveUserPreferences();
        });
        
        elements.favoritesGrid.appendChild(item);
    });
}


// ===================================
// Conversion History Management
// ===================================
function addToHistory(fromAmount, fromCurrency, toAmount, toCurrency) {
    const historyItem = {
        fromAmount: fromAmount.toFixed(2),
        fromCurrency,
        toAmount: toAmount.toFixed(2),
        toCurrency,
        timestamp: new Date().toISOString()
    };
    
    // Add to beginning of array
    state.conversionHistory.unshift(historyItem);
    
    // Keep only last 10 conversions
    if (state.conversionHistory.length > 10) {
        state.conversionHistory = state.conversionHistory.slice(0, 10);
    }
    
    saveConversionHistory();
    displayConversionHistory();
}

function displayConversionHistory() {
    if (state.conversionHistory.length === 0) {
        elements.historyList.innerHTML = '<div class="history-empty">No conversion history yet</div>';
        return;
    }
    
    elements.historyList.innerHTML = '';
    
    state.conversionHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-conversion">
                ${item.fromAmount} ${item.fromCurrency} → ${item.toAmount} ${item.toCurrency}
            </div>
            <div class="history-time">${formatDate(new Date(item.timestamp))}</div>
        `;
        elements.historyList.appendChild(historyItem);
    });
}

function clearHistory() {
    if (confirm('Are you sure you want to clear conversion history?')) {
        state.conversionHistory = [];
        saveConversionHistory();
        displayConversionHistory();
    }
}

// ===================================
// LocalStorage Management
// ===================================
function saveUserPreferences() {
    const preferences = {
        fromCurrency: state.fromCurrency,
        toCurrency: state.toCurrency,
        theme: state.theme
    };
    localStorage.setItem('currencyConverterPreferences', JSON.stringify(preferences));
}

function loadUserPreferences() {
    const saved = localStorage.getItem('currencyConverterPreferences');
    if (saved) {
        const preferences = JSON.parse(saved);
        state.fromCurrency = preferences.fromCurrency || 'USD';
        state.toCurrency = preferences.toCurrency || 'EUR';
        state.theme = preferences.theme || 'light';
        
        document.documentElement.setAttribute('data-theme', state.theme);
        elements.themeToggle.querySelector('.theme-icon').textContent = 
            state.theme === 'light' ? '🌙' : '☀️';
    }
}

function saveConversionHistory() {
    localStorage.setItem('currencyConverterHistory', JSON.stringify(state.conversionHistory));
}

function loadConversionHistory() {
    const saved = localStorage.getItem('currencyConverterHistory');
    if (saved) {
        state.conversionHistory = JSON.parse(saved);
        displayConversionHistory();
    }
}

// ===================================
// Utility Functions
// ===================================
function formatDate(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
}

// ===================================
// Start Application
// ===================================
document.addEventListener('DOMContentLoaded', initializeApp);
