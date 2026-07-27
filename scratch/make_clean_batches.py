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

def sql_escape(text):
    if text is None:
        return ""
    return str(text).replace("'", "''")

statements = []
for q in quizzes:
    q_id = q["id"]
    t_id = q["teacher_id"]
    title = sql_escape(q["title"])
    desc = sql_escape(q["description"])
    subj = sql_escape(q["subject"])
    grade = sql_escape(q["grade_level"])
    top = sql_escape(q["topic"])
    q_json_str = sql_escape(json.dumps(q["questions"], ensure_ascii=False))
    
    stmt = f"INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at) VALUES ('{q_id}', '{t_id}', '{title}', '{desc}', '{subj}', '{grade}', '{top}', '{q_json_str}'::jsonb, true, NOW()) ON CONFLICT (id) DO NOTHING;"
    statements.append(stmt)

print("Total statements created:", len(statements))

# Create 14 clean batch files
batch_size = 10
for b_idx in range(0, len(statements), batch_size):
    batch_stmts = statements[b_idx : b_idx + batch_size]
    batch_sql = "\n".join(batch_stmts)
    fn = f"c:/Users/Istvan/PycharmProjects/mesterkviz/scratch/clean_batch_{b_idx // batch_size + 1}.sql"
    with open(fn, "w", encoding="utf-8") as out_f:
        out_f.write(batch_sql)

print("Generated all 14 clean batch files!")
