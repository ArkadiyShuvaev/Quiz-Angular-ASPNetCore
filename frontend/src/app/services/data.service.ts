import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import IQuestion from "../IQuestion";


@Injectable({
  providedIn: "root"
})
export class DataService {

    constructor(private http: HttpClient) {}

    postQuestion(question: IQuestion): void {
        this.http.post("https://localhost:44348/api/questions", question).subscribe(res => {
            console.log(res);
        });
    }

    getQuestions(): Observable<IQuestion[]> {
        return this.http.get<IQuestion[]>("https://localhost:44348/api/questions");
    }
}
