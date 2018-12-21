import { Component } from "@angular/core";
import { QuestionComponent } from "./components/question/question.component";

@Component({
  selector: 'app-root',
  template: "<question></question>"
})

export class AppComponent {
  title = 'Quiz';
}
