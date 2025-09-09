class EcommerceAPI {
    constructor() {
        this.products = [
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
        this.cart = [];
    }
    
    listProducts() {
        return this.products;
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            this.cart.push(productId);
        }
    }

    getCart() {
        const total = this.cart.reduce((acc, productId) => {
            const product = this.products.find(p => p.id === productId);
            return acc + (product ? product.price : 0);
        }, 0);

        return {
            products: [...this.cart],
            total,
        };
    }

    checkout() {
        const cartData = this.getCart();

        const order = {
            success: true,
            orderId: Date.now().toString(),
            total: cartData.total,
            products: cartData.products,
        };

        this.cart = [];

        return order;
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
