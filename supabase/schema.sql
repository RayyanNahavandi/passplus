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
  confirmed         boolean     default true not null,
  created_at        timestamptz default now() not null
);

-- If upgrading an existing table, run this to add the confirmed column:
-- alter table public.paid_users add column if not exists confirmed boolean default true not null;

alter table public.paid_users enable row level security;

-- Service-role (used by API routes / webhook) can do anything.
-- Anon / authenticated roles have no direct access — all reads go
-- through /api/auth/check-paid which uses the service-role client.

-- ---------------------------------------------------------------
-- presence
-- Anonymous heartbeats from the quiz page, powering the live
-- "studying right now" counter. Rows older than a day are pruned
-- opportunistically by /api/presence.
-- ---------------------------------------------------------------
create table if not exists public.presence (
  id        text        primary key,
  last_seen timestamptz default now() not null
);

create index if not exists presence_last_seen_idx on public.presence (last_seen);

alter table public.presence enable row level security;
-- No anon/authenticated policies: all access goes through
-- /api/presence which uses the service-role client.
