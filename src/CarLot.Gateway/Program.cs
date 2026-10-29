using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// Containers use ocelot.Docker.json (downstreams via host.docker.internal), host runs use ocelot.json (localhost)
builder.Configuration.AddJsonFile(
    builder.Configuration["OcelotConfigFile"] ?? "ocelot.json", optional: false, reloadOnChange: true);

builder.Services.AddOcelot(builder.Configuration);

const string CorsOrigin = "MyCorsOrigin";
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsOrigin, policy =>
        policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.MapOpenApi();
}

// app.UseHttpsRedirection();

app.UseCors(CorsOrigin);

await app.UseOcelot();

app.Run();
