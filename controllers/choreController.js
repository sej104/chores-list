//GET /: send home page to the user
exports.index = (req, res) => {
    res.render('./chore/index');
};
