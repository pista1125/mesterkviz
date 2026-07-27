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

# 1-3. BEVEZETÉS
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

# I. EGÉSZ SZÁMOK, OSZTHATÓSÁG (4-27)
t_egesz = "Egész számok, oszthatóság"

add_quiz(4, t_egesz, "4. óra: Műveletek az egész számok körében", "Mit tanultunk ötödik osztályban? A felmérés tapasztalatainak feldolgozása, hibajavítás.", [
    {"t": "Mennyi (-8) + (+15)?", "type": "text-input", "ans": "7"},
    {"t": "Mennyi (-6) - (+4)?", "type": "text-input", "ans": "-10"},
    {"t": "Az ellentett számok összege mindig 0.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi |-25| (a -25 abszolút értéke)?", "type": "text-input", "ans": "25"},
    {"t": "Melyik szám nagyobb: -15 vagy -8?", "type": "multiple-choice", "opts": [("-8", True), ("-15", False), ("Egyenlőek", False), ("Nem összehasonlítható", False)]},
    {"t": "A nullánál kisebb számokat negatív számoknak nevezzük.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi (-10) + (-5)?", "type": "text-input", "ans": "-15"}
])

add_quiz(5, t_egesz, "5. óra: Az egész számok szorzása", "Negatív számokkal való szorzás, az előjelszabály megértése és alkalmazása.", [
    {"t": "Mi az előjelszabály két negatív szám szorzásakor? (- * -)", "type": "multiple-choice", "opts": [("Pozitív (+)", True), ("Negatív (-)", False), ("Mindig 0", False), ("Nem lehet megszorozni", False)]},
    {"t": "Mennyi (-4) * (+5)?", "type": "text-input", "ans": "-20"},
    {"t": "Mennyi (-6) * (-7)?", "type": "text-input", "ans": "42"},
    {"t": "Egy pozitív és egy negatív szám szorzata mindig negatív.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi (-3) * 0?", "type": "text-input", "ans": "0"},
    {"t": "Ha három negatív számot szorzunk össze, a szorzat előjele negatív lesz.", "type": "true-false", "opts": [("Igaz (- * - * - = -)", True), ("Hamis", False)]},
    {"t": "Mennyi (-2) * (-3) * (-4)?", "type": "text-input", "ans": "-24"}
])

add_quiz(6, t_egesz, "6. óra: Gyakorlóóra: az egész számok szorzása", "Több tényező előjelének meghatározása, szorzások gyakorlása.", [
    {"t": "Mennyi (-5) * (-2) * (+3)?", "type": "text-input", "ans": "30"},
    {"t": "Ha egy szorzatban páros számú negatív tényező van, a szorzat előjele:", "type": "multiple-choice", "opts": [("Pozitív", True), ("Negatív", False), ("Nulla", False), ("Változó", False)]},
    {"t": "Mennyi (-10) * (-10)?", "type": "text-input", "ans": "100"},
    {"t": "A 0-val való szorzás eredménye mindig 0.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi (-1) * (+15)?", "type": "text-input", "ans": "-15"},
    {"t": "Mennyi a (-2) köbe ( (-2) * (-2) * (-2) )?", "type": "text-input", "ans": "-8"},
    {"t": "Az írásbeli szorzáskor az előjelet a művelet végzésétől függetlenül, az előjelszabály szerint állapítjuk meg.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(7, t_egesz, "7. óra: Az egész számok osztása", "Negatív osztandó, osztóval végzett műveletek algoritmusa, előjelszabály osztásnál.", [
    {"t": "Mi az előjelszabály egész számok osztásakor?", "type": "multiple-choice", "opts": [("Ugyanaz, mint a szorzásnál (+:+=+, -:-=+, +:-=-, -:+=-)", True), ("Mindig negatív", False), ("Mindig pozitív", False), ("Kivonást kell végezni", False)]},
    {"t": "Mennyi (-20) : (+4)?", "type": "text-input", "ans": "-5"},
    {"t": "Mennyi (-36) : (-6)?", "type": "text-input", "ans": "6"},
    {"t": "Nullával osztani nem lehet a matematikában.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi (+50) : (-5)?", "type": "text-input", "ans": "-10"},
    {"t": "Ha a (-15)-öt elosztjuk (-3)-mal, az eredmény pozitív szám.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 0 : (-8)?", "type": "text-input", "ans": "0"}
])

add_quiz(8, t_egesz, "8. óra: Az egész számok osztásának gyakorlása", "Írásbeli és fejben osztás gyakorlása negatív és pozitív számokkal.", [
    {"t": "Mennyi (-100) : (-25)?", "type": "text-input", "ans": "4"},
    {"t": "Mennyi (-48) : (+8)?", "type": "text-input", "ans": "-6"},
    {"t": "Melyik egyenlet helyes?", "type": "multiple-choice", "opts": [("(-18) : (-3) = 6", True), ("(-18) : (-3) = -6", False), ("(-18) : (+3) = 6", False), ("(+18) : (-3) = 6", False)]},
    {"t": "A hányados ellenőrzése szorzással történik.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi (-81) : (+9)?", "type": "text-input", "ans": "-9"},
    {"t": "Ha két szám hányadosa pozitív, a két szám előjele azonos.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi (-144) : (-12)?", "type": "text-input", "ans": "12"}
])

add_quiz(9, t_egesz, "9. óra: Hány eset van? Számoljuk össze!", "Összeszámlálás fagráffal (ágrajz), táblázattal, rendszerezett felsorolással.", [
    {"t": "Milyen eszközt használhatunk az összes lehetőség rendszerezett szemléltetésére?", "type": "multiple-choice", "opts": [("Fagráfot (ágrajzot) és táblázatot", True), ("Szögmérőt", False), ("Körzőt", False), ("Vonalzót", False)]},
    {"t": "Hányféleképpen ülhet le 2 gyerek (Peti és Kati) két egymás melletti székre?", "type": "text-input", "ans": "2"},
    {"t": "Hány különböző 2 jegyű szám képezhető az 1 és 2 számjegyekből (számjegyismétléssel)?", "type": "text-input", "ans": "4"},
    {"t": "A rendszerezett felsorolás segít abban, hogy egyetlen lehetőséget se hagyjunk ki.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hányféleképpen választhatunk ki 3 póló és 2 nadrág közül egy ruhakészletet?", "type": "text-input", "ans": "6"},
    {"t": "A kombinatorikai feladatoknál a sorrend mindig számít.", "type": "true-false", "opts": [("Igaz", False), ("Hamis (van ahol számít, van ahol nem)", True)]},
    {"t": "Hány lapja van egy érmének (kimenetelek száma)?", "type": "text-input", "ans": "2"}
])

add_quiz(10, t_egesz, "10. óra: Gyakorlóóra. Hány eset van? Számoljuk össze!", "Összeszámlálási feladatok gyakorlása fagráffal és táblázattal.", [
    {"t": "Hány 2 jegyű páros szám képezhető az 1, 2, 3 számjegyekből (számjegyismétlés nélkül)?", "type": "multiple-choice", "opts": [("2 (12, 32)", True), ("3", False), ("4", False), ("6", False)]},
    {"t": "Három barát köszöntésekor (mindenki mindenkivel kezet fog) hány kézfogás történik?", "type": "text-input", "ans": "3"},
    {"t": "A fagráf ágai az egyes döntési lépéseket ábrázolják.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány különböző sorrendben futhat be a célba 3 versenyző (A, B, C)? (3! = 3*2*1)", "type": "text-input", "ans": "6"},
    {"t": "Ha 4 csapat játszik körmérkőzést (mindenki mindenkivel egyszer), hány mérkőzést játszanak összesen?", "type": "text-input", "ans": "6"},
    {"t": "Egy szabályos dobókocka eldobásakor 6-féle kimenetel lehetséges.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány kétjegyű szám képezhető a 0 és 5 számjegyekből (0 nem lehet az első számjegy)?", "type": "text-input", "ans": "2"}
])

add_quiz(11, t_egesz, "11. óra: Összeszámlálási feladatok megoldása", "Önálló feladatmegoldás rendszerezett felsorolással és faábrával.", [
    {"t": "Hányféleképpen rakhatunk sorba 4 különböző könyvet a polcon? (4*3*2*1)", "type": "text-input", "ans": "24"},
    {"t": "Hány 3 jegyű szám képezhető a 7, 8, 9 számjegyekből ha mindegyiket csak egyszer használhatjuk fel?", "type": "text-input", "ans": "6"},
    {"t": "Az ágrajz utolsó szintjén lévő levelek száma megadja az összes lehetséges kimenetelt.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik állítás igaz a valószínűségi kísérletekre?", "type": "multiple-choice", "opts": [("A lehetséges esetek száma a kedvező és kedvezőtlen esetek összege", True), ("Mindig csak 1 eset lehetséges", False), ("Sohasem lehet kiszámolni az esetek számát", False), ("Csak páros szám lehet az eredmény", False)]},
    {"t": "Hányféle kétgombócos fagyit választhatunk 3-féle ízből, ha két különböző ízt kérünk?", "type": "text-input", "ans": "3"},
    {"t": "Ha egy feldobott pénzérmét kétszer dobunk fel egymás után, a lehetséges kimenetelek száma 4.", "type": "true-false", "opts": [("Igaz (FF, FI, IF, II)", True), ("Hamis", False)]},
    {"t": "Hány válaszlehetőség van egy 4 opciós feleletválasztós kérdésnél?", "type": "text-input", "ans": "4"}
])

add_quiz(12, t_egesz, "12. óra: Számonkérés", "Az egész számok műveleteiből és az összeszámlálásból tanultak számonkérése (10 kérdés).", [
    {"t": "1. Mennyi (-15) + (+20)?", "type": "text-input", "ans": "5"},
    {"t": "2. Mennyi (-6) * (-8)?", "type": "text-input", "ans": "48"},
    {"t": "3. Mennyi (-54) : (+9)?", "type": "text-input", "ans": "-6"},
    {"t": "4. Melyik szám abszolút értéke nagyobb: |-30| vagy |+20|?", "type": "multiple-choice", "opts": [("|-30|", True), ("|+20|", False), ("Egyenlőek", False), ("Egyik sem", False)]},
    {"t": "5. Mennyi (-3) * (-2) * (-5)?", "type": "text-input", "ans": "-30"},
    {"t": "6. A negatív szám szorzása negatív számmal pozitív eredményt ad.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "7. Hány különböző sorrendben ülhet le 3 gyerek egy padra?", "type": "text-input", "ans": "6"},
    {"t": "8. Mennyi (-40) : (-8)?", "type": "text-input", "ans": "5"},
    {"t": "9. A nullának nincs ellentettje (vagy önmaga az ellentettje).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "10. Mennyi (-10) + (-20) - (-15)?", "type": "text-input", "ans": "-15"}
])

add_quiz(13, t_egesz, "13. óra: Osztó, többszörös", "Osztó, többszörös fogalma, osztópárok meghatározása.", [
    {"t": "Mit nevezünk egy 'a' természetes szám osztójának?", "type": "multiple-choice", "opts": [("Azt a 'b' számot, amellyel 'a'-t elosztva a maradék 0", True), ("Azt a számot, amit 'a'-hoz hozzáadunk", False), ("Azt a számot, ami nagyobb 'a'-nál", False), ("Minden páratlan számot", False)]},
    {"t": "Az 1 minden természetes számnak osztója.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány osztója van a 12-nek? (1, 2, 3, 4, 6, 12)", "type": "text-input", "ans": "6"},
    {"t": "Melyik szám a 15 többszöröse az alábbiak közül?", "type": "multiple-choice", "opts": [("45", True), ("5", False), ("3", False), ("10", False)]},
    {"t": "Minden számnak végtelen sok többszöröse van.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mi a 20 legkisebb pozitív osztója?", "type": "text-input", "ans": "1"},
    {"t": "Mi a 20 legnagyobb osztója önmagán kívül?", "type": "text-input", "ans": "10"}
])

add_quiz(14, t_egesz, "14. óra: Számolás maradékokkal", "Az osztási maradék fogalma, paritás vizsgálata, összeg maradéka.", [
    {"t": "Mennyi a maradék, ha 23-at elosztjuk 5-tel? (23 = 4*5 + 3)", "type": "text-input", "ans": "3"},
    {"t": "Egy számot 4-gyel elosztva a lehetséges maradékok: 0, 1, 2, 3.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Milyen maradékot ad 2-vel osztva minden páratlan szám?", "type": "text-input", "ans": "1"},
    {"t": "Két páratlan szám összege mindig páros szám.", "type": "true-false", "opts": [("Igaz (páratlan + páratlan = páros)", True), ("Hamis", False)]},
    {"t": "Mennyi a maradék 37 : 10 esetén?", "type": "text-input", "ans": "7"},
    {"t": "Két páros szám szorzata mindig páros szám.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik szám ad 0 maradékot 3-mal osztva?", "type": "multiple-choice", "opts": [("15", True), ("16", False), ("17", False), ("19", False)]}
])

add_quiz(15, t_egesz, "15. óra: Hány osztója van?", "Természetes számok csoportosítása osztóik száma alapján, prímek és összetett számok.", [
    {"t": "Hogyan nevezzük azokat a számokat, amelyeknek pontosan 2 osztójuk van (1 és önmaga)?", "type": "multiple-choice", "opts": [("Prímszámok (prímek)", True), ("Összetett számok", False), ("Páros számok", False), ("Negatív számok", False)]},
    {"t": "Az 1 prímszám.", "type": "true-false", "opts": [("Igaz", False), ("Hamis (az 1 sem nem prím, sem nem összetett)", True)]},
    {"t": "Melyik a legkisebb prímszám?", "type": "text-input", "ans": "2"},
    {"t": "Melyik az egyetlen páros prímszám?", "type": "text-input", "ans": "2"},
    {"t": "Azokat a számokat, amelyeknek 2-nél több osztójuk van, összetett számoknak nevezzük.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány osztója van a 7-nek?", "type": "text-input", "ans": "2"},
    {"t": "Melyik prím az alábbiak közül?", "type": "multiple-choice", "opts": [("13", True), ("9", False), ("15", False), ("21", False)]}
])

add_quiz(16, t_egesz, "16. óra: Feladatok az osztók számának meghatározására, számolás maradékokkal", "Szöveges feladatok az osztókról és maradékokról.", [
    {"t": "Hány osztója van a 9-nek? (1, 3, 9)", "type": "text-input", "ans": "3"},
    {"t": "A négyzetszámoknak páratlan számú osztójuk van.", "type": "true-false", "opts": [("Igaz (pl. 9-nek 3 osztója van: 1, 3, 9)", True), ("Hamis", False)]},
    {"t": "Ha 25 alma van és 4 gyerek között egyenlően elosztjuk, hány alma marad a kosárban?", "type": "text-input", "ans": "1"},
    {"t": "Hány prímszám van 10 és 20 között? (11, 13, 17, 19)", "type": "text-input", "ans": "4"},
    {"t": "Melyik szám összetett szám az alábbiak közül?", "type": "multiple-choice", "opts": [("27 (osztói: 1,3,9,27)", True), ("23", False), ("29", False), ("31", False)]},
    {"t": "Minden páratlan szám prímszám.", "type": "true-false", "opts": [("Igaz", False), ("Hamis (pl. 9, 15, 21 nem prím)", True)]},
    {"t": "Mennyi a legkisebb kétjegyű prímszám?", "type": "text-input", "ans": "11"}
])

add_quiz(17, t_egesz, "17. óra: Oszthatóság 2-vel, 5-tel, 10-zel", "Oszthatósági szabályok az utolsó számjegy alapján.", [
    {"t": "Mikor osztható egy szám 2-vel?", "type": "multiple-choice", "opts": [("Ha az utolsó számjegye páros (0, 2, 4, 6, 8)", True), ("Ha a számjegyek összege 2", False), ("Ha 5-re végződik", False), ("Minden szám osztható 2-vel", False)]},
    {"t": "Mikor osztható egy szám 5-tel?", "type": "multiple-choice", "opts": [("Ha az utolsó számjegye 0 vagy 5", True), ("Ha 2-re végződik", False), ("Ha páratlan", False), ("Ha a számjegyek összege 5", False)]},
    {"t": "Mikor osztható egy szám 10-zel?", "type": "multiple-choice", "opts": [("Ha az utolsó számjegye 0", True), ("Ha az utolsó számjegye 5", False), ("Ha páros", False), ("Ha 10 számjegyből áll", False)]},
    {"t": "A 435 osztható 5-tel.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A 680 osztható 2-vel, 5-tel és 10-zel is.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Osztható-e a 789 2-vel?", "type": "true-false", "opts": [("Igaz", False), ("Hamis (páratlanra végződik)", True)]},
    {"t": "Melyik számjegy állhat a 45_ végén, hogy a szám osztható legyen 10-zel?", "type": "text-input", "ans": "0"}
])

add_quiz(18, t_egesz, "18. óra: Oszthatóság 3-mal és 9-cel", "A számjegyek összegén alapuló oszthatósági szabályok.", [
    {"t": "Mikor osztható egy szám 3-mal?", "type": "multiple-choice", "opts": [("Ha a számjegyeinek összege osztható 3-mal", True), ("Ha 3-ra végződik", False), ("Ha páratlan", False), ("Ha az utolsó számjegye 3, 6 vagy 9", False)]},
    {"t": "Mikor osztható egy szám 9-cel?", "type": "multiple-choice", "opts": [("Ha a számjegyeinek összege osztható 9-cel", True), ("Ha 9-re végződik", False), ("Ha 3-ra végződik", False), ("Ha páros", False)]},
    {"t": "Mennyi a 243 számjegyeinek összege (2+4+3)?", "type": "text-input", "ans": "9"},
    {"t": "A 243 osztható 3-mal és 9-cel is.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Ha egy szám osztható 9-cel, akkor 3-mal is osztható.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Osztható-e a 124 3-mal? (számjegyösszeg: 1+2+4=7)", "type": "true-false", "opts": [("Igaz", False), ("Hamis", True)]},
    {"t": "Melyik számjegyet kell az X helyére írni a 51X számban, hogy osztható legyen 9-cel? (5+1+X=9)", "type": "text-input", "ans": "3"}
])

add_quiz(19, t_egesz, "19. óra: Oszthatóság 4-gyel és 100-zal", "Oszthatósági szabály az utolsó két számjegy alapján.", [
    {"t": "Mikor osztható egy szám 4-gyel?", "type": "multiple-choice", "opts": [("Ha az utolsó két számjegyéből képzett kétjegyű szám osztható 4-gyel (vagy 00)", True), ("Ha 4-re végződik", False), ("Ha a számjegyek összege 4", False), ("Ha páros", False)]},
    {"t": "Mikor osztható egy szám 100-zal?", "type": "multiple-choice", "opts": [("Ha az utolsó két számjegye 00", True), ("Ha 100-ra végződik", False), ("Ha 0-ra végződik", False), ("Ha páros", False)]},
    {"t": "A 316 osztható 4-gyel (mert 16 osztható 4-gyel).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A 7500 osztható 100-zal és 4-gyel is.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Osztható-e a 522 4-gyel? (22 / 4 = 5 maradék 2)", "type": "true-false", "opts": [("Igaz", False), ("Hamis", True)]},
    {"t": "Melyik legkisebb kétjegyű szám osztható 4-gyel?", "type": "text-input", "ans": "12"},
    {"t": "A 1000 osztható 4-gyel.", "type": "true-false", "opts": [("Igaz (00-ra végződik)", True), ("Hamis", False)]}
])

add_quiz(20, t_egesz, "20. óra: Összetett oszthatósági szabályok", "Új oszthatósági szabályok alkotása (pl. 6-tal való oszthatóság).", [
    {"t": "Mikor osztható egy szám 6-tal?", "type": "multiple-choice", "opts": [("Ha 2-vel és 3-mal is osztható egyszerre (páros és a számjegyösszeg 3-mal osztható)", True), ("Ha 6-ra végződik", False), ("Ha a számjegyek összege 6", False), ("Ha 12-vel osztható", False)]},
    {"t": "Mikor osztható egy szám 15-tel?", "type": "multiple-choice", "opts": [("Ha 3-mal és 5-tel is osztható egyszerre", True), ("Ha 15-re végződik", False), ("Ha páratlan", False), ("Ha 5-tel osztható", False)]},
    {"t": "A 132 osztható 6-tal (páros és 1+3+2=6).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A 45 osztható 15-tel.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mikor osztható egy szám 12-vel?", "type": "multiple-choice", "opts": [("Ha 3-mal és 4-gyel is osztható", True), ("Ha 2-vel és 6-tal", False), ("Ha 12-re végződik", False), ("Ha páros", False)]},
    {"t": "Osztható-e a 210 6-tal?", "type": "true-false", "opts": [("Igaz (páros, 2+1+0=3)", True), ("Hamis", False)]},
    {"t": "Melyik számjegy tehető a 34_ végére, hogy osztható legyen 6-tal? (páros kell és 3+4+X osztható 3-mal)", "type": "text-input", "ans": "2"}
])

add_quiz(21, t_egesz, "21. óra: Gyakorlóóra: a tanult oszthatósági szabályok alkalmazása", "Gyakorlás, igaz-hamis állítások, halmazábrák oszthatóságra.", [
    {"t": "Melyik szám osztható 2-vel, 3-mal és 5-tel is (azaz 30-cal)?", "type": "multiple-choice", "opts": [("90", True), ("45", False), ("80", False), ("100", False)]},
    {"t": "A 180 osztható 4-gyel és 9-cel is.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány olyan szám van 1 és 100 között, ami osztható 10-zel?", "type": "text-input", "ans": "10"},
    {"t": "Melyik szám osztható 9-cel?", "type": "multiple-choice", "opts": [("729 (7+2+9=18)", True), ("721", False), ("725", False), ("730", False)]},
    {"t": "Ha egy szám osztható 10-zel, akkor 5-tel is osztható.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik a legkisebb háromjegyű szám, ami osztható 5-tel?", "type": "text-input", "ans": "100"},
    {"t": "Melyik a legkisebb háromjegyű szám, ami osztható 3-mal?", "type": "text-input", "ans": "102"}
])

add_quiz(22, t_egesz, "22. óra: Többszörös, közös többszörös", "Közös többszörösök, legkisebb közös többszörös (lkkt) és közös nevező.", [
    {"t": "Mit jelent két szám legkisebb közös többszöröse (lkkt)?", "type": "multiple-choice", "opts": [("A legkisebb olyan pozitív számot, amely mindkét számmal osztható", True), ("A két szám szorzatát mindig", False), ("A legkisebb osztót", False), ("A két szám különbségét", False)]},
    {"t": "Mennyi a 4 és 6 legkisebb közös többszöröse, lkkt(4, 6)?", "type": "text-input", "ans": "12"},
    {"t": "Mennyi a 3 és 5 legkisebb közös többszöröse, lkkt(3, 5)?", "type": "text-input", "ans": "15"},
    {"t": "Relatív prímek (pl. 3 és 5) legkisebb közös többszöröse a két szám szorzata.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A közös többszöröst használjuk törtek közös nevezőre hozásakor.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 6 és 8 legkisebb közös többszöröse?", "type": "text-input", "ans": "24"},
    {"t": "Melyik szám közös többszöröse a 2-nek és a 5-nek?", "type": "multiple-choice", "opts": [("10", True), ("15", False), ("8", False), ("12", False)]}
])

add_quiz(23, t_egesz, "23. óra: Osztó, közös osztó", "Közös osztók, legnagyobb közös osztó (lnko) és törtek egyszerűsítése.", [
    {"t": "Mit jelent két szám legnagyobb közös osztója (lnko)?", "type": "multiple-choice", "opts": [("A legnagyobb olyan pozitív számot, amely mindkét számot osztja", True), ("A két szám összege", False), ("A legkisebb többszöröst", False), ("Az 1-et mindig", False)]},
    {"t": "Mennyi a 12 és 18 legnagyobb közös osztója, lnko(12, 18)?", "type": "text-input", "ans": "6"},
    {"t": "Mennyi a 15 és 25 legnagyobb közös osztója?", "type": "text-input", "ans": "5"},
    {"t": "Két számot relatív prímeknek nevezünk, ha a legnagyobb közös osztójuk 1.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A 8 és 9 relatív prímek (lnko(8,9) = 1).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A legnagyobb közös osztóval egyszerűsítve a törtet a legegyszerűbb alakot kapjuk.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 20 és 30 legnagyobb közös osztója?", "type": "text-input", "ans": "10"}
])

add_quiz(24, t_egesz, "24. óra: Összefoglalás", "A tanult fogalmak ismétlése, rendszerezése az egész számok és oszthatóság témakörből.", [
    {"t": "Mennyi (-12) * (-5)?", "type": "text-input", "ans": "60"},
    {"t": "Mennyi lkkt(6, 9)?", "type": "text-input", "ans": "18"},
    {"t": "Mennyi lnko(24, 36)?", "type": "text-input", "ans": "12"},
    {"t": "A 135 osztható 5-tel és 9-cel is.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A 2 az egyetlen páros prímszám.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi (-50) : (+10)?", "type": "text-input", "ans": "-5"},
    {"t": "Melyik szám osztható 4-gyel?", "type": "multiple-choice", "opts": [("524", True), ("522", False), ("521", False), ("523", False)]}
])

add_quiz(25, t_egesz, "25. óra: Tesztfeladatok megoldása", "Feladatmegoldási gyakorlat önállóan az oszthatósági téma lezárása előtt.", [
    {"t": "Hány osztója van a 10-nek? (1, 2, 5, 10)", "type": "text-input", "ans": "4"},
    {"t": "Osztható-e a 432 6-tal?", "type": "true-false", "opts": [("Igaz (páros és 4+3+2=9)", True), ("Hamis", False)]},
    {"t": "Mennyi (-7) * (+6)?", "type": "text-input", "ans": "-42"},
    {"t": "Melyik szorzat eredménye pozitív?", "type": "multiple-choice", "opts": [("(-4) * (-5)", True), ("(-4) * (+5)", False), ("(+4) * (-5)", False), ("(-4) * 0", False)]},
    {"t": "Mennyi a maradék, ha 47-et 5-tel osztunk?", "type": "text-input", "ans": "2"},
    {"t": "A 17 prímszám.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi lkkt(4, 10)?", "type": "text-input", "ans": "20"}
])

add_quiz(26, t_egesz, "26. óra: Témazáró dolgozat", "Témazáró számonkérés az Egész számok és oszthatóság témakörből (10 kérdés).", [
    {"t": "1. Mennyi (-18) + (+30)?", "type": "text-input", "ans": "12"},
    {"t": "2. Mennyi (-7) * (-9)?", "type": "text-input", "ans": "63"},
    {"t": "3. Mennyi (-72) : (+8)?", "type": "text-input", "ans": "-9"},
    {"t": "4. Osztható-e a 534 3-mal?", "type": "true-false", "opts": [("Igaz (5+3+4=12)", True), ("Hamis", False)]},
    {"t": "5. Osztható-e a 620 4-gyel?", "type": "true-false", "opts": [("Igaz (20 osztható 4-gyel)", True), ("Hamis", False)]},
    {"t": "6. Mennyi lkkt(6, 10)?", "type": "text-input", "ans": "30"},
    {"t": "7. Mennyi lnko(18, 24)?", "type": "text-input", "ans": "6"},
    {"t": "8. Hány prímszám van 1 és 10 között? (2, 3, 5, 7)", "type": "text-input", "ans": "4"},
    {"t": "9. Hányféleképpen ülhet le 3 gyermek 3 székre?", "type": "text-input", "ans": "6"},
    {"t": "10. Két negatív szám szorzata mindig pozitív.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(27, t_egesz, "27. óra: Témazáró dolgozat értékelése", "A témazáró dolgozat megbeszélése, hibák elemzése, tapasztalatok összegzése.", [
    {"t": "Mi volt a leggyakoribb hiba az előjelszabályok alkalmazásakor?", "type": "multiple-choice", "opts": [("A szorzás/osztás és összeadás előjelszabályainak összetévesztése", True), ("A számok leírása", False), ("A vonalzó használata", False), ("A válasz elhagyása", False)]},
    {"t": "Az osztási szabályok (pl. 3-mal, 9-cel) esetén a számjegyek összege a döntő.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi (-5) * (-5)?", "type": "text-input", "ans": "25"},
    {"t": "A lkkt meghatározásánál a többszörösök közül a legkisebbet választjuk.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi (-30) : (-5)?", "type": "text-input", "ans": "6"},
    {"t": "A dolgozatok áttekintése segít a hiányosságok pótlásában.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi lnko(10, 15)?", "type": "text-input", "ans": "5"}
])

print("Egész számok quizzes created (4-27).")
