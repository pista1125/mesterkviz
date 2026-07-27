INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '9f17a3eb-54a9-4b2d-ab3b-e4fd70a156c7',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '118. óra: Témazáró dolgozat',
        'Témazáró számonkérés a Mérés, arányosság és szöveges feladatok témakörből (10 kérdés).',
        'Matematika',
        '5. osztály',
        'Mérés, arányosság, szöveges feladatok',
        '[{"id": "f156f17b-f0d2-4338-83e0-2827f27d97d2", "text": "1. Hány gramm 3,5 kg?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "3500"}, {"id": "19f9b8a5-7974-43bc-8b02-c0176fd18e5a", "text": "2. Hány milliliter 6 dl?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "600"}, {"id": "d1aea927-f6a0-470a-803b-512292616853", "text": "3. Hány perc 2 óra 15 perc?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "135"}, {"id": "211acef1-dc0b-4aec-9d91-f8b3b80bca7f", "text": "4. Ha 3 kg narancs 1200 Ft, mennyibe kerül 5 kg narancs? (Ft-ban)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "2000"}, {"id": "5a64ee3d-ea8d-4623-a67f-465bac7dd01d", "text": "5. Melyik szám teszi igazzá a nyitott mondatot: 2 * x + 4 = 20?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "8"}, {"id": "4c05e935-09bc-4c17-9eb7-dc828650d6fa", "text": "6. Gondoltam egy számot, elosztottam 2-vel, kivontam belőle 3-at, 7-et kaptam. Mi a szám?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "20"}, {"id": "ca5a222d-f589-4419-b88e-251191e40dc8", "text": "7. Egy 120 oldalú könyvből Éva elolvasott 75 oldalt. Hány oldal van még hátra?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "45"}, {"id": "dc1d4648-035e-415b-a5d1-352373b82754", "text": "8. Egyenes arányosság esetén ha az egyik mennyiség felére csökken, a másik is felére csökken.", "type": "true-false", "options": [{"id": "68e4f5c3-6909-4556-a157-ab8e904f44a0", "text": "Igaz", "isCorrect": true}, {"id": "ac0c23d0-7d29-42db-8cde-44eb1e2f3115", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "a6b99213-20f0-43f5-b9ee-4cca8f8fd128", "text": "9. Hány dkg 400 g?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "40"}, {"id": "825573bf-cf0d-4c38-a6f0-d82a28fc08cf", "text": "10. Egy 4000 Ft-os táska árából 10% kedvezményt adnak. Mennyi a kedvezményes ár? (Ft-ban)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "3600"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '9ef93f61-71ab-4a25-aa25-cecf2d7ffc15',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '119. óra: Témazáró dolgozat értékelése',
        'A témazáró dolgozat megbeszélése és a tapasztalatok összegzése.',
        'Matematika',
        '5. osztály',
        'Mérés, arányosság, szöveges feladatok',
        '[{"id": "59356155-088a-4d44-8ed9-dc8911dd61b1", "text": "Melyik lépés a legfontosabb a szöveges feladatok megoldása során?", "type": "multiple-choice", "options": [{"id": "337c9d15-033e-4298-b8d4-4059f7cfeb8a", "text": "A szöveg pontos értelmezése és az adatok kigyűjtése", "isCorrect": true}, {"id": "d82ad01d-959f-4998-b09d-7752510a3ab9", "text": "Gyors fejszámolás", "isCorrect": false}, {"id": "38024794-8c77-4008-b245-59a8568fedfb", "text": "Csak az eredmény leírása", "isCorrect": false}, {"id": "b43cd00a-bb56-4e47-bd61-c3d6ed7d721a", "text": "A válasz elhagyása", "isCorrect": false}], "timeLimit": 15}, {"id": "e5bfa34d-4230-47a3-8d62-526aa49f2ff9", "text": "Az mértékegység-átváltási hibák elkerülhetők a váltószámok pontos ismeretével.", "type": "true-false", "options": [{"id": "b19c6560-d6f0-469c-af64-38b6e1e6a3a8", "text": "Igaz", "isCorrect": true}, {"id": "1a233e14-99f4-42b8-bb7e-cdd1988bf6c0", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "5e41a32d-ceb1-4686-b2b8-0ef227585592", "text": "Mennyi 1 tonna kilogrammban?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "1000"}, {"id": "c364354a-acd4-4798-b178-e338870d9983", "text": "Egyenes arányosságnál a hányados állandó értéket ad.", "type": "true-false", "options": [{"id": "7b8d3546-ea26-4478-a90f-3a71042452b1", "text": "Igaz", "isCorrect": true}, {"id": "c9648779-0a60-4924-bfd7-5d1ffe8d0a47", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "214f68f1-9acb-4b17-93c3-0d818249d5d0", "text": "Hány perc 1 nap negyede (6 óra)?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "360"}, {"id": "85ff1310-ec9b-484f-94c5-5dcec54671fc", "text": "A dolgozatok javításakor a hibák elemzése segíti a további fejlődést.", "type": "true-false", "options": [{"id": "f5228bf9-10e3-415c-a30a-15eff8899f40", "text": "Igaz", "isCorrect": true}, {"id": "c49b345c-a00d-4dc2-a66c-cb5d241fafb8", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "f299c7f8-fd82-48b0-af38-d872f496488a", "text": "Az egyenletek/nyitott mondatok ellenőrzése során a behelyettesítés elengedhetetlen.", "type": "true-false", "options": [{"id": "479eba1e-0e06-4964-bf1c-70acbf9cafa3", "text": "Igaz", "isCorrect": true}, {"id": "1ab56203-5b6d-4743-9434-6f94360f0907", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '39de8549-8311-4d9f-95d9-f776d03158b2',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '120. óra: Játékok',
        'Matematikai játékok, valószínűségi megfigyelések, kooperáció.',
        'Matematika',
        '5. osztály',
        'Adatgyűjtés, statisztika',
        '[{"id": "5078110e-11c7-4acc-b664-57c0620b6c1c", "text": "Egy szabályos feldobott pénzérménél mekkora az esélye annak, hogy fejet kapunk?", "type": "multiple-choice", "options": [{"id": "0a4bde72-93ef-422e-9f62-436e0741cd6a", "text": "50% (1 a 2-ből)", "isCorrect": true}, {"id": "6ca88078-c671-4179-9a4c-30e786356819", "text": "100%", "isCorrect": false}, {"id": "a5321f31-6a3b-4a82-aad8-e9609549aa51", "text": "0%", "isCorrect": false}, {"id": "6f4e1e3a-4448-448c-981f-3e212668b3ce", "text": "25%", "isCorrect": false}], "timeLimit": 15}, {"id": "4bf1fc2f-237f-4f90-8b82-cfd62e4298ab", "text": "Egy szabályos dobókockával 1 és 6 közötti egész számot dobhatunk.", "type": "true-false", "options": [{"id": "b73c1ce4-3b37-40db-8009-0315537593e8", "text": "Igaz", "isCorrect": true}, {"id": "dd4eff8a-8ec8-4e80-877c-9bdca08d2fd8", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "b6a47ecc-b8e9-4479-9c68-7f52b8200677", "text": "Hány lapja van egy hagyományos dobókockának?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "6"}, {"id": "b6d85244-c9de-4148-92c8-f753e8d2eaa4", "text": "A matematikai játékokban a tapasztalatgyűjtés segít a valószínűségi szabályok megértésében.", "type": "true-false", "options": [{"id": "a4afa339-3316-4ad3-9bc5-ea3fddbf6e13", "text": "Igaz", "isCorrect": true}, {"id": "ded9b249-688a-4469-b48f-e940dbb1fa7a", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "d057bf2a-c5e2-48fb-b83f-589cd9266796", "text": "Melyik számot LEHETETLEN dobni egyetlen normál dobókockával?", "type": "multiple-choice", "options": [{"id": "690fd79f-3605-47e9-a189-9da35353d940", "text": "7", "isCorrect": true}, {"id": "58440a6e-f7a6-44a2-8ae0-020489894ef6", "text": "1", "isCorrect": false}, {"id": "43f96f99-17ea-478d-914c-92dfee35f060", "text": "4", "isCorrect": false}, {"id": "9c6c0b5e-2f3e-43a1-90d7-2de7460ee51e", "text": "6", "isCorrect": false}], "timeLimit": 15}, {"id": "f19c2234-8d37-4ac9-81bd-94d9567d4eb8", "text": "Sok kísérlet elvégzése során a relatív gyakoriság megközelíti az elméleti valószínűséget.", "type": "true-false", "options": [{"id": "cbea4c9a-e91c-4432-a248-dba493f289fe", "text": "Igaz", "isCorrect": true}, {"id": "42f98e52-9c23-4c77-aa98-3ab3a3286645", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "777b28c5-46d4-4660-b8c1-3bf2900250a8", "text": "Hányféle kimenetele lehet egy pénzérme feldobásának (fej vagy írás)?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "2"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'fc0df4ac-6969-4baf-9c1f-7f4df673c0a8',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '121. óra: Adatgyűjtés, adatok ábrázolása',
        'Adatok gyűjtése, rendezése, táblázat, oszlopdiagram és kördiagram.',
        'Matematika',
        '5. osztály',
        'Adatgyűjtés, statisztika',
        '[{"id": "18fc0f10-6f40-45a2-8d61-913603244e02", "text": "Mi az oszlopdiagram fő szerepe?", "type": "multiple-choice", "options": [{"id": "d79f8a64-0db9-4053-bbd2-f9f214fcae3c", "text": "Különböző adatok mennyiségének szemléletes összehasonlítása oszlopok magasságával", "isCorrect": true}, {"id": "3fa79ccc-74c8-4876-861c-b27b8282314e", "text": "Körök rajzolása", "isCorrect": false}, {"id": "6f92a4e4-51f8-44a7-acb1-0f1c2e9792a4", "text": "Számok összeadása", "isCorrect": false}, {"id": "bfc3954b-d86a-4ab5-9591-cf8fbcfefe4e", "text": "Szöveg fordítása", "isCorrect": false}], "timeLimit": 15}, {"id": "931d99a1-3962-49fc-9b20-5395789cfbac", "text": "A táblázat segítségével az adatokat áttekinthető soraiban és oszlopaiban rendszerezhetjük.", "type": "true-false", "options": [{"id": "85c0632a-adab-4462-a172-9b87cff5dc28", "text": "Igaz", "isCorrect": true}, {"id": "736f1a33-5053-4448-aa69-6a2adb848f83", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "a8e10f12-e94a-4594-9a4a-9e2aef20fd3f", "text": "Ha az oszlopdiagramon 1 gombócos magasság 5 tanulót jelent, hány tanulót jelent a 4 gombóc magas oszlop?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "20"}, {"id": "6410ee7a-11a5-4e5a-8090-be60fb3c0b84", "text": "A kördiagram a részek egészhez viszonyított arányát mutatja jól.", "type": "true-false", "options": [{"id": "30312846-13ac-4738-8a3c-cbead20f0bd5", "text": "Igaz", "isCorrect": true}, {"id": "bda07c5e-b63c-4fc8-9856-ce53ef85b201", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "c52bcf26-f6eb-4190-b814-f30a61e20035", "text": "Az adatok gyűjtése történhet méréssel, megfigyeléssel vagy kérdőívvel.", "type": "true-false", "options": [{"id": "1c053c11-bce2-4041-afce-972d3312d515", "text": "Igaz", "isCorrect": true}, {"id": "1c740f9d-d044-4305-8408-106c85268a6a", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "cb4397ad-7d2d-4ec8-9871-ac1c14cf78a8", "text": "Melyik diagramtípus alkalmas a legjobban időbeli változások (pl. hőmérséklet alakulása) ábrázolására?", "type": "multiple-choice", "options": [{"id": "3b6e5f9f-c12e-478f-a0b1-f2e2ff73bd26", "text": "Vonaldiagram (grafikon)", "isCorrect": true}, {"id": "847f2d4a-09b0-422d-abd2-c5ec735ddc10", "text": "Kördiagram", "isCorrect": false}, {"id": "838e90e5-a5b0-4f42-b4cc-47e1d4e3598f", "text": "Oszlopdiagram", "isCorrect": false}, {"id": "bee39044-0f81-4c9f-a8e8-e8993f1d6f6c", "text": "Képrejtvény", "isCorrect": false}], "timeLimit": 15}, {"id": "2f17d0e7-a6b8-4e6f-bf11-11022ed73ec7", "text": "A diagramok tengelyein a mértékegységet és a beosztást mindig jelölni kell.", "type": "true-false", "options": [{"id": "ba82b794-7555-4414-ab08-c6939523caa0", "text": "Igaz", "isCorrect": true}, {"id": "02b137ed-e9e2-4c42-b4f0-5c9560c75b9d", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '052a858a-448e-4b22-a09a-5a67f3a288de',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '122. óra: Adatgyűjtés, adatok ábrázolása II.',
        'Táblázatok és grafikonok értelmezése digitális eszközök segítségével.',
        'Matematika',
        '5. osztály',
        'Adatgyűjtés, statisztika',
        '[{"id": "193cc8a0-fdad-48b0-93c1-dcbc4610906c", "text": "Mire szolgál a táblázatkezelő program (pl. Excel, Google Táblázatok)?", "type": "multiple-choice", "options": [{"id": "acefb4cd-bc03-4f3c-9643-34fe0a69f966", "text": "Adatok rendezésére, számítások elvégzésére és automatikus diagramkészítésre", "isCorrect": true}, {"id": "98132889-ede6-4795-8d5a-af0f93ea05eb", "text": "Videószerkesztésre", "isCorrect": false}, {"id": "30ada156-f7ae-4962-a44f-8c2f392678a0", "text": "Zeneszerzésre", "isCorrect": false}, {"id": "d4853538-b6a9-432c-9754-d9f7795faf0b", "text": "Böngészésre", "isCorrect": false}], "timeLimit": 15}, {"id": "dba20eec-519f-4972-a12d-3481db64c32c", "text": "Egy grafikonról leolvasható a legmagasabb (maximum) és legkisebb (minimum) érték is.", "type": "true-false", "options": [{"id": "57ab73ab-e9c5-4432-bf90-46e91aadadc7", "text": "Igaz", "isCorrect": true}, {"id": "b030430a-35b9-4787-adb6-f30bedc65717", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "05b2ad4e-b2b0-4b8f-93be-929b810aa40d", "text": "Ha a hétfői hőmérséklet 15°C, a keddi 18°C, a szerdai 21°C, mennyi volt a legmagasabb hőmérséklet? (°C-ban)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "21"}, {"id": "4e799d12-c467-468e-a126-8339f4c075e5", "text": "A statisztikai adatok hibás ábrázolása félrevezető lehet.", "type": "true-false", "options": [{"id": "aa5f4d57-44f9-4288-99b8-17e01f58e3a4", "text": "Igaz", "isCorrect": true}, {"id": "1476aa9e-d249-4f1a-9409-eb6b61f9b501", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "121d63ad-2e94-4afe-b249-7aae6e20affc", "text": "Hány nap hőmérsékletét mértük, ha a táblázatban 7 adatsor szerepel?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "7"}, {"id": "b11ed214-4eb8-4550-81fc-d77fd46b54a9", "text": "A digitális diagramok gyorsan frissülnek az adatváltozás hatására.", "type": "true-false", "options": [{"id": "93d4f6b7-6fdf-4ed0-b38e-d8d889f195f4", "text": "Igaz", "isCorrect": true}, {"id": "cd7abb00-5386-4e64-9d64-73e05269c23e", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "fe9543f3-665d-4a29-93f2-de4c9c006456", "text": "A statisztika a mindennapokban (pl. időjárás-előrejelzés, sporteredmények) elengedhetetlen.", "type": "true-false", "options": [{"id": "e6645b54-9e5d-4225-9460-3dd05b89bb93", "text": "Igaz", "isCorrect": true}, {"id": "d3931090-dd17-41ac-975e-77b05f19e9c3", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '11d2b82a-2db9-4f07-a397-170ae3c03a0b',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '123. óra: Átlag és tulajdonságai',
        'Két vagy több szám számtani közepe (átlag) és kiszámítása.',
        'Matematika',
        '5. osztály',
        'Adatgyűjtés, statisztika',
        '[{"id": "7b189555-faee-4e3e-acf7-6df675fcf122", "text": "Hogyan számítjuk ki több szám számtani középértékét (átlagát)?", "type": "multiple-choice", "options": [{"id": "361280ad-b017-4386-93f8-8a642639c05b", "text": "Összeadjuk a számokat, majd az összeget elosztjuk a számok darabszámával", "isCorrect": true}, {"id": "df984a4e-bdc2-4ab9-8acb-caf2fa3a025b", "text": "Megszorozzuk a számokat egymással", "isCorrect": false}, {"id": "7b8c7c2b-4bc4-456c-8a47-cb60458e4aab", "text": "Kivonjuk a legkisebbet a legnagyobból", "isCorrect": false}, {"id": "4ecfc1d6-ecbf-4d93-bc94-28fdab1b18f8", "text": "Kiválasztjuk a középsőt", "isCorrect": false}], "timeLimit": 15}, {"id": "439c7a30-0c67-4e08-9969-1916f2e94a80", "text": "Mennyi a 4 és a 8 számtani közepe (átlaga)? ( (4+8)/2 )", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "6"}, {"id": "4d9b0616-53d5-46f6-87d0-047b510c1516", "text": "Mennyi a 10, 20 és 30 számok átlaga? ( (10+20+30)/3 )", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "20"}, {"id": "45e801a5-5e86-47c4-a86b-b4c9435ad416", "text": "Egy tanuló osztályzatai: 5, 4, 5, 4. Mennyi a tanulmányi átlaga? (18 / 4)", "type": "multiple-choice", "options": [{"id": "c4a25f85-a0ab-443e-8664-1c07456726f3", "text": "4,5", "isCorrect": true}, {"id": "249bdbe5-44b1-49a8-b53f-0897a91003ce", "text": "4,0", "isCorrect": false}, {"id": "c4135679-c4ea-4d1b-8dc9-025eed29f24c", "text": "5,0", "isCorrect": false}, {"id": "b98afb3a-465a-45fa-b08b-d4500148ddaf", "text": "4,2", "isCorrect": false}], "timeLimit": 15}, {"id": "8e916531-70ce-45ec-b9ca-7a7c1916f283", "text": "Az átlag mindig a legkisebb és a legnagyobb adat értéke közé esik.", "type": "true-false", "options": [{"id": "df6d5516-d7a5-4c74-bc71-3294d731bdcb", "text": "Igaz", "isCorrect": true}, {"id": "d314e3e5-6ac5-4332-a6e8-73905f8935d1", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "ec1b6c80-3264-439e-867a-3f098c9c98c6", "text": "Mennyi a 2, 4, 6, 8 számok átlaga? (20 / 4)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "5"}, {"id": "2118c3e4-e3f6-4f2f-8ab1-3172b14c43e3", "text": "Ha minden adathoz hozzáadunk 2-t, az átlag értéke is 2-vel nő.", "type": "true-false", "options": [{"id": "431a31cd-8a16-4dc9-ae6c-a84b19c85f39", "text": "Igaz", "isCorrect": true}, {"id": "b47d3ead-b04d-4d4b-b0fc-c3224eed93ed", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '61dd8c2c-0cfc-45c4-9c06-24aebf54c86e',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '124. óra: Lehetetlen, lehetséges, biztos',
        'Események valószínűsége: biztos, lehetséges, lehetetlen események.',
        'Matematika',
        '5. osztály',
        'Adatgyűjtés, statisztika',
        '[{"id": "911d56d9-d9f5-4bd4-8537-9f0b135364b8", "text": "Milyen esemény az, hogy ''Holnap felkel a Nap''?", "type": "multiple-choice", "options": [{"id": "ce129516-1b7b-41e5-8ebf-12f4e015ac24", "text": "Biztos esemény", "isCorrect": true}, {"id": "3d462722-6c40-4fdc-97b1-bc182fac37cd", "text": "Lehetetlen esemény", "isCorrect": false}, {"id": "dac0f471-3534-4d95-8c8a-1180e2e57234", "text": "Véletlen esemény", "isCorrect": false}, {"id": "52f09f75-6878-4d9e-b28f-91b53775c165", "text": "Hamis esemény", "isCorrect": false}], "timeLimit": 15}, {"id": "00856b71-285c-406f-9ef5-950a17bc8eb7", "text": "Milyen esemény az, hogy ''Egy dobókockával 8-ast dobunk''?", "type": "multiple-choice", "options": [{"id": "198ac5aa-be4a-48f9-941e-dd83845cd0e1", "text": "Lehetetlen esemény", "isCorrect": true}, {"id": "b3f8d22a-82fe-424c-be3b-5a0c82cb4c64", "text": "Biztos esemény", "isCorrect": false}, {"id": "86a70668-e020-4923-aa99-56380091f168", "text": "Lehetséges esemény", "isCorrect": false}, {"id": "de9d06a0-1944-473b-82e5-cb7495c2b7fb", "text": "Döntetlen esemény", "isCorrect": false}], "timeLimit": 15}, {"id": "17691575-7c40-4b68-9acc-9c580d0cd8ce", "text": "Milyen esemény az, hogy ''Egy feldobott érmével fejet dobunk''?", "type": "multiple-choice", "options": [{"id": "70195cca-fe61-4908-8a4b-3b24e5e80c8f", "text": "Lehetséges (de nem biztos) esemény", "isCorrect": true}, {"id": "4b33e373-9486-4252-837e-adacd95e2910", "text": "Biztos esemény", "isCorrect": false}, {"id": "32bdbf96-3cd5-4a79-ba5c-9ae13aa8050d", "text": "Lehetetlen esemény", "isCorrect": false}, {"id": "4e206925-4a53-48e0-a613-0521ff2ce44b", "text": "Kizárt esemény", "isCorrect": false}], "timeLimit": 15}, {"id": "401f0cc4-79c1-4940-8009-fb731763dd77", "text": "A lehetetlen esemény bekövetkezésének esélye 0%.", "type": "true-false", "options": [{"id": "36dabb1b-11a7-4e9a-abb6-ddbfd1c43b0a", "text": "Igaz", "isCorrect": true}, {"id": "3bc44119-d3f5-4ba5-8ddb-e1dd04ceee5f", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "c35eaba4-2473-48d3-a674-4dc4838bfd3a", "text": "A biztos esemény bekövetkezésének esélye 100%.", "type": "true-false", "options": [{"id": "85b58b05-b0cd-450f-b8e5-27c11f81b489", "text": "Igaz", "isCorrect": true}, {"id": "31275912-b9e2-4915-8780-5a2851af3959", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "dca464ca-9451-4505-9a44-1a3e59a0e48f", "text": "Egy kalapban 5 piros golyó van. Milyen esemény pirosat húzni?", "type": "multiple-choice", "options": [{"id": "300436b9-30ce-4091-a09d-41eabe36b2c0", "text": "Biztos esemény", "isCorrect": true}, {"id": "5a1c9216-990c-4563-9014-f95617b23211", "text": "Lehetetlen esemény", "isCorrect": false}, {"id": "c61b25d9-44f1-40b5-9f00-93757b26171e", "text": "Lehetséges, de nem biztos", "isCorrect": false}, {"id": "5e0d56f1-790e-4644-aa72-77f371e2f7ee", "text": "Véletlen", "isCorrect": false}], "timeLimit": 15}, {"id": "5ea1ceb8-b5ff-40cb-8386-0cdff78e66a4", "text": "Egy kalapban 3 piros és 3 kék golyó van. Ugyanannyi az esélye kék golyót húzni, mint pirosat.", "type": "true-false", "options": [{"id": "8ad29167-2d4e-4c26-9e3c-69b0dd531f7b", "text": "Igaz", "isCorrect": true}, {"id": "416431d2-499c-4e9d-8947-7a941ac46bbc", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '7ac7a1a1-b13a-4934-805a-a74946f99cef',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '125. óra: Összefoglalás',
        'Összefoglaló ismétlés: adatok, táblázatok, diagramok, átlag és valószínűség.',
        'Matematika',
        '5. osztály',
        'Adatgyűjtés, statisztika',
        '[{"id": "a72b4628-e1f3-4883-8fa2-317ad505e6fd", "text": "Mennyi a 6, 8, 10 számok átlaga?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "8"}, {"id": "0fa0364a-bdc4-453b-ae28-13ed9d632eae", "text": "Melyik esemény lehetetlen egy normál dobókockával?", "type": "multiple-choice", "options": [{"id": "4811aef3-2f8d-4b51-8275-def73f23e680", "text": "0-t dobni", "isCorrect": true}, {"id": "bb838436-648d-4505-a96d-a7b797e2e0b7", "text": "1-est dobni", "isCorrect": false}, {"id": "1866e275-f0eb-444a-9715-955ee9166642", "text": "6-ost dobni", "isCorrect": false}, {"id": "4cdd4451-84b8-4703-86bf-fa9fc56e7783", "text": "Páros számot dobni", "isCorrect": false}], "timeLimit": 15}, {"id": "9d72cbb4-0f4c-43ac-88aa-1cc47a4e3a01", "text": "Az adatok átlagának kiszámításához ismerni kell az adatok összegét és darabszámát.", "type": "true-false", "options": [{"id": "45b89a72-6aa8-42d1-9c1b-47d62315936a", "text": "Igaz", "isCorrect": true}, {"id": "e58d765e-d618-4d03-bb9d-a11632323aa5", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "d792ccfc-3ebc-4265-84bf-624022489536", "text": "Mennyi a 15 és 25 számtani közepe?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "20"}, {"id": "2e432ed4-70fd-49bc-bae4-9b22f075c206", "text": "Az oszlopdiagramon az oszlopok magassága egyenesen arányos a mért értékkel.", "type": "true-false", "options": [{"id": "6822f5b9-dad9-452a-985e-43f294ed11b4", "text": "Igaz", "isCorrect": true}, {"id": "cbaa0888-3b1c-4786-91da-a738a4a8ecb0", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "a7d288c2-299a-417e-80b5-86440fd94729", "text": "Ha a piros golyó húzásának esélye 1/2, az megegyezik 50%-os valószínűséggel.", "type": "true-false", "options": [{"id": "bf00f394-6112-4dad-b814-91d9a9f72129", "text": "Igaz", "isCorrect": true}, {"id": "58824b1c-476f-46eb-af87-4ceb127037ba", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "ed4e85bc-1f4c-41c5-a7be-d8ba4bd35ab5", "text": "Mennyi a 1, 2, 3, 4, 5 számok átlaga? (15 / 5)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "3"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'f9ab6221-0828-4f48-af8b-51e7bf392147',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '126. óra: Számonkérés',
        'Számonkérés az Adatgyűjtés és Statisztika témakörből (10 kérdés).',
        'Matematika',
        '5. osztály',
        'Adatgyűjtés, statisztika',
        '[{"id": "2b061d65-387c-4dd3-9bbf-a410826d6a6b", "text": "1. Mennyi a 8 és 12 számtani közepe (átlaga)?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "10"}, {"id": "07badf05-ea80-48c1-8e62-7914626c35d5", "text": "2. Mennyi a 3, 6, 9 számok átlaga?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "6"}, {"id": "156186ad-9e3c-45b2-88f9-e1c93b43361f", "text": "3. Milyen esemény az, hogy egy dobókockával páros számot dobunk?", "type": "multiple-choice", "options": [{"id": "10aed5a6-f841-4b61-9dcb-b60e8ccc4f39", "text": "Lehetséges, de nem biztos", "isCorrect": true}, {"id": "65b09a7b-a69c-4975-a243-ced555056eb0", "text": "Biztos esemény", "isCorrect": false}, {"id": "48f2b9ad-921b-44c6-aff2-887fcc4358a0", "text": "Lehetetlen esemény", "isCorrect": false}, {"id": "1d64648c-44a4-4d0f-b8b1-c312c1551774", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "67af4366-3d21-4222-9723-8f1dec182240", "text": "4. Milyen esemény az, hogy egy héten 7 nap van?", "type": "multiple-choice", "options": [{"id": "bd4a119c-76f3-40cc-8593-4f5a751b90d9", "text": "Biztos esemény", "isCorrect": true}, {"id": "f6575d21-a9e3-46de-8856-7fed6a30d5d1", "text": "Lehetetlen esemény", "isCorrect": false}, {"id": "f146ae42-7e39-4920-bfa5-14417911593d", "text": "Lehetséges", "isCorrect": false}, {"id": "95414fa1-25ba-43dd-9785-f2a0e404c176", "text": "Kizárt", "isCorrect": false}], "timeLimit": 15}, {"id": "7a128cf4-1cee-4f33-a086-8dbf926e4d5b", "text": "5. Hány kimenetele lehet egy 6 oldalú dobókocka eldobásának?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "6"}, {"id": "8253f7b2-f67e-48eb-96a7-ac20a3f30c9c", "text": "6. A kördiagram a teljes egész (100%) részeinek megoszlását szemlélteti.", "type": "true-false", "options": [{"id": "8b653b0b-a489-4c82-98ef-61d7636035cb", "text": "Igaz", "isCorrect": true}, {"id": "60d9c0ce-e090-4319-8554-f07cd2b138a7", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "beaf7e1f-5f00-41e7-b86f-07556b098315", "text": "7. Mennyi az 5, 5, 5, 5 számok átlaga?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "5"}, {"id": "c95a611e-b6de-4d7a-8abf-b55eafb1fd45", "text": "8. Ha egy zsákban csak kék golyók vannak, a piros húzása lehetetlen esemény.", "type": "true-false", "options": [{"id": "86baa9cf-7353-4015-bf9f-d25fae731643", "text": "Igaz", "isCorrect": true}, {"id": "51ef8651-955e-4860-b078-a575713a25f7", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "7f748949-ddce-4759-a4df-3ec24c2b97f7", "text": "9. Mennyi a 20 és 40 átlaga?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "30"}, {"id": "270a02c7-2855-4b97-bcdf-b8f31f2163b4", "text": "10. Az adatok rendezése táblázatba segíti az áttekinthetőséget.", "type": "true-false", "options": [{"id": "99f5520d-8a76-44d0-b5eb-6fea12403da4", "text": "Igaz", "isCorrect": true}, {"id": "4723156c-3401-4654-9d1f-11e62f9513dd", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '4ba4df47-2618-4f67-970d-0ecd46e6006b',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '127. óra: A számonkérés értékelése',
        'A számonkérés és adatelemzési feladatok megbeszélése.',
        'Matematika',
        '5. osztály',
        'Adatgyűjtés, statisztika',
        '[{"id": "32dc023c-b760-4513-9fb6-230d8cf169f4", "text": "Mi a leggyakoribb hiba az átlagszámítás során?", "type": "multiple-choice", "options": [{"id": "a54636a0-a0a8-4edf-a941-16049069893e", "text": "Az elosztás elfelejtése a darabszámmal az összeadás után", "isCorrect": true}, {"id": "ce43f294-c094-4ac4-a70f-06261a4bb660", "text": "A számok összeadása", "isCorrect": false}, {"id": "8f32e412-acc6-47cd-8b04-d9795a07fb17", "text": "A számok leírása", "isCorrect": false}, {"id": "4ce329df-6a35-4147-8005-96a63a82fb68", "text": "A válasz megadása", "isCorrect": false}], "timeLimit": 15}, {"id": "e4e79713-8fa6-44b8-8e9b-71b2b697ac52", "text": "A statisztikai elemzéseknél fontos az pontos adatgyűjtés.", "type": "true-false", "options": [{"id": "545bc190-b82c-4e1e-b8e6-e7c1381e28a5", "text": "Igaz", "isCorrect": true}, {"id": "3287ffaa-2fb2-4ee2-b265-1364d91c346f", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "fcf949dd-de2a-4232-ad8a-ca4af37db3e9", "text": "Mennyi a 0 és 100 számtani közepe?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "50"}, {"id": "acc8f062-0f12-4dfa-9e62-ed9d8110b2e6", "text": "A valószínűségi kísérletek eredményei változhatnak, de hosszú távon szabályszerűséget mutatnak.", "type": "true-false", "options": [{"id": "76f93f40-776a-49f5-8ed1-75f7923cb225", "text": "Igaz", "isCorrect": true}, {"id": "2b40f4b4-cd1d-4fe6-9e6b-966d51b8c88c", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "4876a749-1107-412a-b516-871cd2a7e326", "text": "A diagramok olvasásakor mindig ügyelni kell a tengelyek beosztására.", "type": "true-false", "options": [{"id": "2c394ca5-97fd-417e-8916-ec90af0c9aaf", "text": "Igaz", "isCorrect": true}, {"id": "702d1fdd-63f7-43f5-8fae-d59a69d37bcc", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "660470aa-3f28-4c33-a4df-7929f62cc40b", "text": "Hány százalék a biztos esemény bekövetkezésének valószínűsége?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "100"}, {"id": "460e17f7-6fc6-48f6-81e5-dac8dda2950a", "text": "Az éves statisztikai munkák értékelése hozzájárul a logikus gondolkodás fejlesztéséhez.", "type": "true-false", "options": [{"id": "5b8ec7cd-4466-4e3e-9aef-7a64d0cb0d89", "text": "Igaz", "isCorrect": true}, {"id": "d1a3e2d9-ea2b-4d36-beba-2d79e4364d84", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );