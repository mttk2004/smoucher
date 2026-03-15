# Product Requirements Document: Smoucher (Smart Voucher Management System)
Project Overview

Smoucher is a centralized Smart Voucher Management System for retail chains, built with a Spring Boot backend and React frontend. It emphasizes high-performance API integration with external POS/E-commerce systems.

## Tech Stack & Design Style

  - Tech Stack: Spring Boot (Backend), React (Frontend).

  - Design Style: Modern B2B SaaS, clean aesthetic (Shadcn UI / Tailwind CSS style).

  - Priorities: Data clarity, scannability, efficient rule management.

## Core Database Entities

  Users, Customers, Campaigns, Vouchers, Voucher_Customers, Voucher_Distributions, Voucher_Usages, API_Keys, API_Request_Logs.

## User Roles

  - ADMIN: Full access including API keys and user management.

  - STAFF: Restricted to voucher creation and reporting.

## Sitemap & Screen Requirements (11 Screens)
  **1. Analytics & Overview**

    - Dashboard: High-level metrics (Active Campaigns, Distributed Vouchers, Usage Rate, Budget) and charts.

    - Usage History: Detailed table of voucher_usages with external_order_id, branch locations, and discount amounts.

  **2. Campaigns & Vouchers**

    - Campaign List: Management of marketing campaigns with status badges (DRAFT, ACTIVE, PAUSED, ENDED).

    - Campaign Detail/Create: Form for budgeting, scheduling (Start/End dates), and descriptions.

    - Voucher Inventory: List of all unique codes with status filters.

    - Voucher Studio (Core): Complex rule builder.

      - Discount Type: Percentage vs Fixed.

      - Limits: Total max vs Max per customer.

      - Application Rules: JSONB selectors for products, categories, or branches.

      - Visibility: Public vs Private toggle.

  **3. Customer & Distribution**

    - Customer Directory: Linking internal IDs to External System IDs.

    - Distribution Center: Tracking Email/SMS logs and delivery status (PENDING, SENT, FAILED).

  **4. Developer & Admin Portal**

    - API Key Manager: Managing and hashing keys for external integrations.

    - API Request Logs: Real-time monitoring of API calls for debugging.

    - User Settings: Role-based access control (RBAC) settings.
