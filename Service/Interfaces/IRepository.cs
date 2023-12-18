using Service.Entities;

namespace Service.Interfaces
{
    public interface IRepository
    {
        public Task<List<Employee>> GetAllAsync();
        public void Create(Employee entitiy);
        public void Delete(Employee entitiy);
        public void Update(Employee entitiy);
        public Task<List<Employee>> FindByPost(string post);
        public Task<List<Employee>> FindByPeriod(int days);
        public Task SaveAsync();
    }
}
