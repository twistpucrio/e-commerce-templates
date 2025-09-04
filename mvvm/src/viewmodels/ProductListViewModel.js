// FILE: /mvvm/src/viewmodels/ProductListViewModel.js
/**
 * PRODUCT LIST VIEW MODEL - PADRÃO MVVM
 * 
 * O ViewModel é a camada intermediária entre Model e View.
 * Expõe propriedades observáveis e comandos que a View pode usar.
 * Contém a lógica de apresentação e coordena com os Models.
 */

import { Product, Observable, ObservableArray } from '../models/Product.js';
import { getProducts } from '../services/ProductService.js';

/**
 * ViewModel para gerenciar a lista de produtos
 */
export class ProductListViewModel {
    constructor() {
        // Propriedades observáveis que a View pode "bindar"
        this.products = new ObservableArray([]);
        this.isLoading = new Observable(false);
        this.errorMessage = new Observable(null);
        this.cart = new ObservableArray([]);
        
        // Propriedades computadas (derivadas de outras propriedades)
        this.hasProducts = new Observable(false);
        this.hasError = new Observable(false);
        this.cartItemCount = new Observable(0);
        this.cartTotal = new Observable(0);
        
        // Comandos que a View pode executar
        this.commands = {
            loadProducts: () => this.loadProducts(),
            addToCart: (product) => this.addToCart(product),
            removeFromCart: (productId) => this.removeFromCart(productId),
            clearCart: () => this.clearCart(),
            refreshProducts: () => this.refreshProducts()
        };
        
        this.setupComputedProperties();
        console.log('🎭 ProductListViewModel inicializado');
    }
    
    /**
     * Configura propriedades computadas que dependem de outras
     */
    setupComputedProperties() {
        // hasProducts é calculado baseado no array de produtos
        this.products.subscribe(products => {
            this.hasProducts.value = products && products.length > 0;
        });
        
        // hasError é calculado baseado na mensagem de erro
        this.errorMessage.subscribe(error => {
            this.hasError.value = !!error;
        });
        
        // cartItemCount é calculado baseado no carrinho
        this.cart.subscribe(cartItems => {
            this.cartItemCount.value = cartItems.reduce((total, item) => total + item.quantity, 0);
        });
        
        // cartTotal é calculado baseado no carrinho
        this.cart.subscribe(cartItems => {
            this.cartTotal.value = cartItems.reduce((total, item) => {
                return total + (item.product.price * item.quantity);
            }, 0);
        });
    }
    
    /**
     * Carrega a lista de produtos
     */
    async loadProducts() {
        try {
            console.log('📡 ViewModel: Carregando produtos...');
            
            // Atualiza propriedades observáveis
            this.isLoading.value = true;
            this.errorMessage.value = null;
            
            // Busca produtos do serviço
            const productsData = await getProducts();
            
            // Converte dados em objetos Product
            const products = productsData.map(data => new Product(data));
            
            console.log(`✅ ViewModel: ${products.length} produtos carregados`);
            
            // Atualiza propriedades observáveis
            this.products.value = products;
            this.isLoading.value = false;
            
        } catch (error) {
            console.error('❌ ViewModel: Erro ao carregar produtos:', error);
            
            // Atualiza com erro
            this.errorMessage.value = error.message || 'Erro desconhecido';
            this.isLoading.value = false;
            this.products.clear();
        }
    }
    
    /**
     * Adiciona um produto ao carrinho
     * @param {Product} product - Produto a ser adicionado
     */
    addToCart(product) {
        try {
            console.log('🛒 ViewModel: Adicionando produto ao carrinho:', product);
            
            if (!product || !product.isValid()) {
                throw new Error('Produto inválido');
            }
            
            // Verifica se o produto já existe no carrinho
            const currentCart = this.cart.value;
            const existingItem = currentCart.find(item => item.product.id === product.id);
            
            if (existingItem) {
                // Se existe, incrementa quantidade
                existingItem.quantity += 1;
                // Força update do observable
                this.cart.value = [...currentCart];
            } else {
                // Se não existe, adiciona novo item
                this.cart.push({
                    product: product.clone(),
                    quantity: 1,
                    addedAt: new Date()
                });
            }
            
            console.log('✅ ViewModel: Produto adicionado ao carrinho');
            console.log('📦 Carrinho atual:', this.cart.value);
            
        } catch (error) {
            console.error('❌ ViewModel: Erro ao adicionar ao carrinho:', error);
            // Aqui poderia definir uma propriedade de erro específica do carrinho
        }
    }
    
    /**
     * Remove um produto do carrinho
     * @param {number} productId - ID do produto a ser removido
     */
    removeFromCart(productId) {
        try {
            console.log('🗑️ ViewModel: Removendo produto do carrinho:', productId);
            
            const currentCart = this.cart.value;
            const newCart = currentCart.filter(item => item.product.id !== productId);
            
            this.cart.value = newCart;
            
            console.log('✅ ViewModel: Produto removido do carrinho');
            
        } catch (error) {
            console.error('❌ ViewModel: Erro ao remover do carrinho:', error);
        }
    }
    
    /**
     * Limpa o carrinho
     */
    clearCart() {
        try {
            console.log('🧹 ViewModel: Limpando carrinho');
            this.cart.clear();
            console.log('✅ ViewModel: Carrinho limpo');
        } catch (error) {
            console.error('❌ ViewModel: Erro ao limpar carrinho:', error);
        }
    }
    
    /**
     * Recarrega os produtos
     */
    async refreshProducts() {
        console.log('🔄 ViewModel: Recarregando produtos');
        await this.loadProducts();
    }
    
    /**
     * Busca um produto por ID
     * @param {number} productId - ID do produto
     * @returns {Product|null} Produto encontrado ou null
     */
    getProductById(productId) {
        return this.products.find(product => product.id === productId) || null;
    }
    
    /**
     * Filtra produtos por nome
     * @param {string} searchTerm - Termo de busca
     * @returns {Array} Produtos filtrados
     */
    searchProducts(searchTerm) {
        if (!searchTerm) {
            return this.products.value;
        }
        
        const term = searchTerm.toLowerCase();
        return this.products.filter(product => 
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term)
        );
    }
    
    /**
     * Retorna estatísticas dos produtos
     * @returns {Object} Estatísticas
     */
    getProductStatistics() {
        const products = this.products.value;
        
        if (products.length === 0) {
            return {
                totalProducts: 0,
                averagePrice: 0,
                minPrice: 0,
                maxPrice: 0
            };
        }
        
        const prices = products.map(p => p.price);
        
        return {
            totalProducts: products.length,
            averagePrice: prices.reduce((sum, price) => sum + price, 0) / prices.length,
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices)
        };
    }
    
    /**
     * Retorna informações do carrinho formatadas para exibição
     * @returns {Object} Informações do carrinho
     */
    getCartSummary() {
        return {
            itemCount: this.cartItemCount.value,
            total: this.cartTotal.value,
            formattedTotal: `R$ ${this.cartTotal.value.toFixed(2).replace('.', ',')}`,
            items: this.cart.value.map(item => ({
                ...item,
                formattedPrice: item.product.getFormattedPrice(),
                subtotal: item.product.price * item.quantity,
                formattedSubtotal: `R$ ${(item.product.price * item.quantity).toFixed(2).replace('.', ',')}`
            }))
        };
    }
    
    /**
     * Valida se o ViewModel está em estado válido
     * @returns {boolean} True se válido
     */
    isValid() {
        return this.products !== null && 
               this.isLoading !== null && 
               this.errorMessage !== null &&
               this.cart !== null;
    }
    
    /**
     * Limpa todos os dados do ViewModel
     */
    clear() {
        this.products.clear();
        this.cart.clear();
        this.isLoading.value = false;
        this.errorMessage.value = null;
        console.log('🧹 ViewModel limpo');
    }
    
    /**
     * Retorna snapshot do estado atual (para debug)
     * @returns {Object} Estado atual
     */
    getSnapshot() {
        return {
            products: this.products.value,
            isLoading: this.isLoading.value,
            errorMessage: this.errorMessage.value,
            cart: this.cart.value,
            hasProducts: this.hasProducts.value,
            hasError: this.hasError.value,
            cartItemCount: this.cartItemCount.value,
            cartTotal: this.cartTotal.value
        };
    }
}
