import type { BookDto, CreateUpdateBookDto } from './books/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';


interface RandomUser {
  gender: string;
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
}
@Injectable({
  providedIn: 'root',
})
export class BookService {
  apiName = 'Default';
  

  create = (input: CreateUpdateBookDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BookDto>({
      method: 'POST',
      url: '/api/app/book',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/book/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BookDto>({
      method: 'GET',
      url: `/api/app/book/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<BookDto>>({
      method: 'GET',
      url: '/api/app/book',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateBookDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BookDto>({
      method: 'PUT',
      url: `/api/app/book/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

    randomUserUrl = 'https://api.randomuser.me/';

    getUsers(
      pageIndex: number,
      pageSize: number,
      sortField: string | null,
      sortOrder: string | null,
      filters: Array<{ key: string; value: string[] }>
    ): Observable<{ results: RandomUser[] }> {
      let params = new HttpParams()
        .append('page', `${pageIndex}`)
        .append('results', `${pageSize}`)
        .append('sortField', `${sortField}`)
        .append('sortOrder', `${sortOrder}`);
      filters.forEach(filter => {
        filter.value.forEach(value => {
          params = params.append(filter.key, value);
        });
      });
      return this.http
        .get<{ results: RandomUser[] }>(`${this.randomUserUrl}`, { params })
        .pipe(catchError(() => of({ results: [] })));
    }
  


  constructor(private restService: RestService,private http: HttpClient) {}
}
