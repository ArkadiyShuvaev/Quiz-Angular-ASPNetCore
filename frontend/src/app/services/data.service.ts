import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { of } from "rxjs/observable/of";
import {catchError, tap, map } from "rxjs/operators";
import IQuestion from "../IQuestion";
import IQuiz from "../IQuiz";
import { QuestionsComponent } from "../components/questions/questions.component";
import IAuthResult from "../IAuthResult";
import IUser from "../IUser";
import IShuffledQuestion from "../IShuffledQuestion";
import IPlayQuiz from "../IPlayQuiz";
import { IAnsweredQuestion } from "../IAnsweredQuestion";
import { IValidatedQuestion } from "../IValidatedQuestion";
import IValidateQuiz from "../IValidateQuiz";
import { IValidatedQuiz } from "../IValidatedQuiz";


@Injectable({
    providedIn: "root"
})
export class DataService {

    private selectedQuestion = new Subject<IQuestion>();
    questionSelected = this.selectedQuestion.asObservable();

    private selectedQuiz = new Subject<IQuiz>();
    quizSelected = this.selectedQuiz.asObservable();

    private _questionList = new Subject<IQuestion[]>();
    questions = this._questionList.asObservable();


    constructor(private http: HttpClient) { }

    postQuestion(question: IQuestion): void {
        this.http.post("https://localhost:44348/api/questions", question).subscribe(res => {
            console.log(res);
        });
    }

    updateQuestion(question: IQuestion): any {
        this.http.put(`https://localhost:44348/api/questions/${question.id}`, question)
            .subscribe(res => {
                console.log(res);
            });
    }

    selectQuestion(question: IQuestion): void {
        console.log(`selectQuestion: ${question}`);
        this.selectedQuestion.next(question);
    }

    selectQuiz(quiz: IQuiz): void {
        console.log(`selectQuiz: ${quiz}`);
        this.selectedQuiz.next(quiz);
    }

    getQuestionsByQuizId(quizId: number): Observable<IQuestion[]> {
        return this.http.get<IQuiz>("https://localhost:44348/api/quizzes/" + quizId)
            .pipe(
                tap(_ => console.log(`fetched questions with id: ${quizId}`)),
                    catchError(this.handleError<IQuiz>("updateQuiz", {} as IQuiz)),
                map<IQuiz, IQuestion[]>(resp => resp.questions),
            );
    }

    getShuffledQuestionsByQuizId(quizId: number): Observable<IShuffledQuestion[]> {
        return this.http.get<IPlayQuiz>("https://localhost:44348/api/play/" + quizId)
            .pipe(
                tap(_ => console.log(`fetched questions with id: ${quizId}`),
                    catchError(this.handleError<IPlayQuiz>("updateQuiz", {} as IPlayQuiz))),
                map<IPlayQuiz, IShuffledQuestion[]>(resp => resp.questions),
            );
    }

    validateQuestions(quiz: IValidateQuiz): Observable<IValidatedQuestion[]> {
        return this.http.post<IValidatedQuiz>("https://localhost:44348/api/play/", quiz)
            .pipe(
                tap(_ => console.log(`fetched quiz avalidated questions with id: ${quiz.id}`),
                    catchError(this.handleError<IPlayQuiz>("validateQuestions", {} as IPlayQuiz))),
                map<IValidatedQuiz, IValidatedQuestion[]>(resp => resp.questions),
            );
    }

    getQuestions(): Observable<IQuestion[]> {
        this.http.get<IQuestion[]>("https://localhost:44348/api/questions")
            .subscribe(res => {
                this._questionList.next(res);
        });

        return this.questions;
    }

    postQuiz(quiz: IQuiz): void {
        this.http.post("https://localhost:44348/api/quizzes", quiz).subscribe(res => {
            console.log(res);
        });
    }

    updateQuiz(quiz: IQuiz): Observable<any> {
        return this.http.put(`https://localhost:44348/api/quizzes/${quiz.id}`, quiz)
            .pipe(
                tap(_ => console.log(`updated quiz with id: ${quiz.id}`)),
                catchError(this.handleError<IQuiz>("updateQuiz", {} as IQuiz))
        );
    }

    getQuizzes(): Observable<IQuiz[]> {
        return this.http.get<IQuiz[]>("https://localhost:44348/api/quizzes")
            .pipe(
                tap(_ => console.log("fetched quizzes")),
                catchError(this.handleError<IQuiz[]>("getQuizzes", []))
            );
    }

    getAllQuizzes(): Observable<IQuiz[]> {
        return this.http.get<IQuiz[]>("https://localhost:44348/api/quizzes/getAll")
            .pipe(
                tap(_ => console.log("fetched all quizzes")),
                catchError(this.handleError<IQuiz[]>("getAllQuizzes", []))
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = "operation", result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
