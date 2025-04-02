using CalculatorBackend.Models;  // This using directive is crucial
using Microsoft.EntityFrameworkCore;

namespace CalculatorBackend.Data;

public class CalculatorContext : DbContext
{
    public CalculatorContext(DbContextOptions<CalculatorContext> options) : base(options) { }
    public DbSet<Calculation> Calculations { get; set; }
}