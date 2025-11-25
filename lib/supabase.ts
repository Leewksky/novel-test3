import { createClient } from '@supabase/supabase-js';

// 这里加个 '!' 是告诉 TypeScript 这两个变量一定存在，别报错
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
