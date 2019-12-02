const Item = require('../modals/item')


const getProduct = (req,res,next) => {

    Item.find()
    .then((items) => res.json(items)) 
    // res.status(200).json({productList})
}

const deleteProduct = (req,res,next) => {

    Item.findById(req.params.id).then((item) => item.remove().then((item)=> res.json({item})))

}


const addProduct = (req,res,next) => {

    const newItem = new Item({
        name : req.body.name
    })

    newItem.save().then(item => res.json(item))
    // const title = req.body.title
    // const price = req.body.price

    // console.log("req", req)
    // if(!title || title.length == 0 || !price || price <0){
    //     return res.status(422).json({
    //         message : 'Invalid format'
    //     })
    // }
    // productList.push({id : productList.length + 1, title : title, price : price});
    // res.status(201,).json({
    //     message : 'Created Successfully',
    //     productList : productList
    // });
}

exports.getProduct = getProduct;
exports.addProduct = addProduct;
exports.deleteProduct = deleteProduct;