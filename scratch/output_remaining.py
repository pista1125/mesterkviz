"""
Read all remaining missing quizzes SQL and output as one combined block.
"""
import sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('scratch/missing_quizzes.sql', 'r', encoding='utf-8') as f:
    content = f.read()

lines = [l.replace('\r', '').strip() for l in content.split('\n') if l.strip().startswith('INSERT')]

# Skip first 2 (18 and 19 already inserted)
remaining = lines[2:]

print(f"-- Total remaining: {len(remaining)} inserts")
print('\n'.join(remaining))
