"""
Combine batch_6th_1.sql through batch_6th_5.sql and split into 10 clean parts.
Each part is a valid multi-row INSERT INTO quizzes (...) VALUES ...;
"""
import os, sys, re

all_rows = []
header = "INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at) VALUES\n"

for i in range(1, 6):
    path = f'scratch/batch_6th_{i}.sql'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    header_end = content.index('\n') + 1
    rows_text = content[header_end:]
    
    depth = 0
    current = ''
    for char in rows_text:
        if char == '(':
            depth += 1
        elif char == ')':
            depth -= 1
        current += char
        if depth == 0 and current.strip():
            row = current.strip()
            if row.startswith('(') and (row.endswith(')') or row.endswith('),') or row.endswith(');')):
                row = row.rstrip(',').rstrip(';')
                all_rows.append(row)
            current = ''

print(f"Total rows extracted across 5 files: {len(all_rows)}")

# Split into 10 parts (~13-14 rows each)
part_size = 14
parts_count = (len(all_rows) + part_size - 1) // part_size

for p in range(parts_count):
    chunk = all_rows[p*part_size : (p+1)*part_size]
    sql = header + ',\n'.join(chunk) + ';'
    out_path = f'scratch/batch_part_{p+1}.sql'
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(sql)
    
    oras = re.findall(r"'(\d+)\. \u00f3ra:", sql)
    print(f"Part {p+1}: {len(chunk)} quizzes, oras {oras[0]} to {oras[-1] if oras else '?'}")

