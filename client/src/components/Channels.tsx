import Card from "./Card";

const dummy = [
  {
    _id: "1",
    name: "shakil ahmed",
    isOnline: false,
    title: "this is title",
    desc: "this is description",
    avaterUrl:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "2",
    name: "avro khan",
    isOnline: true,
    desc: "this is description",
    title: "this is title",
    avaterUrl:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "3",
    name: "shuva aktar",
    isOnline: true,
    title: "this is title",
    avaterUrl:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "this is description",
  },
];

const Channels = () => {
  return (
    <div className="flex flex-wrap gap-4 flex-1 overflow-y-auto">
      {dummy.map((item, index) => (
        <Card
          key={index}
          id={item._id}
          title={item.title}
          name={item.name}
          isOnline={item.isOnline}
          avaterUrl={item.avaterUrl}
          desc={item.desc}
        />
      ))}
    </div>
  );
};

export default Channels;
