"""
Correctly split batch_6th_1.sql through batch_6th_5.sql into 10 clean parts.
Uses exact regex matching for each SQL tuple: ('...', ..., NOW())
"""
import os, sys, re

header = "INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at) VALUES\n"

all_tuples = []

for i in range(1, 6):
    path = f'scratch/batch_6th_{i}.sql'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Match tuples: ('uuid', ...) ::jsonb, true, NOW())
    # Note: each tuple starts with (' and ends with NOW())
    # Let's match line by line or using regex pattern
    pattern = r"\('[a-f0-9\-]+',\s*'21feff02-016d-46e2-bb9d-c27495133b1b'.*?NOW\(\)\)"
    matches = re.findall(pattern, content, flags=re.DOTALL)
    print(f"batch_6th_{i}.sql: found {len(matches)} valid tuples")
    all_tuples.extend(matches)

print(f"Total valid tuples found: {len(all_tuples)}")

# Split into 10 parts (~13-14 tuples each)
part_size = 14
parts_count = (len(all_tuples) + part_size - 1) // part_size

for p in range(parts_count):
    chunk = all_tuples[p*part_size : (p+1)*part_size]
    sql = header + ',\n'.join(chunk) + ';'
    out_path = f'scratch/batch_part_{p+1}.sql'
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(sql)
    
    oras = re.findall(r"'(\d+)\. \u00f3ra:", sql)
    print(f"Part {p+1}: {len(chunk)} quizzes, oras {oras[0]} to {oras[-1] if oras else '?'}")

