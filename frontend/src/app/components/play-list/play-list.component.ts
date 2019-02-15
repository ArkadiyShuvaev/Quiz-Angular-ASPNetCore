import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import IQuiz from "src/app/IQuiz";
import { Route } from "@angular/compiler/src/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-play-list",
  templateUrl: "./play-list.component.html",
  styleUrls: ["./play-list.component.css"]
})
export class PlayListComponent implements OnInit {
    quizzes: IQuiz[];

    constructor(private dataService: DataService, private router: Router) { }

    selectQuiz(quiz: IQuiz) {
        this.router.navigate([`/playQuiz/${quiz.id}`]);
    }

    ngOnInit() {
        this.dataService.getAllQuizzes().subscribe(res => {
            this.quizzes = res;
        });
    }
}
