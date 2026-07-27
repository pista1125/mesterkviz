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

def clean_sql_str(val):
    if val is None:
        return ""
    # Strip any newlines/carriage returns
    s = str(val).replace("\r", "").replace("\n", " ").strip()
    # Replace single quotes with double single quotes for SQL string literals
    return s.replace("'", "''")

statements = []
for q in quizzes:
    q_id = q["id"]
    t_id = q["teacher_id"]
    title = clean_sql_str(q["title"])
    desc = clean_sql_str(q["description"])
    subj = clean_sql_str(q["subject"])
    grade = clean_sql_str(q["grade_level"])
    top = clean_sql_str(q["topic"])
    
    # Clean questions array
    q_json_str = clean_sql_str(json.dumps(q["questions"], ensure_ascii=False))
    
    stmt = f"INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at) VALUES ('{q_id}', '{t_id}', '{title}', '{desc}', '{subj}', '{grade}', '{top}', '{q_json_str}'::jsonb, true, NOW()) ON CONFLICT (id) DO NOTHING;"
    statements.append(stmt)

print("Total perfect single-line SQL statements:", len(statements))

# Divide into 14 chunk files
batch_size = 10
chunks = []
for b_idx in range(0, len(statements), batch_size):
    batch_stmts = statements[b_idx : b_idx + batch_size]
    batch_sql = "\n".join(batch_stmts)
    fn = f"c:/Users/Istvan/PycharmProjects/mesterkviz/scratch/perfect_chunk_{b_idx // batch_size + 1}.sql"
    with open(fn, "w", encoding="utf-8") as out_f:
        out_f.write(batch_sql)
    chunks.append(fn)

print("Generated 14 perfect chunk SQL files!")
