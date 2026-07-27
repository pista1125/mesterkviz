import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
with open('scratch/batch_6th_1.sql', 'r', encoding='utf-8') as f:
    content = f.read()
# End the last row with semicolon if needed
content = content.rstrip().rstrip(';').rstrip(',')
if not content.endswith(';'):
    content += ';'
print(content)
