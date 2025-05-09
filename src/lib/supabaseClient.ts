import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 👇 使用类型别名，避免 TS 编译报错
type SupabaseClientType = SupabaseClient;

const globalForSupabase = globalThis as unknown as {
  supabase: SupabaseClientType | undefined;
};

// eslint-disable-next-line import/prefer-default-export
export const supabase = (
  globalForSupabase.supabase ?? createClient(supabaseUrl, supabaseAnonKey)
);

if (process.env.NODE_ENV !== 'production') {
  globalForSupabase.supabase = supabase;
}
