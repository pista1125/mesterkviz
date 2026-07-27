import json
import uuid

teacher_id = '21feff02-016d-46e2-bb9d-c27495133b1b'
subject = 'Matematika'
grade_level = '6. osztály'

def create_q(text, q_type, options_or_ans, time_limit=15):
    q_id = str(uuid.uuid4())
    if q_type == "multiple-choice":
        opts = []
        for opt_text, is_corr in options_or_ans:
            opts.append({
                "id": str(uuid.uuid4()),
                "text": str(opt_text),
                "isCorrect": bool(is_corr)
            })
        return {
            "id": q_id,
            "text": text,
            "type": "multiple-choice",
            "options": opts,
            "timeLimit": time_limit
        }
    elif q_type == "true-false":
        opts = []
        for opt_text, is_corr in options_or_ans:
            opts.append({
                "id": str(uuid.uuid4()),
                "text": str(opt_text),
                "isCorrect": bool(is_corr)
            })
        return {
            "id": q_id,
            "text": text,
            "type": "true-false",
            "options": opts,
            "timeLimit": time_limit
        }
    elif q_type == "text-input":
        return {
            "id": q_id,
            "text": text,
            "type": "text-input",
            "options": [],
            "timeLimit": time_limit + 5,
            "correctAnswer": str(options_or_ans)
        }

quizzes = []

def add_quiz(num, topic, title, desc, raw_questions):
    qs = []
    for q in raw_questions:
        q_type = q["type"]
        if q_type == "multiple-choice":
            qs.append(create_q(q["t"], "multiple-choice", q["opts"]))
        elif q_type == "true-false":
            qs.append(create_q(q["t"], "true-false", q["opts"]))
        elif q_type == "text-input":
            qs.append(create_q(q["t"], "text-input", q["ans"]))
    
    quizzes.append({
        "num": num,
        "id": str(uuid.uuid4()),
        "teacher_id": teacher_id,
        "title": title,
        "description": desc,
        "subject": subject,
        "grade_level": grade_level,
        "topic": topic,
        "questions": qs
    })

# ==========================================
# BEVEZETÉS (1-3)
# Topic: "Év eleji ismétlés, diagnosztika"
# ==========================================
t_intro = "Év eleji ismétlés, diagnosztika"

add_quiz(1, t_intro, "1. óra: Az év bevezetése, ismétlés, játékos bevezető", "Éves munkarend, elvárások, játékos feladatok az éves munka elkezdéséhez.", [
    {"t": "Mi az éves matematika munka legfőbb célja?", "type": "multiple-choice", "opts": [("A gondolkodási képesség és matematikai tudás fejlesztése", True), ("A könyvek visszagyűjtése", False), ("Csak a házi feladat írása", False), ("A számonkérések elkerülése", False)]},
    {"t": "A játékos matematikai feladatok segítik a tanulásra való ráhangolódást.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány hétből áll egy átlagos magyar tanév?", "type": "text-input", "ans": "36"},
    {"t": "Melyik állítás ír le helyes tanulási magatartást?", "type": "multiple-choice", "opts": [("Rendszeres felkészülés és a hibák megbeszélése", True), ("Minden feladat feladása az első hibánál", False), ("A füzet otthon hagyása", False), ("Másolás a padtárstól", False)]},
    {"t": "Mennyi a 25 + 75 összege?", "type": "text-input", "ans": "100"},
    {"t": "A matematikai órákon a csoportmunka során fontos a kooperáció és egymás segítése.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 8 * 9?", "type": "text-input", "ans": "72"}
])

add_quiz(2, t_intro, "2. óra: Játékok", "Játékszabályok, stratégiák, logikai gondolkodás páros és csoportmunkában.", [
    {"t": "Mi a stratégiai játékok lényege?", "type": "multiple-choice", "opts": [("Előre megtervezett lépésekkel a cél elérése", True), ("Kizárólag a szerencsére hagyatkozás", False), ("Kockadobás számolás nélkül", False), ("A szabályok figyelmen kívül hagyása", False)]},
    {"t": "A páros és csoportmunka során fontos a csapattársak véleményének meghallgatása.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány mezőből áll egy klasszikus 8x8-as sakktábla?", "type": "text-input", "ans": "64"},
    {"t": "Melyik játék fejleszti kifejezetten a logikai gondolkodást és a számolást?", "type": "multiple-choice", "opts": [("Sudoku", True), ("Fócsoport", False), ("Futóverseny", False), ("Kő-papír-olló", False)]},
    {"t": "A bűvös négyzetben minden sor, oszlop és átló összege megegyezik.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi az 1, 2, 3, 4, 5 számok összege?", "type": "text-input", "ans": "15"},
    {"t": "A szabályok betartása elengedhetetlen a fair play játékban.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(3, t_intro, "3. óra: Év eleji diagnosztikus felmérés", "Az 5. osztályban tanult ismeretek felmérése, tudásszint diagnosztizálása.", [
    {"t": "1. Mennyi (-12) + 5?", "type": "text-input", "ans": "-7"},
    {"t": "2. Mennyi 3/4 + 1/4?", "type": "multiple-choice", "opts": [("1 egész (4/4)", True), ("2/4", False), ("4/8", False), ("3/8", False)]},
    {"t": "3. Mennyi a 4 cm oldalú négyzet kerülete? (cm-ben)", "type": "text-input", "ans": "16"},
    {"t": "4. Mennyi a 4 cm oldalú négyzet területe? (cm²-ben)", "type": "text-input", "ans": "16"},
    {"t": "5. Hány gramm 2,5 kg?", "type": "text-input", "ans": "2500"},
    {"t": "6. A negatív számok a nullától balra találhatók a számegyenesen.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "7. Hány perc 1 és fél óra?", "type": "text-input", "ans": "90"},
    {"t": "8. Mennyi 0,5 + 0,7?", "type": "text-input", "ans": "1.2"},
    {"t": "9. A derékszögű háromszögnek van egy 90°-os szöge.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "10. Hány csúcsa van a kockának?", "type": "text-input", "ans": "8"}
])

print("Intro quizzes created (1-3).")
