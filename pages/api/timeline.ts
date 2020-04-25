import nextConnect from "next-connect";

import authenticationMiddleware from "../../middlewares/authentication";
import commonMiddleware from "../../middlewares/common";

const data = [
  {
    addedBy: "Kirra",
    addedOn: new Date(),
    brewery: "Brewdog",
    id: 1,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/811BAZ0Jd5L._AC_UL160_SR160,160_.jpg",
    name: "Dead Pony Club",
    rating: 3,
  },

  {
    addedBy: "Simon",
    addedOn: new Date(),
    brewery: "Brouwerij 't IJ",
    id: 2,
    image:
      "https://www.drankgigant.nl/media/catalog/product/cache/small_image/152x190/beff4985b56e3afdbeabfc89641a4582/b/r/brouwerij_t_ij_flink.jpg",
    name: "Flink",
    rating: 5,
  },

  {
    addedBy: "Shannon",
    addedOn: new Date(),
    brewery: "Walhalla",
    id: 3,
    image:
      "http://www.walhallacraftbeer.nl/wp-content/uploads/2016/08/WALHALLA__DAKUWAQA_vrijstaand.png",
    name: "Daku Waqa",
    rating: 4,
  },
];

const handleGetRequest = (req, res) => {
  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  }
};

export default nextConnect()
  .use(commonMiddleware)
  .use(authenticationMiddleware)
  .get(handleGetRequest); // POST api/timeline
