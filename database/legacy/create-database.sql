/*
===============================================================================
Project     : LearnCS
Database    : Microsoft SQL Server 2022
Description : Creates the LearnCS database and configures the required
              database-level settings for the entire application.
===============================================================================
*/

SET NOCOUNT ON;
GO

-- =============================================================================
-- Create Database
-- =============================================================================

IF DB_ID(N'LearnCS') IS NULL
BEGIN
    CREATE DATABASE LearnCS;
END;
GO

USE LearnCS;
GO

-- =============================================================================
-- Database Compatibility Level
-- SQL Server 2022 (160)
-- =============================================================================

ALTER DATABASE LearnCS
SET COMPATIBILITY_LEVEL = 160;
GO

-- =============================================================================
-- Database Configuration
-- =============================================================================

ALTER DATABASE LearnCS SET ANSI_NULL_DEFAULT OFF;
ALTER DATABASE LearnCS SET ANSI_NULLS ON;
ALTER DATABASE LearnCS SET ANSI_PADDING ON;
ALTER DATABASE LearnCS SET ANSI_WARNINGS ON;
ALTER DATABASE LearnCS SET AUTO_CLOSE OFF;
ALTER DATABASE LearnCS SET AUTO_SHRINK OFF;
ALTER DATABASE LearnCS SET AUTO_UPDATE_STATISTICS ON;
ALTER DATABASE LearnCS SET QUOTED_IDENTIFIER ON;
ALTER DATABASE LearnCS SET READ_COMMITTED_SNAPSHOT ON;
GO

