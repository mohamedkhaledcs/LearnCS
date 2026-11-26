using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LearnCS.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixUpdatedAtColumnNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "gamification",
                table: "user_xp_events",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "gamification",
                table: "user_achievements",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "knowledge",
                table: "tags",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "identity",
                table: "refresh_tokens",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "knowledge",
                table: "concept_relationships",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "career",
                table: "career_recommendations",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "career",
                table: "career_question_options",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "career",
                table: "career_factors",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "platform",
                table: "audit_logs",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "platform",
                table: "ai_messages",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "platform",
                table: "ai_context_snapshots",
                newName: "updated_at");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "updated_at",
                schema: "gamification",
                table: "user_xp_events",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                schema: "gamification",
                table: "user_achievements",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                schema: "knowledge",
                table: "tags",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                schema: "identity",
                table: "refresh_tokens",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                schema: "knowledge",
                table: "concept_relationships",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                schema: "career",
                table: "career_recommendations",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                schema: "career",
                table: "career_question_options",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                schema: "career",
                table: "career_factors",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                schema: "platform",
                table: "audit_logs",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                schema: "platform",
                table: "ai_messages",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                schema: "platform",
                table: "ai_context_snapshots",
                newName: "UpdatedAt");
        }
    }
}
