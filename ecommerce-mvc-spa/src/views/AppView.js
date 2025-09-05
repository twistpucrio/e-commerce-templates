// /ecommerce-mvc-spa/src/views/AppView.js

/**
 * AppView
 * Responsável por gerenciar o container principal da aplicação e
 * ligar eventos globais do usuário aos handlers do Controller.
 */
export class AppView {
    #app;

    constructor(appElementId) {
        this.#app = document.getElementById(appElementId);
    }

    /**
     * Fornece o elemento principal da aplicação para que outras views possam renderizar.
     * @returns {HTMLElement}
     */
    getContainer() {
        return this.#app;
    }

    /**
     * Liga o evento de clique nos botões "Adicionar ao Carrinho" a um handler.
     * Usa delegação de eventos para eficiência.
     * @param {Function} handler - A função a ser chamada quando o evento ocorrer.
     */
    bindAddToCartEvent(handler) {
        this.#app.addEventListener('click', event => {
            if (event.target && event.target.matches('button[data-product-id]')) {
                const productId = parseInt(event.target.dataset.productId, 10);
                handler(productId);
            }
        });
    }
}
