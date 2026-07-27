import sys, io, os, json, uuid
from datetime import datetime

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

teacher_id = "21feff02-016d-46e2-bb9d-c27495133b1b"
grade_level = "6. osztály"
subject = "Matematika"
topic = "Törtek"

# Load build_part2 data by executing build_part2 logic or importing
import build_part2

# Get quizzes 28 to 47
target_quizzes = [q for q in build_part2.quizzes if 28 <= q["ora"] <= 47]

print(f"Extracted {len(target_quizzes)} quizzes for lessons 28 to 47.")

# Convert to SQL tuples
sql_header = "INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at) VALUES\n"

def format_quiz_tuple(q):
    quiz_id = str(uuid.uuid4())
    title = f"{q['ora']}. óra: {q['title']}"
    desc = q.get('desc', '')
    
    questions = []
    for raw_q in q['questions']:
        q_id = str(uuid.uuid4())
        q_type = raw_q.get('type', 'multiple-choice')
        q_text = raw_q.get('t', '')
        time_limit = raw_q.get('timeLimit', 15 if q_type != 'text-input' else 20)
        
        q_obj = {
            "id": q_id,
            "text": q_text,
            "type": q_type,
            "options": [],
            "timeLimit": time_limit
        }
        
        if q_type == 'multiple-choice':
            opts = []
            for opt_text, is_corr in raw_q.get('opts', []):
                opts.append({
                    "id": str(uuid.uuid4()),
                    "text": str(opt_text),
                    "isCorrect": bool(is_corr)
                })
            q_obj["options"] = opts
        elif q_type == 'true-false':
            opts = []
            for opt_text, is_corr in raw_q.get('opts', []):
                opts.append({
                    "id": str(uuid.uuid4()),
                    "text": str(opt_text),
                    "isCorrect": bool(is_corr)
                })
            q_obj["options"] = opts
        elif q_type == 'text-input':
            q_obj["correctAnswer"] = str(raw_q.get('ans', ''))
        
        questions.append(q_obj)
    
    q_json = json.dumps(questions, ensure_ascii=False)
    q_json_escaped = q_json.replace("'", "''")
    title_escaped = title.replace("'", "''")
    desc_escaped = desc.replace("'", "''")
    topic_escaped = topic.replace("'", "''")
    
    return f"('{quiz_id}', '{teacher_id}', '{title_escaped}', '{desc_escaped}', '{subject}', '{grade_level}', '{topic_escaped}', '{q_json_escaped}'::jsonb, true, NOW())"

# Split into 2 batches (28-37 and 38-47)
batch1_quizzes = [q for q in target_quizzes if 28 <= q["ora"] <= 37]
batch2_quizzes = [q for q in target_quizzes if 38 <= q["ora"] <= 47]

tuples1 = [format_quiz_tuple(q) for q in batch1_quizzes]
tuples2 = [format_quiz_tuple(q) for q in batch2_quizzes]

sql1 = sql_header + ",\n".join(tuples1) + ";"
sql2 = sql_header + ",\n".join(tuples2) + ";"

with open("scratch/quizzes_28_37.sql", "w", encoding="utf-8") as f:
    f.write(sql1)

with open("scratch/quizzes_38_47.sql", "w", encoding="utf-8") as f:
    f.write(sql2)

print("Saved scratch/quizzes_28_37.sql (10 quizzes)")
print("Saved scratch/quizzes_38_47.sql (10 quizzes)")
