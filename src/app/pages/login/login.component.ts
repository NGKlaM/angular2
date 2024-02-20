import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf, ToastModule,HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent {
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
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.authService.SignIn(formData).subscribe((data: any) => {
        console.log(data);
        if (data.status === 0) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login Success!',
          });
          localStorage.setItem('token', JSON.stringify({ token: data.token }));
          this.userForm.reset();
          setTimeout(() => {
            this.router.navigate(['/admin/products']);
          }, 1000);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: ' Tài Khoản Hoặc Mật Khẩu Sai!',
          });
        }
      });
    }
  }
}
