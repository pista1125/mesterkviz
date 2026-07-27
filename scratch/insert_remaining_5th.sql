INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '407942f1-f0ff-4901-bd04-4a0fab4b5cdc',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '88. óra: Helymeghatározás szerepe környezetünkben',
        'Helymeghatározási módok: címzés, sakklépések, ülésrend, mozis jegyek értelmezése.',
        'Matematika',
        '5. osztály',
        'Helymeghatározás, sorozatok',
        '[{"id": "c92fa6e9-feed-463e-9f12-a26a9678a5f6", "text": "Mi alapján találjuk meg a helyünket a moziban?", "type": "multiple-choice", "options": [{"id": "7daa9e5c-e51d-4526-a16e-15a9a0af4442", "text": "Sor és szék száma alapján", "isCorrect": true}, {"id": "02286b22-981f-47c9-b6dc-d987a9ea10a1", "text": "Évszám alapján", "isCorrect": false}, {"id": "632e5ec8-c48b-4e0e-a812-b404759376e3", "text": "Tömeg alapján", "isCorrect": false}, {"id": "e2662c3e-e1b4-497a-b3b1-40756b1e6ed1", "text": "Magasság alapján", "isCorrect": false}], "timeLimit": 15}, {"id": "84ff5cfc-0552-46c8-a793-59938fa32860", "text": "A sakk-táblán egy mezőt egy betűvel és egy számmal adunk meg (pl. e4).", "type": "true-false", "options": [{"id": "33f865c5-bb44-4641-8d7b-13dff937ba4c", "text": "Igaz", "isCorrect": true}, {"id": "a05d16f5-ea38-4759-b159-d1ce36a74294", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "f97e7e68-5874-4cec-9d75-4da62e2dc60b", "text": "Ha a színházjegyeden ''4. sor 12. szék'' áll, hányadik sorban kell ülnöd?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "4"}, {"id": "76139e97-38e3-42a4-beb3-524a7d1d086a", "text": "A postai címzésben a házszám és az ajtószám segít a pontos hely meghatározásában.", "type": "true-false", "options": [{"id": "ecd99628-8293-4350-a125-7a3d1cf5ab47", "text": "Igaz", "isCorrect": true}, {"id": "8c05ff17-642b-4914-8195-3929aed8908e", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "8cda4fd6-42a6-487c-aeb2-1f3b32ede6ab", "text": "Melyik jelölés felel meg a sakkban egy érvényes mezőnek?", "type": "multiple-choice", "options": [{"id": "390278cd-4e79-4773-bf50-ef53ffc9fa43", "text": "e4", "isCorrect": true}, {"id": "b60bae16-692b-41b4-bbc7-3f1fb9e2b33c", "text": "100x", "isCorrect": false}, {"id": "e825a6c9-ba70-4763-86fa-00b0ad63a322", "text": "AB12", "isCorrect": false}, {"id": "9f88c85d-a928-432a-8252-1491bf97f8b5", "text": "55mm", "isCorrect": false}], "timeLimit": 15}, {"id": "e5cade78-e98d-4350-9149-f4edbe8e83ed", "text": "Az osztálytermi ülésrendnél a padsor és a pad száma pontosan megadja a tanuló helyét.", "type": "true-false", "options": [{"id": "7e75f4eb-64c8-49d2-945b-222ad7f7ff6b", "text": "Igaz", "isCorrect": true}, {"id": "c7d1d467-1a50-457d-81f4-8da23441b56c", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "2e23cffe-9dcb-451c-96c8-e82ce4b54b3f", "text": "Hány koordináta (adat) szükséges egy síkbeli pont helyének egyértelmű megadásához?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "2"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '6d40c106-6f5b-4908-83fc-00bbc74138a2',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '89. óra: Helymeghatározás',
        'Tájékozódás, fokhálózat értelmezése, távolság leolvasása térképen.',
        'Matematika',
        '5. osztály',
        'Helymeghatározás, sorozatok',
        '[{"id": "6644d5ab-3483-4480-90ac-2cd70451f48e", "text": "Mit használunk a Föld felszínén a pontos tájékozódáshoz?", "type": "multiple-choice", "options": [{"id": "410ccdd6-f311-4021-b512-f21278982b7b", "text": "Fokhálózatot (szélességi és hosszúsági körök)", "isCorrect": true}, {"id": "78213b86-d5ce-4a96-8921-e8c6fbfe2524", "text": "Vonalzót", "isCorrect": false}, {"id": "74dae19f-959b-483e-a894-c682d9cda162", "text": "Szögmérőt", "isCorrect": false}, {"id": "aa104431-cc9e-46f8-900b-d842f283895b", "text": "Körzőt", "isCorrect": false}], "timeLimit": 15}, {"id": "14cfc76f-a784-4486-85dc-c9dad0cb527f", "text": "A térképek méretaránya megmutatja, hányszor kisebb a térkép a valóságnál.", "type": "true-false", "options": [{"id": "3c524ad4-1064-48e7-a606-55c7fb053620", "text": "Igaz", "isCorrect": true}, {"id": "80a86d3c-8d5e-4e17-a950-cf2bb8207b6c", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "485c2e4d-81c3-47dd-9a49-6dce88b858cf", "text": "Ha a térképen 1 cm a valóságban 100 méternek felel meg, hány méter a valóságban 3 cm?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "300"}, {"id": "8fec1499-bf1b-4704-a97a-a3b44795ae3a", "text": "Melyik égtáj van a iránytűn északra ellentétes irányban?", "type": "multiple-choice", "options": [{"id": "ca644db0-4d9e-47ff-8547-a515ad43472e", "text": "Dél", "isCorrect": true}, {"id": "e1d105fd-0fa3-4efe-8e6d-faa243a05d4e", "text": "Kelet", "isCorrect": false}, {"id": "8b86055a-e859-4c49-94c6-113ab7f53284", "text": "Nyugat", "isCorrect": false}, {"id": "59134bef-d2e7-4ed7-be73-b67a5900cbb6", "text": "Északkelet", "isCorrect": false}], "timeLimit": 15}, {"id": "d3e9b59b-4307-4afd-8d10-62a6ab2ce21c", "text": "A GPS egy műholdas helymeghatározó rendszer.", "type": "true-false", "options": [{"id": "1a8c57a7-6c05-469d-891c-89a337346ced", "text": "Igaz", "isCorrect": true}, {"id": "74631870-a060-46dd-9658-42c967d98707", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "3b6e26e0-d567-4d8b-bb12-f8d45ede180f", "text": "Hány fő égtájat különböztetünk meg?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "4"}, {"id": "804eac19-419f-4288-a484-b6488b5c0f89", "text": "A koordinátákkal megadott helymeghatározás független attól, ki nézi a térképet.", "type": "true-false", "options": [{"id": "2c01abf9-fd54-4563-be8b-66eb8b3b7723", "text": "Igaz", "isCorrect": true}, {"id": "f778a1ac-9f6f-4462-8d48-1900ea68bcac", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '09f71c3d-4ec1-4ded-917a-0be1cef50c82',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '90. óra: A derékszögű koordináta-rendszer',
        'Descartes-féle koordináta-rendszer, tengelyek, origó, koordináták.',
        'Matematika',
        '5. osztály',
        'Helymeghatározás, sorozatok',
        '[{"id": "d1d2bd41-1bac-4da1-b489-aff50855eb97", "text": "Hogyan nevezzük a koordináta-rendszer két tengelyének metszéspontját?", "type": "multiple-choice", "options": [{"id": "863acf8a-1254-4f0b-bc24-0614bc4dc1c5", "text": "Origó", "isCorrect": true}, {"id": "eb2a5131-b6da-428b-a5db-a46ac702a8e1", "text": "Középpont", "isCorrect": false}, {"id": "fc74e972-6a90-4fb6-b891-c2b5f5bee636", "text": "Súlypont", "isCorrect": false}, {"id": "38d4029a-1973-4a91-acd5-949d875adfc8", "text": "Csúcs", "isCorrect": false}], "timeLimit": 15}, {"id": "12bea62f-ac6a-4126-9bd5-c595c86a50c4", "text": "Mik az origó koordinátái a síkban?", "type": "multiple-choice", "options": [{"id": "de958055-1b6e-4aa0-be3f-afe73839b19e", "text": "(0; 0)", "isCorrect": true}, {"id": "e4ea574e-6258-4c41-ba1f-963f433f8839", "text": "(1; 1)", "isCorrect": false}, {"id": "6317fdc4-5502-4695-96b7-2c5d28c41f5a", "text": "(0; 1)", "isCorrect": false}, {"id": "56a5165c-ea54-4947-9e0f-b386695e00f2", "text": "(1; 0)", "isCorrect": false}], "timeLimit": 15}, {"id": "c8a9e91a-a7e3-4d49-af95-7dc37d5e035f", "text": "A derékszögű koordináta-rendszer tengelyei merőlegesek egymásra.", "type": "true-false", "options": [{"id": "7538916f-7b43-4a46-be41-31c12ba46f12", "text": "Igaz", "isCorrect": true}, {"id": "d88adce9-0d1b-4ddc-bb73-1e3563a30837", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "86dd2d14-1bc0-4558-9e3f-77d1a5751465", "text": "Melyik tengelyt szokás vízszintes tengelynek nevezni?", "type": "multiple-choice", "options": [{"id": "a5b125f1-21da-4db4-95e7-72b3c5d5054e", "text": "x tengely (első koordináta)", "isCorrect": true}, {"id": "f9af0afa-90ba-468d-acc5-7e5b9714acc8", "text": "y tengely", "isCorrect": false}, {"id": "6b77d938-ca10-4f26-ab2b-153f6503e367", "text": "z tengely", "isCorrect": false}, {"id": "cc6750dc-3375-4506-a503-f3fc3f8039ce", "text": "vonal tengely", "isCorrect": false}], "timeLimit": 15}, {"id": "ae52a9a3-9b7c-48a8-92fe-b77f6ddac001", "text": "Egy P(3; 5) pont első koordinátája a 3.", "type": "true-false", "options": [{"id": "60759e1d-ea15-44b6-9d09-c1a4ee375f85", "text": "Igaz", "isCorrect": true}, {"id": "148bde6c-c174-4e7d-83b0-a7f5a10201ac", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "d27a578c-63cf-45f7-8eed-4cbfee070bf2", "text": "Hányadik koordináta jelöli a függőleges tengelyen (y tengely) elfoglalt helyet?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "2"}, {"id": "d7b089da-8f76-4f39-8471-bb1974293502", "text": "A Descartes-féle koordináta-rendszerben a tengelyek beosztása egyenlő egységekre van osztva.", "type": "true-false", "options": [{"id": "b2555f1d-7194-415e-afa4-0bea7c0b4b0e", "text": "Igaz", "isCorrect": true}, {"id": "1ac5bd17-6d69-46ec-9dbe-9728bce15538", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '27fc55e6-6062-4674-a469-614061187b00',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '91. óra: Pontok ábrázolása',
        'Pontok megadása és ábrázolása síknegyedekben a koordináta-rendszerben.',
        'Matematika',
        '5. osztály',
        'Helymeghatározás, sorozatok',
        '[{"id": "4756b826-b0e9-4b73-9f54-c5b77e0bb448", "text": "Hol található az A(4; 0) pont?", "type": "multiple-choice", "options": [{"id": "c5a23f46-7840-4ced-9210-bc9b2fd7454b", "text": "Az x (vízszintes) tengelyen", "isCorrect": true}, {"id": "98265bcd-a1e3-4863-9973-913200d72ec8", "text": "Az y (függőleges) tengelyen", "isCorrect": false}, {"id": "3777c6b6-730c-4e27-8165-c5fa1229b21a", "text": "Az origóban", "isCorrect": false}, {"id": "9988377b-3dc5-4206-aa0a-3d8735b5324f", "text": "A II. síknegyedben", "isCorrect": false}], "timeLimit": 15}, {"id": "3632e1ac-84f3-4b13-8abc-0892877e9e7e", "text": "Hol található a B(0; -3) pont?", "type": "multiple-choice", "options": [{"id": "8f27215c-65e4-41f4-919f-7bd3912fc52d", "text": "Az y (függőleges) tengelyen", "isCorrect": true}, {"id": "22ff1f92-87a7-4da0-8370-3f3ed4ae5828", "text": "Az x tengelyen", "isCorrect": false}, {"id": "413b28c6-d01e-463a-b11b-9fb389900974", "text": "Az origóban", "isCorrect": false}, {"id": "6c95ac8f-ded3-4388-bc2b-f844227629d7", "text": "A I. síknegyedben", "isCorrect": false}], "timeLimit": 15}, {"id": "c040e582-576b-400d-9dee-2f89ae29a741", "text": "A P(2; 3) és Q(3; 2) pontok ugyanazt a pontot jelölik a síkban.", "type": "true-false", "options": [{"id": "88462fa2-2b2d-49db-b8da-394372207290", "text": "Igaz", "isCorrect": false}, {"id": "789606fe-cca2-470c-9b39-cc4e5493277b", "text": "Hamis (a koordináták sorrendje számít)", "isCorrect": true}], "timeLimit": 15}, {"id": "701db321-20c6-4bb3-981b-ab0ecf0bbf14", "text": "Hány síknegyedre osztja a koordináta-rendszer a síkot?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "4"}, {"id": "c5766cc6-e336-4332-b57a-53524c82a96a", "text": "Ha egy pont első koordinátája pozitív, a második negatív, melyik síknegyedben van? (pl. (3; -2))", "type": "multiple-choice", "options": [{"id": "9ce8bdee-145e-452b-83c5-9424a7e10bd6", "text": "IV. síknegyed", "isCorrect": true}, {"id": "4b99d110-6411-4e82-8025-d6cbf829d1b1", "text": "I. síknegyed", "isCorrect": false}, {"id": "0d4a5cce-170f-4cba-9a69-f90a8b08ff74", "text": "II. síknegyed", "isCorrect": false}, {"id": "13b7ea3c-e6b1-4497-afce-b769cecb49e9", "text": "III. síknegyed", "isCorrect": false}], "timeLimit": 15}, {"id": "3f85b0a9-4a1e-41bb-b47c-31d79c64a731", "text": "Az I. síknegyedben mindkét koordináta pozitív szám.", "type": "true-false", "options": [{"id": "78637e86-7364-4568-9c2e-e38d25512922", "text": "Igaz", "isCorrect": true}, {"id": "0c62157c-2559-465e-969a-3d6a229ac6ae", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "f802f9ee-9409-4be7-924f-e591ab3cc095", "text": "Mennyi a távolsága a C(0; 5) pontnak az origótól?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "5"}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '26eed180-ad70-4762-a1ee-ba6e03b7c940',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '92. óra: Tájékozódás síkban, térben',
        'Térbeli koordináta-rendszer és tájékozódási lehetőségek.',
        'Matematika',
        '5. osztály',
        'Helymeghatározás, sorozatok',
        '[{"id": "bcf793b9-fdec-45c9-a20b-4618b3db920f", "text": "Hány koordináta szükséges egy térbeli pont helyének pontos megadásához?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "3"}, {"id": "48af8300-4c14-44a6-aa32-bc17c230c66f", "text": "A térbeli koordináta-rendszerben x, y és z tengelyek találkoznak.", "type": "true-false", "options": [{"id": "1615a3c8-fd51-477a-affd-cf47436f37f6", "text": "Igaz", "isCorrect": true}, {"id": "24fbf5e4-e4d6-4f36-8529-4e3ac38d44e9", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "4d114c07-05ab-4a71-be0a-dea8a931764d", "text": "Melyik tárgy helyét határozzuk meg 3 dimenzióban (térben)?", "type": "multiple-choice", "options": [{"id": "ece07ec8-8292-46b8-98d4-27b77bb670a7", "text": "Egy repülőgép helyét a levegőben (szélesség, hosszúság, magasság)", "isCorrect": true}, {"id": "93933212-c3ab-4594-99b1-df0444bb5acb", "text": "Egy rajzot a füzetlap felületén", "isCorrect": false}, {"id": "bc564e27-14f6-4801-936c-18d040f4f8ff", "text": "Egy vonalat a papíron", "isCorrect": false}, {"id": "8ff5630a-a809-4fed-9efe-cbec476749e1", "text": "Egy képet a képernyőn", "isCorrect": false}], "timeLimit": 15}, {"id": "8875a5d9-4a58-4bfb-81c8-3b531afb1ec1", "text": "A tanteremben egy saroktól mért szélesség, hosszúság és magasság megadja a lámpa helyét.", "type": "true-false", "options": [{"id": "e3394989-91f4-4128-9f6c-9c7cb01fe7e7", "text": "Igaz", "isCorrect": true}, {"id": "a439c1a0-2df6-484f-ab80-edd2dc28ad7c", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "32cf67f0-8cd7-4665-bb97-bc8b022f26c3", "text": "A sík két dimenziós, a tér három dimenziós.", "type": "true-false", "options": [{"id": "a7f87d27-ca0c-4ef7-bdd7-e053e6ec35c3", "text": "Igaz", "isCorrect": true}, {"id": "df1c4c45-b7f1-454a-b5f0-19c248e319d9", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "6e64004c-7126-4545-91bc-48a769a23751", "text": "Hány tengely metszéspontja alkotja a térbeli koordináta-rendszer origóját?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "3"}, {"id": "6b4aabea-9946-4d31-a5f8-b21dc407f6a0", "text": "A szélességi és hosszúsági fokok mellett a tengerszint feletti magasság adja meg a térbeli GPS koordinátát.", "type": "true-false", "options": [{"id": "48b2945c-eb23-45b4-9338-d4ce8bef7f46", "text": "Igaz", "isCorrect": true}, {"id": "3b2b359d-69cc-4f97-ae3c-1588c9bd3fef", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'cbd36673-697a-4b83-99a4-6d656d4486f5',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '93. óra: Ritmusok, díszítések',
        'Összefüggések felismerése képeken, mintákban, ritmusokban.',
        'Matematika',
        '5. osztály',
        'Helymeghatározás, sorozatok',
        '[{"id": "65099b3b-45c5-4272-9ece-6aedbf5e7b85", "text": "Mi jellemzi az ismétlődő mintákat (ritmusokat)?", "type": "multiple-choice", "options": [{"id": "02872c9c-f735-4a53-ae17-d6aa0e097fae", "text": "Meghatározott szabály szerint ismétlődnek bennük az elemek", "isCorrect": true}, {"id": "20202b34-6ecf-47ae-a2c9-da5e162fb394", "text": "Teljesen véletlenszerűek", "isCorrect": false}, {"id": "936e29ee-0654-43fe-8c83-323e963fe68d", "text": "Nincs bennük semmi rendszer", "isCorrect": false}, {"id": "b8615e23-2fee-4d28-b4e2-a1518d8fb60f", "text": "Mindig csak 1 elemből állnak", "isCorrect": false}], "timeLimit": 15}, {"id": "6b57d4f4-39a3-4ae0-b418-802e85c4c9fd", "text": "A csempézésnél használt szabályos minták geometriai transzformációkon (eltolás, tükrözés) alapulnak.", "type": "true-false", "options": [{"id": "8e2d7d14-6a71-45ec-8941-4a96cbfc3a0d", "text": "Igaz", "isCorrect": true}, {"id": "e177f004-74e2-4830-84c3-d550781e509b", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "f2a2d736-4a5d-426d-9685-766df32383f8", "text": "Ha a minta: piros, kék, zöld, piros, kék, zöld... Mi a 7. elem?", "type": "multiple-choice", "options": [{"id": "c39bb695-95db-4f76-a9f0-7b450e373755", "text": "Piros", "isCorrect": true}, {"id": "a441264a-aef0-4673-8667-9bc2fa7dd5d0", "text": "Kék", "isCorrect": false}, {"id": "2dcfdd9c-c9bf-4425-89d9-82ecd8e1bb49", "text": "Zöld", "isCorrect": false}, {"id": "6a332162-6f08-4bfd-beea-47f27b1e1578", "text": "Sárga", "isCorrect": false}], "timeLimit": 15}, {"id": "7e924e2b-3192-4467-b74c-dd0de6021fe2", "text": "Ha a ritmus: 2 taps, 1 dobbanás, 2 taps, 1 dobbanás... Hány taps van összesen 3 ciklusban?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "6"}, {"id": "359c44e3-f240-43bf-a7a1-5abc589d5e26", "text": "A díszítősorok készítésekor a szabályos ismétlődés segíti a minta folytatását.", "type": "true-false", "options": [{"id": "330d2a6c-263a-402a-bee4-72a075765522", "text": "Igaz", "isCorrect": true}, {"id": "39f8050a-c80e-4464-aea9-f6a339ac5e3e", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "a366c00b-0c3e-4792-83f2-873a3995d8bb", "text": "Mi következik a sorozatban? A, B, A, B, A, ...", "type": "multiple-choice", "options": [{"id": "43dced37-688e-4a66-8f3a-2eb1a6293341", "text": "B", "isCorrect": true}, {"id": "ccdc3f4b-7fe9-43de-9013-1030f153f422", "text": "A", "isCorrect": false}, {"id": "e3bc9a2e-ca0b-424f-8cc2-d3277a07333c", "text": "C", "isCorrect": false}, {"id": "77f0b0b3-f9ae-45f4-ab1f-daeee1816433", "text": "D", "isCorrect": false}], "timeLimit": 15}, {"id": "8cd4052f-3485-446b-b0a5-cdd2a09d3eb8", "text": "A természetben (pl. fenyőtoboz, virágszirmok) is találhatunk szabályos ritmusokat, mintázatokat.", "type": "true-false", "options": [{"id": "36013356-3035-4420-a8c4-63f76b41d986", "text": "Igaz", "isCorrect": true}, {"id": "5e1d1c22-c5b3-4349-b136-8d2cf5eb1da5", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '1baabbf0-5553-4c0f-b248-f7c8db52111f',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '94. óra: Keressünk összefüggéseket!',
        'Matematikai és nem matematikai összefüggések felismerése.',
        'Matematika',
        '5. osztály',
        'Helymeghatározás, sorozatok',
        '[{"id": "7b50470d-52ab-4ce7-b15d-81e9bbf08c2d", "text": "Milyen összefüggés van a számsorozat elemei között: 3, 6, 9, 12, 15...?", "type": "multiple-choice", "options": [{"id": "105800c1-bc89-4ecb-9e6a-316bf96d19c9", "text": "Mindig 3-at adunk hozzá az előzőhöz (3-as szorzótábla)", "isCorrect": true}, {"id": "11b55bea-c426-490a-8dd5-43773f78a93a", "text": "Mindig megduplázzuk", "isCorrect": false}, {"id": "2434f426-78a2-4176-9b1b-40b60c092908", "text": "Mindig 1-et vonunk ki", "isCorrect": false}, {"id": "87dfc33b-2512-4f77-9044-c55cff94f6fb", "text": "Nincs összefüggés", "isCorrect": false}], "timeLimit": 15}, {"id": "b8a00945-e67a-4b04-894c-db8fba425e32", "text": "Az ábécé betűihez rendelhetünk sorszámokat (pl. A=1, B=2, C=3).", "type": "true-false", "options": [{"id": "c26640e4-273a-4879-9ca3-338eb0d2ffd5", "text": "Igaz", "isCorrect": true}, {"id": "0bf7768c-c1bc-4c26-bda6-0fbea021ccd3", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "0f9027f5-6c57-445f-bb96-259106dfa269", "text": "Mi a hiányzó szám a sorozatban? 5, 10, 15, __, 25", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "20"}, {"id": "215c54d4-c387-4a2a-bb61-7779d7125561", "text": "Ha egy autó 1 óra alatt 60 km-t tesz meg, hány km-t tesz meg 3 óra alatt egyenletes sebességgel?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "180"}, {"id": "15cd770b-c732-4a93-931e-268b4f161940", "text": "Az összefüggések felismerése segít a jövőbeli értékek kiszámításában és megjósolásában.", "type": "true-false", "options": [{"id": "60cea35f-557f-472e-ac40-1e4053f64608", "text": "Igaz", "isCorrect": true}, {"id": "7a16bbb2-3a7f-405b-9047-3ff6beca0d49", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "ee40fa5f-d477-4355-bf96-f8e5bcf363d8", "text": "Melyik állítás igaz az alábbi párra: (1, 2), (2, 4), (3, 6), (4, 8)?", "type": "multiple-choice", "options": [{"id": "ea788b65-c401-4713-a87f-66785fbf51f4", "text": "A második szám a határozott párban mindig a duplája az elsőnek", "isCorrect": true}, {"id": "d37e5354-319c-4173-99c7-85a2d32d846c", "text": "A második szám 1-gyel nagyobb", "isCorrect": false}, {"id": "3e12a71c-68e9-455c-8d19-8fd9a7339d26", "text": "A második szám mindig 5", "isCorrect": false}, {"id": "8e591147-b399-49b3-a316-f2e3f3015fbe", "text": "Nincs kapcsolat", "isCorrect": false}], "timeLimit": 15}, {"id": "9547bbdc-fe0d-4f3e-9506-2ad503741628", "text": "A szabály felismeréséhez legalább 2-3 minta-elem megfigyelése szükséges.", "type": "true-false", "options": [{"id": "504ab301-b240-43a7-b49b-17b85e3cdaf6", "text": "Igaz", "isCorrect": true}, {"id": "fc38cec3-3810-4ac2-ae39-4a2523e5aedd", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        '90707c14-98dc-46ee-90e3-11a0d9ab4fe5',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '95. óra: Sorozatok',
        'A sorozat fogalma, szabály felismerése, folytatása.',
        'Matematika',
        '5. osztály',
        'Helymeghatározás, sorozatok',
        '[{"id": "36206fb1-b4d2-4e27-b051-70086205c6f8", "text": "Mit nevezünk számsorozatnak?", "type": "multiple-choice", "options": [{"id": "534b3144-8a1f-4bf7-8666-5308cac53350", "text": "Számok meghatározott sorrendben elrendezett láncolatát", "isCorrect": true}, {"id": "3c6c1279-981a-48f9-a32c-90b69ff03492", "text": "Véletlenszerűen felírt számokat", "isCorrect": false}, {"id": "76f4e577-7c6e-4d8b-a116-1e69d62e6013", "text": "Egyetlen magányos számot", "isCorrect": false}, {"id": "0cf79e2a-f45b-4e06-8fba-b0db2426d8a7", "text": "Geometriai alakzatot", "isCorrect": false}], "timeLimit": 15}, {"id": "9ea0dd7d-4a6c-43d7-9066-9575be286eef", "text": "Folytasd a sorozatot! 2, 4, 8, 16, __. Mi a következő elem?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "32"}, {"id": "8348ad72-7642-44c8-af05-dcc6e493b640", "text": "Mi a képzési szabálya a 100, 90, 80, 70... sorozatnak?", "type": "multiple-choice", "options": [{"id": "78280b3b-786d-4079-a6e1-41ba85ed396c", "text": "Mindig 10-et vonunk ki az előző elemből", "isCorrect": true}, {"id": "6694283d-d84b-4966-8e84-07d9c177c286", "text": "Mindig 10-et adunk hozzá", "isCorrect": false}, {"id": "476f9caf-27df-4309-9ab9-a6476cb2cfbf", "text": "Mindig elosztjuk 2-vel", "isCorrect": false}, {"id": "35ae2a28-27b9-425d-ae4f-cce01c11ed24", "text": "Mindig 5-öt vonunk ki", "isCorrect": false}], "timeLimit": 15}, {"id": "67af898f-6602-4a77-8268-9522351876fd", "text": "A növekvő sorozatokban a következő elem mindig nagyobb vagy egyenlő az előzőnél.", "type": "true-false", "options": [{"id": "93bedce2-e522-4d58-80bc-ee916e1adbdd", "text": "Igaz", "isCorrect": true}, {"id": "5e621ed5-f64c-469e-ab25-696ac67f9ac6", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "35f63cb8-ecbe-4efd-90d8-4c67db9ae0b0", "text": "Mi a következő elem a 1, 4, 7, 10, 13 sorozatban?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "16"}, {"id": "2e6b3477-7545-450a-a703-a14681e0a0b4", "text": "Egy sorozat megadható kezdőelemmel és a képzési szabállyal.", "type": "true-false", "options": [{"id": "ec2dfadf-0f8e-42a3-a64b-56da84ec9d48", "text": "Igaz", "isCorrect": true}, {"id": "8e005e73-5dc4-4d7a-8f66-8ce9ab71b77a", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "eef4a110-65e5-4742-ada0-33481b5c2811", "text": "Melyik sorozat csökkenő?", "type": "multiple-choice", "options": [{"id": "89d3c837-2f63-45ed-b21d-e0c3baf66f84", "text": "50, 45, 40, 35, 30", "isCorrect": true}, {"id": "77c55a15-8e2b-4187-9e75-1eba4dd4ba6f", "text": "1, 2, 3, 4, 5", "isCorrect": false}, {"id": "9e3ba412-b3d8-4762-83eb-f8b3b281600b", "text": "2, 4, 8, 16", "isCorrect": false}, {"id": "27f488df-c324-45c9-b9da-4812d371b64c", "text": "10, 10, 10, 10", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'f19984c2-0971-49ae-84d4-15ae025ac977',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '96. óra: Sorozatok (gyakorlás)',
        'Sorozatok alkotása, elemekkel megadott sorozatok folytatása.',
        'Matematika',
        '5. osztály',
        'Helymeghatározás, sorozatok',
        '[{"id": "3a639bbc-365a-4e78-97d2-7ea287fb0896", "text": "Ha a sorozat első eleme 5, és a szabály: ''+4'', mi a 3. elem? (5, 9, __)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "13"}, {"id": "8d2ff916-57e7-4859-98e7-b1b6f96e2195", "text": "Mi a hiányzó szám? 1, 3, 9, 27, __ (szabály: *3)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "81"}, {"id": "9d3daaef-49a3-4b52-825c-07f36b4f055b", "text": "A 2, 5, 8, 11 sorozat 5. eleme a 14.", "type": "true-false", "options": [{"id": "8d075b33-2b59-4e7d-99d7-d4170228904f", "text": "Igaz (11 + 3 = 14)", "isCorrect": true}, {"id": "eaf192e3-3947-46cc-882c-d8e3fd1305f8", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "e2f941ec-617c-4aa0-be8f-59ca1e9be968", "text": "Melyik szám NEM illik a sorozatba: 2, 4, 6, 9, 10, 12?", "type": "multiple-choice", "options": [{"id": "1dd37dbf-7ead-4719-9af5-7ab9e41c1d44", "text": "9 (mert páratlan, míg a többi páros)", "isCorrect": true}, {"id": "8d543f00-6cce-46db-9f94-cb6ab9df3216", "text": "2", "isCorrect": false}, {"id": "85b8cbcc-5352-46bb-895b-ff0ba9442937", "text": "4", "isCorrect": false}, {"id": "ab9906e8-dde6-4059-ad27-2e5619058a78", "text": "12", "isCorrect": false}], "timeLimit": 15}, {"id": "e23cb198-b1ba-40e5-aac9-df05ee8cf034", "text": "A váltakozó sorozatokban a műveletek felváltva követhetik egymást (pl. +2, -1, +2, -1).", "type": "true-false", "options": [{"id": "c7112bf7-4735-4bf1-9d9d-12d75e84b1f9", "text": "Igaz", "isCorrect": true}, {"id": "7635fb61-1d0a-4939-b9bd-a0d36756ba06", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "d6c32b4a-9302-4660-9b3e-6907af748a54", "text": "Folytasd a váltakozó sorozatot! 10, 12, 11, 13, 12, 14, __ (szabály: +2, -1)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "13"}, {"id": "0ffe338d-6e7a-49b6-a9c2-3a4d081d8302", "text": "Melyik szabály tartozik a 3, 6, 12, 24 sorozathoz?", "type": "multiple-choice", "options": [{"id": "319556eb-946b-4f7e-8835-c966944685e7", "text": "Szorzás 2-vel (*2)", "isCorrect": true}, {"id": "76f40bea-70bb-49a7-9689-983d5f0adb2a", "text": "Hozzáadás 3-mal (+3)", "isCorrect": false}, {"id": "23e2a122-5ecf-4b01-8635-45ee56330a81", "text": "Kivonás 2-vel", "isCorrect": false}, {"id": "ec70fea6-41db-4bbc-b852-4d42ac1930ba", "text": "Osztás 2-vel", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

INSERT INTO quizzes (id, teacher_id, title, description, subject, grade_level, topic, questions, is_published, published_at, created_at, updated_at)
    VALUES (
        'ae997a6a-8584-4c5f-ade7-34100ba3d7db',
        '21feff02-016d-46e2-bb9d-c27495133b1b',
        '97. óra: Nevezetes, érdekes sorozatok',
        'Híres matematikai sorozatok (Fibonacci-sorozat, négyzetszámok stb.).',
        'Matematika',
        '5. osztály',
        'Helymeghatározás, sorozatok',
        '[{"id": "ec37c573-81da-4acd-9736-6da10c8c9fe4", "text": "Hogyan kapjuk meg a Fibonacci-sorozat következő elemét? (1, 1, 2, 3, 5, 8, 13...)", "type": "multiple-choice", "options": [{"id": "c4d57137-9ace-44a6-b981-164a861db31b", "text": "Az előző két szám összegéből", "isCorrect": true}, {"id": "6ef50edb-6909-4fb0-90ee-506989c5b75f", "text": "Az előző szám szorzatából", "isCorrect": false}, {"id": "9088e7f3-a812-44ba-a267-c5eb1a72a904", "text": "Mindig 2 hozzáadásával", "isCorrect": false}, {"id": "cbf32480-9189-46d6-a82d-95b09999aaff", "text": "Véletlenszerűen", "isCorrect": false}], "timeLimit": 15}, {"id": "d6c2bf4e-b8d4-487a-9ba3-c3fd127f210d", "text": "Mi a következő szám a Fibonacci-sorozatban: 1, 1, 2, 3, 5, 8, 13, __?", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "21"}, {"id": "19b17fea-1fb0-4b1e-aaef-302fdfb84c98", "text": "Melyek a négyzetszámok sorozatának első elemei? (1*1, 2*2, 3*3, 4*4...)", "type": "multiple-choice", "options": [{"id": "fc7ea855-1771-4c47-8633-bb65d25e69c5", "text": "1, 4, 9, 16, 25", "isCorrect": true}, {"id": "6d437f2d-6a97-4369-bbe9-f2f16df9cb06", "text": "1, 2, 3, 4, 5", "isCorrect": false}, {"id": "d7deee05-214a-41a9-bfc4-d97944264e1c", "text": "2, 4, 6, 8, 10", "isCorrect": false}, {"id": "ba43caa4-0171-48a0-b652-2693bbcec370", "text": "1, 3, 5, 7, 9", "isCorrect": false}], "timeLimit": 15}, {"id": "a233c0a7-eb8f-4676-bb32-d3f13372adb3", "text": "Mi a 6. négyzetszám? (6 * 6)", "type": "text-input", "options": [], "timeLimit": 20, "correctAnswer": "36"}, {"id": "d9422a60-7b81-4cae-b1cf-6d3d9ae8baaf", "text": "A páratlan számok sorozata (1, 3, 5, 7, 9...) egy számtani sorozat 2-es különbséggel.", "type": "true-false", "options": [{"id": "e365a6b6-45b2-426b-a44f-3be756705a22", "text": "Igaz", "isCorrect": true}, {"id": "e59c1310-d594-4090-b5ea-1793f2085d55", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "17f8694e-e258-44cb-a421-bc569bd4666c", "text": "A Fibonacci-sorozat a természetben is megtalálható (pl. virágszirmok száma, csigaház spirálja).", "type": "true-false", "options": [{"id": "5d50f2af-77a3-4af7-9225-8c6145bc4082", "text": "Igaz", "isCorrect": true}, {"id": "44230c44-5a13-4392-be37-6340c674f670", "text": "Hamis", "isCorrect": false}], "timeLimit": 15}, {"id": "bd431d51-711b-4812-ae0e-7a36b5b1ad41", "text": "Mi a következő elem a 2, 3, 5, 7, 11, 13 sorozatban? (Prímszámok)", "type": "multiple-choice", "options": [{"id": "55ffb5f7-5783-4ffc-86bf-2020a8fc97b9", "text": "17", "isCorrect": true}, {"id": "9150bc48-0812-4d99-bbba-3c3e76f8237a", "text": "15", "isCorrect": false}, {"id": "cf61611a-f5d3-4c0f-a702-c75d2855e9e3", "text": "14", "isCorrect": false}, {"id": "5649b23c-e1dd-48c8-a28b-c3d471aa2f1f", "text": "16", "isCorrect": false}], "timeLimit": 15}]'::jsonb,
        true,
        NOW(),
        NOW(),
        NOW()
    );

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