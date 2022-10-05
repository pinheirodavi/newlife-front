import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  constructor(private http: HttpClient) { }

  findAllAptos() {
    return this.http.get<any>(`${environment.apiUrl}/apartamentos/all`);
  }

  getById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/funcionarios/${id}`);
  }

  findAllPaginated(
    pager: PageEvent,
    query?: string | null) {
    let params = new HttpParams()
      .append('page', pager.pageIndex)
      .append('size', pager.pageSize);
    if (query) params = params.append('query', query);
    return this.http.get<any>(`${environment.apiUrl}/funcionarios/all`, { params });
  }

  create (formData: Object) {
    return this.http.post<any>(`${environment.apiUrl}/funcionarios`, formData);
  }

  update (formData: Object, id: number) {
    return this.http.put<any>(`${environment.apiUrl}/funcionarios/${id}`, formData);
  }

  delete (id: number) {
    return this.http.delete<any>(`${environment.apiUrl}/funcionarios/${id}`);
  }
}
