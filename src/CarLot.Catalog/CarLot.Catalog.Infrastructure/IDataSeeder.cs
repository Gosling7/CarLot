namespace CarLot.Catalog.Infrastructure;

public interface IDataSeeder
{
    Task EnsureDatabaseInitializedAsync();
}