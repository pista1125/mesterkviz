import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
with open('scratch/batch_6th_1_fixed.sql', 'r', encoding='utf-8') as f:
    content = f.read()
print(content)
