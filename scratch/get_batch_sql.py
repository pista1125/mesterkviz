"""
Read a batch file and print all INSERT statements as one combined SQL.
Usage: python get_batch_sql.py <batch_number>
"""
import sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

batch_num = int(sys.argv[1]) if len(sys.argv) > 1 else 1
path = f'scratch/guaranteed_batch_{batch_num}.sql'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Print only INSERT lines (skip DELETE, skip empty)
lines = [l.rstrip('\r\n') for l in content.split('\n') if l.strip().startswith('INSERT INTO quizzes')]
combined = '\n'.join(lines)
print(combined)
