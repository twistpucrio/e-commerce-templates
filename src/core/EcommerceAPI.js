class EcommerceAPI {
    constructor() {
        // Initialize API
    }

    /**
     * A simple function that returns "bar"
     * @returns {string} Returns "bar"
     */
    foo() {
        return "bar";
    }
}

// Make it available globally for testing
if (typeof window !== 'undefined') {
    window.EcommerceAPI = EcommerceAPI;
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EcommerceAPI;
}
