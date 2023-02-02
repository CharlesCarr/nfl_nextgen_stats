import Football from "../../assets/images/football-unsplash.jpg";

export const FieldImgContainer = () => {
  return (
    <div className="lg:flex justify-center items-center h-full w-1/4 rounded-2xl shadow hidden">
      <img
        src={Football}
        alt="football"
        className="object-cover h-full w-full rounded-2xl shadow brightness-90"
      />
    </div>
  );
};
