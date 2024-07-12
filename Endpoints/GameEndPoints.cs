using Microsoft.EntityFrameworkCore;

namespace RestApi;

public static class GameEndPoints
{
//     private static readonly List<GameSummaryDto> games = new()
// {
//     new GameSummaryDto(1, "Chip&dail", 2, 99M, new DateOnly(1992, 12, 3)),
//     new GameSummaryDto(2, "Mario", 2, 99M, new DateOnly(1992, 12, 3)),
//     new GameSummaryDto(3, "Contra", 2, 99M, new DateOnly(1992, 12, 3)),
// };
public static RouteGroupBuilder MapGamesEndpoints(this WebApplication app){
    var group=app.MapGroup("games").WithParameterValidation();
    group.MapGet("/", (GameStoreContext dbContext) => dbContext.Games.Include(game=>game.Genre)
    .Select(game=>game.ToGameSummaryDto()).AsNoTracking());

group.MapGet("/{id}", (int id,GameStoreContext dbContext) => 
{
    Game? game=dbContext.Games.Find(id);
    return game != null ? Results.Ok(game.ToGameDetailsDto()) : Results.NotFound();
});

// group.MapGet("/", () => "ASP.NET CORE VS SPRING BOOT BEGINS");

group.MapPost("/", (CreateGameDto newGame,GameStoreContext dbContext) =>
{

    // var game = new GameDto(games.Count + 1, newGame.Name, newGame.Genre, newGame.Price, newGame.ReleaseDate);
    Game game=newGame.ToEntity();
    dbContext.Games.Add(game);
    dbContext.SaveChanges();
    return Results.Created($"/games/{game.Id}", game.ToGameDetailsDto());
}).WithParameterValidation();

group.MapPut("/{id}",(int id,UpdateGameDto updateGame,GameStoreContext dbContext)=>{
var existingGmae=dbContext.Games.Find(id);
if(existingGmae is null){
    return Results.NotFound();
}
dbContext.Entry(existingGmae).CurrentValues.SetValues(updateGame.ToEntity(id));
dbContext.SaveChanges();
return Results.NoContent();

});
group.MapDelete("/{id}",(int id,GameStoreContext dbContext)=>{
  dbContext.Games.Where(game=>game.Id==id).ExecuteDelete();
});
return group;
}

}
