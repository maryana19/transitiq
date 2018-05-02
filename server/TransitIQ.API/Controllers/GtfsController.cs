using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TransitIQ.Interfaces;
using TransitIQ.Services;
using TransitIQ.Services.Helpers;

namespace TransitIQ.API.Controllers
{
    [Route("[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class GtfsController: Controller
    {
        private IGtfsFileService _service;

        public GtfsController(IGtfsFileService service, IStorage storage)
        {
            _service = service;
        }

        [Route("all/{agencyId}")]
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll(string agencyId)
        {
            if (! (this.User.IsInRole("admin") || HasAccessToAgency(agencyId)))
            {
                return new ForbidResult();
            }
            var result = await _service.GetAllGtfs(agencyId);
            return new JsonResult(result);
        }

        [Route("save/{agencyId}")]
        [HttpPost]
        [Authorize("IsAdmin")]
        public async Task<IActionResult> SaveGtfs(string agencyId, IFormCollection form)
        {
            var file = Request.Form.Files[0];
            if (file == null || file.Length == 0)
                throw new Exception("File is empty!");

            //var stream = file.OpenReadStream();
            //await _service.SaveGtfs(stream, file.FileName, agencyId);
            //stream.Dispose();
            using (var stream = file.OpenReadStream())
            {
                await _service.SaveGtfs(stream, file.FileName, agencyId);
            }

            return Ok();
        }


        [Route("delete/{agencyId}/{gtfsFileId}")]
        [HttpPost]
        [Authorize("IsAdmin")]
        public async Task<IActionResult> DeleteGtfs(string agencyId, string gtfsFileId)
        {
            await _service.DeleteGtfs(agencyId, gtfsFileId);
            return Ok();
        }

        [Route("publish/{agencyId}/{gtfsFileId}")]
        [HttpPost]
        [Authorize("IsAdmin")]
        public async Task<IActionResult> PublishGtfs(string agencyId, string gtfsFileId)
        {
            await _service.PublishGtfsFile(agencyId, gtfsFileId, false);
            return Ok();
        }

        [Route("unpublish/{gtfsFileId}")]
        [HttpPost]
        [Authorize("IsAdmin")]
        public async Task<IActionResult> UnpublishGtfs(string gtfsFileId)
        {
            await _service.UnublishGtfsFile (gtfsFileId);
            return Ok();
        }

        [Route("validate/{gtfsFileId}")]
        [HttpPost]
        [Authorize("IsAdmin")]
        public async Task<bool> ValidateGtfs( string gtfsFileId)
        {
            return await _service.ValidateGtfsFile( gtfsFileId);
        }

        private bool HasAccessToAgency(string agencyId)
        {
            var user = this.User;
            if (user.HasClaim("agencies", agencyId))
            {
                return true;
            }
            return false;
        }

    }
}
