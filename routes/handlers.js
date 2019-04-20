let express= require('express');
const router= express.Router();

const orm= require('../config/orm')
router.get('/', function(req,res){
    orm.selectAllBy('is_favorite', false,function(error,burgers){
        if(error){
            return res.status(501).json({
                message: 'sorry, cant query database'
            })
        }
        res.render('index', {burgers, style: 'index'});
    })
});

router.get('/all', (req,res)=> {
    orm.selectAll(function(error,burgers){
        if(error){
            return res.status(501).json({
                message: 'sorry, cant query database'
            })
        }
        res.render('allBurgers', {burgers, style: 'all'});
    })
})
router.get('/favorites', (req,res)=> {

    orm.selectAllBy('is_favorite',true,function(error,burgers){
        if (error) {
            return res.status(501).json({
                message: 'unable to add favorite to database'
            })
        }
        res.render('favorites', {burgers, style: 'favorite'});
    })
   
})

router.post('/add',function (req,res) {
    const burgerName= req.body.burger_name;
    const isFavorite= req.body.isFavorite;

    orm.insertOne(burgerName, function (error, burger) {
        if (error) {
            return res.status(401).json({
                message: 'unable to add burger'
            });
        }
        return res.json({
            burger_name: burgerName,
            id: burger.insertId,
            is_favorite: 0
        });
    });
});


router.delete('/delete/:id', (req,res)=> {
    const id= req.params.id;
    orm.deleteOne(id, function(err, burger) {
        if (err) {
            return res.status(501).json({
                message: 'cannot delete'
            })
        }
        return res.json({
            id
        })
    })

})

router.put("/:id/:value", function (req, res) {
    const id = req.params.id;
    const condition = JSON.parse(req.params.value);

    orm.updateOne(condition, id, function(error, burger) {
        if (error) {
            return res.status(501).json({
                message: 'failed to add favorite'
            });
        }
        return res.json({
            id: id
        });
    });
});

module.exports= router;