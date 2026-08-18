using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarLot.Listings.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddListingFkToEquipment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Equipments_Listings_ListingId",
                table: "Equipments");

            migrationBuilder.DropIndex(
                name: "IX_Equipments_ListingId",
                table: "Equipments");

            migrationBuilder.DropColumn(
                name: "ListingId",
                table: "Equipments");

            migrationBuilder.CreateTable(
                name: "EquipmentListing",
                columns: table => new
                {
                    EquipmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ListingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EquipmentListing", x => new { x.EquipmentId, x.ListingId });
                    table.ForeignKey(
                        name: "FK_EquipmentListing_Equipments_EquipmentId",
                        column: x => x.EquipmentId,
                        principalTable: "Equipments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EquipmentListing_Listings_ListingId",
                        column: x => x.ListingId,
                        principalTable: "Listings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EquipmentListing_ListingId",
                table: "EquipmentListing",
                column: "ListingId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EquipmentListing");

            migrationBuilder.AddColumn<Guid>(
                name: "ListingId",
                table: "Equipments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Equipments_ListingId",
                table: "Equipments",
                column: "ListingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Equipments_Listings_ListingId",
                table: "Equipments",
                column: "ListingId",
                principalTable: "Listings",
                principalColumn: "Id");
        }
    }
}
