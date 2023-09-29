import { addReq as actives } from "../../data";

const LatestActive = () => {
  return (
    <section className=" rounded-md bg-dark py-2 w-80 ">
      <div className="flex justify-between px-4">
        <h1 className="  text-sm font-semibold ">Latest Activities</h1>{" "}
        <button className="text-sm hover:text-accentc">See more</button>
      </div>
      {actives.map((e, i) => (
        <div key={i} className="flex justify-between  px-4 py-2">
          <div className="flex gap-6 items-center">
            <img
              src={e.personPic}
              alt="profilepic"
              className=" w-8 aspect-square rounded-full"
            />
            <h2 className=" text-sm truncate">{e.personName}</h2>
          </div>
          <div className="flex gap-6 items-center">
            <p className="text-sm truncate">{e.activityType}</p>
            <p className="text-sm truncate">1 min ago</p>
          </div>
        </div>
      ))}
    </section>
  );
};
export default LatestActive;
