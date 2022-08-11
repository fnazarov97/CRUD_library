const DB = require('../data/data')
const fileName = "library.json"
const { validateReader } = require('../validation')

const CreateController = (req, res) => {
    const library = DB.readFromFile(fileName)
    let reader = req.body
    if(!validateReader(res, reader)){
        return
    }
    let found = library.readers.find(r => r.id == reader.id)
    if(found){
        res.status(400).json(`id:${reader.id} reader has been exist already!`)
        return 
    }
    reader.createdAt = new Date()
    library.readers.push(reader)
    DB.saveToFile(library, fileName)
    res.status(200).json("Created Saccessfully!")
}

const ReadController = (req, res) => {
    const library = DB.readFromFile(fileName)
    if(!library.readers.length){
        res.status(404).json("Empty data base!")
        return
    }
    res.status(200).json(library.readers)
}

const ReadControllerById = (req, res) => {
    const library = DB.readFromFile(fileName)
    let id = req.params.id
    let found = library.readers.find(r => r.id == id)
    if(!found){
        res.status(404).json(`${id}-id reader not found!`)
        return
    }
    res.status(200).json(found)

}

const ReadControllerByName = (req, res) => {
    const library = DB.readFromFile(fileName)
    let fname = req.params.fname.toLowerCase()
    let readers = library.readers.filter( r => (r.fname+ ' ' + r.lname).toLowerCase().includes(fname))
    if (readers.length) {
        res.json(readers)
    } else {
        res.status(404).json("Not found")
    }
}

const UpdateControllerById = (req, res) => {
    const library = DB.readFromFile(fileName)
    let id = req.params.id
    let reader = req.body
    if(!validateReader(res, reader)){
        return
    }
    if(!library.readers[id-1]){
        res.status(404).json(`${id}-id reader not found!`)
        return
    }
    reader.createdAt = library.readers[id-1].createdAt
    reader.updatedAt = new Date()
    library.readers[id-1] = reader
    DB.saveToFile(library, fileName)
    res.status(200).json("Saccessfully updated!")
}

const DeleteControllerById = (req, res) => {
    const library = DB.readFromFile(fileName)
    let id = parseInt(req.params.id)
    let found = library.readers.find(r => r.id == id)
    if(!found){
        res.status(404).json(`${id}-id reader not found!`)
        return
    }
    library.readers = library.readers.filter(r => r.id != id)
    DB.saveToFile(library, fileName)
    res.status(200).json("Saccessfully deleted!")

}

module.exports = {
    CreateController,
    ReadController,
    ReadControllerById,
    ReadControllerByName,
    UpdateControllerById,
    DeleteControllerById

}