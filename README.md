# 🛍️ E-commerce MVP - Protótipos Arquiteturais

Este repositório contém três implementações de um MVP (Mínimo Produto Viável) de e-commerce, cada uma demonstrando um padrão arquitetural diferente para fins educacionais.

## 🎯 Objetivo

Demonstrar na prática as diferenças entre três arquiteturas populares de frontend:
1. **Arquitetura Baseada em Componentes** (inspirada no React)
2. **MVC** (Model-View-Controller)
3. **MVVM** (Model-View-ViewModel)

## 🚀 Como Executar

Cada implementação é independente e pode ser executada abrindo o arquivo `index.html` em um navegador moderno que suporte ES6 Modules.

### Opção 1: Arquivo Local
```bash
# Para cada arquitetura, abra diretamente:
component-based/index.html
mvc/index.html
mvvm/index.html
```

### Opção 2: Servidor Local (Recomendado)
```bash
# Usando Python
python -m http.server 8000

# Usando Node.js (http-server)
npx http-server

# Usando VS Code Live Server
# Instale a extensão "Live Server" e clique com botão direito no index.html
```

Depois acesse:
- http://localhost:8000/component-based/
- http://localhost:8000/mvc/
- http://localhost:8000/mvvm/

## 📁 Estrutura do Projeto

```
e-commerce-templates/
├── component-based/           # Arquitetura Baseada em Componentes
├── mvc/                      # Padrão MVC
├── mvvm/                     # Padrão MVVM
├── shared/                   # Arquivos comuns (HTML/CSS)
└── README.md                 # Este arquivo
```

## 🏗️ Arquiteturas Implementadas

### 1. 🧩 Arquitetura Baseada em Componentes

**Localização:** `/component-based/`

**Conceito:** Inspirada no React, utiliza funções que atuam como componentes, recebendo props e retornando elementos DOM.

**Estrutura:**
```
component-based/
├── index.html
├── styles.css
└── src/
    ├── components/
    │   ├── ProductCard.js      # Componente de produto individual
    │   └── ProductList.js      # Lista de produtos
    ├── services/
    │   └── ProductService.js   # Serviço para buscar dados
    ├── store/
    │   └── state.js           # Gerenciamento de estado global
    └── app.js                 # Ponto de entrada
```

**Características:**
- ✅ **Estado Global:** Gerenciado por um store simples com padrão subscribe
- ✅ **Componentes Funcionais:** Funções que retornam elementos DOM
- ✅ **Props:** Dados passados entre componentes
- ✅ **Reatividade:** UI atualiza automaticamente quando estado muda

**Benefícios:**
- Componentes reutilizáveis
- Estado centralizado
- Fácil de entender para quem conhece React
- Fluxo de dados unidirecional

### 2. 🎛️ Arquitetura MVC (Model-View-Controller)

**Localização:** `/mvc/`

**Conceito:** Separa responsabilidades em três camadas distintas: Model (dados), View (apresentação) e Controller (lógica de controle).

**Estrutura:**
```
mvc/
├── index.html
├── styles.css
└── src/
    ├── models/
    │   ├── ProductModel.js     # Modelo de produtos
    │   └── CartModel.js        # Modelo do carrinho
    ├── views/
    │   └── ProductView.js      # View de produtos
    ├── controllers/
    │   └── ProductController.js # Controlador principal
    ├── services/
    │   └── ProductService.js   # Serviço de dados
    └── app.js                 # Configuração MVC
```

**Características:**
- ✅ **Model:** Gerencia dados e implementa padrão Observer
- ✅ **View:** Responsável apenas pela apresentação
- ✅ **Controller:** Coordena Model e View, contém lógica de aplicação
- ✅ **Separação Clara:** Cada camada tem responsabilidade bem definida

**Benefícios:**
- Separação clara de responsabilidades
- Facilita manutenção e testes
- Baixo acoplamento entre camadas
- Padrão bem estabelecido e documentado

### 3. 🎭 Arquitetura MVVM (Model-View-ViewModel)

**Localização:** `/mvvm/`

**Conceito:** Utiliza um ViewModel para mediar comunicação entre View e Model, com data binding para atualização automática da UI.

**Estrutura:**
```
mvvm/
├── index.html
├── styles.css
└── src/
    ├── models/
    │   └── Product.js          # Modelo e classes Observable
    ├── viewmodels/
    │   └── ProductListViewModel.js # ViewModel principal
    ├── views/
    │   └── productListView.js  # View com data binding
    ├── services/
    │   └── ProductService.js   # Serviço de dados
    └── app.js                 # Configuração MVVM
```

**Características:**
- ✅ **Data Binding:** Propriedades observáveis conectam ViewModel à View
- ✅ **ViewModel:** Expõe dados e comandos para a View
- ✅ **Observable Pattern:** Classes Observable/ObservableArray para reatividade
- ✅ **Comandos:** View delega ações para comandos do ViewModel

**Benefícios:**
- Data binding automático
- ViewModel testável sem UI
- Separação entre lógica de apresentação e interface
- Reutilização do ViewModel

## 🧪 Funcionalidades Implementadas

Todas as três arquiteturas implementam as mesmas funcionalidades:

### Core Features
- ✅ **Carregamento de Produtos:** Simulação de API com loading state
- ✅ **Exibição de Produtos:** Grid responsivo com cards
- ✅ **Adicionar ao Carrinho:** Botão funcional com feedback visual
- ✅ **Tratamento de Erros:** Estados de erro com retry
- ✅ **Loading States:** Indicadores visuais de carregamento

### Estados da UI
- 🔄 **Loading:** Spinner durante carregamento
- ✅ **Sucesso:** Grid de produtos com animações
- ❌ **Erro:** Mensagem de erro com opção de retry
- 📦 **Vazio:** Estado quando não há produtos

### Debug Tools
Cada implementação expõe ferramentas de debug no console:

```javascript
// Component-Based
window.appDebug.getState()
window.appDebug.reloadProducts()

// MVC
window.mvcDebug.getCartData()
window.mvcDebug.getProductStats()

// MVVM
window.mvvmDebug.getSnapshot()
window.mvvmDebug.addRandomProduct()
```

## 🎨 Design e UX

### Interface Consistente
- **Design Moderno:** Gradientes, sombras e animações suaves
- **Responsive:** Funciona em desktop e mobile
- **Acessibilidade:** Cores contrastantes e navegação por teclado
- **Feedback Visual:** Animações de loading e transições

### Tecnologias Utilizadas
- **HTML5:** Estrutura semântica
- **CSS3:** Grid, Flexbox, animações e responsividade
- **JavaScript ES6+:** Modules, async/await, destructuring
- **Vanilla JS:** Sem frameworks externos

## 📚 Conceitos Demonstrados

### Padrões de Design
- **Observer Pattern:** Notificação de mudanças
- **Command Pattern:** Encapsulamento de ações (MVVM)
- **Module Pattern:** Organização de código em módulos

### Arquiteturas
- **Component-Based:** Composição e reutilização
- **MVC:** Separação de responsabilidades
- **MVVM:** Data binding e testabilidade

### Boas Práticas
- **Separation of Concerns:** Cada arquivo tem responsabilidade específica
- **Error Handling:** Tratamento adequado de erros
- **Performance:** Debounce, lazy loading de imagens
- **Security:** Sanitização de HTML (prevenção XSS)

## 🔍 Comparação das Arquiteturas

| Aspecto | Component-Based | MVC | MVVM |
|---------|----------------|-----|------|
| **Complexidade** | Média | Alta | Alta |
| **Curva de Aprendizado** | Baixa | Média | Média |
| **Testabilidade** | Boa | Excelente | Excelente |
| **Reutilização** | Excelente | Boa | Boa |
| **Data Binding** | Manual | Manual | Automático |
| **Separação de Concerns** | Boa | Excelente | Excelente |
| **Manutenibilidade** | Boa | Excelente | Excelente |

## 🎓 Para Estudantes

### Exercícios Sugeridos

1. **Compare Performance:** Meça tempo de renderização em cada arquitetura
2. **Adicione Features:** Implemente busca de produtos em cada versão
3. **Teste Unitário:** Escreva testes para cada camada
4. **Refatoração:** Melhore algum aspecto mantendo a arquitetura
5. **Responsividade:** Teste em diferentes dispositivos

### Questões para Reflexão

1. Qual arquitetura é mais fácil de entender?
2. Em qual seria mais fácil adicionar novos recursos?
3. Qual tem melhor separação de responsabilidades?
4. Onde cada padrão seria mais apropriado?

## 🤝 Contribuindo

Contribuições são bem-vindas! Algumas ideias:
- Melhorias na documentação
- Novos exemplos ou features
- Otimizações de performance
- Correções de bugs
- Testes automatizados

## 📄 Licença

Este projeto é licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

Criado para fins educacionais, demonstrando diferentes padrões arquiteturais em JavaScript vanilla.

---

**💡 Dica:** Comece pelo component-based se for iniciante, depois explore MVC e MVVM para entender as diferenças!