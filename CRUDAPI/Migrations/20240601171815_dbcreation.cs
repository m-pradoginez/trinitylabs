﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace CRUDAPI.Migrations
{
    public partial class dbcreation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RazaoSocial = table.Column<string>(nullable: true),
                    NomeFantasia = table.Column<string>(nullable: true),
                    CPFCNPJ = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Customers");
        }
    }
}
