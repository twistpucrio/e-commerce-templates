describe('EcommerceAPI Tests', () => {
    let api;

    beforeEach(() => {
        api = new EcommerceAPI();
    });

    describe('product list', () => {
        it('product list', () => {
            const result = api.listProducts();

            expect(result).to.be.an('array');
            expect(result.length).to.be.greaterThan(0);
            expect(result[0]).to.have.property('id');
        });


    });
});
