"""Read a specific batch file and print the full SQL content"""
import sys

batch_num = int(sys.argv[1]) if len(sys.argv) > 1 else 1
path = f'scratch/guaranteed_batch_{batch_num}.sql'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the DELETE line if present (we already handled that separately)
lines = content.strip().split('\n')
# Filter out empty and DELETE lines
insert_lines = [l for l in lines if l.strip() and 'INSERT INTO quizzes' in l]

print(f"--- BATCH {batch_num}: {len(insert_lines)} INSERT statements ---")
for line in insert_lines:
    print(line)
