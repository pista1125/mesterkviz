import json
import uuid
import os
import sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open("scratch/build_part1.py", "r", encoding="utf-8") as f:
    c1 = f.read()
with open("scratch/build_part2.py", "r", encoding="utf-8") as f:
    c2 = f.read()

full_code = c1 + "\n" + c2
namespace = {}
exec(full_code, namespace)
quizzes = namespace.get("quizzes", [])

# Filter for lessons 28 to 47
target_quizzes = [q for q in quizzes if 28 <= q.get("num", 0) <= 47]
print(f"Extracted {len(target_quizzes)} quizzes for lessons 28 to 47.")

for q in target_quizzes:
    print(f"Lesson {q['num']}: {q['title']}")

def clean_sql_str(val):
    if val is None:
        return ""
    s = str(val).replace("\r", "").replace("\n", " ").strip()
    return s.replace("'", "''")

tuples = []
for q in target_quizzes:
    fresh_id = str(uuid.uuid4())
    t_id = q["teacher_id"]
    title = clean_sql_str(q["title"])
    desc = clean_sql_str(q["description"])
    subj = clean_sql_str(q["subject"])
    grade = clean_sql_str(q["grade_level"])
    top = clean_sql_str(q["topic"])
    
    questions = q["questions"]
    for q_item in questions:
        q_item["id"] = str(uuid.uuid4())
        if "options" in q_item and isinstance(q_item["options"], list):
            for opt in q_item["options"]:
                opt["id"] = str(uuid.uuid4())
                
    q_json_str = clean_sql_str(json.dumps(questions, ensure_ascii=False))
    
    t_str = f"('{fresh_id}', '{t_id}', '{title}', '{desc}', '{subj}', '{grade}', '{top}', '{q_json_str}'::jsonb, true, NOW())"
    tuples.append(t_str)

header = "INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at) VALUES\n"

sql = header + ",\n".join(tuples) + ";"

with open("scratch/quizzes_28_47_clean.sql", "w", encoding="utf-8") as f:
    f.write(sql)

print(f"Generated scratch/quizzes_28_47_clean.sql ({len(tuples)} quizzes).")
