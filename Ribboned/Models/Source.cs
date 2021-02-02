using System.ComponentModel.DataAnnotations;

namespace Ribboned.Models
{
    public class Source
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Type { get; set; }
    }
}
