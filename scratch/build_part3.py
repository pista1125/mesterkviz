
# IV. ARÁNY, SZÁZALÉK, SZÖVEGES FELADATOK (68-97)
t_arany = "Arány, százalék, szöveges feladatok"

add_quiz(68, t_arany, "68. óra: Az arány fogalma", "Az arány fogalma, felírása kettősponttal és törttel, értelmezése hétköznapi példákban.", [
    {"t": "Mit fejez ki két mennyiség aránya?", "type": "multiple-choice", "opts": [("Megmutatja, hányszorosa az egyik mennyiség a másiknak (hányadosukat)", True), ("Megmutatja a két mennyiség összegét", False), ("Megmutatja a két mennyiség szorzatát", False), ("Nem fejez ki semmit", False)]},
    {"t": "Hogyan jelöljük az arányt matematikailag?", "type": "multiple-choice", "opts": [("Kettősponttal (pl. 2 : 3) vagy törttel (2/3)", True), ("Plusz jellel", False), ("Csillaggal", False), ("Egyenlőségjellel", False)]},
    {"t": "Ha egy osztályban 10 fiú és 15 lány van, mi a fiúk és lányok számának aránya legegyszerűbb alakban?", "type": "multiple-choice", "opts": [("2 : 3 (10/15 egyszerűsítve 5-tel)", True), ("1 : 2", False), ("3 : 2", False), ("10 : 1", False)]},
    {"t": "Az arány a törtekhez hasonlóan egyszerűsíthető és bővíthető.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 4 : 8 arány egyszerűsített alakja?", "type": "multiple-choice", "opts": [("1 : 2", True), ("2 : 4", False), ("1 : 4", False), ("4 : 1", False)]},
    {"t": "Ha az arány 3 : 1, az első mennyiség 3-szor akkora, mint a második.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik arány egyenlő az 1 : 2 aránnyal?", "type": "multiple-choice", "opts": [("5 : 10", True), ("2 : 1", False), ("3 : 5", False), ("4 : 6", False)]}
])

add_quiz(69, t_arany, "69. óra: Arányos osztás", "Adott mennyiség felosztása megadott arányban (pl. 2 : 3 arányban).", [
    {"t": "Ha 500 Ft-ot elosztunk 2 : 3 arányban, hány egyenlő részre osztjuk először a teljes összeget?", "type": "text-input", "ans": "5"},
    {"t": "Hány Ft a kisebbik rész 500 Ft 2 : 3 arányú felosztásakor? (1 rész = 100 Ft, 2 rész = 200 Ft)", "type": "text-input", "ans": "200"},
    {"t": "Hány Ft a nagyobbik rész 500 Ft 2 : 3 arányú felosztásakor? (3 rész = 300 Ft)", "type": "text-input", "ans": "300"},
    {"t": "Az arányos osztásnál az arányszámok összege megadja az összes egység (rész) számát.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Ossz el 30 szem cukorkát 1 : 2 arányban! Hány cukorka a nagyobbik adag?", "type": "text-input", "ans": "20"},
    {"t": "Ossz el 30 szem cukorkát 1 : 2 arányban! Hány cukorka a kisebbik adag?", "type": "text-input", "ans": "10"},
    {"t": "Az arányos osztási feladatok ellenőrizhetők a kapott részek összegzésével.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(70, t_arany, "70. óra: Feladatok megoldása", "Hétköznapi recept, ötvözet, keverék és arányos osztási feladatok.", [
    {"t": "Egy habarcs készítéséhez homok és mész kell 4 : 1 arányban. Hány kg homok kell 50 kg habarcshoz?", "type": "text-input", "ans": "40"},
    {"t": "Egy szörp elkészítéséhez szörp és víz kell 1 : 4 arányban. Hány dl szörp kell 10 dl (1 liter) italhoz?", "type": "text-input", "ans": "2"},
    {"t": "Ha két testvér 3 : 5 arányban osztozik 800 Ft-on, a nagyobbik rész 500 Ft.", "type": "true-false", "opts": [("Igaz (800 / 8 = 100, 5 * 100 = 500)", True), ("Hamis", False)]},
    {"t": "Egy téglalap két szomszédos oldalának aránya 2 : 3. Ha a rövidebb oldal 6 cm, hány cm a hosszabb oldal?", "type": "text-input", "ans": "9"},
    {"t": "Melyik állítás igaz az arányos osztásra?", "type": "multiple-choice", "opts": [("A kapott részek aránya megegyezik a megadott aránnyal", True), ("Minden rész egyenlő nagyságú", False), ("A részek összege kisebb az eredeti mennyiségnél", False), ("Nem lehet kiszámolni", False)]},
    {"t": "Hány g mész kell 50 kg (4:1 arányú) habarcshoz?", "type": "text-input", "ans": "10"},
    {"t": "A receptekben megadott hozzávalók aránya lehetővé teszi tetszőleges adag elkészítését.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(71, t_arany, "71. óra: Egyenes arányosság", "Egyenes arányosság tulajdonságai: hányados állandó, megkétszereződés esetén a másik is megkétszereződik.", [
    {"t": "Mit jelent az egyenes arányosság?", "type": "multiple-choice", "opts": [("Ha az egyik mennyiség hányszorosára változik, a másik mennyiség is ugyanannyiszorosára változik", True), ("Ha az egyik nő, a másik felére csökken", False), ("Ha a két mennyiség összege 100", False), ("Ha a két mennyiség szorzata állandó", False)]},
    {"t": "Egyenes arányosság esetén a két összetartozó érték hányadosa állandó.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Ha 2 kg alma 800 Ft, mennyibe kerül 6 kg alma? (800 * 3)", "type": "text-input", "ans": "2400"},
    {"t": "Ha 3 füzet 600 Ft, mennyibe kerül 1 füzet?", "type": "text-input", "ans": "200"},
    {"t": "Melyik pár között van egyenes arányosság?", "type": "multiple-choice", "opts": [("Az azonos árú termék tömege és a fizetendő összeg", True), ("Az ember életkora és a magassága felnőttként", False), ("A téglalap két oldala rögzített területnél", False), ("A sebesség és az idő adott úton", False)]},
    {"t": "Ha a megvásárolt mennyiséget felére csökkentjük, a fizetendő ár is a felére csökken.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Ha 5 l üdítő 2000 Ft, mennyi 10 l üdítő ára? (Ft-ban)", "type": "text-input", "ans": "4000"}
])

add_quiz(72, t_arany, "72. óra: Egyenes arányosság grafikonja", "Az egyenes arányosság ábrázolása a derékszögű koordináta-rendszerben.", [
    {"t": "Milyen alakzat az egyenes arányosság grafikonja a koordináta-rendszerben?", "type": "multiple-choice", "opts": [("Az origóból (0; 0) induló félegyenes (vagy egyenes)", True), ("Parabola", False), ("Körvonal", False), ("Vízszintes egyenes", False)]},
    {"t": "Áthalad-e az egyenes arányosság grafikonja az origón (0; 0)?", "type": "true-false", "opts": [("Igaz (0 mennyiség ára 0 Ft)", True), ("Hamis", False)]},
    {"t": "Ha a grafikon áthalad a (1; 300) ponton, mennyi az egységérték?", "type": "text-input", "ans": "300"},
    {"t": "Ha a grafikon áthalad a (1; 300) ponton, hol metszi a 4-es értéket az y tengelyen? (4 * 300)", "type": "text-input", "ans": "1200"},
    {"t": "A grafikonról leolvashatók az összetartozó értékpárok.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Egyenes arányosságnál a meredekség megadja az egységárat.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Ha 0 kg áru 0 Ft, a grafikon a (0;0) pontból indul.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(73, t_arany, "73. óra: Gyakorlóóra", "Gyakorlati feladatok egyenes arányosságra, táblázatkitöltés, grafikon leolvasás.", [
    {"t": "Ha 4 méter szalag 1000 Ft, mennyibe kerül 7 méter szalag? (1000/4 = 250 Ft/m, 250*7)", "type": "text-input", "ans": "1750"},
    {"t": "Egy autó 100 km-en 7 liter benzint fogyaszt. Hány litert fogyaszt 400 km-en?", "type": "text-input", "ans": "28"},
    {"t": "Ha 2 óra alatt 120 km-t tesz meg a vonat állandó sebességgel, hány km-t tesz meg 5 óra alatt?", "type": "text-input", "ans": "300"},
    {"t": "Az egységár meghatározása megkönnyíti a tetszőleges mennyiség árának kiszámítását.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Ha 10 füzet 2500 Ft, mennyibe kerül 4 füzet?", "type": "text-input", "ans": "1000"},
    {"t": "Egyenes arányosságnál ha a független változót megháromszorozzuk, a függő változó is megháromszorozódik.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Ha 1 kg sajt 4000 Ft, mennyibe kerül 0,25 kg sajt?", "type": "text-input", "ans": "1000"}
])

add_quiz(74, t_arany, "74. óra: Matematikai játékok", "Sorozatok szabályai, játékos arányossági feladatok, csoportszervezés.", [
    {"t": "Mi a hiányzó szám a sorozatban: 2, 5, 8, 11, __?", "type": "text-input", "ans": "14"},
    {"t": "Mi a szabálya a 2, 4, 8, 16, 32 sorozatnak?", "type": "multiple-choice", "opts": [("Szorzás 2-vel (*2)", True), ("Hozzáadás 2-vel (+2)", False), ("Négyzetre emelés", False), ("Kivonás 2-vel", False)]},
    {"t": "A sorozatszabály megállapításához több egymást követő elem vizsgálata szükséges.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mi a következő szám a 100, 90, 80, 70 sorozatban?", "type": "text-input", "ans": "60"},
    {"t": "Mi a hiányzó szám a Fibonacci sorozatban: 1, 1, 2, 3, 5, 8, __?", "type": "text-input", "ans": "13"},
    {"t": "A növekvő számsorozatban az elemek értéke folyamatosan nő.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mi a szabálya a 3, 9, 27, 81 sorozatnak?", "type": "multiple-choice", "opts": [("Szorzás 3-mal (*3)", True), ("Hozzáadás 6-tal", False), ("Hozzáadás 3-mal", False), ("Osztás 3-mal", False)]}
])

add_quiz(75, t_arany, "75. óra: Szabályok, megfeleltetések", "Sorozatok megadása képlettel, alakzat-sorozatok, szabályfelismerés.", [
    {"t": "Ha a sorozat nth elemének szabálya: a_n = 3 * n, mennyi a 4. elem?", "type": "text-input", "ans": "12"},
    {"t": "Ha a sorozat szabálya: a_n = 2 * n + 1, mennyi a 5. elem? (2*5 + 1)", "type": "text-input", "ans": "11"},
    {"t": "A számsorozatok a mindennapi mérésekben és a természetben is megjelennek.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Ha a sorozat szabálya a_n = n * n (négyzetszámok), mennyi a 4. elem?", "type": "text-input", "ans": "16"},
    {"t": "Melyik sorozat szabálya a 'Hozzáadás 5-tel'?", "type": "multiple-choice", "opts": [("5, 10, 15, 20, 25", True), ("5, 25, 125", False), ("5, 4, 3, 2", False), ("1, 2, 4, 8", False)]},
    {"t": "Az alakzat-sorozatoknál az elemek száma (pl. gyufaszálak száma) számsorozatot alkot.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi a 10. páros természetes szám (2, 4, 6, ...)?", "type": "text-input", "ans": "20"}
])

add_quiz(76, t_arany, "76. óra: Gyakorlóóra", "Gyakorló feladatok sorozatok szabályaira és egyenes arányosságra.", [
    {"t": "Mi a hiányzó szám a sorozatban: 1, 4, 9, 16, __, 36? (négyzetszámok)", "type": "text-input", "ans": "25"},
    {"t": "Mi a hiányzó szám: 50, 43, 36, 29, __? (kivonás 7-tel)", "type": "text-input", "ans": "22"},
    {"t": "Ha 3 kg narancs 1500 Ft, mennyi 1 kg narancs ára?", "type": "text-input", "ans": "500"},
    {"t": "Ha 1 kg narancs 500 Ft, mennyibe kerül 8 kg narancs?", "type": "text-input", "ans": "4000"},
    {"t": "Egy sorozatnak több különböző folytatása is elképzelhető, ha nem rögzítjük pontosan a szabályt.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mi a szabálya a 1, 3, 7, 15, 31 sorozatnak?", "type": "multiple-choice", "opts": [("Szorzás 2-vel és hozzáadás 1-gyel (*2 + 1)", True), ("Hozzáadás 2-vel", False), ("Szorzás 3-mal", False), ("Négyzetre emelés", False)]},
    {"t": "A számsorozatok logikus gondolkodásra nevelnek.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(77, t_arany, "77. óra: Törtrész", "Törtrész kiszámítása és kapcsolata az egyenes arányossággal.", [
    {"t": "Hogyan számítjuk ki egy mennyiség 3/5 részét?", "type": "multiple-choice", "opts": [("Elosztjuk 5-tel és megszorozzuk 3-mal (vagy megszorozzuk 3/5-tel)", True), ("Megszorozzuk 5-tel és elosztjuk 3-mal", False), ("Hozzáadunk 3/5-öt", False), ("Kivonunk 3/5-öt", False)]},
    {"t": "Mennyi 80-nak a 3/4 része?", "type": "text-input", "ans": "60"},
    {"t": "Mennyi 150-nek a 2/3 része?", "type": "text-input", "ans": "100"},
    {"t": "A törtrész kiszámítása egyenesen arányos a megadott tört nagyságával.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 200-nak az 1/10 része?", "type": "text-input", "ans": "20"},
    {"t": "Ha egy mennyiség 1/2 része 30, mennyi a teljes mennyiség? (30 * 2)", "type": "text-input", "ans": "60"},
    {"t": "Mennyi 90-nek a 4/9 része?", "type": "text-input", "ans": "40"}
])

add_quiz(78, t_arany, "78. óra: Feladatmegoldás", "Összetett feladatok megoldása törtrész kiszámításával.", [
    {"t": "Egy 600 oldalú könyvnek elolvastuk a 3/5 részét. Hány oldalt olvastunk el?", "type": "text-input", "ans": "360"},
    {"t": "Egy 600 oldalú könyvnek elolvastuk a 3/5 részét. Hány oldal van még hátra? (600 - 360)", "type": "text-input", "ans": "240"},
    {"t": "Kati zsebpénze 4000 Ft. Elköltötte a 3/8 részét. Hány Ft-ot költött el? (4000 * 3/8)", "type": "text-input", "ans": "1500"},
    {"t": "Kati zsebpénze 4000 Ft. Elköltötte a 3/8 részét. Hány Ft-ja maradt?", "type": "text-input", "ans": "2500"},
    {"t": "Ha a törtrész kiszámítása után a maradékot keresük, a teljesből kivonjuk a törtrészt.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 120-nak a 5/6 része?", "type": "text-input", "ans": "100"},
    {"t": "A törtrész kiszámítása fontos a pénzügyi és mindennapi döntésekben.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(79, t_arany, "79. óra: Számonkérés", "Számonkérés az arány, egyenes arányosság és törtrész témakörökből (10 kérdés).", [
    {"t": "1. Mennyi a 6 : 18 arány egyszerűsített alakja?", "type": "multiple-choice", "opts": [("1 : 3", True), ("1 : 2", False), ("3 : 1", False), ("2 : 3", False)]},
    {"t": "2. Ossz el 400 Ft-ot 1 : 3 arányban! Hány Ft a kisebbik rész?", "type": "text-input", "ans": "100"},
    {"t": "3. Ossz el 400 Ft-ot 1 : 3 arányban! Hány Ft a nagyobbik rész?", "type": "text-input", "ans": "300"},
    {"t": "4. Ha 3 kg alma 900 Ft, mennyibe kerül 5 kg alma?", "type": "text-input", "ans": "1500"},
    {"t": "5. Mennyi 120-nak a 3/4 része?", "type": "text-input", "ans": "90"},
    {"t": "6. Az egyenes arányosság grafikonja az origóból induló félegyenes.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "7. Mi a hiányzó szám a sorozatban: 4, 8, 12, 16, __?", "type": "text-input", "ans": "20"},
    {"t": "8. Ha egy mennyiség 1/3-a 15, mennyi az egész mennyiség?", "type": "text-input", "ans": "45"},
    {"t": "9. Két mennyiség aránya hányados formájában is felírható.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "10. Mennyi 50-nek a 4/5 része?", "type": "text-input", "ans": "40"}
])

add_quiz(80, t_arany, "80. óra: Létraverseny I.", "Versenyszerű feladatmegoldás páros munkában az arányosságok témájában.", [
    {"t": "Ha 2 m szalag 400 Ft, mennyibe kerül 10 m szalag?", "type": "text-input", "ans": "2000"},
    {"t": "Mennyi az 5 : 15 arány legegyszerűbb alakja?", "type": "multiple-choice", "opts": [("1 : 3", True), ("1 : 5", False), ("3 : 1", False), ("1 : 2", False)]},
    {"t": "Mennyi 200-nak a 3/5 része?", "type": "text-input", "ans": "120"},
    {"t": "Mi a sorozat 5. eleme: 3, 6, 12, 24, __?", "type": "text-input", "ans": "48"},
    {"t": "Az arányos osztásnál a részek összege kiadja az eredeti egészet.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány dl szörp kell 2 liter (1:4 arányú) hígított italhoz? (20 dl / 5 = 4 dl)", "type": "text-input", "ans": "4"},
    {"t": "A játékos versenyzés növeli a feladatmegoldási motivációt.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(81, t_arany, "81. óra: Százalékszámítás", "1 egész = 100%, 1% fogalma (századrész), százalék és törtrész kapcsolata.", [
    {"t": "Mit jelent a 1% (egy százalék) fogalma?", "type": "multiple-choice", "opts": [("Az egész mennyiség 1/100-ad részét (századrészét)", True), ("Az egész 1/10-ed részét", False), ("100 egészet", False), ("Az egész felét", False)]},
    {"t": "Hány százalék felel meg a teljes egésznek?", "type": "text-input", "ans": "100"},
    {"t": "Hány százalék felel meg a fél (1/2) mennyiségnek?", "type": "text-input", "ans": "50"},
    {"t": "Hány százalék felel meg a negyed (1/4) mennyiségnek?", "type": "text-input", "ans": "25"},
    {"t": "Hány százalék felel meg a háromnegyed (3/4) mennyiségnek?", "type": "text-input", "ans": "75"},
    {"t": "A 10% az egész 1/10-ed részét jelenti.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A 20% az egész 1/5-öd részének felel meg.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(82, t_arany, "82. óra: A százalékszámítás gyakorlása", "Százalékérték kiszámítása következtetéssel (1% kiszámítása) vagy törtrésszel.", [
    {"t": "Mennyi 500 Ft-nak a 10%-a? (500 / 10)", "type": "text-input", "ans": "50"},
    {"t": "Mennyi 500 Ft-nak az 1%-a? (500 / 100)", "type": "text-input", "ans": "5"},
    {"t": "Mennyi 500 Ft-nak a 20%-a? (500 * 0,2)", "type": "text-input", "ans": "100"},
    {"t": "Mennyi 800 kg-nak az 50%-a?", "type": "text-input", "ans": "400"},
    {"t": "A százalékérték kiszámításához az alapmennyiséget megszorozzuk a százaléklábbal és elosztjuk 100-zal.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 200 Ft-nak a 25%-a? (200 / 4)", "type": "text-input", "ans": "50"},
    {"t": "Mennyi 1000 Ft-nak a 30%-a?", "type": "text-input", "ans": "300"}
])

add_quiz(83, t_arany, "83. óra: Feladatmegoldás", "Százalékszámítással kapcsolatos hétköznapi szöveges feladatok.", [
    {"t": "Egy 10 000 Ft-os cipő árából 20% kedvezményt adnak. Mennyi a kedvezmény összege? (10000 * 0,2)", "type": "text-input", "ans": "2000"},
    {"t": "Egy 10 000 Ft-os cipő árából 20% kedvezményt adnak. Mennyi a kedvezményes ár? (10000 - 2000)", "type": "text-input", "ans": "8000"},
    {"t": "Egy iskolában 400 tanuló van. 55%-uk lány. Hány lány jár az iskolába? (400 * 0,55)", "type": "text-input", "ans": "220"},
    {"t": "Hány fiú jár az iskolába? (400 - 220)", "type": "text-input", "ans": "180"},
    {"t": "A kedvezményes ár kiszámításához az eredeti árból kivonjuk a kedvezmény értékét.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Ha egy ár 10%-kal nő, az új ár az eredeti ár 110%-a lesz.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 50 000 Ft 5%-os kamata 1 évre?", "type": "text-input", "ans": "2500"}
])

add_quiz(84, t_arany, "84. óra: Feladatmegoldás II.", "Összetettebb százalékszámítási feladatok, árleértékelések, drágulások.", [
    {"t": "Egy 20 000 Ft-os kabát árát 15%-kal felemelték. Hány Ft a drágulás értéke? (20000 * 0,15)", "type": "text-input", "ans": "3000"},
    {"t": "Mennyi a kabát új ára a 15%-os drágulás után? (20000 + 3000)", "type": "text-input", "ans": "23000"},
    {"t": "A 30-as létszámú osztályban a tanulók 10%-a hiányzott. Hány tanuló hiányzott?", "type": "text-input", "ans": "3"},
    {"t": "Hány tanuló volt jelen az osztályban? (30 - 3)", "type": "text-input", "ans": "27"},
    {"t": "Ha a 100 Ft-os termék ára 50%-kal csökken, majd a kedvezményes ár 50%-kal nő, az ár visszatér 100 Ft-ra.", "type": "true-false", "opts": [("Igaz", False), ("Hamis (50 Ft 50%-os növekedése 75 Ft lesz!)", True)]},
    {"t": "Mennyi 400 liter 75%-a?", "type": "text-input", "ans": "300"},
    {"t": "A százalékszámítás alapvető ismeret a mindennapi pénzügyi tájékozódáshoz.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(85, t_arany, "85. óra: Projektóra", "Családi költségvetés készítése megadott keretből, százalékos megoszlások számítása.", [
    {"t": "Ha a család havi jövedelme 400 000 Ft, és 30%-ot költenek lakhatásra, hány Ft a lakhatási költség?", "type": "text-input", "ans": "120000"},
    {"t": "Ha a jövedelem 40%-át élelmiszerre költik, hány Ft megy élelmiszerre? (400000 * 0,4)", "type": "text-input", "ans": "160000"},
    {"t": "Hány Ft marad megtakarításra és egyéb kiadásokra? (400000 - 120000 - 160000)", "type": "text-input", "ans": "120000"},
    {"t": "A családi költségvetés készítésekor a kiadások összege nem haladhatja meg a bevételeket.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány százalékot tesz ki a megmaradt 120 000 Ft a 400 000 Ft-os jövedelemből?", "type": "text-input", "ans": "30"},
    {"t": "A százalékos megoszlás kördiagramon ábrázolva jól szemlélteti a kiadások arányát.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "A tudatos pénzügyi tervezés segít elkerülni az eladósodást.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(86, t_arany, "86. óra: Nyitott mondatok", "Lebontogatás (visszafelé gondolkodás) és próbálgatás módszere egyenleteknél.", [
    {"t": "Mit jelent a lebontogatás (visszafelé gondolkodás) módszere?", "type": "multiple-choice", "opts": [("A végeredményből kiindulva az inverz (ellentétes) műveleteket végezzük el visszafelé", True), ("Visszafelé írjuk le a számokat", False), ("Tippelünk egy számot és feladjuk", False), ("Kivonunk mindent 100-ból", False)]},
    {"t": "Melyik szám teszi igazzá: 2 * x + 5 = 17? (17 - 5 = 12, 12 / 2)", "type": "text-input", "ans": "6"},
    {"t": "Melyik szám teszi igazzá: (y - 4) : 3 = 5? (5 * 3 = 15, 15 + 4)", "type": "text-input", "ans": "19"},
    {"t": "Az ellenőrzés során a kapott értéket behelyettesítjük az eredeti nyitott mondatba.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik szám teszi igazzá: 3 * a - 10 = 20?", "type": "text-input", "ans": "10"},
    {"t": "A próbálgatásos módszernél rendszerezett táblázatot érdemes vezetni.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik szám teszi igazzá: x / 4 + 2 = 7?", "type": "text-input", "ans": "20"}
])

add_quiz(87, t_arany, "87. óra: Feladatmegoldás: Nyitott mondatok", "Gyakorlás: lebontogatási módszer alkalmazása egyenletek és egyenlőtlenségek megoldásában.", [
    {"t": "Melyik szám teszi igazzá: 4 * (x + 2) = 36? (36/4 = 9, 9-2)", "type": "text-input", "ans": "7"},
    {"t": "Melyik szám teszi igazzá: 5 * y - 12 = 38? (50/5)", "type": "text-input", "ans": "10"},
    {"t": "Ha az alaphalmaz a természetes számok (0, 1, 2, ...), hány megoldása van a 2 * x < 6 egyenlőtlenségnek? (x = 0, 1, 2)", "type": "text-input", "ans": "3"},
    {"t": "Az egyenlőtlenségeknek több megoldása is lehet egy megadott alaphalmazon.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik szám teszi igazzá: (z + 10) / 2 = 15?", "type": "text-input", "ans": "20"},
    {"t": "Ha az egyenletnek nincs megoldása az adott alaphalmazon, az igazsághalmaz az üres halmaz.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik szám teszi igazzá: 10 * x - 25 = 75?", "type": "text-input", "ans": "10"}
])

add_quiz(88, t_arany, "88. óra: Gyakorlóóra", "Nyitott mondatok és műveleti sorrend gyakorlása.", [
    {"t": "Melyik szám teszi igazzá: 3 * x + 7 = 34?", "type": "text-input", "ans": "9"},
    {"t": "Melyik szám teszi igazzá: (x - 5) * 6 = 42?", "type": "text-input", "ans": "12"},
    {"t": "A lebontogatás lépései során az utolsóként elvégzett művelet inverzével kezdjük a számolást.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi x értéke, ha 50 - 2 * x = 30? (2x = 20)", "type": "text-input", "ans": "10"},
    {"t": "Mennyi y értéke, ha y / 3 - 4 = 6?", "type": "text-input", "ans": "30"},
    {"t": "Az ellenőrzés kihagyása növeli a hibázás kockázatát.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik szám teszi igazzá: 8 * a + 4 = 68?", "type": "text-input", "ans": "8"}
])

add_quiz(89, t_arany, "89. óra: Szöveges feladatok", "Szöveges feladatok megoldása nyitott mondatok felírásával, ábrakészítéssel.", [
    {"t": "Gondoltam egy számot, megszóroztam 3-mal, hozzáadtam 12-őt és 45-öt kaptam. Mi volt a szám? (3x + 12 = 45 -> 3x = 33)", "type": "text-input", "ans": "11"},
    {"t": "Gondoltam egy számot, kivontam belőle 8-at, megszoroztam 4-gyel és 40-et kaptam. Mi volt a szám? ((x-8)*4 = 40 -> x-8 = 10)", "type": "text-input", "ans": "18"},
    {"t": "Katinak 3-szor annyi matricája van, mint Petinek. Összesen 48 matricájuk van. Hány matricája van Petinek? (x + 3x = 48 -> 4x = 48)", "type": "text-input", "ans": "12"},
    {"t": "Hány matricája van Katinak? (3 * 12)", "type": "text-input", "ans": "36"},
    {"t": "A szöveges feladatok megoldásának lépései: Értelmezés -> Adatok/Ismeretlen -> Nyitott mondat -> Számolás -> Ellenőrzés -> Válaszmondat.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Ha a feladatban a 'kétszer annyi' kifejezés szerepel, 2-vel való szorzásra gondolunk.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Gondoltam egy számot, elosztottam 5-tel, hozzáadtam 7-et és 12-őt kaptam. Mi a szám?", "type": "text-input", "ans": "25"}
])

add_quiz(90, t_arany, "90. óra: Gyakorlóóra", "Matematikai szövegezésű feladatok gyakorlása, ábrakészítés, összefüggések.", [
    {"t": "Apa 4 évvel idősebb, mint Anya. Életkoruk összege 76 év. Hány éves Anya? (2x + 4 = 76 -> 2x = 72)", "type": "text-input", "ans": "36"},
    {"t": "Hány éves Apa? (36 + 4)", "type": "text-input", "ans": "40"},
    {"t": "Egy téglalap kerülete 40 cm. Hosszabbik oldala 4 cm-rel hosszabb a rövidebbnél. Hány cm a rövidebb oldal? (2*(x + x+4) = 40 -> 4x + 8 = 40)", "type": "text-input", "ans": "8"},
    {"t": "Hány cm a hosszabbik oldal? (8 + 4)", "type": "text-input", "ans": "12"},
    {"t": "A szakaszos ábrázolás nagymértékben segít a szöveges feladatok összefüggéseinek megértésében.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Három egymást követő egész szám összege 45. Mi a legkisebb szám? (x + x+1 + x+2 = 45 -> 3x + 3 = 45)", "type": "text-input", "ans": "14"},
    {"t": "A válaszmondat felírása kötelező a szöveges feladat végén.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(91, t_arany, "91. óra: Feladatmegoldás", "Hétköznapi vásárlási, méréseket és egyenleteket tartalmazó szöveges feladatok.", [
    {"t": "3 füzet és 1 toll összesen 1100 Ft-ba kerül. A toll ára 200 Ft. Hány Ft 1 füzet ára? (3x + 200 = 1100 -> 3x = 900)", "type": "text-input", "ans": "300"},
    {"t": "Peti 2000 Ft-tal ment a boltba. Vett 3 kg narancsot 500 Ft/kg áron. Hány Ft visszajárót kapott? (2000 - 1500)", "type": "text-input", "ans": "500"},
    {"t": "Egy raktárban 120 láda gyümölcs van. Az első nap elvitték a 1/3-át, a második nap a megmaradt ládák felét. Hány láda maradt? (120 - 40 = 80, 80 - 40)", "type": "text-input", "ans": "40"},
    {"t": "A mindennapi életben sok probléma modellezhető egyenlettel.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik egyenlet írja le: 'Egy szám 4-szeresénél 5-tel több a 25'? (4x + 5 = 25)", "type": "multiple-choice", "opts": [("4x + 5 = 25", True), ("x + 4 + 5 = 25", False), ("4x - 5 = 25", False), ("x / 4 + 5 = 25", False)]},
    {"t": "Mennyi a gondolt szám a 4x + 5 = 25 egyenletben?", "type": "text-input", "ans": "5"},
    {"t": "Az ellenőrzést a feladat eredeti szövegébe való behelyettesítéssel végezzük.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]}
])

add_quiz(92, t_arany, "92. óra: Több megoldás is lehet", "Több megoldást megengedő szöveges feladatok és egyenlőtlenségek vizsgálata.", [
    {"t": "Katinak legfeljebb 10 Ft-ja lehet, és páros számú forintja van. Hányféle lehetséges összege lehet természetes számokban? (0, 2, 4, 6, 8, 10)", "type": "text-input", "ans": "6"},
    {"t": "Mely kifejezés jelenti azt, hogy 'legfeljebb 5'?", "type": "multiple-choice", "opts": [("Kisebb vagy egyenlő, mint 5 (x <= 5)", True), ("Nagyobb, mint 5", False), ("Pontosan 5", False), ("Legalább 5", False)]},
    {"t": "Mely kifejezés jelenti azt, hogy 'legalább 5'?", "type": "multiple-choice", "opts": [("Nagyobb vagy egyenlő, mint 5 (x >= 5)", True), ("Kisebb, mint 5", False), ("Pontosan 5", False), ("Legfeljebb 5", False)]},
    {"t": "A 'legalább 3 és legfeljebb 6' feltételnek eleget tevő egész számok száma: 3, 4, 5, 6 (összesen 4 szám).", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Hány természetes szám megoldása van a 2 * x <= 8 egyenlőtlenségnek? (x = 0, 1, 2, 3, 4)", "type": "text-input", "ans": "5"},
    {"t": "A több megoldással rendelkező feladatoknál az összes megoldás megtalálása a cél.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Melyik legkisebb természetes szám teljesíti az x > 7 egyenlőtlenséget?", "type": "text-input", "ans": "8"}
])

add_quiz(93, t_arany, "93. óra: Létraverseny II.", "Versenyszerű feladatmegoldás páros munkában a százalék és szöveges feladatok témakörében.", [
    {"t": "Mennyi 1000 Ft-nak a 15%-a?", "type": "text-input", "ans": "150"},
    {"t": "Melyik szám teszi igazzá: 2 * x + 10 = 50?", "type": "text-input", "ans": "20"},
    {"t": "Ha 3 kg narancs 1200 Ft, mennyibe kerül 5 kg narancs?", "type": "text-input", "ans": "2000"},
    {"t": "Hány százalék felel meg a 3/5 törtnek? (3/5 = 60/100)", "type": "text-input", "ans": "60"},
    {"t": "Gondoltam egy számot, elosztottam 3-mal, hozzáadtam 4-et és 10-et kaptam. Mi a szám? ((10-4)*3)", "type": "text-input", "ans": "18"},
    {"t": "A játékos feladványok erősítik az osztály közösségét és a matematikai önbizalmat.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 400-nak a 25%-a?", "type": "text-input", "ans": "100"}
])

add_quiz(94, t_arany, "94. óra: Összefoglalás", "A fejezet fogalmainak (arány, egyenes arányosság, százalék, nyitott mondatok) összefoglalása.", [
    {"t": "Mennyi a 8 : 24 arány egyszerűsített alakja?", "type": "multiple-choice", "opts": [("1 : 3", True), ("1 : 4", False), ("2 : 3", False), ("3 : 1", False)]},
    {"t": "Hány százalék felel meg a 1/2-nek?", "type": "text-input", "ans": "50"},
    {"t": "Hány százalék felel meg a 1/5-nek?", "type": "text-input", "ans": "20"},
    {"t": "Mennyi 600 Ft-nak a 30%-a?", "type": "text-input", "ans": "180"},
    {"t": "Melyik szám teszi igazzá: 4 * x - 8 = 32? (40/4)", "type": "text-input", "ans": "10"},
    {"t": "Az egyenes arányosság grafikonja az origóból induló félegyenes.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 150-nek a 4/5 része?", "type": "text-input", "ans": "120"}
])

add_quiz(95, t_arany, "95. óra: Gyakorlóóra", "Gyakorló feladatok önállóan, becslés és ellenőrzés.", [
    {"t": "Egy 8000 Ft-os táska ára 25%-kal csökkent. Hány Ft a kedvezmény? (8000 * 0,25)", "type": "text-input", "ans": "2000"},
    {"t": "Mennyi a táska új ára? (8000 - 2000)", "type": "text-input", "ans": "6000"},
    {"t": "Melyik szám teszi igazzá: (x + 4) : 5 = 6?", "type": "text-input", "ans": "26"},
    {"t": "Ha 4 kg alma 1600 Ft, egyenes arányosság esetén 7 kg alma 2800 Ft-ba kerül.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 50-nek a 120%-a? (50 * 1,2)", "type": "text-input", "ans": "60"},
    {"t": "Az ellenőrzés mindig megnyugtató visszajelzést ad a feladat helyességéről.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 1000-nek az 1%-a?", "type": "text-input", "ans": "10"}
])

add_quiz(96, t_arany, "96. óra: Témazáró dolgozat", "Témazáró számonkérés az Arány, százalék, szöveges feladatok témakörből (10 kérdés).", [
    {"t": "1. Mennyi a 10 : 35 arány egyszerűsített alakja?", "type": "multiple-choice", "opts": [("2 : 7", True), ("1 : 35", False), ("2 : 5", False), ("5 : 7", False)]},
    {"t": "2. Ossz el 600 Ft-ot 1 : 2 arányban! Hány Ft a nagyobbik rész?", "type": "text-input", "ans": "400"},
    {"t": "3. Ha 3 kg narancs 1500 Ft, mennyibe kerül 4 kg narancs?", "type": "text-input", "ans": "2000"},
    {"t": "4. Hány százalék felel meg a 3/4 törtszámnak?", "type": "text-input", "ans": "75"},
    {"t": "5. Mennyi 4000 Ft-nak a 15%-a?", "type": "text-input", "ans": "600"},
    {"t": "6. Melyik szám teszi igazzá: 3 * x + 8 = 35?", "type": "text-input", "ans": "9"},
    {"t": "7. Gondoltam egy számot, elosztottam 2-vel, kivontam belőle 5-öt, 10-et kaptam. Mi a szám?", "type": "text-input", "ans": "30"},
    {"t": "8. Mennyi 200-nak a 4/5 része?", "type": "text-input", "ans": "160"},
    {"t": "9. Az egyenes arányosság esetén a két mennyiség hányadosa állandó.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "10. Egy 5000 Ft-os nadrág ára 10%-kal nőtt. Mennyi az új ár? (Ft-ban)", "type": "text-input", "ans": "5500"}
])

add_quiz(97, t_arany, "97. óra: Témazáró dolgozat értékelése", "A témazáró dolgozat feladatainak megbeszélése, hibajavítás és összegzés.", [
    {"t": "Mi volt a legfontosabb tapasztalat a százalékszámítási feladatoknál?", "type": "multiple-choice", "opts": [("Az 1% kiszámítása vagy a törtalakkal való szorzás biztonságos számolást ad", True), ("A százalékjel elhagyása", False), ("Mindig 100-at kell válaszolni", False), ("Nem kell kiszámolni", False)]},
    {"t": "Az arányos osztásnál az arányszámok összege adja meg a részek számát.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 2000 Ft-nak a 20%-a?", "type": "text-input", "ans": "400"},
    {"t": "Melyik szám teszi igazzá: 5 * x - 10 = 40?", "type": "text-input", "ans": "10"},
    {"t": "A hibák elemzése segít a sikeresbb jövőbeli teljesítményben.", "type": "true-false", "opts": [("Igaz", True), ("Hamis", False)]},
    {"t": "Mennyi 80-nak a 3/4 része?", "type": "text-input", "ans": "60"},
    {"t": "Hány százalék felel meg az 1/10-nek?", "type": "text-input", "ans": "10"}
])

print("Arány, százalék quizzes created (68-97).")
