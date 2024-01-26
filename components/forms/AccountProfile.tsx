"use client";

interface UProps {
  user: {
    id: string;
    objectId: string;
    username: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: UProps) => {
  return <div>AccountProfile</div>;
};

export default AccountProfile;
