using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CalculatorBackend.Data;
using CalculatorBackend.Models;

namespace CalculatorBackend.Controllers;

[ApiController]
[Route("api/calculate")]  // Changed from "[controller]"
public class CalculateController : ControllerBase
{
    private readonly CalculatorContext _context;

    public CalculateController(CalculatorContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Calculate([FromBody] CalculationRequest request)
    {
        try
        {
            var result = EvaluateExpression(request.Expression);

            var calculation = new Calculation
            {
                Expression = request.Expression,
                Result = result.ToString(),
                Timestamp = DateTime.UtcNow
            };

            _context.Calculations.Add(calculation);
            await _context.SaveChangesAsync();

            return Ok(new { result });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("history")]
    public async Task<IActionResult> GetHistory()
    {
        try
        {
            var history = await _context.Calculations
                .OrderByDescending(c => c.Timestamp)
                .Take(10)
                .ToListAsync();

            return Ok(history);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    private static double EvaluateExpression(string expression)
    {
        var table = new System.Data.DataTable();
        return Convert.ToDouble(table.Compute(expression, null));
    }
}

public class CalculationRequest
{
    public string? Expression { get; set; }
}