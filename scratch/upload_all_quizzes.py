"""
Upload all 136 6th grade quizzes via Supabase REST API.
Uses the already-generated batch files.
"""
import os, json, urllib.request, urllib.error

SUPABASE_URL = "https://ltipxxsedxjzdmlndqgw.supabase.co"
ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0aXB4eHNlZHhqemRtbG5kcWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwODk3ODAsImV4cCI6MjA4NjY2NTc4MH0.KDia3aMe40m2zHHW3ceTcKo8muLouy_pMvPuQ4WPNec"

# Read from build_part scripts and re-run the generator
import sys, io, uuid
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Load quizzes from the build scripts
exec_ns = {}
for part in ['build_part1.py', 'build_part2.py', 'build_part3.py', 'build_part4.py']:
    path = os.path.join('scratch', part)
    with open(path, 'r', encoding='utf-8') as f:
        code = f.read()
    exec(code, exec_ns)

quizzes = exec_ns.get('quizzes', [])
print(f"Total quizzes: {len(quizzes)}")

# Generate fresh UUIDs for each quiz
def fresh_uuid():
    return str(uuid.uuid4())

# DB columns that exist
ALLOWED_KEYS = {'id', 'teacher_id', 'title', 'description', 'subject', 'grade_level', 'topic', 'questions', 'is_published', 'published_at'}

records = []
for q in quizzes:
    # Refresh UUIDs
    q_copy = {k: v for k, v in q.items() if k in ALLOWED_KEYS}
    q_copy['id'] = fresh_uuid()
    q_copy['is_published'] = True
    import datetime
    q_copy['published_at'] = datetime.datetime.utcnow().isoformat() + 'Z'
    questions = []
    for qitem in q.get('questions', []):
        qitem_copy = dict(qitem)
        qitem_copy['id'] = fresh_uuid()
        opts = [dict(opt, id=fresh_uuid()) for opt in qitem.get('options', [])]
        qitem_copy['options'] = opts
        questions.append(qitem_copy)
    q_copy['questions'] = questions
    records.append(q_copy)

# POST in batches of 20 to the REST API
batch_size = 20
headers = {
    'apikey': ANON_KEY,
    'Authorization': f'Bearer {ANON_KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
}

# First delete all 6th grade quizzes
print("Deleting existing 6th grade quizzes...")
req = urllib.request.Request(
    f"{SUPABASE_URL}/rest/v1/quizzes?grade_level=eq.6.%20oszt%C3%A1ly",
    method='DELETE',
    headers=headers
)
try:
    with urllib.request.urlopen(req) as resp:
        print(f"  Delete response: {resp.status}")
except urllib.error.HTTPError as e:
    print(f"  Delete error: {e.code} {e.read().decode()}")

# Insert in batches
total_inserted = 0
for i in range(0, len(records), batch_size):
    batch = records[i:i+batch_size]
    data = json.dumps(batch).encode('utf-8')
    req = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/quizzes",
        data=data,
        method='POST',
        headers=headers
    )
    try:
        with urllib.request.urlopen(req) as resp:
            total_inserted += len(batch)
            print(f"  Inserted batch {i//batch_size + 1}: {len(batch)} quizzes (total: {total_inserted})")
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"  Error batch {i//batch_size + 1}: {e.code} {body[:200]}")

print(f"\nDone! Total inserted: {total_inserted} / {len(records)}")
