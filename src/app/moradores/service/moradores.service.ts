import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoradoresService {
  findAllAptos() {
    return this.http.get<any>(`${environment.apiUrl}/apartamentos/all`);
  }

  findAllList(query?: string | null) {
    console.log("service "+query);
    let params = new HttpParams();
    if(query) params = params.append('query', query);
    return this.http.get<any>(`${environment.apiUrl}/moradores/allList`, {params})
  }

  constructor(private http: HttpClient) { }

  getById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/moradores/${id}`);
  }

  findAllPaginated(
    pager: PageEvent,
    query?: string | null) {
    let params = new HttpParams()
      .append('page', pager.pageIndex)
      .append('size', pager.pageSize);
    if (query) params = params.append('query', query);
    return this.http.get<any>(`${environment.apiUrl}/moradores/all`, { params });
  }

  create (formData: Object) {
    return this.http.post<any>(`${environment.apiUrl}/moradores`, formData);
  }

  update (formData: Object, id: number) {
    return this.http.put<any>(`${environment.apiUrl}/moradores/${id}`, formData);
  }

  delete (id: number) {
    return this.http.delete<any>(`${environment.apiUrl}/moradores/${id}`);
  }

  importMorador(file: any){
    const formData = new FormData();
    formData.append('file',file);
    return this.http.post(`${environment.apiUrl}/moradores/import`,formData);
  }
}
