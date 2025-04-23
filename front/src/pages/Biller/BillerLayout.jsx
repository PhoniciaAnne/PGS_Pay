
import { FileText, PlusSquare, UserCog ,Edit3,Clock,PieChart} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';

const menu = [
  { to: '/biller/view-bills',    label: 'Bills',     Icon: FileText },
  { to: '/biller/edit-bill',      label: 'Edit Bill',     Icon: Edit3 },
  { to: '/biller/generate-bill', label: 'Generate',  Icon: PlusSquare },
//   { to: '/biller/update-profile',label: 'Profile',   Icon: UserCog },
{ to:'/biller/history',      label:'History',      Icon: Clock    },
{ to: '/biller/analytics',     label: 'Analytics',   Icon: PieChart  },
{ to: '/biller/upload-bills',     label: 'Bulk Upload Bills',   Icon: FileText  },


];


export default () => <DashboardLayout menu={menu} />;
