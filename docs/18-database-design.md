# Database Design

**Project:** LearnCS  
**Document ID:** DOC-018  
**Version:** 1.0.0  
**Status:** Draft  
**Owner:** Founder  
**Phase:** Database Design

---

# 1. Purpose

This document defines the database structure of LearnCS.

It describes all database tables, their purpose, relationships, and responsibilities.

This document does not contain SQL code.

The SQL implementation will be provided in a separate file.

---

# 2. Database Technology

Database Engine

- Microsoft SQL Server

Database Type

- Relational Database

Primary Key

- UNIQUEIDENTIFIER (UUID)

Naming Convention

- snake_case

Soft Delete

- Supported

Timezone

- UTC

---

# 3. Modules

The database is divided into the following modules.

- Authentication
- User Management
- Learning Content
- Knowledge Graph
- Assessment
- Competency
- Roadmap
- Recommendation
- Progress Tracking
- AI Mentor
- Achievement System
- Notification System

---

# 4. Authentication Module

## Users

Purpose

Stores authentication and account information.

Relationships

- One User has one Learner Profile.
- One User has many Assessment Attempts.
- One User has many Learning Sessions.
- One User has many Notifications.
- One User has many AI Conversations.
- One User has many Achievements.

---

## Roles

Purpose

Stores available system roles.

Examples

- Super Admin
- Admin
- Instructor
- Learner

Relationships

- One Role belongs to many Users.

---

## UserRoles

Purpose

Maps users to their assigned roles.

---

# 5. User Management Module

## LearnerProfiles

Purpose

Stores learner personal information and learning preferences.

Relationships

- Belongs to one User.

---

## LearningGoals

Purpose

Stores available learning goals.

Examples

- Become Frontend Developer
- Become Backend Developer
- ICPC Preparation
- Interview Preparation

---

## ExperienceLevels

Purpose

Stores learner experience levels.

Examples

- Beginner
- Intermediate
- Advanced

---

# 6. Knowledge Graph Module

## Domains

Purpose

Stores major Computer Science domains.

Examples

- Programming
- Algorithms
- Operating Systems
- Databases
- Networking

Relationships

- One Domain has many Topics.

---

## Topics

Purpose

Stores learning topics.

Relationships

- Belongs to one Domain.
- Has many Resources.
- Has many Questions.
- Has many Competencies.
- Has many Recommendations.

---

## TopicPrerequisites

Purpose

Defines prerequisite relationships between topics.

Relationship

Many-to-Many between Topics.

---

# 7. Learning Content Module

## Resources

Purpose

Stores learning resources.

Examples

- Video
- Article
- Documentation
- PDF
- Book
- Coding Problem

---

## ResourceTopics

Purpose

Connects resources to topics.

Relationship

Many-to-Many.

---

# 8. Assessment Module

## Assessments

Purpose

Stores assessment definitions.

---

## Questions

Purpose

Stores all assessment questions.

Question Types

- Multiple Choice
- True / False
- Coding
- Short Answer

---

## AssessmentQuestions

Purpose

Connects assessments with questions.

Relationship

Many-to-Many.

---

## AssessmentAttempts

Purpose

Stores learner assessment attempts.

Relationships

- Belongs to one User.
- Belongs to one Assessment.

---

## Answers

Purpose

Stores submitted answers.

Relationships

- Belongs to one Attempt.
- References one Question.

---

# 9. Competency Module

## Competencies

Purpose

Stores competency level for every learner and topic.

Relationships

- Belongs to one User.
- Belongs to one Topic.

---

# 10. Roadmap Module

## Roadmaps

Purpose

Stores learner roadmap.

Relationship

One User owns one active Roadmap.

---

## RoadmapSteps

Purpose

Stores roadmap items.

Relationship

Each step references one Topic.

---

# 11. Recommendation Module

## Recommendations

Purpose

Stores personalized recommendations.

Relationship

Belongs to one User.

---

# 12. Progress Tracking Module

## LearningSessions

Purpose

Stores learner study sessions.

Relationship

Belongs to one User.

---

## Progress

Purpose

Stores learner progress.

Examples

- Completion Percentage
- Completed Topics
- Current Roadmap Position

---

# 13. AI Mentor Module

## AIConversations

Purpose

Stores AI chat sessions.

Relationship

Belongs to one User.

---

## AIMessages

Purpose

Stores messages inside every AI conversation.

Relationship

Belongs to one AI Conversation.

---

# 14. Achievement Module

## Achievements

Purpose

Stores available achievements.

Examples

- First Assessment
- Seven Day Streak
- Completed First Roadmap

---

## UserAchievements

Purpose

Stores earned achievements.

Relationship

Many-to-Many between Users and Achievements.

---

# 15. Notification Module

## Notifications

Purpose

Stores learner notifications.

Examples

- Reminder
- Achievement
- Recommendation
- Announcement

Relationship

Belongs to one User.

---

# 16. Common Fields

Most tables include the following fields.

- id
- created_at
- updated_at

Some tables also include

- deleted_at
- status
- is_active

---

# 17. Summary

The LearnCS database is organized into independent modules to simplify maintenance, scalability, and future expansion.

The SQL implementation of these tables will be provided in the next document.

---

# Next Document

**DOC-019, SQL Database Schema**

This document will contain the complete SQL Server implementation, including:

- CREATE TABLE
- PRIMARY KEY
- FOREIGN KEY
- INDEXES
- CONSTRAINTS