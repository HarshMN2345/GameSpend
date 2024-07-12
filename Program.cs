using RestApi;

var builder = WebApplication.CreateBuilder(args);
var connString=builder.Configuration.GetConnectionString("GameStore");
builder.Services.AddSqlite<GameStoreContext>(connString);
var app = builder.Build();
app.MapGamesEndpoints();
app.MapGet("/", () => "ASP.NET CORE VS SPRING BOOT BEGINS");
app.MigrateDb();
app.Run();

