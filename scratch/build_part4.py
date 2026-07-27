
# V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT (98-118)
t_meres = "Kerület, terület, felszín, térfogat"

add_quiz(98, t_meres, "98. óra: Hosszúság, tömeg, idő", "A hosszúság, tömeg és idő mérésének ismétlése, mértékegységek és átváltások.", [
    {"t": "Hány milliméter 1 méter?", "type": "text-input", "ans": "1000"},
    {"t": "Hány dekagramm (dkg) 1 kilogramm (kg)?", "type": "text-input", "ans": "100"},
    {"t": "Hány másodperc van 1 órában? (60 * 60)", "type": "text-input", "ans": "3600"},
    {"t": "Mennyi 2,5 km méterben?", "type": "text-input", "ans": "2500"},
    {"t": "Hány kilogramm 3,5 tonna?", "type": "text-input", "ans": "3500"},
    {"t": "Az időváltás 60-as alapon működik a másodperc, perc és óra között.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány perc 2 óra 15 perc?", "type": "text-input", "ans": "135"}
])

add_quiz(99, t_meres, "99. óra: Hosszúság, tömeg, idő II.", "Összetett mértékegység-átváltási feladatok és gyakorlás.", [
    {"t": "Hány cm van 4,5 m-ben?", "type": "text-input", "ans": "450"},
    {"t": "Hány gramm 0,75 kg?", "type": "text-input", "ans": "750"},
    {"t": "Hány napból áll 4 hét?", "type": "text-input", "ans": "28"},
    {"t": "A 1500 m megegyezik 1,5 km-rel.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 500 dkg kg-ban?", "type": "text-input", "ans": "5"},
    {"t": "Hány perc 1 nap negyede (6 óra)?", "type": "text-input", "ans": "360"},
    {"t": "A nagyobb mértékegységből kisebb felé haladva szorzunk a váltószámmal.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(100, t_meres, "100. óra: A sokszögek kerülete", "Négyzet, téglalap, háromszög és sokszögek kerületének számítása (K).", [
    {"t": "Mi a téglalap kerületének képlete (a és b oldallal)?", "type": "multiple-choice", "opts": [("K = 2 * (a + b)", True), ("K = a * b", False), ("K = a + b", False), ("K = 4 * a", False)]},
    {"t": "Mi a négyzet kerületének képlete ('a' oldallal)?", "type": "multiple-choice", "opts": [("K = 4 * a", True), ("K = a * a", False), ("K = 2 * a", False), ("K = 6 * a", False)]},
    {"t": "Mennyi a 6 cm és 8 cm oldalú téglalap kerülete? (2 * (6 + 8))", "type": "text-input", "ans": "28"},
    {"t": "Mennyi a 7 cm oldalú négyzet kerülete? (4 * 7)", "type": "text-input", "ans": "28"},
    {"t": "Mennyi a 3 cm, 4 cm, 5 cm oldalú háromszög kerülete? (3+4+5)", "type": "text-input", "ans": "12"},
    {"t": "A kerület a sokszöget határoló oldalak hosszának összege.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 5 cm oldalú szabályos ötszög kerülete? (5 * 5)", "type": "text-input", "ans": "25"}
])

add_quiz(101, t_meres, "101. óra: Feladatmegoldás", "Összetett kerületszámítási és kerítésszámítási szöveges feladatok.", [
    {"t": "Egy téglalap alakú kert hossza 20 m, szélessége 15 m. Hány méter kerítés övezi a kertet?", "type": "text-input", "ans": "70"},
    {"t": "Hány méter kerítés kell a 20m x 15m-es kerthez, ha hagyunk egy 2 m-es kaput? (70 - 2)", "type": "text-input", "ans": "68"},
    {"t": "Egy négyzet alakú pálya kerülete 100 m. Hány méter hosszú a pálya egy oldala? (100 / 4)", "type": "text-input", "ans": "25"},
    {"t": "Ha a téglalap kerülete 30 cm, és egyik oldala 5 cm, mekkora a másik oldal? (15 - 5)", "type": "text-input", "ans": "10"},
    {"t": "A sokszögek kerületét mindig hosszúság-mértékegységben (m, cm, mm) adjuk meg.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 10 cm oldalú szabályos hatszög kerülete?", "type": "text-input", "ans": "60"},
    {"t": "A kerületszámításos feladatoknál az oldalaknak azonos mértékegységben kell lenniük.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(102, t_meres, "102. óra: A terület és a térfogat mérése", "A terület és térfogat mértékegységei, lefedés, egységkockák, átváltások.", [
    {"t": "Mi a terület alapvető mértékegysége az SI-ben?", "type": "multiple-choice", "opts": [("Négyzetméter (m²)", True), ("Méter (m)", False), ("Köbméter (m³)", False), ("Liter (l)", False)]},
    {"t": "Hány cm² 1 dm²? (10 * 10)", "type": "text-input", "ans": "100"},
    {"t": "Hány dm² 1 m²? (10 * 10)", "type": "text-input", "ans": "100"},
    {"t": "Hány dm³ 1 m³? (10 * 10 * 10)", "type": "text-input", "ans": "1000"},
    {"t": "1 liter űrtartalom pontosan 1 köbdeciméternek (1 dm³) felel meg.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány cm³ 1 dm³?", "type": "text-input", "ans": "1000"},
    {"t": "A terület mértékegységei között a szomszédos váltószám 100 (területnél 10²).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(103, t_meres, "103. óra: Gyakorlóóra. A terület és a térfogat mérése", "Terület- és térfogat-mértékegységek gyakorlása digitális feladatlapokon.", [
    {"t": "Hány mm² 1 cm²?", "type": "text-input", "ans": "100"},
    {"t": "Hány cm³ 2 liter? (2 dm³ = 2000 cm³)", "type": "text-input", "ans": "2000"},
    {"t": "Hány m² 500 dm²?", "type": "text-input", "ans": "5"},
    {"t": "Hány litere felel meg 3,5 dm³ víznek?", "type": "text-input", "ans": "3.5"},
    {"t": "A térfogat mértékegységei között a szomszédos váltószám 1000 (10³).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány dl 1 liter?", "type": "text-input", "ans": "10"},
    {"t": "Hány ml 1 dm³ (1 liter)?", "type": "text-input", "ans": "1000"}
])

add_quiz(104, t_meres, "104. óra: A sokszögek területe", "Négyzet, téglalap és derékszögű háromszög területe (T).", [
    {"t": "Mi a téglalap területének képlete (a és b oldallal)?", "type": "multiple-choice", "opts": [("T = a * b", True), ("T = 2 * (a + b)", False), ("T = a + b", False), ("T = a * a * a", False)]},
    {"t": "Mi a négyzet területének képlete ('a' oldallal)?", "type": "multiple-choice", "opts": [("T = a * a (a²)", True), ("T = 4 * a", False), ("T = 2 * a", False), ("T = a * 10", False)]},
    {"t": "Mennyi a 6 cm és 8 cm oldalú téglalap területe? (cm²-ben)", "type": "text-input", "ans": "48"},
    {"t": "Mennyi a 5 cm oldalú négyzet területe? (cm²-ben)", "type": "text-input", "ans": "25"},
    {"t": "Mi a derékszögű háromszög területének képlete (a és b befogókkal)?", "type": "multiple-choice", "opts": [("T = (a * b) / 2", True), ("T = a * b", False), ("T = a + b", False), ("T = 2 * a * b", False)]},
    {"t": "Mennyi a 6 cm és 8 cm befogójú derékszögű háromszög területe? ((6*8)/2)", "type": "text-input", "ans": "24"},
    {"t": "A derékszögű háromszög területe a két befogójú téglalap területének fele.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(105, t_meres, "105. óra: Feladatmegoldás", "Kerület- és területszámítási feladatok, lakóház és szobapadló tervezése.", [
    {"t": "Egy 5 m hosszú és 4 m széles szobába szőnyeget fektetünk. Hány m² a szoba területe?", "type": "text-input", "ans": "20"},
    {"t": "Ha a parketta ára 5000 Ft/m², mennyibe kerül a 20 m²-es szoba parkettázása?", "type": "text-input", "ans": "100000"},
    {"t": "Hány méter szegélylécre van szükség a 5m x 4m-es szobához (kerület)? (2*(5+4))", "type": "text-input", "ans": "18"},
    {"t": "Egy négyzet alakú szoba területe 36 m². Hány méter hosszú a szoba egy oldala?", "type": "text-input", "ans": "6"},
    {"t": "A terület számításához a méreteket azonos mértékegységre kell hozni a szorzás előtt.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 10 cm és 4 cm oldalú téglalap területe? (cm²-ben)", "type": "text-input", "ans": "40"},
    {"t": "A lakástervezésben a m² alapvető fontosságú.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(106, t_meres, "106. óra: Alakzatok a térben", "Testek elnevezései (kocka, téglatest, hasáb, piramis), él, lap, csúcs, nézetek (elölnézet, felülnézet, oldalnézet).", [
    {"t": "Hány lapja van a téglatestnek?", "type": "text-input", "ans": "6"},
    {"t": "Hány csúcsa van a téglatestnek (és a kockának)?", "type": "text-input", "ans": "8"},
    {"t": "Hány éle van a téglatestnek (és a kockának)?", "type": "text-input", "ans": "12"},
    {"t": "A kocka minden lapja egyenlő négyzet.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Milyen alakúak a téglatest lapjai?", "type": "multiple-choice", "opts": [("Téglalapok (melyek között négyzet is lehet)", True), ("Háromszögek", False), ("Körök", False), ("Ötszögek", False)]},
    {"t": "A testek felülről, elölről és oldalról készített 2D vetületei a vetületi képek.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány lapja van a négyszög alapú gúlának (piramisnak)? (1 alap + 4 oldal)", "type": "text-input", "ans": "5"}
])

add_quiz(107, t_meres, "107. óra: Testek felszíne", "Kocka és téglatest felszínének kiszámítása (A vagy F).", [
    {"t": "Mi a kocka felszínének képlete ('a' éllel)?", "type": "multiple-choice", "opts": [("F = 6 * a * a (6 * a²)", True), ("F = a * a * a", False), ("F = 12 * a", False), ("F = 4 * a²", False)]},
    {"t": "Mi a téglatest felszínének képlete (a, b, c élekkel)?", "type": "multiple-choice", "opts": [("F = 2 * (a*b + a*c + b*c)", True), ("F = a * b * c", False), ("F = 4 * (a + b + c)", False), ("F = a*b + c", False)]},
    {"t": "Mennyi a 3 cm élű kocka felszíne? (6 * 3 * 3)", "type": "text-input", "ans": "54"},
    {"t": "Mennyi a 2 cm, 3 cm, 4 cm élű téglatest felszíne? (2*(2*3 + 2*4 + 3*4) = 2*(6+8+12) = 2*26)", "type": "text-input", "ans": "52"},
    {"t": "A felszín a testet határoló lapok területeinek összege.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A felszínt mindig terület-mértékegységben (cm², m²) adjuk meg.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 10 cm élű kocka felszíne? (cm²-ben)", "type": "text-input", "ans": "600"}
])

add_quiz(108, t_meres, "108. óra: Gyakorlóóra", "Felszínszámítás gyakorlása hálók megrajzolásával és szerkesztőprogrammal.", [
    {"t": "Hány négyzetből áll a kocka hálója?", "type": "text-input", "ans": "6"},
    {"t": "Mennyi a 4 cm élű kocka felszíne? (6 * 16)", "type": "text-input", "ans": "96"},
    {"t": "Mennyi a 1 m, 2 m, 3 m élű téglatest felszíne? (2*(2+3+6) = 2*11)", "type": "text-input", "ans": "22"},
    {"t": "A test hálójának területe megegyezik a test felszínével.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 5 cm élű kocka felszíne? (6 * 25)", "type": "text-input", "ans": "150"},
    {"t": "Dinamikus szerkesztőprogrammal a testek hálója kiteríthető és összehajtható.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A téglatest szemközti lapjai egyenlő területűek.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(109, t_meres, "109. óra: Felszínszámítással kapcsolatos gyakorlati feladatok", "Dobozok lefestése, csomagolópapír szükséglet kiszámítása.", [
    {"t": "Egy 10 cm x 20 cm x 30 cm-es téglatest dobozt befestünk. Hány cm² felületet kell lefesteni? (2*(200+300+600) = 2*1100)", "type": "text-input", "ans": "2200"},
    {"t": "Hány cm² csomagolópapír kell egy 5 cm élű kocka alakú ajándék becsomagolásához (ráhagyás nélkül)? (6 * 25)", "type": "text-input", "ans": "150"},
    {"t": "Ha a festékből 1 m²-re 200 g kell, hány gramm festék kell 5 m² felszínre?", "type": "text-input", "ans": "1000"},
    {"t": "Csomagoláskor a veszteség és az átfedés miatt érdemes a kiszámított felszínnél kb. 10-20%-kal több papírral számolni.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 2 cm élű kocka felszíne? (6 * 4)", "type": "text-input", "ans": "24"},
    {"t": "A dobozok tervezésénél az anyagszükségletet a felszín határozza meg.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 1 cm élű kocka felszíne?", "type": "text-input", "ans": "6"}
])

add_quiz(110, t_meres, "110. óra: Testek térfogata", "Téglatest és kocka térfogatának (V) kiszámítása.", [
    {"t": "Mi a kocka térfogatának képlete ('a' éllel)?", "type": "multiple-choice", "opts": [("V = a * a * a (a³)", True), ("V = 6 * a²", False), ("V = 12 * a", False), ("V = a + a + a", False)]},
    {"t": "Mi a téglatest térfogatának képlete (a, b, c élekkel)?", "type": "multiple-choice", "opts": [("V = a * b * c", True), ("V = 2 * (a+b+c)", False), ("V = a * b", False), ("V = a + b + c", False)]},
    {"t": "Mennyi a 3 cm élű kocka térfogata? (3 * 3 * 3)", "type": "text-input", "ans": "27"},
    {"t": "Mennyi a 2 cm, 4 cm, 5 cm élű téglatest térfogata? (2 * 4 * 5)", "type": "text-input", "ans": "40"},
    {"t": "A térfogatot mindig köbmértékegységben (cm³, m³, dm³) vagy űrmértékben (liter, dl) adjuk meg.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 4 cm élű kocka térfogata? (4 * 4 * 4)", "type": "text-input", "ans": "64"},
    {"t": "Mennyi a 10 cm élű kocka térfogata cm³-ben? (1000 cm³ = 1 liter)", "type": "text-input", "ans": "1000"}
])

add_quiz(111, t_meres, "111. óra: Projektóra", "Épülettervezés I. - Vetületi képek megrajzolása, makett alaprajzának elkészítése.", [
    {"t": "Mit mutat meg egy épület felülnézete (alaprajza)?", "type": "multiple-choice", "opts": [("Az épület felülről látható elrendezését és méreteit", True), ("A tető színét", False), ("Az épület magasságát", False), ("Az ablakok mintáját", False)]},
    {"t": "Egy épület makettjének elkészítése segít a térbeli arányok megértésében.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány m² az 5 m x 6 m-es alaprajzú házalap területe?", "type": "text-input", "ans": "30"},
    {"t": "A méretarányos rajz készítése elengedhetetlen az építészetben.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Ha az 1:100 méretarányú rajzon a fal 5 cm, hány méter a valóságban? (5 * 100 cm)", "type": "text-input", "ans": "5"},
    {"t": "A csoportszervezés és munkamegosztás felgyorsítja a projekt elvégzését.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány oldallapja van a téglatest alakú épületnek?", "type": "text-input", "ans": "4"}
])

add_quiz(112, t_meres, "112. óra: Projektóra II.", "Épülettervezés II. - Makett megépítése kartonból, legóból, egységkockákból.", [
    {"t": "Hány darab 1 cm³-es kiskockára van szükség egy 3 cm x 4 cm x 5 cm-es épületmakett megépítéséhez?", "type": "text-input", "ans": "60"},
    {"t": "Az épületmakett térfogata megegyezik a felhasznált egységkockák térfogatának összegevel.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik testből építhető fel a legkönnyebben téglatest alakú ház?", "type": "multiple-choice", "opts": [("Egységkockákból / kartondobozból", True), ("Gömbökből", False), ("Kúpokból", False), ("Hengerekből", False)]},
    {"t": "A makett készítése során a stabil szerkezet kialakítása a cél.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 2 cm élű kockákból álló 2x2x2-es házikó térfogata? (8 * 8 cm³)", "type": "text-input", "ans": "64"},
    {"t": "A projektmunka kreatív megoldásokat ösztönöz.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány éle van a kockának?", "type": "text-input", "ans": "12"}
])

add_quiz(113, t_meres, "113. óra: Projektóra III.", "Az elkészített projektek és makettek bemutatása, csoportértékelés.", [
    {"t": "Mi a projekt bemutatásának legfőbb értéke?", "type": "multiple-choice", "opts": [("Az elvégzett munka, a mérések, számítások és az elkészült makett ismertetése", True), ("Gyors befejezés elnémulva", False), ("Más csoportok munkájának elrejtése", False), ("Csak a színek felsorolása", False)]},
    {"t": "A prezentációs készség és a szaknyelv használata fontos részét képezi az értékelésnek.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Az önértékelés és a társak építő kritikája segít a fejlődésben.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 10 cm x 10 cm x 10 cm-es kockamakett térfogata literekben? (1000 cm³)", "type": "text-input", "ans": "1"},
    {"t": "A projektmunka során a csoport minden tagjának részfeladatot kell vállalnia.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A térszemlélet fejlesztése elengedhetetlen a 3D-s tervezéshez.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 1 m³ dm³-ben?", "type": "text-input", "ans": "1000"}
])

add_quiz(114, t_meres, "114. óra: Összefoglalás", "A Kerület, terület, felszín és térfogat fejezet összefoglalása.", [
    {"t": "Mennyi a 5 cm és 6 cm oldalú téglalap területe? (cm²-ben)", "type": "text-input", "ans": "30"},
    {"t": "Mennyi a 5 cm és 6 cm oldalú téglalap kerülete? (cm-ben)", "type": "text-input", "ans": "22"},
    {"t": "Mennyi a 3 cm élű kocka felszíne? (6 * 9)", "type": "text-input", "ans": "54"},
    {"t": "Mennyi a 3 cm élű kocka térfogata? (3 * 3 * 3)", "type": "text-input", "ans": "27"},
    {"t": "1 liter víz térfogata 1 dm³.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány cm² 1 m²?", "type": "text-input", "ans": "10000"},
    {"t": "A kerület 1D (hosszúság), a terület 2D, a térfogat 3D mennyiség.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(115, t_meres, "115. óra: Gyakorlóóra", "Gyakorló feladatsor önálló megoldása a mérések témakörben.", [
    {"t": "Mennyi a 8 cm és 4 cm oldalú téglalap területe? (cm²-ben)", "type": "text-input", "ans": "32"},
    {"t": "Mennyi a 2 cm, 3 cm, 5 cm élű téglatest térfogata?", "type": "text-input", "ans": "30"},
    {"t": "Mennyi a 2 cm, 3 cm, 5 cm élű téglatest felszíne? (2*(6+10+15) = 2*31)", "type": "text-input", "ans": "62"},
    {"t": "A 1000 dm³ megegyezik 1 m³-rel.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány liter üdítő van egy 2500 cm³-es tartályban? (2,5 dm³)", "type": "text-input", "ans": "2.5"},
    {"t": "A méréseknél az azonos mértékegységre való áttérés a sikeres számolás alapja.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 6 cm oldalú négyzet területe? (cm²-ben)", "type": "text-input", "ans": "36"}
])

add_quiz(116, t_meres, "116. óra: Feladatmegoldás", "Hétköznapi mérésekkel, kerülettel, területtel és térfogattal kapcsolatos feladatok.", [
    {"t": "Egy 10 m x 8 m-es medence 2 m mély. Hány m³ víz fér a medencébe tele állapotban? (10 * 8 * 2)", "type": "text-input", "ans": "160"},
    {"t": "Hány liter víz fér a 160 m³-es medencébe? (160 * 1000)", "type": "text-input", "ans": "160000"},
    {"t": "Hány m² csempe kell a medence padlójának leburkolásához? (10 * 8)", "type": "text-input", "ans": "80"},
    {"t": "A medence térfogata megadja a maximális vízkapacitást.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 4 m élű kocka alakú szoba térfogata? (m³-ben)", "type": "text-input", "ans": "64"},
    {"t": "Mennyi a 4 m élű kocka alakú szoba felszíne? (m²-ben)", "type": "text-input", "ans": "96"},
    {"t": "A gyakorlati feladatok megoldása felkészít a mindennapi életmérésekre.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(117, t_meres, "117. óra: Témazáró dolgozat", "Témazáró számonkérés a Kerület, terület, felszín és térfogat fejezetből (10 kérdés).", [
    {"t": "1. Mennyi a 6 cm és 9 cm oldalú téglalap területe? (cm²-ben)", "type": "text-input", "ans": "54"},
    {"t": "2. Mennyi a 6 cm és 9 cm oldalú téglalap kerülete? (cm-ben)", "type": "text-input", "ans": "30"},
    {"t": "3. Mennyi a 5 cm élű kocka felszíne? (cm²-ben)", "type": "text-input", "ans": "150"},
    {"t": "4. Mennyi a 5 cm élű kocka térfogata? (cm³-ben)", "type": "text-input", "ans": "125"},
    {"t": "5. Mennyi a 3 cm, 4 cm, 6 cm élű téglatest térfogata?", "type": "text-input", "ans": "72"},
    {"t": "6. Hány cm² 4 dm²?", "type": "text-input", "ans": "400"},
    {"t": "7. Hány dm³ 3 m³?", "type": "text-input", "ans": "3000"},
    {"t": "8. Hány liter víz fér el 5 dm³-es edényben?", "type": "text-input", "ans": "5"},
    {"t": "9. A derékszögű háromszög területe a befogók szorzatának fele.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "10. Hány éle van a kockának?", "type": "text-input", "ans": "12"}
])

add_quiz(118, t_meres, "118. óra: Témazáró dolgozat értékelése", "A témazáró dolgozat megbeszélése és a mérések összefoglalása.", [
    {"t": "Mi volt a leggyakoribb hiba a felszín- és térfogatszámítás során?", "type": "multiple-choice", "opts": [("A képletek és mértékegységek (cm² vs cm³) összetévesztése", True), ("A ceruza radírozása", False), ("A számláló írása", False), ("Az összeadás hiánya", False)]},
    {"t": "A térfogat a test által elfoglalt térrész nagyságát jelenti.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 2 cm élű kocka térfogata?", "type": "text-input", "ans": "8"},
    {"t": "Mennyi a 2 cm élű kocka felszíne?", "type": "text-input", "ans": "24"},
    {"t": "A mértékegységek helyes megadása a válasz kötelező eleme.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 4 cm és 3 cm befogójú derékszögű háromszög területe?", "type": "text-input", "ans": "6"},
    {"t": "A hibajavítás segít a pontosabb tudás megszilárdításában.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

# VI. STATISZTIKA (119-127)
t_stat = "Statisztika"

add_quiz(119, t_stat, "119. óra: Játék", "Adatgyűjtési kifejezések, játékszabályok értelmezése, megfigyelés.", [
    {"t": "Mi a statisztika fő célja?", "type": "multiple-choice", "opts": [("Adatok gyűjtése, rendszerezése, ábrázolása és elemzése a döntéshozatalhoz", True), ("Színes rajzok készítése", False), ("Számok törlése", False), ("Csak a legnagyobb szám megtalálása", False)]},
    {"t": "Az adatok gyűjtése történhet megfigyeléssel, méréssel vagy kérdőívvel.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik nem statisztikai adatgyűjtési módszer?", "type": "multiple-choice", "opts": [("Alvás", True), ("Kérdőíves felmérés", False), ("Hőmérséklet-mérés", False), ("Szavazás", False)]},
    {"t": "A gyűjtött adatokat áttekinthető módon táblázatba foglalhatjuk.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány válaszlehetőség van egy 'igen/nem' típusú kérdésnél?", "type": "text-input", "ans": "2"},
    {"t": "A statisztikai mintavétel során a cél a pontos és torzításmentes adatszerzés.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Az adatok rendszerezése megkönnyíti a döntéshozatalt.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(120, t_stat, "120. óra: Grafikonok, diagramok, összefüggések", "Oszlopdiagram, vonaldiagram, pontdiagram és táblázat olvasása.", [
    {"t": "Mire alkalmas leginkább a vonaldiagram (grafikon)?", "type": "multiple-choice", "opts": [("Folytonos adatok (pl. hőmérséklet) időbeli változásának szemléltetésére", True), ("Egyetlen szám felírására", False), ("Betűk csoportosítására", False), ("Körök osztására", False)]},
    {"t": "Mire alkalmas az oszlopdiagram?", "type": "multiple-choice", "opts": [("Különböző kategóriák mennyiségének gyors összehasonlítására oszlopok magasságával", True), ("Számok összeadására", False), ("Csak 2 adat ábrázolására", False), ("Videónézésre", False)]},
    {"t": "Ha a diagramon az 1 cm-es oszlop 5 tanulót jelent, hány tanulót jelent a 4 cm-es oszlop?", "type": "text-input", "ans": "20"},
    {"t": "A diagramok tengelyein jelölni kell a skálát és a mértékegységet.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A táblázat soraiból és oszlopaiból pontos értékek olvashatók le.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A hibásan skálázott grafikon félrevezetheti az olvasót.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik a legmagasabb hőmérséklet, ha a heti mérések: 12°C, 15°C, 18°C, 14°C, 16°C?", "type": "text-input", "ans": "18"}
])

add_quiz(121, t_stat, "121. óra: Kördiagram", "Kördiagram értelmezése, körcikkek szöge, százalékos megoszlás.", [
    {"t": "Mire szolgál a kördiagram?", "type": "multiple-choice", "opts": [("Az egyes részek teljes egészhez (100%) viszonyított arányának szemléltetésére", True), ("Vonalak összekötésére", False), ("Pontok rajzolására", False), ("Időbeli növekedés ábrázolására", False)]},
    {"t": "Hány fokos a kördiagram teljes köre (100%)?", "type": "text-input", "ans": "360"},
    {"t": "Hány fokos körcikk tartozik az 50%-os (fél) részhez? (360 / 2)", "type": "text-input", "ans": "180"},
    {"t": "Hány fokos körcikk tartozik a 25%-os (negyed) részhez? (360 / 4)", "type": "text-input", "ans": "90"},
    {"t": "Hány fokos körcikk tartozik a 10%-os részhez? (360 / 10)", "type": "text-input", "ans": "36"},
    {"t": "A kördiagramon a körcikkek középponti szögei egyenesen arányosak a képviselt százalékkal.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A körcikkek szögeinek összege mindig 360°.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(122, t_stat, "122. óra: Adatok ábrázolása, átlag", "Számtani közép (átlag) kiszámítása és ábrázolás digitális eszközzel.", [
    {"t": "Hogyan számítjuk ki több szám számtani középértékét (átlagát)?", "type": "multiple-choice", "opts": [("Összeadjuk az adatokat, majd az összeget elosztjuk az adatok darabszámával", True), ("Megszorozzuk az adatokat", False), ("Kivonjuk a legkisebbet a legnagyobból", False), ("Kiválasztjuk a leggyakoribb számot", False)]},
    {"t": "Mennyi a 4, 6, 8, 10 számok átlaga? (28 / 4)", "type": "text-input", "ans": "7"},
    {"t": "Mennyi a 10, 20, 30, 40, 50 számok átlaga? (150 / 5)", "type": "text-input", "ans": "30"},
    {"t": "Egy diák osztályzatai: 5, 4, 5, 5, 3. Mennyi a tanulmányi átlaga? (22 / 5)", "type": "text-input", "ans": "4.4"},
    {"t": "Az átlag értéke mindig a legkisebb és a legnagyobb adat közé esik.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Digitális táblázatkezelőben (pl. Excel) az ÁTLAG (AVERAGE) függvény azonnal kiszámolja az átlagot.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 15 és 25 számtani közepe?", "type": "text-input", "ans": "20"}
])

add_quiz(123, t_stat, "123. óra: Dobáljunk kockákat!", "Kísérletezés dobókockával, gyakoriság, relatív gyakoriság és valószínűség.", [
    {"t": "Egy szabályos 6 oldalú dobókockával mekkora az esélye a 6-os dobásnak?", "type": "multiple-choice", "opts": [("1 a 6-ból (1/6)", True), ("1 a 2-ből", False), ("100%", False), ("0%", False)]},
    {"t": "Mennyi a páros szám (2, 4, 6) dobásának valószínűsége dobókockával?", "type": "multiple-choice", "opts": [("3 a 6-ból (3/6 = 1/2 azaz 50%)", True), ("1/6", False), ("2/6", False), ("100%", False)]},
    {"t": "Sok dobási kísérlet végrehajtásakor a relatív gyakoriság megközelíti az elméleti valószínűséget.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Milyen esemény egy kockával 7-est dobni?", "type": "multiple-choice", "opts": [("Lehetetlen esemény (0%)", True), ("Biztos esemény", False), ("Lehetséges", False), ("Véletlen", False)]},
    {"t": "Milyen esemény egy kockával 1 és 6 közötti számot dobni?", "type": "multiple-choice", "opts": [("Biztos esemény (100%)", True), ("Lehetetlen", False), ("Kétes", False), ("Ritka", False)]},
    {"t": "Hányféle kimenetele lehet két kocka dobásakor a kapott összegeknek? (2-től 12-ig: 11-féle)", "type": "text-input", "ans": "11"},
    {"t": "Két kockával a leggyakoribb dobási összeg a 7.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(124, t_stat, "124. óra: Dobáljunk pénzérmét!", "Kísérletezés érmével, fej vagy írás, tapasztalati valószínűség.", [
    {"t": "Egy szabályos pénzérme feldobásakor mekkora a fej dobás valószínűsége?", "type": "multiple-choice", "opts": [("1 a 2-ből (1/2 azaz 50%)", True), ("1/4", False), ("100%", False), ("0%", False)]},
    {"t": "Ha 100-szor dobunk fel egy érmét, a fej dobások száma kb. 50 körül várható.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány kimenetele lehet 2 érme egyidejű feldobásának? (FF, FI, IF, II)", "type": "text-input", "ans": "4"},
    {"t": "Mekkora a valószínűsége annak, hogy 2 érmével mindkettő fej lesz? (1 a 4-ből = 25%)", "type": "text-input", "ans": "25"},
    {"t": "A véletlen kísérletek eredményét az egyes próbálkozásoknál nem lehet pontosan kiszámítani, de nagy számnál szabályszerűség mutatkozik.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A biztos esemény valószínűsége 100% (vagy 1).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A lehetetlen esemény valószínűsége 0% (vagy 0).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(125, t_stat, "125. óra: Összefoglalás", "Statisztikai és valószínűségi ismeretek összefoglalása.", [
    {"t": "Mennyi a 6, 8, 10, 12 számok átlaga? (36 / 4)", "type": "text-input", "ans": "9"},
    {"t": "Hány fokos körcikk felel meg a kördiagramon a 50%-nak?", "type": "text-input", "ans": "180"},
    {"t": "Hány fokos körcikk felel meg a kördiagramon a 25%-nak?", "type": "text-input", "ans": "90"},
    {"t": "Egy kockával 6-ost dobni 1/6 valószínűségű esemény.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Az adatok átlagához az összes adat összegét elosztjuk a darabszámmal.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik grafikon alkalmas időbeli változás ábrázolására?", "type": "multiple-choice", "opts": [("Vonaldiagram", True), ("Kördiagram", False), ("Pontdiagram", False), ("Képrejtvény", False)]},
    {"t": "Mennyi a 20 és 40 számtani közepe?", "type": "text-input", "ans": "30"}
])

add_quiz(126, t_stat, "126. óra: Számonkérés", "Számonkérés projektmunka és teszt formájában a Statisztikából (10 kérdés).", [
    {"t": "1. Mennyi a 10, 20, 30 számok átlaga?", "type": "text-input", "ans": "20"},
    {"t": "2. Mennyi a 2, 4, 6, 8, 10 számok átlaga?", "type": "text-input", "ans": "6"},
    {"t": "3. Hány fokos a teljes kör a kördiagramon?", "type": "text-input", "ans": "360"},
    {"t": "4. Hány fokos körcikk jelöli a 10%-ot a kördiagramon?", "type": "text-input", "ans": "36"},
    {"t": "5. Mekkora a fej dobás valószínűsége százalékban egy szabályos érmével?", "type": "text-input", "ans": "50"},
    {"t": "6. Milyen esemény egy 6 oldalú kockával 8-ast dobni?", "type": "multiple-choice", "opts": [("Lehetetlen esemény", True), ("Biztos esemény", False), ("Lehetséges", False), ("Döntetlen", False)]},
    {"t": "7. Milyen esemény egy 6 oldalú kockával 1 és 6 közötti számot dobni?", "type": "multiple-choice", "opts": [("Biztos esemény", True), ("Lehetetlen esemény", False), ("Ritka", False), ("Hamis", False)]},
    {"t": "8. Az adatok átlaga mindig a legkisebb és legnagyobb adat közé esik.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "9. Hány kimenetele lehet 2 érme feldobásának?", "type": "text-input", "ans": "4"},
    {"t": "10. A vonaldiagram az adatok időbeli alakulását mutatja meg jól.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(127, t_stat, "127. óra: A számonkérés értékelése", "A statisztikai feladatok és projektmunkák megbeszélése, értékelése.", [
    {"t": "Mi volt a projektmunka és a számonkérés legfőbb tanulsága?", "type": "multiple-choice", "opts": [("Az adatok pontos rögzítése és a helyes skálázás elengedhetetlen a helyes diagramokhoz", True), ("A rajzolás nem fontos", False), ("A számolást el kell hagyni", False), ("Mindegy a skála", False)]},
    {"t": "Az átlag kiszámításánál a darabszámmal való osztást nem szabad elfelejteni.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 12 és 18 számtani közepe?", "type": "text-input", "ans": "15"},
    {"t": "A kördiagram körcikkei összefüggenek a százalékos megoszlással.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A kísérletek során nyert adatok segítenek megérteni a valószínűségi elveket.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 5, 10, 15 átlaga?", "type": "text-input", "ans": "10"},
    {"t": "A csoporteredmények bemutatása fejlesztette a kommunikációs készséget.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

# VII. MINDENNAPI PÉNZÜGYEINK (128-129)
t_penzugy = "Mindennapi pénzügyeink"

add_quiz(128, t_penzugy, "128. óra: Mindennapi pénzügyeink I.", "Alapvető pénzügyi fogalmak: megtakarítás, kamat, kamatláb, futamidő, bankbetét.", [
    {"t": "Mit jelent a banki megtakarítás (betét) után járó 'kamat'?", "type": "multiple-choice", "opts": [("A bank által a lekötött pénz használatáért fizetett plusz összeg", True), ("A bankkezelési díj", False), ("A büntetés", False), ("A fizetett adó", False)]},
    {"t": "Ha 100 000 Ft-ot beteszünk a bankba 5%-os éves kamatra, hány Ft kamatot kapunk 1 év múlva? (100000 * 0,05)", "type": "text-input", "ans": "5000"},
    {"t": "Mennyi pénzünk lesz a bankban az 1 év letelte után a 100 000 Ft betét és a 5000 Ft kamat összegeként?", "type": "text-input", "ans": "105000"},
    {"t": "A futamidő az az időtartam, ameddig a pénzünket a bankban lekötjük.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A hitel felvételekor nekünk kell kamatot fizetnünk a banknak a kölcsönzött pénzért.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A megtakarítás segít a váratlan kiadások fedezésében és jövőbeli célok megvalósításában.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 200 000 Ft 10%-os éves kamata 1 évre?", "type": "text-input", "ans": "20000"}
])

add_quiz(129, t_penzugy, "129. óra: Mindennapi pénzügyeink II.", "Devizák, valutavételi és -eladási árfolyam, valutaváltás.", [
    {"t": "Mit jelent a valuta és deviza árfolyama?", "type": "multiple-choice", "opts": [("Egy külföldi pénznem (pl. Euró, Dollár) ára hazai pénzben (Ft-ban)", True), ("A bankjegy színe", False), ("A pénz súlya", False), ("A bank nyitvatartása", False)]},
    {"t": "Ha 1 Euró (EUR) eladási árfolyama 400 Ft, hány Ft-ba kerül 50 Euró vásárlása? (50 * 400)", "type": "text-input", "ans": "20000"},
    {"t": "Ha 100 Eurót váltunk át Ft-ra 400 Ft/EUR vételi árfolyamon, hány Ft-ot kapunk?", "type": "text-input", "ans": "40000"},
    {"t": "A bankok eladási árfolyama magasabb, mint a vételi árfolyam (ebből származik a váltási haszon).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik a közös európai pénznem jele és neve?", "type": "multiple-choice", "opts": [("EUR (€) - Euró", True), ("USD ($) - Dollár", False), ("GBP (£) - Font", False), ("HUF (Ft) - Forint", False)]},
    {"t": "Külföldi utazás előtt érdemes tájékozódni a hivalatos árfolyamokról.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány Ft 10 Dollár (USD), ha 1 USD = 350 Ft?", "type": "text-input", "ans": "3500"}
])

# VIII. ÉV VÉGI ISMÉTLÉS (130-136)
t_ism = "Év végi ismétlés"

add_quiz(130, t_ism, "130. óra: Az egész számokról tanultak összefoglalása, vegyes feladatok", "Év végi ismétlés: műveletek egész számokkal, előjelek, abszolút érték, ellentett.", [
    {"t": "Mennyi (-15) + (+25)?", "type": "text-input", "ans": "10"},
    {"t": "Mennyi (-8) * (-7)?", "type": "text-input", "ans": "56"},
    {"t": "Mennyi (-63) : (+9)?", "type": "text-input", "ans": "-7"},
    {"t": "Két negatív szám szorzata mindig pozitív.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi |-40|?", "type": "text-input", "ans": "40"},
    {"t": "Melyik szám nagyobb: -12 vagy -4?", "type": "multiple-choice", "opts": [("-4", True), ("-12", False), ("Egyenlők", False), ("Nem eldönthető", False)]},
    {"t": "Mennyi (-5) * (-2) * (-3)?", "type": "text-input", "ans": "-30"}
])

add_quiz(131, t_ism, "131. óra: Az oszthatóságról tanultak összefoglalása", "Év végi ismétlés: oszthatósági szabályok, prímek, lkkt és lnko.", [
    {"t": "Osztható-e a 435 5-tel és 3-mal is (azaz 15-tel)?", "type": "true-false", "opts": [("Igaz (5-re végződik és 4+3+5=12)", True), ("Hamis", False)]},
    {"t": "Osztható-e a 612 4-gyel?", "type": "true-false", "opts": [("Igaz (12 osztható 4-gyel)", True), ("Hamis", False)]},
    {"t": "Mennyi lkkt(6, 8)?", "type": "text-input", "ans": "24"},
    {"t": "Mennyi lnko(12, 18)?", "type": "text-input", "ans": "6"},
    {"t": "Melyik a legkisebbkétjegyű prímszám?", "type": "text-input", "ans": "11"},
    {"t": "A 2 az egyetlen páros prímszám.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik szám osztható 9-cel?", "type": "multiple-choice", "opts": [("819 (8+1+9=18)", True), ("815", False), ("812", False), ("811", False)]}
])

add_quiz(132, t_ism, "132. óra: A törtekről tanultak összefoglalása, vegyes feladatok", "Év végi ismétlés: közönséges és tizedes törtek műveletei.", [
    {"t": "Mennyi 3/4 + 1/2? (3/4 + 2/4)", "type": "multiple-choice", "opts": [("5/4 (1 egész 1/4)", True), ("4/6", False), ("4/4", False), ("3/8", False)]},
    {"t": "Mennyi 2/3 * 3/5?", "type": "multiple-choice", "opts": [("2/5", True), ("6/15", False), ("5/8", False), ("6/8", False)]},
    {"t": "Mennyi 1/2 : 1/4?", "type": "text-input", "ans": "2"},
    {"t": "Mennyi 2,5 * 0,4?", "type": "text-input", "ans": "1"},
    {"t": "Mennyi 4,8 : 0,6?", "type": "text-input", "ans": "8"},
    {"t": "A 0,75 megegyezik a 3/4 törttel.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 80-nak a 3/4 része?", "type": "text-input", "ans": "60"}
])

add_quiz(133, t_ism, "133. óra: A geometriai ismeretek összefoglalása, vegyes feladatok", "Év végi ismétlés: szögek, alakzatok, tengelyes tükrözés.", [
    {"t": "Mennyi a háromszög belső szögeinek összege?", "type": "text-input", "ans": "180"},
    {"t": "Mennyi a négyszög belső szögeinek összege?", "type": "text-input", "ans": "360"},
    {"t": "Hány szimmetriatengelye van a négyzetnek?", "type": "text-input", "ans": "4"},
    {"t": "Ha a kör sugara 6 cm, mekkora az átmérője? (cm-ben)", "type": "text-input", "ans": "12"},
    {"t": "A tengelyes tükrözés távolságtartó transzformáció.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány fokos szöget zár be a szakaszfelező merőleges a szakasszal?", "type": "text-input", "ans": "90"},
    {"t": "Milyen szög a 90°-os szög?", "type": "multiple-choice", "opts": [("Derékszög", True), ("Hegyesszög", False), ("Tompaszög", False), ("Egyenesszög", False)]}
])

add_quiz(134, t_ism, "134. óra: Arányosság, százalék, szöveges feladatok", "Év végi ismétlés: egyenes arányosság, százalékszámítás, nyitott mondatok.", [
    {"t": "Ossz el 500 Ft-ot 2 : 3 arányban! Hány Ft a kisebbik rész?", "type": "text-input", "ans": "200"},
    {"t": "Ha 3 kg narancs 1200 Ft, mennyibe kerül 7 kg narancs?", "type": "text-input", "ans": "2800"},
    {"t": "Mennyi 4000 Ft-nak a 20%-a?", "type": "text-input", "ans": "800"},
    {"t": "Melyik szám teszi igazzá: 3 * x + 5 = 26? (21/3)", "type": "text-input", "ans": "7"},
    {"t": "Gondoltam egy számot, elosztottam 4-gyel, hozzáadtam 6-ot, 11-et kaptam. Mi a szám?", "type": "text-input", "ans": "20"},
    {"t": "Az egyenes arányosság grafikonja az origóból induló félegyenes.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány százalék felel meg a 4/5 törtszám teljes értékének?", "type": "text-input", "ans": "80"}
])

add_quiz(135, t_ism, "135. óra: A hosszúság, a kerület, a terület és a térfogat fogalmával kapcsolatos feladatok", "Év végi ismétlés: mérések, kerület, terület, felszín, térfogat.", [
    {"t": "Mennyi a 6 cm és 5 cm oldalú téglalap területe? (cm²-ben)", "type": "text-input", "ans": "30"},
    {"t": "Mennyi a 6 cm és 5 cm oldalú téglalap kerülete? (cm-ben)", "type": "text-input", "ans": "22"},
    {"t": "Mennyi a 4 cm élű kocka felszíne? (6 * 16)", "type": "text-input", "ans": "96"},
    {"t": "Mennyi a 4 cm élű kocka térfogata? (4 * 4 * 4)", "type": "text-input", "ans": "64"},
    {"t": "1 liter víz térfogata 1 dm³.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány cm³ 1 dm³?", "type": "text-input", "ans": "1000"},
    {"t": "Hány mm² 1 cm²?", "type": "text-input", "ans": "100"}
])

add_quiz(136, t_ism, "136. óra: Az éves munka értékelése", "Az 6. osztályos matematika törzsanyag sikeres teljesítésének záró értékelése.", [
    {"t": "Mely főbb témaköröket dolgoztuk fel a 6. osztályos matematika tananyagban?", "type": "multiple-choice", "opts": [("Egész számok, oszthatóság, törtek, geometria, arány és százalék, kerület-terület-felszín-térfogat, statisztika, pénzügyek", True), ("Kizárólag geometria", False), ("Kizárólag rajzolás", False), ("Csak az 1. osztályos ismétlés", False)]},
    {"t": "A szorgalmas felkészülés és a rendszerezett gyakorlás a matematikai tudás alapja.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány órából állt a 6. osztályos teljes matematika tananyag?", "type": "text-input", "ans": "136"},
    {"t": "A megszerzett matematikai tudás segít a mindennapi pénzügyekben és a döntéshozatalban.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Gratulálunk a 6. osztályos matematika tananyag sikeres teljesítéséhez!", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A 7. osztályban az itt megszerzett alapokra (pl. oszthatóság, törtek, százalék, geometria) építünk tovább.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik volt a kedvenc témaköröd ebben a tanévben?", "type": "multiple-choice", "opts": [("Mindegyik témakör hasznos és érdekes volt!", True), ("Egész számok és oszthatóság", False), ("Geometria és tengelyes tükrözés", False), ("Arányosság és százalékszámítás", False)]}
])

print("Arány, mérés, statisztika, pénzügyek & ismétlés quizzes created (98-136).")
