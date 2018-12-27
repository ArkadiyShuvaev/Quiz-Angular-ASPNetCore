import { Component } from "@angular/core";
import { QuestionComponent } from "./components/question/question.component";

@Component({
  selector: "app-root",
  template: "<app-question></app-question><app-questions></app-questions>"
})

export class AppComponent {
  title = "Quiz";
}
