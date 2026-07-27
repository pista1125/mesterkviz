import json
import uuid

teacher_id = '21feff02-016d-46e2-bb9d-c27495133b1b'
subject = 'Matematika'
grade_level = '5. osztály'

quizzes_data = []

# ==========================================
# V. HELYMEGHATÁROZÁS, SOROZATOK (88-101)
# Topic: "Helymeghatározás, sorozatok"
# ==========================================
topic_1 = 'Helymeghatározás, sorozatok'

quizzes_data.append({
    "num": 88,
    "topic": topic_1,
    "title": "88. óra: Helymeghatározás szerepe környezetünkben",
    "desc": "Helymeghatározási módok: címzés, sakklépések, ülésrend, mozis jegyek értelmezése.",
    "qs": [
        {"t": "Mi alapján találjuk meg a helyünket a moziban?", "type": "multiple-choice", "opts": [("Sor és szék száma alapján", True), ("Évszám alapján", False), ("Tömeg alapján", False), ("Magasság alapján", False)]},
        {"t": "A sakk-táblán egy mezőt egy betűvel és egy számmal adunk meg (pl. e4).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Ha a színházjegyeden '4. sor 12. szék' áll, hányadik sorban kell ülnöd?", "type": "text-input", "ans": "4"},
        {"t": "A postai címzésben a házszám és az ajtószám segít a pontos hely meghatározásában.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Melyik jelölés felel meg a sakkban egy érvényes mezőnek?", "type": "multiple-choice", "opts": [("e4", True), ("100x", False), ("AB12", False), ("55mm", False)]},
        {"t": "Az osztálytermi ülésrendnél a padsor és a pad száma pontosan megadja a tanuló helyét.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Hány koordináta (adat) szükséges egy síkbeli pont helyének egyértelmű megadásához?", "type": "text-input", "ans": "2"}
    ]
})

quizzes_data.append({
    "num": 89,
    "topic": topic_1,
    "title": "89. óra: Helymeghatározás",
    "desc": "Tájékozódás, fokhálózat értelmezése, távolság leolvasása térképen.",
    "qs": [
        {"t": "Mit használunk a Föld felszínén a pontos tájékozódáshoz?", "type": "multiple-choice", "opts": [("Fokhálózatot (szélességi és hosszúsági körök)", True), ("Vonalzót", False), ("Szögmérőt", False), ("Körzőt", False)]},
        {"t": "A térképek méretaránya megmutatja, hányszor kisebb a térkép a valóságnál.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Ha a térképen 1 cm a valóságban 100 méternek felel meg, hány méter a valóságban 3 cm?", "type": "text-input", "ans": "300"},
        {"t": "Melyik égtáj van a iránytűn északra ellentétes irányban?", "type": "multiple-choice", "opts": [("Dél", True), ("Kelet", False), ("Nyugat", False), ("Északkelet", False)]},
        {"t": "A GPS egy műholdas helymeghatározó rendszer.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Hány fő égtájat különböztetünk meg?", "type": "text-input", "ans": "4"},
        {"t": "A koordinátákkal megadott helymeghatározás független attól, ki nézi a térképet.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 90,
    "topic": topic_1,
    "title": "90. óra: A derékszögű koordináta-rendszer",
    "desc": "Descartes-féle koordináta-rendszer, tengelyek, origó, koordináták.",
    "qs": [
        {"t": "Hogyan nevezzük a koordináta-rendszer két tengelyének metszéspontját?", "type": "multiple-choice", "opts": [("Origó", True), ("Középpont", False), ("Súlypont", False), ("Csúcs", False)]},
        {"t": "Mik az origó koordinátái a síkban?", "type": "multiple-choice", "opts": [("(0; 0)", True), ("(1; 1)", False), ("(0; 1)", False), ("(1; 0)", False)]},
        {"t": "A derékszögű koordináta-rendszer tengelyei merőlegesek egymásra.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Melyik tengelyt szokás vízszintes tengelynek nevezni?", "type": "multiple-choice", "opts": [("x tengely (első koordináta)", True), ("y tengely", False), ("z tengely", False), ("vonal tengely", False)]},
        {"t": "Egy P(3; 5) pont első koordinátája a 3.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Hányadik koordináta jelöli a függőleges tengelyen (y tengely) elfoglalt helyet?", "type": "text-input", "ans": "2"},
        {"t": "A Descartes-féle koordináta-rendszerben a tengelyek beosztása egyenlő egységekre van osztva.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 91,
    "topic": topic_1,
    "title": "91. óra: Pontok ábrázolása",
    "desc": "Pontok megadása és ábrázolása síknegyedekben a koordináta-rendszerben.",
    "qs": [
        {"t": "Hol található az A(4; 0) pont?", "type": "multiple-choice", "opts": [("Az x (vízszintes) tengelyen", True), ("Az y (függőleges) tengelyen", False), ("Az origóban", False), ("A II. síknegyedben", False)]},
        {"t": "Hol található a B(0; -3) pont?", "type": "multiple-choice", "opts": [("Az y (függőleges) tengelyen", True), ("Az x tengelyen", False), ("Az origóban", False), ("A I. síknegyedben", False)]},
        {"t": "A P(2; 3) és Q(3; 2) pontok ugyanazt a pontot jelölik a síkban.", "type": "true-false", "opts": [("Igaz", False), ("Hamis (a koordináták sorrendje számít)", True)]},
        {"t": "Hány síknegyedre osztja a koordináta-rendszer a síkot?", "type": "text-input", "ans": "4"},
        {"t": "Ha egy pont első koordinátája pozitív, a második negatív, melyik síknegyedben van? (pl. (3; -2))", "type": "multiple-choice", "opts": [("IV. síknegyed", True), ("I. síknegyed", False), ("II. síknegyed", False), ("III. síknegyed", False)]},
        {"t": "Az I. síknegyedben mindkét koordináta pozitív szám.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Mennyi a távolsága a C(0; 5) pontnak az origótól?", "type": "text-input", "ans": "5"}
    ]
})

quizzes_data.append({
    "num": 92,
    "topic": topic_1,
    "title": "92. óra: Tájékozódás síkban, térben",
    "desc": "Térbeli koordináta-rendszer és tájékozódási lehetőségek.",
    "qs": [
        {"t": "Hány koordináta szükséges egy térbeli pont helyének pontos megadásához?", "type": "text-input", "ans": "3"},
        {"t": "A térbeli koordináta-rendszerben x, y és z tengelyek találkoznak.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Melyik tárgy helyét határozzuk meg 3 dimenzióban (térben)?", "type": "multiple-choice", "opts": [("Egy repülőgép helyét a levegőben (szélesség, hosszúság, magasság)", True), ("Egy rajzot a füzetlap felületén", False), ("Egy vonalat a papíron", False), ("Egy képet a képernyőn", False)]},
        {"t": "A tanteremben egy saroktól mért szélesség, hosszúság és magasság megadja a lámpa helyét.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "A sík két dimenziós, a tér három dimenziós.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Hány tengely metszéspontja alkotja a térbeli koordináta-rendszer origóját?", "type": "text-input", "ans": "3"},
        {"t": "A szélességi és hosszúsági fokok mellett a tengerszint feletti magasság adja meg a térbeli GPS koordinátát.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 93,
    "topic": topic_1,
    "title": "93. óra: Ritmusok, díszítések",
    "desc": "Összefüggések felismerése képeken, mintákban, ritmusokban.",
    "qs": [
        {"t": "Mi jellemzi az ismétlődő mintákat (ritmusokat)?", "type": "multiple-choice", "opts": [("Meghatározott szabály szerint ismétlődnek bennük az elemek", True), ("Teljesen véletlenszerűek", False), ("Nincs bennük semmi rendszer", False), ("Mindig csak 1 elemből állnak", False)]},
        {"t": "A csempézésnél használt szabályos minták geometriai transzformációkon (eltolás, tükrözés) alapulnak.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Ha a minta: piros, kék, zöld, piros, kék, zöld... Mi a 7. elem?", "type": "multiple-choice", "opts": [("Piros", True), ("Kék", False), ("Zöld", False), ("Sárga", False)]},
        {"t": "Ha a ritmus: 2 taps, 1 dobbanás, 2 taps, 1 dobbanás... Hány taps van összesen 3 ciklusban?", "type": "text-input", "ans": "6"},
        {"t": "A díszítősorok készítésekor a szabályos ismétlődés segíti a minta folytatását.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Mi következik a sorozatban? A, B, A, B, A, ...", "type": "multiple-choice", "opts": [("B", True), ("A", False), ("C", False), ("D", False)]},
        {"t": "A természetben (pl. fenyőtoboz, virágszirmok) is találhatunk szabályos ritmusokat, mintázatokat.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 94,
    "topic": topic_1,
    "title": "94. óra: Keressünk összefüggéseket!",
    "desc": "Matematikai és nem matematikai összefüggések felismerése.",
    "qs": [
        {"t": "Milyen összefüggés van a számsorozat elemei között: 3, 6, 9, 12, 15...?", "type": "multiple-choice", "opts": [("Mindig 3-at adunk hozzá az előzőhöz (3-as szorzótábla)", True), ("Mindig megduplázzuk", False), ("Mindig 1-et vonunk ki", False), ("Nincs összefüggés", False)]},
        {"t": "Az ábécé betűihez rendelhetünk sorszámokat (pl. A=1, B=2, C=3).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Mi a hiányzó szám a sorozatban? 5, 10, 15, __, 25", "type": "text-input", "ans": "20"},
        {"t": "Ha egy autó 1 óra alatt 60 km-t tesz meg, hány km-t tesz meg 3 óra alatt egyenletes sebességgel?", "type": "text-input", "ans": "180"},
        {"t": "Az összefüggések felismerése segít a jövőbeli értékek kiszámításában és megjósolásában.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Melyik állítás igaz az alábbi párra: (1, 2), (2, 4), (3, 6), (4, 8)?", "type": "multiple-choice", "opts": [("A második szám a határozott párban mindig a duplája az elsőnek", True), ("A második szám 1-gyel nagyobb", False), ("A második szám mindig 5", False), ("Nincs kapcsolat", False)]},
        {"t": "A szabály felismeréséhez legalább 2-3 minta-elem megfigyelése szükséges.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 95,
    "topic": topic_1,
    "title": "95. óra: Sorozatok",
    "desc": "A sorozat fogalma, szabály felismerése, folytatása.",
    "qs": [
        {"t": "Mit nevezünk számsorozatnak?", "type": "multiple-choice", "opts": [("Számok meghatározott sorrendben elrendezett láncolatát", True), ("Véletlenszerűen felírt számokat", False), ("Egyetlen magányos számot", False), ("Geometriai alakzatot", False)]},
        {"t": "Folytasd a sorozatot! 2, 4, 8, 16, __. Mi a következő elem?", "type": "text-input", "ans": "32"},
        {"t": "Mi a képzési szabálya a 100, 90, 80, 70... sorozatnak?", "type": "multiple-choice", "opts": [("Mindig 10-et vonunk ki az előző elemből", True), ("Mindig 10-et adunk hozzá", False), ("Mindig elosztjuk 2-vel", False), ("Mindig 5-öt vonunk ki", False)]},
        {"t": "A növekvő sorozatokban a következő elem mindig nagyobb vagy egyenlő az előzőnél.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Mi a következő elem a 1, 4, 7, 10, 13 sorozatban?", "type": "text-input", "ans": "16"},
        {"t": "Egy sorozat megadható kezdőelemmel és a képzési szabállyal.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Melyik sorozat csökkenő?", "type": "multiple-choice", "opts": [("50, 45, 40, 35, 30", True), ("1, 2, 3, 4, 5", False), ("2, 4, 8, 16", False), ("10, 10, 10, 10", False)]}
    ]
})

quizzes_data.append({
    "num": 96,
    "topic": topic_1,
    "title": "96. óra: Sorozatok (gyakorlás)",
    "desc": "Sorozatok alkotása, elemekkel megadott sorozatok folytatása.",
    "qs": [
        {"t": "Ha a sorozat első eleme 5, és a szabály: '+4', mi a 3. elem? (5, 9, __)", "type": "text-input", "ans": "13"},
        {"t": "Mi a hiányzó szám? 1, 3, 9, 27, __ (szabály: *3)", "type": "text-input", "ans": "81"},
        {"t": "A 2, 5, 8, 11 sorozat 5. eleme a 14.", "type": "true-false", "opts": [("Igaz (11 + 3 = 14)", True), ("Hamis", False)]},
        {"t": "Melyik szám NEM illik a sorozatba: 2, 4, 6, 9, 10, 12?", "type": "multiple-choice", "opts": [("9 (mert páratlan, míg a többi páros)", True), ("2", False), ("4", False), ("12", False)]},
        {"t": "A váltakozó sorozatokban a műveletek felváltva követhetik egymást (pl. +2, -1, +2, -1).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Folytasd a váltakozó sorozatot! 10, 12, 11, 13, 12, 14, __ (szabály: +2, -1)", "type": "text-input", "ans": "13"},
        {"t": "Melyik szabály tartozik a 3, 6, 12, 24 sorozathoz?", "type": "multiple-choice", "opts": [("Szorzás 2-vel (*2)", True), ("Hozzáadás 3-mal (+3)", False), ("Kivonás 2-vel", False), ("Osztás 2-vel", False)]}
    ]
})

quizzes_data.append({
    "num": 97,
    "topic": topic_1,
    "title": "97. óra: Nevezetes, érdekes sorozatok",
    "desc": "Híres matematikai sorozatok (Fibonacci-sorozat, négyzetszámok stb.).",
    "qs": [
        {"t": "Hogyan kapjuk meg a Fibonacci-sorozat következő elemét? (1, 1, 2, 3, 5, 8, 13...)", "type": "multiple-choice", "opts": [("Az előző két szám összegéből", True), ("Az előző szám szorzatából", False), ("Mindig 2 hozzáadásával", False), ("Véletlenszerűen", False)]},
        {"t": "Mi a következő szám a Fibonacci-sorozatban: 1, 1, 2, 3, 5, 8, 13, __?", "type": "text-input", "ans": "21"},
        {"t": "Melyek a négyzetszámok sorozatának első elemei? (1*1, 2*2, 3*3, 4*4...)", "type": "multiple-choice", "opts": [("1, 4, 9, 16, 25", True), ("1, 2, 3, 4, 5", False), ("2, 4, 6, 8, 10", False), ("1, 3, 5, 7, 9", False)]},
        {"t": "Mi a 6. négyzetszám? (6 * 6)", "type": "text-input", "ans": "36"},
        {"t": "A páratlan számok sorozata (1, 3, 5, 7, 9...) egy számtani sorozat 2-es különbséggel.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "A Fibonacci-sorozat a természetben is megtalálható (pl. virágszirmok száma, csigaház spirálja).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Mi a következő elem a 2, 3, 5, 7, 11, 13 sorozatban? (Prímszámok)", "type": "multiple-choice", "opts": [("17", True), ("15", False), ("14", False), ("16", False)]}
    ]
})

quizzes_data.append({
    "num": 98,
    "topic": topic_1,
    "title": "98. óra: Összefoglalás",
    "desc": "Összefoglaló ismétlés: koordináták, tájékozódás, sorozatok szabályai.",
    "qs": [
        {"t": "Mik az P(-4; 3) pont koordinátái?", "type": "multiple-choice", "opts": [("x = -4, y = 3", True), ("x = 3, y = -4", False), ("x = 4, y = 3", False), ("x = 0, y = 0", False)]},
        {"t": "Mi a hiányzó szám a sorozatban? 100, 95, 90, __, 80", "type": "text-input", "ans": "85"},
        {"t": "Az origó koordinátái a (0; 0).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Mi a szabálya a 2, 6, 18, 54 sorozatnak?", "type": "multiple-choice", "opts": [("Szorzás 3-mal (*3)", True), ("Hozzáadás 4-gyel", False), ("Szorzás 2-vel", False), ("Kivonás 4-gyel", False)]},
        {"t": "Ha a (3; 4) pontot eltoljuk 2 egységgel jobbra (x növelése), mi lesz az új első koordináta?", "type": "text-input", "ans": "5"},
        {"t": "A koordináta-rendszerben a vízszintes tengely az y tengely.", "type": "true-false", "opts": [("Igaz", False), ("Hamis (az x tengely a vízszintes)", True)]},
        {"t": "Hány elemből áll a Fibonacci sorozat első 5 eleme? (1, 1, 2, 3, 5)", "type": "text-input", "ans": "5"}
    ]
})

quizzes_data.append({
    "num": 99,
    "topic": topic_1,
    "title": "99. óra: Témazáró dolgozat",
    "desc": "Témazáró számonkérés a Helymeghatározás és Sorozatok témakörből (10 kérdés).",
    "qs": [
        {"t": "1. Mik az origó koordinátái?", "type": "multiple-choice", "opts": [("(0; 0)", True), ("(1; 1)", False), ("(1; 0)", False), ("(0; 1)", False)]},
        {"t": "2. Egy P(5; -2) pont első koordinátája 5.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "3. Mi a következő szám a 4, 8, 12, 16 sorozatban?", "type": "text-input", "ans": "20"},
        {"t": "4. Mi a következő szám a 3, 6, 12, 24 sorozatban?", "type": "text-input", "ans": "48"},
        {"t": "5. Hány síknegyedből áll a derékszögű koordináta-rendszer?", "type": "text-input", "ans": "4"},
        {"t": "6. Melyik tengelyen van a Q(0; 7) pont?", "type": "multiple-choice", "opts": [("y tengelyen", True), ("x tengelyen", False), ("Origóban", False), ("Egyik tengelyen sem", False)]},
        {"t": "7. Mi a Fibonacci sorozat 6. eleme? (1, 1, 2, 3, 5, __)", "type": "text-input", "ans": "8"},
        {"t": "8. A csökkenő sorozatban a következő elem kisebb vagy egyenlő az előzőnél.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "9. Ha a mozijegyed a 3. sor 8. székére szól, hányadik széken ülsz?", "type": "text-input", "ans": "8"},
        {"t": "10. A térbeli pontok helyének megadásához 3 koordináta szükséges.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 100,
    "topic": topic_1,
    "title": "100. óra: Matematikai játékok",
    "desc": "Játékos matematikai feladványok, logikai stratégiák, kooperáció.",
    "qs": [
        {"t": "Mi a stratégiai játékok célja?", "type": "multiple-choice", "opts": [("A gondolkodási képesség és a logikai tervezés fejlesztése", True), ("A szerencse próbára tétele", False), ("Időpazarlás", False), ("Gyors gépelés", False)]},
        {"t": "A amőba (ötödölő) játékban 5 azonos jelet kell kirakni egy sorba, oszlopba vagy átlóba.", "type": "true-false", "opts": [("Igaz", True), ("Hamis (4)", False)]},
        {"t": "Hány mezője van a klasszikus 8x8-as sakk-táblának?", "type": "text-input", "ans": "64"},
        {"t": "A sudoku játékban a számok nem ismétlődhetnek egy sorban, oszlopban és blokkban.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Melyik számhiány pótolható az 1, 2, 3, 4, __, 6 bűvös négyzet sorban?", "type": "text-input", "ans": "5"},
        {"t": "A csoportos matematikai játékok segítik az együttműködési készség (kooperáció) fejlődését.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "A logikai rejtvények megoldásakor szabályokat követünk a helyes válasz megtalálásához.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 101,
    "topic": topic_1,
    "title": "101. óra: Témazáró dolgozat értékelése",
    "desc": "A helymeghatározás és sorozatok témazáró megbeszélése.",
    "qs": [
        {"t": "Mi a leggyakoribb hiba a koordináták felírásakor?", "type": "multiple-choice", "opts": [("Az x és y koordináták sorrendjének felcserélése", True), ("A zárójel elhagyása", False), ("A pont betűjelének leírása", False), ("A színezés", False)]},
        {"t": "A sorozatszabály megállapításakor fontos több egymást követő elem ellenőrzése is.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Mennyi a különbség a 15 és a 8 között?", "type": "text-input", "ans": "7"},
        {"t": "A hibák megbeszélése és javítása segít a helyes matematikai gondolkodás elmélyítésében.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Ha egy sorozat szabálya '*2 + 1', és az elem 3, mi a következő elem? (3*2 + 1)", "type": "text-input", "ans": "7"},
        {"t": "Az origó jelölése a koordináta-rendszerben rendszerint az O betű.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "A rendszeres gyakorlás magabiztosabb feladatmegoldást eredményez.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

# ==========================================
# VI. MÉRÉS, ARÁNYOSSÁG, SZÖVEGES FELADATOK (102-119)
# Topic: "Mérés, arányosság, szöveges feladatok"
# ==========================================
topic_2 = 'Mérés, arányosság, szöveges feladatok'

quizzes_data.append({
    "num": 102,
    "topic": topic_2,
    "title": "102. óra: A tömeg mérése, mértékegységei",
    "desc": "Tömegmértékegységek (mg, g, dkg, kg, t) és átváltásuk.",
    "qs": [
        {"t": "Mi a tömeg alapvető SI mértékegysége?", "type": "multiple-choice", "opts": [("Kilogramm (kg)", True), ("Gramm (g)", False), ("Tonna (t)", False), ("Liter (l)", False)]},
        {"t": "Hány gramm 1 kilogramm?", "type": "text-input", "ans": "1000"},
        {"t": "Hány dekagramm (dkg) 1 kilogramm?", "type": "text-input", "ans": "100"},
        {"t": "Hány kilogramm 1 tonna (t)?", "type": "text-input", "ans": "1000"},
        {"t": "50 dkg megegyezik 500 grammal.", "type": "true-false", "opts": [("Igaz (1 dkg = 10 g)", True), ("Hamis", False)]},
        {"t": "Melyik mértékegység alkalmas egy teherautó tömegének megadására?", "type": "multiple-choice", "opts": [("Tonna (t)", True), ("Milligramm (mg)", False), ("Gramm (g)", False), ("Decigramm", False)]},
        {"t": "Hány dekagramm van 2,5 kg-ban?", "type": "text-input", "ans": "250"}
    ]
})

quizzes_data.append({
    "num": 103,
    "topic": topic_2,
    "title": "103. óra: Az űrtartalom mérése",
    "desc": "Űrtartalom egységei (ml, cl, dl, l, hl) és átszámítások.",
    "qs": [
        {"t": "Mi az űrtartalom alapegysége?", "type": "multiple-choice", "opts": [("Liter (l)", True), ("Köbméter (m³)", False), ("Gramm (g)", False), ("Méter (m)", False)]},
        {"t": "Hány deciliter (dl) 1 liter?", "type": "text-input", "ans": "10"},
        {"t": "Hány milliliter (ml) 1 liter?", "type": "text-input", "ans": "1000"},
        {"t": "Hány liter 1 hektoliter (hl)?", "type": "text-input", "ans": "100"},
        {"t": "A fél liter víz pontosan 5 dl-nek felel meg.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Melyik a legkisebb űrtartalom az alábbiak közül?", "type": "multiple-choice", "opts": [("15 ml", True), ("2 dl", False), ("1 l", False), ("1 hl", False)]},
        {"t": "Hány centiliter (cl) van 3 dl-ben?", "type": "text-input", "ans": "30"}
    ]
})

quizzes_data.append({
    "num": 104,
    "topic": topic_2,
    "title": "104. óra: Az idő mérése, mértékegységei",
    "desc": "Időpont, időtartam, 60-as számrendszer (mp, min, óra, nap, hét, év).",
    "qs": [
        {"t": "Hány másodperc van 1 percben?", "type": "text-input", "ans": "60"},
        {"t": "Hány perc van 1 órában?", "type": "text-input", "ans": "60"},
        {"t": "Hány órából áll egy teljes nap?", "type": "text-input", "ans": "24"},
        {"t": "Az idő mérésénél a váltószám a másodperc, perc és óra között 60.", "type": "true-false", "opts": [("Igaz", True), ("Hamis (10)", False)]},
        {"t": "Hány perc 2 és fél óra?", "type": "text-input", "ans": "150"},
        {"t": "Egy átlagos év hány napból áll (nem szökőévben)?", "type": "multiple-choice", "opts": [("365 nap", True), ("360 nap", False), ("366 nap", False), ("300 nap", False)]},
        {"t": "Hány napból áll egy hét?", "type": "text-input", "ans": "7"}
    ]
})

quizzes_data.append({
    "num": 105,
    "topic": topic_2,
    "title": "105. óra: Mértékegység átváltások",
    "desc": "Nem szabványos és szabványos mértékegységek gyakorlása.",
    "qs": [
        {"t": "Mi a különbség a szabványos és nem szabványos mértékegységek között?", "type": "multiple-choice", "opts": [("A szabványos mértékegységek mindenhol ugyanazt a pontos értéket jelentik", True), ("Nincs különbség", False), ("A nem szabványos pontosabb", False), ("A szabványosat csak iskolában használják", False)]},
        {"t": "A lépés, arasz, marok nem szabványos mértékegységek.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Hány cm 4,5 m?", "type": "text-input", "ans": "450"},
        {"t": "Hány dkg 3 kg?", "type": "text-input", "ans": "300"},
        {"t": "A mértékegységek átváltásakor a nagyobb mértékegységből a kisebb felé haladva szorzunk a váltószámmal.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Hány dl 200 ml?", "type": "text-input", "ans": "2"},
        {"t": "Melyik mértékegység-pár azonos?", "type": "multiple-choice", "opts": [("1 dm³ = 1 liter", True), ("1 cm³ = 1 liter", False), ("1 m³ = 1 dl", False), ("1 mm³ = 1 cl", False)]}
    ]
})

quizzes_data.append({
    "num": 106,
    "topic": topic_2,
    "title": "106. óra: Mértékegység átváltások (gyakorlás)",
    "desc": "Összetett mértékegység-átváltási feladatok és gyakorlás.",
    "qs": [
        {"t": "Mennyi 1500 g kilogrammban?", "type": "multiple-choice", "opts": [("1,5 kg", True), ("15 kg", False), ("150 kg", False), ("0,15 kg", False)]},
        {"t": "Hány mm 25 cm?", "type": "text-input", "ans": "250"},
        {"t": "Hány cl 5 dl?", "type": "text-input", "ans": "50"},
        {"t": "A 3 óra 15 perc összesen 195 perc.", "type": "true-false", "opts": [("Igaz (3*60 + 15 = 195)", True), ("Hamis", False)]},
        {"t": "Hány kg 2,8 tonna?", "type": "text-input", "ans": "2800"},
        {"t": "Hány m² van 300 dm²-ben?", "type": "text-input", "ans": "3"},
        {"t": "A mértékegység-átváltási versenyben a gyorsaság mellett a pontosság a legfontosabb.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 107,
    "topic": topic_2,
    "title": "107. óra: Arányosságok, változó mennyiségek",
    "desc": "A változó mennyiségek és az arányosság fogalmának megértése.",
    "qs": [
        {"t": "Mit jelent az, hogy két mennyiség változik?", "type": "multiple-choice", "opts": [("Az egyik értékének változása hatással van a másik értékére", True), ("Mindig konstans állandó értékűek", False), ("Sosem lehet őket kiszámolni", False), ("Különböző nyelveken beszélnek", False)]},
        {"t": "Ha kétszer annyi almát veszel a piacon, a fizetendő ár is a kétszeresére nő (változatlan egységár mellett).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Ha 1 füzet ára 200 Ft, mennyibe kerül 4 füzet? (Ft-ban)", "type": "text-input", "ans": "800"},
        {"t": "Az arányosság két mennyiség közötti szabályos kapcsolatot ír le.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Ha 3 gombóc fagylalt 900 Ft, mennyibe kerül 1 gombóc fagylalt? (Ft-ban)", "type": "text-input", "ans": "300"},
        {"t": "Az arányossági feladatokat táblázat segítségével is könnyen áttekinthetjük.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Melyik állítás ír le változó mennyiségeket?", "type": "multiple-choice", "opts": [("A megtett út hossza és az ehhez szükséges idő (állandó sebességnél)", True), ("A kocka lapjainak száma és színe", False), ("Az ember életkora és a lábmérete felnőttkorban", False), ("A hét napjai és a hónapok száma", False)]}
    ]
})

quizzes_data.append({
    "num": 108,
    "topic": topic_2,
    "title": "108. óra: Egyenes arányosság",
    "desc": "Egyenes arányosság tulajdonságai és felismerése hétköznapi példákon.",
    "qs": [
        {"t": "Mi az egyenes arányosság lényege?", "type": "multiple-choice", "opts": [("Ha az egyik mennyiség hányszorosára változik, a másik mennyiség is ugyanannyiszorosára változik", True), ("Ha az egyik nő, a másik csökken", False), ("Az egyik mennyiség mindig 0", False), ("A két mennyiség összege mindig 100", False)]},
        {"t": "Egyenes arányosság esetén a két összetartozó mennyiség hányadosa állandó.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Ha 2 kg narancs 1200 Ft, mennyibe kerül 6 kg narancs? (Ft-ban)", "type": "text-input", "ans": "3600"},
        {"t": "Ha 5 munkás 10 óra alatt végez el egy munkát, akkor 10 munkás kétszer annyi idő alatt végez.", "type": "true-false", "opts": [("Igaz", False), ("Hamis (ez fordított arányosság lenne, kevesebb idő kell)", True)]},
        {"t": "Ha 1 m szalag ára 150 Ft, mekkora a 4 m szalag ára? (Ft-ban)", "type": "text-input", "ans": "600"},
        {"t": "Melyik pár között van egyenes arányosság?", "type": "multiple-choice", "opts": [("Az azonos fajtájú áru tömege és ára", True), ("Az ember életkora és magassága 50 év felett", False), ("A téglalap két szomszédos oldala fix területnél", False), ("A tanulás ideje és a cipőméret", False)]},
        {"t": "Az egyenes arányosság grafikonja a koordináta-rendszer origójából induló félegyenes.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 109,
    "topic": topic_2,
    "title": "109. óra: Egyenes arányossággal kapcsolatos feladatok",
    "desc": "Egyenes arányosság alkalmazása feladatok megoldásában.",
    "qs": [
        {"t": "Egy recept 4 személyre 20 dkg lisztet ír elő. Hány dkg liszt kell 8 személyre?", "type": "text-input", "ans": "40"},
        {"t": "Ha 3 liter üdítő 1500 Ft, mennyibe kerül 5 liter üdítő? (Ft-ban)", "type": "text-input", "ans": "2500"},
        {"t": "Egy autó 100 km-en 6 liter benzint fogyaszt. Hány litert fogyaszt 300 km-en?", "type": "text-input", "ans": "18"},
        {"t": "Ha a mennyiséget megkétszerezzük, az egyenes arányos párja is megkétszereződik.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Ha 10 füzet 3000 Ft, mennyi 1 füzet ára? (Ft-ban)", "type": "text-input", "ans": "300"},
        {"t": "Az egységár kiszámítása megkönnyíti az tetszőleges mennyiség árának meghatározását.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Ha 5 kg alma 2000 Ft, akkor 2,5 kg alma 1000 Ft-ba kerül.", "type": "true-false", "opts": [("Igaz (fele annyi tömeg = fele annyi ár)", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 110,
    "topic": topic_2,
    "title": "110. óra: Nyitott mondatok",
    "desc": "Nyitott mondat, alaphalmaz, igazsághalmaz fogalma.",
    "qs": [
        {"t": "Mit nevezünk nyitott mondatnak a matematikában?", "type": "multiple-choice", "opts": [("Olyan egyenletet/egyentőtlenséget, amelyben ismeretlen változó szerepel", True), ("Olyan mondatot, amit nem fejeztünk be", False), ("Olyan kijelentést, ami mindig igaz", False), ("Geometriai rajzot", False)]},
        {"t": "Mit jelent az alaphalmaz?", "type": "multiple-choice", "opts": [("Azt a halmazt, amelyből az ismeretlen lehetséges értékeit választhatjuk", True), ("A végeredmények halmazát", False), ("Az üres halmazt", False), ("A negatív számok halmazát", False)]},
        {"t": "Mit jelent az igazsághalmaz?", "type": "multiple-choice", "opts": [("Azon elemek halmazát az alaphalmazból, melyekre a nyitott mondat igaz lesz", True), ("Minden lehetséges számot", False), ("A hamis válaszokat", False), ("Az egyenlet nevét", False)]},
        {"t": "Melyik szám teszi igazzá a nyitott mondatot: x + 7 = 15?", "type": "text-input", "ans": "8"},
        {"t": "Melyik szám teszi igazzá: 3 * y = 21?", "type": "text-input", "ans": "7"},
        {"t": "A 2 * x < 10 nyitott mondatnak a természetes számok halmazán több megoldása is lehet.", "type": "true-false", "opts": [("Igaz (pl. x=0,1,2,3,4)", True), ("Hamis", False)]},
        {"t": "Ha egy nyitott mondatnak nincs megoldása az adott alaphalmazon, az igazsághalmaz az üres halmaz.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 111,
    "topic": topic_2,
    "title": "111. óra: Keressük a megoldásokat!",
    "desc": "Becslés, próbálgatás, visszafelé gondolkodás módszere.",
    "qs": [
        {"t": "Mit jelent a visszafelé gondolkodás módszere?", "type": "multiple-choice", "opts": [("A végeredményből kiindulva az inverz (ellenkező) műveletek elvégzésével jutunk el a kezdőértékhez", True), ("Megsejtjük a választ és nem számolunk", False), ("Visszafelé írjuk le a számokat", False), ("Kivonunk mindenből 100-at", False)]},
        {"t": "Gondoltam egy számot, megszoroztam 2-vel, hozzáadtam 5-öt, és 15-öt kaptam. Mi volt a gondolt szám?", "type": "text-input", "ans": "5"},
        {"t": "A próbálgatásos módszernél rendszerezetten, táblázatba foglalva érdemes kipróbálni a lehetőségeket.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Gondoltam egy számot, elosztottam 3-mal, kivontam belőle 4-et, és 2-t kaptam. Mi volt a szám?", "type": "text-input", "ans": "18"},
        {"t": "A becslés segít abban, hogy a kapott végeredmény reális voltát ellenőrizzük.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Gondoltam egy számot, kivontam belőle 10-et, megdupláztam, és 40-et kaptam. Mi volt a szám?", "type": "text-input", "ans": "30"},
        {"t": "Az ellenőrzés során a kapott eredményt behelyettesítjük az eredeti szöveges feladatba.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 112,
    "topic": topic_2,
    "title": "112. óra: Egyszerű szöveges feladatok",
    "desc": "Szöveges feladatok értelmezése és modellezése.",
    "qs": [
        {"t": "Katinak 12 színes ceruzája van, Petinek 5-tel több. Hány ceruzája van Petinek?", "type": "text-input", "ans": "17"},
        {"t": "Katinak és Petinek összesen hány ceruzája van? (Kati: 12, Peti: 17)", "type": "text-input", "ans": "29"},
        {"t": "A szöveges feladat megoldásának lépései: szöveg megértése -> adatok lejegyzése -> terv/egyenlet -> számolás -> ellenőrzés -> szöveges válasz.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Egy polcon 45 könyv van. Levettek róla 18 könyvet. Hány könyv maradt a polcon?", "type": "text-input", "ans": "27"},
        {"t": "Ha egy feladatban az 'összesen' szó szerepel, gyakran összeadásra kell gondolnunk.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Három testvér életkorának összege 24 év. Hány év lesz az életkoruk összege 2 év múlva?", "type": "multiple-choice", "opts": [("30 év (mindenki 2 évvel idősebb: 24 + 3*2)", True), ("26 év", False), ("28 év", False), ("36 év", False)]},
        {"t": "A szöveges feladat végén mindig kötelező megadni a választ válaszmondat formájában is.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 113,
    "topic": topic_2,
    "title": "113. óra: Egyszerű szöveges feladatok gyakorlása",
    "desc": "Rövidebb és hosszabb matematikai szöveges feladatok megoldása.",
    "qs": [
        {"t": "Egy pékségben 120 zsemlét sütöttek reggel. Délelőtt eladtak 85 zsemlét. Hány zsemle maradt?", "type": "text-input", "ans": "35"},
        {"t": "Egy téglalap alakú kert hossza 15 m, szélessége 10 m. Hány méter kerítés övezi a kertet?", "type": "text-input", "ans": "50"},
        {"t": "Aninak 1500 Ft-ja van. Vett egy könyvet 900 Ft-ért és egy csokit 300 Ft-ért. Hány Ft-ja maradt?", "type": "text-input", "ans": "300"},
        {"t": "A szöveges feladatoknál a szöveg gondos elolvasása a sikeres megoldás alapja.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Egy iskolai osztályban 28 tanuló van. A lányok száma 16. Hány fiú van az osztályban?", "type": "text-input", "ans": "12"},
        {"t": "Ha 4 egyforma füzet 800 Ft-ba kerül, hány Ft-ba kerül 7 ugyanilyen füzet?", "type": "text-input", "ans": "1400"},
        {"t": "A válasz ellenőrzése nélkül is teljes értékű a feladatmegoldás.", "type": "true-false", "opts": [("Igaz", False), ("Hamis (az ellenőrzés a megoldás része)", True)]}
    ]
})

quizzes_data.append({
    "num": 114,
    "topic": topic_2,
    "title": "114. óra: Szöveges feladatok a hétköznapjainkban",
    "desc": "Mindennapi életből vett vásárlási, méréseket tartalmazó szöveges feladatok.",
    "qs": [
        {"t": "Apukának 5000 Ft-os bankjegye van. Vett 2 kg almát (400 Ft/kg) és 1 kg sajtot (2800 Ft). Hány Ft visszajárót kap?", "type": "text-input", "ans": "1400"},
        {"t": "Egy vonat 08:15-kor indul és 10:45-kor érkezik meg. Hány percig tartott az utazás?", "type": "text-input", "ans": "150"},
        {"t": "Ha a boltban 10% kedvezményt adnak egy 2000 Ft-os pólóra, hány Ft a kedvezmény mértéke?", "type": "text-input", "ans": "200"},
        {"t": "A mindennapokban a becslés segít felmérni a vásárlás várható összegét.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Egy 1,5 literes üvegben 8 dl üdítő van. Hány dl üdítőt tölthetünk még hozzá, hogy tele legyen?", "type": "text-input", "ans": "7"},
        {"t": "A pénztári fizetésnél az összegzés és a visszajáró számolása alapvető szöveges feladat.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Hány g kell még 750 g liszthez, hogy 1 kg legyen?", "type": "text-input", "ans": "250"}
    ]
})

quizzes_data.append({
    "num": 115,
    "topic": topic_2,
    "title": "115. óra: Szöveges feladatok a hétköznapjainkban II.",
    "desc": "Összetettebb hétköznapi szöveges és méréssel kapcsolatos feladatok.",
    "qs": [
        {"t": "Egy szoba hossza 5 m, szélessége 4 m. Hány m² szőnyeg kell a teljes padló lefedéséhez?", "type": "text-input", "ans": "20"},
        {"t": "Gábor 45 percet tanult matematikát és 30 percet olvasott. Hány órát és percet tanult összesen?", "type": "multiple-choice", "opts": [("1 óra 15 perc (75 perc)", True), ("1 óra 30 perc", False), ("2 óra", False), ("45 perc", False)]},
        {"t": "Ha 3 kg narancs 1500 Ft, mennyit fizetünk 5 kg narancsért? (Ft-ban)", "type": "text-input", "ans": "2500"},
        {"t": "Ha egy 24 szeletes tortának a negyedét megették, hány szelet torta maradt?", "type": "text-input", "ans": "18"},
        {"t": "Az időtartam kiszámításához a befejezés időpontjából kivonjuk a kezdés időpontját.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Egy 50 literes hordóban 32 liter víz van. Beleöntünk még 12 litert. Hány liter hiányzik még a telítettséghez?", "type": "text-input", "ans": "6"},
        {"t": "A szöveges feladatok megértését segíti a vázlat, ábra vagy táblázat készítése.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 116,
    "topic": topic_2,
    "title": "116. óra: Összefoglalás",
    "desc": "Összefoglaló ismétlés a mérés, arányosság és szöveges feladatok témakörből.",
    "qs": [
        {"t": "Hány dkg 2,5 kg tömeg?", "type": "text-input", "ans": "250"},
        {"t": "Hány perc 1 óra 40 perc?", "type": "text-input", "ans": "100"},
        {"t": "Mi az igazsághalmaz a természetes számokon az x + 5 = 12 nyitott mondatra?", "type": "text-input", "ans": "7"},
        {"t": "Ha 2 kg alma 800 Ft, egyenes arányosság esetén 5 kg alma 2000 Ft-ba kerül.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Gondoltam egy számot, megszoroztam 3-mal, hozzáadtam 10-et, 40-et kaptam. Mi a szám?", "type": "text-input", "ans": "10"},
        {"t": "Hány ml 4 dl?", "type": "text-input", "ans": "400"},
        {"t": "Egyenes arányosság esetén ha az egyik mennyiség 3-szorosára nő, a másik is 3-szorosára nő.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 117,
    "topic": topic_2,
    "title": "117. óra: Gyakorlás",
    "desc": "Feladatmegoldási gyakorlatok a mérések és arányosságok témakörében.",
    "qs": [
        {"t": "Hány tonna 4000 kg?", "type": "text-input", "ans": "4"},
        {"t": "Hány centiliter 2 liter?", "type": "text-input", "ans": "200"},
        {"t": "Melyik szám teszi igazzá: 4 * a - 3 = 13?", "type": "text-input", "ans": "4"},
        {"t": "Ha 6 füzet 1800 Ft, mennyibe kerül 10 füzet? (Ft-ban)", "type": "text-input", "ans": "3000"},
        {"t": "A tömeg mértékegységei között a kg és g között 1000 a váltószám.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Peti 14:20-kor kezdett focizni és 15:50-kor fejezte be. Hány percet focizott?", "type": "text-input", "ans": "90"},
        {"t": "A szöveges feladatok ellenőrzése azt jelenti, hogy megnézzük, a kapott szám kielégíti-e a szöveg feltételeit.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 118,
    "topic": topic_2,
    "title": "118. óra: Témazáró dolgozat",
    "desc": "Témazáró számonkérés a Mérés, arányosság és szöveges feladatok témakörből (10 kérdés).",
    "qs": [
        {"t": "1. Hány gramm 3,5 kg?", "type": "text-input", "ans": "3500"},
        {"t": "2. Hány milliliter 6 dl?", "type": "text-input", "ans": "600"},
        {"t": "3. Hány perc 2 óra 15 perc?", "type": "text-input", "ans": "135"},
        {"t": "4. Ha 3 kg narancs 1200 Ft, mennyibe kerül 5 kg narancs? (Ft-ban)", "type": "text-input", "ans": "2000"},
        {"t": "5. Melyik szám teszi igazzá a nyitott mondatot: 2 * x + 4 = 20?", "type": "text-input", "ans": "8"},
        {"t": "6. Gondoltam egy számot, elosztottam 2-vel, kivontam belőle 3-at, 7-et kaptam. Mi a szám?", "type": "text-input", "ans": "20"},
        {"t": "7. Egy 120 oldalú könyvből Éva elolvasott 75 oldalt. Hány oldal van még hátra?", "type": "text-input", "ans": "45"},
        {"t": "8. Egyenes arányosság esetén ha az egyik mennyiség felére csökken, a másik is felére csökken.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "9. Hány dkg 400 g?", "type": "text-input", "ans": "40"},
        {"t": "10. Egy 4000 Ft-os táska árából 10% kedvezményt adnak. Mennyi a kedvezményes ár? (Ft-ban)", "type": "text-input", "ans": "3600"}
    ]
})

quizzes_data.append({
    "num": 119,
    "topic": topic_2,
    "title": "119. óra: Témazáró dolgozat értékelése",
    "desc": "A témazáró dolgozat megbeszélése és a tapasztalatok összegzése.",
    "qs": [
        {"t": "Melyik lépés a legfontosabb a szöveges feladatok megoldása során?", "type": "multiple-choice", "opts": [("A szöveg pontos értelmezése és az adatok kigyűjtése", True), ("Gyors fejszámolás", False), ("Csak az eredmény leírása", False), ("A válasz elhagyása", False)]},
        {"t": "Az mértékegység-átváltási hibák elkerülhetők a váltószámok pontos ismeretével.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Mennyi 1 tonna kilogrammban?", "type": "text-input", "ans": "1000"},
        {"t": "Egyenes arányosságnál a hányados állandó értéket ad.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Hány perc 1 nap negyede (6 óra)?", "type": "text-input", "ans": "360"},
        {"t": "A dolgozatok javításakor a hibák elemzése segíti a további fejlődést.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Az egyenletek/nyitott mondatok ellenőrzése során a behelyettesítés elengedhetetlen.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

# ==========================================
# VII. ADATGYŰJTÉS, STATISZTIKA (120-127)
# Topic: "Adatgyűjtés, statisztika"
# ==========================================
topic_3 = 'Adatgyűjtés, statisztika'

quizzes_data.append({
    "num": 120,
    "topic": topic_3,
    "title": "120. óra: Játékok",
    "desc": "Matematikai játékok, valószínűségi megfigyelések, kooperáció.",
    "qs": [
        {"t": "Egy szabályos feldobott pénzérménél mekkora az esélye annak, hogy fejet kapunk?", "type": "multiple-choice", "opts": [("50% (1 a 2-ből)", True), ("100%", False), ("0%", False), ("25%", False)]},
        {"t": "Egy szabályos dobókockával 1 és 6 közötti egész számot dobhatunk.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Hány lapja van egy hagyományos dobókockának?", "type": "text-input", "ans": "6"},
        {"t": "A matematikai játékokban a tapasztalatgyűjtés segít a valószínűségi szabályok megértésében.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Melyik számot LEHETETLEN dobni egyetlen normál dobókockával?", "type": "multiple-choice", "opts": [("7", True), ("1", False), ("4", False), ("6", False)]},
        {"t": "Sok kísérlet elvégzése során a relatív gyakoriság megközelíti az elméleti valószínűséget.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Hányféle kimenetele lehet egy pénzérme feldobásának (fej vagy írás)?", "type": "text-input", "ans": "2"}
    ]
})

quizzes_data.append({
    "num": 121,
    "topic": topic_3,
    "title": "121. óra: Adatgyűjtés, adatok ábrázolása",
    "desc": "Adatok gyűjtése, rendezése, táblázat, oszlopdiagram és kördiagram.",
    "qs": [
        {"t": "Mi az oszlopdiagram fő szerepe?", "type": "multiple-choice", "opts": [("Különböző adatok mennyiségének szemléletes összehasonlítása oszlopok magasságával", True), ("Körök rajzolása", False), ("Számok összeadása", False), ("Szöveg fordítása", False)]},
        {"t": "A táblázat segítségével az adatokat áttekinthető soraiban és oszlopaiban rendszerezhetjük.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Ha az oszlopdiagramon 1 gombócos magasság 5 tanulót jelent, hány tanulót jelent a 4 gombóc magas oszlop?", "type": "text-input", "ans": "20"},
        {"t": "A kördiagram a részek egészhez viszonyított arányát mutatja jól.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Az adatok gyűjtése történhet méréssel, megfigyeléssel vagy kérdőívvel.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Melyik diagramtípus alkalmas a legjobban időbeli változások (pl. hőmérséklet alakulása) ábrázolására?", "type": "multiple-choice", "opts": [("Vonaldiagram (grafikon)", True), ("Kördiagram", False), ("Oszlopdiagram", False), ("Képrejtvény", False)]},
        {"t": "A diagramok tengelyein a mértékegységet és a beosztást mindig jelölni kell.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 122,
    "topic": topic_3,
    "title": "122. óra: Adatgyűjtés, adatok ábrázolása II.",
    "desc": "Táblázatok és grafikonok értelmezése digitális eszközök segítségével.",
    "qs": [
        {"t": "Mire szolgál a táblázatkezelő program (pl. Excel, Google Táblázatok)?", "type": "multiple-choice", "opts": [("Adatok rendezésére, számítások elvégzésére és automatikus diagramkészítésre", True), ("Videószerkesztésre", False), ("Zeneszerzésre", False), ("Böngészésre", False)]},
        {"t": "Egy grafikonról leolvasható a legmagasabb (maximum) és legkisebb (minimum) érték is.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Ha a hétfői hőmérséklet 15°C, a keddi 18°C, a szerdai 21°C, mennyi volt a legmagasabb hőmérséklet? (°C-ban)", "type": "text-input", "ans": "21"},
        {"t": "A statisztikai adatok hibás ábrázolása félrevezető lehet.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Hány nap hőmérsékletét mértük, ha a táblázatban 7 adatsor szerepel?", "type": "text-input", "ans": "7"},
        {"t": "A digitális diagramok gyorsan frissülnek az adatváltozás hatására.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "A statisztika a mindennapokban (pl. időjárás-előrejelzés, sporteredmények) elengedhetetlen.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 123,
    "topic": topic_3,
    "title": "123. óra: Átlag és tulajdonságai",
    "desc": "Két vagy több szám számtani közepe (átlag) és kiszámítása.",
    "qs": [
        {"t": "Hogyan számítjuk ki több szám számtani középértékét (átlagát)?", "type": "multiple-choice", "opts": [("Összeadjuk a számokat, majd az összeget elosztjuk a számok darabszámával", True), ("Megszorozzuk a számokat egymással", False), ("Kivonjuk a legkisebbet a legnagyobból", False), ("Kiválasztjuk a középsőt", False)]},
        {"t": "Mennyi a 4 és a 8 számtani közepe (átlaga)? ( (4+8)/2 )", "type": "text-input", "ans": "6"},
        {"t": "Mennyi a 10, 20 és 30 számok átlaga? ( (10+20+30)/3 )", "type": "text-input", "ans": "20"},
        {"t": "Egy tanuló osztályzatai: 5, 4, 5, 4. Mennyi a tanulmányi átlaga? (18 / 4)", "type": "multiple-choice", "opts": [("4,5", True), ("4,0", False), ("5,0", False), ("4,2", False)]},
        {"t": "Az átlag mindig a legkisebb és a legnagyobb adat értéke közé esik.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Mennyi a 2, 4, 6, 8 számok átlaga? (20 / 4)", "type": "text-input", "ans": "5"},
        {"t": "Ha minden adathoz hozzáadunk 2-t, az átlag értéke is 2-vel nő.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 124,
    "topic": topic_3,
    "title": "124. óra: Lehetetlen, lehetséges, biztos",
    "desc": "Események valószínűsége: biztos, lehetséges, lehetetlen események.",
    "qs": [
        {"t": "Milyen esemény az, hogy 'Holnap felkel a Nap'?", "type": "multiple-choice", "opts": [("Biztos esemény", True), ("Lehetetlen esemény", False), ("Véletlen esemény", False), ("Hamis esemény", False)]},
        {"t": "Milyen esemény az, hogy 'Egy dobókockával 8-ast dobunk'?", "type": "multiple-choice", "opts": [("Lehetetlen esemény", True), ("Biztos esemény", False), ("Lehetséges esemény", False), ("Döntetlen esemény", False)]},
        {"t": "Milyen esemény az, hogy 'Egy feldobott érmével fejet dobunk'?", "type": "multiple-choice", "opts": [("Lehetséges (de nem biztos) esemény", True), ("Biztos esemény", False), ("Lehetetlen esemény", False), ("Kizárt esemény", False)]},
        {"t": "A lehetetlen esemény bekövetkezésének esélye 0%.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "A biztos esemény bekövetkezésének esélye 100%.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Egy kalapban 5 piros golyó van. Milyen esemény pirosat húzni?", "type": "multiple-choice", "opts": [("Biztos esemény", True), ("Lehetetlen esemény", False), ("Lehetséges, de nem biztos", False), ("Véletlen", False)]},
        {"t": "Egy kalapban 3 piros és 3 kék golyó van. Ugyanannyi az esélye kék golyót húzni, mint pirosat.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 125,
    "topic": topic_3,
    "title": "125. óra: Összefoglalás",
    "desc": "Összefoglaló ismétlés: adatok, táblázatok, diagramok, átlag és valószínűség.",
    "qs": [
        {"t": "Mennyi a 6, 8, 10 számok átlaga?", "type": "text-input", "ans": "8"},
        {"t": "Melyik esemény lehetetlen egy normál dobókockával?", "type": "multiple-choice", "opts": [("0-t dobni", True), ("1-est dobni", False), ("6-ost dobni", False), ("Páros számot dobni", False)]},
        {"t": "Az adatok átlagának kiszámításához ismerni kell az adatok összegét és darabszámát.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Mennyi a 15 és 25 számtani közepe?", "type": "text-input", "ans": "20"},
        {"t": "Az oszlopdiagramon az oszlopok magassága egyenesen arányos a mért értékkel.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Ha a piros golyó húzásának esélye 1/2, az megegyezik 50%-os valószínűséggel.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Mennyi a 1, 2, 3, 4, 5 számok átlaga? (15 / 5)", "type": "text-input", "ans": "3"}
    ]
})

quizzes_data.append({
    "num": 126,
    "topic": topic_3,
    "title": "126. óra: Számonkérés",
    "desc": "Számonkérés az Adatgyűjtés és Statisztika témakörből (10 kérdés).",
    "qs": [
        {"t": "1. Mennyi a 8 és 12 számtani közepe (átlaga)?", "type": "text-input", "ans": "10"},
        {"t": "2. Mennyi a 3, 6, 9 számok átlaga?", "type": "text-input", "ans": "6"},
        {"t": "3. Milyen esemény az, hogy egy dobókockával páros számot dobunk?", "type": "multiple-choice", "opts": [("Lehetséges, de nem biztos", True), ("Biztos esemény", False), ("Lehetetlen esemény", False), ("Hamis", False)]},
        {"t": "4. Milyen esemény az, hogy egy héten 7 nap van?", "type": "multiple-choice", "opts": [("Biztos esemény", True), ("Lehetetlen esemény", False), ("Lehetséges", False), ("Kizárt", False)]},
        {"t": "5. Hány kimenetele lehet egy 6 oldalú dobókocka eldobásának?", "type": "text-input", "ans": "6"},
        {"t": "6. A kördiagram a teljes egész (100%) részeinek megoszlását szemlélteti.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "7. Mennyi az 5, 5, 5, 5 számok átlaga?", "type": "text-input", "ans": "5"},
        {"t": "8. Ha egy zsákban csak kék golyók vannak, a piros húzása lehetetlen esemény.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "9. Mennyi a 20 és 40 átlaga?", "type": "text-input", "ans": "30"},
        {"t": "10. Az adatok rendezése táblázatba segíti az áttekinthetőséget.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 127,
    "topic": topic_3,
    "title": "127. óra: A számonkérés értékelése",
    "desc": "A számonkérés és adatelemzési feladatok megbeszélése.",
    "qs": [
        {"t": "Mi a leggyakoribb hiba az átlagszámítás során?", "type": "multiple-choice", "opts": [("Az elosztás elfelejtése a darabszámmal az összeadás után", True), ("A számok összeadása", False), ("A számok leírása", False), ("A válasz megadása", False)]},
        {"t": "A statisztikai elemzéseknél fontos az pontos adatgyűjtés.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Mennyi a 0 és 100 számtani közepe?", "type": "text-input", "ans": "50"},
        {"t": "A valószínűségi kísérletek eredményei változhatnak, de hosszú távon szabályszerűséget mutatnak.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "A diagramok olvasásakor mindig ügyelni kell a tengelyek beosztására.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Hány százalék a biztos esemény bekövetkezésének valószínűsége?", "type": "text-input", "ans": "100"},
        {"t": "Az éves statisztikai munkák értékelése hozzájárul a logikus gondolkodás fejlesztéséhez.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

# ==========================================
# VIII. ÉV VÉGI ISMÉTLÉS (128-136)
# Topic: "Év végi ismétlés"
# ==========================================
topic_4 = 'Év végi ismétlés'

quizzes_data.append({
    "num": 128,
    "topic": topic_4,
    "title": "128. óra: Az egész számokról tanultak összefoglalása",
    "desc": "Év végi ismétlés: műveletek egész számokkal, előjelek, ellentett, abszolút érték.",
    "qs": [
        {"t": "Mennyi (-7) + (+12)?", "type": "text-input", "ans": "5"},
        {"t": "Mennyi (-5) * (-4)?", "type": "text-input", "ans": "20"},
        {"t": "Mennyi |-15| (a -15 abszolút értéke)?", "type": "text-input", "ans": "15"},
        {"t": "Két negatív szám szorzata mindig pozitív szám.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Mennyi (-20) : (+4)?", "type": "text-input", "ans": "-5"},
        {"t": "Melyik szám nagyobb: -10 vagy -3?", "type": "multiple-choice", "opts": [("-3", True), ("-10", False), ("Egyenlőek", False), ("Nem hasonlítható össze", False)]},
        {"t": "A nullának nincs előjele, és abszolút értéke 0.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 129,
    "topic": topic_4,
    "title": "129. óra: A törtekről tanultak összefoglalása I.",
    "desc": "Év végi ismétlés: közönséges törtek értelmezése, bővítés, egyszerűsítés, összeadás.",
    "qs": [
        {"t": "Mennyi 1/4 + 2/4?", "type": "multiple-choice", "opts": [("3/4", True), ("3/8", False), ("1/2", False), ("2/4", False)]},
        {"t": "Mennyi a 2/3 bővítve 3-mal?", "type": "multiple-choice", "opts": [("6/9", True), ("5/6", False), ("2/9", False), ("6/3", False)]},
        {"t": "Mennyi a 4/8 egyszerűsített alakja?", "type": "multiple-choice", "opts": [("1/2", True), ("2/4", False), ("1/4", False), ("4/2", False)]},
        {"t": "Az azonos nevezőjű törteket úgy adjuk össze, hogy a számlálókat összeadjuk, a nevező változatlan marad.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Hány negyed van 2 egészben?", "type": "text-input", "ans": "8"},
        {"t": "Melyik törtszám nagyobb: 3/5 vagy 1/5?", "type": "multiple-choice", "opts": [("3/5", True), ("1/5", False), ("Egyenlőek", False), ("Nem eldönthető", False)]},
        {"t": "A törtvonal osztást jelent.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 130,
    "topic": topic_4,
    "title": "130. óra: A törtekről tanultak összefoglalása II.",
    "desc": "Év végi ismétlés: tizedes törtek, műveletek, kerekítés.",
    "qs": [
        {"t": "Mennyi 2,5 + 3,7?", "type": "text-input", "ans": "6.2"},
        {"t": "Mennyi 5,8 - 2,3?", "type": "text-input", "ans": "3.5"},
        {"t": "Mennyi 0,4 átírva közönséges tört alakba?", "type": "multiple-choice", "opts": [("4/10 (vagy 2/5)", True), ("4/100", False), ("1/4", False), ("4/1", False)]},
        {"t": "A 3,46 tizedekre kerekített értéke 3,5.", "type": "true-false", "opts": [("Igaz (mert a 6 miatt felfelé kerekítünk)", True), ("Hamis", False)]},
        {"t": "Mennyi 1,2 * 10?", "type": "text-input", "ans": "12"},
        {"t": "Mennyi 45,6 : 10?", "type": "text-input", "ans": "4.56"},
        {"t": "Tizedes törtek összeadásakor a tizedesvesszőket egymás alá kell igazítani.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
    ]
})

quizzes_data.append({
    "num": 131,
    "topic": topic_4,
    "title": "131. óra: A geometriai ismeretek összefoglalása",
    "desc": "Év végi ismétlés: alakzatok, szögek, tengelyes tükrözés, testek.",
    "qs": [
        {"t": "Mennyi a háromszög belső szögeinek összege?", "type": "text-input", "ans": "180"},
        {"t": "Milyen szög a 90°-os szög?", "type": "multiple-choice", "opts": [("Derékszög", True), ("Hegyesszög", False), ("Tompaszög", False), ("Egyenesszög", False)]},
        {"t": "A tengelyes tükrözés távolságtartó és szögtartó transzformáció.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Hány csúcsa van a kockának?", "type": "text-input", "ans": "8"},
        {"t": "Hány lapja van a téglatestnek?", "type": "text-input", "ans": "6"},
        {"t": "A téglalap átlói egyenlő hosszúak és felezik egymást.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Milyen szög a 45°-os szög?", "type": "multiple-choice", "opts": [("Hegyesszög", True), ("Derékszög", False), ("Tompaszög", False), ("Homorúszög", False)]}
    ]
})

quizzes_data.append({
    "num": 132,
    "topic": topic_4,
    "title": "132. óra: Mérések, terület, térfogat ismétlése",
    "desc": "Év végi ismétlés: kerület, terület, felszín, térfogat számítása.",
    "qs": [
        {"t": "Mennyi a 6 cm és 4 cm oldalú téglalap területe? (cm²-ben)", "type": "text-input", "ans": "24"},
        {"t": "Mennyi a 6 cm és 4 cm oldalú téglalap kerülete? (cm-ben)", "type": "text-input", "ans": "20"},
        {"t": "Mennyi a 3 cm élű kocka térfogata? (cm³-ben)", "type": "text-input", "ans": "27"},
        {"t": "Mennyi a 3 cm élű kocka felszíne? (cm²-ben)", "type": "text-input", "ans": "54"},
        {"t": "1 liter víz térfogata pontosan 1 köbdeciméter (1 dm³).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Hány mm² 1 cm²?", "type": "text-input", "ans": "100"},
        {"t": "Hány dm³ 1 m³?", "type": "text-input", "ans": "1000"}
    ]
})

quizzes_data.append({
    "num": 133,
    "topic": topic_4,
    "title": "133. óra: Helymeghatározás és sorozatok ismétlése",
    "desc": "Év végi ismétlés: koordináta-rendszer és sorozatok feladatai.",
    "qs": [
        {"t": "Hol van a P(0; -5) pont?", "type": "multiple-choice", "opts": [("Az y (függőleges) tengelyen", True), ("Az x tengelyen", False), ("Az origóban", False), ("Az I. síknegyedben", False)]},
        {"t": "Mi a hiányzó szám a sorozatban? 3, 9, 27, __, 243", "type": "text-input", "ans": "81"},
        {"t": "Az origó koordinátái a (0; 0).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Mi a következő szám a Fibonacci-sorozatban: 1, 1, 2, 3, 5, 8, 13, __?", "type": "text-input", "ans": "21"},
        {"t": "A koordináta-rendszerben az x az első, az y a második koordináta.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Mi a szabálya a 100, 85, 70, 55 sorozatnak?", "type": "multiple-choice", "opts": [("Kivonás 15-tel (-15)", True), ("Kivonás 10-zel", False), ("Osztás 2-vel", False), ("Hozzáadás 15-tel", False)]},
        {"t": "Hány síknegyedre osztja a koordináta-rendszer a síkot?", "type": "text-input", "ans": "4"}
    ]
})

quizzes_data.append({
    "num": 134,
    "topic": topic_4,
    "title": "134. óra: Mérés, arányosság, szöveges feladatok ismétlése",
    "desc": "Év végi ismétlés: egyenes arányosság, mértékegységek és szöveges feladatok.",
    "qs": [
        {"t": "Ha 4 kg alma 1600 Ft, mennyibe kerül 7 kg alma? (Ft-ban)", "type": "text-input", "ans": "2800"},
        {"t": "Hány gramm 4,2 kg?", "type": "text-input", "ans": "4200"},
        {"t": "Hány perc 2 óra 40 perc?", "type": "text-input", "ans": "160"},
        {"t": "Melyik szám teszi igazzá: 3 * x - 5 = 10?", "type": "text-input", "ans": "5"},
        {"t": "Egyenes arányosságnál ha a mennyiség megduplázódik, az ára is megduplázódik.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Gondoltam egy számot, elosztottam 4-gyel, hozzáadtam 6-ot, 11-et kaptam. Mi volt a szám?", "type": "text-input", "ans": "20"},
        {"t": "Hány dl 1,5 liter üdítő?", "type": "text-input", "ans": "15"}
    ]
})

quizzes_data.append({
    "num": 135,
    "topic": topic_4,
    "title": "135. óra: A statisztikából tanultak felelevenítése",
    "desc": "Év végi ismétlés: adatok, átlag és valószínűségi események.",
    "qs": [
        {"t": "Mennyi a 12, 14, 16, 18 számok átlaga? (60 / 4)", "type": "text-input", "ans": "15"},
        {"t": "Milyen esemény egy normál dobókockával 6-nál nagyobb számot dobni?", "type": "multiple-choice", "opts": [("Lehetetlen esemény", True), ("Biztos esemény", False), ("Lehetséges esemény", False), ("Döntetlen esemény", False)]},
        {"t": "Milyen esemény egy dobókockával 1 és 6 közötti számot dobni?", "type": "multiple-choice", "opts": [("Biztos esemény", True), ("Lehetetlen esemény", False), ("Kétes esemény", False), ("Hamis", False)]},
        {"t": "Az oszlopdiagram segítségével könnyen összehasonlíthatók a mért adatok.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Mennyi a 25 és 35 számtani közepe?", "type": "text-input", "ans": "30"},
        {"t": "A kördiagram a részek egészhez viszonyított arányát ábrázolja.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Hány százalék a biztos esemény valószínűsége?", "type": "text-input", "ans": "100"}
    ]
})

quizzes_data.append({
    "num": 136,
    "topic": topic_4,
    "title": "136. óra: Az éves munka értékelése",
    "desc": "Az 5. osztályos matematika törzsanyag sikeres teljesítésének értékelése.",
    "qs": [
        {"t": "Mely főbb témakörökkel foglalkoztunk 5. osztályban?", "type": "multiple-choice", "opts": [("Egész számok, törtek, geometria, mérések, sorozatok, statisztika", True), ("Bonyolult egyenletrendszerek", False), ("Trigonometria", False), ("Integrálszámítás", False)]},
        {"t": "A rendszeres szorgalom és gyakorlás a matematikai siker kulcsa.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Hány órából állt az 5. osztályos teljes tanév matematika tananyaga?", "type": "text-input", "ans": "136"},
        {"t": "A megszerzett matematikai tudás a mindennapi életben (vásárlás, mérések, tervezés) is használható.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Gratulálunk az 5. osztályos matematika tananyag sikeres elvégzéséhez!", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "A következő tanévben (6. osztály) az itt megszerzett alapokra építünk tovább.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
        {"t": "Melyik volt a kedvenc témaköröd?", "type": "multiple-choice", "opts": [("Mindegyik témakör hasznos és érdekes volt!", True), ("Geometria", False), ("Törtek", False), ("Játékok és statisztika", False)]}
    ]
})

# Process and output SQL
sql_statements = []
for q_data in quizzes_data:
    quiz_id = str(uuid.uuid4())
    qs = []
    for q in q_data["qs"]:
        q_id = str(uuid.uuid4())
        opts = []
        if q["type"] in ["multiple-choice", "true-false"]:
            for opt_text, is_corr in q["opts"]:
                opts.append({
                    "id": str(uuid.uuid4()),
                    "text": opt_text,
                    "isCorrect": is_corr
                })
        q_obj = {
            "id": q_id,
            "text": q["t"],
            "type": q["type"],
            "options": opts,
            "timeLimit": 15
        }
        if "ans" in q:
            q_obj["correctAnswer"] = q["ans"]
            q_obj["timeLimit"] = 20
        qs.append(q_obj)

    qs_json = json.dumps(qs, ensure_ascii=False)
    title_esc = q_data["title"].replace("'", "''")
    desc_esc = q_data["desc"].replace("'", "''")
    topic_esc = q_data["topic"].replace("'", "''")
    qs_json_esc = qs_json.replace("'", "''")

    stmt = f"""INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '{quiz_id}',
        '{teacher_id}',
        '{title_esc}',
        '{desc_esc}',
        '{subject}',
        '{grade_level}',
        '{topic_esc}',
        '{qs_json_esc}'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );"""
    sql_statements.append(stmt)

full_sql = "\n\n".join(sql_statements)
with open("scratch/insert_remaining_5th.sql", "w", encoding="utf-8") as f:
    f.write(full_sql)

print(f"Generated {len(quizzes_data)} quizzes for lessons 88-136 into scratch/insert_remaining_5th.sql")
