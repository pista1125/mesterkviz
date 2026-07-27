INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '5dfa963e-b6a5-4755-a6bf-82be53b7afc6',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '98. óra: Összefoglalás',
        'Összefoglaló ismétlés: koordináták, tájékozódás, sorozatok szabályai.',
        'Matematika',
        '5. osztály',
        'Helymeghatározás, sorozatok',
        '[{"id": "5c8f090e-5f9b-424a-a691-ac474af61931", "text": "Mik az P(-4; 3) pont koordinátái?", "type": "multiple-choice", "options": [{"id": "b683664f-00cb-4d6d-b047-cebbbcf49628", "text": "x = -4, y = 3", "isCorrect": true}, {"id": "1a8db1c4-7cfd-4ef4-9036-a5caa5b29143", "text": "x = 3, y = -4", "isCorrect": false}, {"id": "d1aa2eaf-8574-4f09-ab1d-ff1a9f76539c", "text": "x = 4, y = 3", "isCorrect": false}, {"id": "bd836eac-9bcf-48ea-87e0-3b58eaafe851", "text": "x = 0, y = 0", "isCorrect": false}], "timeLimit": 15}, {"id": "bf0895db-425b-4df6-b405-3fd7df4d4f25", "text": "Mi a hiányzó szám a sorozatban? 100, 95, 90, __, 80", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "85"}, {"id": "cbf8318d-9f3e-41c8-ae57-8f47acf89a39", "text": "Az origó koordinátái a (0; 0).", "type": "true-false", "options": [{"id": "491e170d-fb14-40ba-80fb-2c8c6b2d67bf", "text": "Igaz", "isCorrect": true}, {"id": "40c63941-dc07-457b-872b-2740474cfe46", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "a5ad336e-6cdd-4941-b828-08500cf30bf7", "text": "Mi a szabálya a 2, 6, 18, 54 sorozatnak?", "type": "multiple-choice", "options": [{"id": "42c7a73e-1c7e-47e2-b2b2-6dd5549fee71", "text": "Szorzás 3-mal (*3)", "isCorrect": true}, {"id": "9536f8cc-4ec9-478d-b8d0-af65080bf0df", "text": "Hozzáadás 4-gyel", "isCorrect": false}, {"id": "61e0a5a2-3f72-48e4-abce-760a92c3cd5e", "text": "Szorzás 2-vel", "isCorrect": false}, {"id": "4fddd7c2-b9de-4565-afff-aa92e936b056", "text": "Kivonás 4-gyel", "isCorrect": false}], "timeLimit": 15}, {"id": "3d8517da-ae77-469d-aa90-5f49c1d4acb2", "text": "Ha a (3; 4) pontot eltoljuk 2 egységgel jobbra (x növelése), mi lesz az új első koordináta?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "5"}, {"id": "4fec513b-7634-447a-a153-ed402c768334", "text": "A koordináta-rendszerben a vízszintes tengely az y tengely.", "type": "true-false", "options": [{"id": "08f4565a-bb67-4438-8aef-48f19085ff73", "text": "Igaz", "isCorrect": false}, {"id": "61436044-9ec6-4e27-b451-5f6519d8b015", "text": "Hamis (az x tengely a vízszintes)", "isCorrect": true}], "timeLimit": 15}, {"id": "5cce97e4-5617-46ae-8ec2-084399a75299", "text": "Hány elemből áll a Fibonacci sorozat első 5 eleme? (1, 1, 2, 3, 5)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "5"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'b385fb92-b40e-4977-94e2-3eb513af8d84',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '99. óra: Témazáró dolgozat',
        'Témazáró számonkérés a Helymeghatározás és Sorozatok témakörből (10 kérdés).',
        'Matematika',
        '5. osztály',
        'Helymeghatározás, sorozatok',
        '[{"id": "de641b6b-c01a-41e0-b72c-ed06c8ab3c7a", "text": "1. Mik az origó koordinátái?", "type": "multiple-choice", "options": [{"id": "31eb723e-ebd6-40ab-ad73-c769c2e7e078", "text": "(0; 0)", "isCorrect": true}, {"id": "4507488d-e7c0-4b28-84eb-7b403a56b63e", "text": "(1; 1)", "isCorrect": false}, {"id": "583c1f41-05ef-48ee-8cc4-9d2dbf61b9fd", "text": "(1; 0)", "isCorrect": false}, {"id": "a03d3223-b289-426a-91fa-0234f5405c5a", "text": "(0; 1)", "isCorrect": false}], "timeLimit": 15}, {"id": "01086a0e-7c91-4074-8a41-62e5dc863e71", "text": "2. Egy P(5; -2) pont első koordinátája 5.", "type": "true-false", "options": [{"id": "eae2deec-6e32-4729-b2dd-c735eb107c4e", "text": "Igaz", "isCorrect": true}, {"id": "c4e45c9a-349d-4824-8604-a892617dc253", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "7d81c737-dbd9-4870-8e78-b5420316ac4d", "text": "3. Mi a következő szám a 4, 8, 12, 16 sorozatban?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "20"}, {"id": "0576a412-44da-4432-b6c6-a99cbcb6a346", "text": "4. Mi a következő szám a 3, 6, 12, 24 sorozatban?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "48"}, {"id": "6833d129-911d-4325-a3cb-c443afa29860", "text": "5. Hány síknegyedből áll a derékszögű koordináta-rendszer?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "4"}, {"id": "22dd9c23-31b2-40d8-8c96-3deb354adbbe", "text": "6. Melyik tengelyen van a Q(0; 7) pont?", "type": "multiple-choice", "options": [{"id": "eb9eb1ec-582d-42e3-9ea4-9436619c9e73", "text": "y tengelyen", "isCorrect": true}, {"id": "c9fe2954-82b6-4301-b581-8ed613a41120", "text": "x tengelyen", "isCorrect": false}, {"id": "e79c7313-3051-4b07-844c-349baf85fc7a", "text": "Origóban", "isCorrect": false}, {"id": "5ac6235b-01ba-458b-b48a-d285edd74372", "text": "Egyik tengelyen sem", "isCorrect": false}], "timeLimit": 15}, {"id": "0d7cbbea-f526-4fe8-b004-0ba5cff00d99", "text": "7. Mi a Fibonacci sorozat 6. eleme? (1, 1, 2, 3, 5, __)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "8"}, {"id": "19ca3923-f2a8-4756-adb6-f61e1dd9d879", "text": "8. A csökkenő sorozatban a következő elem kisebb vagy egyenlő az előzőnél.", "type": "true-false", "options": [{"id": "1a4a544f-2937-4e73-b1c0-083293d7f04d", "text": "Igaz", "isCorrect": true}, {"id": "d72f4b69-84f5-4ccd-ab4e-5272036eed17", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "c339e122-c2ff-40f2-a991-de1d1b0a7aa6", "text": "9. Ha a mozijegyed a 3. sor 8. székére szól, hányadik széken ülsz?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "8"}, {"id": "33f9bfe8-d1a1-4f39-8d3d-1dc422380e23", "text": "10. A térbeli pontok helyének megadásához 3 koordináta szükséges.", "type": "true-false", "options": [{"id": "99f6d4bf-ecf8-4f3d-ab3d-0de126503d59", "text": "Igaz", "isCorrect": true}, {"id": "8e5e2729-34f2-471c-b2ab-3ea4afb201b8", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '77206436-e95c-4104-bf3f-84356d52a974',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '100. óra: Matematikai játékok',
        'Játékos matematikai feladványok, logikai stratégiák, kooperáció.',
        'Matematika',
        '5. osztály',
        'Helymeghatározás, sorozatok',
        '[{"id": "3fff21be-e61b-4ddb-b030-41db848bdf70", "text": "Mi a stratégiai játékok célja?", "type": "multiple-choice", "options": [{"id": "7ef60fde-f004-40f7-86c8-92e80618e84f", "text": "A gondolkodási képesség és a logikai tervezés fejlesztése", "isCorrect": true}, {"id": "960cc1a7-1175-4c9d-bd2d-668b2c239ee9", "text": "A szerencse próbára tétele", "isCorrect": false}, {"id": "2721e5f4-1993-4896-beae-215403dd0efa", "text": "Időpazarlás", "isCorrect": false}, {"id": "3ccd04d9-76ad-4d09-84c7-9c33a7605876", "text": "Gyors gépelés", "isCorrect": false}], "timeLimit": 15}, {"id": "b0ddb698-56ec-4ec0-891f-46cfd0270ed7", "text": "A amőba (ötödölő) játékban 5 azonos jelet kell kirakni egy sorba, oszlopba vagy átlóba.", "type": "true-false", "options": [{"id": "94286ad6-26e8-48a6-8053-2ab7ce18a0a5", "text": "Igaz", "isCorrect": true}, {"id": "936592ac-44ef-4323-95ef-2c40c24561e6", "text": "Hamis (4)", "isCorrect": false}], "timeLimit": 15}, {"id": "971add2e-69e6-4578-a840-becc02b0d43d", "text": "Hány mezője van a klasszikus 8x8-as sakk-táblának?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "64"}, {"id": "c8cbf4ce-2a7f-4223-b608-6ddd2bb7f324", "text": "A sudoku játékban a számok nem ismétlődhetnek egy sorban, oszlopban és blokkban.", "type": "true-false", "options": [{"id": "33b4702a-9f55-49c5-a635-4735cfc58939", "text": "Igaz", "isCorrect": true}, {"id": "094d08ba-2053-4c54-9e10-c7cb43e3ec30", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "43dd4eae-1048-4069-8690-a6fe47dbfa35", "text": "Melyik számhiány pótolható az 1, 2, 3, 4, __, 6 bűvös négyzet sorban?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "5"}, {"id": "c3f05861-becc-4a0b-b8df-027134fe09be", "text": "A csoportos matematikai játékok segítik az együttműködési készség (kooperáció) fejlődését.", "type": "true-false", "options": [{"id": "ea302808-b7b2-4a04-a56c-454c84e0f341", "text": "Igaz", "isCorrect": true}, {"id": "5e1d33f0-3549-4ef1-9934-bbb691744966", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "f6fd54a8-7800-43e1-826b-11484fdeca39", "text": "A logikai rejtvények megoldásakor szabályokat követünk a helyes válasz megtalálásához.", "type": "true-false", "options": [{"id": "a24c9931-3b01-4dfd-947a-f50bb8b370c6", "text": "Igaz", "isCorrect": true}, {"id": "2a1dacdb-4b85-4d68-a3ea-dffa01feb853", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '794730f2-e421-4a89-a9cc-2ca76cf8a4d6',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '101. óra: Témazáró dolgozat értékelése',
        'A helymeghatározás és sorozatok témazáró megbeszélése.',
        'Matematika',
        '5. osztály',
        'Helymeghatározás, sorozatok',
        '[{"id": "5b2bf756-d7c1-451b-b224-6e0451a58718", "text": "Mi a leggyakoribb hiba a koordináták felírásakor?", "type": "multiple-choice", "options": [{"id": "9ef97de8-0018-4508-b6f8-49c4f4823d75", "text": "Az x és y koordináták sorrendjének felcserélése", "isCorrect": true}, {"id": "0f7d028d-49f1-4567-8f6d-a42175cf55a8", "text": "A zárójel elhagyása", "isCorrect": false}, {"id": "3ec274a8-9398-41a8-b333-a34e9e946776", "text": "A pont betűjelének leírása", "isCorrect": false}, {"id": "0aa6a46f-b9b8-4cf3-b403-78ca0b8f95a9", "text": "A színezés", "isCorrect": false}], "timeLimit": 15}, {"id": "4eb88fe2-af23-4f01-bb65-5661503d82f9", "text": "A sorozatszabály megállapításakor fontos több egymást követő elem ellenőrzése is.", "type": "true-false", "options": [{"id": "31bfd6b1-b41d-4c32-99ec-9caece30bdb5", "text": "Igaz", "isCorrect": true}, {"id": "444ba672-04c3-4f08-9ac6-65f240f07048", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "50f330ca-5165-44c9-8b2a-92f1b528c514", "text": "Mennyi a különbség a 15 és a 8 között?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "7"}, {"id": "f284b57c-2e11-466f-b85a-75fffff2f832", "text": "A hibák megbeszélése és javítása segít a helyes matematikai gondolkodás elmélyítésében.", "type": "true-false", "options": [{"id": "a16ca610-fda4-405d-84ef-7ad8bbbb7a22", "text": "Igaz", "isCorrect": true}, {"id": "d61c053a-0763-483f-b7a2-6f0182980a77", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "96b1b345-2a69-4854-b934-ac2c8f3f2791", "text": "Ha egy sorozat szabálya ''*2 + 1'', és az elem 3, mi a következő elem? (3*2 + 1)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "7"}, {"id": "44b17f07-002d-4960-aec4-6faf3cd87535", "text": "Az origó jelölése a koordináta-rendszerben rendszerint az O betű.", "type": "true-false", "options": [{"id": "c2ea82f7-0eb3-40eb-a84a-4038d9f57c4e", "text": "Igaz", "isCorrect": true}, {"id": "9d887f9f-e47e-4abc-b6ab-3011a9e4ed90", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "53471412-6964-4134-9e32-cd3af78ec050", "text": "A rendszeres gyakorlás magabiztosabb feladatmegoldást eredményez.", "type": "true-false", "options": [{"id": "6c1a62a7-eda3-4ab2-9671-2265f6b99671", "text": "Igaz", "isCorrect": true}, {"id": "c51a63c5-cd62-4d3c-8f1a-d0a62a254e4b", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '36ac87ee-cf2c-4132-8376-55ad8de16a0c',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '102. óra: A tömeg mérése, mértékegységei',
        'Tömegmértékegységek (mg, g, dkg, kg, t) és átváltásuk.',
        'Matematika',
        '5. osztály',
        'Mérés, arányosság, szöveges feladatok',
        '[{"id": "003091b1-e37b-4187-8dcd-d215b1e57a1d", "text": "Mi a tömeg alapvető SI mértékegysége?", "type": "multiple-choice", "options": [{"id": "0572818f-52ec-4382-9547-f06514a0a570", "text": "Kilogramm (kg)", "isCorrect": true}, {"id": "f50a2fa7-5ed8-4444-aef1-df21f0f0f360", "text": "Gramm (g)", "isCorrect": false}, {"id": "503c0216-a3ba-493c-aebb-a492deabea80", "text": "Tonna (t)", "isCorrect": false}, {"id": "ed92d289-07b9-4886-8381-067326ba28dc", "text": "Liter (l)", "isCorrect": false}], "timeLimit": 15}, {"id": "57fdb6b1-6782-4a79-a81b-16d0ffe07e0c", "text": "Hány gramm 1 kilogramm?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "1000"}, {"id": "06e4dd22-c49e-4077-9866-fe3afb3dc223", "text": "Hány dekagramm (dkg) 1 kilogramm?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "100"}, {"id": "d6afebde-250c-43b9-b76a-e90d640953c8", "text": "Hány kilogramm 1 tonna (t)?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "1000"}, {"id": "f549e946-617c-48a5-8a50-b63ca0d10d7f", "text": "50 dkg megegyezik 500 grammal.", "type": "true-false", "options": [{"id": "51134c53-4097-46d9-8029-8133e5ec7141", "text": "Igaz (1 dkg = 10 g)", "isCorrect": true}, {"id": "1dfc1bdd-4986-48e2-a453-519b6ae65808", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "e1b59683-1a0c-4f60-99e5-1bab0d256759", "text": "Melyik mértékegység alkalmas egy teherautó tömegének megadására?", "type": "multiple-choice", "options": [{"id": "93cc0a6c-9c91-4f5a-a1d4-170d3c151440", "text": "Tonna (t)", "isCorrect": true}, {"id": "b8c965b7-1a68-4889-8f29-1c56a71637b7", "text": "Milligramm (mg)", "isCorrect": false}, {"id": "07c9ca6c-d879-4a0f-9f09-3b554ff51a98", "text": "Gramm (g)", "isCorrect": false}, {"id": "8b7643ca-e3ec-4d07-b061-a620ed492c93", "text": "Decigramm", "isCorrect": false}], "timeLimit": 15}, {"id": "744ce2e5-cf25-4ef2-83c4-20a86a66e728", "text": "Hány dekagramm van 2,5 kg-ban?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "250"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '79113c5c-a0b8-42fb-a7cb-85b36682bb28',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '103. óra: Az űrtartalom mérése',
        'Űrtartalom egységei (ml, cl, dl, l, hl) és átszámítások.',
        'Matematika',
        '5. osztály',
        'Mérés, arányosság, szöveges feladatok',
        '[{"id": "2af27e99-6767-4ca1-9680-005f38b71420", "text": "Mi az űrtartalom alapegysége?", "type": "multiple-choice", "options": [{"id": "34318732-5782-4d5d-9de6-0c010168d99c", "text": "Liter (l)", "isCorrect": true}, {"id": "9d9e361e-9f34-48c2-9d7f-b59d59f2bf9a", "text": "Köbméter (m³)", "isCorrect": false}, {"id": "210a2421-dbc8-4f44-919d-443c8a2d81c2", "text": "Gramm (g)", "isCorrect": false}, {"id": "4682ec96-cb0c-437f-a806-8bb7cbc2dc5a", "text": "Méter (m)", "isCorrect": false}], "timeLimit": 15}, {"id": "9a5f9b53-52da-4475-94e9-fb3fc59175cb", "text": "Hány deciliter (dl) 1 liter?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "10"}, {"id": "2a070915-4c74-4b22-8438-913087045016", "text": "Hány milliliter (ml) 1 liter?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "1000"}, {"id": "4d81ff27-3b19-49c6-a332-fe04d33cb94d", "text": "Hány liter 1 hektoliter (hl)?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "100"}, {"id": "00a58edd-f326-4774-8bdf-1d5e3ef07fbe", "text": "A fél liter víz pontosan 5 dl-nek felel meg.", "type": "true-false", "options": [{"id": "8584ca84-8ddb-4d9d-9ded-f41191a7d465", "text": "Igaz", "isCorrect": true}, {"id": "c1ad220f-bee7-48a0-bb9b-ac8725ef9aff", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "3e91c4a6-ad00-4642-ad52-b8d1c669b1c5", "text": "Melyik a legkisebb űrtartalom az alábbiak közül?", "type": "multiple-choice", "options": [{"id": "1942c3db-30aa-46de-b0ed-18e1d5da599b", "text": "15 ml", "isCorrect": true}, {"id": "20d4b9e0-f795-4899-9dc7-74b68030b6ee", "text": "2 dl", "isCorrect": false}, {"id": "2a8623ec-8cde-40f2-9e35-1fa9de09fc4e", "text": "1 l", "isCorrect": false}, {"id": "179e2438-b0eb-4f15-8a9e-2ab05be619b7", "text": "1 hl", "isCorrect": false}], "timeLimit": 15}, {"id": "f284abe5-39b1-42f2-bd2b-251c9432354f", "text": "Hány centiliter (cl) van 3 dl-ben?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "30"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '1319a0b5-f419-41b5-8121-2ac2c021ee27',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '104. óra: Az idő mérése, mértékegységei',
        'Időpont, időtartam, 60-as számrendszer (mp, min, óra, nap, hét, év).',
        'Matematika',
        '5. osztály',
        'Mérés, arányosság, szöveges feladatok',
        '[{"id": "ab02c9a2-81f1-4914-b4af-971351608c61", "text": "Hány másodperc van 1 percben?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "60"}, {"id": "66d9e1da-7999-4c7f-895c-7c9c463d0572", "text": "Hány perc van 1 órában?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "60"}, {"id": "2e3a4104-9451-43e9-b2ce-3b9f4f04045c", "text": "Hány órából áll egy teljes nap?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "24"}, {"id": "9286f245-1bd6-4e75-895b-e35e3506444f", "text": "Az idő mérésénél a váltószám a másodperc, perc és óra között 60.", "type": "true-false", "options": [{"id": "6896f3d4-8e97-4454-ad8d-5bca86e2f678", "text": "Igaz", "isCorrect": true}, {"id": "d18d655a-6db3-465f-a2cf-8c1de2e0837b", "text": "Hamis (10)", "isCorrect": false}], "timeLimit": 15}, {"id": "e081631f-b192-461e-9a86-a62d9f1dc9df", "text": "Hány perc 2 és fél óra?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "150"}, {"id": "d688eea0-4476-4d8d-805a-dfa830b79f1d", "text": "Egy átlagos év hány napból áll (nem szökőévben)?", "type": "multiple-choice", "options": [{"id": "eca5be5b-e6d2-45bb-b061-8d8eb8107af5", "text": "365 nap", "isCorrect": true}, {"id": "fea7c52e-24ea-4de3-81fe-3b6c5a01de88", "text": "360 nap", "isCorrect": false}, {"id": "6c078074-ba99-44f5-bcbe-1245c4d5fdcb", "text": "366 nap", "isCorrect": false}, {"id": "16b87278-0ae5-4dd6-b231-d3ce2144fff9", "text": "300 nap", "isCorrect": false}], "timeLimit": 15}, {"id": "f87c122d-bac9-4e4b-82e4-9b5402d4293d", "text": "Hány napból áll egy hét?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "7"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '560e93c1-6508-446e-be0d-e1182b7a5d8d',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '105. óra: Mértékegység átváltások',
        'Nem szabványos és szabványos mértékegységek gyakorlása.',
        'Matematika',
        '5. osztály',
        'Mérés, arányosság, szöveges feladatok',
        '[{"id": "0e2b968b-51e5-4269-879e-e96082c47bed", "text": "Mi a különbség a szabványos és nem szabványos mértékegységek között?", "type": "multiple-choice", "options": [{"id": "a3fa7702-bb78-43ed-8e21-ec39e6be9a2a", "text": "A szabványos mértékegységek mindenhol ugyanazt a pontos értéket jelentik", "isCorrect": true}, {"id": "ca4a94b8-9642-4177-911e-c275002304de", "text": "Nincs különbség", "isCorrect": false}, {"id": "dec9362a-c53f-46df-97e1-b4513f67d32a", "text": "A nem szabványos pontosabb", "isCorrect": false}, {"id": "8fb29cdd-48d6-4f2b-9597-c68f08af5664", "text": "A szabványosat csak iskolában használják", "isCorrect": false}], "timeLimit": 15}, {"id": "1e5aad3a-2dd7-460a-88b9-1cf459d3d5d7", "text": "A lépés, arasz, marok nem szabványos mértékegységek.", "type": "true-false", "options": [{"id": "49b3a29e-561d-4a0c-80a9-f3b9bbe352db", "text": "Igaz", "isCorrect": true}, {"id": "a85dad2d-0e59-4883-ad36-dab775528587", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "8e4d9298-24c4-452c-8129-8cdcfd1698a7", "text": "Hány cm 4,5 m?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "450"}, {"id": "ed4f8f42-52c8-4d98-89e3-b6b5c69bf75a", "text": "Hány dkg 3 kg?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "300"}, {"id": "f2f37c8c-28fb-4924-a623-9c0d8d3e71ae", "text": "A mértékegységek átváltásakor a nagyobb mértékegységből a kisebb felé haladva szorzunk a váltószámmal.", "type": "true-false", "options": [{"id": "3b67518e-4991-47ed-acc9-dadd412beac6", "text": "Igaz", "isCorrect": true}, {"id": "db49def1-bf94-4549-801d-b9971ea6a61f", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "e7e2122e-5677-4563-991f-a3f6638ea4e3", "text": "Hány dl 200 ml?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "2"}, {"id": "30b30fd8-8303-4dd3-bad1-8bfeccbf1247", "text": "Melyik mértékegység-pár azonos?", "type": "multiple-choice", "options": [{"id": "ce1c44d9-74c8-431e-bc2d-9fc9d4c94bfe", "text": "1 dm³ = 1 liter", "isCorrect": true}, {"id": "a0cac410-a2a0-4a79-92bc-29f4f5ab0ab4", "text": "1 cm³ = 1 liter", "isCorrect": false}, {"id": "517ba37b-9ac0-4898-a2e8-6036f2b35c82", "text": "1 m³ = 1 dl", "isCorrect": false}, {"id": "61a749d9-69ff-4417-9fd9-a0970cb82401", "text": "1 mm³ = 1 cl", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'b1d0eaa1-1caf-4797-aba9-2ac13e06de39',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '106. óra: Mértékegység átváltások (gyakorlás)',
        'Összetett mértékegység-átváltási feladatok és gyakorlás.',
        'Matematika',
        '5. osztály',
        'Mérés, arányosság, szöveges feladatok',
        '[{"id": "8721da1c-4ce6-42a3-8561-5efaf730d642", "text": "Mennyi 1500 g kilogrammban?", "type": "multiple-choice", "options": [{"id": "0b9b27ec-878b-4700-b586-091958b7231c", "text": "1,5 kg", "isCorrect": true}, {"id": "470159ed-85ed-45c7-831a-a867e59a9c96", "text": "15 kg", "isCorrect": false}, {"id": "3b6d178a-e7e7-47a1-8e00-91cf0f352b8a", "text": "150 kg", "isCorrect": false}, {"id": "cf33a88c-8209-4ef4-b14d-c334120caca7", "text": "0,15 kg", "isCorrect": false}], "timeLimit": 15}, {"id": "76dc9957-22dd-4ab7-9167-8966205fbc29", "text": "Hány mm 25 cm?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "250"}, {"id": "340f7794-e041-4534-8e0c-1425bbc72a8e", "text": "Hány cl 5 dl?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "50"}, {"id": "470f3a79-d356-4445-9282-e98da91ab78c", "text": "A 3 óra 15 perc összesen 195 perc.", "type": "true-false", "options": [{"id": "ccb91835-e24e-4c17-a8c5-0b719f7e4339", "text": "Igaz (3*60 + 15 = 195)", "isCorrect": true}, {"id": "3aa9462c-91a2-4e73-a808-771ad660f96e", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "4898b054-d99d-4d71-8e3b-571b8bff0773", "text": "Hány kg 2,8 tonna?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "2800"}, {"id": "c437b89f-c67e-4fbc-95e9-1c94359ecf36", "text": "Hány m² van 300 dm²-ben?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "3"}, {"id": "0251fb3f-e401-476c-a5d3-91e42d21c12f", "text": "A mértékegység-átváltási versenyben a gyorsaság mellett a pontosság a legfontosabb.", "type": "true-false", "options": [{"id": "51f0fc2f-621a-4c7f-b6ea-567e7f6fccc0", "text": "Igaz", "isCorrect": true}, {"id": "50e339ba-358e-4178-9ada-278051e6d901", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'a87b1b08-4280-404d-aa7f-8ccf0c2ee8da',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '107. óra: Arányosságok, változó mennyiségek',
        'A változó mennyiségek és az arányosság fogalmának megértése.',
        'Matematika',
        '5. osztály',
        'Mérés, arányosság, szöveges feladatok',
        '[{"id": "23048deb-27a8-4957-b570-b200279182b7", "text": "Mit jelent az, hogy két mennyiség változik?", "type": "multiple-choice", "options": [{"id": "02f6c140-9e51-4d20-b8c0-7943dec61996", "text": "Az egyik értékének változása hatással van a másik értékére", "isCorrect": true}, {"id": "f5995775-2798-463f-a7d4-21a245b88217", "text": "Mindig konstans állandó értékűek", "isCorrect": false}, {"id": "34ee4d3a-05d2-407a-9504-53097eb2fe93", "text": "Sosem lehet őket kiszámolni", "isCorrect": false}, {"id": "c406edca-2f8a-4608-8647-4e9d3c4aaa13", "text": "Különböző nyelveken beszélnek", "isCorrect": false}], "timeLimit": 15}, {"id": "fa172e09-9946-4a4a-b1d7-6a01cbfc6cb0", "text": "Ha kétszer annyi almát veszel a piacon, a fizetendő ár is a kétszeresére nő (változatlan egységár mellett).", "type": "true-false", "options": [{"id": "65053d8b-d97c-4a9f-9ee8-f2603574570e", "text": "Igaz", "isCorrect": true}, {"id": "12f1cdb0-dfc2-4fcb-8743-9b408b80246a", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "9a4caa1c-8c6c-415e-80da-9918b1047442", "text": "Ha 1 füzet ára 200 Ft, mennyibe kerül 4 füzet? (Ft-ban)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "800"}, {"id": "9b3bd8e6-2f3a-4fc3-99ab-ce58d2d0c93d", "text": "Az arányosság két mennyiség közötti szabályos kapcsolatot ír le.", "type": "true-false", "options": [{"id": "0e010cd9-bbd3-4821-8d3e-da9f72e6497b", "text": "Igaz", "isCorrect": true}, {"id": "c1e1d2f7-3e24-40eb-bbbf-29bdc13f4de8", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "e299c698-d834-4a48-aacb-d86f1ca8acde", "text": "Ha 3 gombóc fagylalt 900 Ft, mennyibe kerül 1 gombóc fagylalt? (Ft-ban)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "300"}, {"id": "8239a149-1d8d-4627-9567-9020f5e34c2f", "text": "Az arányossági feladatokat táblázat segítségével is könnyen áttekinthetjük.", "type": "true-false", "options": [{"id": "507256e2-0fe3-43b3-91fc-336dd2cb1ecc", "text": "Igaz", "isCorrect": true}, {"id": "47d0349a-fc84-4c30-9221-9add5a3a7672", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "852f675c-d888-438c-833d-53b96af44b63", "text": "Melyik állítás ír le változó mennyiségeket?", "type": "multiple-choice", "options": [{"id": "81e58ab2-0911-4f71-91f0-7ba3d2be3e59", "text": "A megtett út hossza és az ehhez szükséges idő (állandó sebességnél)", "isCorrect": true}, {"id": "09d72f81-989c-4a5b-85f6-27af9fdcc64d", "text": "A kocka lapjainak száma és színe", "isCorrect": false}, {"id": "c59db1bf-9128-4dfa-9234-858f761ce1a2", "text": "Az ember életkora és a lábmérete felnőttkorban", "isCorrect": false}, {"id": "f5e6efc4-5226-4a7f-9b71-47c9109f053c", "text": "A hét napjai és a hónapok száma", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );