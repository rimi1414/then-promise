'use strict';

const dataQueries = require('./data.queries');

module.exports = {
    getPofiles , createProfile
};

 function getPofiles(query){
   return  dataQueries.selectProfiles(query);

}
function createProfile(profile){
   return  dataQueries.insertProfile(profile)
}
