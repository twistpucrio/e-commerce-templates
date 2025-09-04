// FILE: /component-based/src/store/state.js
/**
 * GERENCIADOR DE ESTADO GLOBAL
 * 
 * Este módulo implementa um store simples inspirado no Redux/Context API do React.
 * Mantém o estado da aplicação e notifica os componentes sobre mudanças.
 */

// Estado global da aplicação
let globalState = {
    products: [],
    loading: true,
    error: null,
    cart: []
};

// Lista de funções que serão chamadas quando o estado mudar
const subscribers = [];

/**
 * Retorna uma cópia do estado atual
 * @returns {Object} Estado atual da aplicação
 */
export function getState() {
    return { ...globalState };
}

/**
 * Atualiza o estado global e notifica todos os subscribers
 * @param {Object} newState - Novo estado (será mesclado com o atual)
 */
export function setState(newState) {
    globalState = { ...globalState, ...newState };
    
    // Notifica todos os componentes inscritos
    subscribers.forEach(callback => {
        try {
            callback(globalState);
        } catch (error) {
            console.error('Erro ao executar subscriber:', error);
        }
    });
}

/**
 * Inscreve uma função para ser chamada quando o estado mudar
 * @param {Function} callback - Função que será chamada com o novo estado
 * @returns {Function} Função para cancelar a inscrição
 */
export function subscribe(callback) {
    subscribers.push(callback);
    
    // Retorna função para cancelar a inscrição (cleanup)
    return () => {
        const index = subscribers.indexOf(callback);
        if (index > -1) {
            subscribers.splice(index, 1);
        }
    };
}

/**
 * Adiciona um produto ao carrinho
 * @param {Object} product - Produto a ser adicionado
 */
export function addToCart(product) {
    const currentState = getState();
    const newCart = [...currentState.cart, product];
    
    setState({ cart: newCart });
    
    // Log para demonstrar funcionalidade
    console.log('🛒 Produto adicionado ao carrinho:', product);
    console.log('📦 Carrinho atual:', newCart);
}
