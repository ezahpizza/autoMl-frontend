import { useEffect } from 'react';
import DockNav from '@/components/DockNav';
import UserProfileButton from '@/components/user/UserProfileButton';
import DeleteUserDataButton from '@/components/user/DeleteUserDataButton';
import TiltedCard from '@/components/user/TiltedCard';
import Cubes from '@/components/user/Cubes'
import { useUser, SignedIn, SignedOut, RedirectToSignIn, SignOutButton, useClerk } from '@clerk/clerk-react';
import { useEdaHistory } from '@/hooks/useEdaReports';
import { useModelList } from '@/hooks/useModelFeatures';
import { motion } from 'framer-motion';
import LoadingGallery from '@/components/ui/LoadingGallery';


const UserProfilePage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { user } = useUser();
    if (!user) 
        return  (
            <div className="min-h-screen bg-persian-indigo flex items-center justify-center">
                <LoadingGallery/>
            </div>
        );

    const userFields = [
    { label: 'Username', key: 'username' },
    { label: 'Full Name', key: 'fullName' },
    { label: 'Password Enabled', key: 'passwordEnabled', isBoolean: true },
    { label: 'Last Sign-In', key: 'lastSignInAt', isDate: true },
    ];

    const { data: historyData } = useEdaHistory();
    const reports = historyData?.history.length || 0;
    const { data } = useModelList();
    const models = data?.models.length || 0;

return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="select-none min-h-screen bg-persian-indigo relative overflow-hidden">
            <DockNav /> 
          {/* Main content */}
          <div className="container mx-auto px-4 md:px-8 pt-12 space-y-8">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`p-6 mb-8`}
                >
                    <h1 className="font-biorhyme-expanded text-5xl font-bold text-pumpkin-orange mb-8">
                        Hello {user.firstName}!
                    </h1>

                    <p className="font-biorhyme text-xl text-almond-white leading-relaxed mb-8">
                        Manage your account and data privacy settings here.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }} className="max-w-4xl flex items-center space-x-4 mb-2">
                        {/* user image */}
                        <div className="max-w-[50px]">
                            <img src={user.imageUrl} alt="User" className="rounded-full" />
                        </div>

                        {/* signout */}
                        <SignOutButton>
                        <button className="bg-rose-pink text-white px-4 py-2 rounded hover:bg-red font-bold">
                            Sign Out
                        </button>
                        </SignOutButton>
                    </motion.div>
                </motion.div>

            {/* Responsive grid layout */}
            <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                   className="flex flex-col md:flex-row gap-6">
                {/* Left Section (Main) */}
                <div className={`w-full md:w-3/4 space-y-6 bg-almond-white p-6 rounded-lg`}>
                    <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-persian-indigo text-2xl font-black font-fira-code mb-4"
                    >
                    Account Management
                    </motion.div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <UserProfileButton />
                    <DeleteUserDataButton />
                    </div>

                    {/* user data */}
                    <div className="h-auto bg-transparent grid grid-cols-1 md:grid-cols-2 gap-6 text-persian-indigo text-lg">
                    {/* Column 1: User Fields */}
                        <div className="space-y-2">
                            {userFields.map(({ label, key, isDate, isBoolean }) => {
                            let value = user?.[key];

                            if (isDate && value) {
                                value = new Date(value).toLocaleString();
                            } else if (isBoolean) {
                                value = value ? 'Yes' : 'No';
                            }

                            return (
                                <p
                                key={key}
                                className="font-fira-code text-lg leading-relaxed text-persian-indigo"
                                >
                                <strong>{label}:</strong> {value}
                                </p>
                            );
                            })}
                        </div>

                        {/* Column 2: Stats */}
                        <div className="space-y-2">
                            <p className="font-fira-code text-lg leading-relaxed text-persian-indigo">
                            <strong>Models Trained:</strong> {models}
                            </p>
                            <p className="font-fira-code text-lg leading-relaxed text-persian-indigo">
                            <strong>Reports Generated:</strong> {reports}
                            </p>
                        </div>
                    </div>

                </div>
                {/* Right Section (Sidebar) */}
                <motion.div
                        className="hidden sm:flex flex-col w-1/4 h-[310px] bg-rose-pink rounded-lg items-center justify-center p-2 space-y-2"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div  className={`w-[90%] h-[90%] p-2 bg-rose-pink items-center justify-center border-r-8 border-persian-indigo`}>
                            <Cubes 
                            gridSize={6}
                            cubeSize={30}
                            maxAngle={60}
                            radius={4}
                            borderStyle="2px dashed #FFF"
                            faceColor="#2D1C7F"
                            rippleColor="#FF2D51"
                            rippleSpeed={1.5}
                            autoAnimate={true}
                            rippleOnClick={true}
                        />
                        </div>

                        <p className="text-center text-persian-indigo font-bold font-fira-code text-md py-2">
                            Welcome to the end of the thought process
                        </p>
                    </motion.div>

                <motion.div
                    className={`block sm:hidden flex justify-center relative h-[300px] w-full text-almond-white text-lg h-full  p-6`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {/* Mobile sidebar placeholder */}
                    <div className="flex items-center justify-center w-full">
                        <TiltedCard
                        imageSrc="/images/ensoProfile.webp"
                        altText="Kendrick Lamar - GNX Album Cover"
                        captionText="Kendrick Lamar - GNX"
                        containerHeight="300px"
                        containerWidth="300px"
                        imageHeight="300px"
                        imageWidth="300px"
                        rotateAmplitude={12}
                        scaleOnHover={1.2}
                        showMobileWarning={false}
                        showTooltip={true}
                        displayOverlayContent={true}
                        overlayContent={
                            <div className='p-2'>
                                <p className="text-center text-md font-bold font-fira-code text-persian-indigo">
                                    Welcome to the end of the thought process
                                </p>
                            </div>

                        }
                        />

                    </div>
                </motion.div>
            </motion.div>
          </div>
        </div>
      </SignedIn>
    </>
  );
};

export default UserProfilePage;
