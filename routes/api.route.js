const router = require('express').Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()


router.get('/products', async (req, res, next) => {
  try {
      const products = await prisma.product.findMany({
        include: {category:true}
      })
      res.json(products);
  } catch (error) {
    next(error)
  }
});


router.get('/category', async(req, res, next) => {
  try{
      const category = await prisma.category.findMany({});
      return res.json(category);
  } 
  catch(error)
  {
    next(error);
  }
})



router.get('/products/:id', async (req, res, next) => {
  try{
    const {id} = req.params;
    const data = await prisma.product.findUnique({
      where : {
        id : Number(id)
      },
      include : { category:true }
    });
    res.json(data);
  }
  catch(error)
  {
    next(error)
  }
});

router.post('/products', async (req, res, next) => {
    try{
      const product = await prisma.Product.create({
        data : req.body
      })
       res.json(product)
    }
    catch(error)
    {
      console.log("I dont know")
      next(error);
    }
});

router.delete('/products/:id', async (req, res, next) => {
  const {id} = req.params;
  const deleteProduct = await prisma.product.delete({
    where : {
      id : Number(id)
    }
  })

  res.json({
    message : "This Product has been deleted",
    data : deleteProduct
  });
});


router.patch('/products/:id', async (req, res, next) => {
  try{
    const {id} = req.params;
    const product = await prisma.product.update({
      where : {
        id : Number(id)
      },
      data : req.body
    })

    return res.json(product)
  }
  catch(error)
  {
    next(error)
  }
});


module.exports = router;
