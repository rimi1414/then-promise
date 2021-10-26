'use strict';


const router = require('express-promise-router')({
        mergeParams: true
    }),
    validate = require('express-jsonschema').validate,
    logic = require('./logic')

router.get('/',
   async (req, res) => {
       const result = await logic.getFriends(Number(req.params.profileId))
        res.status(200).json({result});
    });


router.post('/',
    validate({
        body:{
            type: 'object',
            additionalProperties: false,
            properties:{
                profiles:{
                    type: 'object',
                    additionalProperties: false,
                    friends:{
                        id: {type: "number", minimum:5, maximum: 30, required: true},
                    }
                },

            }
        }
    }),
   async (req, res) => {
       const result = await logic.createFriends(req.body.friends, Number(req.params.profileId))
        res.status(200).json({result});
    });

router.use('/:friendType', require('./friend'));
module.exports = router;
