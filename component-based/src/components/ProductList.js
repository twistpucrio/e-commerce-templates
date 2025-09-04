// FILE: /component-based/src/components/ProductList.js
/**
 * COMPONENTE PRODUCT LIST
 * 
 * Componente que renderiza uma lista de produtos usando o ProductCard.
 * Gerencia os diferentes estados da aplicação (loading, error, sucesso).
 */

import { ProductCard } from './ProductCard.js';

/**
 * Renderiza a lista de produtos baseada no estado atual
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.products - Array de produtos
 * @param {boolean} props.loading - Estado de carregamento
 * @param {string} props.error - Mensagem de erro (se houver)
 * @param {HTMLElement} props.container - Container onde renderizar
 */
export function ProductList({ products, loading, error, container }) {
    // Limpa o container
    container.innerHTML = '';
    
    // Gerencia diferentes estados da UI
    if (loading) {
        renderLoadingState(container);
    } else if (error) {
        renderErrorState(container, error);
    } else if (products && products.length > 0) {
        renderProductsState(container, products);
    } else {
        renderEmptyState(container);
    }
}

/**
 * Renderiza o estado de carregamento
 * @param {HTMLElement} container - Container de destino
 */
function renderLoadingState(container) {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.display = 'flex';
    }
    
    const productsContainer = document.getElementById('products-container');
    if (productsContainer) {
        productsContainer.style.display = 'none';
    }
}

/**
 * Renderiza o estado de erro
 * @param {HTMLElement} container - Container de destino
 * @param {string} errorMessage - Mensagem de erro
 */
function renderErrorState(container, errorMessage) {
    hideLoadingState();
    
    const errorElement = document.getElementById('error');
    if (errorElement) {
        errorElement.style.display = 'block';
        const errorText = errorElement.querySelector('p');
        if (errorText) {
            errorText.textContent = `❌ ${errorMessage}`;
        }
    }
    
    const productsContainer = document.getElementById('products-container');
    if (productsContainer) {
        productsContainer.style.display = 'none';
    }
}

/**
 * Renderiza o estado com produtos
 * @param {HTMLElement} container - Container de destino
 * @param {Array} products - Array de produtos
 */
function renderProductsState(container, products) {
    hideLoadingState();
    
    const productsContainer = document.getElementById('products-container');
    if (productsContainer) {
        productsContainer.style.display = 'block';
    }
    
    // Cria o grid de produtos
    const gridElement = document.createElement('div');
    gridElement.className = 'products-grid';
    
    // Renderiza cada produto usando o componente ProductCard
    products.forEach(product => {
        const productCard = ProductCard({ 
            product,
            onAddToCart: (product) => {
                // Callback personalizado pode ser adicionado aqui
                console.log('🛍️ Produto selecionado:', product.name);
            }
        });
        gridElement.appendChild(productCard);
    });
    
    container.appendChild(gridElement);
    
    // Adiciona animação de entrada
    animateProductsEntry(gridElement);
}

/**
 * Renderiza estado vazio (quando não há produtos)
 * @param {HTMLElement} container - Container de destino
 */
function renderEmptyState(container) {
    hideLoadingState();
    
    const emptyElement = document.createElement('div');
    emptyElement.className = 'empty-state';
    emptyElement.innerHTML = `
        <div style="text-align: center; padding: 3rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">📦</div>
            <h3>Nenhum produto encontrado</h3>
            <p>Não há produtos disponíveis no momento.</p>
        </div>
    `;
    
    container.appendChild(emptyElement);
}

/**
 * Oculta o estado de carregamento
 */
function hideLoadingState() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    
    const errorElement = document.getElementById('error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

/**
 * Adiciona animação suave para a entrada dos produtos
 * @param {HTMLElement} gridElement - Grid de produtos
 */
function animateProductsEntry(gridElement) {
    const cards = gridElement.querySelectorAll('.product-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100); // Stagger animation
    });
}
