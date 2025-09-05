# e-commerce-templates

PERSONA:

Você é um Arquiteto de Software Sênior e um instrutor de programação experiente. Sua especialidade é projetar aplicações web robustas e ensinar padrões de arquitetura de forma clara e prática. Sua missão é criar um projeto exemplar para estudantes de Ciência da Computação.

CONTEXTO:

O projeto é um MVP (Mínimo Produto Viável) de um e--commerce. Ele será usado como material de estudo em um seminário sobre desenvolvimento ágil. Os requisitos são estritos: o projeto deve ser uma SPA (Single-Page Application), implementada com o padrão de arquitetura MVC (Model-View-Controller), utilizando exclusivamente HTML5, CSS3 e JavaScript puro (ES6 Modules). Nenhum framework ou biblioteca externa (como React, jQuery, etc.) é permitido.

TAREFA PRINCIPAL:

Gere o código-fonte completo e funcional para o MVP do e-commerce, seguindo rigorosamente a arquitetura MVC dentro de um ambiente SPA.

REQUISITOS FUNCIONAIS DETALHADOS:

Aplicação de Página Única (SPA): A aplicação deve carregar um único arquivo index.html. Toda a navegação e mudança de conteúdo devem ser manipuladas por JavaScript, sem recarregamentos de página.

Roteamento por Hash: A navegação entre as diferentes "telas" (listagem e detalhes) deve ser controlada pela hash da URL.

A URL raiz (index.html ou index.html#) deve exibir a lista de produtos.

A URL para detalhes de um produto deve seguir o formato index.html#products/ID_DO_PRODUTO (ex: #products/1).

Tela de Listagem de Produtos:

Ao carregar, a aplicação deve buscar e exibir uma lista de produtos.

Cada item na lista deve mostrar uma imagem, nome e preço.

Cada item deve ter um link (na imagem ou no nome) que altera a URL para a sua respectiva tela de detalhes.

Cada item deve ter um botão "Adicionar ao Carrinho".

Tela de Detalhes do Produto:

Ao navegar para uma URL de detalhes, a tela deve ser limpa e as informações completas do produto selecionado devem ser exibidas (imagem, nome, preço e uma descrição).

Esta tela também deve ter um botão "Adicionar ao Carrinho".

Deve haver um link ou botão para "Voltar" à lista de produtos (alterando a hash da URL de volta para #).

Funcionalidade do Carrinho:

O estado do carrinho de compras deve ser persistente durante toda a sessão do usuário (sem recarregar a página).

Ao clicar em qualquer botão "Adicionar ao Carrinho", o produto correspondente deve ser adicionado ao CartModel.

Após cada adição, o estado atualizado do array de itens do carrinho deve ser impresso no console do navegador (console.log).

REQUISITOS DE ARQUITETURA (MVC-SPA):

Model:

ProductModel.js: Responsável por gerenciar os dados dos produtos. Deve ter métodos como findAll() para buscar todos os produtos (usando o ProductService) e findById(id) para encontrar um produto específico.

CartModel.js: Responsável por gerenciar o estado do carrinho. Deve ter um método add(product) e getItems().

Regra crucial: Os models não podem ter NENHUM conhecimento sobre o DOM ou a View.

View:

AppView.js: Uma única classe para controlar toda a manipulação do DOM. Deve ter métodos distintos para renderizar cada tela, como renderProductList(products) e renderProductDetail(product).

Deve possuir métodos para "ligar" os eventos do usuário (como cliques) aos handlers (funções) fornecidos pelo Controller (ex: bindAddToCartEvent(handler)).

Controller:

AppController.js: O orquestrador central da aplicação.

Ele inicializa os Models e a View.

Contém a lógica de tratamento das rotas: decide qual método chamar com base na hash da URL.

Contém os handlers para as ações do usuário (ex: handleAddToCart(productId)). Ele recebe a ação da View, interage com o Model apropriado e, se necessário, instrui a View a se atualizar.

Módulos Auxiliares:

ProductService.js: Deve simular uma chamada de API, retornando uma Promise com uma lista de objetos de produto mockados. Cada produto deve ter id, name, price, imageUrl, e description.

Router.js: Um módulo simples que escuta o evento window.onhashchange e o evento DOMContentLoaded. Ele analisa a URL e invoca a função apropriada no Controller para lidar com a rota.

ESTRUTURA DE ARQUIVOS (Obrigatória):

/ecommerce-mvc-spa
|-- index.html
|-- styles.css
|-- /src
    |-- /models
    |   |-- ProductModel.js
    |   |-- CartModel.js
    |-- /views
    |   |-- AppView.js
    |-- /controllers
    |   |-- AppController.js
    |-- /services
    |   |-- ProductService.js
    |-- Router.js
    |-- app.js  (Ponto de entrada que instancia e conecta as partes do MVC)
FORMATO DA SAÍDA:

Forneça uma resposta única e completa. Para cada arquivo, inclua o caminho completo em um comentário no topo e o bloco de código correspondente. O código deve ser limpo, moderno (ES6+) e bem comentado para explicar as responsabilidades de cada parte da arquitetura. Comece com o index.html e o styles.css.