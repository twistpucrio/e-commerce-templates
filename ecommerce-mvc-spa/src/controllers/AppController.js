// /ecommerce-mvc-spa/src/controllers/AppController.js

/**
 * AppController
 * O orquestrador central da aplicação. Conecta Model, View e Router.
 */
export class AppController {
    #productModel;
    #cartModel;
    #appView;
    #productListView;
    #productDetailView;

    constructor(models, views) {
        this.#productModel = models.productModel;
        this.#cartModel = models.cartModel;
        this.#appView = views.appView;
        this.#productListView = views.productListView;
        this.#productDetailView = views.productDetailView;
    }

    /**
     * Inicializa a aplicação, ligando os handlers de eventos.
     */
    init() {
        this.#appView.bindAddToCartEvent(this.handleAddToCart.bind(this));
    }

    /**
     * Busca e exibe a lista de produtos.
     */
    async showProductList() {
        const products = await this.#productModel.findAll();
        this.#productListView.render(products, this.#appView.getContainer());
    }

    /**
     * Busca e exibe os detalhes de um produto específico.
     * @param {number} id - O ID do produto.
     */
    async showProductDetail(id) {
        const product = await this.#productModel.findById(id);
        this.#productDetailView.render(product, this.#appView.getContainer());
    }

    /**
     * Handler para adicionar um produto ao carrinho.
     * @param {number} productId - O ID do produto a ser adicionado.
     */
    async handleAddToCart(productId) {
        const product = await this.#productModel.findById(productId);
        if (product) {
            this.#cartModel.add(product);
            alert(`"${product.name}" foi adicionado ao carrinho!`);
        }
    }
}
