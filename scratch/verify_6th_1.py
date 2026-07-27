import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Read the SQL
with open('scratch/batch_6th_1.sql', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix ending - ensure it ends with semicolon
content = content.rstrip()
if content.endswith(','):
    content = content[:-1]
if not content.endswith(';'):
    content += ';'

print(f"SQL length: {len(content)} chars")
print(f"Last 30 chars: {repr(content[-30:])}")
print(f"First 50 chars: {repr(content[:50])}")
