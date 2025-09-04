// FILE: /mvc/src/models/CartModel.js
/**
 * CART MODEL - PADRÃO MVC
 * 
 * Gerencia os dados do carrinho de compras e implementa
 * o padrão Observer para notificar Views sobre mudanças.
 */

/**
 * Classe CartModel que gerencia o carrinho de compras
 */
export class CartModel {
    constructor() {
        // Dados do carrinho
        this.items = [];
        
        // Lista de observadores
        this.observers = [];
        
        console.log('🛒 CartModel inicializado');
    }
    
    /**
     * Adiciona um observador
     * @param {Function} observer - Função a ser chamada quando houver mudanças
     */
    addObserver(observer) {
        this.observers.push(observer);
    }
    
    /**
     * Remove um observador
     * @param {Function} observer - Observador a ser removido
     */
    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
    
    /**
     * Notifica todos os observadores
     */
    notifyObservers() {
        const cartData = this.getCartData();
        this.observers.forEach(observer => {
            try {
                observer(cartData);
            } catch (error) {
                console.error('❌ Erro ao notificar observer do carrinho:', error);
            }
        });
    }
    
    /**
     * Retorna os dados atuais do carrinho
     * @returns {Object} Dados do carrinho
     */
    getCartData() {
        return {
            items: [...this.items],
            totalItems: this.getTotalItems(),
            totalPrice: this.getTotalPrice()
        };
    }
    
    /**
     * Adiciona um produto ao carrinho
     * @param {Object} product - Produto a ser adicionado
     */
    addItem(product) {
        // Verifica se o produto já existe no carrinho
        const existingItem = this.items.find(item => item.product.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                product: { ...product },
                quantity: 1,
                addedAt: new Date()
            });
        }
        
        console.log('🛒 Produto adicionado ao carrinho:', product);
        console.log('📦 Carrinho atual:', this.items);
        
        this.notifyObservers();
    }
    
    /**
     * Remove um produto do carrinho
     * @param {number} productId - ID do produto a ser removido
     */
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        console.log(`🗑️ Produto ${productId} removido do carrinho`);
        this.notifyObservers();
    }
    
    /**
     * Atualiza a quantidade de um item
     * @param {number} productId - ID do produto
     * @param {number} quantity - Nova quantidade
     */
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.notifyObservers();
            }
        }
    }
    
    /**
     * Limpa o carrinho
     */
    clear() {
        this.items = [];
        console.log('🧹 Carrinho limpo');
        this.notifyObservers();
    }
    
    /**
     * Retorna o número total de itens
     * @returns {number} Total de itens
     */
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }
    
    /**
     * Retorna o preço total
     * @returns {number} Preço total
     */
    getTotalPrice() {
        return this.items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    }
    
    /**
     * Verifica se o carrinho está vazio
     * @returns {boolean} True se vazio
     */
    isEmpty() {
        return this.items.length === 0;
    }
    
    /**
     * Retorna todos os itens do carrinho
     * @returns {Array} Lista de itens
     */
    getAllItems() {
        return [...this.items];
    }
}
