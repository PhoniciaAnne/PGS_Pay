
import {
    Users, BadgeDollarSign, FileSearch2, Edit3  ,PieChart   
  } from 'lucide-react';
  import DashboardLayout from '../../components/DashboardLayout';
  
  const menu = [
    { to: '/admin/view-customers', label: 'Customers',  Icon: Users },
    { to: '/admin/view-billers',   label: 'Billers',    Icon: BadgeDollarSign },
    { to: '/admin/view-bills',     label: 'Bills',      Icon: FileSearch2 },
    { to: '/admin/edit-requests',  label: 'Requests',   Icon: Edit3 },
    { to: '/admin/analytics',     label: 'Analytics',   Icon: PieChart  },

  ];
  
  export default () => <DashboardLayout menu={menu} />;
  