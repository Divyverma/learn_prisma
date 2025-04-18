CREATE TABLE todo_table(
    todo_id SERIAL PRIMARY KEY,
    todo_desc VARCHAR(250),
    todo_completed BOOLEAN DEFAULT false
)

INSERT INTO todo_table (todo_desc, todo_completed)
VALUES ('Buy groceries', true);