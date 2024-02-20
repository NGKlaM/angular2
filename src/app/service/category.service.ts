import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private api =
    'https://apihaha.netlify.app/.netlify/functions/api/category';

  constructor(private http: HttpClient) {}
  getCategory(): Observable<any> {
    return this.http.get<any>(this.api);
  }
  getPagiCategory(page: any): Observable<any> {
    return this.http.get<any>(
      `${this.api}/pagi?page=${page.page}&size=${page.size}`
    );
  }
  getSearchCategory(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.api}/search/${id.search}?page=${id.page}&size=${id.size}`
    );
  }
  getOneCategory(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/detail/${id}`);
  }
  deleteCategory(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
  addCategory(Category: any) {
    return this.http.post(`${this.api}`, Category);
  }
  updateCategory(Category: any) {
    return this.http.put(`${this.api}/${Category.id}`, Category);
  }
}
