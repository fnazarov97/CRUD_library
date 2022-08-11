const DB = require('../data/data')
const fileName = "library.json"

const BookedController = (req, res) => {
    const library = DB.readFromFile(fileName)
    let idr = parseInt(req.params.idr)
    let idb = parseInt(req.params.idb)
    if(idr && idb){
        let findReader = library.readers.find(r => r.id == idr)
        let findBook = library.books.find(b => b.id == idb)
        if(!findReader){
            res.status(404).json(`id:${idr} reader not found in readers base!`)
            return
        }
        if(!findBook){
            res.status(404).json(`id:${idb} book not found in books base!`)
            return
        }
        let find1 = library.rental_info.find(e => e.reader_id == idr)
        if(!find1){
            library.rental_info.push({
                reader_id:idr,
                book_id:idb,
                booked_day:new Date(),
                returned_day:null,
                created_at:new Date()
            })
            DB.saveToFile(library, fileName)
            res.status(200).json("Saccessfully created!")
            return
        }else{
            if(find1.returned_day != null){
                library.rental_info.push({
                    reader_id:idr,
                    book_id:idb,
                    booked_day:new Date(),
                    returned_day:null,
                    created_at:new Date()
                })
                DB.saveToFile(library, fileName)
                res.status(200).json("Saccessfully created!")
                return
            }
            res.status(200).json("Book isn't returned!")
            return
        }
        
    }else{
        res.status(400).json("reader_id and book_id are required!");
    }
}

const ReturnedController = (req, res) => {
    const library = DB.readFromFile(fileName)
    let idr = parseInt(req.params.idr)
    let idb = parseInt(req.params.idb)
    if(idr && idb){
        let found = library.rental_info.find(e => e.reader_id == idr && e.returned_day == null)
        if(found){
            let index = library.rental_info.indexOf(found)
            found.returned_day = new Date()
            found.created_at = new Date()
            library.rental_info[index] = found
            DB.saveToFile(library, fileName)
            res.status(200).json("Saccessfully updated!")
            return
        }
        res.status(200).json("All books were returned!")
    }else{
        res.status(400).send("reader_id and book_id are required!");
        return
    }
}

const ReadControllerById = (req, res) => {
    const library = DB.readFromFile(fileName)
    let idr = req.params.idr
    let reader = library.readers.find(r => r.id == idr)
    if(!reader){
        res.status(404).json(`Reader isn't found in readers base!`)
        return
    }
    if(!library.rental_info.length){
        res.status(200).json("rental_info is empty!")
        return
    }
    let readersList = library.rental_info.filter(r => r.reader_id == reader.id)
    if(readersList.length){
        readersList.forEach(rL => {
            library.books.forEach(b => {
                if(rL.book_id == b.id){
                    rL.books = []
                    rL.books.push(b)
                }
            })
        })
    }
    res.status(200).json(readersList)
}
 
module.exports = {
    BookedController,
    ReturnedController,
    ReadControllerById
}