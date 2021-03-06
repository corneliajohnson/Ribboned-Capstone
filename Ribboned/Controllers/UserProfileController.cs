﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ribboned.Models;
using Ribboned.Repositories;
using System.Security.Claims;

namespace Ribboned.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepo;
        private readonly ICategoryRepository _categoryRepo;
        public UserProfileController(IUserProfileRepository userProfileRepo, ICategoryRepository categoryRepo)
        {
            _userProfileRepo = userProfileRepo;
            _categoryRepo = categoryRepo;
        }

        [HttpPost]
        public IActionResult Post(UserProfile up)
        {
            _userProfileRepo.Add(up);

            //add a category for all new users
            var category = new Category()
            {
                Name = "uncategorized",
                UserProfileId = up.Id
            };

            _categoryRepo.Add(category);
            CreatedAtAction("Get", new { category = category.Id }, category);

            up.AvatarId = 1; //add a default image for all new users
            up.UncategorizedId = category.Id;
            _userProfileRepo.Update(up);

            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = up.FirebaseUserId },
                up);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile up)
        { 
            if (id != up.Id)
            {
                return BadRequest();
            }

            _userProfileRepo.Update(up);
            return NoContent();
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepo.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("userId/{Id}")]
        public IActionResult GetUserProfileById(int id)
        {
            return Ok(_userProfileRepo.GetById(id));
        }


        // private method to get the current user.
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
