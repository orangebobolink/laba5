namespace Service.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        public string LastName { get; set; } = string.Empty;
        public string Post { get; set; } = string.Empty;
        public DateTime DateOfEmployment { get; set; } = DateTime.Now;
        public DateTime? DateOfFire { get; set; } = null;
        public int Salary { get; set; }
    }
}
