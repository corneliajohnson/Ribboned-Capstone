using System;
using System.ComponentModel.DataAnnotations;

namespace Ribboned.Models
{
    public class Snag
    {
        public int Id { get; set; }
        [Required]
        public int RibbonId { get; set; }
        [Required]
        [MaxLength(500)]
        public string Note { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
        [Required]
        public int Seconds { get; set; }
        [Required]
        public string TimeString { get; set; }
        public Ribbon Ribbon { get; set; }
    }
}
