import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";


@Injectable({
  providedIn: "root"
})
export class DataService {
    constructor(private http: HttpClient) {}

    postQuestion(question) {
        this.http.post("", question).subscribe(res => {
            console.log(res);
        });
    }

    getPosts(): Observable<any> {
        return this.http.get("http://jsonplaceholder.typicode.com/posts")
        .map(res => res);
    }
}
