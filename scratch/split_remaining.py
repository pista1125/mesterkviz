import re

with open("scratch/insert_remaining_5th.sql", "r", encoding="utf-8") as f:
    content = f.read()

statements = [s.strip() for s in content.split("INSERT INTO quizzes") if s.strip()]
print(f"Total statements: {len(statements)}")

# Group into batches of 10
batch_size = 10
batches = []
for i in range(0, len(statements), batch_size):
    chunk = statements[i:i+batch_size]
    batch_sql = "\n\n".join(["INSERT INTO quizzes " + s for s in chunk])
    batches.append(batch_sql)

for idx, b in enumerate(batches):
    with open(f"scratch/batch_rem_{idx+1}.sql", "w", encoding="utf-8") as out:
        out.write(b)
    print(f"Wrote scratch/batch_rem_{idx+1}.sql with {len(chunk)} statements")
