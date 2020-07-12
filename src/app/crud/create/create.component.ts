import { CrudService } from './../../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  productForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CrudService
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],    
    })
  }

  submitForm() {
  this.crudService.create(this.productForm.value).subscribe(res=>{
    console.log("Product Created");
    this.router.navigateByUrl('/crud/home/');
  })
   }

}


