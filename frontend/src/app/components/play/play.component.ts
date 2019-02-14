import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import IQuiz from "src/app/IQuiz";

@Component({
  selector: "app-play",
  templateUrl: "./play.component.html",
  styleUrls: ["./play.component.css"]
})

export class PlayComponent implements OnInit {
    quizzes: IQuiz[];

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getAllQuizzes().subscribe(res => {
            this.quizzes = res;
        });
    }
}
