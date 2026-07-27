
# II. TÖRTEK (28-47)
t_tortek = "Törtek"

add_quiz(28, t_tortek, "28. óra: Mit tanultunk a törtekről? Ismétlés", "Ötödikben tanult ismeretek: közönséges tört értelmezése, számláló, nevező, bővítés, egyszerűsítés.", [
    {"t": "Mi a közönséges tört felső száma?", "type": "multiple-choice", "opts": [("Számláló", True), ("Nevező", False), ("Törtvonal", False), ("Egész rész", False)]},
    {"t": "Mi a közönséges tört alsó száma?", "type": "multiple-choice", "opts": [("Nevező", True), ("Számláló", False), ("Osztó", False), ("Különbség", False)]},
    {"t": "Mennyi a 3/4 bővítve 2-vel?", "type": "multiple-choice", "opts": [("6/8", True), ("5/6", False), ("3/8", False), ("6/4", False)]},
    {"t": "Mennyi a 6/10 egyszerűsítve 2-vel?", "type": "multiple-choice", "opts": [("3/5", True), ("3/10", False), ("6/5", False), ("1/2", False)]},
    {"t": "A tört értéke nem változik, ha számlálóját és nevezőjét ugyanazzal a nem-nulla számmal szorozzuk (bővítjük).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány negyedből áll 1 egész?", "type": "text-input", "ans": "4"},
    {"t": "Mennyi 1/2 + 1/4?", "type": "multiple-choice", "opts": [("3/4 (2/4 + 1/4)", True), ("2/6", False), ("2/4", False), ("1/6", False)]}
])

add_quiz(29, t_tortek, "29. óra: Mit tanultunk a törtekről? Ismétlés II.", "Összeadás és kivonás azonos és különböző nevezőjű törtekkel.", [
    {"t": "Hogyan adjuk össze a különböző nevezőjű törteket?", "type": "multiple-choice", "opts": [("Közös nevezőre hozzuk őket, majd a számlálókat összeadjuk", True), ("A számlálókat és nevezőket is összeadjuk", False), ("A számlálókat megszorozzuk", False), ("Nem lehet összeadni őket", False)]},
    {"t": "Mennyi 1/3 + 1/6? (2/6 + 1/6)", "type": "multiple-choice", "opts": [("3/6 (azaz 1/2)", True), ("2/9", False), ("1/9", False), ("2/6", False)]},
    {"t": "Mennyi 5/8 - 3/8?", "type": "multiple-choice", "opts": [("2/8 (azaz 1/4)", True), ("2/0", False), ("8/8", False), ("1/8", False)]},
    {"t": "Az 1/2 és 2/4 egyenlő értékű törtek.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány nyolcad van 3/4-ben?", "type": "text-input", "ans": "6"},
    {"t": "Mennyi 1 egészből kivonva 2/5-öt?", "type": "multiple-choice", "opts": [("3/5", True), ("1/5", False), ("2/5", False), ("5/5", False)]},
    {"t": "A törtvonal osztás műveletet jelent.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(30, t_tortek, "30. óra: Szorzás törttel, a reciprok", "Tört szorzása törttel, reciprok fogalma.", [
    {"t": "Hogyan szorzunk törttel törtet?", "type": "multiple-choice", "opts": [("A számlálót a számlálóval, a nevezőt a nevezővel szorozzuk", True), ("Közös nevezőre hozzuk őket", False), ("A számlálót a nevezővel szorozzuk", False), ("Keresztbe szorzunk", False)]},
    {"t": "Mennyi 2/3 * 3/5?", "type": "multiple-choice", "opts": [("6/15 (azaz 2/5)", True), ("5/8", False), ("6/8", False), ("2/15", False)]},
    {"t": "Mi a 3/4 reciproka?", "type": "multiple-choice", "opts": [("4/3", True), ("-3/4", False), ("1/4", False), ("3/4", False)]},
    {"t": "Egy szám és a reciproka szorzata mindig 1.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mi a 5 egész reciproka?", "type": "multiple-choice", "opts": [("1/5", True), ("-5", False), ("5/1", False), ("0", False)]},
    {"t": "A 0-nak nincs reciproka.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 1/2 * 1/3?", "type": "multiple-choice", "opts": [("1/6", True), ("2/5", False), ("1/5", False), ("2/6", False)]}
])

add_quiz(31, t_tortek, "31. óra: A törtek szorzását alkalmazó feladatok megoldása", "Törtrész kiszámítása és szöveges feladatok megoldása szorzással.", [
    {"t": "Mennyi 60-nak a 3/4 része? (60 * 3/4)", "type": "text-input", "ans": "45"},
    {"t": "Mennyi 100-nak az 1/5 része?", "type": "text-input", "ans": "20"},
    {"t": "Egy 24 szeletes tortának megették az 1/3-át. Hány szeletet ettek meg?", "type": "text-input", "ans": "8"},
    {"t": "Egy 24 szeletes tortának megették az 1/3-át. Hány szelet maradt?", "type": "text-input", "ans": "16"},
    {"t": "Egy szám törtrészének kiszámításához a számot megszorozzuk a törttel.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 50-nek a 2/5 része?", "type": "text-input", "ans": "20"},
    {"t": "Mennyi 1/2 óra percekben? (60 * 1/2)", "type": "text-input", "ans": "30"}
])

add_quiz(32, t_tortek, "32. óra: Osztás törttel", "Törttel való osztás szabálya: szorzás a reciprokával.", [
    {"t": "Hogyan osztunk törttel?", "type": "multiple-choice", "opts": [("Az osztandót megszorozzuk az osztó reciprokával", True), ("Az osztandót elosztjuk a nevezővel", False), ("Mindig 1-et kapunk", False), ("A számlálókat elosztjuk egymással", False)]},
    {"t": "Mennyi 2/3 : 4/5? (2/3 * 5/4)", "type": "multiple-choice", "opts": [("10/12 (azaz 5/6)", True), ("8/15", False), ("6/8", False), ("15/8", False)]},
    {"t": "Mennyi 1/2 : 1/2?", "type": "text-input", "ans": "1"},
    {"t": "Ha egy számot 1/2-del osztunk, az eredmény megegyezik a szám 2-vel való szorzatával.", "type": "true-false", "opts": [("Igaz ( : 1/2 = * 2)", True), ("Hamis", False)]},
    {"t": "Mennyi 6 : 1/3? (6 * 3)", "type": "text-input", "ans": "18"},
    {"t": "Törttel való osztáskor az osztandó nem változik, csak az osztót fordítjuk meg.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 3/4 : 3/4?", "type": "text-input", "ans": "1"}
])

add_quiz(33, t_tortek, "33. óra: Hétköznapi problémák megoldása törtek osztásának felhasználásával", "Szöveges feladatok mérésekkel, átdarabolásokkal, törtek osztásával.", [
    {"t": "Hány 1/4 literes pohár tölthető meg 3 liter almaléből? (3 : 1/4)", "type": "text-input", "ans": "12"},
    {"t": "Hány 1/2 kg-os csomag képezhető 5 kg cukorból?", "type": "text-input", "ans": "10"},
    {"t": "Egy 6 méteres szalagból 3/4 méteres darabokat vágunk. Hány darabot kapunk? (6 : 3/4 = 6 * 4/3)", "type": "text-input", "ans": "8"},
    {"t": "Törtek osztásakor az eredmény lehet nagyobb az eredeti osztandónál, ha az osztó 1-nél kisebb tört.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány 1/5 méteres darab vágható ki 2 méter anyagból?", "type": "text-input", "ans": "10"},
    {"t": "A szöveges feladatoknál az adatok lejegyzése és a mértékegységek egyeztetése elengedhetetlen.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 4 : 2/3? (4 * 3/2)", "type": "text-input", "ans": "6"}
])

add_quiz(34, t_tortek, "34. óra: Gyakorlóóra", "A törtek szorzásának és osztásának rögzítése, feladatok gyakorlása.", [
    {"t": "Mennyi 3/5 * 5/3?", "type": "text-input", "ans": "1"},
    {"t": "Mennyi 4/7 : 2/7? (4/7 * 7/2)", "type": "text-input", "ans": "2"},
    {"t": "Melyik állítás igaz?", "type": "multiple-choice", "opts": [("Két 1-nél kisebb pozitív tört szorzata kisebb mindkét tényezőnél", True), ("A szorzat mindig nagyobb a tényezőknél", False), ("Az osztás mindig kisebb számot ad", False), ("Nincs reciproka a 4/5-nek", False)]},
    {"t": "Mennyi 5/6 * 12? (5 * 2)", "type": "text-input", "ans": "10"},
    {"t": "A 2/3 osztva 1/3-dal 2-t ad.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 3/8 : 3/8?", "type": "text-input", "ans": "1"},
    {"t": "Mennyi 1/4 * 4/5?", "type": "multiple-choice", "opts": [("1/5", True), ("4/20", False), ("1/20", False), ("4/9", False)]}
])

add_quiz(35, t_tortek, "35. óra: Számonkérés", "Számonkérés a közönséges törtek műveleteiből (10 kérdés).", [
    {"t": "1. Mennyi 2/5 + 1/5?", "type": "multiple-choice", "opts": [("3/5", True), ("3/10", False), ("2/10", False), ("1/5", False)]},
    {"t": "2. Mennyi 3/4 - 1/2? (3/4 - 2/4)", "type": "multiple-choice", "opts": [("1/4", True), ("2/2", False), ("1/2", False), ("2/4", False)]},
    {"t": "3. Mennyi 2/3 * 3/4?", "type": "multiple-choice", "opts": [("6/12 (azaz 1/2)", True), ("5/7", False), ("6/7", False), ("2/4", False)]},
    {"t": "4. Mennyi 1/2 : 1/4?", "type": "text-input", "ans": "2"},
    {"t": "5. Mi a 7/8 reciproka?", "type": "multiple-choice", "opts": [("8/7", True), ("-7/8", False), ("1/7", False), ("7/8", False)]},
    {"t": "6. Mennyi 40-nek a 3/5 része?", "type": "text-input", "ans": "24"},
    {"t": "7. Egy szám és reciproka szorzata 1.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "8. Mennyi 5 : 1/2?", "type": "text-input", "ans": "10"},
    {"t": "9. A törtek szorzásakor a számlálót a számlálóval, a nevezőt a nevezővel szorozzuk.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "10. Hány negyedből áll 3 egész?", "type": "text-input", "ans": "12"}
])

add_quiz(36, t_tortek, "36. óra: Matematikai játékok", "Matematikai társasjátékok, stratégiák törtekkel, csoport- és páros munka.", [
    {"t": "Melyik állítás igaz a matematikai társasjátékokról?", "type": "multiple-choice", "opts": [("Fejlesztik a számolási gyorsaságot és a logikai stratégiát", True), ("Nincs közük a matematikához", False), ("Kizárólag szerencse kell hozzájuk", False), ("Tiltható az együttműködés", False)]},
    {"t": "A tört domino játékban az egyenlő értékű törteket illesztjük össze.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik tört felel meg a 0,5 tizedes törtnek?", "type": "multiple-choice", "opts": [("1/2", True), ("1/5", False), ("2/5", False), ("5/2", False)]},
    {"t": "Melyik tört felel meg a 0,25-nek?", "type": "multiple-choice", "opts": [("1/4", True), ("1/2", False), ("2/5", False), ("3/4", False)]},
    {"t": "A 3/4 tizedes tört alakja 0,75.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 0,2 közönséges tört alakban legegyszerűbb formában?", "type": "multiple-choice", "opts": [("1/5", True), ("2/10", False), ("1/2", False), ("2/5", False)]},
    {"t": "A tört-bingó játékban a válaszok gyors és pontos kiszámítása a nyerő stratégia.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(37, t_tortek, "37. óra: Mit tanultunk a tizedes törtekről?", "Tizedes törtek helyi értékei, összeadása és kivonása.", [
    {"t": "Mi a tizedesvessző utáni első helyi érték neve?", "type": "multiple-choice", "opts": [("Tizedek", True), ("Századok", False), ("Ezredeket", False), ("Egyesek", False)]},
    {"t": "Mi a tizedesvessző utáni második helyi érték neve?", "type": "multiple-choice", "opts": [("Századok", True), ("Tizedek", False), ("Ezredek", False), ("Tízesek", False)]},
    {"t": "Mennyi 3,45 + 2,13?", "type": "text-input", "ans": "5.58"},
    {"t": "Mennyi 7,8 - 3,5?", "type": "text-input", "ans": "4.3"},
    {"t": "Tizedes törtek írásbeli összeadásakor a tizedesvesszőknek egymás alá kell kerülniük.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 5,6 + 4,4?", "type": "text-input", "ans": "10"},
    {"t": "Melyik szám nagyobb: 4,05 vagy 4,5?", "type": "multiple-choice", "opts": [("4,5 (mert 4,5 = 4,50)", True), ("4,05", False), ("Egyenlőek", False), ("Nem eldönthető", False)]}
])

add_quiz(38, t_tortek, "38. óra: Szorzás tizedes törttel", "Tizedes tört szorzása egész számmal és tizedes törttel, vesszőhely meghatározása.", [
    {"t": "Hogyan határozzuk meg a tizedesjegyek számát két tizedes tört szorzatában?", "type": "multiple-choice", "opts": [("A tényezők tizedesjegyeinek számát összeadjuk", True), ("A nagyobbik tényező tizedesjegyeit vesszük", False), ("Mindig 1 tizedesjegy lesz", False), ("Nem lesz tizedesjegy", False)]},
    {"t": "Mennyi 0,3 * 0,2? (3*2 = 6, 2 tizedesjegy)", "type": "multiple-choice", "opts": [("0,06", True), ("0,6", False), ("6,0", False), ("0,006", False)]},
    {"t": "Mennyi 2,5 * 4?", "type": "text-input", "ans": "10"},
    {"t": "Mennyi 1,2 * 0,5?", "type": "text-input", "ans": "0.6"},
    {"t": "Ha egy tizedes törtet 10-zel szorzunk, a tizedesvessző egy hellyel jobbra lép.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 3,45 * 100?", "type": "text-input", "ans": "345"},
    {"t": "Mennyi 0,1 * 0,1?", "type": "text-input", "ans": "0.01"}
])

add_quiz(39, t_tortek, "39. óra: Osztás tizedes törttel", "Tizedes törttel való osztás szabálya, osztó egész számmá alakítása (bővítés 10-zel, 100-zal).", [
    {"t": "Mit teszünk tizedes törttel való osztáskor először?", "type": "multiple-choice", "opts": [("Az osztandót és az osztót is megszorozzuk 10-zel/100-zal, hogy az osztó egész szám legyen", True), ("Elhagyjuk a tizedesvesszőt az osztandóból", False), ("Kivonjuk az osztót az osztandóból", False), ("Csak az osztót szorozzuk meg", False)]},
    {"t": "Mennyi 2,4 : 0,6? (24 : 6)", "type": "text-input", "ans": "4"},
    {"t": "Mennyi 1,5 : 0,3? (15 : 3)", "type": "text-input", "ans": "5"},
    {"t": "Ha egy tizedes törtet 10-zel osztunk, a tizedesvessző 1 hellyel balra lép.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 45,6 : 10?", "type": "text-input", "ans": "4.56"},
    {"t": "Mennyi 3,6 : 0,1? (36 : 1)", "type": "text-input", "ans": "36"},
    {"t": "A tizedes törttel való osztást ellenőrizhetjük szorzással.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(40, t_tortek, "40. óra: Hétköznapi problémák megoldása tizedes törtek szorzásának, osztásának felhasználásával", "Vásárlási, mértékegységes és szöveges feladatok.", [
    {"t": "1 kg sajt ára 3200 Ft. Mennyibe kerül 0,5 kg sajt? (3200 * 0,5)", "type": "text-input", "ans": "1600"},
    {"t": "Peti 3,5 kg almát vett 400 Ft/kg áron. Hány Ft-ot fizetett?", "type": "text-input", "ans": "1400"},
    {"t": "Egy 4,8 méteres lécet 4 egyenlő darabra vágunk. Hány méter egy darab?", "type": "text-input", "ans": "1.2"},
    {"t": "Ha 0,25 liter üdítő 150 Ft, akkor 1 liter üdítő (4 * 0,25) 600 Ft-ba kerül.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány liter benzin fér a tankba 12000 Ft-ért, ha 1 liter benzin 600 Ft?", "type": "text-input", "ans": "20"},
    {"t": "A becslés segít ellenőrizni, hogy a tizedesvesszőt jó helyre tettük-e a végeredményben.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 1,5 kg narancs ára, ha 1 kg 800 Ft?", "type": "text-input", "ans": "1200"}
])

add_quiz(41, t_tortek, "41. óra: Összetett műveletek, zárójelfelbontás", "Műveleti sorrend, zárójelezés szabályai tizedes és közönséges törtekkel.", [
    {"t": "Mi a helyes műveleti sorrend?", "type": "multiple-choice", "opts": [("Zárójelben lévő műveletek -> szorzás/osztás balról jobbra -> összeadás/kivonás balról jobbra", True), ("Mindig összeadással kezdünk", False), ("Balról jobbra haladunk művelet típustól függetlenül", False), ("Kivonással kezdünk", False)]},
    {"t": "Mennyi 2 + 3 * 4?", "type": "text-input", "ans": "14"},
    {"t": "Mennyi (2 + 3) * 4?", "type": "text-input", "ans": "20"},
    {"t": "Mennyi 10 - 2 * 3?", "type": "text-input", "ans": "4"},
    {"t": "A zárójel megváltoztatja a műveletek elvégzésének megszokott sorrendjét.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 0,5 + 0,5 * 4?", "type": "text-input", "ans": "2.5"},
    {"t": "Mennyi (0,5 + 0,5) * 4?", "type": "text-input", "ans": "4"}
])

add_quiz(42, t_tortek, "42. óra: Összetett műveletek, zárójelfelbontás gyakorlása", "Gyakorlás feladatlapok és összetett kifejezések segítségével.", [
    {"t": "Mennyi 100 - (20 + 30)?", "type": "text-input", "ans": "50"},
    {"t": "Mennyi 15 : 3 + 2 * 5? (5 + 10)", "type": "text-input", "ans": "15"},
    {"t": "Mennyi 0,2 * 5 + 0,8 : 2? (1 + 0,4)", "type": "text-input", "ans": "1.4"},
    {"t": "A szorzás és az osztás egyenrangú műveletek, elvégzésük balról jobbra haladva történik.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi (1,2 + 0,8) * (3,5 - 1,5)? (2 * 2)", "type": "text-input", "ans": "4"},
    {"t": "Ha a zárójel előtt minusz jel áll, a zárójel elhagyásakor a bent lévő tagok előjele az ellenkezőjére vált.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 50 - 5 * 8?", "type": "text-input", "ans": "10"}
])

add_quiz(43, t_tortek, "43. óra: Összefoglalás", "A törtekről tanultak ismétlése, rendszerezése, algoritmusos gondolkodás.", [
    {"t": "Mennyi 3/4 * 4/5?", "type": "multiple-choice", "opts": [("3/5", True), ("12/20", False), ("7/9", False), ("4/5", False)]},
    {"t": "Mennyi 1/2 : 1/3? (1/2 * 3/1)", "type": "multiple-choice", "opts": [("3/2 (1,5)", True), ("1/6", False), ("2/3", False), ("1/5", False)]},
    {"t": "Mennyi 2,5 * 0,4?", "type": "text-input", "ans": "1"},
    {"t": "Mennyi 6,4 : 0,8?", "type": "text-input", "ans": "8"},
    {"t": "A 0,75 megegyezik a 3/4 közönséges tört értékével.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 50-nek a 40%-a (vagy 2/5 része)?", "type": "text-input", "ans": "20"},
    {"t": "Melyik szám reciproka 0,5 (azaz 1/2)?", "type": "text-input", "ans": "2"}
])

add_quiz(44, t_tortek, "44. óra: Feladatmegoldás", "Gyakorló feladatok megbeszélése egyéni és csoportmunkában.", [
    {"t": "Mennyi 0,75 + 1/4? (0,75 + 0,25)", "type": "text-input", "ans": "1"},
    {"t": "Mennyi 1,5 - 3/4? (1,5 - 0,75)", "type": "text-input", "ans": "0.75"},
    {"t": "Peti elköltötte a pénze 2/5-ét, majd a maradék 1/2-ét. A pénze hányadrésze maradt meg?", "type": "multiple-choice", "opts": [("3/10 (azaz 30%-a)", True), ("1/5", False), ("1/2", False), ("0", False)]},
    {"t": "Ha a számláló és a nevező megegyezik, a tört értéke 1.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 0,8 * 2,5?", "type": "text-input", "ans": "2"},
    {"t": "Mennyi 9 : 0,3?", "type": "text-input", "ans": "30"},
    {"t": "A 0,125 megegyezik az 1/8 tört értékével.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(45, t_tortek, "45. óra: Játékos feladatok törtekkel", "Társasjáték törtekkel, folyamatos tanári ellenőrzés és hibajavítás.", [
    {"t": "Melyik tört azonos értékű 4/12-vel?", "type": "multiple-choice", "opts": [("1/3", True), ("1/4", False), ("2/3", False), ("1/2", False)]},
    {"t": "Melyik tört azonos értékű 5/20-szal?", "type": "multiple-choice", "opts": [("1/4", True), ("1/5", False), ("2/5", False), ("1/2", False)]},
    {"t": "Mennyi 0,6 * 0,5?", "type": "text-input", "ans": "0.3"},
    {"t": "Mennyi 0,4 : 0,2?", "type": "text-input", "ans": "2"},
    {"t": "A 0,5 nagyobb, mint a 0,45.", "type": "true-false", "opts": [("Igaz (0,50 > 0,45)", True), ("Hamis", False)]},
    {"t": "Hány század van 0,3-ban?", "type": "text-input", "ans": "30"},
    {"t": "A törtek átírása tizedes tört alakba megkönnyíti az összehasonlítást.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(46, t_tortek, "46. óra: Témazáró dolgozat", "Témazáró számonkérés a Törtek fejezetből (10 kérdés).", [
    {"t": "1. Mennyi 2/3 + 1/6? (4/6 + 1/6)", "type": "multiple-choice", "opts": [("5/6", True), ("3/9", False), ("3/6", False), ("1/2", False)]},
    {"t": "2. Mennyi 3/5 * 5/6?", "type": "multiple-choice", "opts": [("15/30 (azaz 1/2)", True), ("8/11", False), ("15/11", False), ("3/6", False)]},
    {"t": "3. Mennyi 3/4 : 1/2? (3/4 * 2/1)", "type": "multiple-choice", "opts": [("6/4 (azaz 3/2 vagy 1,5)", True), ("3/8", False), ("1/4", False), ("2/4", False)]},
    {"t": "4. Mi a 4/9 reciproka?", "type": "multiple-choice", "opts": [("9/4", True), ("-4/9", False), ("1/4", False), ("4/9", False)]},
    {"t": "5. Mennyi 2,4 + 3,8?", "type": "text-input", "ans": "6.2"},
    {"t": "6. Mennyi 1,5 * 0,4?", "type": "text-input", "ans": "0.6"},
    {"t": "7. Mennyi 4,2 : 0,7?", "type": "text-input", "ans": "6"},
    {"t": "8. Mennyi 60-nak a 2/3 része?", "type": "text-input", "ans": "40"},
    {"t": "9. A 0,25 megegyezik az 1/4 törttel.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "10. Mennyi (1,5 + 0,5) * 3?", "type": "text-input", "ans": "6"}
])

add_quiz(47, t_tortek, "47. óra: Témazáró dolgozat értékelése", "A dolgozat megbeszélése, a törtek műveleteinek összefoglaló értékelése.", [
    {"t": "Mi a leggyakoribb hiba a törtek osztásakor?", "type": "multiple-choice", "opts": [("Az osztó reciprokával való szorzás elfelejtése", True), ("A számlálók leírása", False), ("A zárójel használata", False), ("A művelet elvégzése", False)]},
    {"t": "Tizedes törtek osztásakor az osztónak egész számnak kell lennie a művelet elvégzése előtt.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 1/2 * 4/5?", "type": "multiple-choice", "opts": [("2/5", True), ("4/10", False), ("1/5", False), ("5/7", False)]},
    {"t": "Mennyi 2,5 : 0,5?", "type": "text-input", "ans": "5"},
    {"t": "A gyakorlás és a hibák javítása segít a jobb teljesítmény elérésében.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 100-nak a 3/10 része?", "type": "text-input", "ans": "30"},
    {"t": "Mennyi 0,8 + 0,4 - 0,2?", "type": "text-input", "ans": "1"}
])

# III. GEOMETRIA, TENGELYES TÜKRÖZÉS (48-67)
t_geom = "Geometria, tengelyes tükrözés"

add_quiz(48, t_geom, "48. óra: Síkbeli alakzatok", "Szögek fajtái, háromszögek csoportosítása, belső szögek összege (180°).", [
    {"t": "Mennyi a háromszög belső szögeinek összege?", "type": "text-input", "ans": "180"},
    {"t": "Milyen szög a 90°-nál kisebb pozitív szög?", "type": "multiple-choice", "opts": [("Hegyesszög", True), ("Derékszög", False), ("Tompaszög", False), ("Egyenesszög", False)]},
    {"t": "Milyen szög a pontosan 90°-os szög?", "type": "multiple-choice", "opts": [("Derékszög", True), ("Hegyesszög", False), ("Tompaszög", False), ("Teljes szög", False)]},
    {"t": "Milyen szög a 90° és 180° közötti szög?", "type": "multiple-choice", "opts": [("Tompaszög", True), ("Hegyesszög", False), ("Derékszög", False), ("Egyenesszög", False)]},
    {"t": "Ha a háromszög két szöge 50° és 60°, mennyi a harmadik szög?", "type": "text-input", "ans": "70"},
    {"t": "A derékszögű háromszögnek van egy 90°-os szöge.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A szabályos háromszög (egyenlő oldalú) minden belső szöge 60°-os.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(49, t_geom, "49. óra: Síkbeli alakzatok II.", "Négyszögek fajtái (téglalap, négyzet, rombusz, paralelogramma, trapéz) és szögösszegük (360°).", [
    {"t": "Mennyi a konvex négyszögek belső szögeinek összege?", "type": "text-input", "ans": "360"},
    {"t": "Melyik négyszögnek van minden oldala egyenlő hosszú és minden szöge derékszög?", "type": "multiple-choice", "opts": [("Négyzet", True), ("Rombusz", False), ("Téglalap", False), ("Trapéz", False)]},
    {"t": "Melyik négyszögnek van minden oldala egyenlő, de nem feltétlenül derékszögűek a szögei?", "type": "multiple-choice", "opts": [("Rombusz", True), ("Téglalap", False), ("Trapéz", False), ("Deltoid", False)]},
    {"t": "A trapéznak van legalább egy pár párhuzamos oldala.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A paralelogramma szemközti oldalai párhuzamosak és egyenlő hosszúak.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A négyzet egyben rombusz és téglalap is.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány átlója van egy négyszögnek?", "type": "text-input", "ans": "2"}
])

add_quiz(50, t_geom, "50. óra: Egybevágóság", "Egybevágó alakzatok felismerése, fedésbe hozása eltolással, forgatással, tükrözéssel.", [
    {"t": "Mikor nevezünk két síkbeli alakzatot egybevágónak?", "type": "multiple-choice", "opts": [("Ha alakjuk és méretük pontosan megegyezik, mozgatással fedésbe hozhatók", True), ("Ha csak a színük egyezik", False), ("Ha a területük 0", False), ("Ha az egyik kétszer akkora", False)]},
    {"t": "Két egybevágó alakzat kerülete és területe megegyezik.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Az eltolás, forgatás és tükrözés egybevágósági transzformációk.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Egy alakzat eltolása során megváltozik-e az alakzat területe?", "type": "true-false", "opts": [("Igaz", False), ("Hamis (a terület nem változik)", True)]},
    {"t": "Melyik állítás HAMIS az egybevágó alakzatokról?", "type": "multiple-choice", "opts": [("A megfelelő oldalaik hossza eltérő", True), ("A megfelelő szögeik egyenlőek", False), ("A megfelelő oldalaik hossza egyenlő", False), ("Területük megegyezik", False)]},
    {"t": "Minden négyzet egybevágó minden más négyzettel.", "type": "true-false", "opts": [("Igaz", False), ("Hamis (csak akkor ha oldalhosszuk megegyezik)", True)]},
    {"t": "A tükrözés megtartja a szakaszok hosszát és a szögek nagyságát.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(51, t_geom, "51. óra: A kör", "A kör elemei: középpont (O), sugár (r), átmérő (d), húr, körív, körző használata.", [
    {"t": "Hogyan viszonylik a kör átmérője (d) a sugárhoz (r)?", "type": "multiple-choice", "opts": [("d = 2 * r (az átmérő a sugár kétszerese)", True), ("d = r / 2", False), ("d = r + 5", False), ("d = r * r", False)]},
    {"t": "Ha a kör sugara r = 5 cm, mennyi az átmérője (d)? (cm-ben)", "type": "text-input", "ans": "10"},
    {"t": "Ha a kör átmérője d = 16 cm, mennyi a sugara (r)? (cm-ben)", "type": "text-input", "ans": "8"},
    {"t": "A körvonal pontjai a középponttól egyenlő távolságra (sugárnyira) vannak.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mi a kör leghosszabb húrja?", "type": "multiple-choice", "opts": [("Az átmérő", True), ("A sugár", False), ("A körív", False), ("A körcikk", False)]},
    {"t": "A körző a körök rajzolására és távolságok másolására szolgáló szerkesztőeszköz.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A kör belsejében lévő pontok távolsága a középponttól kisebb, mint a sugár.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(52, t_geom, "52. óra: A szakasz felezőmerőlegese", "A szakaszfelező merőleges tulajdonságai, szerkesztése körzővel és vonalzóval.", [
    {"t": "Mi a szakaszfelező merőleges egyenes fő tulajdonsága?", "type": "multiple-choice", "opts": [("A szakasz felezőpontján áthaladó, a szakaszra merőleges egyenes, melynek pontjai egyenlő távolságra vannak a szakasz két végpontjától", True), ("A szakasszal párhuzamos egyenes", False), ("A szakasz egyik végpontján átmenő egyenes", False), ("Minden szakaszhoz 2 felezőmerőleges tartozik", False)]},
    {"t": "Hány felezőmerőlegese van egy szakasznak a síkban?", "type": "text-input", "ans": "1"},
    {"t": "A szakaszfelező merőleges egyenes pontjai egyenlő távolságra vannak a szakasz két végpontjától.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A szakasz felezőmerőlegesének megszerkesztéséhez a szakasz felénél nagyobb körzőnyílás szükséges.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány fokos szöget zár be a felezőmerőleges a szakasszal?", "type": "text-input", "ans": "90"},
    {"t": "A háromszög oldalfelező merőlegesei egy pontban metszik egymást (a körülírt kör középpontjában).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Egy 8 cm-es szakasz felezőpontja a végponttól 4 cm-re van.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(53, t_geom, "53. óra: Szerkesztések", "Alapszerkesztések: szakasz másolása, szög másolása, merőleges és párhuzamos állítása.", [
    {"t": "Milyen eszközt használunk körök és ívek rajzolásához szerkesztéskor?", "type": "multiple-choice", "opts": [("Körzőt", True), ("Szögmérőt", False), ("Radírt", False), ("Tollat", False)]},
    {"t": "Milyen vonalzót használunk a tiszta geometrikai szerkesztésekhez?", "type": "multiple-choice", "opts": [("Beosztás nélküli (egyenes) vonalzót", True), ("Derékszögű vonalzót beosztással", False), ("Görbe vonalzót", False), ("Mérőszalagot", False)]},
    {"t": "Szakasz másolásakor körzővel mérjük fel a szakasz hosszát.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A szerkesztéseknél a körzőívek metszéspontjai adják meg a keresett pontokat.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány fokos szöget zár be két egymásra merőleges egyenes?", "type": "text-input", "ans": "90"},
    {"t": "Két párhuzamos egyenes sehol sem metszi egymást a síkban.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A pontos és esztétikus szerkesztés alapkövetelmény a geometriában.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(54, t_geom, "54. óra: Szerkesztések II.", "Egyszerű szerkesztési feladatok: háromszög szerkesztése oldalaiból (SSSZ), háromszög-egyenlőtlenség.", [
    {"t": "Mi a háromszög-egyenlőtlenség szabálya?", "type": "multiple-choice", "opts": [("A háromszög bármely két oldalának összege nagyobb a harmadik oldalnál (a + b > c)", True), ("A három oldal összege 180", False), ("A két rövidebb oldal összege kisebb a harmadiknál", False), ("Minden oldal egyenlő", False)]},
    {"t": "Szerkeszthető-e háromszög a 3 cm, 4 cm, 8 cm oldalakkal? (3+4 = 7 < 8)", "type": "true-false", "opts": [("Igaz", False), ("Hamis (nem teljesül a háromszög-egyenlőtlenség)", True)]},
    {"t": "Szerkeszthető-e háromszög 5 cm, 6 cm, 7 cm oldalakkal?", "type": "true-false", "opts": [("Igaz (5+6 > 7)", True), ("Hamis", False)]},
    {"t": "Hány adatra van szükség legalább egy háromszög egyértelmű megszerkesztéséhez?", "type": "text-input", "ans": "3"},
    {"t": "A háromszög szerkesztésének lépései: Vázlat -> Adatok -> Szerkesztés -> Ellenőrzés.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Szerkeszthető-e háromszög 2 cm, 3 cm, 5 cm oldalakkal? (2+3 = 5)", "type": "true-false", "opts": [("Igaz", False), ("Hamis (kell hogy > legyen, nem =)", True)]},
    {"t": "Az egyenlő oldalú háromszög minden oldala egyenlő hosszú.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(55, t_geom, "55. óra: Számonkérés", "Számonkérés a síkbeli alakzatokból és alapszerkesztésekből (10 kérdés).", [
    {"t": "1. Mennyi a háromszög belső szögeinek összege?", "type": "text-input", "ans": "180"},
    {"t": "2. Mennyi a négyszög belső szögeinek összege?", "type": "text-input", "ans": "360"},
    {"t": "3. Szerkeszthető-e háromszög 4 cm, 5 cm, 10 cm oldalakkal?", "type": "true-false", "opts": [("Igaz", False), ("Hamis (4+5 < 10)", True)]},
    {"t": "4. Ha a kör sugara 7 cm, mennyi az átmérője? (cm-ben)", "type": "text-input", "ans": "14"},
    {"t": "5. Hány fokos szöget zár be a szakaszfelező merőleges a szakasszal?", "type": "text-input", "ans": "90"},
    {"t": "6. A rombusz minden oldala egyenlő hosszú.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "7. Milyen szög a 120°-os szög?", "type": "multiple-choice", "opts": [("Tompaszög", True), ("Hegyesszög", False), ("Derékszög", False), ("Egyenesszög", False)]},
    {"t": "8. Hány átlója van egy négyszögnek?", "type": "text-input", "ans": "2"},
    {"t": "9. Az egybevágó alakzatok területe megegyezik.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "10. Hány fokosak a szabályos háromszög szögei?", "type": "text-input", "ans": "60"}
])

add_quiz(56, t_geom, "56. óra: Matematikai játékok", "Geometriai kirakók (Tangram), alakzatok építése, stratégiák.", [
    {"t": "Hány darabból (tanból) áll a klasszikus Tangram kirakó játék?", "type": "text-input", "ans": "7"},
    {"t": "Milyen síkidomokból áll a Tangram készlet?", "type": "multiple-choice", "opts": [("5 háromszög, 1 négyzet, 1 paralelogramma", True), ("7 négyzet", False), ("7 kör", False), ("3 háromszög, 4 téglalap", False)]},
    {"t": "A Tangram elemeiből sokféle figura (állatok, emberi alakok, tárgyak) kirakható.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A kirakós játékok fejlesztik a térszemléletet és a síkbeli alakzatok felismerését.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A szabályos sokszögekkel hégmentesen lefedhető a sík (pl. szabályos hatoszögekkel).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány oldala van a szabályos hexagonnak (hatszögnek)?", "type": "text-input", "ans": "6"},
    {"t": "A geometriai játékok során a próbálgatás és a logikai tervezés együtt segít a megoldásban.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(57, t_geom, "57. óra: Tengelyes tükrözés", "Tengelyes tükrözés fogalma, tengely (t), tárgy és tükörkép (A és A').", [
    {"t": "Mi a tengelyes tükrözés lényege egy 't' tengelyre nézve?", "type": "multiple-choice", "opts": [("A pont és tükörképe a tengelyre merőleges egyenesen van, és egyenlő távolságra van a tengelytől", True), ("A pontot eltoljuk párhuzamosan", False), ("A pontot elforgatjuk 180 fokkal", False), ("A pontot lefelé mozgatjuk 5 cm-rel", False)]},
    {"t": "Hol van a tengelyen lévő pont tükörképe?", "type": "multiple-choice", "opts": [("Önmagában (fixpont)", True), ("Az origóban", False), ("Végtelenben", False), ("A tengely másik végén", False)]},
    {"t": "Ha a P pont 4 cm-re van a tükörtengelytől, milyen messze van a P' tükörkép a tengelytől?", "type": "text-input", "ans": "4"},
    {"t": "Milyen messze van a P pont a P' tükörképétől, ha a tengelytől való távolsága 4 cm?", "type": "text-input", "ans": "8"},
    {"t": "A tengelyes tükrözés egybevágósági transzformáció.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A tengelyes tükrözés megváltoztatja az alakzat körüljárási irányát (pl. óramutató járásával megegyezőből ellentétes lesz).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A tengelyesen tükrös alakzat és tükörképe egybevágó.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(58, t_geom, "58. óra: A tengelyes tükrözés tulajdonságai", "Távolságtartás, szögtartás, körüljárási irány megváltozása, egyenes és kör tükörképe.", [
    {"t": "Melyik tulajdonság érvényes a tengelyes tükrözésre?", "type": "multiple-choice", "opts": [("Távolságtartó, szögtartó, egyenestartó és megváltoztatja a körüljárási irányt", True), ("Növeli a szakaszok hosszát", False), ("Megváltoztatja a szögek nagyságát", False), ("Négyszögből háromszöget csinál", False)]},
    {"t": "Egy 5 cm-es szakasz tengelyes tükörképe is 5 cm hosszú.", "type": "true-false", "opts": [("Igaz (távolságtartó)", True), ("Hamis", False)]},
    {"t": "Egy 45°-os szög tengelyes tükörképe is 45°-os.", "type": "true-false", "opts": [("Igaz (szögtartó)", True), ("Hamis", False)]},
    {"t": "A tengelyre merőleges egyenes tükörképe önmaga (önmagába transzformálódik).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Egy kör tengelyes tükörképe ugyanolyan sugarú kör.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A tengellyel párhuzamos egyenes tükörképe is párhuzamos a tengellyel.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány fixpontja (helyben maradó pontja) van a tengelyes tükrözésnek a síkban?", "type": "multiple-choice", "opts": [("Végtelen sok (a tükörtengely minden pontja)", True), ("Csak 1", False), ("Nincs egy sem", False), ("Pontosan 2", False)]}
])

add_quiz(59, t_geom, "59. óra: Gyakorlóóra", "Tengelyes tükörkép szerkesztésének gyakorlása pontok, szakaszok, sokszögek esetén.", [
    {"t": "Hogyan szerkesztjük meg egy P pont 't' tengelyre vonatkozó tükörképét?", "type": "multiple-choice", "opts": [("Merőlegest állítunk P-ből 't'-re, és a talpponttól felmérjük a P távolságát a merőlegesre", True), ("Párhuzamost húzunk 't'-vel", False), ("Körzővel kört rajzolunk P középponttal", False), ("Összekötjük P-t az origóval", False)]},
    {"t": "Egy háromszög tengelyes tükrözése után a kapott háromszög területe megegyezik az eredetivel.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Ha a P pont a tengelyen van, hol van a tükörképe?", "type": "multiple-choice", "opts": [("Önmagában (P = P')", True), ("A tengely másik oldalán", False), ("A sík szélén", False), ("Az origóban", False)]},
    {"t": "A szakasz felezőmerőlegese a szakaszt önmagára tükrözi vissza.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik betűnek VAN függőleges szimmetriatengelye? (pl. A, M, Y, W)", "type": "multiple-choice", "opts": [("A", True), ("F", False), ("L", False), ("R", False)]},
    {"t": "Melyik betűnek VAN vízszintes szimmetriatengelye? (pl. B, C, D, E, K)", "type": "multiple-choice", "opts": [("E", True), ("F", False), ("G", False), ("J", False)]},
    {"t": "A tengelyesen tükrös alakzatok szimmetrikusak a tükörtengelyre.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(60, t_geom, "60. óra: Tengelyes szimmetria", "Tengelyesen szimmetrikus alakzatok, szögfelező és felezőmerőleges szimmetriatengelyként.", [
    {"t": "Mikor nevezünk egy síkidomot tengelyesen szimmetrikusnak?", "type": "multiple-choice", "opts": [("Ha van legalább egy olyan egyenes (szimmetriatengely), amelyre tükrözve a síkidom önmagába megy át", True), ("Ha minden oldala egyenlő", False), ("Ha kerek", False), ("Ha nincs szöge", False)]},
    {"t": "Mi a szögfelező egyenes fő tulajdonsága?", "type": "multiple-choice", "opts": [("A szögtartományt két egyenlő szögre osztja, és pontjai egyenlő távolságra vannak a szög száraitól", True), ("A szög szárait meghosszabbítja", False), ("Merőleges a szög száira", False), ("Párhuzamos a szög száival", False)]},
    {"t": "A szögfelező egyenes a szög szimmetriatengelye.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány szimmetriatengelye van egy 60°-os szögnek?", "type": "text-input", "ans": "1"},
    {"t": "Hány szimmetriatengelye van a körnek?", "type": "multiple-choice", "opts": [("Végtelen sok (minden középponton átmenő egyenes)", True), ("1", False), ("2", False), ("4", False)]},
    {"t": "A szögfelező megszerkesztéséhez körzőíveket használunk a szög szárain.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány fokos két 30°-os részre osztja a szögfelező a 60°-os szöget?", "type": "text-input", "ans": "30"}
])

add_quiz(61, t_geom, "61. óra: Tengelyesen szimmetrikus háromszögek, négyszögek, sokszögek", "Egyenlő szárú háromszög tulajdonságai és szimmetriatengelye.", [
    {"t": "Hány szimmetriatengelye van az egyenlő szárú (nem egyenlő oldalú) háromszögnek?", "type": "text-input", "ans": "1"},
    {"t": "Hány szimmetriatengelye van a szabályos (egyenlő oldalú) háromszögnek?", "type": "text-input", "ans": "3"},
    {"t": "Az egyenlő szárú háromszög alapon fekvő szögei egyenlők.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Ha az egyenlő szárú háromszög szárai 8 cm-esek, és alapja 5 cm, mennyi a kerülete? (8+8+5)", "type": "text-input", "ans": "21"},
    {"t": "Ha az egyenlő szárú háromszög szárszöge (csúcsszöge) 40°, mekkorák az alapon fekvő szögek? ((180-40)/2)", "type": "text-input", "ans": "70"},
    {"t": "Az egyenlő szárú háromszög szimmetriatengelye az alap felezőmerőlegese és a szárszög felezője is egyben.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Az egyenlő oldalú háromszög minden szöge 60°-os.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(62, t_geom, "62. óra: Tengelyesen szimmetrikus háromszögek, négyszögek, sokszögek II.", "Tengelyesen szimmetrikus négyszögek (téglalap, négyzet, rombusz, deltoid, szimmetrikus trapéz) szimmetriatengelyei.", [
    {"t": "Hány szimmetriatengelye van a négyzetnek?", "type": "text-input", "ans": "4"},
    {"t": "Hány szimmetriatengelye van a téglalapnak (ami nem négyzet)? (az oldalfelező merőlegesek)", "type": "text-input", "ans": "2"},
    {"t": "Hány szimmetriatengelye van a rombusznak (ami nem négyzet)? (az átlók egyenesei)", "type": "text-input", "ans": "2"},
    {"t": "Hány szimmetriatengelye van a deltoidnak (ha nem rombusz)?", "type": "text-input", "ans": "1"},
    {"t": "A szimmetrikus (egyenlő szárú) trapéznak 1 szimmetriatengelye van.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Az általános paralelogrammának (ami nem rombusz és nem téglalap) NINCS tengelyes szimmetriatengelye.", "type": "true-false", "opts": [("Igaz (középpontosan szimmetrikus, de tengelyesen nem)", True), ("Hamis", False)]},
    {"t": "Hány szimmetriatengelye van a szabályos ötszögnek?", "type": "text-input", "ans": "5"}
])

add_quiz(63, t_geom, "63. óra: Szerkesztési feladatok", "Szakasz- és szögmásolás, szögfelezés, háromszögszerkesztések gyakorlása.", [
    {"t": "Hogyan felezünk meg egy 80°-os szöget szerkesztéssel?", "type": "multiple-choice", "opts": [("Megszerkesztjük a szög szögfelező egyenesét, így két 40°-os szöget kapunk", True), ("Levágunk belőle 10 fokot", False), ("Merőlegest húzunk a szög egyik szárára", False), ("Szögmérővel elosztjuk", False)]},
    {"t": "A szögfelezéshez körzőt és egyenes vonalzót használsz.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány fokos szögeket kapunk egy 90°-os derékszög felezésekor?", "type": "text-input", "ans": "45"},
    {"t": "Hány fokos szögeket kapunk egy 180°-os egyenesszög felezésekor?", "type": "text-input", "ans": "90"},
    {"t": "Szerkeszthető-e 60°-os szög kizárólag körzővel és vonalzóval (szabályos háromszög szerkesztésével)?", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Szerkeszthető-e 30°-os szög a 60°-os szög felezésével?", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Szerkeszthető-e 15°-os szög a 30°-os szög felezésével?", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(64, t_geom, "64. óra: Dinamikus szerkesztőprogram megismerése", "Interaktív geometriai szoftverek (GeoGebra), alakzatok mozgatása, tulajdonságok megfigyelése.", [
    {"t": "Mire való a GeoGebra dinamikus geometriai program?", "type": "multiple-choice", "opts": [("Geometriai alakzatok szerkesztésére, mozgatására, mérésére és összefüggések felfedezésére", True), ("Szövegszerkesztésre", False), ("Videóvágásra", False), ("Kódolásra C++ nyelven", False)]},
    {"t": "Dinamikus szerkesztőprogramban az csúcsok mozgatásakor az alakzat tulajdonságai és összefüggései megőrződnek.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A dinamikus programokban a háromszög belső szögeinek összege mozgattatás közben is mindig 180° marad.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A szerkesztőprogram segítségével ellenőrizhető a kézi szerkesztések pontossága.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik funkció segít a pontok tengelyes tükörképének azonnali előállításában a szoftverben?", "type": "multiple-choice", "opts": [("Tengelyes tükrözés eszköz", True), ("Színezés", False), ("Törlés", False), ("Nagyítás", False)]},
    {"t": "A számítógépes geometriai modellezés segíti a mélyebb megértést.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány fok a teljes szög a geometriában?", "type": "text-input", "ans": "360"}
])

add_quiz(65, t_geom, "65. óra: Összefoglalás", "A Geometria és tengelyes tükrözés fejezet fogalmainak, szerkesztéseinek összefoglalása.", [
    {"t": "Hány szimmetriatengelye van a téglalapnak?", "type": "text-input", "ans": "2"},
    {"t": "Hány szimmetriatengelye van a négyzetnek?", "type": "text-input", "ans": "4"},
    {"t": "A tengelyes tükrözés megváltoztatja a síkidom körüljárási irányát.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a háromszög belső szögeinek összege?", "type": "text-input", "ans": "180"},
    {"t": "A szakaszfelező merőleges minden pontja egyenlő távolságra van a szakasz két végpontjától.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Ha a kör átmérője 12 cm, mekkora a sugara? (cm-ben)", "type": "text-input", "ans": "6"},
    {"t": "A szögfelező egyenes felezi a szöget és egyenlő távolságra van a szög száraitól.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(66, t_geom, "66. óra: Témazáró dolgozat", "Témazáró számonkérés a Geometria és tengelyes tükrözés fejezetből (10 kérdés).", [
    {"t": "1. Mennyi a háromszög belső szögeinek összege?", "type": "text-input", "ans": "180"},
    {"t": "2. Mennyi a négyszög belső szögeinek összege?", "type": "text-input", "ans": "360"},
    {"t": "3. Hány szimmetriatengelye van a négyzetnek?", "type": "text-input", "ans": "4"},
    {"t": "4. Hány szimmetriatengelye van az egyenlő szárú (nem szabályos) háromszögnek?", "type": "text-input", "ans": "1"},
    {"t": "5. Ha a kör sugara 4,5 cm, mekkora az átmérője? (cm-ben)", "type": "text-input", "ans": "9"},
    {"t": "6. A tengelyes tükrözés távolságtartó transzformáció.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "7. Szerkeszthető-e háromszög 3 cm, 5 cm, 9 cm oldalakkal?", "type": "true-false", "opts": [("Igaz", False), ("Hamis (3+5 < 9)", True)]},
    {"t": "8. Hány fokos szögeket kapunk egy 120°-os szög felezésekor?", "type": "text-input", "ans": "60"},
    {"t": "9. A rombusz minden oldala egyenlő hosszú.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "10. Hol található a tükörtengelyen lévő pont tükörképe?", "type": "multiple-choice", "opts": [("Önmagában", True), ("Az origóban", False), ("A tengely végétől 5 cm-re", False), ("A sík szélén", False)]}
])

add_quiz(67, t_geom, "67. óra: Témazáró dolgozat értékelése", "A geometriai témazáró megbeszélése, szerkesztések értékelése és hibajavítás.", [
    {"t": "Mi volt a leggyakoribb hiba a szerkesztési feladatok során?", "type": "multiple-choice", "opts": [("A körző pontatlan használata és a háromszög-egyenlőtlenség figyelmen kívül hagyása", True), ("A ceruza színe", False), ("A füzet vonalazása", False), ("A számok leírása", False)]},
    {"t": "A szakaszfelező merőleges merőleges a szakaszra és átmegy a felezőpontján.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a kör átmérője, ha a sugara 10 cm?", "type": "text-input", "ans": "20"},
    {"t": "A tengelyes tükrözés során a síkidom területe nem változik.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány szimmetriatengelye van a körnek?", "type": "multiple-choice", "opts": [("Végtelen sok", True), ("1", False), ("2", False), ("4", False)]},
    {"t": "A pontos vázlatkészítés megkönnyíti a bonyolultabb szerkesztések elvégzését.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a háromszög harmadik szöge, ha az első kettő 50° és 70°?", "type": "text-input", "ans": "60"}
])

print("Törtek & Geometria quizzes created (28-67).")
