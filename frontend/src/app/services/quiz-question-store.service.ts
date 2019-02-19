import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IAnsweredQuestion } from "../IAnsweredQuestion";
import { shareReplay, tap, map } from "rxjs/operators";
import IQuestion from "../IQuestion";
import { DataService } from "./data.service";
import IShuffledQuestion from "../IShuffledQuestion";
import { IValidatedQuestion } from "../IValidatedQuestion";
import IValidateQuiz from "../IValidateQuiz";

@Injectable({
  providedIn: "root"
})
export class QuizQuestionStoreService {

    constructor(private dataService: DataService, private quizId: number) {
        this.fetchAll(quizId);
    }

    private readonly _answeredQuestions = new BehaviorSubject<IAnsweredQuestion[]>([]);
    private readonly _quizQuestions = new BehaviorSubject<IShuffledQuestion[]>([]);
    private readonly _validatedQuestions = new BehaviorSubject<IValidatedQuestion[]>([]);

    readonly answeredQuestions$ = this._answeredQuestions.asObservable().pipe(
        shareReplay(1)
    );

    readonly validatedQuestions$ = this._validatedQuestions.asObservable().pipe(
        shareReplay(1)
    );

    get quizQuestions(): IShuffledQuestion[] {
        return this._quizQuestions.getValue();
    }

    set quizQuestions(val: IShuffledQuestion[]) {
        this._quizQuestions.next(val);
    }

    get answeredQuestions(): IAnsweredQuestion[] {
        return this._answeredQuestions.getValue();
    }

    set answeredQuestions(val: IAnsweredQuestion[]) {
        this._answeredQuestions.next(val);
    }

    set validatedQuestions(val: IValidatedQuestion[]) {
        this._validatedQuestions.next(val);
    }

    validateQuestions(): Observable<IValidatedQuestion[]> {
        const quiz = {id: this.quizId, questions: this.answeredQuestions} as IValidateQuiz;
        return this.dataService.validateQuestions(quiz).pipe(
            tap(res => {
                this.validatedQuestions = res;
            }), map( res => res)
        );
    }

    setAnswered(id: number, answer: string) {
        const existing = this.answeredQuestions.find(i => i.id === id);

        if (existing) {
            existing.answer = answer;
        } else {
            this.answeredQuestions = [
                ...this.answeredQuestions,
                { id: id, answer: answer } as IAnsweredQuestion
            ];
        }
    }

    async reloadData(quizId: number) {
        this.answeredQuestions = [];
        this.quizQuestions = await this.dataService.getShuffledQuestionsByQuizId(quizId).toPromise();
    }

    async fetchAll(quizId: number) {
        this.quizQuestions = await this.dataService.getShuffledQuestionsByQuizId(quizId).toPromise();
    }
}
