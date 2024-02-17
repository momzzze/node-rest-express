const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const animalService = require('../service/animalService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/create', isAuth, (req, res) => {
    res.render('animal/create');
});
router.post('/create', isAuth, async (req, res) => {
    const animalData = req.body;
    try {
        await animalService.create(animalData, req.user._id);
        res.redirect('/animals/dashboard');
    } catch (err) {
        res.render('animal/create', { ...animalData, error: getErrorMessage(err) });
    }
});

router.get('/dashboard', async (req, res) => {
    const animals = await animalService.getAll();
    res.render('animal/dashboard', { animals });
});

router.get('/:id/details', async (req, res) => {
    const animal = await animalService.getOne(req.params.id);
    const owner = animal.owner?._id == req.user?._id;
    const isDonor = animal.donations.some(d => d._id.toString() == req.user?._id);

    res.render('animal/details', { ...animal, owner, isDonor });
});

router.get('/:id/donate', isAuth, async (req, res) => {
    await animalService.donate(req.params.id, req.user._id);
    res.redirect(`/animals/${req.params.id}/details`);
});

router.get('/:id/edit', isOwner, async (req, res) => {
    const animal = await animalService.getOne(req.params.id);
    res.render('animal/edit', { ...animal });
});
router.post('/:id/edit', isOwner, async (req, res) => {
    const animalData = req.body;
    try {        
        await animalService.edit(req.params.id, animalData);
        res.redirect(`/animals/${req.params.id}/details`);
    } catch (error) {
        res.render('animal/edit', { ...animalData, error: getErrorMessage(error) });    
    }
});

router.get('/:id/delete', isOwner, async (req, res) => {
    await animalService.deleteOne(req.params.id);
    res.redirect('/animals/dashboard');
});

async function isOwner(req,res,next){
    const animal = await animalService.getOneById(req.params.id);
    if(animal.owner._id.toString() != req.user?._id){
        return res.redirect('/animals/dashboard');
    }
    next();
}

module.exports = router;