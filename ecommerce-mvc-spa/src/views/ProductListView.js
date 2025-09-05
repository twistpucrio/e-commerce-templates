// /ecommerce-mvc-spa/src/views/ProductListView.js
/**
 * ProductListView
 * Responsável por renderizar a lista de produtos.
 */
export class ProductListView {
    /**
     * Renderiza a lista de produtos dentro de um container.
     * @param {Array} products - A lista de produtos a ser exibida.
     * @param {HTMLElement} container - O elemento DOM onde a lista será renderizada.
     */
    render(products, container) {
        container.innerHTML = ''; // Limpa o container antes de renderizar
        const productListContainer = document.createElement('div');
        productListContainer.id = 'product-list';

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <a href="#products/${product.id}">
                    <img src="${product.imageUrl}" alt="${product.name}">
                </a>
                <h2><a href="#products/${product.id}">${product.name}</a></h2>
                <p class="price">R$ ${product.price.toFixed(2)}</p>
                <button data-product-id="${product.id}">Adicionar ao Carrinho</button>
            `;
            productListContainer.appendChild(productItem);
        });

        container.appendChild(productListContainer);
    }
}
