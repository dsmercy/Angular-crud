import { CrudService } from './../../services/crud.service';
import { Product } from './../../Models/product';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  submitted = false;
  products: Observable<Product[]>;

  model = new Product(null, null, null, null, null);

  constructor(public crudService: CrudService) { }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.products = this.crudService.getAll();
  }

  onSubmit() {
    this.submitted = true;
    if (this.model.id != null) {
      this.crudService.update(this.model.id, this.model)
        .subscribe((data) => {
          this.model = new Product(null, null, null, null, null);
          this.loadEmployees();
        });
    }else{
      this.crudService.create(this.model)
      .subscribe((data) => {
        this.loadEmployees();
        this.model = new Product(null, null, null, null, null);
      });
    }    
  }
  onUpdate(id) {
    this.crudService.getById(id)
      .subscribe((data) => {
        this.model = data;       
      });


  }
  onRemove(id) {
    this.crudService.delete(id)
      .subscribe((data) => {
        this.loadEmployees();
      });
  }
  newHero(){
    this.model = new Product(null, null, null, null, null);
  }

}


