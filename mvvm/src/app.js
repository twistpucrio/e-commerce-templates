// FILE: /mvvm/src/app.js
/**
 * PONTO DE ENTRADA DA APLICAÇÃO - ARQUITETURA MVVM
 * 
 * Este arquivo inicializa a aplicação seguindo o padrão MVVM:
 * - Cria o ViewModel (que gerencia estado e lógica de apresentação)
 * - Cria a View (que se conecta ao ViewModel via data binding)
 * - O Model é usado internamente pelo ViewModel
 */

import { ProductListViewModel } from './viewmodels/ProductListViewModel.js';
import { ProductListView } from './views/productListView.js';

/**
 * Classe principal da aplicação MVVM
 */
class MVVMApp {
    constructor() {
        this.viewModel = null;
        this.view = null;
        
        this.init();
    }
    
    /**
     * Inicializa a aplicação MVVM
     */
    async init() {
        console.log('🚀 Iniciando aplicação - Arquitetura MVVM');
        console.log('📐 Model-View-ViewModel Pattern');
        
        try {
            // 1. Cria o ViewModel (central do padrão MVVM)
            this.createViewModel();
            
            // 2. Cria a View e conecta ao ViewModel (data binding)
            this.createView();
            
            // 3. Configura listeners globais
            this.setupGlobalListeners();
            
            // 4. Inicializa os dados
            await this.initializeData();
            
            console.log('✅ Aplicação MVVM inicializada com sucesso');
            
            // 5. Expõe ferramentas de debug
            this.setupDevelopmentTools();
            
        } catch (error) {
            console.error('❌ Erro ao inicializar aplicação MVVM:', error);
            this.showInitializationError(error);
        }
    }
    
    /**
     * Cria o ViewModel
     */
    createViewModel() {
        console.log('🎭 Criando ViewModel...');
        
        this.viewModel = new ProductListViewModel();
        
        console.log('✅ ViewModel criado');
    }
    
    /**
     * Cria a View e estabelece data binding com o ViewModel
     */
    createView() {
        console.log('🎨 Criando View...');
        
        // A View se conecta automaticamente ao ViewModel
        this.view = new ProductListView(this.viewModel);
        
        // Configura atalhos de teclado
        this.view.setupKeyboardShortcuts();
        
        console.log('✅ View criada e conectada ao ViewModel');
    }
    
    /**
     * Inicializa os dados da aplicação
     */
    async initializeData() {
        console.log('📡 Carregando dados iniciais...');
        
        // Executa comando do ViewModel para carregar produtos
        await this.viewModel.commands.loadProducts();
        
        console.log('✅ Dados iniciais carregados');
    }
    
    /**
     * Configura listeners globais da aplicação
     */
    setupGlobalListeners() {
        console.log('🎧 Configurando listeners globais...');
        
        // Cleanup quando a página for fechada
        window.addEventListener('beforeunload', () => {
            this.destroy();
        });
        
        // Detecta quando a página fica visível novamente
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                console.log('👀 Página ficou visível - MVVM App notificada');
                // Poderia recarregar dados se necessário
            }
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
                    <h3>❌ Erro ao inicializar aplicação MVVM</h3>
                    <p>${error.message}</p>
                    <button onclick="location.reload()" 
                            style="margin-top: 1rem; padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
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
            // Expõe componentes MVVM no console para debug
            window.mvvmDebug = {
                app: this,
                viewModel: this.viewModel,
                view: this.view,
                
                // Métodos úteis para debug
                reloadProducts: () => this.viewModel.commands.loadProducts(),
                addRandomProduct: () => {
                    const randomProduct = {
                        id: Date.now(),
                        name: `Produto Teste ${Math.floor(Math.random() * 1000)}`,
                        price: Math.random() * 1000,
                        image: '🎲',
                        description: 'Produto de teste'
                    };
                    this.viewModel.products.push(randomProduct);
                },
                getSnapshot: () => this.viewModel.getSnapshot(),
                clearCart: () => this.viewModel.commands.clearCart(),
                getCartSummary: () => this.viewModel.getCartSummary(),
                getStats: () => this.viewModel.getProductStatistics()
            };
            
            console.log('🔧 Ferramentas de debug MVVM disponíveis em window.mvvmDebug');
            console.log('📋 Comandos úteis:');
            console.log('  - mvvmDebug.reloadProducts() - Recarrega produtos');
            console.log('  - mvvmDebug.getSnapshot() - Estado atual do ViewModel');
            console.log('  - mvvmDebug.getCartSummary() - Resumo do carrinho');
            console.log('  - mvvmDebug.addRandomProduct() - Adiciona produto teste');
            console.log('  - mvvmDebug.clearCart() - Limpa o carrinho');
            console.log('  - mvvmDebug.getStats() - Estatísticas dos produtos');
        }
    }
    
    /**
     * Retorna informações sobre a arquitetura MVVM
     * @returns {Object} Informações da arquitetura
     */
    getArchitectureInfo() {
        return {
            pattern: 'MVVM (Model-View-ViewModel)',
            description: 'Separa apresentação de lógica usando data binding',
            components: {
                model: 'Dados e lógica de negócio (Product, Observable)',
                view: 'Interface de usuário que se conecta ao ViewModel',
                viewModel: 'Mediador que expõe dados e comandos para a View'
            },
            benefits: [
                'Data binding automático entre View e ViewModel',
                'Testabilidade - ViewModel pode ser testado sem UI',
                'Separação clara entre lógica de apresentação e UI',
                'Reutilização do ViewModel em diferentes Views'
            ],
            dataBinding: {
                description: 'Conexão automática entre propriedades observáveis e UI',
                implementation: 'Padrão Observer com classes Observable e ObservableArray',
                flow: 'ViewModel propriedades → View atualização automática'
            }
        };
    }
    
    /**
     * Demonstra o data binding do MVVM
     */
    demonstrateDataBinding() {
        console.log('🎭 Demonstrando Data Binding MVVM:');
        
        // Mudança no ViewModel automaticamente atualiza a View
        setTimeout(() => {
            console.log('📝 Mudando estado de loading...');
            this.viewModel.isLoading.value = true;
        }, 1000);
        
        setTimeout(() => {
            console.log('📝 Simulando erro...');
            this.viewModel.isLoading.value = false;
            this.viewModel.errorMessage.value = 'Erro de demonstração';
        }, 2000);
        
        setTimeout(() => {
            console.log('📝 Limpando erro...');
            this.viewModel.errorMessage.value = null;
        }, 3000);
        
        console.log('👀 Observe como a UI atualiza automaticamente sem código explícito!');
    }
    
    /**
     * Limpa recursos quando a aplicação for destruída
     */
    destroy() {
        console.log('🧹 Destruindo aplicação MVVM...');
        
        if (this.view) {
            this.view.destroy();
        }
        
        if (this.viewModel) {
            this.viewModel.clear();
        }
        
        console.log('✅ Aplicação MVVM destruída');
    }
}

// Inicializa a aplicação quando o DOM estiver pronto
let app;

function initializeApp() {
    app = new MVVMApp();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

export default MVVMApp;
