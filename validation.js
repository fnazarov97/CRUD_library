function validateReader(res, reader) {
    if (!reader["id"] ||
        !reader["fname"] ||
        !reader["lname"] ||
        !reader["email"] ||
        !reader["phone"] ||
        !reader["dateOfBirth"] ||
        !reader["address"]
    ) {
        res.status(400)
        res.json("Invalid fields")
        return false
    }
    return true
}

function validateBook(res, book) {
    if (!book["id"] ||
        !book["isbn"] ||
        !book["title"] ||
        !book["gener"] ||
        !book["description"] ||
        !book["author"] ||
        !book["publishYear"]
    ) {
        res.status(400)
        res.json("Invalid fields")
        return false
    }
    return true
}

module.exports = {
    validateReader,
    validateBook
}