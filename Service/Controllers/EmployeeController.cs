using Microsoft.AspNetCore.Mvc;
using Service.Entities;
using Service.Interfaces;

namespace Service.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly ILogger<EmployeeController> _logger;
        private readonly IRepository _repository;

        public EmployeeController(IRepository repository, ILogger<EmployeeController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<List<Employee>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        [HttpGet("post")]
        public async Task<List<Employee>> GetPost(string post)
        {
            return await _repository.FindByPost(post);
        }

        [HttpGet("period")]
        public async Task<List<Employee>> GetPeriod(int days)
        {
            return await _repository.FindByPeriod(days);
        }

        [HttpPost]
        public async Task<List<Employee>> Create(Employee employee)
        {
            _repository.Create(employee);
            await _repository.SaveAsync();
            return await _repository.GetAllAsync();
        }

        [HttpPut]
        public async Task<List<Employee>> Update(Employee employee)
        {
            _repository.Update(employee);
            await _repository.SaveAsync();
            return await _repository.GetAllAsync();
        }

        [HttpDelete]
        public async Task<List<Employee>> Delete(Employee employee)
        {
            _repository.Delete(employee);
            await _repository.SaveAsync();
            return await _repository.GetAllAsync();
        }
    }
}
