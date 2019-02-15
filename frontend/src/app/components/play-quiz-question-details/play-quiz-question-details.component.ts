import { Component, OnInit, Input } from "@angular/core";
import IQuestion from "src/app/IQuestion";

@Component({
  selector: "app-play-quiz-question-details",
  templateUrl: "./play-quiz-question-details.component.html",
  styleUrls: ["./play-quiz-question-details.component.css"]
})
export class PlayQuizQuestionDetailsComponent implements OnInit {

    @Input() question: IQuestion;
    answers: string[];

    constructor() { }

    ngOnInit() {
        const questionAnswers = [ this.question.correctAnswer,
            this.question.answer1,
            this.question.answer2,
            this.question.answer3 ];

        this.answers = this.shuffle(questionAnswers);
        console.log(this.answers);
    }

    shuffle(arr: string[]): string[] {
        let currentIndex: number = arr.length;
        let temporaryValue: string;
        let randomIndex: number;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

          // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex = currentIndex - 1;

            // And swap it with the current element.
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }

        return arr;
      }
}
