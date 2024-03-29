//GET /: send home page to the user
exports.new = (req, res) => {
    res.render('./user/new');
};