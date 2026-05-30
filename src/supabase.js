import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oqrxwwcxpduxqvyeatni.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcnh3d2N4cGR1eHF2eWVhdG5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMjYzMjUsImV4cCI6MjA5NTcwMjMyNX0.-cDF_UN2LmlilXAoNxaEBQam4A-q45reEtIrGlcnoAo';

export const supabase = createClient(supabaseUrl, supabaseKey);
