import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {  Observable } from "rxjs";
import { Contact } from "./contact";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httClient: HttpClient ) { }

  getDepartamentos(){
     return this.httClient.get("/test/colombia.json")
    

  }

  AddUser(contact: Contact):Observable<Object>{
    return this.httClient.post('/api/contact',contact);
  }
}

