class EcommerceAPI {
    constructor() {
        // Initialize API
    }
    
    listProducts() {
        return [
            {
            id: 1,
            name: 'Stylish Sunglasses',
            price: 24.99,
            image: 'https://via.placeholder.com/300x300.png?text=Sunglasses'
            },
            {
            id: 2,
            name: 'Leather Wallet',
            price: 39.99,
            image: 'https://via.placeholder.com/300x300.png?text=Wallet'
            },
            {
            id: 3,
            name: 'Classic Watch',
            price: 149.99,
            image: 'https://via.placeholder.com/300x300.png?text=Watch'
            },
            {
            id: 4,
            name: 'Comfortable Backpack',
            price: 59.99,
            image: 'https://via.placeholder.com/300x300.png?text=Backpack'
            }
        ];
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
