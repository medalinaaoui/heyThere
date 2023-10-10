import SectionItem from "./SectionItem";
const LeftbarSection = ({ section }) => {
  return (
    <section>
      <h1 className="">{section.title}</h1>
      <ul className="flex flex-col gap-3">
        {section.content.map((item, i) => (
          <SectionItem item={item} key={i} />
        ))}
      </ul>
    </section>
  );
};
export default LeftbarSection;
