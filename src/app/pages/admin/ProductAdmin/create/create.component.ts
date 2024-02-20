import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { ProductService } from '../../../../service/products.service';
import { CategoryService } from '../../../../service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf, ToastModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [MessageService],
})
export class CreateComponent {
  userForm: FormGroup;
  categories: any = [];
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.categoryService.getCategory().subscribe((data: any) => {
      this.categories = data.data;
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      this.productService.addProduct(formData).subscribe((data: any) => {
        if (data.status === 0) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Add Success',
          });
          this.userForm.reset();
          setTimeout(() => {
            this.router.navigate(['/admin/products']);
          }, 1000);
        }
      });
    }
  }
}
