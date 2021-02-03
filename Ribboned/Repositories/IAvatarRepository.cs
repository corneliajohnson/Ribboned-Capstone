using Ribboned.Models;
using System.Collections.Generic;

namespace Ribboned.Repositories
{
    public interface IAvatarRepository
    {
        List<Avatar> GetAll();
    }
}
