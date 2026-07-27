import sys, io, re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open("scratch/quizzes_28_47_clean.sql", "r", encoding="utf-8") as f:
    content = f.read()

pattern = r"\('[a-f0-9\-]+',\s*'21feff02-016d-46e2-bb9d-c27495133b1b'.*?NOW\(\)\)"
matches = re.findall(pattern, content, flags=re.DOTALL)
print(f"Total extracted tuples: {len(matches)}")

header = "INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at) VALUES\n"

sql1 = header + ",\n".join(matches[:10]) + ";"
sql2 = header + ",\n".join(matches[10:]) + ";"

with open("scratch/part_28_37.sql", "w", encoding="utf-8") as f:
    f.write(sql1)

with open("scratch/part_38_47.sql", "w", encoding="utf-8") as f:
    f.write(sql2)

print("Saved scratch/part_28_37.sql (10 quizzes)")
print("Saved scratch/part_38_47.sql (10 quizzes)")
