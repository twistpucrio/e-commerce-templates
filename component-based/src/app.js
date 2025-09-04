// FILE: /component-based/src/app.js
/**
 * PONTO DE ENTRADA DA APLICAÇÃO - ARQUITETURA BASEADA EM COMPONENTES
 * 
 * Este arquivo inicializa a aplicação, configura o estado global,
 * e orquestra a renderização dos componentes.
 */

import { getState, setState, subscribe } from './store/state.js';
import { getProducts } from './services/ProductService.js';
import { ProductList } from './components/ProductList.js';

/**
 * Classe principal da aplicação
 */
class App {
    constructor() {
        this.container = null;
        this.unsubscribe = null;
        this.init();
    }
    
    /**
     * Inicializa a aplicação
     */
    async init() {
        console.log('🚀 Iniciando aplicação - Arquitetura Baseada em Componentes');
        
        // Encontra o container principal
        this.container = document.getElementById('products-container');
        if (!this.container) {
            console.error('Container de produtos não encontrado!');
            return;
        }
        
        // Inscreve-se nas mudanças de estado
        this.setupStateSubscription();
        
        // Carrega os dados iniciais
        await this.loadInitialData();
        
        // Configura listeners globais
        this.setupGlobalListeners();
    }
    
    /**
     * Configura a inscrição no estado global
     */
    setupStateSubscription() {
        this.unsubscribe = subscribe((newState) => {
            console.log('📊 Estado atualizado:', newState);
            this.render(newState);
        });
    }
    
    /**
     * Carrega os dados iniciais da aplicação
     */
    async loadInitialData() {
        try {
            console.log('📡 Buscando produtos...');
            
            // Inicia com estado de loading
            setState({ loading: true, error: null });
            
            // Busca os produtos
            const products = await getProducts();
            
            console.log(`✅ ${products.length} produtos carregados com sucesso`);
            
            // Atualiza estado com os produtos
            setState({ 
                products, 
                loading: false, 
                error: null 
            });
            
        } catch (error) {
            console.error('❌ Erro ao carregar produtos:', error);
            
            setState({ 
                products: [], 
                loading: false, 
                error: error.message || 'Erro desconhecido' 
            });
        }
    }
    
    /**
     * Renderiza a interface baseada no estado atual
     * @param {Object} state - Estado atual da aplicação
     */
    render(state) {
        const { products, loading, error } = state;
        
        // Renderiza a lista de produtos
        ProductList({
            products,
            loading,
            error,
            container: this.container
        });
        
        // Atualiza título da página baseado no estado
        this.updatePageTitle(state);
    }
    
    /**
     * Atualiza o título da página baseado no estado
     * @param {Object} state - Estado atual
     */
    updatePageTitle(state) {
        const { products, loading, error } = state;
        let title = 'E-commerce MVP - ';
        
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
     * Configura listeners globais da aplicação
     */
    setupGlobalListeners() {
        // Listener para atalhos de teclado
        document.addEventListener('keydown', (event) => {
            // Pressionar 'R' recarrega os produtos
            if (event.key.toLowerCase() === 'r' && event.ctrlKey) {
                event.preventDefault();
                console.log('🔄 Recarregando produtos...');
                this.loadInitialData();
            }
        });
        
        // Listener para mudanças de visibilidade da página
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                console.log('👀 Página ficou visível novamente');
                // Pode recarregar dados se necessário
            }
        });
        
        // Listener para erros globais
        window.addEventListener('error', (event) => {
            console.error('❌ Erro global capturado:', event.error);
        });
        
        // Listener para promises rejeitadas não capturadas
        window.addEventListener('unhandledrejection', (event) => {
            console.error('❌ Promise rejeitada não capturada:', event.reason);
        });
    }
    
    /**
     * Limpa recursos quando a aplicação for destruída
     */
    destroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        console.log('🧹 Aplicação destruída');
    }
}

/**
 * Função auxiliar para debug em desenvolvimento
 */
function setupDevelopmentTools() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Expõe funções úteis no console para debug
        window.appDebug = {
            getState,
            setState,
            reloadProducts: () => app.loadInitialData()
        };
        
        console.log('🔧 Ferramentas de debug disponíveis em window.appDebug');
    }
}

// Inicializa a aplicação quando o DOM estiver pronto
let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new App();
        setupDevelopmentTools();
    });
} else {
    app = new App();
    setupDevelopmentTools();
}

// Cleanup quando a página for fechada
window.addEventListener('beforeunload', () => {
    if (app) {
        app.destroy();
    }
});

export default App;
