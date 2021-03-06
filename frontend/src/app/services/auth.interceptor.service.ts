import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const token = localStorage.getItem("token");

        const newRequest = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${token}`)
        });

        return next.handle(newRequest);

    }
}
