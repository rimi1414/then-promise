'use strict';

const tableName = 'profiles',
    database = require('../../../../middleware/database')
module.exports = {
    selectFriends, insertFriends
};

async function selectFriends(profileId) {
   const profile = await  database.select(tableName, profileId);
    return   profile[0].friends;

}

function insertFriends(friend, friendId){
    return  database.insert(tableName, friend, friendId);
   
}