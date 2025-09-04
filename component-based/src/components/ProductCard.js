// FILE: /component-based/src/components/ProductCard.js
/**
 * COMPONENTE PRODUCT CARD
 * 
 * Componente funcional que renderiza um card de produto.
 * Recebe props (dados do produto e função de callback) e retorna elemento DOM.
 */

import { addToCart } from '../store/state.js';

/**
 * Cria um card para um produto específico
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.product - Dados do produto
 * @param {Function} props.onAddToCart - Callback opcional para adicionar ao carrinho
 * @returns {HTMLElement} Elemento DOM do card do produto
 */
export function ProductCard({ product, onAddToCart }) {
    // Cria o elemento principal do card
    const cardElement = document.createElement('div');
    cardElement.className = 'product-card';
    
    // Template do card usando template literals
    cardElement.innerHTML = `
        <div class="product-image">${product.image}</div>
        <h3 class="product-name">${escapeHtml(product.name)}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>
        <button class="add-to-cart-btn" data-product-id="${product.id}">
            🛒 Adicionar ao Carrinho
        </button>
    `;
    
    // Adiciona event listener para o botão
    const button = cardElement.querySelector('.add-to-cart-btn');
    button.addEventListener('click', () => handleAddToCart(product, onAddToCart));
    
    return cardElement;
}

/**
 * Manipula o clique no botão "Adicionar ao Carrinho"
 * @param {Object} product - Produto a ser adicionado
 * @param {Function} onAddToCart - Callback personalizado (opcional)
 */
function handleAddToCart(product, onAddToCart) {
    // Feedback visual temporário
    const button = event.target;
    const originalText = button.textContent;
    
    button.disabled = true;
    button.textContent = '✅ Adicionado!';
    button.style.background = '#27ae60';
    
    // Chama callback personalizado se fornecido, senão usa o padrão
    if (onAddToCart) {
        onAddToCart(product);
    } else {
        addToCart(product);
    }
    
    // Restaura o estado original do botão após 1.5s
    setTimeout(() => {
        button.disabled = false;
        button.textContent = originalText;
        button.style.background = '';
    }, 1500);
}

/**
 * Escapa caracteres HTML para prevenir XSS
 * @param {string} text - Texto a ser escapado
 * @returns {string} Texto escapado
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Formata preço para exibição
 * @param {number} price - Preço numérico
 * @returns {string} Preço formatado
 */
function formatPrice(price) {
    return price.toFixed(2).replace('.', ',');
}
