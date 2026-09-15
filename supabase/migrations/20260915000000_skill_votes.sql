-- Upvotes: one vote per signed-in (GitHub) user per skill.
-- Vote counts are public through skill_vote_counts(); who voted stays private.

create table if not exists public.skill_votes (
  skill_slug text not null check (skill_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (skill_slug, user_id)
);

alter table public.skill_votes enable row level security;

create policy "Users can read their own votes"
  on public.skill_votes for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can add their own vote"
  on public.skill_votes for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can remove their own vote"
  on public.skill_votes for delete to authenticated
  using ((select auth.uid()) = user_id);

create or replace function public.skill_vote_counts()
returns table (skill_slug text, votes bigint)
language sql
stable
security definer
set search_path = ''
as $$
  select v.skill_slug, count(*) as votes
  from public.skill_votes v
  group by v.skill_slug;
$$;

revoke all on function public.skill_vote_counts() from public;
grant execute on function public.skill_vote_counts() to anon, authenticated;
