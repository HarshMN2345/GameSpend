using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RestApi; // Assuming this is where your DbContext and endpoints are defined

var builder = WebApplication.CreateBuilder(args);
var connString = builder.Configuration.GetConnectionString("GameStore");
builder.Services.AddSqlite<GameStoreContext>(connString);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173") // Update with your frontend URL
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure middleware
app.UseRouting();

// Use CORS middleware
app.UseCors("AllowSpecificOrigin");

// Register your endpoints
app.MapGamesEndpoints(); // Assuming this method registers your API endpoints
app.MapGet("/", () => "ASP.NET CORE VS SPRING BOOT BEGINS");

// Migrate database (assuming you have an extension method like app.MigrateDb())
app.MigrateDb();

app.Run();
