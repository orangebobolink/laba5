using Microsoft.EntityFrameworkCore;
using Service.Context;
using Service.Entities;
using Service.Interfaces;

namespace Service.Repositories
{
    public class EmployeeRepository : IRepository
    {
        private readonly ApplicationContext _context;

        public EmployeeRepository(ApplicationContext context)
        {
            _context = context;
        }

        public void Create(Employee entitiy)
            => _context.Add(entitiy);

        public void Delete(Employee entitiy)
            => _context.Remove(entitiy);

        public async Task<List<Employee>> FindByPeriod(int days)
        {
            var period = TimeSpan.FromDays(days);

            return await _context.Employees
                .Where(e => (e.DateOfFire - e.DateOfEmployment) > period)
                .ToListAsync();
        }

        public async Task<List<Employee>> FindByPost(string post)
            => await _context.Employees
            .Where(e => e.Post == post)
            .ToListAsync();

        public async Task<List<Employee>> GetAllAsync()
            => await _context.Employees.AsNoTracking().ToListAsync();

        public async Task SaveAsync()
             => await _context.SaveChangesAsync();

        public void Update(Employee entitiy)
            => _context.Employees
            .Update(entitiy);
    }
}
