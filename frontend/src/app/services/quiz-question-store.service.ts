import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IAnsweredQuestion } from "../IAnsweredQuestion";
import { shareReplay } from "rxjs/operators";
import IQuestion from "../IQuestion";
import { DataService } from "./data.service";
import IShuffledQuestion from "../IShuffledQuestion";

@Injectable({
  providedIn: "root"
})
export class QuizQuestionStoreService {

    constructor(private dataService: DataService, quizId: number) {
        this.fetchAll(quizId);
    }

    private readonly _answeredQuestions = new BehaviorSubject<IAnsweredQuestion[]>([]);
    private readonly _quizQuestions = new BehaviorSubject<IShuffledQuestion[]>([]);

    readonly answeredQuestions$ = this._answeredQuestions.asObservable().pipe(
        shareReplay(1)
    );

    get quizQuestions(): IShuffledQuestion[] {
        return this._quizQuestions.getValue();
    }

    set quizQuestions(val: IShuffledQuestion[]) {
        this._quizQuestions.next(val);
    }

    get anweredQuestions(): IAnsweredQuestion[] {
        return this._answeredQuestions.getValue();
    }

    set anweredQuestions(val: IAnsweredQuestion[]) {
        this._answeredQuestions.next(val);
    }

    setAnswered(id: number, answer: string) {
        const existing = this.anweredQuestions.find(i => i.id === id);

        if (existing) {
            existing.answer = answer;
        } else {
            this.anweredQuestions = [
                ...this.anweredQuestions,
                { id: id, answer: answer } as IAnsweredQuestion
            ];
        }
    }


    async fetchAll(quizId: number) {
        this.quizQuestions = await this.dataService.getShuffledQuestionsByQuizId(quizId).toPromise();
    }
}
