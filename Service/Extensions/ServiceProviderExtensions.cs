using Service.Context;
using Service.Interfaces;
using Service.Repositories;

namespace Service.Extensions
{
    public static class ServiceProviderExtensions
    {
        public static void AddDataAccessService(this IServiceCollection service)
        {
            service.AddDbContext<ApplicationContext>();
            service.AddRepositoriesService();
        }

        private static void AddRepositoriesService(this IServiceCollection service)
        {
            service.AddScoped<IRepository, EmployeeRepository>();
        }
    }
}
