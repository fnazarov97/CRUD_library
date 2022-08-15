const { Pool } =require('pg')

const pool = new Pool({
    user: 'postgres',
    password: '666997',
    port:5432,
    database:'library'
})

let SQL = `
    INSERT INTO rental_info(
        reader_id,
        book_id,
        created_at,
        returned_at
    ) VALUES ($1, $2, $3, $4) RETURNING *
`
let a = [1, 2, '2022-10-21', null]
let query = async (SQL, array) => {
    let client = await pool.connect()
    try {
        let { rows: [row] } = await client.query(SQL, array ? array : null)
        console.log(row)
    } catch ( error ) {
        console.log(error)
    } finally {
        client.release()
    }
}

let queryAll = async (SQL, array) => {
    let client = await pool.connect()
    try {
        let { rows } = await client.query(SQL, array ? array : null)
        return rows
    } catch ( error ) {
        console.log(error)
    } finally {
        client.release()
    }
}

query(SQL, a)

module.exports = { query, queryAll }