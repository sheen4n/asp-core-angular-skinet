using System.Collections.Generic;
using System.Net;

namespace API.Errors
{
    public class ApiValidationErrorResponse : ApiResponse
    {
        public ApiValidationErrorResponse() : base((int) HttpStatusCode.BadRequest)
        {

        }

        public IEnumerable<string> Errors { get; set; }
    }
}