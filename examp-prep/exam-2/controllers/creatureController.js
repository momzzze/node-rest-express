const router = require('express').Router();
const { default: mongoose } = require('mongoose');
const creatureService = require('../service/creatureService');
const { getErrorMessage } = require('../utils/errorUtils');
const { isAuth } = require('../middlewares/authMiddleware');


router.get('/', async (req, res) => {
    const creatures = await creatureService.getAll();
    res.render('creatures/all-posts', { creatures });
});

router.get('/create', isAuth, (req, res) => {
    res.render('creatures/create');
});
router.post('/create', isAuth, async (req, res) => {
    const creatureData = req.body;
    try {
        await creatureService.create(req.user._id, creatureData);
        res.redirect('/creatures/');
    } catch (error) {
        res.render('creatures/create', { ...creatureData, error: getErrorMessage(error) });
    }
});

router.get('/:id/details', async (req, res) => {
    const creature = await creatureService.getOne(req.params.id);
    const owner = `${creature.owner?.firstName} ${creature.owner?.lastName}`;
    const isOwner = creature.owner?._id == req.user?._id;
    const userId = req.user?._id.toString();
    const isVoted = creature.votes.some(i => i._id.toString() == userId);
    const voters = creature.votes.map(x => x.email).join(', ');
    res.render('creatures/details', { ...creature, owner, isOwner, isVoted, voters, numberOfVotes: creature.votes.length });
})

router.get('/:id/vote', isAuth, async (req, res) => {
    await creatureService.vote(req.params.id, req.user._id);
    res.redirect(`/creatures/${req.params.id}/details`);
});

router.get('/:id/edit', isOwner, async (req, res) => {
    const creature = await creatureService.getOne(req.params.id);
    res.render('creatures/edit', { ...creature });
});

router.post('/:id/edit', isOwner, async (req, res) => {
    const creatureData = req.body;
    try {
        await creatureService.update(req.params.id, creatureData);
        res.redirect(`/creatures/${req.params.id}/details`);
    } catch (error) {
        res.render('creatures/edit', { ...creatureData, error: getErrorMessage(error) });
    }
});

router.get('/:id/delete', isOwner, async (req, res) => {
    await creatureService.deleteOne(req.params.id);
    res.redirect('/creatures/');
});


async function isOwner(req, res, next) {
    const creature = await creatureService.getOneById(req.params.id);
    if (creature.owner?._id != req.user?._id) {
        return res.redirect('/creatures/');
    }
    next();
}

module.exports = router;