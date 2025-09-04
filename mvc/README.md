# 🎛️ Arquitetura MVC (Model-View-Controller)

Esta implementação demonstra o padrão MVC clássico, separando claramente as responsabilidades entre Model, View e Controller.

## 📋 Como Funciona

### Conceitos Principais

1. **Model**: Gerencia dados e lógica de negócio
2. **View**: Responsável pela apresentação
3. **Controller**: Coordena Model e View
4. **Observer Pattern**: Model notifica mudanças

### Fluxo de Dados

```
User Interaction → Controller → Model → Observer → View
                     ↑                              ↓
                     ←──────── User Interface ←─────
```

## 🗂️ Estrutura dos Arquivos

### `/src/models/ProductModel.js`
- **Responsabilidade**: Gerenciar dados de produtos
- **Características**:
  - Armazena lista de produtos
  - Implementa Observer Pattern
  - Notifica Views sobre mudanças
  - Contém lógica de validação

### `/src/models/CartModel.js`
- **Responsabilidade**: Gerenciar carrinho de compras
- **Características**:
  - Armazena itens do carrinho
  - Calcula totais
  - Notifica mudanças

### `/src/views/ProductView.js`
- **Responsabilidade**: Renderizar interface de produtos
- **Características**:
  - Apenas lógica de apresentação
  - Captura eventos do usuário
  - Delega ações para Controller
  - Observa mudanças no Model

### `/src/controllers/ProductController.js`
- **Responsabilidade**: Coordenar Model e View
- **Características**:
  - Recebe eventos da View
  - Atualiza Model
  - Contém lógica de aplicação
  - Gerencia fluxo de dados

### `/src/app.js`
- **Responsabilidade**: Configurar arquitetura MVC
- **Características**:
  - Instancia Models, Views e Controllers
  - Conecta componentes
  - Inicializa aplicação

## 🎯 Características Específicas

### Separação de Responsabilidades
```javascript
// Model: apenas dados e lógica de negócio
productModel.setProducts(products);

// View: apenas apresentação
productView.render(modelData);

// Controller: coordenação
controller.loadProducts();
```

### Observer Pattern
```javascript
// Model notifica View automaticamente
productModel.addObserver((data) => {
    productView.render(data);
});
```

### Baixo Acoplamento
```javascript
// View não conhece Model diretamente
// Controller é o intermediário
controller.addToCart(product);
```

## 🔧 Ferramentas de Debug

Abra o console do navegador e use:

```javascript
// Dados do carrinho
mvcDebug.getCartData()

// Estatísticas dos produtos
mvcDebug.getProductStats()

// Recarregar produtos
mvcDebug.reloadProducts()

// Limpar carrinho
mvcDebug.clearCart()
```

## ✨ Vantagens desta Arquitetura

1. **Separação Clara**: Cada camada tem responsabilidade específica
2. **Manutenibilidade**: Fácil de modificar cada parte
3. **Testabilidade**: Cada componente pode ser testado isoladamente
4. **Escalabilidade**: Funciona bem em aplicações grandes
5. **Padrão Estabelecido**: Bem documentado e conhecido

## 🤔 Quando Usar

- Aplicações grandes e complexas
- Equipes grandes (especialização por camada)
- Quando testabilidade é crucial
- Projetos de longo prazo
- Quando a separação de concerns é prioritária

## 📚 Detalhes das Camadas

### Model
- Gerencia estado da aplicação
- Implementa lógica de negócio
- Persiste dados (se necessário)
- Notifica observadores sobre mudanças

### View
- Renderiza interface do usuário
- Captura eventos de interação
- Não contém lógica de negócio
- Delega ações para Controller

### Controller
- Recebe input do usuário via View
- Atualiza Model conforme necessário
- Coordena fluxo entre Model e View
- Contém lógica de aplicação
