import Page from "../components/Page";
import BeersBlankSlate from "../components/blank-slates/BeersBlankSlate";

const Home = () => (
  <Page title="Beer tracking, but better">
    <div className="text-center">
      <h1 className="font-semibold leading-none text-6xl">Tinnies</h1>
      <h2 className="text-xl">beer tracking, but better</h2>

      <div className="mt-4">
        <BeersBlankSlate />
      </div>
    </div>
  </Page>
);

export default Home;
