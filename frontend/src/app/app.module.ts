import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { QuestionComponent } from "./components/question/question.component";


import { DataService } from "./services/data.service";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./components/app/app.component";
import { QuestionsComponent } from "./components/questions/questions.component";
import { HomeComponent } from "./components/home/home.component";
import { NavComponent } from "./components/nav/nav.component";
import { QuizComponent } from "./components/quiz/quiz.component";
import { QuizListComponent } from "./components/quiz-list/quiz-list.component";

const routes = [
    { path: "", component: HomeComponent},
    { path: "question", component: QuestionComponent},
    { path: "questions", component: QuestionsComponent},
    { path: "quiz", component: QuizComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionsComponent,
    HomeComponent,
    NavComponent,
    QuizComponent,
    QuizListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [HttpClient, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
