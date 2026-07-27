"""
Generate individual SQL files for each missing quiz.
"""
import sys, io, os, re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

missing_oras = {
    18,19,20,21,22,23,24,25,26,27,
    30,31,32,33,34,35,36,
    40,41,42,43,44,45,46,47,
    50,51,52,53,54,55,56,57,
    60,61,62,63,64,65,66,67,
    70,71,72,73,74,75,76,
    80,81,82,83,84,85,86,
    90,91,92,93,94,95,96,
    100,101,102,103,104,105,106,
    110,111,112,113,114,115,116,118,
    120,121,122,123,124,125,126,127,
    130,131,132,133
}

all_missing_sqls = []

for batch_num in range(1, 15):
    path = f'scratch/guaranteed_batch_{batch_num}.sql'
    if not os.path.exists(path):
        continue
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    lines = [l.rstrip('\r\n') for l in content.split('\n') if l.strip().startswith('INSERT INTO quizzes')]
    
    for line in lines:
        m = re.search(r"'(\d+)\. \u00f3ra:", line)
        if m:
            ora_num = int(m.group(1))
            if ora_num in missing_oras:
                all_missing_sqls.append(line)

print(f"Total missing SQLs to insert: {len(all_missing_sqls)}")

# Write to a single combined file
with open('scratch/missing_quizzes.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(all_missing_sqls))

print("Written to scratch/missing_quizzes.sql")

# Also split into smaller batches of 5 for reliable execution
batch_size = 5
for i in range(0, len(all_missing_sqls), batch_size):
    batch = all_missing_sqls[i:i+batch_size]
    batch_num = i // batch_size + 1
    with open(f'scratch/missing_batch_{batch_num}.sql', 'w', encoding='utf-8') as f:
        f.write('\n'.join(batch))
    print(f"Written missing_batch_{batch_num}.sql ({len(batch)} inserts)")

print(f"\nTotal missing batches: {(len(all_missing_sqls) + batch_size - 1) // batch_size}")
