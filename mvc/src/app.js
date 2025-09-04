// FILE: /mvc/src/app.js
/**
 * PONTO DE ENTRADA DA APLICAÇÃO - ARQUITETURA MVC
 * 
 * Este arquivo inicializa a aplicação seguindo o padrão MVC:
 * - Cria as instâncias do Model, View e Controller
 * - Conecta os componentes através do padrão Observer
 * - Inicializa a aplicação
 */

import { ProductModel } from './models/ProductModel.js';
import { CartModel } from './models/CartModel.js';
import { ProductView } from './views/ProductView.js';
import { ProductController } from './controllers/ProductController.js';

/**
 * Classe principal da aplicação MVC
 */
class MVCApp {
    constructor() {
        // Instâncias dos componentes MVC
        this.productModel = null;
        this.cartModel = null;
        this.productView = null;
        this.productController = null;
        
        this.init();
    }
    
    /**
     * Inicializa a aplicação MVC
     */
    async init() {
        console.log('🚀 Iniciando aplicação - Arquitetura MVC');
        console.log('📐 Model-View-Controller Pattern');
        
        try {
            // 1. Cria os Models (gerenciam dados e estado)
            this.createModels();
            
            // 2. Cria o Controller (coordena Models e Views)
            this.createController();
            
            // 3. Cria as Views (apresentação e captura de eventos)
            this.createViews();
            
            // 4. Conecta os componentes
            this.connectComponents();
            
            // 5. Configura listeners globais
            this.setupGlobalListeners();
            
            // 6. Inicializa os dados da aplicação
            await this.productController.initialize();
            
            console.log('✅ Aplicação MVC inicializada com sucesso');
            
            // 7. Expõe ferramentas de debug em desenvolvimento
            this.setupDevelopmentTools();
            
        } catch (error) {
            console.error('❌ Erro ao inicializar aplicação MVC:', error);
            this.showInitializationError(error);
        }
    }
    
    /**
     * Cria as instâncias dos Models
     */
    createModels() {
        console.log('📦 Criando Models...');
        
        // Model para gerenciar produtos
        this.productModel = new ProductModel();
        
        // Model para gerenciar carrinho
        this.cartModel = new CartModel();
        
        console.log('✅ Models criados');
    }
    
    /**
     * Cria as instâncias das Views
     */
    createViews() {
        console.log('🎨 Criando Views...');
        
        // View para apresentar produtos (precisa do controller para callbacks)
        this.productView = new ProductView(this.productController);
        
        console.log('✅ Views criadas');
    }
    
    /**
     * Cria a instância do Controller
     */
    createController() {
        console.log('🎮 Criando Controller...');
        
        // O Controller precisa ter acesso aos Models
        // A View será criada depois e passará o Controller como dependência
        this.productController = new ProductController(
            this.productModel,
            this.cartModel,
            null // View será definida depois
        );
        
        console.log('✅ Controller criado');
    }
    
    /**
     * Conecta os componentes MVC
     */
    connectComponents() {
        console.log('🔗 Conectando componentes MVC...');
        
        // Atualiza a referência da View no Controller
        this.productController.productView = this.productView;
        
        // O padrão Observer já foi configurado no Controller
        // Os Models notificam o Controller, que atualiza as Views
        
        console.log('✅ Componentes conectados');
    }
    
    /**
     * Configura listeners globais da aplicação
     */
    setupGlobalListeners() {
        console.log('🎧 Configurando listeners globais...');
        
        // Delega para o controller
        this.productController.setupGlobalEventListeners();
        
        // Listeners específicos da aplicação
        window.addEventListener('beforeunload', () => {
            this.destroy();
        });
        
        // Captura erros globais
        window.addEventListener('error', (event) => {
            console.error('❌ Erro global capturado:', event.error);
        });
        
        window.addEventListener('unhandledrejection', (event) => {
            console.error('❌ Promise rejeitada não capturada:', event.reason);
        });
        
        console.log('✅ Listeners configurados');
    }
    
    /**
     * Mostra erro de inicialização para o usuário
     * @param {Error} error - Erro ocorrido
     */
    showInitializationError(error) {
        const container = document.getElementById('products-container');
        if (container) {
            container.innerHTML = `
                <div class="error" style="display: block;">
                    <h3>❌ Erro ao inicializar aplicação</h3>
                    <p>${error.message}</p>
                    <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        🔄 Tentar Novamente
                    </button>
                </div>
            `;
        }
    }
    
    /**
     * Configura ferramentas de desenvolvimento
     */
    setupDevelopmentTools() {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            // Expõe componentes MVC no console para debug
            window.mvcDebug = {
                app: this,
                productModel: this.productModel,
                cartModel: this.cartModel,
                productView: this.productView,
                productController: this.productController,
                
                // Métodos úteis para debug
                reloadProducts: () => this.productController.refreshProducts(),
                getCartData: () => this.cartModel.getCartData(),
                getProductStats: () => this.productModel.getStatistics(),
                clearCart: () => this.cartModel.clear()
            };
            
            console.log('🔧 Ferramentas de debug MVC disponíveis em window.mvcDebug');
            console.log('📋 Comandos úteis:');
            console.log('  - mvcDebug.reloadProducts() - Recarrega produtos');
            console.log('  - mvcDebug.getCartData() - Mostra dados do carrinho');
            console.log('  - mvcDebug.getProductStats() - Estatísticas dos produtos');
            console.log('  - mvcDebug.clearCart() - Limpa o carrinho');
        }
    }
    
    /**
     * Retorna informações sobre a arquitetura
     * @returns {Object} Informações da arquitetura
     */
    getArchitectureInfo() {
        return {
            pattern: 'MVC (Model-View-Controller)',
            description: 'Separa responsabilidades em três camadas distintas',
            components: {
                model: 'Gerencia dados e lógica de negócio',
                view: 'Responsável pela apresentação e captura de eventos',
                controller: 'Coordena Model e View, contém lógica de aplicação'
            },
            benefits: [
                'Separação clara de responsabilidades',
                'Facilita manutenção e testes',
                'Reutilização de componentes',
                'Baixo acoplamento entre camadas'
            ]
        };
    }
    
    /**
     * Limpa recursos quando a aplicação for destruída
     */
    destroy() {
        console.log('🧹 Destruindo aplicação MVC...');
        
        if (this.productController) {
            this.productController.destroy();
        }
        
        if (this.productView) {
            this.productView.destroy();
        }
        
        if (this.productModel) {
            this.productModel.clear();
        }
        
        if (this.cartModel) {
            this.cartModel.clear();
        }
        
        console.log('✅ Aplicação MVC destruída');
    }
}

// Inicializa a aplicação quando o DOM estiver pronto
let app;

function initializeApp() {
    app = new MVCApp();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

export default MVCApp;
