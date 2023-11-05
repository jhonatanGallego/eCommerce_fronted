import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  constructor(public productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ -']+"),
      ]),
      categoria: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),
      precio: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.productService.create(this.form.value).subscribe((res) => {
      console.log('Producto creado exitosamente!');
      this.router.navigateByUrl('product/index');
    });
  }
}
