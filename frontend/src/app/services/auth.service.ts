import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import IUser from "../IUser";
import IAuthResult from "../IAuthResult";
import { of } from "rxjs/observable/of";
import {catchError, map } from "rxjs/operators";


@Injectable({
  providedIn: "root"
})
export class AuthService {
    private readonly tokenPropName = "token";

    public isAuthenticated() {
        const result = !!localStorage.getItem(this.tokenPropName);
        return result;
    }

    logoutUser(): void {

        localStorage.removeItem(this.tokenPropName);

        // return of(null).pipe(
        //     map(() => {
        //         return {isSuccessful: true, error: null} as IAuthResult;
        //     })
        // );
    }

    constructor(private http: HttpClient) { }

    loginUser(user: IUser): Observable<IAuthResult> {
        return this.http.post("https://localhost:44348/api/account/login", user, {responseType: "text"})
            .pipe(
                map(result => {
                    this.saveToken(result);
                    return {isSuccessful: true, error: null} as IAuthResult;
                }),
                catchError(error => {
                    const err = error as HttpErrorResponse;
                    return of({isSuccessful: false, error: err.error} as IAuthResult);
                })
            );
    }

    private saveToken(result: string) {
        localStorage.setItem(this.tokenPropName, result);
    }

    registerUser(user: IUser): Observable<IAuthResult> {
        return this.http.post("https://localhost:44348/api/account", user, {responseType: "text"})
            .pipe(
                map(result => {
                    localStorage.setItem("token", result);
                    return {isSuccessful: true, error: null} as IAuthResult;
                }),
                catchError(error => {
                    const err = error as HttpErrorResponse;
                    return of({isSuccessful: false, error: err.error} as IAuthResult);
                })
            );
    }

}
