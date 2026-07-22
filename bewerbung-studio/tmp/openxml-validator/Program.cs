using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Validation;

foreach (var file in args)
{
    Console.WriteLine(file);
    using var document = WordprocessingDocument.Open(file, false);
    var errors = new OpenXmlValidator().Validate(document).ToList();
    Console.WriteLine($"errors={errors.Count}");
    foreach (var group in errors.GroupBy(error => error.Description))
    {
        var error = group.First();
        Console.WriteLine($"{group.Count()}x {error.ErrorType}: {error.Description}");
        Console.WriteLine($"  example part={error.Part?.Uri} path={error.Path?.XPath}");
    }
}
