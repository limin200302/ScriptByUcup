import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://etfbdevjytilaykogzwa.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0ZmJkZXZqeXRpbGF5a29nendhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NjE0MjAsImV4cCI6MjA2NjAzNzQyMH0.rGwSOp2_l9eWK2B7Fk7BFo0_JK4BOY5GAYJOa3C58tM'
);

// === Tombol login Google
const googleBtn = document.getElementById("googleLogin");

googleBtn.addEventListener("click", async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: "https://aesthetic-crostata-7c8181.netlify.app/index.html"
    }
  });

  if (error) alert("Login gagal: " + error.message);
});
