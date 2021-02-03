using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ribboned.Repositories;

namespace Ribboned.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AvatarController : ControllerBase
    {
        private readonly IAvatarRepository _avatarRepo;
        public AvatarController(IAvatarRepository avatarRepo)
        {
            _avatarRepo = avatarRepo;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_avatarRepo.GetAll());
        }
    }
}
