"""
Print each missing INSERT SQL on separate lines for easy copy-paste to MCP.
"""
import sys, io, os

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('scratch/missing_quizzes.sql', 'r', encoding='utf-8') as f:
    content = f.read()

lines = [l.rstrip('\r\n') for l in content.split('\n') if l.strip()]
print(f"Total missing inserts: {len(lines)}")

for i, line in enumerate(lines):
    import re
    m = re.search(r"'(\d+)\. \u00f3ra:", line)
    ora_num = m.group(1) if m else '?'
    print(f"[{i+1}/{len(lines)}] ORA {ora_num}: {line[:120]}...")
