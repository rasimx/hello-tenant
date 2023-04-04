import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = import.meta.env.SUPABASE_URL
const supabaseUrl = 'https://ibmnqeuvkyomzkkukyox.supabase.co'
// const supabaseAnonKey = import.meta.env.SUPABASE_PUBLIC_KEY
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlibW5xZXV2a3lvbXpra3VreW94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAwMjUzMzUsImV4cCI6MTk5NTYwMTMzNX0.OGALrhpJRxtVbKa8p2RbOak7VfsTJBs3Fq5H5dSq56Y'


export const supabase = createClient(supabaseUrl, supabaseAnonKey)