import Head from "next/head";
import BeerCard from "../components/BeerCard";

const data = [
  {
    addedBy: "Kirra",
    addedOn: new Date(),
    name: "Dead Pony Club",
    brewery: "Brewdog",
    rating: 3,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/811BAZ0Jd5L._AC_UL160_SR160,160_.jpg",
  },

  {
    addedBy: "Simon",
    addedOn: new Date(),
    name: "Flink",
    brewery: "Brouwerij 't IJ",
    rating: 5,
    image:
      "https://www.drankgigant.nl/media/catalog/product/cache/small_image/152x190/beff4985b56e3afdbeabfc89641a4582/b/r/brouwerij_t_ij_flink.jpg",
  },

  {
    addedBy: "Shannon",
    addedOn: new Date(),
    name: "Daku Waqa",
    brewery: "Walhalla",
    rating: 4,
    image:
      "http://www.walhallacraftbeer.nl/wp-content/uploads/2016/08/WALHALLA__DAKUWAQA_vrijstaand.png",
  },
];

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex">
          {data.map((beer) => (
            <BeerCard beer={beer} />
          ))}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
