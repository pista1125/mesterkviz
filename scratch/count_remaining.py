with open('scratch/remaining_inserts.sql', 'r', encoding='utf-8') as f:
    content = f.read()
count = content.count('INSERT INTO quizzes')
size_kb = len(content.encode('utf-8')) // 1024
print(f'INSERT count: {count}, Size: {size_kb} KB')
