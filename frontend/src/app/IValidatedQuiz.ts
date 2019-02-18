import { IValidatedQuestion } from "./IValidatedQuestion";

export interface IValidatedQuiz {
    id: number;
    questions: IValidatedQuestion[];
}
