using Microsoft.EntityFrameworkCore;

namespace RestApi;

public class GameStoreContext(DbContextOptions<GameStoreContext> options):DbContext(options)
{
  public DbSet<Game> Games=>Set<Game>();
    public DbSet<Genre> Genres=>Set<Genre>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
       modelBuilder.Entity<Genre>().HasData(
        new {Id=1,Name="Fighting"},
        new {Id=2,Name="RolePlaying"},
        new {Id=3,Name="Strategy"},
        new {Id=4,Name="Action"},
        new {Id=5,Name="Simulation"}
       );
    }

}
