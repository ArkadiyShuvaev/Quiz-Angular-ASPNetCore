import IShuffledQuestion from "./IShuffledQuestion";

export default interface IPlayQuiz {
    id: number;
    questions: IShuffledQuestion[];
    title: string;
}
