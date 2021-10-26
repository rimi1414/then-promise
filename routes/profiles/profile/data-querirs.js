'use strict';

const tableName ='profiles',
    database = require('../../../middleware/database')
module.exports = {
    selectProfile, updateProfile, deleteProfile, updateProfileType
};

function  selectProfile(id){
   return  database.select(tableName, id)
}
function updateProfile(id, profile, callback){
    return database.update(tableName, id, profile, result =>{
        callback(result)
    })
}
function deleteProfile  (id){
    return database.remove(tableName, id);
}

function updateProfileType(id, profile) {
    return database.updateType(tableName, id, profile);
}