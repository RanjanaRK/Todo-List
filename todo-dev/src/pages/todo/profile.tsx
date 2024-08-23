import ProfileDetail from "@/components/user/ProfileDetail";

const profile = () => {
  return (
    <>
      <div className="">
        <div className="my-5 text-center text-2xl font-bold sm:text-3xl">
          My Profile
        </div>
        <ProfileDetail />
      </div>
    </>
  );
};

export default profile;
