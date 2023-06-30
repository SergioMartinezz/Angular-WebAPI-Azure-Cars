using Microsoft.Azure.Cosmos;

namespace AngularWebAPIAzureSergio.Models
{
    public class CosmosDbService : ICosmosDbService
    {
        private Container _container;
        public CosmosDbService(CosmosClient cosmosDbClient, string databaseName, string containerName)
        {
            _container = cosmosDbClient.GetContainer(databaseName, containerName);
        }

        public async Task AddAsync(Cars item)
        {
            await _container.CreateItemAsync(item, new PartitionKey(item.Id));
        }

        public async Task DeleteAsync(string id)
        {
            await _container.DeleteItemAsync<Cars>(id, new PartitionKey(id));
        }

        public async Task<Cars> GetAsync(string id)
        {
            try
            {
                var response = await _container.ReadItemAsync<Cars>(id, new PartitionKey(id));
                return response.Resource;
            }
            catch (CosmosException)
            {
                return null;
            };
        }

        public async Task<IEnumerable<Cars>> GetMultipleAsync(string queryString)
        {
            var query = _container.GetItemQueryIterator<Cars>(new QueryDefinition(queryString));
            var results = new List<Cars>();

            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }
            return results;
        }

        public async Task UpdateAsync(string id, Cars item)
        {
            await _container.UpsertItemAsync(item, new PartitionKey(id));
        }
    }
}
