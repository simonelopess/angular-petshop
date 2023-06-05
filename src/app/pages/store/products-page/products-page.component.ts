import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
})
export class ProductsPageComponent implements OnInit {
  public products$: Observable<any[]> | undefined; //notação para funções assíncronas
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.products$ = this.data.getProducts();
  }
}
