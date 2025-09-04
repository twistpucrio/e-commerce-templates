// FILE: /mvvm/src/views/productListView.js
/**
 * PRODUCT LIST VIEW - PADRÃO MVVM
 * 
 * A View no MVVM é responsável apenas pela apresentação.
 * Ela se "inscreve" nas propriedades observáveis do ViewModel
 * e atualiza automaticamente quando essas propriedades mudam.
 * Delega todas as ações para os comandos do ViewModel.
 */

/**
 * Classe que representa a View dos produtos no padrão MVVM
 */
export class ProductListView {
    constructor(viewModel) {
        this.viewModel = viewModel;
        this.container = null;
        this.loadingElement = null;
        this.errorElement = null;
        this.productsContainer = null;
        
        // Guarda as funções de unsubscribe para cleanup
        this.subscriptions = [];
        
        this.initializeElements();
        this.bindToViewModel();
        console.log('🎨 ProductListView inicializada');
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
     * Conecta a View com as propriedades observáveis do ViewModel
     * Este é o "data binding" simulado do MVVM
     */
    bindToViewModel() {
        console.log('🔗 Conectando View ao ViewModel...');
        
        // Subscreve-se às propriedades observáveis do ViewModel
        
        // Quando isLoading mudar, atualiza a UI de loading
        const loadingUnsubscribe = this.viewModel.isLoading.subscribe(isLoading => {
            console.log('📊 Loading state changed:', isLoading);
            this.updateLoadingState(isLoading);
        });
        this.subscriptions.push(loadingUnsubscribe);
        
        // Quando errorMessage mudar, atualiza a UI de erro
        const errorUnsubscribe = this.viewModel.errorMessage.subscribe(errorMessage => {
            console.log('📊 Error state changed:', errorMessage);
            this.updateErrorState(errorMessage);
        });
        this.subscriptions.push(errorUnsubscribe);
        
        // Quando products mudar, atualiza a lista de produtos
        const productsUnsubscribe = this.viewModel.products.subscribe(products => {
            console.log('📊 Products changed:', products.length, 'produtos');
            this.updateProductsList(products);
        });
        this.subscriptions.push(productsUnsubscribe);
        
        // Quando hasProducts mudar, controla visibilidade
        const hasProductsUnsubscribe = this.viewModel.hasProducts.subscribe(hasProducts => {
            console.log('📊 Has products changed:', hasProducts);
            this.updateProductsVisibility(hasProducts);
        });
        this.subscriptions.push(hasProductsUnsubscribe);
        
        // Quando cart mudar, poderia atualizar badge do carrinho (opcional)
        const cartUnsubscribe = this.viewModel.cart.subscribe(cartItems => {
            console.log('📊 Cart changed:', cartItems.length, 'itens');
            this.updateCartIndicator(cartItems);
        });
        this.subscriptions.push(cartUnsubscribe);
        
        console.log('✅ Data binding configurado');
    }
    
    /**
     * Atualiza o estado de loading na UI
     * @param {boolean} isLoading - Estado de loading
     */
    updateLoadingState(isLoading) {
        if (this.loadingElement) {
            this.loadingElement.style.display = isLoading ? 'flex' : 'none';
        }
        
        if (this.productsContainer && isLoading) {
            this.productsContainer.style.display = 'none';
        }
        
        if (this.errorElement && isLoading) {
            this.errorElement.style.display = 'none';
        }
    }
    
    /**
     * Atualiza o estado de erro na UI
     * @param {string} errorMessage - Mensagem de erro
     */
    updateErrorState(errorMessage) {
        if (this.errorElement) {
            if (errorMessage) {
                this.errorElement.style.display = 'block';
                const errorText = this.errorElement.querySelector('p');
                if (errorText) {
                    errorText.textContent = `❌ ${errorMessage}`;
                }
                
                // Oculta outros elementos
                if (this.loadingElement) this.loadingElement.style.display = 'none';
                if (this.productsContainer) this.productsContainer.style.display = 'none';
            } else {
                this.errorElement.style.display = 'none';
            }
        }
    }
    
    /**
     * Atualiza a lista de produtos na UI
     * @param {Array} products - Lista de produtos
     */
    updateProductsList(products) {
        if (!this.productsContainer) return;
        
        // Limpa container
        this.productsContainer.innerHTML = '';
        
        if (products && products.length > 0) {
            // Cria grid de produtos
            const gridElement = this.createProductsGrid(products);
            this.productsContainer.appendChild(gridElement);
            
            // Adiciona animação
            this.animateProductsEntry(gridElement);
        } else {
            // Mostra estado vazio
            this.showEmptyState();
        }
    }
    
    /**
     * Controla a visibilidade da seção de produtos
     * @param {boolean} hasProducts - Se tem produtos
     */
    updateProductsVisibility(hasProducts) {
        if (this.productsContainer) {
            // Só mostra se tem produtos e não está carregando nem com erro
            const isLoading = this.viewModel.isLoading.value;
            const hasError = this.viewModel.hasError.value;
            
            if (hasProducts && !isLoading && !hasError) {
                this.productsContainer.style.display = 'block';
            }
        }
    }
    
    /**
     * Atualiza indicador do carrinho (funcionalidade opcional)
     * @param {Array} cartItems - Itens do carrinho
     */
    updateCartIndicator(cartItems) {
        // Atualiza título da página com contador do carrinho
        const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        let title = 'E-commerce MVP (MVVM)';
        
        if (itemCount > 0) {
            title += ` - ${itemCount} item${itemCount > 1 ? 's' : ''} no carrinho`;
        }
        
        document.title = title;
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
     * @param {Product} product - Produto
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
        
        // Adiciona event listener que executa comando do ViewModel
        const button = cardElement.querySelector('.add-to-cart-btn');
        button.addEventListener('click', (event) => {
            this.handleAddToCartClick(event, product);
        });
        
        return cardElement;
    }
    
    /**
     * Manipula clique no botão de adicionar ao carrinho
     * Executa o comando do ViewModel
     * @param {Event} event - Evento de clique
     * @param {Product} product - Produto selecionado
     */
    handleAddToCartClick(event, product) {
        const button = event.target;
        
        // Feedback visual imediato
        this.showButtonFeedback(button);
        
        // Executa comando do ViewModel
        if (this.viewModel.commands.addToCart) {
            this.viewModel.commands.addToCart(product);
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
     * Mostra estado vazio
     */
    showEmptyState() {
        if (this.productsContainer) {
            this.productsContainer.innerHTML = `
                <div class="empty-state" style="text-align: center; padding: 3rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">📦</div>
                    <h3>Nenhum produto encontrado</h3>
                    <p>Não há produtos disponíveis no momento.</p>
                    <button onclick="window.mvvmDebug?.viewModel.commands.refreshProducts()" 
                            style="margin-top: 1rem; padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        🔄 Tentar Novamente
                    </button>
                </div>
            `;
        }
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
     * Configura atalhos de teclado
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            // Ctrl+R para recarregar produtos
            if (event.key.toLowerCase() === 'r' && event.ctrlKey) {
                event.preventDefault();
                this.viewModel.commands.refreshProducts();
            }
            
            // Ctrl+Shift+C para limpar carrinho
            if (event.key.toLowerCase() === 'c' && event.ctrlKey && event.shiftKey) {
                event.preventDefault();
                this.viewModel.commands.clearCart();
            }
        });
    }
    
    /**
     * Limpa todas as subscriptions e recursos
     */
    destroy() {
        console.log('🧹 Destruindo ProductListView...');
        
        // Remove todas as subscriptions
        this.subscriptions.forEach(unsubscribe => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        });
        this.subscriptions = [];
        
        // Limpa container
        if (this.container) {
            this.container.innerHTML = '';
        }
        
        console.log('✅ ProductListView destruída');
    }
}
