// const e = require('express')
// const DB = require('../data/data')
// const fileName = "library.json"

// const BookedController = (req, res) => {
//     const library = DB.readFromFile(fileName)
//     let idr = parseInt(req.params.idr)
//     let idb = parseInt(req.params.idb)
//     if(idr && idb){
//         let findReader = library.readers.find(r => r.id == idr)
//         let findBook = library.books.find(b => b.id == idb)
//         if(!findReader){
//             res.status(404).json(`id:${idr} reader not found in readers base!`)
//             return
//         }
//         if(!findBook){
//             res.status(404).json(`id:${idb} book not found in books base!`)
//             return
//         }
//         if(library.rental_info.length){
//             let fin = library.rental_info.find(e => e.reader_id == idr && !e.returned_day)
//             let foundList = library.rental_info.filter(e => e.reader_id == idr) // && e.book_id == idb && e.returned_day==null
//             if(foundList.length){
//                 let checLoop = 0
//                 foundList.forEach(fL => {
//                     if(fL.returned_day == null){
//                         checLoop = 1
//                         res.status(400).send(`reader_id:${idr} reader took book already and isn't returne!`);
//                         return
//                     }
//                     return
//                 })
//                 if(checLoop){
//                     return
//                 }
//             }else{
//                 //reader kitobni returned qilgandan keyin olayotganda
//                 library.rental_info.push({
//                     reader_id:idr,
//                     book_id:idb,
//                     booked_day:new Date(),
//                     returned_day:null,
//                     created_at:new Date()
//                 })
//                 DB.saveToFile(library, fileName)
//                 res.status(200).json("Saccessfully created!")
//                 return
//             } 
//         }
//         //birinchi holda kitob olinayotganda
//         library.rental_info.push({
//             reader_id:idr,
//             book_id:idb,
//             booked_day:new Date(),
//             returned_day:null,
//             created_at:new Date()
//         })
//         DB.saveToFile(library, fileName)
//         res.status(200).json("Saccessfully created!")
//         return
//     }else{
//         res.status(400).json("reader_id and book_id are required!");
//     }
// }

// const ReturnedController = (req, res) => {
//     const library = DB.readFromFile(fileName)
//     let idr = parseInt(req.params.idr)
//     let idb = parseInt(req.params.idb)
//     let findR = library.readers.find(r => r.id == idr)
//     if(idr && idb){
//         if(!findR){
//             res.status(404).json("Reader not found in readers base!")
//             return
//         }    
//         let findBook = library.books.find(b => b.id == idb)
//         if(!findBook){
//             res.status(404).json(`id:${idb} book not found in books base!`)
//             return
//         }
//         if(library.rental_info.length){
//             let foundList = library.rental_info.filter(e => e.reader_id == idr)
//             if(foundList.length){
//                 let checkLoop = 0
//                 foundList.forEach(fL => {
//                     if(fL.returned_day){
//                         checkLoop = 1
//                         res.status(200).json('All books were returned!')
//                         return
//                     }
//                     return
//                 })
//                 if(checkLoop){
//                     return
//                 }
//                 let index = library.rental_info.indexOf(foundList[foundList.length-1])
//                 let updatedReader = library.rental_info[index]  
//                 updatedReader.returned_day = new Date()
//                 updatedReader.updated_at = new Date()
//                 DB.saveToFile(library, fileName)
//                 res.status(200).json('Successfully updated!')
//                 return
//             }else{
//                 res.status(400).json('This reader no in the rental_info!')
//                 return
//             }
             
//         }else{
//             res.status(400).json('Rental_info is empty!')
//             return
//         }
//     }else{
//         res.status(400).send("reader_id and book_id are required!");
//         return
//     }
// }

// const ReadControllerById = (req, res) => {
//     const library = DB.readFromFile(fileName)
//     let idr = req.params.idr
//     let reader = library.readers.find(r => r.id == idr)
//     if(!reader){
//         res.status(404).json(`Reader isn't found in readers base!`)
//         return
//     }
//     if(!library.rental_info.length){
//         res.status(200).json("rental_info is empty!")
//         return
//     }
//     let readersList = library.rental_info.filter(r => r.reader_id == reader.id)
//     if(readersList.length){
//         readersList.forEach(rL => {
//             library.books.forEach(b => {
//                 if(rL.book_id == b.id){
//                     rL.books = []
//                     rL.books.push(b)
//                 }
//             })
//         })
//     }
//     res.status(200).json(readersList)
// }
 
// module.exports = {
//     BookedController,
//     ReturnedController,
//     ReadControllerById
// }