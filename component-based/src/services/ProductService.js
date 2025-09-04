// FILE: /component-based/src/services/ProductService.js
/**
 * SERVIÇO DE PRODUTOS
 * 
 * Simula uma API para buscar produtos.
 * Na vida real, faria requisições HTTP para um backend.
 */

// Dados mockados que simulam resposta de uma API
const MOCK_PRODUCTS = [
    {
        id: 1,
        name: 'Smartphone Galaxy Pro',
        price: 1299.99,
        image: '📱',
        description: 'Smartphone premium com câmera profissional'
    },
    {
        id: 2,
        name: 'Notebook Ultra Slim',
        price: 2599.00,
        image: '💻',
        description: 'Notebook leve e poderoso para trabalho'
    },
    {
        id: 3,
        name: 'Fone Bluetooth Premium',
        price: 299.99,
        image: '🎧',
        description: 'Fone com cancelamento de ruído ativo'
    },
    {
        id: 4,
        name: 'Smart TV 4K 55"',
        price: 1899.90,
        image: '📺',
        description: 'Smart TV com resolução 4K e HDR'
    },
    {
        id: 5,
        name: 'Console de Jogos',
        price: 2299.00,
        image: '🎮',
        description: 'Console de última geração para gamers'
    },
    {
        id: 6,
        name: 'Câmera Digital Pro',
        price: 3499.99,
        image: '📷',
        description: 'Câmera profissional para fotógrafos'
    }
];

/**
 * Simula uma chamada de API para buscar produtos
 * @returns {Promise<Array>} Promise que resolve com a lista de produtos
 */
export async function getProducts() {
    // Simula delay de rede (1-2 segundos)
    const delay = Math.random() * 1000 + 1000;
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simula 5% de chance de erro para demonstrar tratamento
            if (Math.random() < 0.05) {
                reject(new Error('Falha na conexão com o servidor'));
                return;
            }
            
            // Simula resposta bem-sucedida
            resolve([...MOCK_PRODUCTS]);
        }, delay);
    });
}

/**
 * Busca um produto específico por ID
 * @param {number} id - ID do produto
 * @returns {Promise<Object|null>} Promise que resolve com o produto ou null
 */
export async function getProductById(id) {
    const products = await getProducts();
    return products.find(product => product.id === id) || null;
}
