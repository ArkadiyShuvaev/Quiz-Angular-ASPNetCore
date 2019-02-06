import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { QuestionComponent } from "./components/question/question.component";


import { DataService } from "./services/data.service";
import { HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./components/app/app.component";
import { QuestionsComponent } from "./components/questions/questions.component";
import { HomeComponent } from "./components/home/home.component";
import { NavComponent } from "./components/nav/nav.component";
import { QuizComponent } from "./components/quiz/quiz.component";
import { QuizListComponent } from "./components/quiz-list/quiz-list.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthInterceptorService } from "./services/auth.interceptor.service";

const routes = [
    { path: "", component: HomeComponent},
    { path: "question", component: QuestionComponent},
    { path: "questions", component: QuestionsComponent},
    { path: "questions/:quizId", component: QuestionComponent},
    { path: "quiz", component: QuizComponent},
    { path: "register", component: RegisterComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionsComponent,
    HomeComponent,
    NavComponent,
    QuizComponent,
    QuizListComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [HttpClient, DataService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
