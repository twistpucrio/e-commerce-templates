describe('EcommerceAPI Tests', () => {
    let api;

    beforeEach(() => {
        api = new EcommerceAPI();
        api.checkout(); // Clear cart before each test
    });

    describe('cart checkout', () => {
        it('should, list, add and checkout', () => {

            // List Products
            const result = api.listProducts();

            expect(result).to.be.an('array');
            expect(result.length).to.be.greaterThan(0);
            expect(result[0]).to.have.property('id');

            const productToAdd = result[0];

            // Add to Cart
            api.addToCart(productToAdd.id);
            const cart = api.getCart();

            expect(cart).to.be.an('object');
            expect(cart).to.have.property('products').that.is.an('array');
            expect(cart.products).to.include(productToAdd.id);
            expect(cart).to.have.property('total');
            expect(cart.total).to.equal(productToAdd.price);

            // Checkout
            checkout = api.checkout();
            expect(checkout).to.be.an('object');
            expect(checkout).to.have.property('success', true);
            expect(checkout).to.have.property('orderId').that.is.a('string');
            expect(checkout).to.have.property('total', cart.total);
            expect(checkout).to.have.property('products').that.is.an('array');
            expect(checkout.products).to.deep.equal(cart.products);

            const emptyCart = api.getCart();
            expect(emptyCart.products).to.be.an('array').that.is.empty;
            expect(emptyCart.total).to.equal(0);

        });




    });
});
