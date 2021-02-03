using Ribboned.Data;
using Ribboned.Models;
using System.Collections.Generic;
using System.Linq;

namespace Ribboned.Repositories
{
    public class AvatarRepository : IAvatarRepository
    {
        private readonly ApplicationDbContext _context;

        public AvatarRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Avatar> GetAll()
        {
            return _context.Avatar.ToList();
        }
    }
}
