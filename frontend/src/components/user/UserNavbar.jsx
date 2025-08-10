// import React from 'react';
// import { LayoutDashboard, BarChart2, LogOut } from 'lucide-react';

// const UserNavbar = ({ onLogout }) => {
//   return (
//     <nav className="bg-blue-900 text-white px-6 py-4 shadow-lg fixed w-full top-0 z-10">
//       <div className="flex justify-between items-center max-w-7xl mx-auto">
//         <div className="text-xl font-semibold">
//           Quiz App
//         </div>
//         <div className="flex space-x-6">
//           <button className="flex items-center px-3 py-2 text-white hover:text-blue-200 transition-colors duration-200 font-medium">
//             <LayoutDashboard className="h-5 w-5 mr-2" />
//             Dashboard
//           </button>
//           <button className="flex items-center px-3 py-2 text-white hover:text-blue-200 transition-colors duration-200 font-medium">
//             <BarChart2 className="h-5 w-5 mr-2" />
//             View Results
//           </button>
//           <button 
//             onClick={onLogout}
//             className="flex items-center px-3 py-2 text-white hover:text-blue-200 transition-colors duration-200 font-medium"
//           >
//             <LogOut className="h-5 w-5 mr-2" />
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default UserNavbar;

// import React from 'react';
// import { LayoutDashboard, BarChart2, LogOut } from 'lucide-react';
// import { useNavigate } from 'react-router-dom'; // If using React Router

// const UserNavbar = ({ onLogout, activeTab, setActiveTab }) => {
//   // If using React Router, you can use this navigate function
//   // const navigate = useNavigate();

//   const handleNavigation = (tab) => {
//     setActiveTab(tab);
//     // If using React Router:
//     // navigate(`/${tab}`);
//   };

//   return (
//     <nav className="bg-blue-900 text-white px-6 py-4 shadow-lg fixed w-full top-0 z-10">
//       <div className="flex justify-between items-center max-w-7xl mx-auto">
//         <div className="text-xl font-semibold">
//           Quiz App
//         </div>
//         <div className="flex space-x-6">
//           <button 
//             onClick={() => handleNavigation('dashboard')}
//             className={`flex items-center px-3 py-2 ${
//               activeTab === 'dashboard' 
//                 ? 'text-blue-200 border-b-2 border-blue-200' 
//                 : 'text-white hover:text-blue-200'
//             } transition-colors duration-200 font-medium`}
//           >
//             <LayoutDashboard className="h-5 w-5 mr-2" />
//             Dashboard
//           </button>
//           <button 
//             onClick={() => handleNavigation('results')}
//             className={`flex items-center px-3 py-2 ${
//               activeTab === 'results' 
//                 ? 'text-blue-200 border-b-2 border-blue-200' 
//                 : 'text-white hover:text-blue-200'
//             } transition-colors duration-200 font-medium`}
//           >
//             <BarChart2 className="h-5 w-5 mr-2" />
//             View Results
//           </button>
//           <button 
//             onClick={onLogout}
//             className="flex items-center px-3 py-2 text-white hover:text-blue-200 transition-colors duration-200 font-medium"
//           >
//             <LogOut className="h-5 w-5 mr-2" />
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default UserNavbar;


import React from 'react';
import { LayoutDashboard, BarChart2, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const UserNavbar = ({ onLogout }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <nav className="bg-blue-900 text-white px-6 py-4 shadow-lg fixed w-full top-0 z-10">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl font-semibold">
        Exam2Employ
        </div>
        <div className="flex space-x-6">
          <Link
            to="/dashboard"
            className={`flex items-center px-3 py-2 ${
              isActive('dashboard') 
                ? 'text-blue-200 border-b-2 border-blue-200' 
                : 'text-white hover:text-blue-200'
            } transition-colors duration-200 font-medium`}
          >
            <LayoutDashboard className="h-5 w-5 mr-2" />
            Dashboard
          </Link>
          <Link
            to="/results"
            className={`flex items-center px-3 py-2 ${
              isActive('results') 
                ? 'text-blue-200 border-b-2 border-blue-200' 
                : 'text-white hover:text-blue-200'
            } transition-colors duration-200 font-medium`}
          >
            <BarChart2 className="h-5 w-5 mr-2" />
            View Results
          </Link>
          <button 
            onClick={onLogout}
            className="flex items-center px-3 py-2 text-white hover:text-blue-200 transition-colors duration-200 font-medium"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;