﻿using Microsoft.EntityFrameworkCore;
using Ribboned.Data;
using Ribboned.Models;
using System.Collections.Generic;
using System.Linq;

namespace Ribboned.Repositories
{
    public class UserProfileRepository : IUserProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                .Include(up => up.Avatar)
                .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);

        }

        public List<UserProfile> GetAll()
        {
            return _context.UserProfile.Include(up => up.Avatar).ToList();
        }

        public void Add(UserProfile up)
        {
            _context.Add(up);
            _context.SaveChanges();
        }

        public void Update(UserProfile up)
        {
            _context.Entry(up).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public UserProfile GetByFireBaseId(string firebaseUserId)
        {
            return _context.UserProfile
                .Include(up => up.Avatar)
                .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public UserProfile GetById(int id)
        {
            return _context.UserProfile
                .Include(up => up.Avatar)
                .FirstOrDefault(up => up.Id == id);
        }
    }
}
