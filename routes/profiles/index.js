'use strict';


const router = require('express-promise-router')({
        mergeParams: true
    }),
    // validate = require('express-jsonschema').validate,
    logic = require('./logic')

router.get('/',
   // validate({
   //     query:{
   //         type: 'object',
   //         additionalProperties: false,
   //         properties:{
   //             ageIsGreater:{type: ['number', 'string'], format: 'numeric', minimum: 0, maximum: 1000, required: false}
   //         }
   //     }
   // }),
   async (req, res) => {
       const result = await logic.getPofiles(req.query)
       res.status(200).json({result});
    });

router.post('/',
    // validate({
    //     body:{
    //         type: 'object',
    //         additionalProperties: false,
    //         properties:{
    //             profiles:{
    //                 type: 'object',
    //                 additionalProperties: false,
    //                 properties:{
    //                     name:{type:'string', minimum:3, maximum: 20, required: true},
    //                     age: {type: 'string', minimum:18, maximum: 130, required: true},
    //                     eye_color: {type:'string', minimum:3, maximum: 20, required: true},
    //                     body: {type:'string', enum:['חטוב', 'שמן'], required: true},
    //                     heigth:{type: "number", minimum:150, maximum: 250, required: true},
    //                     relegen: {type:'string', enum:['דתי', 'אטאיסט','מסורתי','חילוני'], required: true}
    //
    //                 }
    //             },
    //
    //         }
    //     }
    // }),
    async (req, res) => {
        const result = await logic.createProfile(req.body.profiles)
        res.status(200).json({result});
    });


router.use('/:profileId', require('./profile'));

module.exports = router;
