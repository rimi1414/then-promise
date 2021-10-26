'use strict';


const router = require('express-promise-router')({
        mergeParams: true
    }),
    // validate = require('express-jsonschema').validate,
    logic = require('./logic')

router.get('/',
   async (req, res) => {
        const result = await logic.getPofile(Number(req.params.profileId))
        res.status(200).json({result});

    });

router.put('/',
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
    //                     age: {type: "number", minimum:18, maximum: 130, required: true},
    //                     eye_color: {type:'string', minimum:3, maximum: 20, required: true},
    //                     body: {type:'string', enum:['חטוב', 'שמן'], required: true},
    //                     relegen: {type:'string', enum:['דתי', 'אטאיסט', 'מסורתי' ,'חילוני' ], required: true}
    //                 }
    //             },
    //
    //         }
    //     }
    // }),
    (req, res) => {
        logic.updateProfile(Number(req.params.profileId), req.body.profile, result => {
            res.status(200).json({result});
        });

    });
router.delete('/',
    (req, res) => {
        logic.removeProfile(Number(req.params.profileId)).then(result => {
            res.status(200).json({result});
        });
    });
router.patch('/',
    (req, res) => {
        const result = logic.updateProfileType(Number(req.params.profileId), req.body.profile);
        res.status(200).json({result});
    });

router.use('/friends', require('./friends'));

module.exports = router;
