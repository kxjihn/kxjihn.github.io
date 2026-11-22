-- 그들의 발자취를 따라서: 카카오 로그인 사용자의 스탬프 기록 (좌표는 저장하지 않음)
create table if not exists public.footsteps_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  stamps jsonb not null default '{}'::jsonb,
  done_at text,
  updated_at timestamptz not null default now()
);
alter table public.footsteps_progress enable row level security;
create policy "own row select" on public.footsteps_progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "own row insert" on public.footsteps_progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "own row update" on public.footsteps_progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "own row delete" on public.footsteps_progress for delete to authenticated using ((select auth.uid()) = user_id);
