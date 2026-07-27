import json
import uuid

teacher_id = '21feff02-016d-46e2-bb9d-c27495133b1b'
subject = 'Matematika'
grade_level = '5. osztály'
topic = 'Hosszúság, terület, térfogat'

lessons_data = [
    {
        "num": 76,
        "title": "76. óra: A hosszúság mérése",
        "description": "Mérőszám, mértékegység (mm, cm, dm, m, km) és átváltások.",
        "questions": [
            {
                "text": "Mi a hosszúság alapvető SI mértékegysége?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Méter (m)", "isCorrect": True},
                    {"text": "Gramm (g)", "isCorrect": False},
                    {"text": "Liter (l)", "isCorrect": False},
                    {"text": "Fok (°)", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány centiméter 1 méter?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "100"
            },
            {
                "text": "Hány méter 1 kilométer?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "1000"
            },
            {
                "text": "Hány milliméter 1 centiméter?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "10"
            },
            {
                "text": "Az 5 dm átváltva centiméterbe 50 cm.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány deciméter 30 centiméter?",
                "type": "multiple-choice",
                "options": [
                    {"text": "3 dm", "isCorrect": True},
                    {"text": "300 dm", "isCorrect": False},
                    {"text": "30 dm", "isCorrect": False},
                    {"text": "0,3 dm", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "A hosszúság mérésekor a mérőszám megmutatja, hányszor tartalmazza a mennyiség a választott mértékegységet.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            }
        ]
    },
    {
        "num": 77,
        "title": "77. óra: Téglalap, négyzet kerülete",
        "description": "Téglalap és négyzet kerületének kiszámítása, szöveges feladatok.",
        "questions": [
            {
                "text": "Mit jelent egy síkidom kerülete?",
                "type": "multiple-choice",
                "options": [
                    {"text": "A határoló oldalainak hosszának összegét", "isCorrect": True},
                    {"text": "A síkidom által lefedett terület nagyságát", "isCorrect": False},
                    {"text": "Az átlók hosszának szorzatát", "isCorrect": False},
                    {"text": "A csúcsok számát", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Mi a négyzet kerületképlete, ha oldala 'a'?",
                "type": "multiple-choice",
                "options": [
                    {"text": "K = 4 * a", "isCorrect": True},
                    {"text": "K = a * a", "isCorrect": False},
                    {"text": "K = 2 * a", "isCorrect": False},
                    {"text": "K = a + 4", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Mennyi a kerülete egy 7 cm oldalú négyzetnek? (cm-ben)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "28"
            },
            {
                "text": "Mi a téglalap kerületképlete, ha oldalai 'a' és 'b'?",
                "type": "multiple-choice",
                "options": [
                    {"text": "K = 2 * (a + b)", "isCorrect": True},
                    {"text": "K = a * b", "isCorrect": False},
                    {"text": "K = a + b", "isCorrect": False},
                    {"text": "K = 2 * a * b", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Egy téglalap oldalai 5 cm és 8 cm. Mennyi a kerülete? (cm-ben)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "26"
            },
            {
                "text": "Ha egy négyzet kerülete 36 cm, mekkora az egy oldala? (cm-ben)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "9"
            },
            {
                "text": "Egy 3 m és 4 m oldalú kert kerítése 14 méter hosszú dróthálót igényel.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz (2*(3+4)=14)", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            }
        ]
    },
    {
        "num": 78,
        "title": "78. óra: A terület mérése",
        "description": "A terület fogalma, lefedés, szabványos terület-mértékegységek.",
        "questions": [
            {
                "text": "Mi a terület mérésének alapvető elve?",
                "type": "multiple-choice",
                "options": [
                    {"text": "A síkidom lefedése választott területegységgel (pl. 1 cm²-es négyzetekkel)", "isCorrect": True},
                    {"text": "A síkidom oldalainak összeadása", "isCorrect": False},
                    {"text": "A síkidom elforgatása", "isCorrect": False},
                    {"text": "A síkidom mérlegre helyezése", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Melyik terület-mértékegység jelent egy 1 m oldalú négyzet területét?",
                "type": "multiple-choice",
                "options": [
                    {"text": "1 négyzetméter (1 m²)", "isCorrect": True},
                    {"text": "1 négyzetcentiméter (1 cm²)", "isCorrect": False},
                    {"text": "1 méter (1 m)", "isCorrect": False},
                    {"text": "1 köbméter (1 m³)", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány cm² egy 1 dm²-es négyzet területe? (10 cm * 10 cm)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "100"
            },
            {
                "text": "Hány mm² egy 1 cm²-es négyzet területe? (10 mm * 10 mm)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "100"
            },
            {
                "text": "A terület mértékegységeinél a váltószám a szomszédos egységek között 100.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz (mm² <-> cm² <-> dm² <-> m²)", "isCorrect": True},
                    {"text": "Hamis (10)", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány dm² van 5 m²-ben?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "500"
            },
            {
                "text": "A kerület és a terület ugyanazt a tulajdonságot méri a síkidomoknál.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": False},
                    {"text": "Hamis (kerület a határoló vonal hossza, terület a lefedett felület nagysága)", "isCorrect": True}
                ],
                "timeLimit": 15
            }
        ]
    },
    {
        "num": 79,
        "title": "79. óra: Téglalap, négyzet területe",
        "description": "Téglalap és négyzet területének kiszámítása, gyakorlati példák (udvar, szoba).",
        "questions": [
            {
                "text": "Mi a téglalap területképlete, ha oldalai 'a' és 'b'?",
                "type": "multiple-choice",
                "options": [
                    {"text": "T = a * b", "isCorrect": True},
                    {"text": "T = 2 * (a + b)", "isCorrect": False},
                    {"text": "T = a + b", "isCorrect": False},
                    {"text": "T = a * a", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Mi a négyzet területképlete, ha oldala 'a'?",
                "type": "multiple-choice",
                "options": [
                    {"text": "T = a * a (a²)", "isCorrect": True},
                    {"text": "T = 4 * a", "isCorrect": False},
                    {"text": "T = 2 * a", "isCorrect": False},
                    {"text": "T = a + a", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Egy szoba 4 m széles és 5 m hosszú. Mekkora az alapterülete? (m²-ben)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "20"
            },
            {
                "text": "Mennyi a területe egy 6 cm oldalú négyzetnek? (cm²-ben)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "36"
            },
            {
                "text": "Egy téglalap területe 24 cm², egyik oldala 4 cm. Mekkora a másik oldala? (cm-ben)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "6"
            },
            {
                "text": "Ha egy négyzet területe 49 cm², akkor az oldala 7 cm hosszú.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz (mert 7 * 7 = 49)", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Két téglalapnak lehet azonos a kerülete, de eltérő a területe.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz (pl. 1x5 cm: K=12, T=5 vs 2x4 cm: K=12, T=8)", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            }
        ]
    },
    {
        "num": 80,
        "title": "80. óra: Téglatest, kocka",
        "description": "Téglatest, kocka, négyzetes oszlop tulajdonságai, testek hálója.",
        "questions": [
            {
                "text": "Milyen test a kocka?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Olyan téglatest, melynek minden éle egyenlő hosszúságú (minden lapja egybevágó négyzet)", "isCorrect": True},
                    {"text": "Olyan test, melynek minden lapja háromszög", "isCorrect": False},
                    {"text": "Gömbszerű test", "isCorrect": False},
                    {"text": "Sík idom", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány egybevágó négyzetből áll a kocka hálója?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "6"
            },
            {
                "text": "Milyen test a négyzetes oszlop?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Olyan téglatest, amelynek alaplapja és fedőlapja egyenlő négyzet", "isCorrect": True},
                    {"text": "Olyan test, amelynek minden lapja rombusz", "isCorrect": False},
                    {"text": "Henger alakú test", "isCorrect": False},
                    {"text": "Kúp", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "A téglatestnek 6 lapja, 8 csúcsa és 12 éle van.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány pár egybevágó szemközti lapja van a téglatestnek?",
                "type": "multiple-choice",
                "options": [
                    {"text": "3 pár", "isCorrect": True},
                    {"text": "6 pár", "isCorrect": False},
                    {"text": "2 pár", "isCorrect": False},
                    {"text": "4 pár", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "A téglatest hálója kiteríthető a síkba úgy, hogy 6 téglalap alkotja.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány él találkozik a kocka egy-egy csúcsában?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "3"
            }
        ]
    },
    {
        "num": 81,
        "title": "81. óra: Téglatest, kocka felszíne",
        "description": "Téglatest és kocka felszínének kiszámítása a határoló lapok területéből.",
        "questions": [
            {
                "text": "Mit jelent a test felszíne (A)?",
                "type": "multiple-choice",
                "options": [
                    {"text": "A testet határoló lapok területének összegét", "isCorrect": True},
                    {"text": "A test éleinek hosszának összegét", "isCorrect": False},
                    {"text": "A test által elfoglalt térfogatot", "isCorrect": False},
                    {"text": "A csúcsok számát", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Mi a kocka felszínképlete, ha élhossza 'a'?",
                "type": "multiple-choice",
                "options": [
                    {"text": "A = 6 * a * a (6 * a²)", "isCorrect": True},
                    {"text": "A = a * a * a", "isCorrect": False},
                    {"text": "A = 12 * a", "isCorrect": False},
                    {"text": "A = 4 * a * a", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Mennyi a felszíne egy 3 cm élű kockának? (6 * 3 * 3 cm²-ben)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "54"
            },
            {
                "text": "Mi a téglatest felszínképlete, ha élei 'a', 'b', 'c'?",
                "type": "multiple-choice",
                "options": [
                    {"text": "A = 2 * (a*b + a*c + b*c)", "isCorrect": True},
                    {"text": "A = a * b * c", "isCorrect": False},
                    {"text": "A = a + b + c", "isCorrect": False},
                    {"text": "A = 4 * (a + b + c)", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Egy téglatest élei 2 cm, 3 cm és 4 cm. Mennyi a felszíne? (2*(6+8+12))",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "52"
            },
            {
                "text": "Ha egy kocka lapjának területe 25 cm², a teljes felszíne 150 cm².",
                "type": "true-false",
                "options": [
                    {"text": "Igaz (6 * 25 = 150)", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "A felszín mértékegységei megegyeznek a terület mértékegységeivel (pl. cm², m²).",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            }
        ]
    },
    {
        "num": 82,
        "title": "82. óra: A térfogat mérése",
        "description": "A térfogat fogalma, egységkockák, térfogat- és űrmértékegységek (l, dl, cl, ml).",
        "questions": [
            {
                "text": "Mi a térfogat (V) jelentése?",
                "type": "multiple-choice",
                "options": [
                    {"text": "A test által elfoglalt térrész nagysága", "isCorrect": True},
                    {"text": "A test határoló lapjainak területe", "isCorrect": False},
                    {"text": "A test éleinek hossza", "isCorrect": False},
                    {"text": "A test tömege kilogrammban", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Melyik a térfogat alapvető SI mértékegysége?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Köbméter (m³)", "isCorrect": True},
                    {"text": "Négyzetméter (m²)", "isCorrect": False},
                    {"text": "Méter (m)", "isCorrect": False},
                    {"text": "Liter (l)", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány köbdeciméter (dm³) felel meg 1 liternek?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "1"
            },
            {
                "text": "Hány cm³ van 1 dm³-ben? (10 cm * 10 cm * 10 cm)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "1000"
            },
            {
                "text": "Hány deciliter 1 liter?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "10"
            },
            {
                "text": "A térfogat mértékegységeknél a váltószám a szomszédos köbös egységek között (cm³, dm³, m³) 1000.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis (100)", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "1 milliliter (ml) pontosan 1 cm³ térfogatnak felel meg.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            }
        ]
    },
    {
        "num": 83,
        "title": "83. óra: Téglatest, kocka térfogata",
        "description": "Téglatest és kocka térfogatképlete és kiszámítása.",
        "questions": [
            {
                "text": "Mi a kocka térfogatképlete, ha élhossza 'a'?",
                "type": "multiple-choice",
                "options": [
                    {"text": "V = a * a * a (a³)", "isCorrect": True},
                    {"text": "V = 6 * a * a", "isCorrect": False},
                    {"text": "V = 12 * a", "isCorrect": False},
                    {"text": "V = 4 * a", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Mennyi a térfogata egy 4 cm élű kockának? (cm³-ben)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "64"
            },
            {
                "text": "Mi a téglatest térfogatképlete, ha élei 'a', 'b', 'c'?",
                "type": "multiple-choice",
                "options": [
                    {"text": "V = a * b * c", "isCorrect": True},
                    {"text": "V = 2 * (a + b + c)", "isCorrect": False},
                    {"text": "V = a * b + c", "isCorrect": False},
                    {"text": "V = 2 * (ab + ac + bc)", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Egy téglatest élei 3 cm, 5 cm és 10 cm. Mennyi a térfogata? (cm³-ben)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "150"
            },
            {
                "text": "Ha egy akvárium hossza 5 dm, szélessége 4 dm, magassága 3 dm, hány liter víz fér bele tele öntve?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "60"
            },
            {
                "text": "Ha egy kocka térfogata 27 cm³, akkor az éle 3 cm.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz (3 * 3 * 3 = 27)", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "A térfogatot úgy is megkaphatjuk, hogy az alaplap területét megszorozzuk a magassággal (V = T_alap * m).",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            }
        ]
    },
    {
        "num": 84,
        "title": "84. óra: Gyakorlati feladatok",
        "description": "Kerület-, terület-, felszín- és térfogatszámítási összefüggések gyakorlati alkalmazása.",
        "questions": [
            {
                "text": "Melyik fogalmat használjuk, ha meg akarjuk tudni, mennyi festék kell egy szoba falainak lefestéséhez?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Terület / Felszín", "isCorrect": True},
                    {"text": "Kerület", "isCorrect": False},
                    {"text": "Térfogat", "isCorrect": False},
                    {"text": "Élhossz", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Melyik fogalmat használjuk, ha meg akarjuk tudni, hány liter víz fér egy medencébe?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Térfogat / Űrtartalom", "isCorrect": True},
                    {"text": "Felszín", "isCorrect": False},
                    {"text": "Kerület", "isCorrect": False},
                    {"text": "Átló", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Melyik fogalmat használjuk, ha körbe akarunk keríteni egy teleket kerítéssel?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Kerület", "isCorrect": True},
                    {"text": "Terület", "isCorrect": False},
                    {"text": "Térfogat", "isCorrect": False},
                    {"text": "Felszín", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Egy 20 m hosszú és 15 m széles telket kerítünk körbe. Hány méter kerítés kell? (m-ben)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "70"
            },
            {
                "text": "Egy 2 m x 3 m x 1,5 m-es láda térfogata 9 m³.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz (2 * 3 * 1,5 = 9)", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány darab 1 cm³-es kis kockából lehet felépíteni egy 2 cm x 3 cm x 4 cm-es téglatestet?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "24"
            },
            {
                "text": "A mértékegységek átváltása elengedhetetlen a gyakorlati mérési feladatok megoldásakor.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            }
        ]
    },
    {
        "num": 85,
        "title": "85. óra: Összefoglalás",
        "description": "Összefoglaló ismétlés: hosszúság, kerület, terület, felszín, térfogat.",
        "questions": [
            {
                "text": "Párosítsd a mértékegységet a mért mennyiséggel! Melyik mér TÉRFOGATOT?",
                "type": "multiple-choice",
                "options": [
                    {"text": "m³ (köbméter)", "isCorrect": True},
                    {"text": "m² (négyzetméter)", "isCorrect": False},
                    {"text": "m (méter)", "isCorrect": False},
                    {"text": "kg (kilogramm)", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Mennyi egy 10 cm oldalú négyzet kerülete és területe? (K cm-ben, T cm²-ben)",
                "type": "multiple-choice",
                "options": [
                    {"text": "K = 40 cm, T = 100 cm²", "isCorrect": True},
                    {"text": "K = 100 cm, T = 40 cm²", "isCorrect": False},
                    {"text": "K = 20 cm, T = 100 cm²", "isCorrect": False},
                    {"text": "K = 40 cm, T = 40 cm²", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány liter 2500 ml?",
                "type": "multiple-choice",
                "options": [
                    {"text": "2,5 liter", "isCorrect": True},
                    {"text": "25 liter", "isCorrect": False},
                    {"text": "0,25 liter", "isCorrect": False},
                    {"text": "250 liter", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Egy 2 cm élű kocka felszíne 24 cm², térfogata 8 cm³.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz (A=6*4=24, V=2*2*2=8)", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány centiméter 3,5 méter?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "350"
            },
            {
                "text": "Hány cm² van 2 dm²-ben?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "200"
            },
            {
                "text": "A téglalap kerületének mértékegysége m², területe m.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": False},
                    {"text": "Hamis (fordítva: kerület m, terület m²)", "isCorrect": True}
                ],
                "timeLimit": 15
            }
        ]
    },
    {
        "num": 86,
        "title": "86. óra: Témazáró dolgozat",
        "description": "Témazáró számonkérés a Hosszúság, terület, térfogat témakörből (10 kérdés).",
        "questions": [
            {
                "text": "1. Hány cm 2,5 m?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "250"
            },
            {
                "text": "2. Mennyi egy 8 cm és 5 cm oldalú téglalap kerülete? (cm-ben)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "26"
            },
            {
                "text": "3. Mennyi egy 8 cm és 5 cm oldalú téglalap területe? (cm²-ben)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "40"
            },
            {
                "text": "4. Mennyi egy 5 cm élű kocka felszíne? (cm²-ben)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "150"
            },
            {
                "text": "5. Mennyi egy 5 cm élű kocka térfogata? (cm³-ben)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "125"
            },
            {
                "text": "6. Hány liter víz van 3 dm³-ben?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "3"
            },
            {
                "text": "7. Egy téglatest élei 2 cm, 4 cm és 5 cm. Mennyi a térfogata? (cm³-ben)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "40"
            },
            {
                "text": "8. Hány m² van 400 dm²-ben?",
                "type": "multiple-choice",
                "options": [
                    {"text": "4 m²", "isCorrect": True},
                    {"text": "40 m²", "isCorrect": False},
                    {"text": "0,4 m²", "isCorrect": False},
                    {"text": "4000 m²", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "9. A kocka minden határoló lapja egybevágó négyzet.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "10. Ha egy négyzet kerülete 20 cm, a területe 25 cm².",
                "type": "true-false",
                "options": [
                    {"text": "Igaz (a=5 cm, T=25)", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            }
        ]
    },
    {
        "num": 87,
        "title": "87. óra: Témazáró dolgozat értékelése",
        "description": "A mérések témazáró dolgozat feladatainak megbeszélése és javítása.",
        "questions": [
            {
                "text": "Mi a leggyakoribb hiba a mértékegység-átváltáskor?",
                "type": "multiple-choice",
                "options": [
                    {"text": "A váltószám téves használata (pl. területnél 10 használata 100 helyett)", "isCorrect": True},
                    {"text": "A számok összeadása", "isCorrect": False},
                    {"text": "A ceruza használata", "isCorrect": False},
                    {"text": "A betűk leírása", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "A kerület hosszmérési egységekben (m, cm), a terület négyzetes egységekben (m², cm²) fejezendő ki.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "A térfogat köbös egységekben (m³, dm³, cm³) vagy űrmértékegységben (l, dl, ml) fejezendő ki.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Mennyi a téglalap kerülete, ha a = 10 cm, b = 2 dm (20 cm)? (cm-ben)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "60"
            },
            {
                "text": "Méréseknél figyelni kell arra, hogy a megadott adatok azonos mértékegységben legyenek kiszámítás előtt.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány liter víz fér el egy 1 m³-es tartályban?",
                "type": "multiple-choice",
                "options": [
                    {"text": "1000 liter (1000 dm³)", "isCorrect": True},
                    {"text": "100 liter", "isCorrect": False},
                    {"text": "10 liter", "isCorrect": False},
                    {"text": "10000 liter", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Ha a témazáró javításakor áttekinted a hibás példákat, legközelebb ügyesebben oldod meg azokat.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            }
        ]
    }
]

# Process and output SQL
sql_statements = []
for lesson in lessons_data:
    quiz_id = str(uuid.uuid4())
    qs = []
    for q in lesson["questions"]:
        q_id = str(uuid.uuid4())
        opts = []
        for opt in q.get("options", []):
            opts.append({
                "id": str(uuid.uuid4()),
                "text": opt["text"],
                "isCorrect": opt["isCorrect"]
            })
        q_obj = {
            "id": q_id,
            "text": q["text"],
            "type": q["type"],
            "options": opts,
            "timeLimit": q.get("timeLimit", 15)
        }
        if "correctAnswer" in q:
            q_obj["correctAnswer"] = q["correctAnswer"]
        qs.append(q_obj)

    qs_json = json.dumps(qs, ensure_ascii=False)
    title_esc = lesson["title"].replace("'", "''")
    desc_esc = lesson["description"].replace("'", "''")
    qs_json_esc = qs_json.replace("'", "''")

    stmt = f"""INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '{quiz_id}',
        '{teacher_id}',
        '{title_esc}',
        '{desc_esc}',
        '{subject}',
        '{grade_level}',
        '{topic}',
        '{qs_json_esc}'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );"""
    sql_statements.append(stmt)

full_sql = "\n\n".join(sql_statements)
with open("scratch/insert_meresek.sql", "w", encoding="utf-8") as f:
    f.write(full_sql)

print(f"Generated {len(lessons_data)} Meresek quizzes to scratch/insert_meresek.sql")
