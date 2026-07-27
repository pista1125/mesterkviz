import re, os

for i in range(1, 6):
    path = f'scratch/batch_6th_{i}.sql'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    oras = re.findall(r"'(\d+)\. \u00f3ra:", content)
    print(f'batch_6th_{i}.sql: {len(content)//1024}KB, oras: {oras[0] if oras else "?"} - {oras[-1] if oras else "?"}  ({len(oras)} lessons)')
