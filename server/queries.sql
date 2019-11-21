/* eslint-disable */
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


update leaderboards set leaderboard_jsonb = leaderboard_jsonb - 1
where id = 1;

/* Inserting a new leaderboard */
INSERT INTO leaderboards(quiz_id, leaderboard)
VALUES (quiz_id, ('[]'));

/* Updating a leaderboard with a new result */
update leaderboards SET leaderboard = leaderboard || '{"course": "Fall 19 Stockholm", "percentage": "85"}'
WHERE quiz_id = [insert quiz_id]

/* Creating a quiz and a leaderboard */
INSERT INTO quizzes(name, description)
VALUES ("Quiz Name", "Quiz Description");
INSERT INTO leaderboards(quiz_id, leaderboard)
VALUES("ID from quiz inserted above", ('[]'))