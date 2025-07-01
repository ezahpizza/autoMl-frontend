import { useClerk } from '@clerk/clerk-react';

const UserProfileButton = () => {
  const { openUserProfile } = useClerk();
  
  return (
    <button 
      className="bg-persian-indigo text-white px-4 py-2 rounded hover:bg-pumpkin-orange hover:text-persian-indigo font-bold" 
      onClick={() => openUserProfile()}
    >
      Manage Account
    </button>
  );
};

export default UserProfileButton;