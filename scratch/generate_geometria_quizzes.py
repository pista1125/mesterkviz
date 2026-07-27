import json
import uuid

teacher_id = '21feff02-016d-46e2-bb9d-c27495133b1b'
subject = 'Matematika'
grade_level = '5. osztály'
topic = 'Geometria'

lessons_data = [
    {
        "num": 63,
        "title": "63. óra: Csoportosítások",
        "description": "Konkrét elemek adott szempontok szerinti csoportokba rendezése.",
        "questions": [
            {
                "text": "Mit jelent a geometriai alakzatok csoportosítása?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Alakzatok rendszerezése közös tulajdonságok (pl. oldalak száma, forma) alapján", "isCorrect": True},
                    {"text": "Alakzatok kiszínezése véletlenszerűen", "isCorrect": False},
                    {"text": "Alakzatok megsemmisítése", "isCorrect": False},
                    {"text": "Alakzatok elforgatása 90 fokkal", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Ha a testeket úgy csoportosítjuk, hogy vannak-e csúcsaik, a golyó a csúccsal rendelkező csoportba tartozik.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": False},
                    {"text": "Hamis (a golyónak/gömbnek nincs csúcsa)", "isCorrect": True}
                ],
                "timeLimit": 15
            },
            {
                "text": "Melyik szempont szerint csoportosíthatjuk a síkidomokat?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Oldalak száma (pl. háromszögek, négyszögek)", "isCorrect": True},
                    {"text": "Súlyuk szerint", "isCorrect": False},
                    {"text": "Hőmérsékletük szerint", "isCorrect": False},
                    {"text": "Ízük szerint", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány oldala van egy ötszögnek?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "5"
            },
            {
                "text": "Egy háromszög és egy négyszög egy csoportba tartozik, ha az oldalak száma a csoportosítási szempont.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": False},
                    {"text": "Hamis (eltér az oldalaik száma)", "isCorrect": True}
                ],
                "timeLimit": 15
            },
            {
                "text": "Melyik alakzat NEM síkidom a következők közül?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Kocka (mert az térbeli test)", "isCorrect": True},
                    {"text": "Négyzet", "isCorrect": False},
                    {"text": "Kör", "isCorrect": False},
                    {"text": "Háromszög", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "A négyzet és a téglalap egyaránt 4 csúccsal rendelkező négyszög.",
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
        "num": 64,
        "title": "64. óra: Halmazok",
        "description": "Halmaz, halmazábra, halmazok egyesítése és közös része.",
        "questions": [
            {
                "text": "Mit nevezünk két halmaz közös részének (metszetének)?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Azokat az elemeket, amelyek mindkét halmazban benne vannak", "isCorrect": True},
                    {"text": "Azokat az elemeket, amelyek egyik halmazban sincsenek benne", "isCorrect": False},
                    {"text": "Csak az első halmaz elemeit", "isCorrect": False},
                    {"text": "A két halmaz elemeinek összegét", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "A Venn-diagram (halmazábra) segítségével ábrázolhatók a halmazok és kapcsolataik.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Ha az A halmazban piros alakzatok vannak, a B halmazban háromszögek, mi kerül a közös részbe?",
                "type": "multiple-choice",
                "options": [
                    {"text": "A piros háromszögek", "isCorrect": True},
                    {"text": "A kék négyzetek", "isCorrect": False},
                    {"text": "Minden piros alakzat", "isCorrect": False},
                    {"text": "Minden háromszög", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Mit jelent két halmaz egyesítése (uniója)?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Azokat az elemeket, amelyek legalább az egyik halmazhoz tartoznak", "isCorrect": True},
                    {"text": "Csak a közös elemeket", "isCorrect": False},
                    {"text": "Az üres halmazt", "isCorrect": False},
                    {"text": "Az elemek kivonását", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Ha az A halmazban a 2-vel osztható számok, a B-ben a 3-mal osztható számok vannak, a 6 a közös részben van.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz (mert 6 osztható 2-vel és 3-mal is)", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hogy hívjuk azt a halmazt, amelynek egyetlen eleme sincs?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "üres halmaz"
            },
            {
                "text": "A halmaz elemei sorrendje számít a halmaz megadásakor.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": False},
                    {"text": "Hamis (a halmaz elemeinek sorrendje közömbös)", "isCorrect": True}
                ],
                "timeLimit": 15
            }
        ]
    },
    {
        "num": 65,
        "title": "65. óra: Halmazok (Részhalmaz, komplementer halmaz)",
        "description": "Részhalmaz, komplementer halmaz elemeinek megadása és ábrázolása.",
        "questions": [
            {
                "text": "Mikor mondjuk, hogy az A halmaz részhalmaza a B halmaznak?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Ha az A halmaz minden eleme benne van a B halmazban is", "isCorrect": True},
                    {"text": "Ha az A halmaz több elemet tartalmaz, mint B", "isCorrect": False},
                    {"text": "Ha nincs közös elemük", "isCorrect": False},
                    {"text": "Ha B üres halmaz", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "A négyzetek halmaza részhalmaza a téglalapok halmazának.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz (minden négyzet egyben téglalap is)", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Mit jelent egy A halmaz komplementere (kiegészítő halmaza) az alaphalmazhoz képest?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Azokat az elemeket az alaphalmazból, amelyek NEM tartoznak az A halmazhoz", "isCorrect": True},
                    {"text": "Az A halmaz elemeinek dupláját", "isCorrect": False},
                    {"text": "Csak az A halmaz elemeit", "isCorrect": False},
                    {"text": "Az üres halmazt", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Ha az alaphalmaz az 5. osztályos tanulók, és az A halmaz a fiúk, ki alkotja az A komplementerét?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Az 5. osztályos lányok", "isCorrect": True},
                    {"text": "Minden 5. osztályos fiú", "isCorrect": False},
                    {"text": "A tanárok", "isCorrect": False},
                    {"text": "A 6. osztályosok", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Az üres halmaz minden halmaznak részhalmaza.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány elemű az {1, 3, 5, 7} halmaz?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "4"
            },
            {
                "text": "Minden téglalap egyben négyzet is.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": False},
                    {"text": "Hamis (csak az a téglalap négyzet, amelynek minden oldala egyenlő)", "isCorrect": True}
                ],
                "timeLimit": 15
            }
        ]
    },
    {
        "num": 66,
        "title": "66. óra: Test, felület, vonal, pont",
        "description": "Test, felület, vonal, pont. Egyenes, félegyenes, szakasz, sík.",
        "questions": [
            {
                "text": "Melyik geometriai alapfogalomnak nincs kiterjedése (hossza, szélessége, magassága)?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Pont", "isCorrect": True},
                    {"text": "Egyenes", "isCorrect": False},
                    {"text": "Sík", "isCorrect": False},
                    {"text": "Test", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Miben különbözik a szakasz az egyenestől?",
                "type": "multiple-choice",
                "options": [
                    {"text": "A szakasz mindkét irányban korlátos (két végpontja van)", "isCorrect": True},
                    {"text": "A szakasz végtelen hosszú", "isCorrect": False},
                    {"text": "A szakasz görbe vonal", "isCorrect": False},
                    {"text": "Nincs különbség köztük", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "A félegyenesnek van kezdőpontja, de másik irányban végtelenbe nyúlik.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Mivel mérjük két pont távolságát a síkban?",
                "type": "multiple-choice",
                "options": [
                    {"text": "A két pontot összekötő szakasz hosszával", "isCorrect": True},
                    {"text": "A két pont közötti terület nagyságával", "isCorrect": False},
                    {"text": "Szögmérővel fokokban", "isCorrect": False},
                    {"text": "Literekben", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány végpontja van egy szakasznak?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "2"
            },
            {
                "text": "Egy téglalap felülete kétdimenziós (síkbeli), míg a kocka egy háromdimenziós test.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány egyenes fektethető át két különböző ponton?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "1"
            }
        ]
    },
    {
        "num": 67,
        "title": "67. óra: A szög",
        "description": "Szögtartomány, szög csúcsa, szög szárai, szögfajták, szögmérő használata.",
        "questions": [
            {
                "text": "Hogy nevezzük azt a szöget, amely pontosan 90 fokos?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Derékszög", "isCorrect": True},
                    {"text": "Hegyesszög", "isCorrect": False},
                    {"text": "Tompaszög", "isCorrect": False},
                    {"text": "Egyenesszög", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Milyen szög az, amely 0 foknál nagyobb, de 90 foknál kisebb?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Hegyesszög", "isCorrect": True},
                    {"text": "Tompaszög", "isCorrect": False},
                    {"text": "Derékszög", "isCorrect": False},
                    {"text": "Homorúszög", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány fokos az egyenesszög?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "180"
            },
            {
                "text": "A 120 fokos szög tompaszög.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz (mert 90 foknál nagyobb és 180 foknál kisebb)", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Mi a szög mértékegysége?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Fok (°)", "isCorrect": True},
                    {"text": "Centiméter (cm)", "isCorrect": False},
                    {"text": "Gramm (g)", "isCorrect": False},
                    {"text": "Liter (l)", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány fok a teljesszög?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "360"
            },
            {
                "text": "A szög szárai két félegyenes, amelyek közös kezdőpontja a szög csúcsa.",
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
        "num": 68,
        "title": "68. óra: Síkidomok, sokszögek",
        "description": "Sokszög, oldal, csúcs, átló fogalma, háromszögek és négyszögek.",
        "questions": [
            {
                "text": "Mit nevezünk sokszög átlójának?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Két nem szomszédos csúcsot összekötő szakaszt", "isCorrect": True},
                    {"text": "A sokszög oldalát", "isCorrect": False},
                    {"text": "A sokszög kerületét", "isCorrect": False},
                    {"text": "A sokszög középpontját", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány átlója van egy háromszögnek?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "0"
            },
            {
                "text": "A háromszögeknek nincsenek átlói, mert minden csúcsuk szomszédos egymással.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány csúcsa és oldala van egy négyszögnek?",
                "type": "multiple-choice",
                "options": [
                    {"text": "4 csúcsa és 4 oldala", "isCorrect": True},
                    {"text": "3 csúcsa és 4 oldala", "isCorrect": False},
                    {"text": "4 csúcsa és 2 átlója (de 6 oldala)", "isCorrect": False},
                    {"text": "5 csúcsa és 5 oldala", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány átlója van egy négyszögnek?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "2"
            },
            {
                "text": "Hogy nevezzük azt a sokszöget, amelynek 6 oldala van?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Hatszög", "isCorrect": True},
                    {"text": "Hétszög", "isCorrect": False},
                    {"text": "Ötszög", "isCorrect": False},
                    {"text": "Négyszög", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "A szabályos sokszög minden oldala és minden belső szöge egyenlő.",
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
        "num": 69,
        "title": "69. óra: Testek építése, szemléltetése",
        "description": "Egyszerű testek készítése, modelljei, él, csúcs, lap geometriai tulajdonságai.",
        "questions": [
            {
                "text": "Hány lapja van egy kockának?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "6"
            },
            {
                "text": "Hány csúcsa van egy kockának?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "8"
            },
            {
                "text": "Hány éle van egy kockának?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "12"
            },
            {
                "text": "A téglatest minden lapja téglalap (amelyek közül egyesek lehetnek négyzetek is).",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hogy nevezzük a test lapjainak találkozási vonalát?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Él", "isCorrect": True},
                    {"text": "Csúcs", "isCorrect": False},
                    {"text": "Átló", "isCorrect": False},
                    {"text": "Magasság", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "A gömbnek nincs sík lapja és nincs éle sem.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Milyen síkidomok határolják a téglatestet?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Téglalapok", "isCorrect": True},
                    {"text": "Háromszögek", "isCorrect": False},
                    {"text": "Körök", "isCorrect": False},
                    {"text": "Ötszögek", "isCorrect": False}
                ],
                "timeLimit": 15
            }
        ]
    },
    {
        "num": 70,
        "title": "70. óra: Testek építése, szemléltetése (Látható és nem látható élek)",
        "description": "Látható és nem látható élek ábrázolása síkban, térbeli rajzolás.",
        "questions": [
            {
                "text": "Hogyan jelöljük a térbeli ábrákon a nem látható (takarásban lévő) éleket?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Szaggatott vagy pontozott vonallal", "isCorrect": True},
                    {"text": "Vastag folytonos vonallal", "isCorrect": False},
                    {"text": "Piros hullámvonallal", "isCorrect": False},
                    {"text": "Egyáltalán nem rajzoljuk le", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "A látható éleket folytonos vonallal rajzoljuk a tengelyes és térbeli ábrákon.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Ha egy kockát elölről nézünk úgy, hogy csak az elülső lapját látjuk, hány éle van takarásban?",
                "type": "multiple-choice",
                "options": [
                    {"text": "8 éle (a hátsó lap 4 éle és a 4 összekötő él)", "isCorrect": True},
                    {"text": "0 éle", "isCorrect": False},
                    {"text": "2 éle", "isCorrect": False},
                    {"text": "12 éle", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Kocka hálója hány négyzetből áll?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "6"
            },
            {
                "text": "A testek síkbeli rajzolásakor a 3 dimenziót jelenítjük meg a kétdimenziós lapon.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány lapja van egy négyzet alapú gúlának (piramisnak)?",
                "type": "multiple-choice",
                "options": [
                    {"text": "5 lapja (1 négyzet alap lap + 4 háromszög oldallap)", "isCorrect": True},
                    {"text": "4 lapja", "isCorrect": False},
                    {"text": "6 lapja", "isCorrect": False},
                    {"text": "8 lapja", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Egy hengert két egybevágó körlap és egy palást határol.",
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
        "num": 71,
        "title": "71. óra: Egyenesek síkban, térben",
        "description": "Párhuzamos, merőleges és kitérő egyenesek. Pont és egyenes távolsága.",
        "questions": [
            {
                "text": "Mikor mondjuk két síkbeli egyenesre, hogy párhuzamosak?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Ha nincs közös pontjuk (vagy egybeesnek)", "isCorrect": True},
                    {"text": "Ha 90 fokos szöget zárnak be egymással", "isCorrect": False},
                    {"text": "Ha egyetlen pontban metszik egymást", "isCorrect": False},
                    {"text": "Ha merőlegesek egymásra", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Milyen szöget zár be egymással két merőleges egyenes?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "90"
            },
            {
                "text": "Mit nevezünk kitérő egyeneseknek a térben?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Olyan térbeli egyeneseket, amelyek nem egy síkban vannak és nem metszik egymást", "isCorrect": True},
                    {"text": "Síkbeli merőleges egyeneseket", "isCorrect": False},
                    {"text": "Egybeeső egyeneseket", "isCorrect": False},
                    {"text": "Párhuzamos síkbeli egyeneseket", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hogyan mérjük egy pont és egy egyenes távolságát?",
                "type": "multiple-choice",
                "options": [
                    {"text": "A pontból az egyenesre bocsátott merőleges szakasz hosszával", "isCorrect": True},
                    {"text": "A pontból húzott tetszőleges ferde szakasz hosszával", "isCorrect": False},
                    {"text": "A pont és az egyenes tetszőleges pontjának távolságának átlagával", "isCorrect": False},
                    {"text": "Nem mérhető meg", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Két párhuzamos egyenes távolsága minden pontban ugyanannyi.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "A füzet vonalazása egymással párhuzamos egyeneseket szemléltet.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány merőleges egyenes húzható egy megadott ponton keresztül egy egyenesre a síkban?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "1"
            }
        ]
    },
    {
        "num": 72,
        "title": "72. óra: Téglalap, négyzet",
        "description": "A négyzet és a téglalap tulajdonságai, oldalai, szögei és átlói.",
        "questions": [
            {
                "text": "Melyik állítás igaz a téglalapra?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Minden belső szöge derékszög (90°)", "isCorrect": True},
                    {"text": "Minden oldala kötelezően egyenlő hosszúságú", "isCorrect": False},
                    {"text": "Átlói merőlegesek egymásra", "isCorrect": False},
                    {"text": "Csak 3 csúcsa van", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Mi a különbség a négyzet és az általános téglalap között?",
                "type": "multiple-choice",
                "options": [
                    {"text": "A négyzet minden oldala egyenlő hosszúságú", "isCorrect": True},
                    {"text": "A négyzetnek nincsenek derékszögei", "isCorrect": False},
                    {"text": "A téglalapnak több csúcsa van", "isCorrect": False},
                    {"text": "A négyzet nem síkidom", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "A négyzet átlói egyenlő hosszúságúak és merőlegesen felezik egymást.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Mennyi egy 5 cm oldalú négyzet kerülete? (cm-ben)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "20"
            },
            {
                "text": "Mennyi egy 4 cm és 6 cm oldalú téglalap kerülete? (2*(a+b))",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "20"
            },
            {
                "text": "Mennyi a téglalap belső szögeinek összege?",
                "type": "multiple-choice",
                "options": [
                    {"text": "360° (4 * 90°)", "isCorrect": True},
                    {"text": "180°", "isCorrect": False},
                    {"text": "270°", "isCorrect": False},
                    {"text": "90°", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "A téglalap szemközti oldalai párhuzamosak és egyenlő hosszúságúak.",
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
        "num": 73,
        "title": "73. óra: Összefoglalás, ismétlés, gyakorlás",
        "description": "A tanult geometriai fogalmak áttekintése és elmélyítése.",
        "questions": [
            {
                "text": "Melyik állítás HAMIS a négyzetről?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Átlói nem felezik egymást", "isCorrect": True},
                    {"text": "Minden oldala egyenlő", "isCorrect": False},
                    {"text": "Minden szöge 90°", "isCorrect": False},
                    {"text": "Szemközti oldalai párhuzamosak", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány fok a háromszög belső szögeinek összege?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "180"
            },
            {
                "text": "Két merőleges egyenes 90 fokos szöget zár be egymással.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány lapja és csúcsa van egy téglatestnek összesen (lapok + csúcsok)?",
                "type": "multiple-choice",
                "options": [
                    {"text": "14 (6 lap + 8 csúcs)", "isCorrect": True},
                    {"text": "12", "isCorrect": False},
                    {"text": "16", "isCorrect": False},
                    {"text": "18", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány cm a kerülete egy 3 cm, 4 cm és 5 cm oldalú háromszögnek?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "12"
            },
            {
                "text": "A tompaszög nagyobb 90 foknál, de kisebb 180 foknál.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Melyik alakzatnak van 0 átlója?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Háromszög", "isCorrect": True},
                    {"text": "Négyzet", "isCorrect": False},
                    {"text": "Téglalap", "isCorrect": False},
                    {"text": "Ötszög", "isCorrect": False}
                ],
                "timeLimit": 15
            }
        ]
    },
    {
        "num": 74,
        "title": "74. óra: Témazáró dolgozat",
        "description": "Témazáró számonkérés a Geometria témakörből (10 kérdés).",
        "questions": [
            {
                "text": "1. Hány fokos a derékszög?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "90"
            },
            {
                "text": "2. Hány csúcsa van a kockának?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "8"
            },
            {
                "text": "3. Hány éle van a kockának?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "12"
            },
            {
                "text": "4. Milyen egyenesek nem metszik egymást a síkban?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Párhuzamos egyenesek", "isCorrect": True},
                    {"text": "Merőleges egyenesek", "isCorrect": False},
                    {"text": "Metsző egyenesek", "isCorrect": False},
                    {"text": "Félegyenesek", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "5. Mennyi egy 6 cm oldalú négyzet kerülete? (cm-ben)",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "24"
            },
            {
                "text": "6. A háromszög belső szögeinek összege 180°.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "7. Hány átlója van egy négyszögnek?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "2"
            },
            {
                "text": "8. Milyen szög a 135 fokos szög?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Tompaszög", "isCorrect": True},
                    {"text": "Hegyesszög", "isCorrect": False},
                    {"text": "Derékszög", "isCorrect": False},
                    {"text": "Egyenesszög", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "9. A szakasz mindkét irányban véges, két végpontja van.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "10. Minden négyzet egyben téglalap is.",
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
        "num": 75,
        "title": "75. óra: Témazáró dolgozat értékelése",
        "description": "A Geometria témazáró dolgozat feladatainak megbeszélése, értékelés.",
        "questions": [
            {
                "text": "Mi a legfontosabb különbség a síkidomok és a testek között?",
                "type": "multiple-choice",
                "options": [
                    {"text": "A síkidomok kétdimenziósak, a testek háromdimenziósak", "isCorrect": True},
                    {"text": "A síkidomoknak vannak éleik", "isCorrect": False},
                    {"text": "A testeknek nincs térfogatuk", "isCorrect": False},
                    {"text": "Nincs különbség", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hogyan szerkesztünk merőlegest vonalzóval?",
                "type": "multiple-choice",
                "options": [
                    {"text": "Derékszögű vonalzó segítségével", "isCorrect": True},
                    {"text": "Sima vonalzóval szemmértékre", "isCorrect": False},
                    {"text": "Körző nélkül nem lehet", "isCorrect": False},
                    {"text": "Radírral", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "A témazáróban elkövetett hibák javítása segít a fogalmak pontos megértésében.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Hány fokos a teljes kör elforgatása?",
                "type": "text-input",
                "options": [],
                "timeLimit": 20,
                "correctAnswer": "360"
            },
            {
                "text": "A hegyesszög mindig kisebb, mint a derékszög.",
                "type": "true-false",
                "options": [
                    {"text": "Igaz", "isCorrect": True},
                    {"text": "Hamis", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Mennyi a téglalap kerületképlete (ha oldalai 'a' és 'b')?",
                "type": "multiple-choice",
                "options": [
                    {"text": "K = 2 * (a + b)", "isCorrect": True},
                    {"text": "K = a * b", "isCorrect": False},
                    {"text": "K = 4 * a * b", "isCorrect": False},
                    {"text": "K = a + b", "isCorrect": False}
                ],
                "timeLimit": 15
            },
            {
                "text": "Mennyi a négyzet területképlete (ha oldala 'a')?",
                "type": "multiple-choice",
                "options": [
                    {"text": "T = a * a", "isCorrect": True},
                    {"text": "T = 4 * a", "isCorrect": False},
                    {"text": "T = 2 * a", "isCorrect": False},
                    {"text": "T = a + a", "isCorrect": False}
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
    # Format questions JSON
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
    # escape single quotes in strings for SQL
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
with open("scratch/insert_geometria.sql", "w", encoding="utf-8") as f:
    f.write(full_sql)

print(f"Generated {len(lessons_data)} Geometria quizzes to scratch/insert_geometria.sql")
