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
import { AuthService } from '../../../../service/auth.service';
@Component({
  selector: 'app-list-user',
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
  templateUrl: './listuser.component.html',
  styleUrl: './listuser.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ListUserComponent {
  userForm: FormGroup;
  userList: any[] = [];
  first1: number = 0;
  count: number = 0;
  rows1: number = 4;
  searchTerm: string = '';
  previousSearchTerm: string = '';
  checkData: boolean = false;
  constructor(
    private userService: AuthService,
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
    this.userService
      .getPagiUser({ page: event.first, size: 4 })
      .subscribe((category: any) => {
        return (this.userList = category.data);
      });
  }
  addCategory() {
    return this.router.navigate(['/admin/user/create']);
  }
  getAll(check?: any) {
    this.userService
      .getPagiUser({ page: check ? check : this.first1, size: 4 })
      .subscribe((data: any) => {
        console.log(data);
        this.count = data.count;
        return (this.userList = data.data);
      });
  }

  ngOnInit(): void {
    this.getAll();
  }
  deleteCategory(id: string) {
    this.confirmationService.confirm({
      accept: () => {
        return this.userService.deleteUser(id).subscribe((data: any) => {
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

  ngDoCheck() {
    if (this.searchTerm !== this.previousSearchTerm) {
      const search = this.route.snapshot.params['search'];
      if (search) {
        this.userService
          .getSearchUser({
            search: search,
            page: this.first1,
            size: 4,
          })
          .subscribe((data) => {
            if (data.status === 1) {
              this.router.navigate(['/admin/user/userlist']);
              return this.messageService.add({
                severity: 'warn',
                detail: `Không có dữ liệu với từ khóa : ${search}`,
              });
            }
            this.count = data.count;
            this.checkData = true;
            return (this.userList = data.data);
          });
      }
    }
  }
  onSubmit() {
    this.router.navigate([
      '/admin/user/userlist',
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
    this.router.navigate(['/admin/user/userlist']);
  }
}
