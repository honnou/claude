# Multi-Device Setup (Supabase)

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (any name, any region)
3. Wait for the project to finish provisioning (~2 minutes)

## 2. Run the database migration

In your Supabase project, go to **SQL Editor** and run:

```sql
create table households (
  id         uuid primary key default gen_random_uuid(),
  form_data  jsonb not null default '{}',
  last_writer text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Allow public read/write (the UUID acts as the access token)
alter table households enable row level security;

create policy "public_access"
  on households for all
  using (true)
  with check (true);

-- Enable real-time for live sync
alter publication supabase_realtime add table households;
```

## 3. Get your credentials

In your Supabase project go to **Settings → API**:

- **Project URL** → `VITE_SUPABASE_URL`
- **anon / public key** → `VITE_SUPABASE_ANON_KEY`

## 4. Add environment variables to Vercel

In your Vercel project go to **Settings → Environment Variables** and add:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://your-project-ref.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `your-anon-key` |

Then **redeploy** the project (Vercel → Deployments → Redeploy).

## 5. Local development

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
# edit .env.local with your credentials
npm run dev
```

## How it works

- Each household gets a unique UUID-based URL (e.g. `https://yourapp.vercel.app/abc123-...`)
- The URL is the "key" — share it with your partners and they can join from any device
- Each device picks a partner slot and that identity is remembered locally
- Changes save automatically every ~800ms and sync to all other open devices in real time
- Data lives in Supabase; nothing is stored on any individual device beyond partner identity
