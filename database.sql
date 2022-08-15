CREATE DATABASE library;

CREATE TABLE readers(
    id INT NOT NULL UNIQUE PRIMARY KEY,
    fname VARCHAR(20) NOT NULL,
    lname VARCHAR(20) NOT NULL,
    email VARCHAR(320) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    dateOfBirth DATE NOT NULL
);

INSERT INTO readers(
    id, fname, lname, email, phone, dateOfBirth)
VALUES(1, 'Farhod', 'Nazarov', 'farxodnazarov0728@gmail.com', '+998903228797', '1997-07-28'),
      (2, 'Vali', 'Aliyev', 'valialiyev@gmail.com', '+998903228767', '1995-06-18'),
      (3, 'Ali', 'Valiyev', 'alivaliyev@gmail.com', '+998903228790', '1996-04-23');

CREATE TABLE books(
    id INT NOT NULL UNIQUE PRIMARY KEY,
    isbn VARCHAR(100) NOT NULL,
    title VARCHAR(500) NOT NULL,
    gener VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    author VARCHAR(20) NOT NULL,
    publishYear DATE NOT NULL
);

INSERT INTO books(
    id, isbn, title, gener, description, author, publishYear)
VALUES(1, 's412a5', 'Bahor qaytib', 'ertak', 'Bahor haqida', 'Ali', '19990112'),
      (2, 'sa455', 'Qo''zichoq va bo''ri', 'ertak', 'ibratli juda zo''r','Salimxon', '1995-06-18'),
      (3, 'adsd55', 'Valiyev', 'alivaliyev@gmail.com', '+998903228790','Oybek', '1996-04-23');

CREATE TABLE rental_info(
    reader_id int NOT NULL,
    book_id int NOT NULL,
    created_at DATE,
    returned_at DATE DEFAULT null,
    FOREIGN KEY (reader_id) REFERENCES readers(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

ALTER TABLE rental_info ADD CONSTRAINT
    DF_rental_info_created_at DEFAULT GETDATE() FOR created_at;

