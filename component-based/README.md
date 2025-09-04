# 🧩 Arquitetura Baseada em Componentes

Esta implementação demonstra uma arquitetura inspirada no React, usando JavaScript vanilla com funções que atuam como componentes.

## 📋 Como Funciona

### Conceitos Principais

1. **Componentes Funcionais**: Funções que recebem props e retornam elementos DOM
2. **Estado Global**: Store centralizado com padrão subscribe/notify
3. **Reatividade**: UI atualiza automaticamente quando o estado muda
4. **Props**: Dados passados entre componentes

### Fluxo de Dados

```
Service → Store → Components → UI
   ↑         ↑         ↑
   API    setState   render
```

## 🗂️ Estrutura dos Arquivos

### `/src/store/state.js`
- **Responsabilidade**: Gerenciamento de estado global
- **Características**:
  - Armazena estado da aplicação (produtos, loading, erro)
  - Implementa padrão Observer (subscribe/notify)
  - Expõe funções: `getState()`, `setState()`, `subscribe()`

### `/src/services/ProductService.js`
- **Responsabilidade**: Busca de dados (simula API)
- **Características**:
  - Retorna Promise com dados mockados
  - Simula delay de rede
  - Inclui tratamento de erro

### `/src/components/ProductCard.js`
- **Responsabilidade**: Renderiza um produto individual
- **Características**:
  - Função pura que recebe props
  - Retorna elemento DOM
  - Gerencia eventos próprios

### `/src/components/ProductList.js`
- **Responsabilidade**: Renderiza lista de produtos
- **Características**:
  - Gerencia diferentes estados (loading, erro, sucesso)
  - Usa ProductCard para cada item
  - Controla animações

### `/src/app.js`
- **Responsabilidade**: Ponto de entrada e orquestração
- **Características**:
  - Inicializa aplicação
  - Conecta store aos componentes
  - Gerencia ciclo de vida

## 🎯 Características Específicas

### Estado Reativo
```javascript
// Qualquer mudança no estado...
setState({ products: newProducts });

// ...automaticamente atualiza a UI
subscribe((newState) => {
    ProductList.render(newState);
});
```

### Componentes Reutilizáveis
```javascript
// ProductCard pode ser usado em qualquer lugar
const card = ProductCard({ 
    product: productData,
    onAddToCart: handleClick 
});
```

### Props e Callbacks
```javascript
// Dados e funções passados como props
ProductCard({ 
    product: data,           // dados
    onAddToCart: callback    // função
});
```

## 🔧 Ferramentas de Debug

Abra o console do navegador e use:

```javascript
// Estado atual
appDebug.getState()

// Recarregar produtos
appDebug.reloadProducts()

// Definir novo estado
appDebug.setState({ products: [] })
```

## ✨ Vantagens desta Arquitetura

1. **Simplicidade**: Fácil de entender
2. **Reatividade**: UI atualiza automaticamente
3. **Reutilização**: Componentes podem ser reutilizados
4. **Familiar**: Similar ao React
5. **Testável**: Componentes são funções puras

## 🤔 Quando Usar

- Aplicações de pequeno a médio porte
- Equipe familiarizada com React
- Quando precisar de reatividade simples
- Prototipagem rápida
