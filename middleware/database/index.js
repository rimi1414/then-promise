'use strict';

const fs = require('fs').promises,
    fsCallback = require('fs'),

    errorMessage = 'no such table';

module.exports = {
    select,
    insert,
    remove,
    update,
    updateType
};

async function select(tableName, id) {
    const db = await _readFile();
    if (!db[tableName]) {
        return {msg: errorMessage};
    }
    let arr = db[tableName];
    if (id) {
        arr = _searchById(arr, id);
    }
    return arr;
}

async function insert(tableName, item, profileId) {
    let db = await _readFile();
    if (!db[tableName]) {
        return {msg: errorMessage};
    }
    if (!db[tableName][profileId]) {
        item.id = new Date().getTime();
        db[tableName].push(item);
          _writeFile(db);
        return item;
    }

    else {
        const index =  _foundIndexById(tableName, profileId)
        db[tableName][index].friends.push(item);
          _writeFile(db);
        return db[tableName][index].friends;

    }

}

function remove(tableName, id) {
   return  _readFile().then(db => {
        if (!db[tableName]) {
            return {msg: errorMessage};
        }

        db[tableName] = db[tableName].filter(row => row.id !== id);
        return _writeFile(db);
    });

}


function update(tableName, itemId, item, callback) {
    _readFileCallback(db => {
        if (!db[tableName]) {
            return {msg: errorMessage};
        }
        const rows = db[tableName];
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].id === itemId) {
                Object.assign(rows[i], item);
                _writeFileCallback(db);
                callback(item);

            }
        }
    })
}

function _searchById(arr, id) {
    return arr.filter(item => item.id === id);
}

function _foundIndexById(table, id) {
    return  _readFile()
        .then(db => {
        let arr = db[table]
        let foundIndex = undefined
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item.id == id) {
                foundIndex = i
              return foundIndex
            }
        }
    })


}

function updateType(tableName, itemId, item) {
    if (!db[tableName]) {
        return {msg: errorMessage};
    }
    const rows = db[tableName];
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].id === itemId) {
            Object.assign(rows[i], item);
            return;

        }
    }
}

async function _readFile() {
    let db = [];
    try {
        db = await  fs.readFile(__dirname + '/db-data.txt',{encoding: 'utf8', flag: 'r'})
       db = JSON.parse(db);
    } catch (e){
        console.error(e);
    }

        return db;


}

function _writeFile(db) {
    try{
        db = JSON.stringify(db);
        fs.writeFile(__dirname + '/db-data.txt', db);
    } catch (e){
        console.error(err)
    }
}

function _readFileCallback(callback) {
    fsCallback.readFile(__dirname + '/db-data.txt',
        {encoding: 'utf8', flag: 'r'},
        (err, db) => {
            if (err) {
                console.error(err)
            }
            callback(JSON.parse(db));
        });

}

function _writeFileCallback(db) {
    db = JSON.stringify(db)
    fsCallback.writeFile(__dirname + '/db-data.txt', db, (err) => {
        if (err) return console.error(err);
    })};


