// FILE: /mvc/src/models/ProductModel.js
/**
 * PRODUCT MODEL - PADRÃO MVC
 * 
 * O Model é responsável por gerenciar os dados dos produtos e o estado da aplicação.
 * Implementa o padrão Observer para notificar Views sobre mudanças nos dados.
 */

/**
 * Classe ProductModel que gerencia dados de produtos
 * Implementa padrão Observer para notificar mudanças
 */
export class ProductModel {
    constructor() {
        // Dados do modelo
        this.products = [];
        this.loading = false;
        this.error = null;
        
        // Lista de observadores (Views que precisam ser notificadas)
        this.observers = [];
        
        console.log('📦 ProductModel inicializado');
    }
    
    /**
     * Adiciona um observador para ser notificado sobre mudanças
     * @param {Function} observer - Função que será chamada quando houver mudanças
     */
    addObserver(observer) {
        this.observers.push(observer);
        console.log(`👀 Observer adicionado. Total: ${this.observers.length}`);
    }
    
    /**
     * Remove um observador
     * @param {Function} observer - Observador a ser removido
     */
    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
            console.log(`👋 Observer removido. Total: ${this.observers.length}`);
        }
    }
    
    /**
     * Notifica todos os observadores sobre mudanças no modelo
     */
    notifyObservers() {
        const modelData = this.getModelData();
        console.log('📢 Notificando observadores:', modelData);
        
        this.observers.forEach(observer => {
            try {
                observer(modelData);
            } catch (error) {
                console.error('❌ Erro ao notificar observer:', error);
            }
        });
    }
    
    /**
     * Retorna os dados atuais do modelo
     * @returns {Object} Dados do modelo
     */
    getModelData() {
        return {
            products: [...this.products],
            loading: this.loading,
            error: this.error
        };
    }
    
    /**
     * Define o estado de carregamento
     * @param {boolean} loading - Estado de loading
     */
    setLoading(loading) {
        if (this.loading !== loading) {
            this.loading = loading;
            this.notifyObservers();
        }
    }
    
    /**
     * Define os produtos e limpa erros
     * @param {Array} products - Lista de produtos
     */
    setProducts(products) {
        this.products = [...products];
        this.error = null;
        this.loading = false;
        console.log(`✅ ${products.length} produtos definidos no modelo`);
        this.notifyObservers();
    }
    
    /**
     * Define um erro e limpa loading
     * @param {string} error - Mensagem de erro
     */
    setError(error) {
        this.error = error;
        this.loading = false;
        this.products = [];
        console.error('❌ Erro definido no modelo:', error);
        this.notifyObservers();
    }
    
    /**
     * Busca um produto por ID
     * @param {number} id - ID do produto
     * @returns {Object|null} Produto encontrado ou null
     */
    getProductById(id) {
        return this.products.find(product => product.id === id) || null;
    }
    
    /**
     * Retorna todos os produtos
     * @returns {Array} Lista de produtos
     */
    getAllProducts() {
        return [...this.products];
    }
    
    /**
     * Limpa todos os dados do modelo
     */
    clear() {
        this.products = [];
        this.loading = false;
        this.error = null;
        console.log('🧹 Modelo limpo');
        this.notifyObservers();
    }
    
    /**
     * Retorna estatísticas dos produtos
     * @returns {Object} Estatísticas
     */
    getStatistics() {
        if (this.products.length === 0) {
            return {
                totalProducts: 0,
                averagePrice: 0,
                minPrice: 0,
                maxPrice: 0
            };
        }
        
        const prices = this.products.map(p => p.price);
        
        return {
            totalProducts: this.products.length,
            averagePrice: prices.reduce((sum, price) => sum + price, 0) / prices.length,
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices)
        };
    }
}
