// /ecommerce-mvc-spa/src/models/CartModel.js

/**
 * CartModel
 * Gerencia o estado do carrinho de compras.
 */
export class CartModel {
    #items;

    constructor() {
        // O estado do carrinho é um array de produtos.
        this.#items = [];
    }

    /**
     * Adiciona um produto ao carrinho.
     * @param {Object} product - O objeto do produto a ser adicionado.
     */
    add(product) {
        this.#items.push(product);
        console.log("Carrinho atualizado:", this.#items);
    }

    /**
     * Retorna todos os itens do carrinho.
     * @returns {Array} A lista de produtos no carrinho.
     */
    getItems() {
        return this.#items;
    }
}
