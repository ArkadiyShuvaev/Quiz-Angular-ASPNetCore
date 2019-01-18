import IQuestion from "./IQuestion";

export default interface IQuiz {
    id: number;
    questions: IQuestion[];
}
