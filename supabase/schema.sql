-- Run this in the Supabase SQL Editor once to set up the schema.
-- Dashboard → SQL Editor → New query → paste → Run

-- ---------------------------------------------------------------
-- paid_users
-- Inserted by the Stripe webhook (checkout.session.completed) and
-- by verify-session after a successful Stripe redirect.
-- ---------------------------------------------------------------
create table if not exists public.paid_users (
  id                uuid        default gen_random_uuid() primary key,
  email             text        unique not null,
  stripe_session_id text,
  created_at        timestamptz default now() not null
);

alter table public.paid_users enable row level security;

-- Service-role (used by API routes / webhook) can do anything.
-- Anon / authenticated roles have no direct access — all reads go
-- through /api/auth/check-paid which uses the service-role client.
