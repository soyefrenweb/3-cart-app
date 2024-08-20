import { Component, OnInit } from '@angular/core';

// Services
import { ProductService } from '../services/product.service';

// Components
import { CatalogComponent } from "./catalog/catalog.component";

// Clasess
import { Product } from '../models/product';
import { CartItem } from '../models/cartItem';
import { CartComponent } from './cart/cart.component';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [
    CatalogComponent,
    CartComponent
],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  // Productos que muestra el catalogo.
  products: Product[] = [];

  // Items del carro de compra que vamos agregando a partir del catalogo de compra.
  items: CartItem[] = [];

  constructor(private service: ProductService){

  }

  ngOnInit(): void {
    this.products = this.service.findAll();
  }

  onAddCart(product: Product) {
    // Se compara el item id al de cada iteracion y si es identico de vuelve el mismo item y si es false es undefinide..
    const hasItem = this.items.find( item =>  item.product.id === product.id);
   if(hasItem){
    // colocamos en los items el valor del mapa. El cual devuelve una nueva instancia de los items pero modificado en este caso con el mismo items pero con una cantidad mas.
    this.items = this.items.map(item => {
      if(item.product.id === product.id){
        return{
          // Este seria el mismo item pero con una cantidad mas.
          ... item,
          quantity: item.quantity + 1
        }
      } 
      return item;
    });
   }
  //  Si no  existe se crea un nuevo producto en el carro de compras.
   else{ 
     // Esto seria un elemento del item del item, osea del CartItem.
     this.items = [... this.items, {product: {... product}, quantity: 1}];
   }
  }

}
