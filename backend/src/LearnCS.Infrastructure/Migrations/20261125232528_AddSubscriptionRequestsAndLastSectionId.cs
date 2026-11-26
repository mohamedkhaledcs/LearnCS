using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LearnCS.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddSubscriptionRequestsAndLastSectionId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "last_section_id",
                schema: "learning",
                table: "user_unit_progress",
                type: "character varying(160)",
                maxLength: 160,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "subscription_requests",
                schema: "platform",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    requested_plan_id = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: false),
                    previous_active_plan_id = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: true),
                    billing_interval = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    status = table.Column<int>(type: "integer", nullable: false),
                    notes = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    reviewed_by_user_id = table.Column<Guid>(type: "uuid", nullable: true),
                    reviewed_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_subscription_requests", x => x.id);
                    table.ForeignKey(
                        name: "FK_subscription_requests_subscription_plans_requested_plan_id",
                        column: x => x.requested_plan_id,
                        principalSchema: "platform",
                        principalTable: "subscription_plans",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_subscription_requests_requested_plan_id",
                schema: "platform",
                table: "subscription_requests",
                column: "requested_plan_id");

            migrationBuilder.CreateIndex(
                name: "ix_subscription_requests_status_created",
                schema: "platform",
                table: "subscription_requests",
                columns: new[] { "status", "created_at" });

            migrationBuilder.CreateIndex(
                name: "ix_subscription_requests_user_active_pending",
                schema: "platform",
                table: "subscription_requests",
                column: "user_id",
                unique: true,
                filter: "status = 0");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "subscription_requests",
                schema: "platform");

            migrationBuilder.DropColumn(
                name: "last_section_id",
                schema: "learning",
                table: "user_unit_progress");
        }
    }
}
