class IndexController {
  static getIndexPage = (req, res) => {
    res.render("./pages/index");
  };
}

module.exports = IndexController;
