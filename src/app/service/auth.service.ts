import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api =
    'https://apihaha.netlify.app/.netlify/functions/api/auth';

  constructor(private http: HttpClient) {}

  SignUp(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/signup`, data);
  }
  SignIn(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/signin`, data);
  }
  getPagiUser(page: any): Observable<any> {
    return this.http.get<any>(
      `${this.api}/pagi?page=${page.page}&size=${page.size}`
    );
  }
  getSearchUser(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.api}/search/${id.search}?page=${id.page}&size=${id.size}`
    );
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.api}/delete/${id}`);
  }
}
