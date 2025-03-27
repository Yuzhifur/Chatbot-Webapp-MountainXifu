import React from 'react';
import './Sidebar.css';

type SidebarProps = {
  resetDashboard: () => void; // Function to reset dashboard to default content
};

const Sidebar: React.FC<SidebarProps> = ({ resetDashboard }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2
          className="sidebar-title"
          onClick={resetDashboard}
        >
          mountainxifu.ai
        </h2>
      </div>
      {/* Additional sidebar items can be added here in the future */}
    </div>
  );
};

export default Sidebar;