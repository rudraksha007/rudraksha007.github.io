import clockImage from "./assets/clock.svg";
import minHand from "./assets/minHand.svg";
import hourHand from "./assets/hourHand.svg";

function App() {
  return (
    <>
      <section className="w-screen h-screen flex">
        <section id="digital" className="w-[50%] h-full"></section>
        <section id="analog" className="w-[50%] h-full">
          <div className="w-full h-full relative">
            <img src={clockImage} alt="" className="absolute top-0 h-full" />
            {/* <img src={minHand} alt="" className="absolute top-0 h-full translate-x-[12%]" /> */}
            <img src={hourHand} alt="" className="absolute top-0 translate-y-[24%] translate-x-[12%]" />
          </div>
        </section>
      </section>
    </>
  );
}

export default App;

