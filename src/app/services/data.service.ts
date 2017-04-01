import { Injectable } from '@angular/core';
import { Http, Response,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DataService {

private serviceUrl:String = 'http://modernstoreapilucaslopes.azurewebsites.net/'

    constructor(private http:Http){}
    createUser(data: any) {
        console.log(data);
        return this.http
            .post(this.serviceUrl+'v1/customers',data)
            .map((res:Response) => res.json());
    }

    authenticate(data:any){
        var dt = "grant_type=password&username="+data.username+"&password="+data.password;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers:headers});
        console.log(data);
        return this.http
            .post(this.serviceUrl+'v1/authenticate',dt,options)
            .map((res:Response) => res.json());
    }

    getProducts(){
        return this.http
            .get(this.serviceUrl+'v1/products')
            .map((res:Response) => res.json());
    }

    createOrder(data:any){
        var token = localStorage.getItem('mws.token');
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append('Authorization',`Bearer ${token}`); Headers
        let options = new RequestOptions({headers:headers});
        console.log(data);
        return this.http
            .post(this.serviceUrl+'v1/orders',data,options)
            .map((res:Response) => res.json());
    }
}