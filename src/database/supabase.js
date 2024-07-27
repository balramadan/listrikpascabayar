import { createClient } from '@supabase/supabase-js'

/**
 * Inisialisasi klien Supabase.
 *
 * @param {string} url - URL Supabase.
 * @param {string} key - Kunci API Supabase.
 * @returns {object} - Klien Supabase yang diinisialisasi.
 */
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

export default supabase;