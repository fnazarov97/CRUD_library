const fs = require('fs')

function saveToFile(data, fileName) {
    let stringData = JSON.stringify(data, null, "\t")
    fs.writeFile(fileName, stringData, err => {
        if (err) console.log(err)
    })
}

function readFromFile(fileName) {
    let rowData = fs.readFileSync(fileName, 'utf8');
    let jsonData = JSON.parse(rowData)
    return jsonData
}

module.exports = {
    saveToFile,
    readFromFile
}