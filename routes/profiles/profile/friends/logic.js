'use strict';

const dataQueries = require('./data-querirs.js')

module.exports = {
    getFriends , createFriends
};

function getFriends(profileId){
    return  dataQueries.selectFriends(profileId)
}

function createFriends(friend, friendId ){
    return  dataQueries.insertFriends(friend, friendId)
}