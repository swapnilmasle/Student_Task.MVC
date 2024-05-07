using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project1.Migrations
{
    /// <inheritdoc />
    public partial class AddStudentComplaint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CountrysTb",
                columns: table => new
                {
                    CountryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CountryName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CountrysTb", x => x.CountryId);
                });

            migrationBuilder.CreateTable(
                name: "CitysTb",
                columns: table => new
                {
                    CityId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CityName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CountryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CitysTb", x => x.CityId);
                    table.ForeignKey(
                        name: "FK_CitysTb_CountrysTb_CountryId",
                        column: x => x.CountryId,
                        principalTable: "CountrysTb",
                        principalColumn: "CountryId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StudentsTb",
                columns: table => new
                {
                    StudentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Major = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExpectedYearGraduation = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StreetAddress1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StreetAddress2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CountryId = table.Column<int>(type: "int", nullable: false),
                    CityId = table.Column<int>(type: "int", nullable: false),
                    Region = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ZipCode = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<int>(type: "int", nullable: false),
                    PreferredContactCheackBox = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IssuesOccurredDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ComplaintDetailArea = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ResolveComplaintArea = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PriorattemptsArea = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ResolutionArea = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OtherInformationArea = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentsTb", x => x.StudentId);
                    table.ForeignKey(
                        name: "FK_StudentsTb_CitysTb_CityId",
                        column: x => x.CityId,
                        principalTable: "CitysTb",
                        principalColumn: "CityId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StudentsTb_CountrysTb_CountryId",
                        column: x => x.CountryId,
                        principalTable: "CountrysTb",
                        principalColumn: "CountryId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CitysTb_CountryId",
                table: "CitysTb",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentsTb_CityId",
                table: "StudentsTb",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentsTb_CountryId",
                table: "StudentsTb",
                column: "CountryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentsTb");

            migrationBuilder.DropTable(
                name: "CitysTb");

            migrationBuilder.DropTable(
                name: "CountrysTb");
        }
    }
}
