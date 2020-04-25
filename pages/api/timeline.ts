const data = [
  {
    id: 1,
    addedBy: "Kirra",
    addedOn: new Date(),
    name: "Dead Pony Club",
    brewery: "Brewdog",
    rating: 3,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/811BAZ0Jd5L._AC_UL160_SR160,160_.jpg",
  },

  {
    id: 2,
    addedBy: "Simon",
    addedOn: new Date(),
    name: "Flink",
    brewery: "Brouwerij 't IJ",
    rating: 5,
    image:
      "https://www.drankgigant.nl/media/catalog/product/cache/small_image/152x190/beff4985b56e3afdbeabfc89641a4582/b/r/brouwerij_t_ij_flink.jpg",
  },

  {
    id: 3,
    addedBy: "Shannon",
    addedOn: new Date(),
    name: "Daku Waqa",
    brewery: "Walhalla",
    rating: 4,
    image:
      "http://www.walhallacraftbeer.nl/wp-content/uploads/2016/08/WALHALLA__DAKUWAQA_vrijstaand.png",
  },
];

export default (req, res) => {
  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  }
};
