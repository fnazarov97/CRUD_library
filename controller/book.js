const DB = require('../data/data')
const fileName = "library.json"
const { validateBook } = require('../validation')

const CreateController = (req, res) => {
    const library = DB.readFromFile(fileName)
    let book = req.body
    if(!validateBook(res, book)){
        return
    }
    let found = library.books.find(b => b.id == book.id)
    if(found){
        res.status(400).json(`id:${book.id} book has been exist already!`)
        return 
    }
    book.createdAt = new Date()
    library.books.push(book)
    DB.saveToFile(library, fileName)
    res.status(200).json("Created Saccessfully!")
}

const ReadController = (req, res) => {
    const library = DB.readFromFile(fileName)
    if(!library.books.length){
        res.status(404).json("Empty data base!")
    }
    res.status(200).json(library.books)
}

const ReadControllerById = (req, res) => {
    const library = DB.readFromFile(fileName)
    let id = req.params.id
    let found = library.books.find(b => b.id == id)
    if(!found){
        res.status(404).json(`${id}-id book not found!`)
        return
    }
    res.status(200).json(found)
}

const ReadControllerByTitle = (req, res) => {
    const library = DB.readFromFile(fileName)
    let title = req.params.title.toLowerCase()
    let books = library.books.filter( b => b.title.toLowerCase().includes(title))
    if (books.length) {
        res.json(books)
    } else {
        res.status(404).json("Not found")
    }
}

const UpdateControllerById =(req, res) => {
    const library = DB.readFromFile(fileName)
    let id = req.params.id
    let book = req.body
    if(!validateBook(res, book)){
        return
    }
    if(!library.books[id-1]){
        res.status(404).json(`${id}-id book not found!`)
        return
    }
    book.createdAt = library.books[id-1].createdAt
    book.updatedAt = new Date()
    library.books[id-1] = book
    DB.saveToFile(library, fileName)
    res.status(200).json("Saccessfully updated!")
}

const DeleteControllerById = (req, res) => {
    const library = DB.readFromFile(fileName)
    let id = parseInt(req.params.id)
    let found = library.books.find(b => b.id == id)
    if(!found){
        res.status(404).json(`${id}-id book not found!`)
        return
    }
    library.books = library.books.filter(r => r.id != id)
    DB.saveToFile(library, fileName)
    res.status(200).json("Saccessfully deleted!")
}

module.exports = {
    CreateController,
    ReadController,
    ReadControllerById,
    ReadControllerByTitle,
    UpdateControllerById,
    DeleteControllerById

}