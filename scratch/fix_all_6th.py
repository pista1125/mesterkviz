import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

for batch_num in range(1, 6):
    path = f'scratch/batch_6th_{batch_num}.sql'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.rstrip()
    if content.endswith(','):
        content = content[:-1]
    if not content.endswith(';'):
        content += ';'
    
    # Write fixed version
    with open(f'scratch/batch_6th_{batch_num}_fixed.sql', 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"batch_6th_{batch_num}_fixed.sql: {len(content)} chars, ends: {repr(content[-5:])}")
