using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarLot.Catalog.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SimplifyEfCore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarEquipment_Equipment_EquipmentId",
                table: "CarEquipment");

            migrationBuilder.DropForeignKey(
                name: "FK_Equipment_EquipmentCategories_CategoryId",
                table: "Equipment");

            migrationBuilder.DropTable(
                name: "EquipmentCategories");

            migrationBuilder.DropIndex(
                name: "IX_Equipment_CategoryId",
                table: "Equipment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CarEquipment",
                table: "CarEquipment");

            migrationBuilder.DropIndex(
                name: "IX_CarEquipment_CarId",
                table: "CarEquipment");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Equipment");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "CarEquipment");

            migrationBuilder.RenameColumn(
                name: "PowerHP",
                table: "Cars",
                newName: "PowerHp");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CarEquipment",
                table: "CarEquipment",
                columns: new[] { "CarId", "EquipmentId" });

            migrationBuilder.AddForeignKey(
                name: "FK_CarEquipment_Equipment_EquipmentId",
                table: "CarEquipment",
                column: "EquipmentId",
                principalTable: "Equipment",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarEquipment_Equipment_EquipmentId",
                table: "CarEquipment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CarEquipment",
                table: "CarEquipment");

            migrationBuilder.RenameColumn(
                name: "PowerHp",
                table: "Cars",
                newName: "PowerHP");

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "Equipment",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "CarEquipment",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_CarEquipment",
                table: "CarEquipment",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "EquipmentCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EquipmentCategories", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Equipment_CategoryId",
                table: "Equipment",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_CarEquipment_CarId",
                table: "CarEquipment",
                column: "CarId");

            migrationBuilder.AddForeignKey(
                name: "FK_CarEquipment_Equipment_EquipmentId",
                table: "CarEquipment",
                column: "EquipmentId",
                principalTable: "Equipment",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Equipment_EquipmentCategories_CategoryId",
                table: "Equipment",
                column: "CategoryId",
                principalTable: "EquipmentCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
