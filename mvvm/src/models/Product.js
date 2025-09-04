// FILE: /mvvm/src/models/Product.js
/**
 * PRODUCT MODEL - PADRÃO MVVM
 * 
 * O Model no MVVM é mais simples, focando apenas nos dados
 * e lógica de negócio, sem se preocupar com apresentação.
 * O ViewModel será responsável por adaptar esses dados para a View.
 */

/**
 * Classe que representa um produto individual
 */
export class Product {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.price = data.price;
        this.image = data.image;
        this.description = data.description;
        this.createdAt = new Date();
    }
    
    /**
     * Retorna uma representação JSON do produto
     * @returns {Object} Dados do produto
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            image: this.image,
            description: this.description,
            createdAt: this.createdAt
        };
    }
    
    /**
     * Formata o preço para exibição
     * @returns {string} Preço formatado
     */
    getFormattedPrice() {
        return `R$ ${this.price.toFixed(2).replace('.', ',')}`;
    }
    
    /**
     * Verifica se o produto é válido
     * @returns {boolean} True se válido
     */
    isValid() {
        return this.id && 
               this.name && 
               typeof this.price === 'number' && 
               this.price > 0;
    }
    
    /**
     * Cria uma cópia do produto
     * @returns {Product} Nova instância do produto
     */
    clone() {
        return new Product(this.toJSON());
    }
    
    /**
     * Compara com outro produto
     * @param {Product} otherProduct - Produto para comparar
     * @returns {boolean} True se são iguais
     */
    equals(otherProduct) {
        return otherProduct && this.id === otherProduct.id;
    }
}

/**
 * Classe Observable que implementa o padrão Observer
 * para data binding no MVVM
 */
export class Observable {
    constructor(initialValue = null) {
        this._value = initialValue;
        this._observers = [];
    }
    
    /**
     * Obtém o valor atual
     * @returns {*} Valor atual
     */
    get value() {
        return this._value;
    }
    
    /**
     * Define um novo valor e notifica observadores
     * @param {*} newValue - Novo valor
     */
    set value(newValue) {
        const oldValue = this._value;
        this._value = newValue;
        
        // Notifica observadores apenas se o valor mudou
        if (oldValue !== newValue) {
            this._notifyObservers(newValue, oldValue);
        }
    }
    
    /**
     * Adiciona um observador
     * @param {Function} observer - Função que será chamada quando o valor mudar
     * @returns {Function} Função para remover o observador
     */
    subscribe(observer) {
        this._observers.push(observer);
        
        // Chama imediatamente com o valor atual
        observer(this._value);
        
        // Retorna função para unsubscribe
        return () => {
            const index = this._observers.indexOf(observer);
            if (index > -1) {
                this._observers.splice(index, 1);
            }
        };
    }
    
    /**
     * Remove um observador
     * @param {Function} observer - Observador a ser removido
     */
    unsubscribe(observer) {
        const index = this._observers.indexOf(observer);
        if (index > -1) {
            this._observers.splice(index, 1);
        }
    }
    
    /**
     * Notifica todos os observadores
     * @param {*} newValue - Novo valor
     * @param {*} oldValue - Valor anterior
     */
    _notifyObservers(newValue, oldValue) {
        this._observers.forEach(observer => {
            try {
                observer(newValue, oldValue);
            } catch (error) {
                console.error('❌ Erro ao notificar observer:', error);
            }
        });
    }
    
    /**
     * Transforma o valor usando uma função
     * @param {Function} transformFn - Função de transformação
     * @returns {Observable} Novo Observable com valor transformado
     */
    map(transformFn) {
        const mappedObservable = new Observable();
        
        this.subscribe(value => {
            mappedObservable.value = transformFn(value);
        });
        
        return mappedObservable;
    }
    
    /**
     * Filtra valores baseado em uma condição
     * @param {Function} predicateFn - Função que retorna boolean
     * @returns {Observable} Novo Observable com valores filtrados
     */
    filter(predicateFn) {
        const filteredObservable = new Observable();
        
        this.subscribe(value => {
            if (predicateFn(value)) {
                filteredObservable.value = value;
            }
        });
        
        return filteredObservable;
    }
}

/**
 * Classe para coleções observáveis (arrays)
 */
export class ObservableArray extends Observable {
    constructor(initialArray = []) {
        super([...initialArray]);
    }
    
    /**
     * Adiciona um item ao array
     * @param {*} item - Item a ser adicionado
     */
    push(item) {
        const newArray = [...this._value, item];
        this.value = newArray;
    }
    
    /**
     * Remove um item do array
     * @param {*} item - Item a ser removido
     */
    remove(item) {
        const newArray = this._value.filter(i => i !== item);
        this.value = newArray;
    }
    
    /**
     * Remove item por índice
     * @param {number} index - Índice do item
     */
    removeAt(index) {
        if (index >= 0 && index < this._value.length) {
            const newArray = [...this._value];
            newArray.splice(index, 1);
            this.value = newArray;
        }
    }
    
    /**
     * Limpa o array
     */
    clear() {
        this.value = [];
    }
    
    /**
     * Encontra um item no array
     * @param {Function} predicateFn - Função de busca
     * @returns {*} Item encontrado ou undefined
     */
    find(predicateFn) {
        return this._value.find(predicateFn);
    }
    
    /**
     * Filtra o array
     * @param {Function} predicateFn - Função de filtro
     * @returns {Array} Array filtrado
     */
    filter(predicateFn) {
        return this._value.filter(predicateFn);
    }
    
    /**
     * Mapeia o array
     * @param {Function} mapFn - Função de mapeamento
     * @returns {Array} Array mapeado
     */
    map(mapFn) {
        return this._value.map(mapFn);
    }
    
    /**
     * Retorna o tamanho do array
     * @returns {number} Tamanho do array
     */
    get length() {
        return this._value.length;
    }
    
    /**
     * Verifica se o array está vazio
     * @returns {boolean} True se vazio
     */
    get isEmpty() {
        return this._value.length === 0;
    }
}
