import os
path = 'scratch/batch_6th_1.sql'
size = os.path.getsize(path)
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()
count = content.count('ra:')
print(f'File size: {size} bytes ({size//1024} KB)')
print(f'Lessons found (ra:): {count}')
print(f'Lines: {len(content.splitlines())}')
print(f'Starts with INSERT: {content.strip().startswith("INSERT")}')
