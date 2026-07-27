"""
Split batch_6th_1.sql into mini-batches of 5 rows each.
Each mini-batch is a complete INSERT statement.
"""
import sys, io, re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

for batch_num in range(1, 6):
    path = f'scratch/batch_6th_{batch_num}.sql'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the header (INSERT INTO ... VALUES)
    header_end = content.index('\n') + 1
    header = content[:header_end].rstrip()  # "INSERT INTO quizzes ... VALUES"
    
    # Extract all value rows (each row is one kvíz)
    rows_text = content[header_end:]
    
    # Split by "),\n(" to get individual rows
    # Each row starts with ( and ends with )
    rows = []
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
                rows.append(row)
            current = ''
    
    print(f"batch_6th_{batch_num}: {len(rows)} rows extracted")
    
    # Create mini-batches of 5
    mini_size = 5
    for i in range(0, len(rows), mini_size):
        mini = rows[i:i+mini_size]
        mini_num = i // mini_size + 1
        sql = header + '\n' + ',\n'.join(mini) + ';'
        fname = f'scratch/mini_6th_{batch_num}_{mini_num}.sql'
        with open(fname, 'w', encoding='utf-8') as f:
            f.write(sql)
        oras = re.findall(r"'(\d+)\. \u00f3ra:", sql)
        print(f"  mini_{batch_num}_{mini_num}: {len(mini)} rows, oras: {oras}")
