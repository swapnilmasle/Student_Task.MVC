namespace Project1.Models.DTO
{
    public class UpdateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Major { get; set; }
        public string ExpectedYearGraduation { get; set; }
        public string StreetAddress1 { get; set; }
        public string StreetAddress2 { get; set; }

        public int? CountryId { get; set; }

        public int? CityId { get; set; }

        public string Region { get; set; }
        public string? ZipCode { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string PreferredContactCheackBox { get; set; }

        //Information about your complaint

        public DateTime? IssuesOccurredDate { get; set; }
        public string? NameofPersonInvolved { get; set; }
        public string? ComplaintDetialArea { get; set; }
        public string? ResolveComplaintArea { get; set; }
        public string? PriorattemptsArea { get; set; }
        public string? ResolutionArea { get; set; }
        public string? OtherInformationArea { get; set; }
    }
}
