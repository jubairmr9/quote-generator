const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
};

// Show new quote
const newQuote = () => {
    showLoadingSpinner();
    // Pick a random quote from the apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // Handle author field being unknown
    !quote.author ?
        authorText.textContent = 'Unknown' :
        authorText.textContent = quote.author;
    
    // Check Quote length to determine styling
    quote.text.length > 120 ?
        quoteText.classList.add('long-quote') :
        quoteText.classList.remove('long-quote');

    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
};

// Get quotes from API
const getQuotes = async () => {
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch error here
    }
};

// Tweet Quote
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
};

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();
