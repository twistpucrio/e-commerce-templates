// /ecommerce-mvc-spa/src/Router.js

/**
 * Router
 * Escuta as mudanças na hash da URL e invoca a ação apropriada no Controller.
 */
export class Router {
    #controller;
    #routes;

    constructor(controller) {
        this.#controller = controller;
        // Define as rotas e as ações do controller correspondentes
        this.#routes = {
            '': () => controller.showProductList(),
            '#products': () => controller.showProductList()
        };
    }

    /**
     * Inicia o roteador, adicionando os listeners de evento.
     */
    listen() {
        window.addEventListener('hashchange', () => this.#handleRouteChange());
        window.addEventListener('DOMContentLoaded', () => this.#handleRouteChange());
    }

    /**
     * Lida com as mudanças de rota.
     * Analisa a hash da URL e decide qual ação do controller chamar.
     */
    #handleRouteChange() {
        const hash = window.location.hash;

        // Rota para a lista de produtos
        if (hash === '' || hash === '#') {
            this.#controller.showProductList();
            return;
        }

        // Rota para detalhes do produto (ex: #products/1)
        if (hash.startsWith('#products/')) {
            const id = parseInt(hash.split('/')[1], 10);
            this.#controller.showProductDetail(id);
            return;
        }

        // Rota padrão/fallback
        this.#controller.showProductList();
    }
}
