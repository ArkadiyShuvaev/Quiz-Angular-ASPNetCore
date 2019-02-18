namespace Quiz_Angular_ASPNetCore.Models
{
    public class ShuffledQuestionDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Answer1 { get; set; }
        public string Answer2 { get; set; }
        public string Answer3 { get; set; }
        public string Answer4 { get; set; }
        public int QuizId { get; set; }
    }
}