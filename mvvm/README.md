# 🎭 Arquitetura MVVM (Model-View-ViewModel)

Esta implementação demonstra o padrão MVVM com data binding simulado, onde o ViewModel medeia a comunicação entre Model e View.

## 📋 Como Funciona

### Conceitos Principais

1. **Model**: Dados e lógica de negócio
2. **View**: Interface do usuário
3. **ViewModel**: Mediador com propriedades observáveis
4. **Data Binding**: Conexão automática entre ViewModel e View

### Fluxo de Dados

```
View ←→ Data Binding ←→ ViewModel ←→ Model
  ↑                        ↑
Commands              Observable Properties
```

## 🗂️ Estrutura dos Arquivos

### `/src/models/Product.js`
- **Responsabilidade**: Model de produtos e classes Observable
- **Características**:
  - Classe Product para representar dados
  - Observable: implementa padrão Observer
  - ObservableArray: array reativo
  - Apenas lógica de dados

### `/src/viewmodels/ProductListViewModel.js`
- **Responsabilidade**: Mediador entre Model e View
- **Características**:
  - Propriedades observáveis
  - Comandos que a View pode executar
  - Lógica de apresentação
  - Não conhece detalhes da View

### `/src/views/productListView.js`
- **Responsabilidade**: Interface do usuário
- **Características**:
  - Se conecta ao ViewModel via data binding
  - Atualiza automaticamente quando propriedades mudam
  - Executa comandos do ViewModel
  - Não contém lógica de negócio

### `/src/app.js`
- **Responsabilidade**: Configurar arquitetura MVVM
- **Características**:
  - Cria ViewModel
  - Conecta View ao ViewModel
  - Inicializa data binding

## 🎯 Características Específicas

### Data Binding Automático
```javascript
// Mudança no ViewModel...
viewModel.isLoading.value = true;

// ...automaticamente atualiza a View
viewModel.isLoading.subscribe(isLoading => {
    view.updateLoadingState(isLoading);
});
```

### Propriedades Observáveis
```javascript
// ViewModel expõe propriedades reativas
this.products = new ObservableArray([]);
this.isLoading = new Observable(false);
this.errorMessage = new Observable(null);
```

### Comandos
```javascript
// View executa comandos do ViewModel
this.commands = {
    loadProducts: () => this.loadProducts(),
    addToCart: (product) => this.addToCart(product)
};
```

### Propriedades Computadas
```javascript
// Propriedades derivadas de outras
this.products.subscribe(products => {
    this.hasProducts.value = products.length > 0;
});
```

## 🔧 Ferramentas de Debug

Abra o console do navegador e use:

```javascript
// Estado completo do ViewModel
mvvmDebug.getSnapshot()

// Resumo do carrinho
mvvmDebug.getCartSummary()

// Adicionar produto teste
mvvmDebug.addRandomProduct()

// Estatísticas
mvvmDebug.getStats()

// Demonstrar data binding
mvvmDebug.app.demonstrateDataBinding()
```

## ✨ Vantagens desta Arquitetura

1. **Data Binding**: Atualizações automáticas da UI
2. **Testabilidade**: ViewModel pode ser testado sem UI
3. **Separação**: Lógica de apresentação isolada
4. **Reatividade**: Interface responde automaticamente a mudanças
5. **Reutilização**: ViewModel pode ser usado em diferentes Views

## 🤔 Quando Usar

- Aplicações com muita interatividade
- Quando data binding é importante
- Interfaces que mudam frequentemente
- Quando testabilidade do ViewModel é crucial
- Aplicações com lógica de apresentação complexa

## 📚 Detalhes das Camadas

### Model
- Classes simples para representar dados
- Observable/ObservableArray para reatividade
- Sem conhecimento de apresentação
- Focado apenas nos dados

### ViewModel
- Propriedades observáveis para data binding
- Comandos para ações da View
- Lógica de apresentação
- Coordena com Models
- Testável independentemente da UI

### View
- Se conecta ao ViewModel via data binding
- Executa comandos do ViewModel
- Atualiza automaticamente
- Não contém lógica de negócio

## 🔗 Data Binding Implementation

### Observable Pattern
```javascript
class Observable {
    constructor(value) {
        this._value = value;
        this._observers = [];
    }
    
    get value() { return this._value; }
    
    set value(newValue) {
        this._value = newValue;
        this._notifyObservers(newValue);
    }
    
    subscribe(observer) {
        this._observers.push(observer);
        observer(this._value); // immediate call
    }
}
```

### View Connection
```javascript
// View se conecta automaticamente
viewModel.products.subscribe(products => {
    this.updateProductsList(products);
});

viewModel.isLoading.subscribe(isLoading => {
    this.updateLoadingState(isLoading);
});
```
