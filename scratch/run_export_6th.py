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

# Concatenate all code
full_code = c1 + "\n" + c2 + "\n" + c3 + "\n" + c4

namespace = {}
exec(full_code, namespace)

all_quizzes = namespace.get("quizzes", [])
print(f"Total 6th Grade Quizzes Generated: {len(all_quizzes)}")

def sql_escape(text):
    if text is None:
        return ""
    return str(text).replace("'", "''")

num_batches = 5
chunk_size = (len(all_quizzes) + num_batches - 1) // num_batches

for b_idx in range(num_batches):
    batch_quizzes = all_quizzes[b_idx * chunk_size : (b_idx + 1) * chunk_size]
    if not batch_quizzes:
        break
    
    sql_lines = []
    sql_lines.append("INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at) VALUES")
    
    row_strs = []
    for q in batch_quizzes:
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
    
    sql_lines.append(",\n".join(row_strs) + ";")
    
    batch_filename = f"c:/Users/Istvan/PycharmProjects/mesterkviz/scratch/batch_6th_{b_idx+1}.sql"
    with open(batch_filename, "w", encoding="utf-8") as f:
        f.write("\n".join(sql_lines))
    print(f"Batch {b_idx+1} written: {len(batch_quizzes)} quizzes -> {batch_filename}")

print("All 5 SQL batch files generated successfully!")
