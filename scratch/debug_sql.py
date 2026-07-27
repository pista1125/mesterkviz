import json, sys

with open("scratch/chunk_3.sql", "r", encoding="utf-8") as f:
    sql_text = f.read()

print("Chunk 3 SQL total length:", len(sql_text))

# Let's split by VALUES rows:
parts = sql_text.split(" VALUES\n")
header = parts[0]
rows = parts[1].rstrip(";").split(",\n")

print("Total rows in chunk_3:", len(rows))
for idx, r in enumerate(rows):
    print(f"Row {idx+1} length: {len(r)}, starts with: {r[:50]}")
