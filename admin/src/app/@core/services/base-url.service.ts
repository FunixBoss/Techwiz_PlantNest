import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BaseURLService {
    // private _baseURL: string = "http://localhost:9090/api/admin"
    private _baseURL: string = "https://crowded-writer-production.up.railway.app/api/admin"

    get baseURL(): string{
        return this._baseURL ;
    }
}