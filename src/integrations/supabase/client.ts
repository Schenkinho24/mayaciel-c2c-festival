// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lgocvvrrrwxinvwjpzgb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxnb2N2dnJycnd4aW52d2pwemdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNTgzODAsImV4cCI6MjA1NjgzNDM4MH0.FBhRvTwLupQILx1tP1uHN0_J176Cd50YGOAmJAGlnwg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);