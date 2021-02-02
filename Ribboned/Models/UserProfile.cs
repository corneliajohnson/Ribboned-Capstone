using System.ComponentModel.DataAnnotations;

namespace Ribboned.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string UserName {get; set;}
        [Required]
        [MaxLength(100)]
        public string Email { get; set; }
        [MaxLength(255)]
        public string ImageUrl { get; set; }
        public string FirebaseUserId { get; set; }
        public int UncategorizedId { get; set; }
    }
}
