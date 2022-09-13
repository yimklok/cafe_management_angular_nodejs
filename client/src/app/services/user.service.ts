import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = env.apiUrl;
  constructor(private http: HttpClient) {}

  signup(data: any) {
    return this.http.post(this.url + '/user/signup', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  login(data:any) {
    return this.http.post(this.url + '/user/login',data,{
      headers:new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  checkToken(){
    return this.http.get(this.url+'/user/checkToken');
  }

  changePassword(data:any){
    return this.http.post(this.url+'/user/changePassword',data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }
}
