INSERT INTO Questions (question, answers, quiz_id)
VALUES (
'What is the correct syntax for referring to an external script called "xxx.js"?',
('[
 {"option":"one","correct":"true"},
 {"option":"two","correct":"false"},
 {"option":"three","correct":"false"},
 {"option":"four","correct":"false"}
 ]'),
(SELECT id from Quizzes WHERE name = 'Introductory JavaScript Quiz'))