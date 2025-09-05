// /ecommerce-mvc-spa/src/app.js

/**
 * Ponto de entrada da aplicação.
 * Instancia e conecta todas as partes do MVC (Model, View, Controller),
 * o Service e o Router.
 */

import { ProductService } from './services/ProductService.js';
import { ProductModel } from './models/ProductModel.js';
import { CartModel } from './models/CartModel.js';
import { AppView } from './views/AppView.js';
import { ProductListView } from './views/ProductListView.js';
import { ProductDetailView } from './views/ProductDetailView.js';
import { AppController } from './controllers/AppController.js';
import { Router } from './Router.js';

// 1. Instancia o serviço
const productService = ProductService; // Usando métodos estáticos

// 2. Instancia os Models
const productModel = new ProductModel(productService);
const cartModel = new CartModel();

// 3. Instancia as Views
const appView = new AppView('app');
const productListView = new ProductListView();
const productDetailView = new ProductDetailView();

// 4. Instancia o Controller, injetando as dependências em grupos
const appController = new AppController(
    { productModel, cartModel },
    { appView, productListView, productDetailView }
);

// 5. Inicializa o Controller
appController.init();

// 6. Instancia e inicia o Router
const router = new Router(appController);
router.listen();
