import json

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

statements = []
for q in quizzes:
    q_id = q["id"]
    t_id = q["teacher_id"]
    title = str(q["title"]).replace('\n', ' ').replace('\r', '')
    desc = str(q["description"]).replace('\n', ' ').replace('\r', '')
    subj = str(q["subject"]).replace('\n', ' ').replace('\r', '')
    grade = str(q["grade_level"]).replace('\n', ' ').replace('\r', '')
    top = str(q["topic"]).replace('\n', ' ').replace('\r', '')
    
    # Ensure JSON string is strictly single line
    q_json_str = json.dumps(q["questions"], ensure_ascii=False).replace('\n', '\\n').replace('\r', '\\r')
    
    # Use $q$ tag for dollar-quoting
    stmt = f"INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at) VALUES ('{q_id}', '{t_id}', $q${title}$q$, $q${desc}$q$, $q${subj}$q$, $q${grade}$q$, $q${top}$q$, $q${q_json_str}$q$::jsonb, true, NOW()) ON CONFLICT (id) DO NOTHING;"
    statements.append(stmt)

print("Total strict single-line statements created:", len(statements))

# Create 14 dollar-quoted batch files
batch_size = 10
for b_idx in range(0, len(statements), batch_size):
    batch_stmts = statements[b_idx : b_idx + batch_size]
    batch_sql = "\n".join(batch_stmts)
    fn = f"c:/Users/Istvan/PycharmProjects/mesterkviz/scratch/strict_batch_{b_idx // batch_size + 1}.sql"
    with open(fn, "w", encoding="utf-8") as out_f:
        out_f.write(batch_sql)

print("Generated all 14 strict single-line batch files!")
