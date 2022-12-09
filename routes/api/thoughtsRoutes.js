const router = require('express').Router();

// requiring all thought controls

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);



// /api/thoughts/:thoughtId

router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;