using System.Text.Json;
using System.Text.Json.Serialization;

namespace CarLot.Core.Serialization;

public static class JsonDefaults
{
    public static readonly JsonSerializerOptions Web = new(JsonSerializerDefaults.Web)
    {
        Converters = { new JsonStringEnumConverter() }
    };
}
