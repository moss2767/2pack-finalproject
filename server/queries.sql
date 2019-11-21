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

SELECT quizzes.id, quizzes.name, questions.question, questions.answers FROM questions
INNER JOIN quizzes ON questions.quiz_id = quizzes.id
WHERE questions.quiz_id = 1

UPDATE leaderboards SET leaderboard_jsonb = leaderboard_jsonb || '{"country": "Egypt"}'
where id = 1;

update leaderboards set leaderboard_jsonb = leaderboard_jsonb - 1
where id = 1;