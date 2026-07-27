"""
Read all batch files and execute them via Supabase.
Prints the SQL for each batch.
"""
import os, sys

batch_num = int(sys.argv[1]) if len(sys.argv) > 1 else 1
path = f'scratch/guaranteed_batch_{batch_num}.sql'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Get only INSERT lines
lines = [l.strip() for l in content.strip().split('\n') if l.strip() and 'INSERT INTO quizzes' in l]

# Print full content for use
for line in lines:
    sys.stdout.buffer.write((line + '\n').encode('utf-8'))
