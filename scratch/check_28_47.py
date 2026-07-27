import sys, io, os, re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('scratch/build_part2.py', 'r', encoding='utf-8') as f:
    code = f.read()

for ora in range(28, 48):
    m = re.search(rf'add_quiz\({ora},\s*[^,]+,\s*"([^"]+)"', code)
    if m:
        print(f"{ora}: {m.group(1)}")
    else:
        print(f"{ora}: NOT FOUND")
