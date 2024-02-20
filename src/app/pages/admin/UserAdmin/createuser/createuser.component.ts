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
import { AuthService } from '../../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf, ToastModule],
  templateUrl: './createuser.component.html',
  styleUrl: './createuser.component.css',
  providers: [MessageService],
})
export class CreateUserComponent {
  userForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      if (formData.password === formData.confirmpassword) {
        this.authService
          .SignUp({
            email: formData.email,
            password: formData.password,
            username: formData.username,
          })
          .subscribe((data: any) => {
            if (data.status === 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Message Content',
              });

              this.userForm.reset();
              setTimeout(() => {
                this.router.navigate([`/admin/user/userlist`]);
              }, 1000);
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: data.message,
              });
            }
          });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Confirm Password False!',
        });
      }
    }
  }
}
