const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll({
      include: [{ model: Product}]
    })

    if (!tagData) {
      res.status(404).json({ message: "tag not found"})
      return;
    }
    
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
 try {
  const tagDataById = await Tag.findByPk(req.params.id,{
    include: [{ model: Product}]
  })

  if (!tagDataById) {
    res.status(404).json({ Message: "tag not found"})
    return;
  }

  res.status(200).json(tagDataById)
 } catch (err) {
  res.status(500).json({"message": "server error"})
  
 }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagCreate = await Tag.create(req.body)
    res.status(200).json(tagCreate)
  }catch (err) {
    res.status(500).json({"message": "server error"})
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagUpdateById = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
    if (!tagUpdateById[0]) {
      res.status(404).json({message: "no tag matches the id"})
      return;
    }
    res.status(200).json({ tagUpdateById})
    
  }catch (err) {
    res.status(500).json(err)
  }
  
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDelete = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!tagDelete) {
      res.status(404).json({ message: 'no tag found with that id'});
      return;
    }
    res.status(200).json(tagDelete)
    }catch (err) {
      res.status(500).json(err)
    }
});

module.exports = router;
