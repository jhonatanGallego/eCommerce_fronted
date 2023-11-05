import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../product';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id: number;
  product: Product;
  form: FormGroup;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.find(this.id).subscribe((data: Product) => {
      this.product = data;
    });

    this.form = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ -']+"),
      ]),
      descripcion: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
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
    this.productService.update(this.id, this.form.value).subscribe((res) => {
      console.log('Person updated successfully!');
      this.router.navigateByUrl('product/index');
    });
  }
}
