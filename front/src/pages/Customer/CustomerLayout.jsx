
import { FileText, UserCog,Wallet,PieChart,Clock } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';

const menu = [
  { to: '/customer/view-bills',     label: 'My Bills',  Icon: FileText },
//   { to: '/customer/update-profile', label: 'Profile',   Icon: UserCog },
{ to: '/customer/topup-wallet',   label: 'Top Up Wallet', Icon: Wallet },
{ to:'/customer/analytics',    label:'Analytics',   Icon: PieChart },
{ to:'/customer/history',    label:'History',     Icon: Clock    },

];

export default () => <DashboardLayout menu={menu} />;
