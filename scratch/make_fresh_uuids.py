import json
import uuid

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

# First delete existing grade 6 quizzes to start 100% clean
delete_sql = "DELETE FROM quizzes WHERE grade_level = '6. osztály';"

def clean_sql_str(val):
    if val is None:
        return ""
    s = str(val).replace("\r", "").replace("\n", " ").strip()
    return s.replace("'", "''")

statements = [delete_sql]
for q in quizzes:
    fresh_id = str(uuid.uuid4())
    t_id = q["teacher_id"]
    title = clean_sql_str(q["title"])
    desc = clean_sql_str(q["description"])
    subj = clean_sql_str(q["subject"])
    grade = clean_sql_str(q["grade_level"])
    top = clean_sql_str(q["topic"])
    
    # Regenerate question UUIDs to ensure no internal collision
    questions = q["questions"]
    for q_item in questions:
        q_item["id"] = str(uuid.uuid4())
        if "options" in q_item and isinstance(q_item["options"], list):
            for opt in q_item["options"]:
                opt["id"] = str(uuid.uuid4())
                
    q_json_str = clean_sql_str(json.dumps(questions, ensure_ascii=False))
    
    stmt = f"INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at) VALUES ('{fresh_id}', '{t_id}', '{title}', '{desc}', '{subj}', '{grade}', '{top}', '{q_json_str}'::jsonb, true, NOW());"
    statements.append(stmt)

print("Generated fresh statements count:", len(statements))

batch_size = 10
# Statement 0 is DELETE, then 10 per batch
batch_files = []

# Batch 1: DELETE + first 9 quizzes
b1_sql = "\n".join(statements[:10])
with open("c:/Users/Istvan/PycharmProjects/mesterkviz/scratch/fresh_batch_1.sql", "w", encoding="utf-8") as f:
    f.write(b1_sql)

# Batches 2 to 14: 10 quizzes each
idx = 10
b_count = 2
while idx < len(statements):
    chunk = statements[idx : idx + 10]
    b_sql = "\n".join(chunk)
    fn = f"c:/Users/Istvan/PycharmProjects/mesterkviz/scratch/fresh_batch_{b_count}.sql"
    with open(fn, "w", encoding="utf-8") as f:
        f.write(b_sql)
    batch_files.append(fn)
    idx += 10
    b_count += 1

print(f"Generated fresh_batch_1.sql through fresh_batch_{b_count - 1}.sql!")
