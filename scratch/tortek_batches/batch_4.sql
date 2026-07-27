INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '50ae0cb5-d829-435c-852c-cf1a970eefd8',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '48. óra: Számonkérés',
        'Rövid számonkérő teszt a közönséges törtekből.',
        'Matematika',
        '5. osztály',
        'Törtek',
        '[{"id": "2efc47df-85d5-4987-a9ea-15a9805f1ac1", "text": "Melyik tört egyenlő 3/5-del?", "type": "multiple-choice", "options": [{"id": "b3b1bd54-146e-4728-a7c1-4fa70c78e665", "text": "6/10", "isCorrect": true}, {"id": "863979fe-9076-48f5-a427-3fd07007ce30", "text": "5/3", "isCorrect": false}, {"id": "c6f76ab8-a2c6-40f9-8f39-39299209de93", "text": "9/25", "isCorrect": false}, {"id": "dc7f79b0-c3d8-498c-9ba3-1a36e42ac3ca", "text": "3/10", "isCorrect": false}], "timeLimit": 15}, {"id": "18b4aed9-4166-49a3-9348-d1c8f6b6646e", "text": "Számítsd ki: 5/8 + 1/4 = ? (Közös nevező: 8)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "7/8"}, {"id": "1e5e8835-ac9b-4e66-b5ed-c5948454a161", "text": "Számítsd ki: 9/10 - 2/5 = ?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "5/10"}, {"id": "1284bc1e-1b0c-4cb3-b037-0e25d2472cc4", "text": "Az 3/4 / 3 osztás hányadosa 1/4.", "type": "true-false", "options": [{"id": "2e05e095-142f-49a6-a109-0978592cfd9e", "text": "Igaz", "isCorrect": true}, {"id": "738e6c9d-915f-4212-9a29-3622b75717ea", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "50e99d1b-21f0-4c3f-97f6-3da52bd8a25b", "text": "Mennyi 5/6 * 3 eredménye?", "type": "multiple-choice", "options": [{"id": "61bd9005-168c-4c0e-868c-bdf5ba07c648", "text": "5/2 (vagy 2 egész 1/2)", "isCorrect": true}, {"id": "73658b7c-6091-4c59-a0f6-47cf711a2dc2", "text": "15/18", "isCorrect": false}, {"id": "ebb33ea3-52b6-440d-be9f-9df8a21b5c92", "text": "5/18", "isCorrect": false}, {"id": "eda53761-2094-465c-9ca8-d11c53433329", "text": "15/2", "isCorrect": false}], "timeLimit": 15}, {"id": "bed42cf8-b107-4306-a35c-1000986bb589", "text": "A 11/3 vegyes tört alakja 3 egész 2/3.", "type": "true-false", "options": [{"id": "94b76184-51f4-49a4-858f-563cdb12c702", "text": "Igaz", "isCorrect": true}, {"id": "a49db0bd-d5b5-41d1-8dc0-08e792938945", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "8a94f0ca-1e74-4b4d-acec-6f334e54b870", "text": "Egy osztály 25 tanulójának 3/5 része lány. Hány lány van az osztályban?", "type": "multiple-choice", "options": [{"id": "6b3ea82c-d1c2-402a-8a2e-7160deef6062", "text": "15", "isCorrect": true}, {"id": "c247db5f-e448-4a2a-bdd5-4b6454f2874e", "text": "10", "isCorrect": false}, {"id": "fcafb94e-c5ed-4781-8c35-aec85b49f899", "text": "12", "isCorrect": false}, {"id": "e4c6f609-8352-41f1-a9b3-3e4a9d327735", "text": "20", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '6e1644f3-cd12-4a3c-acf4-4c093985a4b6',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '49. óra: Matematikai játékok',
        'Gondolkodtató törttani feladatok, rejtvények és páros játékok.',
        'Matematika',
        '5. osztály',
        'Törtek',
        '[{"id": "722f70c3-3f7f-46cd-ac59-0042e629a10e", "text": "Melyik tört az egyetlen kakukktojás (értéke nem egyenlő a többivel)?", "type": "multiple-choice", "options": [{"id": "975276ff-a42a-4833-9a7a-cef312f4ee53", "text": "3/4", "isCorrect": false}, {"id": "533b8704-bd0a-4f68-a0db-b57b35891de9", "text": "6/8", "isCorrect": false}, {"id": "1fcd3ec2-5386-4368-a3c6-b9ed855d0ce4", "text": "9/12", "isCorrect": false}, {"id": "8c22dc1f-6c48-4318-a65d-61a3e4ef493b", "text": "4/5", "isCorrect": true}], "timeLimit": 15}, {"id": "66001753-6dc1-4bf4-b24b-c1848318f16a", "text": "Peti megevett egy csoki 1/3-át, Dani az 1/4-ét. Ki evett többet?", "type": "multiple-choice", "options": [{"id": "4dda1363-eae9-4a7a-aa6a-2d38c32bcc08", "text": "Peti (mert az 1/3 nagyobb mint az 1/4)", "isCorrect": true}, {"id": "76e1906a-6b06-40da-9f92-479ed946a2f4", "text": "Dani", "isCorrect": false}, {"id": "c30b79c2-e39a-4ae9-9b01-d37c1432a683", "text": "Ugyanannyit ettek", "isCorrect": false}, {"id": "35859303-fde2-48d8-8ad6-f440bec224dc", "text": "Nem lehet eldönteni", "isCorrect": false}], "timeLimit": 15}, {"id": "4c3d4e7e-9773-4c61-9d0c-cb65a1114cd5", "text": "Ha egy szám 1/2 részének a 1/2 része 5, melyik az a szám?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "20"}, {"id": "bf31a5fa-12d4-4b4e-a0c4-92c9970afb72", "text": "A 0/5 tört értéke 0.", "type": "true-false", "options": [{"id": "3f495e90-301d-4d46-bee3-e0f0d60faba7", "text": "Igaz", "isCorrect": true}, {"id": "bf31e54f-716b-4efd-878c-07718531e4c7", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "99235453-c76c-42d7-9558-f599060f077f", "text": "Egy tört számlálóját megduplázzuk, nevezőjét megduplázzuk. Változik-e a tört értéke?", "type": "true-false", "options": [{"id": "48b48fc5-1ee4-4c96-9535-0534e0f7a414", "text": "Igaz (változik)", "isCorrect": false}, {"id": "1d4d214e-3bf0-448c-bb56-88c9eb1c5fc5", "text": "Hamis (nem változik, mert ez bővítés 2-vel)", "isCorrect": true}], "timeLimit": 15}, {"id": "393a2065-7022-4565-9800-ea726ed03cd9", "text": "Hány negyedből áll 2 és fél (2 egész 1/2)?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "10"}, {"id": "8683299b-0a2b-4dae-bb58-1299d96e7d51", "text": "Ha a fél tortát elharmadoljuk, a teljes torta hányad részét kapjuk?", "type": "multiple-choice", "options": [{"id": "546afb94-df7a-4f05-b8b5-ea6d00510e59", "text": "1/6", "isCorrect": true}, {"id": "ae38860c-1c8a-4e36-be74-91f2846b1883", "text": "1/5", "isCorrect": false}, {"id": "a4921754-1128-449c-ab76-7dd3ecd34151", "text": "1/3", "isCorrect": false}, {"id": "a8764e79-e363-4081-950a-c64ad059cc16", "text": "2/3", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'dc9aa1a7-1a78-4d71-888b-ba03af2d88a0',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '50. óra: Tizedes törtek',
        'Tizedes törtek jelentése, olvasása, írása és helyi értékei.',
        'Matematika',
        '5. osztály',
        'Törtek',
        '[{"id": "dcb7583c-d6c8-4697-94f9-faa0dc17e210", "text": "Mi választja el a tizedes törtben az egész részt a tört résztől?", "type": "multiple-choice", "options": [{"id": "5d5e5464-e778-4bf1-9f06-bacad62c260e", "text": "Törtvonal", "isCorrect": false}, {"id": "c19208be-93ba-40f8-ba5d-7d7339ae5017", "text": "Tizedesvessző", "isCorrect": true}, {"id": "9ca40826-9b6b-4872-95dd-086469bbef54", "text": "Kettőspont", "isCorrect": false}, {"id": "da11cfe8-cd94-4031-8668-9ad27c15a421", "text": "Szóköz", "isCorrect": false}], "timeLimit": 15}, {"id": "6ff66711-4cb4-4a23-b412-efe814e8ef03", "text": "Hogy hívjuk a tizedesvessző utáni első helyi értéket?", "type": "multiple-choice", "options": [{"id": "36a6b384-73f7-4c34-b56f-d851f387c39e", "text": "Század", "isCorrect": false}, {"id": "6352405b-5fbb-48c2-b84a-06f80cd8f44d", "text": "Tized", "isCorrect": true}, {"id": "bd75c0b0-395a-44fd-8f5f-3ca2e789bdf1", "text": "Ezred", "isCorrect": false}, {"id": "2a4c4dc1-de9d-4005-b3e5-fbdde82f5b84", "text": "Tízes", "isCorrect": false}], "timeLimit": 15}, {"id": "dfa9773d-343f-4e75-a63b-1d33f60c101d", "text": "Írd le tizedes tört alakban az 3/10 törtet! (pl: 0,3 vagy 0.3)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "0,3"}, {"id": "5af00522-1803-49a2-afc7-e9dfa1838a29", "text": "A 0,05 tizedes tört értéke 5 tized.", "type": "true-false", "options": [{"id": "3250bf46-b6e9-4445-b610-0ff185dd8136", "text": "Igaz", "isCorrect": false}, {"id": "fc0157c6-df34-411c-b574-4e9dcf73d412", "text": "Hamis (ez 5 század)", "isCorrect": true}], "timeLimit": 15}, {"id": "e4bd9217-9a8f-4af5-8f47-d92f0c2fc151", "text": "Melyik tizedes tört felel meg az 7/100 törtnek?", "type": "multiple-choice", "options": [{"id": "72ae10ae-656c-436e-a4a7-6f2eab04ac16", "text": "0,7", "isCorrect": false}, {"id": "569b3d1a-89cb-4f57-84c3-523e8f8ac288", "text": "0,07", "isCorrect": true}, {"id": "0ee4f67c-2ce8-436a-a83c-7ee32c63ef54", "text": "0,007", "isCorrect": false}, {"id": "74493550-c14b-41a4-8b81-90fbcbadf5e4", "text": "7,0", "isCorrect": false}], "timeLimit": 15}, {"id": "508a2566-542e-4c9d-98f3-d2df12458624", "text": "A 4,56 számban a 6-os a századok helyén áll.", "type": "true-false", "options": [{"id": "187ac6ef-b608-4b63-915d-19daf798175a", "text": "Igaz", "isCorrect": true}, {"id": "964de163-b56d-475d-b45e-bdc6ea7c6366", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "d36055be-0e84-4174-9b97-be093e2f82e0", "text": "Írd le tizedes tört alakban: 2 egész és 5 tized (pl: 2,5)!", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "2,5"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '54a0e2b1-e83e-43f9-b05c-ec821cd78356',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '51. óra: Tizedes törtek ábrázolása, kerekítése és összehasonlítása',
        'Tizedes törtek elhelyezése számegyenesen, összehasonlítás és kerekítés.',
        'Matematika',
        '5. osztály',
        'Törtek',
        '[{"id": "352847c7-424a-4e02-8a1a-8dd6d2a823cc", "text": "Melyik tizedes tört a nagyobb: a 0,45 vagy a 0,5?", "type": "multiple-choice", "options": [{"id": "247d6d38-8d5b-41c7-a498-43d709325bf9", "text": "0,45", "isCorrect": false}, {"id": "ebc0d91c-995e-4066-b7c0-b504b1e0a25f", "text": "0,5 (mert 0,50 > 0,45)", "isCorrect": true}, {"id": "87a55fc8-7f02-4a57-8e5b-4d934dffd52a", "text": "Egyenlőek", "isCorrect": false}, {"id": "726aafae-d444-47f2-abe5-fe82b3132906", "text": "Nem összehasonlíthatóak", "isCorrect": false}], "timeLimit": 15}, {"id": "d2f1e342-dfdd-4ea9-aebf-fa1e20b4495c", "text": "Kerekítsd a 3,47 tizedes törtet tizedekre!", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "3,5"}, {"id": "e96d9372-d66a-4c66-be64-33ae92eec2a1", "text": "Ha a kerekítendő helyi érték után 5 áll, felfelé kerekítünk.", "type": "true-false", "options": [{"id": "89cf475d-352e-41a7-87a1-767cff3a512b", "text": "Igaz", "isCorrect": true}, {"id": "31461a17-0794-435e-bfe5-6eb93027638e", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "0a6fe378-aac4-435d-ab9d-00f03a6f7960", "text": "Kerekítsd a 12,82 tizedes törtet egészekre!", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "13"}, {"id": "3c704131-4668-4bf6-88c3-e76f40b1ac92", "text": "A 0,300 tizedes tört értéke megegyezik a 0,3 értékével.", "type": "true-false", "options": [{"id": "ba33d683-6353-4172-844a-ccc38ffb6974", "text": "Igaz", "isCorrect": true}, {"id": "f9bc5305-9431-487d-bd46-c7da3d356b6a", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "a9f5dce8-5eeb-4677-abe9-da1a829a1c5c", "text": "Melyik szám áll a 2,3 és a 2,4 között a számegyenesen?", "type": "multiple-choice", "options": [{"id": "ec1fa9be-8b57-4b67-9425-1318c49579eb", "text": "2,25", "isCorrect": false}, {"id": "a8ebcc12-25c9-4894-bd48-b6c45e8017d2", "text": "2,35", "isCorrect": true}, {"id": "71c2604d-0303-46c6-919e-82cc7b3184b8", "text": "2,45", "isCorrect": false}, {"id": "83026454-f195-4d46-aa64-993650fce62a", "text": "2,5", "isCorrect": false}], "timeLimit": 15}, {"id": "4efc26ea-f6f1-43f8-86e7-4a9ac7e8ea06", "text": "Rendezd növekvő sorrendbe a következőket: 0,2; 0,15; 0,25! Melyik a legkisebb?", "type": "multiple-choice", "options": [{"id": "36b6c7b9-92b4-4748-8464-cde90d59456a", "text": "0,15", "isCorrect": true}, {"id": "87862433-75ee-474e-8e30-b0fd351c37e8", "text": "0,2", "isCorrect": false}, {"id": "fd2d0506-34f8-4fd8-9258-ed389a965aae", "text": "0,25", "isCorrect": false}, {"id": "38d3f302-44a1-4d69-b460-ac38ddb94e27", "text": "Egyenlőek", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'f41ea26e-d784-4838-aa6b-0b727ac82c93',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '52. óra: Tizedes törtek összeadása és kivonása',
        'Írásbeli és fejbeni összeadás, kivonás tizedes törtekkel.',
        'Matematika',
        '5. osztály',
        'Törtek',
        '[{"id": "007f10cc-adbc-4e7d-8bc4-73cec9abdffa", "text": "Írásbeli összeadásnál és kivonásnál mire kell figyelni a tizedesvessző elhelyezésénél?", "type": "multiple-choice", "options": [{"id": "06c2ea5b-31f8-4b40-ba53-4a4f1a6acd27", "text": "A tizedesvesszők pontosan egymás alá kerüljenek", "isCorrect": true}, {"id": "5f867f88-4236-4a0a-b996-54dda46f28b4", "text": "Jobbra kell tolni a tizedesvesszőt", "isCorrect": false}, {"id": "42283bca-ce77-4fa7-94cb-c7794c4c52b8", "text": "Nem kell kiírni a tizedesvesszőt", "isCorrect": false}, {"id": "a84327ef-82b5-4f59-b4b0-0d17da75048e", "text": "Mindig a szám legvégére kerül", "isCorrect": false}], "timeLimit": 15}, {"id": "fb3dea1d-1201-476f-8ee2-ccd0183b5b83", "text": "Számítsd ki fejben: 2,4 + 1,5 = ?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "3,9"}, {"id": "3427e807-1c90-4196-8c13-94a5bfb8897b", "text": "Számítsd ki fejben: 5,8 - 2,3 = ?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "3,5"}, {"id": "017efefc-f33b-40ec-a6a3-0e93a73adb0c", "text": "A 0,7 + 0,5 összeadás eredménye 1,2.", "type": "true-false", "options": [{"id": "f5f2bc20-1066-4203-b521-e29ef30b849d", "text": "Igaz", "isCorrect": true}, {"id": "bb9fc5d2-e2eb-490b-b422-bc0fedad07e7", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "3abac8c3-049d-4821-85a9-6166afe99182", "text": "Mennyi a 10 - 3,4 kivonás eredménye?", "type": "multiple-choice", "options": [{"id": "e016adb9-a574-4a1d-968d-7a75119a2549", "text": "7,6", "isCorrect": false}, {"id": "949a261a-a877-4fa0-b46f-eff31e2b41c1", "text": "6,6", "isCorrect": true}, {"id": "eb7ffee1-2bc0-4e5c-a6e0-c9fb94a6c654", "text": "6,4", "isCorrect": false}, {"id": "2fe3d2bb-b12b-4957-81e5-4a7ecbb0da62", "text": "7,4", "isCorrect": false}], "timeLimit": 15}, {"id": "5b37fef8-527d-41ad-a16e-318811c13218", "text": "Tizedes törtek kivonásánál szükség esetén pótolhatjuk a hiányzó tizedesjegyeket nullákkal.", "type": "true-false", "options": [{"id": "8785e4e3-02c7-42c8-ad6a-7860f666a622", "text": "Igaz", "isCorrect": true}, {"id": "761453c7-04fe-4447-8e73-036d47e2fea2", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "c2dcfcf6-00df-4514-b4ea-905b8d5dc3e2", "text": "Számítsd ki írásban: 14,25 + 6,8 = ?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "21,05"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );