using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;

namespace CalculatorBackend.Data;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<CalculatorContext>
{
    public CalculatorContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<CalculatorContext>();
        optionsBuilder.UseSqlite("Data Source=calculator.db");

        return new CalculatorContext(optionsBuilder.Options);
    }
}