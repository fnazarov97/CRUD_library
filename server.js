let PORT = process.env.PORT || 3000
const express = require('express')
const server = express()

//for send JSON data
server.use(express.json())

const Reader = require('./controller/reader')
const Book = require('./controller/book')
const Rental = require('./controller/rental_info')

//READER
server.post('/reader', Reader.CreateController)
server.get('/reader', Reader.ReadController)
server.get('/reader/:id', Reader.ReadControllerById)
server.get('/reader/filter/:fname', Reader.ReadControllerByName)
server.put('/reader/:id', Reader.UpdateControllerById)
server.delete('/reader/:id', Reader.DeleteControllerById)

//BOOK
server.post('/book', Book.CreateController)
server.get('/book', Book.ReadController)
server.get('/book/:id', Book.ReadControllerById)
server.get('/book/filter/:title', Book.ReadControllerByTitle)
server.put('/book/:id', Book.UpdateControllerById)
server.delete('/book/:id', Book.DeleteControllerById)

//RENTAL_INFO
server.post('/rental/:idr/:idb/booked', Rental.BookedController)
//UPDATE
server.put('/rental/:idr/:idb/returned', Rental.ReturnedController)
//JOINED RENTAL_INFO
server.get('/rental/:idr', Rental.ReadControllerById)


server.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}...`)
})