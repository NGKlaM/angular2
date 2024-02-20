import { Injectable, inject } from '@angular/core'; // inject
import { HttpClient } from '@angular/common/http'; // HttpClient
import { Product, ProductAdmin } from '../types/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // call api
  apiUrl =
    'https://apihaha.netlify.app/.netlify/functions/api/product';

  constructor(private http: HttpClient) {}

  getProduct(page: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}?page=${page.page}&size=${page.size}`
    );
  }
  getOneProduct(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/detail/${id}`);
  }
  getCategoryProduct(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/category/${id.id}?page=${id.page}&size=${id.size}`
    );
  }
  getSearchProduct(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/search/${id.search}?page=${id.page}&size=${id.size}`
    );
  }
  getSearchDebouceProduct(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/searchdebouce?search=${id.search}`
    );
  }
  getFilterProduct(id: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/filter?page=${id.page}&size=${id.size}`,
      { id: id.id }
    );
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  addProduct(product: any) {
    return this.http.post(`${this.apiUrl}`, product);
  }
  updateProduct(product: any) {
    return this.http.put(`${this.apiUrl}/${product.id}`, product);
  }
}
