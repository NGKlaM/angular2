import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from '../../../../service/category.service';
import { NgFor, NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { PaginatorModule } from 'primeng/paginator';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-listcategory',
  standalone: true,
  imports: [
    NgFor,
    ToastModule,
    ConfirmDialogModule,
    RouterLink,
    PaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './listcategory.component.html',
  styleUrl: './listcategory.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ListcategoryComponent {
  userForm: FormGroup;
  categoryList: any[] = [];
  first1: number = 0;
  count: number = 0;
  rows1: number = 4;
  searchTerm: string = '';
  previousSearchTerm: string = '';
  checkData: boolean = false;
  constructor(
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.formBuilder.group({
      search: [''],
    });
  }
  onPageChange1(event: any) {
    this.first1 = event.first;
    this.rows1 = event.rows;
    this.categoryService
      .getPagiCategory({ page: event.first, size: 4 })
      .subscribe((category: any) => {
        return (this.categoryList = category.data);
      });
  }
  addCategory() {
    return this.router.navigate(['/admin/category/create']);
  }
  getAll(check?: any) {
    this.categoryService
      .getPagiCategory({ page: check ? check : this.first1, size: 4 })
      .subscribe((category: any) => {
        this.count = category.count;
        return (this.categoryList = category.data);
      });
  }

  ngOnInit(): void {
    this.getAll();
  }
  deleteCategory(id: string) {
    this.confirmationService.confirm({
      accept: () => {
        return this.categoryService
          .deleteCategory(id)
          .subscribe((data: any) => {
            if (data.status === 0) {
              this.messageService.add({
                severity: 'success',

                detail: 'Delete Success',
              });
              if (data.count % this.rows1 === 0) {
                this.getAll(this.first1 - 1);
              } else {
                this.getAll();
              }
            }
          });
      },
    });
  }
  updateCategory(id: string) {
    return this.router.navigate([`/admin/category/${id}`]);
  }
  hanFilter(id: string) {
    return this.router.navigate([`/admin/category/list?id=${id}`]);
  }

  ngDoCheck() {
    if (this.searchTerm !== this.previousSearchTerm) {
      const search = this.route.snapshot.params['search'];
      if (search) {
        this.categoryService
          .getSearchCategory({
            search: search,
            page: this.first1,
            size: 4,
          })
          .subscribe((data) => {
            if (data.status === 1) {
              this.router.navigate(['/admin/category/list']);
              return this.messageService.add({
                severity: 'warn',

                detail: `Không có dữ liệu với từ khóa : ${search}`,
              });
            }
            this.count = data.count;
            this.checkData = true;
            return (this.categoryList = data.data);
          });
      }
    }
  }
  onSubmit() {
    this.router.navigate([
      '/admin/category/list',
      { search: this.userForm.value.search },
    ]);
    this.searchTerm = this.userForm.value.search;
    this.userForm.reset();
    setTimeout(() => {
      this.searchTerm = '';
    });
  }
  comeBack() {
    this.checkData = false;
    this.getAll();
    this.router.navigate(['/admin/category/list']);
  }
}
