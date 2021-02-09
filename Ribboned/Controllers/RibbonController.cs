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
    public class RibbonController : Controller
    {
        private readonly IRibbonRepository _ribbonRepo;
        private readonly IUserProfileRepository _userRepo;
        private readonly ICategoryRepository _categoryRepo;
        public RibbonController(IRibbonRepository ribbonRepo, IUserProfileRepository userRepo, ICategoryRepository categoryRepo)
        {
            _ribbonRepo = ribbonRepo;
            _userRepo = userRepo;
            _categoryRepo = categoryRepo;
        }

        [HttpPost]
        public IActionResult Post(Ribbon ribbon)
        {
            ribbon.DateCreated = DateTime.Now;
            _ribbonRepo.Add(ribbon);
            return CreatedAtAction("Get", new { id = ribbon.Id }, ribbon);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Ribbon ribbon)
        {
            var r = _ribbonRepo.GetById(id);
            // var currentUser = GetCurrentUserProfile();
            //check that ribbon exist and belongs to user
            if (r == null)
            {
                return NotFound();
            }

            if (id != ribbon.Id)
            {
                return BadRequest();
            }

            _ribbonRepo.Update(ribbon);
            return NoContent();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var ribbon = _ribbonRepo.GetById(id);
            if (ribbon == null)
            {
                return NotFound();
            }
            return Ok(ribbon);
        }

        [HttpGet("getbyuser/{id}")]
        public IActionResult GetByUser(int id)
        {

            //check that user exist
            var user = _userRepo.GetById(id);
            if (user == null)
            {
                BadRequest();
            }
            var ribbons = _ribbonRepo.GetByUserId(id);
            return Ok(ribbons);
        }

        [HttpGet("getbycategory/{id}")]
        public IActionResult GetByCategory(int id)
        {
            //check that category exist
            var category = _categoryRepo.GetById(id);
            if (category == null)
            {
                BadRequest();
            }

            var ribbons = _ribbonRepo.GetByCategory(id);
            return Ok(ribbons);
        }

        [HttpGet("getusertrash/{id}")]
        public IActionResult GetUserTrash(int id)
        {
            //check that category exist
            var user = _userRepo.GetById(id);
            if (user == null)
            {
                BadRequest();
            }
            var ribbons = _ribbonRepo.GetUserTrash(id);
            return Ok(ribbons);
        }


        [HttpGet("mostrecentribbons/{id}")]
        public IActionResult GetMostRecentRibbons(int userId)
        {
            //check that user exist
            var user = _userRepo.GetById(userId);
            if (user == null)
            {
                BadRequest();
            }
            var ribbons = _ribbonRepo.GetByMostRecentRibbons(userId);
            return Ok(ribbons);
        }

        [HttpGet("recommendedribbons/{id}")]
        public IActionResult GetRecommendedRibbons(int userId)
        {
            var currentUser = GetCurrentUserProfile();
            //check that user exist
            var user = _userRepo.GetById(userId);
            if (user == null)
            {
                BadRequest();
            }
            var ribbons = _ribbonRepo.GetRecommendedRibbons(currentUser.Id);
            return Ok(ribbons);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var r = _ribbonRepo.GetById(id);
            //var currentUser = GetCurrentUserProfile();
            //check that ribbon exist and belongs to user
            if (r == null)
            {
                return NotFound();
            }
            _ribbonRepo.Delete(id);
            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult Search(string q)
        {
            var user = GetCurrentUserProfile();
            return Ok(_ribbonRepo.Search(q, user.Id));
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
