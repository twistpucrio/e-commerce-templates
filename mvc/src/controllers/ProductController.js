// FILE: /mvc/src/controllers/ProductController.js
/**
 * PRODUCT CONTROLLER - PADRÃO MVC
 * 
 * O Controller é responsável por coordenar a comunicação entre
 * o Model e a View. Recebe eventos da View, atualiza o Model,
 * e coordena as ações da aplicação.
 */

import { getProducts } from '../services/ProductService.js';

/**
 * Classe ProductController que coordena Model e View
 */
export class ProductController {
    constructor(productModel, cartModel, productView) {
        this.productModel = productModel;
        this.cartModel = cartModel;
        this.productView = productView;
        
        this.setupModelObservers();
        console.log('🎮 ProductController inicializado');
    }
    
    /**
     * Configura os observadores dos modelos
     * O Controller atua como mediador entre Models e Views
     */
    setupModelObservers() {
        // Observa mudanças no ProductModel e atualiza a View
        this.productModel.addObserver((modelData) => {
            this.productView.render(modelData);
        });
        
        // Observa mudanças no CartModel (para futuras funcionalidades)
        this.cartModel.addObserver((cartData) => {
            console.log('🛒 Carrinho atualizado:', cartData);
            // Aqui poderia atualizar uma view do carrinho, se existisse
        });
    }
    
    /**
     * Inicializa a aplicação carregando os dados iniciais
     */
    async initialize() {
        console.log('🚀 Inicializando aplicação MVC...');
        await this.loadProducts();
    }
    
    /**
     * Carrega os produtos do serviço e atualiza o modelo
     */
    async loadProducts() {
        try {
            console.log('📡 Carregando produtos...');
            
            // Atualiza o modelo para estado de loading
            this.productModel.setLoading(true);
            
            // Busca os produtos através do serviço
            const products = await getProducts();
            
            console.log(`✅ ${products.length} produtos carregados com sucesso`);
            
            // Atualiza o modelo com os produtos
            this.productModel.setProducts(products);
            
        } catch (error) {
            console.error('❌ Erro ao carregar produtos:', error);
            
            // Atualiza o modelo com o erro
            this.productModel.setError(error.message || 'Erro desconhecido');
        }
    }
    
    /**
     * Manipula a ação de adicionar produto ao carrinho
     * Este método é chamado pela View quando o usuário clica no botão
     * @param {Object} product - Produto a ser adicionado
     */
    addToCart(product) {
        try {
            console.log('🛒 Controller: Adicionando produto ao carrinho', product);
            
            // Valida o produto
            if (!product || !product.id) {
                throw new Error('Produto inválido');
            }
            
            // Adiciona ao modelo do carrinho
            this.cartModel.addItem(product);
            
            // Aqui poderia haver lógica adicional, como:
            // - Validar estoque
            // - Aplicar descontos
            // - Enviar analytics
            // - Mostrar notificações
            
            console.log('✅ Produto adicionado ao carrinho com sucesso');
            
        } catch (error) {
            console.error('❌ Erro ao adicionar produto ao carrinho:', error);
            
            // Aqui poderia mostrar uma mensagem de erro para o usuário
            // Por exemplo, através de uma View de notificações
        }
    }
    
    /**
     * Remove um produto do carrinho
     * @param {number} productId - ID do produto a ser removido
     */
    removeFromCart(productId) {
        try {
            console.log('🗑️ Controller: Removendo produto do carrinho', productId);
            this.cartModel.removeItem(productId);
            console.log('✅ Produto removido do carrinho com sucesso');
        } catch (error) {
            console.error('❌ Erro ao remover produto do carrinho:', error);
        }
    }
    
    /**
     * Atualiza a quantidade de um item no carrinho
     * @param {number} productId - ID do produto
     * @param {number} quantity - Nova quantidade
     */
    updateCartItemQuantity(productId, quantity) {
        try {
            console.log(`📝 Controller: Atualizando quantidade do produto ${productId} para ${quantity}`);
            this.cartModel.updateQuantity(productId, quantity);
            console.log('✅ Quantidade atualizada com sucesso');
        } catch (error) {
            console.error('❌ Erro ao atualizar quantidade:', error);
        }
    }
    
    /**
     * Limpa o carrinho
     */
    clearCart() {
        try {
            console.log('🧹 Controller: Limpando carrinho');
            this.cartModel.clear();
            console.log('✅ Carrinho limpo com sucesso');
        } catch (error) {
            console.error('❌ Erro ao limpar carrinho:', error);
        }
    }
    
    /**
     * Recarrega os produtos
     */
    async refreshProducts() {
        console.log('🔄 Controller: Recarregando produtos');
        await this.loadProducts();
    }
    
    /**
     * Busca um produto específico por ID
     * @param {number} productId - ID do produto
     * @returns {Object|null} Produto encontrado ou null
     */
    getProduct(productId) {
        return this.productModel.getProductById(productId);
    }
    
    /**
     * Retorna estatísticas dos produtos
     * @returns {Object} Estatísticas
     */
    getProductStatistics() {
        return this.productModel.getStatistics();
    }
    
    /**
     * Retorna dados do carrinho
     * @returns {Object} Dados do carrinho
     */
    getCartData() {
        return this.cartModel.getCartData();
    }
    
    /**
     * Configura atalhos de teclado e outros event listeners globais
     */
    setupGlobalEventListeners() {
        // Atalho Ctrl+R para recarregar produtos
        document.addEventListener('keydown', (event) => {
            if (event.key.toLowerCase() === 'r' && event.ctrlKey) {
                event.preventDefault();
                this.refreshProducts();
            }
        });
        
        // Detecta quando a página fica visível novamente
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                console.log('👀 Página ficou visível - Controller notificado');
                // Poderia recarregar dados se necessário
            }
        });
    }
    
    /**
     * Limpa recursos quando o controller for destruído
     */
    destroy() {
        // Remove observadores dos modelos
        this.productModel.removeObserver(this.productView.render);
        
        console.log('🧹 ProductController destruído');
    }
}
