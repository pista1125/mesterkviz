"""
Execute all batch SQL files to Supabase using the MCP execute_sql function.
This script reads each batch and prints the individual INSERT statements.
"""
import sys, io, os

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Figure out which quiz numbers are already in the DB
# (passed via argument or hardcoded)
existing = {
    1,2,3,4,5,6,7,8,9,  # batch 1
    10,11,12,13,14,15,16,17,  # batch 2 partial
    28,29,  # batch 3 partial
    37,38,39,  # batch 4 partial
    48,49,  # batch 5 partial
    58,59,  # batch 6 partial
    68,69,  # batch 7 partial
    77,78,79,  # batch 8 partial
    87,88,89,  # batch 9 partial
    97,98,99,  # batch 10 partial
    107,108,109,  # batch 11 partial
    117,119,  # batch 12 partial
    128,129,  # batch 13 partial
    134,135,136  # batch 14 partial
}

print(f"Already in DB: {len(existing)} quizzes")

for batch_num in range(1, 15):
    path = f'scratch/guaranteed_batch_{batch_num}.sql'
    if not os.path.exists(path):
        continue
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    lines = [l.rstrip('\r\n') for l in content.split('\n') if l.strip().startswith('INSERT INTO quizzes')]
    
    for line in lines:
        # Extract lesson number from title
        import re
        m = re.search(r"'(\d+)\. \u00f3ra:", line)
        if m:
            ora_num = int(m.group(1))
            if ora_num not in existing:
                print(f"MISSING ORA {ora_num}: batch {batch_num}")
