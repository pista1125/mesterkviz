INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'fb50a764-8a1a-44ca-a711-6029abf290a0',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '76. óra: A hosszúság mérése',
        'Mérőszám, mértékegység (mm, cm, dm, m, km) és átváltások.',
        'Matematika',
        '5. osztály',
        'Hosszúság, terület, térfogat',
        '[{"id": "67d24d07-2137-47a6-89ab-fe91e7848cc0", "text": "Mi a hosszúság alapvető SI mértékegysége?", "type": "multiple-choice", "options": [{"id": "b8812c8e-1187-4f43-991b-014d082cda49", "text": "Méter (m)", "isCorrect": true}, {"id": "9f561beb-9e75-4cc6-b74d-cf7ddd4e11b7", "text": "Gramm (g)", "isCorrect": false}, {"id": "922ba558-b7da-466e-94aa-68860aca4ef4", "text": "Liter (l)", "isCorrect": false}, {"id": "c992a7b2-34a4-4328-8e81-3622ec4c9ec2", "text": "Fok (°)", "isCorrect": false}], "timeLimit": 15}, {"id": "b33fde02-b4aa-4d56-a25e-ae488d4165db", "text": "Hány centiméter 1 méter?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "100"}, {"id": "82b50b24-9420-44c2-9e92-b6572075e5f3", "text": "Hány méter 1 kilométer?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "1000"}, {"id": "23ab3427-2ca4-48ae-909f-3f9c07a48dab", "text": "Hány milliméter 1 centiméter?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "10"}, {"id": "f6df08ad-7891-4d9d-ae34-a1e4c0f071c2", "text": "Az 5 dm átváltva centiméterbe 50 cm.", "type": "true-false", "options": [{"id": "292224b3-57a3-47c3-a522-84356f85bf6d", "text": "Igaz", "isCorrect": true}, {"id": "34fb98ef-a87d-46eb-b20f-b9aaf4dae317", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "9698cc2b-3cbd-457c-b2bd-60ded63fb2ab", "text": "Hány deciméter 30 centiméter?", "type": "multiple-choice", "options": [{"id": "21066996-3ceb-4ed0-ba5f-0fea0ca9ae25", "text": "3 dm", "isCorrect": true}, {"id": "44fb5120-dbbd-4c45-8f1a-5359b4e5b9ff", "text": "300 dm", "isCorrect": false}, {"id": "7d477fd2-dfe4-45a4-bf2b-4bfc2f4166b6", "text": "30 dm", "isCorrect": false}, {"id": "55dcf3ed-3f5f-48a3-8509-659439f2f45b", "text": "0,3 dm", "isCorrect": false}], "timeLimit": 15}, {"id": "6ed7821e-0190-42a3-a88e-d83defdfc31c", "text": "A hosszúság mérésekor a mérőszám megmutatja, hányszor tartalmazza a mennyiség a választott mértékegységet.", "type": "true-false", "options": [{"id": "02b748c2-a92f-4d8a-8935-22efc1b94ce5", "text": "Igaz", "isCorrect": true}, {"id": "e1f01ccc-6cb7-4cdf-96bb-d0ca0d9cf72e", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'e15ea3ba-5b5d-410a-a5f2-026e8cacfe98',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '77. óra: Téglalap, négyzet kerülete',
        'Téglalap és négyzet kerületének kiszámítása, szöveges feladatok.',
        'Matematika',
        '5. osztály',
        'Hosszúság, terület, térfogat',
        '[{"id": "3e33cfc7-5543-4e53-b4bf-1ffabe5f3af5", "text": "Mit jelent egy síkidom kerülete?", "type": "multiple-choice", "options": [{"id": "5816e1f4-81f8-4add-9d85-1868672011bc", "text": "A határoló oldalainak hosszának összegét", "isCorrect": true}, {"id": "6ea5c9cc-adab-4f28-80f9-0024efabf3b5", "text": "A síkidom által lefedett terület nagyságát", "isCorrect": false}, {"id": "df66caed-c762-4a2d-ad8a-ce3ff9f6d03c", "text": "Az átlók hosszának szorzatát", "isCorrect": false}, {"id": "04fc5949-886a-4fbd-b386-40d45481437c", "text": "A csúcsok számát", "isCorrect": false}], "timeLimit": 15}, {"id": "55ade40e-0b63-42f6-a3d8-0233062b27c5", "text": "Mi a négyzet kerületképlete, ha oldala ''a''?", "type": "multiple-choice", "options": [{"id": "85a74e01-b161-4cae-a593-18658d034661", "text": "K = 4 * a", "isCorrect": true}, {"id": "de91cab3-b350-49b4-8717-52e646d64fdf", "text": "K = a * a", "isCorrect": false}, {"id": "1fc36aaf-8077-4e34-a8aa-ac522ff94a5a", "text": "K = 2 * a", "isCorrect": false}, {"id": "0528463d-083f-433d-9db7-bbac46ea717a", "text": "K = a + 4", "isCorrect": false}], "timeLimit": 15}, {"id": "3fcde3f8-4d09-44e5-8e90-fb14a3a32c0c", "text": "Mennyi a kerülete egy 7 cm oldalú négyzetnek? (cm-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "28"}, {"id": "6f1def4e-a25c-4e09-a376-cdcf5f02198f", "text": "Mi a téglalap kerületképlete, ha oldalai ''a'' és ''b''?", "type": "multiple-choice", "options": [{"id": "5ce7b798-9dbd-45e5-a0f0-1296a4ab5c1a", "text": "K = 2 * (a + b)", "isCorrect": true}, {"id": "ade63164-d9f7-47a9-88a4-a75e02dba1b9", "text": "K = a * b", "isCorrect": false}, {"id": "c9a06811-e422-4bcf-a5c2-3fd1deef9303", "text": "K = a + b", "isCorrect": false}, {"id": "83ecdd20-2987-4a3e-b6d3-c637f5c3d0cc", "text": "K = 2 * a * b", "isCorrect": false}], "timeLimit": 15}, {"id": "e15e8ea3-2f9d-41c5-b417-8892c4b8e688", "text": "Egy téglalap oldalai 5 cm és 8 cm. Mennyi a kerülete? (cm-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "26"}, {"id": "9cb03770-7b1c-4f6e-ba1f-93b8af5b356f", "text": "Ha egy négyzet kerülete 36 cm, mekkora az egy oldala? (cm-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "9"}, {"id": "e68471cc-7da5-4461-afd1-eb26878d5105", "text": "Egy 3 m és 4 m oldalú kert kerítése 14 méter hosszú dróthálót igényel.", "type": "true-false", "options": [{"id": "1edb8ce6-8920-4eef-85d8-67524474f34f", "text": "Igaz (2*(3+4)=14)", "isCorrect": true}, {"id": "8e9006a4-bcab-47b6-ad77-6c81061e6b7b", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '505a28e2-d95f-42b9-b28d-f69b793ec4a8',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '78. óra: A terület mérése',
        'A terület fogalma, lefedés, szabványos terület-mértékegységek.',
        'Matematika',
        '5. osztály',
        'Hosszúság, terület, térfogat',
        '[{"id": "1f569da0-084f-415a-a240-ae3c7e3fa7ac", "text": "Mi a terület mérésének alapvető elve?", "type": "multiple-choice", "options": [{"id": "3e4dc585-4301-499e-a5ea-9f3aa7498868", "text": "A síkidom lefedése választott területegységgel (pl. 1 cm²-es négyzetekkel)", "isCorrect": true}, {"id": "680f9bd0-80e8-45cd-ad50-9a4075bd409e", "text": "A síkidom oldalainak összeadása", "isCorrect": false}, {"id": "57690f38-6fb7-434c-a7d9-e4d49a1a0438", "text": "A síkidom elforgatása", "isCorrect": false}, {"id": "c638666f-043a-4650-8d82-b871dda061ea", "text": "A síkidom mérlegre helyezése", "isCorrect": false}], "timeLimit": 15}, {"id": "f6756f4d-756b-4c98-9f6f-d7411a927647", "text": "Melyik terület-mértékegység jelent egy 1 m oldalú négyzet területét?", "type": "multiple-choice", "options": [{"id": "fd20f48b-d41b-4c44-a780-f92986ba5db7", "text": "1 négyzetméter (1 m²)", "isCorrect": true}, {"id": "64c84c59-102a-406c-901d-6357a2cbd053", "text": "1 négyzetcentiméter (1 cm²)", "isCorrect": false}, {"id": "778034a1-ef58-4c04-b383-8a17cb801e7a", "text": "1 méter (1 m)", "isCorrect": false}, {"id": "4cbace2f-3d81-4059-bb54-f999ae39ed1c", "text": "1 köbméter (1 m³)", "isCorrect": false}], "timeLimit": 15}, {"id": "834eba16-6650-4f0c-8d10-75827d9fe37a", "text": "Hány cm² egy 1 dm²-es négyzet területe? (10 cm * 10 cm)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "100"}, {"id": "60813693-049b-466e-b012-2f01e8c1b35f", "text": "Hány mm² egy 1 cm²-es négyzet területe? (10 mm * 10 mm)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "100"}, {"id": "73051632-cad9-4974-a8e1-f4d53e1e884b", "text": "A terület mértékegységeinél a váltószám a szomszédos egységek között 100.", "type": "true-false", "options": [{"id": "12254164-292b-40f0-af27-893c47d9a921", "text": "Igaz (mm² <-> cm² <-> dm² <-> m²)", "isCorrect": true}, {"id": "b2cf950f-05b4-4f5c-8e19-76d45f823e74", "text": "Hamis (10)", "isCorrect": false}], "timeLimit": 15}, {"id": "de851b48-c1fe-4afe-aa0d-c1734da5252b", "text": "Hány dm² van 5 m²-ben?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "500"}, {"id": "ce2c0ec4-ebba-493c-b42e-c13e949e7741", "text": "A kerület és a terület ugyanazt a tulajdonságot méri a síkidomoknál.", "type": "true-false", "options": [{"id": "99d0e0a7-ad40-4666-af67-54a6b29bda0e", "text": "Igaz", "isCorrect": false}, {"id": "2f3e13a1-822b-48cf-8fcf-b7b2e773ed79", "text": "Hamis (kerület a határoló vonal hossza, terület a lefedett felület nagysága)", "isCorrect": true}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '3c104cd6-33d6-44cd-8112-82a03991511c',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '79. óra: Téglalap, négyzet területe',
        'Téglalap és négyzet területének kiszámítása, gyakorlati példák (udvar, szoba).',
        'Matematika',
        '5. osztály',
        'Hosszúság, terület, térfogat',
        '[{"id": "ae7fcb2c-91c9-417f-805d-be7e360e1754", "text": "Mi a téglalap területképlete, ha oldalai ''a'' és ''b''?", "type": "multiple-choice", "options": [{"id": "495f7327-601a-4017-9f6e-e5292a928d48", "text": "T = a * b", "isCorrect": true}, {"id": "2551a5ba-fb65-4769-bc67-99dff8c20d63", "text": "T = 2 * (a + b)", "isCorrect": false}, {"id": "3b26c471-fe54-4a61-a2ce-6894657df57e", "text": "T = a + b", "isCorrect": false}, {"id": "f5f443aa-f293-4ff1-8302-c3e62227013a", "text": "T = a * a", "isCorrect": false}], "timeLimit": 15}, {"id": "cff077cf-d1a0-4736-9f7a-8e90de05f1de", "text": "Mi a négyzet területképlete, ha oldala ''a''?", "type": "multiple-choice", "options": [{"id": "514bf6d7-053b-4514-80f2-6b16caf33dce", "text": "T = a * a (a²)", "isCorrect": true}, {"id": "2d7ca594-0d27-4631-bceb-aa1b86bbca32", "text": "T = 4 * a", "isCorrect": false}, {"id": "37b2d3bf-c2f8-4bde-94f0-2547af408019", "text": "T = 2 * a", "isCorrect": false}, {"id": "c64157fd-6575-4828-b651-202176980435", "text": "T = a + a", "isCorrect": false}], "timeLimit": 15}, {"id": "9a0dbb75-a241-4ad1-acc4-92e9d6888cd2", "text": "Egy szoba 4 m széles és 5 m hosszú. Mekkora az alapterülete? (m²-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "20"}, {"id": "2f8e321d-9931-4127-9dfa-0332cede41e3", "text": "Mennyi a területe egy 6 cm oldalú négyzetnek? (cm²-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "36"}, {"id": "75bf0e04-01c6-4a35-b3f3-0e57e44e487b", "text": "Egy téglalap területe 24 cm², egyik oldala 4 cm. Mekkora a másik oldala? (cm-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "6"}, {"id": "f2393364-3526-4d2c-a7f4-bde488a5c712", "text": "Ha egy négyzet területe 49 cm², akkor az oldala 7 cm hosszú.", "type": "true-false", "options": [{"id": "e541b4ca-6481-48c9-8156-bb66546367e5", "text": "Igaz (mert 7 * 7 = 49)", "isCorrect": true}, {"id": "76e2a004-2bab-46a6-8375-18f49675e7f6", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "191f9847-2fb4-4d9c-a023-c53db3da07e7", "text": "Két téglalapnak lehet azonos a kerülete, de eltérő a területe.", "type": "true-false", "options": [{"id": "8c3d028c-8d5b-4794-8689-07ef72bf202a", "text": "Igaz (pl. 1x5 cm: K=12, T=5 vs 2x4 cm: K=12, T=8)", "isCorrect": true}, {"id": "f8e3df87-f527-4030-a600-ef1411db41e8", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'b1437a5c-bf22-4bbf-b2d6-80b6e05d2cfb',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '80. óra: Téglatest, kocka',
        'Téglatest, kocka, négyzetes oszlop tulajdonságai, testek hálója.',
        'Matematika',
        '5. osztály',
        'Hosszúság, terület, térfogat',
        '[{"id": "87dc6589-3a0c-4c4b-9bf3-af35398431d5", "text": "Milyen test a kocka?", "type": "multiple-choice", "options": [{"id": "758439f4-382c-4e6e-847a-b3a35d862500", "text": "Olyan téglatest, melynek minden éle egyenlő hosszúságú (minden lapja egybevágó négyzet)", "isCorrect": true}, {"id": "9b06b807-eaa8-46aa-9352-ec238051b634", "text": "Olyan test, melynek minden lapja háromszög", "isCorrect": false}, {"id": "39b81490-e779-4a43-b567-45b7905c1d7b", "text": "Gömbszerű test", "isCorrect": false}, {"id": "02e3d94f-3726-4a9b-8d51-52e944bb1d4c", "text": "Sík idom", "isCorrect": false}], "timeLimit": 15}, {"id": "afc4bdd3-a5e6-4d49-aa3d-0d08d4e77e4a", "text": "Hány egybevágó négyzetből áll a kocka hálója?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "6"}, {"id": "5d78c115-4041-424f-a7c7-735e8266fbab", "text": "Milyen test a négyzetes oszlop?", "type": "multiple-choice", "options": [{"id": "f76c70af-1580-483f-a371-d2e608edf1c4", "text": "Olyan téglatest, amelynek alaplapja és fedőlapja egyenlő négyzet", "isCorrect": true}, {"id": "e29bc67b-714b-436c-b218-05e3cba3e768", "text": "Olyan test, amelynek minden lapja rombusz", "isCorrect": false}, {"id": "26b24aba-7012-427a-80fd-89289beba495", "text": "Henger alakú test", "isCorrect": false}, {"id": "3a6428d9-3e35-43dd-b07d-eea407967371", "text": "Kúp", "isCorrect": false}], "timeLimit": 15}, {"id": "39eb97a8-149c-4ab3-9433-d41ddf091480", "text": "A téglatestnek 6 lapja, 8 csúcsa és 12 éle van.", "type": "true-false", "options": [{"id": "7c72000a-7bde-4f61-89b1-54006e48dee2", "text": "Igaz", "isCorrect": true}, {"id": "4d0889c4-6337-44de-a2ee-6ee4e72a9c2b", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "4b9dab3a-5eec-482c-8963-cc650c374a54", "text": "Hány pár egybevágó szemközti lapja van a téglatestnek?", "type": "multiple-choice", "options": [{"id": "1af1a7f9-22a4-4721-b6a9-73100623bba6", "text": "3 pár", "isCorrect": true}, {"id": "b23dbbf6-0f01-4cf7-9573-47ccb207fd8d", "text": "6 pár", "isCorrect": false}, {"id": "20960ca8-317d-4e9a-98a0-ca7dd1140585", "text": "2 pár", "isCorrect": false}, {"id": "936601b9-9c76-4f8d-88d2-b35e04268e1e", "text": "4 pár", "isCorrect": false}], "timeLimit": 15}, {"id": "31d7c62d-1be3-47cd-9028-7064327a6ee0", "text": "A téglatest hálója kiteríthető a síkba úgy, hogy 6 téglalap alkotja.", "type": "true-false", "options": [{"id": "e868474b-aa8d-4ae9-b31e-24aa755f4241", "text": "Igaz", "isCorrect": true}, {"id": "e7350fe0-66d2-41eb-8728-45a0d25022d1", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "23b36b8b-caa1-4d74-bc8a-ebc4bb510e75", "text": "Hány él találkozik a kocka egy-egy csúcsában?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "3"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'f8986be0-7063-43b7-b680-d4b3b0baeb15',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '81. óra: Téglatest, kocka felszíne',
        'Téglatest és kocka felszínének kiszámítása a határoló lapok területéből.',
        'Matematika',
        '5. osztály',
        'Hosszúság, terület, térfogat',
        '[{"id": "6f7ace5d-4f05-4ea6-ba56-88486e4c67ed", "text": "Mit jelent a test felszíne (A)?", "type": "multiple-choice", "options": [{"id": "571b2b0b-09c3-4bd7-b02d-2e0dea59eea2", "text": "A testet határoló lapok területének összegét", "isCorrect": true}, {"id": "016f7741-d3aa-459b-896d-f978d36ffceb", "text": "A test éleinek hosszának összegét", "isCorrect": false}, {"id": "c0ba5028-2775-4022-8607-412ac4ed7f87", "text": "A test által elfoglalt térfogatot", "isCorrect": false}, {"id": "e6cd43ba-b48d-405a-8b18-1bd9593171b4", "text": "A csúcsok számát", "isCorrect": false}], "timeLimit": 15}, {"id": "faf305d5-f4ee-45d1-a73c-e7bcd21f8cfb", "text": "Mi a kocka felszínképlete, ha élhossza ''a''?", "type": "multiple-choice", "options": [{"id": "7a98005f-0938-4880-95c8-f46b09a13ca5", "text": "A = 6 * a * a (6 * a²)", "isCorrect": true}, {"id": "c3b02304-0d48-46a0-be44-d57331110faa", "text": "A = a * a * a", "isCorrect": false}, {"id": "70663933-acef-4d7f-810f-c4785b0c3571", "text": "A = 12 * a", "isCorrect": false}, {"id": "d124b5a9-526f-4d3f-b1a5-cd95e3e3c228", "text": "A = 4 * a * a", "isCorrect": false}], "timeLimit": 15}, {"id": "697ca00e-8334-4588-b97c-7871b43fbea2", "text": "Mennyi a felszíne egy 3 cm élű kockának? (6 * 3 * 3 cm²-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "54"}, {"id": "3b149e4a-3e11-41bd-be4b-e306d0291736", "text": "Mi a téglatest felszínképlete, ha élei ''a'', ''b'', ''c''?", "type": "multiple-choice", "options": [{"id": "2b5096fc-33e3-4814-8d91-fee6089635c3", "text": "A = 2 * (a*b + a*c + b*c)", "isCorrect": true}, {"id": "03961c36-385c-4ff6-ad82-c728767e72c0", "text": "A = a * b * c", "isCorrect": false}, {"id": "3238e030-c3f0-4d0f-a7c2-7600b177d7e9", "text": "A = a + b + c", "isCorrect": false}, {"id": "b6cea576-ecc3-44a1-b4cc-bf7d532b612b", "text": "A = 4 * (a + b + c)", "isCorrect": false}], "timeLimit": 15}, {"id": "fc1f1800-fa37-49d3-9b45-00bedf9604af", "text": "Egy téglatest élei 2 cm, 3 cm és 4 cm. Mennyi a felszíne? (2*(6+8+12))", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "52"}, {"id": "262fad89-5922-4f84-8230-7e98b8817497", "text": "Ha egy kocka lapjának területe 25 cm², a teljes felszíne 150 cm².", "type": "true-false", "options": [{"id": "5c9577ea-0b8d-4557-99ea-e206101e4ddc", "text": "Igaz (6 * 25 = 150)", "isCorrect": true}, {"id": "33b6bcc2-a332-4912-8fdf-b79ee087ea5d", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "8dc5363c-278d-46a9-b440-98cbfc01ef2a", "text": "A felszín mértékegységei megegyeznek a terület mértékegységeivel (pl. cm², m²).", "type": "true-false", "options": [{"id": "701f04c2-545d-40a5-8add-99272507453a", "text": "Igaz", "isCorrect": true}, {"id": "b3c60ab2-a899-44ce-8598-9cc05e560a1b", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '081af6fd-539e-4925-b3fc-fb468a4bcf65',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '82. óra: A térfogat mérése',
        'A térfogat fogalma, egységkockák, térfogat- és űrmértékegységek (l, dl, cl, ml).',
        'Matematika',
        '5. osztály',
        'Hosszúság, terület, térfogat',
        '[{"id": "99482d14-4be5-4dba-bbc6-63048fc07e76", "text": "Mi a térfogat (V) jelentése?", "type": "multiple-choice", "options": [{"id": "65abb289-ee59-4902-a47b-f71c3566ea97", "text": "A test által elfoglalt térrész nagysága", "isCorrect": true}, {"id": "ff829f58-ae33-4a65-9ea6-4337075c7a81", "text": "A test határoló lapjainak területe", "isCorrect": false}, {"id": "12bc13f3-7fbb-499c-a5df-06f4410fcc52", "text": "A test éleinek hossza", "isCorrect": false}, {"id": "8fd2c656-b4cc-482f-b59a-5cb7bf185b10", "text": "A test tömege kilogrammban", "isCorrect": false}], "timeLimit": 15}, {"id": "2271d79f-8dfc-476e-8baa-279cacd2ffcb", "text": "Melyik a térfogat alapvető SI mértékegysége?", "type": "multiple-choice", "options": [{"id": "f57656c4-807c-4c22-8cef-44274db41dac", "text": "Köbméter (m³)", "isCorrect": true}, {"id": "e5598258-a6da-4152-b615-2679875dd103", "text": "Négyzetméter (m²)", "isCorrect": false}, {"id": "2c540231-7968-42c5-bfd5-d16b28be4a18", "text": "Méter (m)", "isCorrect": false}, {"id": "a4d2dd88-8e98-4afe-8e84-2c5ff3f35595", "text": "Liter (l)", "isCorrect": false}], "timeLimit": 15}, {"id": "2731a759-a67c-4e9f-a51c-17f149443235", "text": "Hány köbdeciméter (dm³) felel meg 1 liternek?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "1"}, {"id": "01571096-417a-43af-9fba-1509b6b3dcbf", "text": "Hány cm³ van 1 dm³-ben? (10 cm * 10 cm * 10 cm)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "1000"}, {"id": "b57366c3-81c1-49ca-a210-e914907e6701", "text": "Hány deciliter 1 liter?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "10"}, {"id": "d9726b65-ff49-4045-a036-3b88d315ff2f", "text": "A térfogat mértékegységeknél a váltószám a szomszédos köbös egységek között (cm³, dm³, m³) 1000.", "type": "true-false", "options": [{"id": "18e78e9d-26a3-4ff6-a82e-e9e34b8a87b7", "text": "Igaz", "isCorrect": true}, {"id": "0cc07ea4-4673-40c5-acbc-82cba7ad5988", "text": "Hamis (100)", "isCorrect": false}], "timeLimit": 15}, {"id": "5fba25a5-6754-49cd-8d74-a75563464fb4", "text": "1 milliliter (ml) pontosan 1 cm³ térfogatnak felel meg.", "type": "true-false", "options": [{"id": "7945614e-8323-43e2-926f-ab4694fe1def", "text": "Igaz", "isCorrect": true}, {"id": "0162d6d7-4422-4d01-989b-f0b093f3b46e", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'bad51520-77f5-4153-b684-dad2eedf045e',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '83. óra: Téglatest, kocka térfogata',
        'Téglatest és kocka térfogatképlete és kiszámítása.',
        'Matematika',
        '5. osztály',
        'Hosszúság, terület, térfogat',
        '[{"id": "bc1f65e3-91c1-4ae9-9cf9-2d64d08ebc40", "text": "Mi a kocka térfogatképlete, ha élhossza ''a''?", "type": "multiple-choice", "options": [{"id": "fc32f75d-2e88-4490-ad08-9263ccd53a1e", "text": "V = a * a * a (a³)", "isCorrect": true}, {"id": "f8761484-3b5f-43f6-a643-626b0d15dab5", "text": "V = 6 * a * a", "isCorrect": false}, {"id": "39152f3d-644e-4d1c-a9a5-1f9e11f7941b", "text": "V = 12 * a", "isCorrect": false}, {"id": "09e55689-fc36-4893-a8da-c2c9ff7ecf2a", "text": "V = 4 * a", "isCorrect": false}], "timeLimit": 15}, {"id": "e8ccb6bf-4f53-496a-945d-9d3d534eb124", "text": "Mennyi a térfogata egy 4 cm élű kockának? (cm³-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "64"}, {"id": "f56647c9-fd78-4b12-92c6-a7e0ebcd251e", "text": "Mi a téglatest térfogatképlete, ha élei ''a'', ''b'', ''c''?", "type": "multiple-choice", "options": [{"id": "a3847c53-00da-4608-b71a-12b90484270d", "text": "V = a * b * c", "isCorrect": true}, {"id": "6865c774-076a-4bde-8050-df434709755a", "text": "V = 2 * (a + b + c)", "isCorrect": false}, {"id": "d3ca1f50-2f17-4210-b20a-28db5ac6382a", "text": "V = a * b + c", "isCorrect": false}, {"id": "21909d74-afb8-452c-b569-853623c280b8", "text": "V = 2 * (ab + ac + bc)", "isCorrect": false}], "timeLimit": 15}, {"id": "beb8afb3-f3fc-45e8-856a-0e27c6b2de1f", "text": "Egy téglatest élei 3 cm, 5 cm és 10 cm. Mennyi a térfogata? (cm³-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "150"}, {"id": "ed444d31-215a-4ad7-80c4-6ab896d6d03d", "text": "Ha egy akvárium hossza 5 dm, szélessége 4 dm, magassága 3 dm, hány liter víz fér bele tele öntve?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "60"}, {"id": "56dc4bbf-8d5c-4b35-981a-81e1357589df", "text": "Ha egy kocka térfogata 27 cm³, akkor az éle 3 cm.", "type": "true-false", "options": [{"id": "e6a3a19f-6de0-414d-862a-fcba85ac055f", "text": "Igaz (3 * 3 * 3 = 27)", "isCorrect": true}, {"id": "39da79f5-4957-4972-870e-c4912d2ee2c9", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "bc4ca4c0-c41f-49a0-8649-c0b62b07e61f", "text": "A térfogatot úgy is megkaphatjuk, hogy az alaplap területét megszorozzuk a magassággal (V = T_alap * m).", "type": "true-false", "options": [{"id": "9006ff7e-02d5-4453-a8dd-41888132c6bf", "text": "Igaz", "isCorrect": true}, {"id": "1226b017-f936-4bae-96f3-3557605cbba5", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'aad5a8ef-9f14-498e-b8aa-e2b7e6bd6f84',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '84. óra: Gyakorlati feladatok',
        'Kerület-, terület-, felszín- és térfogatszámítási összefüggések gyakorlati alkalmazása.',
        'Matematika',
        '5. osztály',
        'Hosszúság, terület, térfogat',
        '[{"id": "6bbcbfcb-90df-4734-9473-7376e24ffda6", "text": "Melyik fogalmat használjuk, ha meg akarjuk tudni, mennyi festék kell egy szoba falainak lefestéséhez?", "type": "multiple-choice", "options": [{"id": "4345a98a-6d53-4dc5-8f80-26ced2c3a3a3", "text": "Terület / Felszín", "isCorrect": true}, {"id": "e959ae0e-9c90-4e75-9a7e-c459435304d6", "text": "Kerület", "isCorrect": false}, {"id": "f54f60cf-e3e6-4e54-af1b-3f8d587bd223", "text": "Térfogat", "isCorrect": false}, {"id": "273f0925-5245-4c5b-b775-5b71052c7f4c", "text": "Élhossz", "isCorrect": false}], "timeLimit": 15}, {"id": "09cc5e31-91cd-4f67-b4a0-3f9901d99c6b", "text": "Melyik fogalmat használjuk, ha meg akarjuk tudni, hány liter víz fér egy medencébe?", "type": "multiple-choice", "options": [{"id": "c7ab85b4-4db4-40dd-be3e-5359348eeb7e", "text": "Térfogat / Űrtartalom", "isCorrect": true}, {"id": "662e6f1e-ab11-4062-8a1a-31a1c2efa3fd", "text": "Felszín", "isCorrect": false}, {"id": "07515423-c601-42c5-a17b-e416ffe10b4c", "text": "Kerület", "isCorrect": false}, {"id": "687890da-6fa2-4151-bfd6-d4a2fe92b3f8", "text": "Átló", "isCorrect": false}], "timeLimit": 15}, {"id": "427f62f5-72b8-428a-b93d-490a692729f6", "text": "Melyik fogalmat használjuk, ha körbe akarunk keríteni egy teleket kerítéssel?", "type": "multiple-choice", "options": [{"id": "737f94ae-8368-4ee8-886e-490e0ba49313", "text": "Kerület", "isCorrect": true}, {"id": "0175c768-f77d-4954-adeb-055ecf3f48a7", "text": "Terület", "isCorrect": false}, {"id": "e8ef1feb-d501-4f28-b3fc-b27faa619ea3", "text": "Térfogat", "isCorrect": false}, {"id": "c041ee5b-7d54-4dd5-af33-437857317574", "text": "Felszín", "isCorrect": false}], "timeLimit": 15}, {"id": "d2919c86-cf57-4e2b-a30d-cd33dc2896e4", "text": "Egy 20 m hosszú és 15 m széles telket kerítünk körbe. Hány méter kerítés kell? (m-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "70"}, {"id": "af087f38-f38b-4276-bafe-4f9641e0483c", "text": "Egy 2 m x 3 m x 1,5 m-es láda térfogata 9 m³.", "type": "true-false", "options": [{"id": "0b92db87-4b3e-416f-8e50-8682d0c92f41", "text": "Igaz (2 * 3 * 1,5 = 9)", "isCorrect": true}, {"id": "11fed19d-d717-4013-887a-f75be5486ff9", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "88d96132-52b7-4689-8c6e-494e87eac3fe", "text": "Hány darab 1 cm³-es kis kockából lehet felépíteni egy 2 cm x 3 cm x 4 cm-es téglatestet?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "24"}, {"id": "7539de2f-4d57-4e9f-a19c-f12d3866e798", "text": "A mértékegységek átváltása elengedhetetlen a gyakorlati mérési feladatok megoldásakor.", "type": "true-false", "options": [{"id": "59c11430-d5ba-4c6c-b1f5-04e36af23350", "text": "Igaz", "isCorrect": true}, {"id": "ad02532f-2fd3-43cd-8a1e-e98073e9eb1e", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'f1b61bfa-3ee9-4d17-9014-a327636bd99b',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '85. óra: Összefoglalás',
        'Összefoglaló ismétlés: hosszúság, kerület, terület, felszín, térfogat.',
        'Matematika',
        '5. osztály',
        'Hosszúság, terület, térfogat',
        '[{"id": "26b291db-89c1-49b9-82a5-913a78f48ef8", "text": "Párosítsd a mértékegységet a mért mennyiséggel! Melyik mér TÉRFOGATOT?", "type": "multiple-choice", "options": [{"id": "6bad7d49-1e78-4885-baaa-182bac4c8fbe", "text": "m³ (köbméter)", "isCorrect": true}, {"id": "f3ce27cc-33f2-4f9c-ac71-84892d588fe4", "text": "m² (négyzetméter)", "isCorrect": false}, {"id": "49fc3d64-2e6f-43d2-a41b-7bdedf743a04", "text": "m (méter)", "isCorrect": false}, {"id": "63789236-9d97-4e38-9b37-a5f9c470c87e", "text": "kg (kilogramm)", "isCorrect": false}], "timeLimit": 15}, {"id": "73573152-e418-4661-a29b-dce27855d456", "text": "Mennyi egy 10 cm oldalú négyzet kerülete és területe? (K cm-ben, T cm²-ben)", "type": "multiple-choice", "options": [{"id": "7421fe5c-eedc-42d0-882e-ee75073f745d", "text": "K = 40 cm, T = 100 cm²", "isCorrect": true}, {"id": "e6f3c718-8328-4a01-b2bd-b35a2baca01e", "text": "K = 100 cm, T = 40 cm²", "isCorrect": false}, {"id": "97e5ebae-8cd6-4edb-9eed-4c0d592be59f", "text": "K = 20 cm, T = 100 cm²", "isCorrect": false}, {"id": "e93e2ee6-1d03-4b31-94a3-5b0af6cce7ef", "text": "K = 40 cm, T = 40 cm²", "isCorrect": false}], "timeLimit": 15}, {"id": "9367ef17-4b5a-4896-8e31-a6088ad64e2b", "text": "Hány liter 2500 ml?", "type": "multiple-choice", "options": [{"id": "920fff7c-71ca-435b-91a8-980dae5b04cd", "text": "2,5 liter", "isCorrect": true}, {"id": "4c2fcc68-76d9-4e64-9c9e-7693b81a4bc8", "text": "25 liter", "isCorrect": false}, {"id": "9b375e43-258c-45d3-b352-d746fe021156", "text": "0,25 liter", "isCorrect": false}, {"id": "f6343b4c-ff04-4e22-96a3-d9daf2cda5bc", "text": "250 liter", "isCorrect": false}], "timeLimit": 15}, {"id": "4c1b98d6-0ba8-41b2-9350-6421a20da655", "text": "Egy 2 cm élű kocka felszíne 24 cm², térfogata 8 cm³.", "type": "true-false", "options": [{"id": "ea0a802a-5a21-4bb6-92db-3c20aff8ce7c", "text": "Igaz (A=6*4=24, V=2*2*2=8)", "isCorrect": true}, {"id": "5bd2352b-4d4b-42c8-abfa-a5db36f19b06", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "26848e3b-470e-4def-8722-a0cab781b408", "text": "Hány centiméter 3,5 méter?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "350"}, {"id": "6117271f-811e-4d23-9ce1-76773b6efce5", "text": "Hány cm² van 2 dm²-ben?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "200"}, {"id": "782c9290-8b18-42a4-adcf-2ebf98d14b08", "text": "A téglalap kerületének mértékegysége m², területe m.", "type": "true-false", "options": [{"id": "4324a548-99cd-4b8b-a026-ab3d4ad16c4b", "text": "Igaz", "isCorrect": false}, {"id": "7e6bbcca-9359-488f-926c-8ce0b7e6f348", "text": "Hamis (fordítva: kerület m, terület m²)", "isCorrect": true}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '195a4632-0ed8-4d20-8aa5-f9648c9eb3d6',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '86. óra: Témazáró dolgozat',
        'Témazáró számonkérés a Hosszúság, terület, térfogat témakörből (10 kérdés).',
        'Matematika',
        '5. osztály',
        'Hosszúság, terület, térfogat',
        '[{"id": "57a7de68-e6c1-47f0-a8e0-82db894bcf47", "text": "1. Hány cm 2,5 m?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "250"}, {"id": "eca584d1-7051-4187-bb8a-3d3e0851043e", "text": "2. Mennyi egy 8 cm és 5 cm oldalú téglalap kerülete? (cm-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "26"}, {"id": "9a6e495d-28d2-4e66-941c-346a00653a10", "text": "3. Mennyi egy 8 cm és 5 cm oldalú téglalap területe? (cm²-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "40"}, {"id": "b00cc6ce-716e-4479-bdd1-74c1dc56c2f5", "text": "4. Mennyi egy 5 cm élű kocka felszíne? (cm²-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "150"}, {"id": "3e1fa660-f786-4865-8559-ab8adc72b62a", "text": "5. Mennyi egy 5 cm élű kocka térfogata? (cm³-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "125"}, {"id": "08ae51f7-42c7-436a-8c00-0ea27e294151", "text": "6. Hány liter víz van 3 dm³-ben?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "3"}, {"id": "e92fd28f-7ba3-4001-933e-3e0ccca877b7", "text": "7. Egy téglatest élei 2 cm, 4 cm és 5 cm. Mennyi a térfogata? (cm³-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "40"}, {"id": "7ddc1a39-4b9e-4aa9-92ac-6d0638377a3e", "text": "8. Hány m² van 400 dm²-ben?", "type": "multiple-choice", "options": [{"id": "4b3ce951-e41e-4cf3-8e1a-242fd01a71c2", "text": "4 m²", "isCorrect": true}, {"id": "86783e23-b3ea-41f7-a38a-eb904a32d73b", "text": "40 m²", "isCorrect": false}, {"id": "68f11f73-92d3-483f-9ab1-d26450dc590c", "text": "0,4 m²", "isCorrect": false}, {"id": "5c99d3fb-1488-4779-988f-e2fba5ad613d", "text": "4000 m²", "isCorrect": false}], "timeLimit": 15}, {"id": "adda8d20-ebee-4720-861e-fa9caf2ad3ab", "text": "9. A kocka minden határoló lapja egybevágó négyzet.", "type": "true-false", "options": [{"id": "48cc3a48-0f14-4f99-945d-e6005dda85ff", "text": "Igaz", "isCorrect": true}, {"id": "0f618295-9a44-49c7-bc0c-850ffd2cda40", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "48e01db5-5f98-4b1c-aceb-bbccfcdbb601", "text": "10. Ha egy négyzet kerülete 20 cm, a területe 25 cm².", "type": "true-false", "options": [{"id": "75bf77be-7910-4355-9a05-0036af5ae72a", "text": "Igaz (a=5 cm, T=25)", "isCorrect": true}, {"id": "9801cefc-70e5-45d2-ad9a-c3b829f4c0c7", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'da01a54e-af08-4e4b-8d07-3ce4f66cfe66',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '87. óra: Témazáró dolgozat értékelése',
        'A mérések témazáró dolgozat feladatainak megbeszélése és javítása.',
        'Matematika',
        '5. osztály',
        'Hosszúság, terület, térfogat',
        '[{"id": "6c2c9074-32c0-4893-8287-8d40fa5e53db", "text": "Mi a leggyakoribb hiba a mértékegység-átváltáskor?", "type": "multiple-choice", "options": [{"id": "6a98d006-39c3-49ae-a380-48de341ce46a", "text": "A váltószám téves használata (pl. területnél 10 használata 100 helyett)", "isCorrect": true}, {"id": "bf4c6d44-a8df-4bde-b762-e77bcb1293bc", "text": "A számok összeadása", "isCorrect": false}, {"id": "6a6802ca-79a5-4a0c-ae0d-b508f2ca5c4b", "text": "A ceruza használata", "isCorrect": false}, {"id": "b315470c-94b5-418c-9e0d-c71fc5adfaf4", "text": "A betűk leírása", "isCorrect": false}], "timeLimit": 15}, {"id": "76b8eadc-d248-4ecc-a6b7-7f96032edbbc", "text": "A kerület hosszmérési egységekben (m, cm), a terület négyzetes egységekben (m², cm²) fejezendő ki.", "type": "true-false", "options": [{"id": "a44d6443-bfa8-4aa4-ae26-a8ebb731a324", "text": "Igaz", "isCorrect": true}, {"id": "fa4eacf8-c11b-4981-89c0-bc8d00ea0e02", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "6496a0a9-df19-42a5-b401-e7b130a6ca51", "text": "A térfogat köbös egységekben (m³, dm³, cm³) vagy űrmértékegységben (l, dl, ml) fejezendő ki.", "type": "true-false", "options": [{"id": "d6d62369-28d5-4baa-b45a-6cc57e843d89", "text": "Igaz", "isCorrect": true}, {"id": "25a82b63-34ae-466d-9e3f-67a42b0172dd", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "83ba168b-4cb8-48c1-bfa8-15eb5533813b", "text": "Mennyi a téglalap kerülete, ha a = 10 cm, b = 2 dm (20 cm)? (cm-ben)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "60"}, {"id": "4bc192bb-6288-4622-b68c-38581621a460", "text": "Méréseknél figyelni kell arra, hogy a megadott adatok azonos mértékegységben legyenek kiszámítás előtt.", "type": "true-false", "options": [{"id": "04b40002-5881-44f3-b7ab-93384153d8ca", "text": "Igaz", "isCorrect": true}, {"id": "b2b77cbc-1234-4dff-b386-7e8b0f532e88", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "dd30c513-cdf7-4192-bdd0-0181e1e5ac1c", "text": "Hány liter víz fér el egy 1 m³-es tartályban?", "type": "multiple-choice", "options": [{"id": "69e05109-0eca-4593-9dfa-88d1a171fd43", "text": "1000 liter (1000 dm³)", "isCorrect": true}, {"id": "8fbc12bb-54d8-47d7-8d0c-6ae47652aeed", "text": "100 liter", "isCorrect": false}, {"id": "c260f35e-af4a-485c-8953-6cd2ab38f909", "text": "10 liter", "isCorrect": false}, {"id": "d0ccc0ef-a91d-45c9-ad80-78a346adc6e3", "text": "10000 liter", "isCorrect": false}], "timeLimit": 15}, {"id": "906267af-51ce-46ff-ba64-394c49b4282e", "text": "Ha a témazáró javításakor áttekinted a hibás példákat, legközelebb ügyesebben oldod meg azokat.", "type": "true-false", "options": [{"id": "c8c65bc4-6837-4224-ad5b-d0a7246be756", "text": "Igaz", "isCorrect": true}, {"id": "0f52c512-5577-4616-b7cc-b06b4eaab1a4", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );