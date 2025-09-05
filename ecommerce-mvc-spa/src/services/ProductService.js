// /ecommerce-mvc-spa/src/services/ProductService.js

/**
 * ProductService
 * Simula uma chamada de API para buscar dados de produtos.
 * Retorna uma Promise com uma lista de produtos mockados.
 */
export class ProductService {
    static getProducts() {
        const products = [
            {
                id: 1,
                name: 'Notebook Pro',
                price: 4999.99,
                imageUrl: 'https://via.placeholder.com/300x200.png?text=Notebook+Pro',
                description: 'Um notebook potente para todas as suas necessidades de trabalho e lazer.'
            },
            {
                id: 2,
                name: 'Smartphone X',
                price: 2499.50,
                imageUrl: 'https://via.placeholder.com/300x200.png?text=Smartphone+X',
                description: 'O smartphone mais recente com câmera de alta resolução e bateria de longa duração.'
            },
            {
                id: 3,
                name: 'Fone de Ouvido BT',
                price: 399.00,
                imageUrl: 'https://via.placeholder.com/300x200.png?text=Fone+BT',
                description: 'Fones de ouvido sem fio com cancelamento de ruído e qualidade de som superior.'
            },
            {
                id: 4,
                name: 'Smartwatch 2',
                price: 1299.00,
                imageUrl: 'https://via.placeholder.com/300x200.png?text=Smartwatch+2',
                description: 'Monitore sua saúde e fique conectado com o novo Smartwatch 2.'
            },
            {
                id: 5,
                name: 'Tablet 10"',
                price: 1799.00,
                imageUrl: 'https://via.placeholder.com/300x200.png?text=Tablet+10',
                description: 'Ideal para leitura, jogos e produtividade em qualquer lugar.'
            }
        ];

        // Simula a latência da rede
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(products);
            }, 500);
        });
    }
}
