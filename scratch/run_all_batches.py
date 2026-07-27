"""
Script to print each batch SQL statement separately for execution.
"""
import os

for batch_num in range(1, 15):
    path = f'scratch/guaranteed_batch_{batch_num}.sql'
    if not os.path.exists(path):
        print(f"MISSING: {path}")
        continue
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    lines = [l.strip() for l in content.strip().split('\n') if l.strip()]
    print(f"\n=== BATCH {batch_num} === ({len(lines)} statements)")
    for line in lines:
        print(line[:80] + "...")
