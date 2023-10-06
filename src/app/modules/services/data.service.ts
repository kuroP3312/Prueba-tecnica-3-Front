import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DataService {
    constructor(private httpService: HttpService, private http: HttpClient) {}

    getUsers(query = {}) {
        return this.httpService.ejectQuery('/get-all-user', query);
    }

    getUser(query = {}) {
        return this.httpService.ejectQuery('/get-user', query);
    }

    createUser(query: any) {
        console.log("dentro de servici");
        return this.httpService.ejectPost('/create-user', query);
    }

    editUser(query: any) {
        return this.httpService.ejectPost('/edit-user', query);
    }

    deleteUser(query: any) {
        return this.httpService.ejectPost('/delete-user', query);
    }
}
