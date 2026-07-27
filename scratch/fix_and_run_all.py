import json
import uuid
import os

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

print(f"Total quizzes extracted from python source: {len(quizzes)}")

def clean_sql_str(val):
    if val is None:
        return ""
    s = str(val).replace("\r", "").replace("\n", " ").strip()
    return s.replace("'", "''")

all_statements = ["DELETE FROM quizzes WHERE grade_level = '6. osztály';"]

seen_quiz_ids = set()

for idx, q in enumerate(quizzes):
    fresh_id = str(uuid.uuid4())
    while fresh_id in seen_quiz_ids:
        fresh_id = str(uuid.uuid4())
    seen_quiz_ids.add(fresh_id)

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
    
    stmt = f"INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at) VALUES ('{fresh_id}', '{t_id}', '{title}', '{desc}', '{subj}', '{grade}', '{top}', '{q_json_str}'::jsonb, true, NOW());"
    all_statements.append(stmt)

print(f"Total SQL statements created: {len(all_statements)}")

# Group into 14 batch files of ~10 quizzes each
batch_files = []
batch_size = 10
# index 0 is DELETE statement, followed by 136 inserts
b_idx = 1
i = 0
while i < len(all_statements):
    if i == 0:
        chunk = all_statements[0:10] # DELETE + 9 inserts
        i = 10
    else:
        chunk = all_statements[i:i+10]
        i += 10
    
    batch_str = "\n".join(chunk)
    file_path = f"c:/Users/Istvan/PycharmProjects/mesterkviz/scratch/guaranteed_batch_{b_idx}.sql"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(batch_str)
    batch_files.append(file_path)
    b_idx += 1

print(f"Created {len(batch_files)} guaranteed batch files.")
