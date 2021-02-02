using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ribboned.Models;
using Ribboned.Repositories;
using System;
using System.Security.Claims;

namespace Ribboned.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SnagController : ControllerBase
    {
        private readonly ISnagRepository _snagRepo;
        private readonly IRibbonRepository _ribbonRepo;
        private readonly IUserProfileRepository _userRepo;
        public SnagController(ISnagRepository snagRepo, IRibbonRepository ribbonRepo, IUserProfileRepository userRepo)
        {
            _snagRepo = snagRepo;
            _ribbonRepo = ribbonRepo;
            _userRepo = userRepo;
        }

        [HttpGet("getbyribbon/{id}")]
        public IActionResult Get(int id)
        {
            //check if ribbon exist
            var ribbon = _ribbonRepo.GetById(id);
            if(ribbon == null)
            {
                return BadRequest();
            };

            return Ok(_snagRepo.GetByRibbon(id));
        }

        [HttpGet("getmostrecentsnags")]
        public IActionResult GetMostRecentSnags()
        {
            //check if ribbon exist
            var user = GetCurrentUserProfile();
            if (user == null)
            {
                return BadRequest();
            };

            return Ok(_snagRepo.GetMostRecentSnags(user.Id));
        }

        [HttpGet("usersnags")]
        public IActionResult UserSnags()
        {
            //check if ribbon exist
            var user = GetCurrentUserProfile();
            if (user == null)
            {
                return BadRequest();
            };

            return Ok(_snagRepo.GetAllUserSnags(user.Id));
        }

        [HttpPost]
        public IActionResult Post(Snag snag)
        {
            snag.DateCreated = DateTime.Now;
            _snagRepo.Add(snag);
            return CreatedAtAction("Get", new { id = snag.Id }, snag);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Snag snag)
        {
            if (id != snag.Id)
            {
                return BadRequest();
            }
            snag.DateCreated = DateTime.Now;
            _snagRepo.Update(snag);
            return NoContent();
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var post = _snagRepo.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _snagRepo.Delete(id);
            return NoContent();
        }

        // private method to get the current user.
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
