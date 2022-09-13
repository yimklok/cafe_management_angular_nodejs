import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url = environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { }

  add(data:any){
    return this.http.post(this.url+'/pruduct/add/',data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }
  update(data:any){
    return this.http.patch(this.url+'/pruduct/update/',data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }
  getProduct(){
    return this.http.get(this.url+'/pruduct/get/');
  }
  updateStatus(data:any){
    return this.http.patch(this.url+'/pruduct/updateStatus/',data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }
  delete(id:any){
    return this.http.delete(this.url+'/pruduct/delete/'+id,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }

  getProductByCategory(id:any){
    return this.http.get(this.url+'/pruduct/getByCategoryId/'+id);
  }

  getProductById(id:any){
    return this.http.get(this.url+'/pruduct/getById/'+id);
  }

}
