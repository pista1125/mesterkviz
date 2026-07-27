INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '6c96c1df-114b-481d-8c39-c4902bf24283',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '108. óra: Egyenes arányosság',
        'Egyenes arányosság tulajdonságai és felismerése hétköznapi példákon.',
        'Matematika',
        '5. osztály',
        'Mérés, arányosság, szöveges feladatok',
        '[{"id": "0ff629c7-8105-49d8-9dd4-f40db73b0ed8", "text": "Mi az egyenes arányosság lényege?", "type": "multiple-choice", "options": [{"id": "d5e4ea56-f9c1-4e06-847b-81b18288611e", "text": "Ha az egyik mennyiség hányszorosára változik, a másik mennyiség is ugyanannyiszorosára változik", "isCorrect": true}, {"id": "efac3646-4424-433e-a213-2ef9e8574cbf", "text": "Ha az egyik nő, a másik csökken", "isCorrect": false}, {"id": "127376dd-fe71-4dfb-94df-8f91f0d2825d", "text": "Az egyik mennyiség mindig 0", "isCorrect": false}, {"id": "41b3f58a-46f3-42e5-bf55-9d9ccd754591", "text": "A két mennyiség összege mindig 100", "isCorrect": false}], "timeLimit": 15}, {"id": "b7b1e143-c87e-44c7-a5f6-7822dacc6473", "text": "Egyenes arányosság esetén a két összetartozó mennyiség hányadosa állandó.", "type": "true-false", "options": [{"id": "a73ba914-fe63-4e6c-bef5-8654d3a7aabc", "text": "Igaz", "isCorrect": true}, {"id": "0c617104-457a-4fc9-8c11-8ed2de9cce8c", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "0dca918e-666f-43d5-a642-01a21ea7765b", "text": "Ha 2 kg narancs 1200 Ft, mennyibe kerül 6 kg narancs? (Ft-ban)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "3600"}, {"id": "1b5f0336-1656-40a8-8812-d3a3ba979789", "text": "Ha 5 munkás 10 óra alatt végez el egy munkát, akkor 10 munkás kétszer annyi idő alatt végez.", "type": "true-false", "options": [{"id": "790fea0d-984f-4e55-bfb1-ff19f2d2495c", "text": "Igaz", "isCorrect": false}, {"id": "c51bcd20-3dbc-4400-a436-748443ddc397", "text": "Hamis (ez fordított arányosság lenne, kevesebb idő kell)", "isCorrect": true}], "timeLimit": 15}, {"id": "eb7b6b7b-7a15-4a1d-a4a0-c761d3be6ec7", "text": "Ha 1 m szalag ára 150 Ft, mekkora a 4 m szalag ára? (Ft-ban)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "600"}, {"id": "a7528214-bf9b-4061-9ec7-67d7825a3db9", "text": "Melyik pár között van egyenes arányosság?", "type": "multiple-choice", "options": [{"id": "9d3d969c-bc60-497e-96fe-baa701362dd1", "text": "Az azonos fajtájú áru tömege és ára", "isCorrect": true}, {"id": "27773b74-fd78-48b2-85e0-3630c8b3d04f", "text": "Az ember életkora és magassága 50 év felett", "isCorrect": false}, {"id": "e0315b68-6a74-490f-a499-437412ed4fac", "text": "A téglalap két szomszédos oldala fix területnél", "isCorrect": false}, {"id": "48114980-53ab-4bee-b880-0e99316d499c", "text": "A tanulás ideje és a cipőméret", "isCorrect": false}], "timeLimit": 15}, {"id": "a3ee75b0-0eec-4dde-b91b-6edf05a99fc9", "text": "Az egyenes arányosság grafikonja a koordináta-rendszer origójából induló félegyenes.", "type": "true-false", "options": [{"id": "a86de770-161b-49df-ab14-0bf5cc7ed0f5", "text": "Igaz", "isCorrect": true}, {"id": "f8ba15da-012a-414e-97b4-fc4cce457257", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '54e07a3d-d2d3-4ebc-a425-0bbc068c17ad',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '109. óra: Egyenes arányossággal kapcsolatos feladatok',
        'Egyenes arányosság alkalmazása feladatok megoldásában.',
        'Matematika',
        '5. osztály',
        'Mérés, arányosság, szöveges feladatok',
        '[{"id": "d0352f83-5ab8-4014-bab7-cf5aeadd6d2b", "text": "Egy recept 4 személyre 20 dkg lisztet ír elő. Hány dkg liszt kell 8 személyre?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "40"}, {"id": "dfc209c9-2d16-48ff-a75f-bfbf5429ded9", "text": "Ha 3 liter üdítő 1500 Ft, mennyibe kerül 5 liter üdítő? (Ft-ban)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "2500"}, {"id": "d644ca52-da41-4d0a-9075-6acdd4e29bd0", "text": "Egy autó 100 km-en 6 liter benzint fogyaszt. Hány litert fogyaszt 300 km-en?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "18"}, {"id": "32d157f5-1c39-4b7b-897a-8112e272e00d", "text": "Ha a mennyiséget megkétszerezzük, az egyenes arányos párja is megkétszereződik.", "type": "true-false", "options": [{"id": "cbb4007e-7e65-40b5-b6e2-f7e00f6705cd", "text": "Igaz", "isCorrect": true}, {"id": "fb1454f5-8183-4e6d-a4f8-aac2fe059e98", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "4c039846-6059-4b81-8775-b4d205ea63f3", "text": "Ha 10 füzet 3000 Ft, mennyi 1 füzet ára? (Ft-ban)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "300"}, {"id": "f879e406-6270-4362-9018-723cdb2b7dfa", "text": "Az egységár kiszámítása megkönnyíti az tetszőleges mennyiség árának meghatározását.", "type": "true-false", "options": [{"id": "4384dbcc-eea3-4069-ac64-1fbc1dfc5319", "text": "Igaz", "isCorrect": true}, {"id": "4b651eef-f933-4df4-896e-90d2b091a21e", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "97560f12-34e2-4202-995e-ebb0867688bd", "text": "Ha 5 kg alma 2000 Ft, akkor 2,5 kg alma 1000 Ft-ba kerül.", "type": "true-false", "options": [{"id": "ecb1d9bb-8640-453c-b668-25a2c3ae57ba", "text": "Igaz (fele annyi tömeg = fele annyi ár)", "isCorrect": true}, {"id": "8d693d56-27f6-4bc8-898d-3e95c7745f5c", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '4e4b29f9-8ef7-499c-a3c9-31b620192f9b',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '110. óra: Nyitott mondatok',
        'Nyitott mondat, alaphalmaz, igazsághalmaz fogalma.',
        'Matematika',
        '5. osztály',
        'Mérés, arányosság, szöveges feladatok',
        '[{"id": "bbcd1836-6f8e-458c-af48-2f385a85c2ed", "text": "Mit nevezünk nyitott mondatnak a matematikában?", "type": "multiple-choice", "options": [{"id": "acd383be-b550-49be-86a1-dfb8f8bfd069", "text": "Olyan egyenletet/egyentőtlenséget, amelyben ismeretlen változó szerepel", "isCorrect": true}, {"id": "b30a336a-85da-4a77-891e-df7bcb1d4414", "text": "Olyan mondatot, amit nem fejeztünk be", "isCorrect": false}, {"id": "544db9c7-55bb-42ed-8f96-88ef859a3633", "text": "Olyan kijelentést, ami mindig igaz", "isCorrect": false}, {"id": "ccc4d664-a1c9-4a5d-aef1-7732ba011d12", "text": "Geometriai rajzot", "isCorrect": false}], "timeLimit": 15}, {"id": "ada3840a-8a66-4688-85e4-5a2160145068", "text": "Mit jelent az alaphalmaz?", "type": "multiple-choice", "options": [{"id": "7ddfdde9-077c-44e1-8e5a-326637e08629", "text": "Azt a halmazt, amelyből az ismeretlen lehetséges értékeit választhatjuk", "isCorrect": true}, {"id": "b439fd54-4873-4c70-a014-9487e15c4478", "text": "A végeredmények halmazát", "isCorrect": false}, {"id": "64ca2b96-862e-4b70-ad37-edc3b3a1e31f", "text": "Az üres halmazt", "isCorrect": false}, {"id": "5ee3be65-6884-4e23-8683-e2cb1bda28ee", "text": "A negatív számok halmazát", "isCorrect": false}], "timeLimit": 15}, {"id": "25759876-7761-4bc0-9d63-939ce5ce53c3", "text": "Mit jelent az igazsághalmaz?", "type": "multiple-choice", "options": [{"id": "facd3703-1dac-485d-83b4-3f36b8586f96", "text": "Azon elemek halmazát az alaphalmazból, melyekre a nyitott mondat igaz lesz", "isCorrect": true}, {"id": "027e9067-992c-450e-92c7-c554a7786382", "text": "Minden lehetséges számot", "isCorrect": false}, {"id": "759dc07b-3e43-458c-aa6b-e05b1c768af8", "text": "A hamis válaszokat", "isCorrect": false}, {"id": "6f509074-9e2b-4503-ae0a-67caec08dc5a", "text": "Az egyenlet nevét", "isCorrect": false}], "timeLimit": 15}, {"id": "5ab53939-a1a9-429d-a7ab-ea3a8ff1ea5c", "text": "Melyik szám teszi igazzá a nyitott mondatot: x + 7 = 15?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "8"}, {"id": "74cb8b45-feaa-4734-ac96-43e0d9404815", "text": "Melyik szám teszi igazzá: 3 * y = 21?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "7"}, {"id": "d6d789df-4803-4a23-a9a2-d59bc15df201", "text": "A 2 * x < 10 nyitott mondatnak a természetes számok halmazán több megoldása is lehet.", "type": "true-false", "options": [{"id": "25e7eb8b-c792-4c16-8c3b-6bf18a2b4fac", "text": "Igaz (pl. x=0,1,2,3,4)", "isCorrect": true}, {"id": "165f4cee-2ba0-4f9e-9146-ffb30312e920", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "fd402fb0-3c2c-4410-9fe2-6e8c13d75070", "text": "Ha egy nyitott mondatnak nincs megoldása az adott alaphalmazon, az igazsághalmaz az üres halmaz.", "type": "true-false", "options": [{"id": "2ba4a74e-d7d1-4a9e-a1eb-3f826ecc9bd8", "text": "Igaz", "isCorrect": true}, {"id": "17d5feaa-875d-42e0-bf73-d2175b388988", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '0b59b4a6-5fd3-478b-bd3d-fd6188e00b65',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '111. óra: Keressük a megoldásokat!',
        'Becslés, próbálgatás, visszafelé gondolkodás módszere.',
        'Matematika',
        '5. osztály',
        'Mérés, arányosság, szöveges feladatok',
        '[{"id": "67ec02c6-5654-45b4-bdbd-bf8266836f20", "text": "Mit jelent a visszafelé gondolkodás módszere?", "type": "multiple-choice", "options": [{"id": "0d6d38e9-d31a-497b-afd9-2752c1159d55", "text": "A végeredményből kiindulva az inverz (ellenkező) műveletek elvégzésével jutunk el a kezdőértékhez", "isCorrect": true}, {"id": "44a1a7a7-1c45-446f-b0ff-49b5d714e235", "text": "Megsejtjük a választ és nem számolunk", "isCorrect": false}, {"id": "8c964258-9564-448f-b654-57abd114c49a", "text": "Visszafelé írjuk le a számokat", "isCorrect": false}, {"id": "e24d5a6c-5e51-4c59-bcdb-a6fc728072e5", "text": "Kivonunk mindenből 100-at", "isCorrect": false}], "timeLimit": 15}, {"id": "6dc0ab83-7a9d-4fa6-8a5c-b43efb35182e", "text": "Gondoltam egy számot, megszoroztam 2-vel, hozzáadtam 5-öt, és 15-öt kaptam. Mi volt a gondolt szám?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "5"}, {"id": "7c285529-cba0-42b2-87cc-248891e71e3a", "text": "A próbálgatásos módszernél rendszerezetten, táblázatba foglalva érdemes kipróbálni a lehetőségeket.", "type": "true-false", "options": [{"id": "af254ff1-6d9b-4745-a678-74b2fa0078bf", "text": "Igaz", "isCorrect": true}, {"id": "4b4856a4-cab8-4df6-8423-58b80be8c9c7", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "dab01a19-f8d6-4572-a603-7272eb759d38", "text": "Gondoltam egy számot, elosztottam 3-mal, kivontam belőle 4-et, és 2-t kaptam. Mi volt a szám?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "18"}, {"id": "370875e4-183c-481a-b2ce-bf6eaec70f65", "text": "A becslés segít abban, hogy a kapott végeredmény reális voltát ellenőrizzük.", "type": "true-false", "options": [{"id": "a585beec-6a67-4e83-961b-c7ab7b4f7f2e", "text": "Igaz", "isCorrect": true}, {"id": "1b440c2b-3667-422c-97ec-003c62b2d142", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "005fe6f2-4e82-4eec-b7de-ba6401173086", "text": "Gondoltam egy számot, kivontam belőle 10-et, megdupláztam, és 40-et kaptam. Mi volt a szám?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "30"}, {"id": "7f2d3dfb-dc70-41a2-91c3-433ca70e5a55", "text": "Az ellenőrzés során a kapott eredményt behelyettesítjük az eredeti szöveges feladatba.", "type": "true-false", "options": [{"id": "87e36b73-f39b-4955-b958-1115d44b0829", "text": "Igaz", "isCorrect": true}, {"id": "ac0a27db-274f-48ba-84fc-56456d7e013c", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'd022484b-7657-421d-8a61-78bd3fe3568f',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '112. óra: Egyszerű szöveges feladatok',
        'Szöveges feladatok értelmezése és modellezése.',
        'Matematika',
        '5. osztály',
        'Mérés, arányosság, szöveges feladatok',
        '[{"id": "ed7bf546-1c4c-4a3d-b431-343ed7a86ecc", "text": "Katinak 12 színes ceruzája van, Petinek 5-tel több. Hány ceruzája van Petinek?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "17"}, {"id": "a1f48591-0bdb-4c83-b3f3-bea490f95094", "text": "Katinak és Petinek összesen hány ceruzája van? (Kati: 12, Peti: 17)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "29"}, {"id": "26ea9b89-4785-4d74-812e-1fa338443173", "text": "A szöveges feladat megoldásának lépései: szöveg megértése -> adatok lejegyzése -> terv/egyenlet -> számolás -> ellenőrzés -> szöveges válasz.", "type": "true-false", "options": [{"id": "e4164a03-1ebf-4abd-90b3-063a3b89d2e7", "text": "Igaz", "isCorrect": true}, {"id": "eb50e601-e272-4e1c-bfb2-0e2536b55ea9", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "1c55922d-0c5b-48de-93d3-87333ca87d8a", "text": "Egy polcon 45 könyv van. Levettek róla 18 könyvet. Hány könyv maradt a polcon?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "27"}, {"id": "28f9b118-a7a1-41c9-8b66-b829e7dfe8e5", "text": "Ha egy feladatban az ''összesen'' szó szerepel, gyakran összeadásra kell gondolnunk.", "type": "true-false", "options": [{"id": "c762853e-65e8-44b6-8b91-892205ccd015", "text": "Igaz", "isCorrect": true}, {"id": "98295154-9e6e-462e-94a8-e21b96837c66", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "89dfc427-c57f-4db1-9ae1-1b1dd85867c1", "text": "Három testvér életkorának összege 24 év. Hány év lesz az életkoruk összege 2 év múlva?", "type": "multiple-choice", "options": [{"id": "6890cac9-84bb-4f26-940e-258a477e3a11", "text": "30 év (mindenki 2 évvel idősebb: 24 + 3*2)", "isCorrect": true}, {"id": "fd2b3c5f-bfb3-4b2e-aa07-e119f96a12a7", "text": "26 év", "isCorrect": false}, {"id": "fb6de475-1597-4391-97cb-31ccf7077792", "text": "28 év", "isCorrect": false}, {"id": "a5bc586a-6496-46f9-8277-9c088ac5fb2e", "text": "36 év", "isCorrect": false}], "timeLimit": 15}, {"id": "74f75285-f499-4971-99f3-6c5915f12e00", "text": "A szöveges feladat végén mindig kötelező megadni a választ válaszmondat formájában is.", "type": "true-false", "options": [{"id": "8ed28985-852e-437c-b64e-c722d2f4b541", "text": "Igaz", "isCorrect": true}, {"id": "61431cf3-82f2-4a45-aeed-1169f507f1fd", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '33781ed3-5dcc-4a7c-b2aa-b48226bbfd6e',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '113. óra: Egyszerű szöveges feladatok gyakorlása',
        'Rövidebb és hosszabb matematikai szöveges feladatok megoldása.',
        'Matematika',
        '5. osztály',
        'Mérés, arányosság, szöveges feladatok',
        '[{"id": "06e3ec2e-44f6-47bb-a987-35863f913429", "text": "Egy pékségben 120 zsemlét sütöttek reggel. Délelőtt eladtak 85 zsemlét. Hány zsemle maradt?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "35"}, {"id": "cbc549a2-bf97-4c3c-87b8-e85c025b1e86", "text": "Egy téglalap alakú kert hossza 15 m, szélessége 10 m. Hány méter kerítés övezi a kertet?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "50"}, {"id": "28c1feb0-a691-4c2a-b800-138e2b1c056b", "text": "Aninak 1500 Ft-ja van. Vett egy könyvet 900 Ft-ért és egy csokit 300 Ft-ért. Hány Ft-ja maradt?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "300"}, {"id": "01b41613-6b3d-4c50-95a9-518a0a9236ad", "text": "A szöveges feladatoknál a szöveg gondos elolvasása a sikeres megoldás alapja.", "type": "true-false", "options": [{"id": "7a36b442-a2d9-4634-b78a-b9097d22ebe9", "text": "Igaz", "isCorrect": true}, {"id": "b089089f-584f-42d5-8141-a28d19cff797", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "553a8fd5-70a6-44af-9891-1b4e64e3afdc", "text": "Egy iskolai osztályban 28 tanuló van. A lányok száma 16. Hány fiú van az osztályban?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "12"}, {"id": "8c1c32ce-f20b-46f2-9746-64908b85e77f", "text": "Ha 4 egyforma füzet 800 Ft-ba kerül, hány Ft-ba kerül 7 ugyanilyen füzet?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "1400"}, {"id": "faefac89-e8b8-432a-b822-4a46404ef1c0", "text": "A válasz ellenőrzése nélkül is teljes értékű a feladatmegoldás.", "type": "true-false", "options": [{"id": "1f844785-4972-4de0-925b-6608f4abf6f4", "text": "Igaz", "isCorrect": false}, {"id": "e0c69887-243e-4b77-b463-530556250079", "text": "Hamis (az ellenőrzés a megoldás része)", "isCorrect": true}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '860b1e01-5666-4b41-b8ee-23e4def7add5',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '114. óra: Szöveges feladatok a hétköznapjainkban',
        'Mindennapi életből vett vásárlási, méréseket tartalmazó szöveges feladatok.',
        'Matematika',
        '5. osztály',
        'Mérés, arányosság, szöveges feladatok',
        '[{"id": "7b290814-fdc7-4f3f-801b-f79cc5518050", "text": "Apukának 5000 Ft-os bankjegye van. Vett 2 kg almát (400 Ft/kg) és 1 kg sajtot (2800 Ft). Hány Ft visszajárót kap?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "1400"}, {"id": "3157714c-6b4f-49ec-84b2-7fdeacec3a8c", "text": "Egy vonat 08:15-kor indul és 10:45-kor érkezik meg. Hány percig tartott az utazás?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "150"}, {"id": "f387fb36-27f6-4246-a29b-c9f7db5597ed", "text": "Ha a boltban 10% kedvezményt adnak egy 2000 Ft-os pólóra, hány Ft a kedvezmény mértéke?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "200"}, {"id": "3bbe5766-c98d-405b-bc5b-a34f8af183ec", "text": "A mindennapokban a becslés segít felmérni a vásárlás várható összegét.", "type": "true-false", "options": [{"id": "af9fd88c-c18d-4191-9fab-406e638c0d24", "text": "Igaz", "isCorrect": true}, {"id": "adfd6594-19e9-4556-9ec8-cb66a467985d", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "e159fcfd-c07f-4908-b7a3-5273e8c09002", "text": "Egy 1,5 literes üvegben 8 dl üdítő van. Hány dl üdítőt tölthetünk még hozzá, hogy tele legyen?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "7"}, {"id": "84b10791-dc59-47e0-bba8-9afa8fe7ef68", "text": "A pénztári fizetésnél az összegzés és a visszajáró számolása alapvető szöveges feladat.", "type": "true-false", "options": [{"id": "d3c6af79-e7b6-421d-88d8-82d135a4b7b7", "text": "Igaz", "isCorrect": true}, {"id": "47299d0b-ba90-412d-95a8-4a10143fa94c", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "f7ad2b93-fa92-4b3f-88b8-246f9fa1e680", "text": "Hány g kell még 750 g liszthez, hogy 1 kg legyen?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "250"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'cd12c532-cd7d-4d56-ada4-600c8b8bde5f',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '115. óra: Szöveges feladatok a hétköznapjainkban II.',
        'Összetettebb hétköznapi szöveges és méréssel kapcsolatos feladatok.',
        'Matematika',
        '5. osztály',
        'Mérés, arányosság, szöveges feladatok',
        '[{"id": "1b40588f-20c0-478c-a5ee-92b6126efaf2", "text": "Egy szoba hossza 5 m, szélessége 4 m. Hány m² szőnyeg kell a teljes padló lefedéséhez?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "20"}, {"id": "bf21ee54-07a5-4e13-b3e4-9bbc112cdf70", "text": "Gábor 45 percet tanult matematikát és 30 percet olvasott. Hány órát és percet tanult összesen?", "type": "multiple-choice", "options": [{"id": "ff77a268-19cf-41d4-a2b5-a3a196d928f7", "text": "1 óra 15 perc (75 perc)", "isCorrect": true}, {"id": "de2faafd-d1fe-4ba4-aaee-a703fc0552c2", "text": "1 óra 30 perc", "isCorrect": false}, {"id": "dd2e1d53-07b4-4651-9dcb-79468a823926", "text": "2 óra", "isCorrect": false}, {"id": "313e805d-f750-4939-9c42-08a54e4afe91", "text": "45 perc", "isCorrect": false}], "timeLimit": 15}, {"id": "b7dc34d1-527a-4d39-8c16-642224ea1b06", "text": "Ha 3 kg narancs 1500 Ft, mennyit fizetünk 5 kg narancsért? (Ft-ban)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "2500"}, {"id": "999da8b2-dc71-4d7a-9eb5-f55067918834", "text": "Ha egy 24 szeletes tortának a negyedét megették, hány szelet torta maradt?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "18"}, {"id": "d69b53d1-84eb-47d1-9150-fa7895b86678", "text": "Az időtartam kiszámításához a befejezés időpontjából kivonjuk a kezdés időpontját.", "type": "true-false", "options": [{"id": "dfc0d80b-94d3-4cde-8935-ffe47542b3a1", "text": "Igaz", "isCorrect": true}, {"id": "3c00dd73-a01a-469c-84c6-62148060146d", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "1dde33bd-8883-439a-a4c9-65add6fc85b9", "text": "Egy 50 literes hordóban 32 liter víz van. Beleöntünk még 12 litert. Hány liter hiányzik még a telítettséghez?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "6"}, {"id": "5400ed8c-3ecd-4d6f-a829-05eb80209465", "text": "A szöveges feladatok megértését segíti a vázlat, ábra vagy táblázat készítése.", "type": "true-false", "options": [{"id": "26577f35-4151-46fc-8fe4-e91a4745b359", "text": "Igaz", "isCorrect": true}, {"id": "291bb61d-64c6-49fe-82b2-20ad213bb7f3", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '296645e1-e0e9-4f25-97b5-00b94551f295',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '116. óra: Összefoglalás',
        'Összefoglaló ismétlés a mérés, arányosság és szöveges feladatok témakörből.',
        'Matematika',
        '5. osztály',
        'Mérés, arányosság, szöveges feladatok',
        '[{"id": "c3257822-12a2-4b81-ad0f-a2f69caa8ce2", "text": "Hány dkg 2,5 kg tömeg?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "250"}, {"id": "8266e6c2-049d-462a-b6c0-40b4bac3c749", "text": "Hány perc 1 óra 40 perc?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "100"}, {"id": "fb471905-438b-4d83-8b2b-ef7c737ff77e", "text": "Mi az igazsághalmaz a természetes számokon az x + 5 = 12 nyitott mondatra?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "7"}, {"id": "40bddbfa-cb8f-410e-8d5e-d2c1050f64f5", "text": "Ha 2 kg alma 800 Ft, egyenes arányosság esetén 5 kg alma 2000 Ft-ba kerül.", "type": "true-false", "options": [{"id": "df1c617a-4a6e-4e42-932c-e784ad3c6e54", "text": "Igaz", "isCorrect": true}, {"id": "b5168882-2155-43b0-a1d6-c85c2fde80fb", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "0930cdc6-08d7-4e20-9462-43b5d9d8e150", "text": "Gondoltam egy számot, megszoroztam 3-mal, hozzáadtam 10-et, 40-et kaptam. Mi a szám?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "10"}, {"id": "c7270603-bc69-4e00-9086-2dd6184edc06", "text": "Hány ml 4 dl?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "400"}, {"id": "75f490ce-4d9e-4130-a4e6-1b29da227b9f", "text": "Egyenes arányosság esetén ha az egyik mennyiség 3-szorosára nő, a másik is 3-szorosára nő.", "type": "true-false", "options": [{"id": "dacf14a5-3943-4b3a-8553-6e6a4f3a4c99", "text": "Igaz", "isCorrect": true}, {"id": "0ed2800e-c061-40c0-b287-de536ad1953c", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '9caf7c58-52de-4086-82b5-df98f24a2499',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '117. óra: Gyakorlás',
        'Feladatmegoldási gyakorlatok a mérések és arányosságok témakörében.',
        'Matematika',
        '5. osztály',
        'Mérés, arányosság, szöveges feladatok',
        '[{"id": "cba1c617-956f-45fc-8af8-c47a34ba9a07", "text": "Hány tonna 4000 kg?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "4"}, {"id": "47b4b18f-33a5-4feb-acfc-b03651bc1d2c", "text": "Hány centiliter 2 liter?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "200"}, {"id": "47a53967-7ec6-4d56-a6dd-25a7a13485d6", "text": "Melyik szám teszi igazzá: 4 * a - 3 = 13?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "4"}, {"id": "d641031d-78cf-40c7-a304-f9595779bad8", "text": "Ha 6 füzet 1800 Ft, mennyibe kerül 10 füzet? (Ft-ban)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "3000"}, {"id": "03343fcc-b195-482e-8a6e-b0dc2ffb8f4f", "text": "A tömeg mértékegységei között a kg és g között 1000 a váltószám.", "type": "true-false", "options": [{"id": "5253374f-0dc5-4955-8059-ea7db466a7ca", "text": "Igaz", "isCorrect": true}, {"id": "f35ad63e-189e-4a1c-973c-1f76906d2842", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "aaba9238-6955-4d79-9860-de49eb7c1c27", "text": "Peti 14:20-kor kezdett focizni és 15:50-kor fejezte be. Hány percet focizott?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "90"}, {"id": "8991032b-ff33-4b10-b49e-582df7025bb8", "text": "A szöveges feladatok ellenőrzése azt jelenti, hogy megnézzük, a kapott szám kielégíti-e a szöveg feltételeit.", "type": "true-false", "options": [{"id": "33269562-bd3a-4a75-920f-5d53bdfdd2f9", "text": "Igaz", "isCorrect": true}, {"id": "6a72aa45-f4f6-4ce0-bdb3-e4507ec3e90f", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );