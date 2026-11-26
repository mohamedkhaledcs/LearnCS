using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LearnCS.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddCanonicalCurriculumSubscriptionsAndQuizPersistence : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "actor_user_id",
                schema: "platform",
                table: "audit_logs",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "details",
                schema: "platform",
                table: "audit_logs",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "category",
                schema: "gamification",
                table: "achievements",
                type: "character varying(80)",
                maxLength: 80,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "code",
                schema: "gamification",
                table: "achievements",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "description_ar",
                schema: "gamification",
                table: "achievements",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "threshold",
                schema: "gamification",
                table: "achievements",
                type: "integer",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.AddColumn<string>(
                name: "title_ar",
                schema: "gamification",
                table: "achievements",
                type: "character varying(150)",
                maxLength: 150,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "canonical_concepts",
                schema: "knowledge",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    title_en = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    title_ar = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    description_en = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    description_ar = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    domain = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    publish_status = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_canonical_concepts", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "curriculum_paths",
                schema: "learning",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    title_en = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    title_ar = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    description_en = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    description_ar = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    target_audience_en = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    target_audience_ar = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    category = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    display_order = table.Column<int>(type: "integer", nullable: false),
                    prerequisites_json = table.Column<string>(type: "text", nullable: true),
                    recommended_next_paths_json = table.Column<string>(type: "text", nullable: true),
                    publish_status = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_curriculum_paths", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "question_bank_items",
                schema: "assessment",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    domain = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    topic = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    subtopic = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    specialization = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: true),
                    difficulty = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    question_type = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    code_snippet = table.Column<string>(type: "text", nullable: true),
                    code_language = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: true),
                    question_en = table.Column<string>(type: "text", nullable: false),
                    question_ar = table.Column<string>(type: "text", nullable: false),
                    explanation_en = table.Column<string>(type: "text", nullable: true),
                    explanation_ar = table.Column<string>(type: "text", nullable: true),
                    tags_json = table.Column<string>(type: "text", nullable: false),
                    estimated_time_seconds = table.Column<int>(type: "integer", nullable: false),
                    publish_status = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_question_bank_items", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "subscription_history",
                schema: "platform",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    plan_id = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: false),
                    previous_plan_id = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: true),
                    action = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    billing_interval = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    status = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    performed_by_user_id = table.Column<Guid>(type: "uuid", nullable: true),
                    notes = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_subscription_history", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "subscription_plans",
                schema: "platform",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: false),
                    name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    badge = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: true),
                    description_en = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    description_ar = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    monthly_price = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: false),
                    original_monthly_price = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: true),
                    annual_price = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: false),
                    original_annual_price = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: true),
                    features_en_json = table.Column<string>(type: "text", nullable: false),
                    features_ar_json = table.Column<string>(type: "text", nullable: false),
                    entitlements_json = table.Column<string>(type: "text", nullable: false),
                    is_popular = table.Column<bool>(type: "boolean", nullable: false),
                    is_active = table.Column<bool>(type: "boolean", nullable: false),
                    display_order = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_subscription_plans", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "unit_quiz_attempts",
                schema: "assessment",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    scope = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    scope_id = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: false),
                    path_id = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    score = table.Column<decimal>(type: "numeric(8,2)", precision: 8, scale: 2, nullable: false),
                    max_score = table.Column<decimal>(type: "numeric(8,2)", precision: 8, scale: 2, nullable: false),
                    percentage = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    pass_threshold = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    passed = table.Column<bool>(type: "boolean", nullable: false),
                    is_completed = table.Column<bool>(type: "boolean", nullable: false),
                    question_ids_json = table.Column<string>(type: "text", nullable: false),
                    started_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    completed_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_unit_quiz_attempts", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user_section_progress",
                schema: "learning",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    unit_id = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    section_id = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: false),
                    is_completed = table.Column<bool>(type: "boolean", nullable: false),
                    checkpoint_passed = table.Column<bool>(type: "boolean", nullable: false),
                    time_spent_seconds = table.Column<int>(type: "integer", nullable: false),
                    completed_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_section_progress", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user_unit_progress",
                schema: "learning",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    unit_id = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    status = table.Column<int>(type: "integer", nullable: false),
                    mastery_score = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    time_spent_seconds = table.Column<int>(type: "integer", nullable: false),
                    started_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    completed_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    last_evaluated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_unit_progress", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "reusable_units",
                schema: "learning",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    concept_id = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    title_en = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    title_ar = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    description_en = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    description_ar = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    difficulty = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    estimated_minutes = table.Column<int>(type: "integer", nullable: false),
                    version = table.Column<int>(type: "integer", nullable: false),
                    is_free_tier = table.Column<bool>(type: "boolean", nullable: false),
                    tags_json = table.Column<string>(type: "text", nullable: false),
                    prerequisites_json = table.Column<string>(type: "text", nullable: true),
                    interactive_module_ids_json = table.Column<string>(type: "text", nullable: true),
                    external_references_json = table.Column<string>(type: "text", nullable: true),
                    objectives_en_json = table.Column<string>(type: "text", nullable: true),
                    objectives_ar_json = table.Column<string>(type: "text", nullable: true),
                    quiz_pass_percentage = table.Column<int>(type: "integer", nullable: false),
                    quiz_question_count = table.Column<int>(type: "integer", nullable: false),
                    publish_status = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reusable_units", x => x.id);
                    table.ForeignKey(
                        name: "FK_reusable_units_canonical_concepts_concept_id",
                        column: x => x.concept_id,
                        principalSchema: "knowledge",
                        principalTable: "canonical_concepts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "curriculum_modules",
                schema: "learning",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    path_id = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    title_en = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    title_ar = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    description_en = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    description_ar = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    display_order = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_curriculum_modules", x => x.id);
                    table.ForeignKey(
                        name: "FK_curriculum_modules_curriculum_paths_path_id",
                        column: x => x.path_id,
                        principalSchema: "learning",
                        principalTable: "curriculum_paths",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "question_bank_options",
                schema: "assessment",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    question_id = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    option_key = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    text_en = table.Column<string>(type: "text", nullable: false),
                    text_ar = table.Column<string>(type: "text", nullable: false),
                    is_correct = table.Column<bool>(type: "boolean", nullable: false),
                    display_order = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_question_bank_options", x => x.id);
                    table.ForeignKey(
                        name: "FK_question_bank_options_question_bank_items_question_id",
                        column: x => x.question_id,
                        principalSchema: "assessment",
                        principalTable: "question_bank_items",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_subscriptions",
                schema: "platform",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    plan_id = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: false),
                    status = table.Column<int>(type: "integer", nullable: false),
                    billing_interval = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    started_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    expires_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    assigned_by_user_id = table.Column<Guid>(type: "uuid", nullable: true),
                    payment_status = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: true),
                    notes = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_subscriptions", x => x.id);
                    table.ForeignKey(
                        name: "FK_user_subscriptions_subscription_plans_plan_id",
                        column: x => x.plan_id,
                        principalSchema: "platform",
                        principalTable: "subscription_plans",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "unit_quiz_attempt_answers",
                schema: "assessment",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    attempt_id = table.Column<Guid>(type: "uuid", nullable: false),
                    question_id = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    selected_option_keys_json = table.Column<string>(type: "text", nullable: false),
                    is_correct = table.Column<bool>(type: "boolean", nullable: false),
                    points_earned = table.Column<int>(type: "integer", nullable: false),
                    answered_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_unit_quiz_attempt_answers", x => x.id);
                    table.ForeignKey(
                        name: "FK_unit_quiz_attempt_answers_unit_quiz_attempts_attempt_id",
                        column: x => x.attempt_id,
                        principalSchema: "assessment",
                        principalTable: "unit_quiz_attempts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "unit_question_mappings",
                schema: "learning",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    unit_id = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    section_id = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: true),
                    question_id = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    display_order = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_unit_question_mappings", x => x.id);
                    table.ForeignKey(
                        name: "FK_unit_question_mappings_question_bank_items_question_id",
                        column: x => x.question_id,
                        principalSchema: "assessment",
                        principalTable: "question_bank_items",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_unit_question_mappings_reusable_units_unit_id",
                        column: x => x.unit_id,
                        principalSchema: "learning",
                        principalTable: "reusable_units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "unit_sections",
                schema: "learning",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: false),
                    unit_id = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    title_en = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    title_ar = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    content_en = table.Column<string>(type: "text", nullable: false),
                    content_ar = table.Column<string>(type: "text", nullable: false),
                    code_snippet = table.Column<string>(type: "text", nullable: true),
                    code_language = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: true),
                    code_explanation_en = table.Column<string>(type: "text", nullable: true),
                    code_explanation_ar = table.Column<string>(type: "text", nullable: true),
                    expected_output = table.Column<string>(type: "text", nullable: true),
                    interactive_module_id = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    inline_questions_json = table.Column<string>(type: "text", nullable: true),
                    display_order = table.Column<int>(type: "integer", nullable: false),
                    is_required = table.Column<bool>(type: "boolean", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_unit_sections", x => x.id);
                    table.ForeignKey(
                        name: "FK_unit_sections_reusable_units_unit_id",
                        column: x => x.unit_id,
                        principalSchema: "learning",
                        principalTable: "reusable_units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "module_unit_placements",
                schema: "learning",
                columns: table => new
                {
                    module_id = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    unit_id = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    display_order = table.Column<int>(type: "integer", nullable: false),
                    is_optional = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_module_unit_placements", x => new { x.module_id, x.unit_id });
                    table.ForeignKey(
                        name: "FK_module_unit_placements_curriculum_modules_module_id",
                        column: x => x.module_id,
                        principalSchema: "learning",
                        principalTable: "curriculum_modules",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_module_unit_placements_reusable_units_unit_id",
                        column: x => x.unit_id,
                        principalSchema: "learning",
                        principalTable: "reusable_units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_audit_logs_actor_user_id",
                schema: "platform",
                table: "audit_logs",
                column: "actor_user_id");

            migrationBuilder.CreateIndex(
                name: "ix_achievements_code",
                schema: "gamification",
                table: "achievements",
                column: "code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_curriculum_modules_path_id",
                schema: "learning",
                table: "curriculum_modules",
                column: "path_id");

            migrationBuilder.CreateIndex(
                name: "IX_module_unit_placements_unit_id",
                schema: "learning",
                table: "module_unit_placements",
                column: "unit_id");

            migrationBuilder.CreateIndex(
                name: "ix_qbank_difficulty",
                schema: "assessment",
                table: "question_bank_items",
                column: "difficulty");

            migrationBuilder.CreateIndex(
                name: "ix_qbank_taxonomy",
                schema: "assessment",
                table: "question_bank_items",
                columns: new[] { "domain", "topic", "subtopic" });

            migrationBuilder.CreateIndex(
                name: "ix_qbank_options_question_id",
                schema: "assessment",
                table: "question_bank_options",
                column: "question_id");

            migrationBuilder.CreateIndex(
                name: "ix_reusable_units_concept_id",
                schema: "learning",
                table: "reusable_units",
                column: "concept_id");

            migrationBuilder.CreateIndex(
                name: "ix_subscription_history_user_id",
                schema: "platform",
                table: "subscription_history",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_unit_question_mapping_unique",
                schema: "learning",
                table: "unit_question_mappings",
                columns: new[] { "unit_id", "question_id", "section_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_unit_question_mappings_question_id",
                schema: "learning",
                table: "unit_question_mappings",
                column: "question_id");

            migrationBuilder.CreateIndex(
                name: "ix_unit_quiz_attempt_answers_attempt_id",
                schema: "assessment",
                table: "unit_quiz_attempt_answers",
                column: "attempt_id");

            migrationBuilder.CreateIndex(
                name: "ix_unit_quiz_attempts_user_scope",
                schema: "assessment",
                table: "unit_quiz_attempts",
                columns: new[] { "user_id", "scope", "scope_id" });

            migrationBuilder.CreateIndex(
                name: "ix_unit_sections_unit_id",
                schema: "learning",
                table: "unit_sections",
                column: "unit_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_section_progress_user_section",
                schema: "learning",
                table: "user_section_progress",
                columns: new[] { "user_id", "section_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_user_section_progress_user_unit",
                schema: "learning",
                table: "user_section_progress",
                columns: new[] { "user_id", "unit_id" });

            migrationBuilder.CreateIndex(
                name: "IX_user_subscriptions_plan_id",
                schema: "platform",
                table: "user_subscriptions",
                column: "plan_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_subscriptions_user_id",
                schema: "platform",
                table: "user_subscriptions",
                column: "user_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_user_unit_progress_user_unit",
                schema: "learning",
                table: "user_unit_progress",
                columns: new[] { "user_id", "unit_id" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "module_unit_placements",
                schema: "learning");

            migrationBuilder.DropTable(
                name: "question_bank_options",
                schema: "assessment");

            migrationBuilder.DropTable(
                name: "subscription_history",
                schema: "platform");

            migrationBuilder.DropTable(
                name: "unit_question_mappings",
                schema: "learning");

            migrationBuilder.DropTable(
                name: "unit_quiz_attempt_answers",
                schema: "assessment");

            migrationBuilder.DropTable(
                name: "unit_sections",
                schema: "learning");

            migrationBuilder.DropTable(
                name: "user_section_progress",
                schema: "learning");

            migrationBuilder.DropTable(
                name: "user_subscriptions",
                schema: "platform");

            migrationBuilder.DropTable(
                name: "user_unit_progress",
                schema: "learning");

            migrationBuilder.DropTable(
                name: "curriculum_modules",
                schema: "learning");

            migrationBuilder.DropTable(
                name: "question_bank_items",
                schema: "assessment");

            migrationBuilder.DropTable(
                name: "unit_quiz_attempts",
                schema: "assessment");

            migrationBuilder.DropTable(
                name: "reusable_units",
                schema: "learning");

            migrationBuilder.DropTable(
                name: "subscription_plans",
                schema: "platform");

            migrationBuilder.DropTable(
                name: "curriculum_paths",
                schema: "learning");

            migrationBuilder.DropTable(
                name: "canonical_concepts",
                schema: "knowledge");

            migrationBuilder.DropIndex(
                name: "ix_audit_logs_actor_user_id",
                schema: "platform",
                table: "audit_logs");

            migrationBuilder.DropIndex(
                name: "ix_achievements_code",
                schema: "gamification",
                table: "achievements");

            migrationBuilder.DropColumn(
                name: "actor_user_id",
                schema: "platform",
                table: "audit_logs");

            migrationBuilder.DropColumn(
                name: "details",
                schema: "platform",
                table: "audit_logs");

            migrationBuilder.DropColumn(
                name: "category",
                schema: "gamification",
                table: "achievements");

            migrationBuilder.DropColumn(
                name: "code",
                schema: "gamification",
                table: "achievements");

            migrationBuilder.DropColumn(
                name: "description_ar",
                schema: "gamification",
                table: "achievements");

            migrationBuilder.DropColumn(
                name: "threshold",
                schema: "gamification",
                table: "achievements");

            migrationBuilder.DropColumn(
                name: "title_ar",
                schema: "gamification",
                table: "achievements");
        }
    }
}
