INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'a7c8ade0-9d98-475c-a4e2-b9bb0c55b227',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '128. óra: Az egész számokról tanultak összefoglalása',
        'Év végi ismétlés: műveletek egész számokkal, előjelek, ellentett, abszolút érték.',
        'Matematika',
        '5. osztály',
        'Év végi ismétlés',
        '[{"id": "5da744ab-6c32-4772-bb9e-d2c8fb642b06", "text": "Mennyi (-7) + (+12)?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "5"}, {"id": "039b513c-04d8-4da9-9fdc-c769bffb6095", "text": "Mennyi (-5) * (-4)?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "20"}, {"id": "536f5483-87d6-47f6-885a-3460bcef0781", "text": "Mennyi |-15| (a -15 abszolút értéke)?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "15"}, {"id": "5674d0e8-82fe-4097-a82f-012652eed697", "text": "Két negatív szám szorzata mindig pozitív szám.", "type": "true-false", "options": [{"id": "91be9fbf-ea6b-4ce4-bd68-a060507bd9ac", "text": "Igaz", "isCorrect": true}, {"id": "889d9497-af8b-445a-8cb5-5368ef1d10e7", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "4b8757d1-6b27-42c1-9593-c9776e6da870", "text": "Mennyi (-20) : (+4)?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "-5"}, {"id": "c622ab02-e989-489a-a17f-88f4e6afcc35", "text": "Melyik szám nagyobb: -10 vagy -3?", "type": "multiple-choice", "options": [{"id": "53cca3e1-5125-42ba-8fc1-ee5f698083f3", "text": "-3", "isCorrect": true}, {"id": "3536969b-8350-43f6-8783-531ba4b973ab", "text": "-10", "isCorrect": false}, {"id": "c6a583b1-d235-47f4-b958-0a20b77d653f", "text": "Egyenlőek", "isCorrect": false}, {"id": "73f181e4-397f-4080-b1f0-8378a21dd9d3", "text": "Nem hasonlítható össze", "isCorrect": false}], "timeLimit": 15}, {"id": "903bd74c-8d86-4a15-9af7-8a6f7c0c4c02", "text": "A nullának nincs előjele, és abszolút értéke 0.", "type": "true-false", "options": [{"id": "72dc422c-9035-42dc-bcb2-5c3afee519cf", "text": "Igaz", "isCorrect": true}, {"id": "0cab998e-1207-4149-a98e-b66275883ac5", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '74255bb8-fb40-4444-a50a-2e38bac69398',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '129. óra: A törtekről tanultak összefoglalása I.',
        'Év végi ismétlés: közönséges törtek értelmezése, bővítés, egyszerűsítés, összeadás.',
        'Matematika',
        '5. osztály',
        'Év végi ismétlés',
        '[{"id": "ed9c98ce-e2fd-41c9-b3e1-aca02cae0e62", "text": "Mennyi 1/4 + 2/4?", "type": "multiple-choice", "options": [{"id": "c1566155-857a-4e04-96df-64ef710ea6ff", "text": "3/4", "isCorrect": true}, {"id": "f408876c-537d-4be4-8928-d99fead0b47f", "text": "3/8", "isCorrect": false}, {"id": "a3f4911a-9e35-45ac-8939-408be2505f6b", "text": "1/2", "isCorrect": false}, {"id": "afa055ab-8424-4aee-a645-e3e777a36366", "text": "2/4", "isCorrect": false}], "timeLimit": 15}, {"id": "2e727b80-bc0e-4b45-8e9a-79485000584f", "text": "Mennyi a 2/3 bővítve 3-mal?", "type": "multiple-choice", "options": [{"id": "d2dbf9eb-eb75-4976-ba5c-4edc73cf1dfb", "text": "6/9", "isCorrect": true}, {"id": "87cb8c62-47d4-42a7-9533-0f6c0ad91833", "text": "5/6", "isCorrect": false}, {"id": "7aed9ffa-3531-4b27-87a2-a48b75c88c05", "text": "2/9", "isCorrect": false}, {"id": "94f7e884-3ed0-4e11-b435-7e03bdac8745", "text": "6/3", "isCorrect": false}], "timeLimit": 15}, {"id": "3971684e-8110-4ecf-8e58-adcf639ada0d", "text": "Mennyi a 4/8 egyszerűsített alakja?", "type": "multiple-choice", "options": [{"id": "7be290b6-f9fb-4a50-902e-281b12292980", "text": "1/2", "isCorrect": true}, {"id": "0d91b4e8-55e8-4997-8c53-2708f683a920", "text": "2/4", "isCorrect": false}, {"id": "588f1f28-6409-4652-b38d-744914bd77d9", "text": "1/4", "isCorrect": false}, {"id": "d4927737-ff3b-4149-b36e-f0e5aa692ca9", "text": "4/2", "isCorrect": false}], "timeLimit": 15}, {"id": "95ca4b9f-643e-4b08-9a1a-4f18edea5a7b", "text": "Az azonos nevezőjű törteket úgy adjuk össze, hogy a számlálókat összeadjuk, a nevező változatlan marad.", "type": "true-false", "options": [{"id": "d299d386-3a19-438b-a476-356c71c8b567", "text": "Igaz", "isCorrect": true}, {"id": "13e33da5-75b6-4870-8f38-5bb68ee1d96c", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "404560d1-65f7-4346-85ab-caca3d143484", "text": "Hány negyed van 2 egészben?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "8"}, {"id": "d410e6cc-edc6-4667-adbf-aad67fcb69b1", "text": "Melyik törtszám nagyobb: 3/5 vagy 1/5?", "type": "multiple-choice", "options": [{"id": "3ff7a65c-c10e-473b-a625-a411e6d485b2", "text": "3/5", "isCorrect": true}, {"id": "7a065ba6-6802-4163-9ec8-77c98beaa54d", "text": "1/5", "isCorrect": false}, {"id": "0975018c-d1b5-4eef-a986-24d3db2481c0", "text": "Egyenlőek", "isCorrect": false}, {"id": "522eed3b-9c4d-4d1a-bc95-82e006351805", "text": "Nem eldönthető", "isCorrect": false}], "timeLimit": 15}, {"id": "f0471a1a-0750-4bb2-9e00-70654e359bf9", "text": "A törtvonal osztást jelent.", "type": "true-false", "options": [{"id": "4790a214-db2c-4eed-a5d5-d76cde99efec", "text": "Igaz", "isCorrect": true}, {"id": "439acf33-1ef4-4d88-8003-076e235edbd2", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '11b1a8c8-bf0f-4378-b737-3ed88e75ee0b',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '130. óra: A törtekről tanultak összefoglalása II.',
        'Év végi ismétlés: tizedes törtek, műveletek, kerekítés.',
        'Matematika',
        '5. osztály',
        'Év végi ismétlés',
        '[{"id": "ca68b69b-504a-47e3-8b2f-bbc0512ef471", "text": "Mennyi 2,5 + 3,7?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "6.2"}, {"id": "5ab41cf1-e42e-42b6-a8fc-21a4b88713da", "text": "Mennyi 5,8 - 2,3?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "3.5"}, {"id": "a5e2fa8b-8e59-4db8-b72a-acc3ccc56dd6", "text": "Mennyi 0,4 átírva közönséges tört alakba?", "type": "multiple-choice", "options": [{"id": "21337a08-3d16-411d-9c44-ca3fd8b6cb42", "text": "4/10 (vagy 2/5)", "isCorrect": true}, {"id": "743cea57-68ff-4c27-ab99-cfc7ed13d44c", "text": "4/100", "isCorrect": false}, {"id": "2e05e604-ddb0-4fb6-94df-ee080c02c07c", "text": "1/4", "isCorrect": false}, {"id": "0e23a92b-06a6-42c6-8e6a-5945a7328849", "text": "4/1", "isCorrect": false}], "timeLimit": 15}, {"id": "213455c7-83d6-4d65-a356-2d5fc9141ee5", "text": "A 3,46 tizedekre kerekített értéke 3,5.", "type": "true-false", "options": [{"id": "0a16c80c-4266-469d-b67e-f5e821338792", "text": "Igaz (mert a 6 miatt felfelé kerekítünk)", "isCorrect": true}, {"id": "8b1ffc5a-4ba3-488d-937c-672dcf96dbca", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "9364ce68-2718-41aa-9c42-3863d4f80447", "text": "Mennyi 1,2 * 10?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "12"}, {"id": "4fb551e7-b228-43b4-8f66-b90506884adc", "text": "Mennyi 45,6 : 10?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "4.56"}, {"id": "bc013844-cdab-4cb7-9ef4-ccc485af5988", "text": "Tizedes törtek összeadásakor a tizedesvesszőket egymás alá kell igazítani.", "type": "true-false", "options": [{"id": "cf7c51bd-4bfb-4c6a-8c76-4bcda87a1107", "text": "Igaz", "isCorrect": true}, {"id": "25a8a71e-6c6e-42e7-b667-263ee7f11558", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'fd23cdb5-a331-4aeb-9ebe-7384132c1dad',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '131. óra: A geometriai ismeretek összefoglalása',
        'Év végi ismétlés: alakzatok, szögek, tengelyes tükrözés, testek.',
        'Matematika',
        '5. osztály',
        'Év végi ismétlés',
        '[{"id": "47e477c1-957e-42ff-99e7-63826d77d5c7", "text": "Mennyi a háromszög belső szögeinek összege?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "180"}, {"id": "1d8911a9-7ee1-4ab9-97cf-af3846585148", "text": "Milyen szög a 90°-os szög?", "type": "multiple-choice", "options": [{"id": "bf0bd237-bb5c-41a5-a5b2-6223b72c8f6b", "text": "Derékszög", "isCorrect": true}, {"id": "63b14ebc-0d42-4a02-882a-10131e98ac89", "text": "Hegyesszög", "isCorrect": false}, {"id": "c855b422-67f6-4d4f-a9a3-b05d49fd2bc3", "text": "Tompaszög", "isCorrect": false}, {"id": "ea6bc4df-7eef-455f-b05e-b3243bcfccea", "text": "Egyenesszög", "isCorrect": false}], "timeLimit": 15}, {"id": "1e68bcc7-2893-407e-8177-cff7c006ac6b", "text": "A tengelyes tükrözés távolságtartó és szögtartó transzformáció.", "type": "true-false", "options": [{"id": "067cdff1-4d28-423c-bba1-9da452b721e9", "text": "Igaz", "isCorrect": true}, {"id": "2516b562-4cff-44cf-adef-1a7cffc0de45", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "4d95305f-204f-4ecb-8cf8-3f5ad7ce5188", "text": "Hány csúcsa van a kockának?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "8"}, {"id": "434dc990-41f1-4096-9b11-c1c99367fad0", "text": "Hány lapja van a téglatestnek?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "6"}, {"id": "22776f4c-f102-43a6-bbab-cb2e8ffea5e5", "text": "A téglalap átlói egyenlő hosszúak és felezik egymást.", "type": "true-false", "options": [{"id": "9d316857-0e51-4f6a-8ada-01d17a8538de", "text": "Igaz", "isCorrect": true}, {"id": "39403f34-47b3-45a1-b527-6163414917a6", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "20f5b04a-8646-4db2-9479-71fcc3471192", "text": "Milyen szög a 45°-os szög?", "type": "multiple-choice", "options": [{"id": "75fe2191-afaa-483d-b00e-fc84d4a2431c", "text": "Hegyesszög", "isCorrect": true}, {"id": "4530be8a-654d-4165-a3ff-d1c714998a21", "text": "Derékszög", "isCorrect": false}, {"id": "777da45c-55a3-4e6b-a828-bbceb65a02df", "text": "Tompaszög", "isCorrect": false}, {"id": "5593f151-0906-472a-8cb3-e83fe5059edd", "text": "Homorúszög", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '11a46112-7089-413d-a156-088ab3866bfc',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '132. óra: Mérések, terület, térfogat ismétlése',
        'Év végi ismétlés: kerület, terület, felszín, térfogat számítása.',
        'Matematika',
        '5. osztály',
        'Év végi ismétlés',
        '[{"id": "cd4252be-36cf-4677-a520-6e61e9c4cdd5", "text": "Mennyi a 6 cm és 4 cm oldalú téglalap területe? (cm²-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "24"}, {"id": "46453e30-2587-4e1c-910e-a6e6d7b60620", "text": "Mennyi a 6 cm és 4 cm oldalú téglalap kerülete? (cm-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "20"}, {"id": "d872729e-4160-4c79-891a-b83640b0b334", "text": "Mennyi a 3 cm élű kocka térfogata? (cm³-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "27"}, {"id": "9f34416b-9e6e-4c96-b0e4-ab940970570f", "text": "Mennyi a 3 cm élű kocka felszíne? (cm²-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "54"}, {"id": "549eb125-f1a8-478b-89dc-fd515786028a", "text": "1 liter víz térfogata pontosan 1 köbdeciméter (1 dm³).", "type": "true-false", "options": [{"id": "69f0d910-34a5-42d5-b2de-7873b0dcb0e1", "text": "Igaz", "isCorrect": true}, {"id": "8c89f244-04dc-4685-98ef-dda0052f51bf", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "69a4ac80-2f21-4140-b80e-7b8f08e45999", "text": "Hány mm² 1 cm²?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "100"}, {"id": "6225178e-73e9-4e3d-a4b2-0032a1fc0ea8", "text": "Hány dm³ 1 m³?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "1000"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '2654acb3-5f7c-4f32-afe8-bb7274156bbb',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '133. óra: Helymeghatározás és sorozatok ismétlése',
        'Év végi ismétlés: koordináta-rendszer és sorozatok feladatai.',
        'Matematika',
        '5. osztály',
        'Év végi ismétlés',
        '[{"id": "ada5b947-a06d-4a92-8e2c-ba7f22d2428a", "text": "Hol van a P(0; -5) pont?", "type": "multiple-choice", "options": [{"id": "1dc4b6a7-bc38-413f-8aef-6d5ae45111f2", "text": "Az y (függőleges) tengelyen", "isCorrect": true}, {"id": "8f680017-fb2a-4160-9980-3371a51d5988", "text": "Az x tengelyen", "isCorrect": false}, {"id": "5e2aab83-fd8b-48b8-a865-c356b24a55bf", "text": "Az origóban", "isCorrect": false}, {"id": "04b0578c-b6dc-400f-ad54-00a3cde7048c", "text": "Az I. síknegyedben", "isCorrect": false}], "timeLimit": 15}, {"id": "b8c1add0-01d6-435a-bb06-09756fd26733", "text": "Mi a hiányzó szám a sorozatban? 3, 9, 27, __, 243", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "81"}, {"id": "d4778827-ab22-4f74-842a-03830bd436ec", "text": "Az origó koordinátái a (0; 0).", "type": "true-false", "options": [{"id": "1cb0004b-7125-4964-83bc-6f7afcf2e2de", "text": "Igaz", "isCorrect": true}, {"id": "b2c16192-aba8-4f65-898d-57e367f3507d", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "7efeed06-957d-4f32-ae3b-8175f01f6834", "text": "Mi a következő szám a Fibonacci-sorozatban: 1, 1, 2, 3, 5, 8, 13, __?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "21"}, {"id": "ae3ecaed-a118-4ef9-9f6b-9389c66ebdca", "text": "A koordináta-rendszerben az x az első, az y a második koordináta.", "type": "true-false", "options": [{"id": "d1ff554e-47a6-4d7d-9ca3-84ab16e2ea7c", "text": "Igaz", "isCorrect": true}, {"id": "60a8ac02-fb5f-404c-9e69-2cbb3ce0c1c2", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "bf895673-c904-485e-9ef8-347eb73e2aca", "text": "Mi a szabálya a 100, 85, 70, 55 sorozatnak?", "type": "multiple-choice", "options": [{"id": "da9f5df0-4f6c-4310-88fd-f46950e9259f", "text": "Kivonás 15-tel (-15)", "isCorrect": true}, {"id": "f5b99299-b250-4318-8f43-a0bcc235458f", "text": "Kivonás 10-zel", "isCorrect": false}, {"id": "033470ad-a1ed-4786-b5ea-5b5724307a51", "text": "Osztás 2-vel", "isCorrect": false}, {"id": "ad98ae5e-e67a-41a6-b233-6457ddb29c97", "text": "Hozzáadás 15-tel", "isCorrect": false}], "timeLimit": 15}, {"id": "d1c82839-4e47-4e9a-98e8-3c66512b398b", "text": "Hány síknegyedre osztja a koordináta-rendszer a síkot?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "4"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'b6e0c015-bc67-4267-94ab-5d9846c402e4',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '134. óra: Mérés, arányosság, szöveges feladatok ismétlése',
        'Év végi ismétlés: egyenes arányosság, mértékegységek és szöveges feladatok.',
        'Matematika',
        '5. osztály',
        'Év végi ismétlés',
        '[{"id": "3cdd54f7-4b16-48e3-82a9-ae18bbe78624", "text": "Ha 4 kg alma 1600 Ft, mennyibe kerül 7 kg alma? (Ft-ban)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "2800"}, {"id": "9ece0126-0c26-466b-a544-bc121f21008e", "text": "Hány gramm 4,2 kg?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "4200"}, {"id": "9c068030-23ff-4e91-bca5-f13fec4ce6ec", "text": "Hány perc 2 óra 40 perc?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "160"}, {"id": "c48bd6a0-c0fe-4190-b024-75029739c6ce", "text": "Melyik szám teszi igazzá: 3 * x - 5 = 10?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "5"}, {"id": "26ea9c08-19ba-4b82-84a1-8d0eea2e1729", "text": "Egyenes arányosságnál ha a mennyiség megduplázódik, az ára is megduplázódik.", "type": "true-false", "options": [{"id": "d8db08c6-d62d-4bd9-ab89-aa72898049e8", "text": "Igaz", "isCorrect": true}, {"id": "e87e555b-ec92-42bc-bcda-e091ffc25f7e", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "d5680843-c376-4072-87dd-be635a3d7bbb", "text": "Gondoltam egy számot, elosztottam 4-gyel, hozzáadtam 6-ot, 11-et kaptam. Mi volt a szám?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "20"}, {"id": "f2ab0259-3436-4792-bac1-a9906e852fe9", "text": "Hány dl 1,5 liter üdítő?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "15"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '233335b4-3889-48ac-b25e-acb6235cd0fd',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '135. óra: A statisztikából tanultak felelevenítése',
        'Év végi ismétlés: adatok, átlag és valószínűségi események.',
        'Matematika',
        '5. osztály',
        'Év végi ismétlés',
        '[{"id": "ca157c1d-e7a2-48e0-8319-c118347dcdaa", "text": "Mennyi a 12, 14, 16, 18 számok átlaga? (60 / 4)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "15"}, {"id": "6bf59888-b647-4fa1-ae2e-69c70e3d9c2f", "text": "Milyen esemény egy normál dobókockával 6-nál nagyobb számot dobni?", "type": "multiple-choice", "options": [{"id": "393b489d-2ea9-4a88-a653-ec2353f7c24a", "text": "Lehetetlen esemény", "isCorrect": true}, {"id": "005e65be-ffd3-4c99-934e-bf2ffa525a37", "text": "Biztos esemény", "isCorrect": false}, {"id": "2332f434-dc42-40dc-a636-1551fe92f021", "text": "Lehetséges esemény", "isCorrect": false}, {"id": "d675a747-0662-4b86-9140-42e30280d559", "text": "Döntetlen esemény", "isCorrect": false}], "timeLimit": 15}, {"id": "0ed3004e-5c29-436e-a74d-0d9047ccd0cb", "text": "Milyen esemény egy dobókockával 1 és 6 közötti számot dobni?", "type": "multiple-choice", "options": [{"id": "4d96be56-063c-479d-ae97-ad93d681f7db", "text": "Biztos esemény", "isCorrect": true}, {"id": "fce5f52b-e840-4fc7-b92a-a9e023c26981", "text": "Lehetetlen esemény", "isCorrect": false}, {"id": "fa4894b8-903b-49e1-8884-692a6887cd8e", "text": "Kétes esemény", "isCorrect": false}, {"id": "ec7d77c0-0b4d-441e-b5eb-9b4e2af2c51a", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "a91f9600-cc02-4eb6-8ec1-15254c35ea07", "text": "Az oszlopdiagram segítségével könnyen összehasonlíthatók a mért adatok.", "type": "true-false", "options": [{"id": "842b9ddb-f82a-4015-ba8b-98c907b5cbb2", "text": "Igaz", "isCorrect": true}, {"id": "e27f7a69-a87e-49ed-a551-d7ea30eab4e7", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "78e442d7-b18f-4aa8-9580-7af77d6cd094", "text": "Mennyi a 25 és 35 számtani közepe?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "30"}, {"id": "aa3bb7cf-60f5-4ebc-8b50-75761d5847f9", "text": "A kördiagram a részek egészhez viszonyított arányát ábrázolja.", "type": "true-false", "options": [{"id": "efe66354-9532-48c3-ab0c-bf378dccf92e", "text": "Igaz", "isCorrect": true}, {"id": "2575f3ae-af87-4e65-bafc-fe090d04271d", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "fd4547b4-e50b-430d-ae8c-6f3dbef96267", "text": "Hány százalék a biztos esemény valószínűsége?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "100"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'a5b937f4-9bd4-47e5-98b8-77cdedd912d6',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '136. óra: Az éves munka értékelése',
        'Az 5. osztályos matematika törzsanyag sikeres teljesítésének értékelése.',
        'Matematika',
        '5. osztály',
        'Év végi ismétlés',
        '[{"id": "f931d4b5-7d2a-4872-bf38-0cfd9a4e4a57", "text": "Mely főbb témakörökkel foglalkoztunk 5. osztályban?", "type": "multiple-choice", "options": [{"id": "1e559932-32a1-40bf-bfa2-5da53e05ab18", "text": "Egész számok, törtek, geometria, mérések, sorozatok, statisztika", "isCorrect": true}, {"id": "b6647f14-7a6f-48a7-a171-a6e29df99f48", "text": "Bonyolult egyenletrendszerek", "isCorrect": false}, {"id": "4cbc5ba5-8a9c-460b-8350-c2d4cb09c716", "text": "Trigonometria", "isCorrect": false}, {"id": "08dd618a-4523-4b96-b3db-f5e0dfdefdf5", "text": "Integrálszámítás", "isCorrect": false}], "timeLimit": 15}, {"id": "236db9ba-c00d-4153-bce6-2b72dec99590", "text": "A rendszeres szorgalom és gyakorlás a matematikai siker kulcsa.", "type": "true-false", "options": [{"id": "e54ffbfd-c142-47d9-ab78-d566e6723d10", "text": "Igaz", "isCorrect": true}, {"id": "82514496-84d1-447b-8c7e-7cfe0c1d2fba", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "89fca493-18e3-47a0-bc10-b3b5e5a82803", "text": "Hány órából állt az 5. osztályos teljes tanév matematika tananyaga?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "136"}, {"id": "35eccfbc-600a-4845-ac71-f7bb91341537", "text": "A megszerzett matematikai tudás a mindennapi életben (vásárlás, mérések, tervezés) is használható.", "type": "true-false", "options": [{"id": "67ea69dd-cfbc-4816-be54-22b035e1bdf9", "text": "Igaz", "isCorrect": true}, {"id": "7b03c1b1-2ef0-4852-b38b-d9af930d21f5", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "bef0bdc4-77c6-4335-ad08-d0b5db53db2f", "text": "Gratulálunk az 5. osztályos matematika tananyag sikeres elvégzéséhez!", "type": "true-false", "options": [{"id": "32bdc143-92bd-44e6-ab12-690eb79178cf", "text": "Igaz", "isCorrect": true}, {"id": "09d54249-4198-4069-bfd7-64bf14f32cb3", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "665a976c-ed8b-4a4d-828a-66a77d6c5cf5", "text": "A következő tanévben (6. osztály) az itt megszerzett alapokra építünk tovább.", "type": "true-false", "options": [{"id": "d8403136-e664-4f73-a144-a207255a0b8a", "text": "Igaz", "isCorrect": true}, {"id": "7a5d3f91-7bc6-42c1-8ea9-2fd770d0c8f3", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "d6f05e82-f7e2-4797-a2cf-d35d9f03360b", "text": "Melyik volt a kedvenc témaköröd?", "type": "multiple-choice", "options": [{"id": "8030d916-9818-4dc4-be89-b9f7c2603c4f", "text": "Mindegyik témakör hasznos és érdekes volt!", "isCorrect": true}, {"id": "efaa150b-53b4-45b2-abe4-ea8b917523b0", "text": "Geometria", "isCorrect": false}, {"id": "365e3526-db57-42f8-ab66-aabce0f40036", "text": "Törtek", "isCorrect": false}, {"id": "f2733d6e-56b9-4ace-b641-809e14c72dd0", "text": "Játékok és statisztika", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );