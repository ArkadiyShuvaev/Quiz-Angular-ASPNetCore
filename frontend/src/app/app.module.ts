import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";

import { nameof } from "./helpers";
import IQuiz from "./IQuiz";
import { DataService } from "./services/data.service";

import { QuestionComponent } from "./components/question/question.component";
import { AppComponent } from "./components/app/app.component";
import { QuestionsComponent } from "./components/questions/questions.component";
import { HomeComponent } from "./components/home/home.component";
import { NavComponent } from "./components/nav/nav.component";
import { QuizComponent } from "./components/quiz/quiz.component";
import { QuizListComponent } from "./components/quiz-list/quiz-list.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthInterceptorService } from "./services/auth.interceptor.service";
import { LoginComponent } from "./components/login/login.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { PlayListComponent } from "./components/play-list/play-list.component";
import { PlayQuizComponent } from "./components/play-quiz/play-quiz.component";
import { PlayQuizQuestionDetailsComponent } from "./components/play-quiz-question-details/play-quiz-question-details.component";
import { PlayFinishedComponent } from "./components/play-finished/play-finished.component";


const routes = [
    { path: "", component: HomeComponent},
    { path: "question", component: QuestionComponent},
    { path: "questions", component: QuestionsComponent},
    { path: "questions/:quizId", component: QuestionComponent},
    { path: "play", component: PlayListComponent},
    { path: "register", component: RegisterComponent},
    { path: "login", component: LoginComponent},
    { path: "logout", component: LogoutComponent},
    { path: `playQuiz/:${nameof<IQuiz>("id")}`, component: PlayQuizComponent}
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
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    PlayListComponent,
    PlayQuizComponent,
    PlayQuizQuestionDetailsComponent,
    PlayFinishedComponent
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
