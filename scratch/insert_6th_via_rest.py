import json
import urllib.request
import urllib.error

# Read code files as text
with open("c:/Users/Istvan/PycharmProjects/mesterkviz/scratch/build_part1.py", "r", encoding="utf-8") as f:
    c1 = f.read()
with open("c:/Users/Istvan/PycharmProjects/mesterkviz/scratch/build_part2.py", "r", encoding="utf-8") as f:
    c2 = f.read()
with open("c:/Users/Istvan/PycharmProjects/mesterkviz/scratch/build_part3.py", "r", encoding="utf-8") as f:
    c3 = f.read()
with open("c:/Users/Istvan/PycharmProjects/mesterkviz/scratch/build_part4.py", "r", encoding="utf-8") as f:
    c4 = f.read()

full_code = c1 + "\n" + c2 + "\n" + c3 + "\n" + c4

namespace = {}
exec(full_code, namespace)

quizzes = namespace.get("quizzes", [])
print(f"Total quizzes to insert: {len(quizzes)}")

url = "https://ltipxxsedxjzdmlndqgw.supabase.co/rest/v1/quizzes"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0aXB4eHNlZHhqemRtbG5kcWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwODk3ODAsImV4cCI6MjA4NjY2NTc4MH0.KDia3aMe40m2zHHW3ceTcKo8muLouy_pMvPuQ4WPNec"

headers = {
    "apikey": key,
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

chunk_size = 20
inserted_count = 0

for i in range(0, len(quizzes), chunk_size):
    chunk = quizzes[i : i + chunk_size]
    records = []
    for q in chunk:
        records.append({
            "id": q["id"],
            "teacher_id": q["teacher_id"],
            "title": q["title"],
            "description": q["description"],
            "subject": q["subject"],
            "grade_level": q["grade_level"],
            "topic": q["topic"],
            "questions": q["questions"],
            "is_published": True
        })
    
    data = json.dumps(records).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            if resp.status in (200, 201, 204):
                inserted_count += len(chunk)
                print(f"Inserted chunk {i//chunk_size + 1}: {len(chunk)} quizzes (Total: {inserted_count}/{len(quizzes)})")
    except urllib.error.HTTPError as e:
        print(f"HTTPError on chunk {i//chunk_size + 1}: {e.code} - {e.read().decode('utf-8')}")
    except Exception as e:
        print(f"Error: {e}")

print(f"Insertion complete! Total inserted: {inserted_count}")
