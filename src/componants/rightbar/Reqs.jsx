import { addReq } from "../../data";

const Reqs = () => {
  return (
    <section className=" rounded-md bg-dark py-2 w-80 ">
      <div className="flex justify-between px-4">
        <h1 className="  text-sm font-semibold ">Add Requests</h1>{" "}
        <button className="text-sm hover:text-accentc">See more</button>
      </div>
      {addReq.map((e, i) => (
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
            <button className="btn btn-xs bg-success  border-none">
              Accept
            </button>
            <button className="btn btn-xs bg-danger  border-none">
              Reject
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};
export default Reqs;
