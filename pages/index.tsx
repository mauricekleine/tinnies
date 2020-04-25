import Head from "next/head";
import { useUser } from "../libs/hooks";
import { useRouter } from "next/dist/client/router";

const Home = () => {
  const router = useRouter();
  const [user, error] = useUser();
  console.log(user);

  if (user) {
    router.push("/timeline");
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>You are not logged in</h1>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
