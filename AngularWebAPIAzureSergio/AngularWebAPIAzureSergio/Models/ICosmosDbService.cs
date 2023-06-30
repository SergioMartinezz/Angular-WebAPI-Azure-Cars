namespace AngularWebAPIAzureSergio.Models
{
    public interface ICosmosDbService
    {
        Task<IEnumerable<Cars>> GetMultipleAsync(string query);
        Task<Cars> GetAsync(string id);
        Task AddAsync(Cars item);
        Task UpdateAsync(string id, Cars item);
        Task DeleteAsync(string id);
    }
}
