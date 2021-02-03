using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Ribboned.Models
{
    public class Avatar
    {
        public int Id { get; set; }
        [Required]
        public string ImageURL { get; set; }
    }
}
