INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '98f722ea-3ad6-4f41-91c5-8eeedb458323',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '53. óra: Tizedes törtek összevonásának gyakorlása',
        'Hétköznapi szöveges feladatok tizedes törtek összeadására és kivonására.',
        'Matematika',
        '5. osztály',
        'Törtek',
        '[{"id": "eca8e5e6-61b4-4e9b-9ffb-145b2de78691", "text": "Kati vett egy füzetet 450,5 Ft-ért és egy tollat 299,5 Ft-ért. Hány forintot fizetett összesen?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "750"}, {"id": "697076de-e958-47f4-b460-890eae09529d", "text": "Egy 5 méteres kötélből levágtak 1,85 métert. Hány méter kötél maradt?", "type": "multiple-choice", "options": [{"id": "500a35cc-68ed-4f26-8dd7-09203643782f", "text": "3,15 m", "isCorrect": true}, {"id": "ed6b3ee9-5415-400d-b9b7-9c12a52d77df", "text": "3,25 m", "isCorrect": false}, {"id": "e04c4908-7a0b-4878-b484-4e10bf27c454", "text": "4,15 m", "isCorrect": false}, {"id": "6140effc-040b-4676-8c03-72790c5d10fd", "text": "3,85 m", "isCorrect": false}], "timeLimit": 15}, {"id": "345a722e-fbac-4ec9-86e1-390ddac1b5d5", "text": "Mennyi a 3,5 + 2,8 - 1,2 kifejezés értéke?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "5,1"}, {"id": "7bc5d4b2-6393-4d2e-9baa-c17eeb26849e", "text": "A 2,5 kg + 1,75 kg összeg kisebb, mint 4 kg.", "type": "true-false", "options": [{"id": "8b191d0c-b947-4142-b9c1-7a85cd85602b", "text": "Igaz (mert 4,25 kg)", "isCorrect": false}, {"id": "6bf773ae-3c48-465b-bafc-1ed83ca1269e", "text": "Hamis (4,25 kg > 4 kg)", "isCorrect": true}], "timeLimit": 15}, {"id": "badfafe9-0958-4c9a-bd98-f3f754e6d623", "text": "Mennyi az 1,25 + 0,75 összeadás eredménye?", "type": "multiple-choice", "options": [{"id": "7e86f678-dea5-4662-90a2-e085acbc7497", "text": "2 (vagy 2,0)", "isCorrect": true}, {"id": "df51815a-1f84-4754-a208-d6fe7f7b7d91", "text": "1,9", "isCorrect": false}, {"id": "60bd878c-4bee-444d-a8ef-e5651c6e9a71", "text": "2,25", "isCorrect": false}, {"id": "8efba93e-22ae-4070-97bf-521e9d26925f", "text": "1,5", "isCorrect": false}], "timeLimit": 15}, {"id": "338c9fdf-58d3-4b3c-9170-66accdd4f8a6", "text": "Ha a 12,4-ből kivonunk 0-t, az eredmény 12,4 marad.", "type": "true-false", "options": [{"id": "3d402021-6e1e-4817-98b6-fbaed74090f2", "text": "Igaz", "isCorrect": true}, {"id": "f30e7fb2-ccb4-4576-8a94-f89220c32135", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "e935c6e8-1cc9-479a-8849-86c763e453ba", "text": "Melyik számot kell a 4,3-hoz adni, hogy 10-et kapjunk? (4,3 + x = 10)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "5,7"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '555765ad-0c14-484d-9bd1-0cd87df1ae72',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '54. óra: Tizedes törtek szorzása természetes számmal',
        'Tizedes törtek szorzása 10, 100, 1000 számmal és egyjegyű természetes számmal.',
        'Matematika',
        '5. osztály',
        'Törtek',
        '[{"id": "06529952-d3e2-41a5-8cc3-02b00c99242d", "text": "Mi történik a tizedesvesszővel, ha egy tizedes törtet 10-zel megszorzunk?", "type": "multiple-choice", "options": [{"id": "5e7455f1-91be-41c6-951b-13fa7193bce2", "text": "Egy hellyel jobbra tolódik", "isCorrect": true}, {"id": "d0b3b52e-bc1a-4ac7-b582-23b2c245d0d4", "text": "Egy hellyel balra tolódik", "isCorrect": false}, {"id": "b4edba0c-70a0-4e27-b8ad-d6773b806db8", "text": "Két hellyel jobbra tolódik", "isCorrect": false}, {"id": "14a548f0-af75-4104-b3fc-a1fc3c21d38b", "text": "Nem változik a helye", "isCorrect": false}], "timeLimit": 15}, {"id": "a32290ec-030c-4143-a4b6-5aa38e4844f5", "text": "Számítsd ki fejben: 3,45 * 10 = ?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "34,5"}, {"id": "cf7fca3a-1413-4f41-8356-8983b8a57cae", "text": "Számítsd ki fejben: 0,12 * 100 = ?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "12"}, {"id": "66ccd24d-6219-442a-8c3e-3a4558a69569", "text": "A 2,5 * 4 szorzás eredménye 10.", "type": "true-false", "options": [{"id": "7fbbc34a-3fe1-409a-b69a-49e7e976823b", "text": "Igaz", "isCorrect": true}, {"id": "7c1e9b75-7fa6-414a-8eb0-5b80ea22f5bb", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "9a2324a8-121e-484d-9eb7-e4b604207cf3", "text": "Mennyi a 1,2 * 3 szorzat értéke?", "type": "multiple-choice", "options": [{"id": "74423741-81c3-44f2-b168-2b23c4b090e2", "text": "3,6", "isCorrect": true}, {"id": "a12d4ac1-3ffc-45f4-a465-c08231b5ce36", "text": "36", "isCorrect": false}, {"id": "2d1d542f-3a6c-480c-bddd-d52449106164", "text": "0,36", "isCorrect": false}, {"id": "73af030e-ca35-4e72-afe6-9b0eacf27fd2", "text": "4,2", "isCorrect": false}], "timeLimit": 15}, {"id": "65a5ebab-e57e-479f-af08-a3f085563d7a", "text": "Ha a 0,007-et megszerezzük 1000-rel, az eredmény 7.", "type": "true-false", "options": [{"id": "4aad66bc-3891-48a0-81d6-87639216f0ad", "text": "Igaz", "isCorrect": true}, {"id": "42441592-2260-4f63-8a1c-9386d5a15225", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "cd411f13-bbbf-424b-89de-e14777c7d662", "text": "Mennyi a 0,4 * 5 szorzás végeredménye?", "type": "multiple-choice", "options": [{"id": "cfd3b0ef-5481-43c0-9c47-ec0f90a5e1dc", "text": "2 (vagy 2,0)", "isCorrect": true}, {"id": "43738403-2da3-430d-ba14-e5c5c5462195", "text": "20", "isCorrect": false}, {"id": "d4e5d73b-38fc-4695-a48d-08a68d5e02c0", "text": "0,2", "isCorrect": false}, {"id": "23a8a126-1309-4724-a289-f04274502e93", "text": "0,02", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '4449403b-4b42-49f8-a9d0-cdd4ec32c92e',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '55. óra: Tizedes törtek szorzása természetes számmal, gyakorlás',
        'Írásbeli szorzás tizedes törttel és szöveges feladatok.',
        'Matematika',
        '5. osztály',
        'Törtek',
        '[{"id": "815d96a1-b243-419d-8774-1c91b25b3c6e", "text": "Egy csoki ára 349,5 Ft. Mennyibe kerül 4 csoki összesen?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "1398"}, {"id": "901b77ad-b03b-4c66-b004-1b6c4c5c8692", "text": "Számítsd ki írásban: 12,34 * 5 = ?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "61,7"}, {"id": "4b7cbc9f-85a7-479c-8019-ba350d6431c3", "text": "Mennyi a 0,05 * 80 szorzat értéke?", "type": "multiple-choice", "options": [{"id": "e9817b7e-b796-4d7d-9e19-0b0f0ee8407d", "text": "4", "isCorrect": true}, {"id": "77205e5c-810d-403f-b21c-a3306c53b523", "text": "40", "isCorrect": false}, {"id": "2e4ed797-1b25-4309-9d06-7ccfd4d42557", "text": "0,4", "isCorrect": false}, {"id": "d4316ea1-40b8-4167-8130-05b1e262198d", "text": "400", "isCorrect": false}], "timeLimit": 15}, {"id": "2217909c-c1fc-4807-868e-2543155c41ee", "text": "Ha egy tizedes törtet 0-val szorzunk, az eredmény mindig 0.", "type": "true-false", "options": [{"id": "49b395fc-8358-472a-8f3d-7a953dce69ae", "text": "Igaz", "isCorrect": true}, {"id": "4f611aec-57df-4972-b1a3-619d40190f28", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "ff2e4156-e063-4f77-90ba-f16e0947f47d", "text": "Mennyi a 6,5 * 6 szorzat értéke?", "type": "multiple-choice", "options": [{"id": "f2fe89f0-d4ec-448a-a3df-012cfa06761b", "text": "39", "isCorrect": true}, {"id": "77833229-f09e-48b7-a366-0dd7f4ef115f", "text": "36,5", "isCorrect": false}, {"id": "a7ea483e-b07a-4e4d-92b9-fc550879e520", "text": "39,5", "isCorrect": false}, {"id": "d5cbce0e-30d8-4cdd-abb2-59e6b2208ea5", "text": "36", "isCorrect": false}], "timeLimit": 15}, {"id": "a60adb49-cbe1-4911-a21e-1c61d28ba7d0", "text": "A 1,5 * 100 szorzat 1500.", "type": "true-false", "options": [{"id": "cd316bc2-e702-41d9-99d6-d86965419efa", "text": "Igaz", "isCorrect": false}, {"id": "5af1022d-8de8-431d-8a9f-72b3e2c03447", "text": "Hamis (150)", "isCorrect": true}], "timeLimit": 15}, {"id": "56d921ec-f63a-440d-9634-35da1341cf1e", "text": "Számítsd ki: 0,25 * 12 = ?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "3"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '459158dc-122f-4520-834a-872ddb8bbd34',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '56. óra: Tizedes törtek osztása pozitív egész számmal',
        'Tizedes törtek osztása 10, 100, 1000 számmal és egész osztóval.',
        'Matematika',
        '5. osztály',
        'Törtek',
        '[{"id": "7bc2cc01-707f-4da9-8ec3-81a0ef878086", "text": "Mi történik a tizedesvesszővel, ha egy tizedes törtet 10-zel elosztunk?", "type": "multiple-choice", "options": [{"id": "d124c450-d1ac-41e8-85d2-4a028a8d5677", "text": "Egy hellyel balra tolódik", "isCorrect": true}, {"id": "a767c077-b9ad-471c-8d5c-e3ed150be62c", "text": "Egy hellyel jobbra tolódik", "isCorrect": false}, {"id": "34fcf064-b230-4a88-a88f-5081f171fa1a", "text": "Két hellyel balra tolódik", "isCorrect": false}, {"id": "044c7206-d19a-44cc-ad4a-44919206c2f2", "text": "Eltűnik", "isCorrect": false}], "timeLimit": 15}, {"id": "6c29896e-3ad1-4b60-b9dd-d669b7610b81", "text": "Számítsd ki fejben: 45,6 / 10 = ?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "4,56"}, {"id": "1612d29a-1637-4fd6-9e33-87e08055b17a", "text": "Számítsd ki fejben: 7,8 / 2 = ?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "3,9"}, {"id": "4e5475b8-e88b-49dc-95f3-47fe384e8241", "text": "A 12,5 / 100 osztás eredménye 0,125.", "type": "true-false", "options": [{"id": "8f1bf70d-52a1-4439-9770-7ea7fa2f4ad3", "text": "Igaz", "isCorrect": true}, {"id": "490aba7d-5fa7-405d-8e8a-9cc90481a2ba", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "a26c4829-f9fc-4032-b5d1-4874df5e8b2e", "text": "Mennyi a 9,6 / 3 osztás hányadosa?", "type": "multiple-choice", "options": [{"id": "730740d1-f48d-4a3a-b4a6-fd38e2d84a5a", "text": "3,2", "isCorrect": true}, {"id": "67f5bd3b-de60-4e48-ae91-b7061c10e2ed", "text": "32", "isCorrect": false}, {"id": "59ae74f8-f7a3-4e94-96f7-ecf4bede0a53", "text": "0,32", "isCorrect": false}, {"id": "9af13627-e00c-4957-acf6-00e793b29233", "text": "3,6", "isCorrect": false}], "timeLimit": 15}, {"id": "671c9604-bf3b-415c-bd70-664d24f43781", "text": "Osztásnál, amikor elérjük a tizedesvesszőt az osztandóban, a hányadosban is kirakjuk a tizedesvesszőt.", "type": "true-false", "options": [{"id": "172e8b61-f179-44a4-95b7-641e0f4d0060", "text": "Igaz", "isCorrect": true}, {"id": "00ed5beb-24b5-4be9-bd5d-ff1b1a22cf8b", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "1fa8caa7-b687-411d-8d32-a472054bc40c", "text": "Mennyi a 0,8 / 4 osztás eredménye?", "type": "multiple-choice", "options": [{"id": "e11783ac-00fa-4718-a47b-51b66c7b621e", "text": "0,2", "isCorrect": true}, {"id": "7e9a9a7e-1573-4da5-b33f-a50507385b9b", "text": "2", "isCorrect": false}, {"id": "0ba9359b-b2f7-47c5-9523-d990f3dd3c20", "text": "0,02", "isCorrect": false}, {"id": "daf39c67-d5a8-4a58-a533-5e3a14dc79ed", "text": "0,4", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '9693fe12-7b69-48cf-8274-3ef059b9650e',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '57. óra: Tizedes törtek osztása természetes számmal, gyakorlás',
        'Írásbeli osztás gyakorlása tizedes törtekkel és maradékos/pontos osztás.',
        'Matematika',
        '5. osztály',
        'Törtek',
        '[{"id": "5cc92d74-bfe6-473e-92c1-3c1133df58b8", "text": "4 egyforma könyv összesen 9,6 kg-ot nyom. Hány kg egy könyv?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "2,4"}, {"id": "96c7a515-57cc-4f6d-9640-8e0df3460115", "text": "Számítsd ki írásban: 15,75 / 5 = ?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "3,15"}, {"id": "a3c34bf0-fde1-419e-ae41-c31361c9e936", "text": "Mennyi a 1 / 4 osztás hányadosa tizedes tört alakban?", "type": "multiple-choice", "options": [{"id": "02cb8c6f-164e-49f7-9f05-4bd4aa19d312", "text": "0,25", "isCorrect": true}, {"id": "4e80594a-2ec6-4c9e-aaf4-e2692be34ef0", "text": "0,4", "isCorrect": false}, {"id": "53e503db-1b82-46e1-b693-2f422c606658", "text": "0,2", "isCorrect": false}, {"id": "b6b1f4e5-7f12-411b-abe8-5d0ab6afdb0f", "text": "0,14", "isCorrect": false}], "timeLimit": 15}, {"id": "b80a19ee-a650-4fcb-9c06-6bf1e6a0026f", "text": "A 3 / 2 osztás eredménye tizedes törtként 1,5.", "type": "true-false", "options": [{"id": "99e40891-a86a-48c1-9b05-da1b7b9c52a0", "text": "Igaz", "isCorrect": true}, {"id": "e52e1e7b-5e8b-46f6-b93e-9dd1f31fee38", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "b3b42682-d575-4e34-90f2-938ef2770656", "text": "Mennyi a 84,8 / 8 osztás hányadosa?", "type": "multiple-choice", "options": [{"id": "d509260b-5085-45d7-b340-33380cbd0d25", "text": "10,6", "isCorrect": true}, {"id": "7f9de1a6-2568-45cb-8558-881f880745b6", "text": "1,6", "isCorrect": false}, {"id": "6ac261c2-4e49-402b-809b-01ab29d4fc0a", "text": "10,8", "isCorrect": false}, {"id": "d7e6b935-68ac-42c5-a560-87035f644146", "text": "106", "isCorrect": false}], "timeLimit": 15}, {"id": "a5cbdf8f-9895-4b88-8635-09e5fbae90d0", "text": "Ha 50 Ft-ot elosztunk 4 gyermek között egyenlően, mindenkinek 12,5 Ft jut.", "type": "true-false", "options": [{"id": "66c97391-d42a-46d8-9bb9-982f42c12a91", "text": "Igaz", "isCorrect": true}, {"id": "7ff2f017-b548-43a1-8e36-87826462efc2", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "c45896ca-3403-44e1-96ee-86921dba57e0", "text": "Számítsd ki: 0,36 / 6 = ?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "0,06"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );