import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() { 
    axios.defaults.baseURL = "http://localhost:8080/api";
    axios.defaults.headers.post["Content-Type"] = "application/json";
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null): void{
    if(token != null) {
      window.localStorage.setItem("auth_token", token);
    }else{
      window.localStorage.removeItem("auth_token")
    }
  }

  removeToken(): void{
    window.localStorage.removeItem("auth_token")
  }

  async request(method: string, url: string, data: any): Promise<any> {
    let headers = {};

    if(this.getAuthToken() != null) {
      headers = {"Authorization": "Bearer " + this.getAuthToken()}
    }

    console.log(4444, window.localStorage.getItem("auth_token"))

    try {
      return await axios({
        method: method,
        url: url,
        data: data,
        headers: headers
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
