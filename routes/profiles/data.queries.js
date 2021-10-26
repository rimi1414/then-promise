'use strict';

const tableName ='profiles',
database = require('../../middleware/database')
module.exports = {
   selectProfiles, insertProfile
};

async function  selectProfiles(query){
   let items = await database.select(tableName)
    if(query.ageIsGreater){
        items = items.filter(profile => profile.age >= query.ageIsGreater)
    }
    if(query.ageIsLower){
        items = items.filter(profile => profile.age < query.ageIsLower)
    }
    return items;

}
function insertProfile(profile){
  return database.insert(tableName, profile);

}