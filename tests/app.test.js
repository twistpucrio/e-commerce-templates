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

        it('should return a string', () => {
            const result = api.foo();
            expect(result).to.be.a('string');
        });
    });
});
