// FILE: /mvc/src/views/ProductView.js
/**
 * PRODUCT VIEW - PADRÃO MVC
 * 
 * A View é responsável por renderizar a interface do usuário
 * e capturar eventos dos usuários para enviar ao Controller.
 * Não contém lógica de negócio, apenas lógica de apresentação.
 */

/**
 * Classe ProductView que gerencia a apresentação dos produtos
 */
export class ProductView {
    constructor(controller) {
        this.controller = controller;
        this.container = null;
        this.loadingElement = null;
        this.errorElement = null;
        this.productsContainer = null;
        
        this.initializeElements();
        console.log('🎨 ProductView inicializada');
    }
    
    /**
     * Inicializa os elementos DOM necessários
     */
    initializeElements() {
        this.container = document.getElementById('products-container');
        this.loadingElement = document.getElementById('loading');
        this.errorElement = document.getElementById('error');
        this.productsContainer = document.getElementById('products-container');
        
        if (!this.container) {
            console.error('❌ Container de produtos não encontrado!');
        }
    }
    
    /**
     * Renderiza a view baseada nos dados do modelo
     * Esta função é chamada pelo Observer pattern quando o modelo muda
     * @param {Object} modelData - Dados vindos do modelo
     */
    render(modelData) {
        const { products, loading, error } = modelData;
        
        console.log('🎨 Renderizando view com dados:', modelData);
        
        if (loading) {
            this.showLoading();
        } else if (error) {
            this.showError(error);
        } else if (products && products.length > 0) {
            this.showProducts(products);
        } else {
            this.showEmptyState();
        }
        
        this.updatePageTitle(modelData);
    }
    
    /**
     * Mostra o estado de carregamento
     */
    showLoading() {
        this.hideAllSections();
        
        if (this.loadingElement) {
            this.loadingElement.style.display = 'flex';
        }
    }
    
    /**
     * Mostra o estado de erro
     * @param {string} errorMessage - Mensagem de erro
     */
    showError(errorMessage) {
        this.hideAllSections();
        
        if (this.errorElement) {
            this.errorElement.style.display = 'block';
            const errorText = this.errorElement.querySelector('p');
            if (errorText) {
                errorText.textContent = `❌ ${errorMessage}`;
            }
        }
    }
    
    /**
     * Mostra a lista de produtos
     * @param {Array} products - Lista de produtos
     */
    showProducts(products) {
        this.hideAllSections();
        
        if (this.productsContainer) {
            this.productsContainer.style.display = 'block';
            this.productsContainer.innerHTML = '';
            
            // Cria o grid de produtos
            const gridElement = this.createProductsGrid(products);
            this.productsContainer.appendChild(gridElement);
            
            // Adiciona animação
            this.animateProductsEntry(gridElement);
        }
    }
    
    /**
     * Mostra estado vazio
     */
    showEmptyState() {
        this.hideAllSections();
        
        if (this.productsContainer) {
            this.productsContainer.style.display = 'block';
            this.productsContainer.innerHTML = `
                <div class="empty-state" style="text-align: center; padding: 3rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">📦</div>
                    <h3>Nenhum produto encontrado</h3>
                    <p>Não há produtos disponíveis no momento.</p>
                </div>
            `;
        }
    }
    
    /**
     * Oculta todas as seções
     */
    hideAllSections() {
        if (this.loadingElement) this.loadingElement.style.display = 'none';
        if (this.errorElement) this.errorElement.style.display = 'none';
        if (this.productsContainer) this.productsContainer.style.display = 'none';
    }
    
    /**
     * Cria o grid de produtos
     * @param {Array} products - Lista de produtos
     * @returns {HTMLElement} Elemento do grid
     */
    createProductsGrid(products) {
        const gridElement = document.createElement('div');
        gridElement.className = 'products-grid';
        
        products.forEach(product => {
            const productCard = this.createProductCard(product);
            gridElement.appendChild(productCard);
        });
        
        return gridElement;
    }
    
    /**
     * Cria um card de produto
     * @param {Object} product - Dados do produto
     * @returns {HTMLElement} Elemento do card
     */
    createProductCard(product) {
        const cardElement = document.createElement('div');
        cardElement.className = 'product-card';
        
        cardElement.innerHTML = `
            <div class="product-image">${product.image}</div>
            <h3 class="product-name">${this.escapeHtml(product.name)}</h3>
            <p class="product-price">${this.formatPrice(product.price)}</p>
            <button class="add-to-cart-btn" data-product-id="${product.id}">
                🛒 Adicionar ao Carrinho
            </button>
        `;
        
        // Adiciona event listener que delega para o controller
        const button = cardElement.querySelector('.add-to-cart-btn');
        button.addEventListener('click', (event) => {
            this.handleAddToCartClick(event, product);
        });
        
        return cardElement;
    }
    
    /**
     * Manipula clique no botão de adicionar ao carrinho
     * Delega a ação para o Controller
     * @param {Event} event - Evento de clique
     * @param {Object} product - Produto selecionado
     */
    handleAddToCartClick(event, product) {
        const button = event.target;
        
        // Feedback visual imediato
        this.showButtonFeedback(button);
        
        // Delega para o controller
        if (this.controller && this.controller.addToCart) {
            this.controller.addToCart(product);
        }
    }
    
    /**
     * Mostra feedback visual no botão
     * @param {HTMLElement} button - Botão clicado
     */
    showButtonFeedback(button) {
        const originalText = button.textContent;
        
        button.disabled = true;
        button.textContent = '✅ Adicionado!';
        button.style.background = '#27ae60';
        
        setTimeout(() => {
            button.disabled = false;
            button.textContent = originalText;
            button.style.background = '';
        }, 1500);
    }
    
    /**
     * Adiciona animação de entrada aos produtos
     * @param {HTMLElement} gridElement - Grid de produtos
     */
    animateProductsEntry(gridElement) {
        const cards = gridElement.querySelectorAll('.product-card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    /**
     * Atualiza o título da página
     * @param {Object} modelData - Dados do modelo
     */
    updatePageTitle(modelData) {
        const { products, loading, error } = modelData;
        let title = 'E-commerce MVP (MVC) - ';
        
        if (loading) {
            title += 'Carregando...';
        } else if (error) {
            title += 'Erro';
        } else {
            title += `${products.length} produtos`;
        }
        
        document.title = title;
    }
    
    /**
     * Escapa HTML para prevenir XSS
     * @param {string} text - Texto a ser escapado
     * @returns {string} Texto escapado
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /**
     * Formata preço para exibição
     * @param {number} price - Preço numérico
     * @returns {string} Preço formatado
     */
    formatPrice(price) {
        return price.toFixed(2).replace('.', ',');
    }
    
    /**
     * Limpa a view
     */
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        console.log('🧹 ProductView destruída');
    }
}
