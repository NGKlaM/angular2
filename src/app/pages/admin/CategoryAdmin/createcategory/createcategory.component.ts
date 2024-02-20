import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../../../service/category.service';
import { MessageService } from 'primeng/api';
import { NgFor, NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf, ToastModule],
  templateUrl: './createcategory.component.html',
  styleUrl: './createcategory.component.css',
  providers: [MessageService],
})
export class CreateCategoryComponent {
  userForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.categoryService.addCategory(formData).subscribe((data: any) => {
        if (data.status === 0) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Add Category Success!',
          });
          this.userForm.reset();
        }
      });
    }
  }
}
