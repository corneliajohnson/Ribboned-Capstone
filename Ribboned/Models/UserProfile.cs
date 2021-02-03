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
        [Required]
        public int AvatarId { get; set; }
        public string FirebaseUserId { get; set; }
        public int UncategorizedId { get; set; }

        public Avatar Avatar { get; set; }
    }
}
