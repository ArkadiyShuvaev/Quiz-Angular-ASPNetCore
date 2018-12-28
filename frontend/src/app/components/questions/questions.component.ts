import { Component, OnInit } from "@angular/core";
import IQuestion from "src/app/IQuestion";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: "app-questions",
    templateUrl: "./questions.component.html",
    styleUrls: ["./questions.component.css"]
})
export class QuestionsComponent implements OnInit {

    questions: IQuestion[] = [];

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getQuestions().subscribe(res => this.questions = res);
    }

}
