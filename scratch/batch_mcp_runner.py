import json

# Read all 4 code files as text
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
print(f"Total 6th Grade Quizzes: {len(quizzes)}")

def sql_escape(text):
    if text is None:
        return ""
    return str(text).replace("'", "''")

# Create 14 small chunks of ~10 quizzes each
chunk_size = 10
chunks = []

for i in range(0, len(quizzes), chunk_size):
    chunk = quizzes[i : i + chunk_size]
    sql_lines = []
    sql_lines.append("INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at) VALUES")
    
    row_strs = []
    for q in chunk:
        q_id = q["id"]
        t_id = q["teacher_id"]
        title = sql_escape(q["title"])
        desc = sql_escape(q["description"])
        subj = sql_escape(q["subject"])
        grade = sql_escape(q["grade_level"])
        top = sql_escape(q["topic"])
        q_json_str = sql_escape(json.dumps(q["questions"], ensure_ascii=False))
        
        row_str = f"('{q_id}', '{t_id}', '{title}', '{desc}', '{subj}', '{grade}', '{top}', '{q_json_str}'::jsonb, true, NOW())"
        row_strs.append(row_str)
    
    sql_lines.append(",\n".join(row_strs) + " ON CONFLICT (id) DO NOTHING;")
    
    chunk_filename = f"c:/Users/Istvan/PycharmProjects/mesterkviz/scratch/chunk_{i//chunk_size + 1}.sql"
    with open(chunk_filename, "w", encoding="utf-8") as f:
        f.write("\n".join(sql_lines))
    chunks.append(chunk_filename)

print(f"Generated {len(chunks)} chunk files!")
