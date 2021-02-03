using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Ribboned.Models
{
    public class Ribbon
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }
        [Required]
        [MaxLength(500)]
        public string Decription { get; set; }
        [Required]
        public int CategoryId { get; set; }
        [Required]
        public int SourceId { get; set; }
        [Required]
        [MaxLength(255)]
        public string URL { get; set; }
        [MaxLength(255)]
        public string Thumbnail { get; set; }
        [Required]
        public bool IsActive { get; set; }
        [Required]
        public bool IsPublic { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
        public List<Snag> Snags { get; set; }
        public Category Category { get; set; }
    }
}
