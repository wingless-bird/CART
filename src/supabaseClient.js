import { createClient } from '@supabase/supabase-js';

// Clean URL format with no extra folders or trailing slashes
const SUPABASE_URL = 'https://yzvaeyyrzikgiotkfztm.supabase.co'; 

// Use your long PUBLISHABLE / ANON PUBLIC key here (the one starting with eyJ)
const SUPABASE_ANON_KEY = 'sb_publishable_6YMeCDJsLNdRc5-2f39HMg_55B53064';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
