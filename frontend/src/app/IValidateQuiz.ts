import { IAnsweredQuestion } from "./IAnsweredQuestion";

export default interface IValidateQuiz {
    id: number;
    questions: IAnsweredQuestion[];
}
