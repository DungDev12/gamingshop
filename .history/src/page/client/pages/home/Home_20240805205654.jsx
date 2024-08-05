import { Desktop, Mobile } from "@/config/Responsive";

const Home = () => {
  return (
    <>
      <div>
        <Desktop>
          <div>Desktop</div>
        </Desktop>
        <Mobile>
          <div>Mobile</div>
        </Mobile>
      </div>
    </>
  );
};

export default Home;
