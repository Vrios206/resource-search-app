import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project-id.supabase.co' // replace with your URL
const supabaseKey = 'your-anon-key' // replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseKey)
