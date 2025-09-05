// /ecommerce-mvc-spa/src/views/ProductDetailView.js
/**
 * ProductDetailView
 * Responsável por renderizar a página de detalhes de um produto.
 */
export class ProductDetailView {
    /**
     * Renderiza os detalhes de um produto dentro de um container.
     * @param {Object} product - O produto a ser detalhado.
     * @param {HTMLElement} container - O elemento DOM onde os detalhes serão renderizados.
     */
    render(product, container) {
        container.innerHTML = ''; // Limpa o container antes de renderizar
        const productDetailContainer = document.createElement('div');
        productDetailContainer.id = 'product-detail';

        if (product) {
            productDetailContainer.innerHTML = `
                <a href="#" class="back-link">&larr; Voltar para a lista</a>
                <h1>${product.name}</h1>
                <img src="${product.imageUrl}" alt="${product.name}">
                <p class="price">R$ ${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <button data-product-id="${product.id}">Adicionar ao Carrinho</button>
            `;
        } else {
            productDetailContainer.innerHTML = `
                <a href="#" class="back-link">&larr; Voltar para a lista</a>
                <h1>Produto não encontrado!</h1>
            `;
        }
        
        container.appendChild(productDetailContainer);
    }
}
