// /ecommerce-mvc-spa/src/models/ProductModel.js

/**
 * ProductModel
 * Gerencia os dados dos produtos da aplicação.
 * É responsável por buscar e armazenar os produtos.
 */
export class ProductModel {
    #products;
    #service;

    constructor(service) {
        this.#service = service;
        this.#products = [];
    }

    /**
     * Busca todos os produtos usando o serviço injetado.
     * Armazena os produtos internamente para acesso futuro.
     * @returns {Promise<Array>} Uma promessa que resolve com a lista de produtos.
     */
    async findAll() {
        if (this.#products.length === 0) {
            this.#products = await this.#service.getProducts();
        }
        return this.#products;
    }

    /**
     * Encontra um produto pelo seu ID.
     * @param {number} id - O ID do produto a ser encontrado.
     * @returns {Promise<Object|undefined>} Uma promessa que resolve com o produto encontrado ou undefined.
     */
    async findById(id) {
        const products = await this.findAll();
        return products.find(product => product.id === id);
    }
}
