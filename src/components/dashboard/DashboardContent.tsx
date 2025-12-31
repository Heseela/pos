// 'use client';

// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
// import { BarChart3, Package, ShoppingCart, Users, Wallet, TrendingUp, AlertTriangle, Building } from 'lucide-react';
// import { mockOrders, mockInventory, mockBranches, mockPurchases, mockLedger } from '@/lib/mockData';
// import { UserRole } from '@/lib/types';
// import { canViewBranchData } from '@/utils/roleUtils';

// export default function DashboardContent() {
//   const getUserFromLocalStorage = () => {
//     if (typeof window === 'undefined') return null;
//     const userStr = localStorage.getItem('user');
//     return userStr ? JSON.parse(userStr) : null;
//   };

//   const user = getUserFromLocalStorage();
  
//   if (!user) {
//     return (
//       <div className="flex items-center justify-center min-h-[50vh]">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   const userRole = user.role as UserRole;

//   let filteredOrders = [...mockOrders];
//   let filteredBranches = [...mockBranches];
//   let filteredInventory = [...mockInventory];
//   let filteredPurchases = [...mockPurchases];
//   let filteredLedger = [...mockLedger];

//   if (user.branchId) {
//     filteredOrders = mockOrders.filter(order => canViewBranchData(user, order.branchId));
//     filteredBranches = mockBranches.filter(branch => canViewBranchData(user, branch.id));
//     filteredInventory = mockInventory.filter(item => canViewBranchData(user, item.branchId));
//     filteredPurchases = mockPurchases.filter(purchase => canViewBranchData(user, purchase.branchId));
//     filteredLedger = mockLedger.filter(entry => canViewBranchData(user, entry.branchId));
//   }

//   const totalOrders = filteredOrders.length;
//   const totalInventory = filteredInventory.length;
//   const lowStockItems = filteredInventory.filter(item => item.quantity <= item.reorderLevel).length;
//   const totalSales = filteredOrders
//     .filter(order => order.status === 'completed')
//     .reduce((sum, order) => sum + order.totalAmount, 0);
//   const pendingOrders = filteredOrders.filter(order => order.status === 'pending').length;
//   const totalBranches = filteredBranches.length;
//   const totalPurchases = filteredPurchases.reduce((sum, purchase) => sum + purchase.totalPrice, 0);

//   const stats = [
//     { 
//       title: 'Total Orders', 
//       value: totalOrders, 
//       icon: ShoppingCart, 
//       color: 'bg-blue-500', 
//       roles: ['admin', 'branch-head', 'cashier', 'waiter'] 
//     },
//     { 
//       title: 'Total Sales', 
//       value: `रु ${totalSales.toLocaleString()}`, 
//       icon: Wallet, 
//       color: 'bg-green-500', 
//       roles: ['admin', 'branch-head', 'cashier'] 
//     },
//     { 
//       title: 'Inventory Items', 
//       value: totalInventory, 
//       icon: Package, 
//       color: 'bg-purple-500', 
//       roles: ['admin', 'branch-head'] 
//     },
//     { 
//       title: 'Branches', 
//       value: totalBranches, 
//       icon: Building, 
//       color: 'bg-orange-500', 
//       roles: ['admin'] 
//     },
//     { 
//       title: 'Pending Orders', 
//       value: pendingOrders, 
//       icon: AlertTriangle, 
//       color: 'bg-yellow-500', 
//       roles: ['admin', 'branch-head', 'cashier', 'waiter'] 
//     },
//     { 
//       title: 'Low Stock Items', 
//       value: lowStockItems, 
//       icon: TrendingUp, 
//       color: 'bg-red-500', 
//       roles: ['admin', 'branch-head'] 
//     },
//   ];

//   const visibleStats = stats.filter(stat => stat.roles.includes(userRole));

//   return (
//     <div className="space-y-6 fade-in">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//         <p className="text-gray-600 mt-2">
//           Welcome back, {user.name}! Here's what's happening today.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {visibleStats.map((stat) => (
//           <Card key={stat.title} className="hover:shadow-lg transition-shadow">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium text-gray-500">
//                 {stat.title}
//               </CardTitle>
//               <div className={`${stat.color} p-2 rounded-lg`}>
//                 <stat.icon className="h-4 w-4 text-white" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stat.value}</div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Orders Card */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <BarChart3 size={20} />
//               Recent Orders
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {filteredOrders.slice(0, 5).map((order) => (
//                 <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
//                   <div>
//                     <div className="font-medium">{order.id}</div>
//                     <div className="text-sm text-gray-500">
//                       {order.customerName} • {order.orderType} • {order.branchId === '1' ? 'KTM Main' : 'Pokhara Branch'}
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     {userRole !== 'waiter' && (
//                       <div className="font-bold">रु {order.totalAmount}</div>
//                     )}
//                     <span className={`px-2 py-1 text-xs rounded-full ${
//                       order.status === 'completed' ? 'bg-green-100 text-green-800' :
//                       order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                       order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
//                       order.status === 'served' ? 'bg-purple-100 text-purple-800' :
//                       'bg-red-100 text-red-800'
//                     }`}>
//                       {order.status}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Additional Card based on role */}
//         {userRole === 'admin' && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Building size={20} />
//                 Branch Overview
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {mockBranches.map((branch) => (
//                   <div key={branch.id} className="flex items-center justify-between p-3 border rounded-lg">
//                     <div>
//                       <div className="font-medium">{branch.name}</div>
//                       <div className="text-sm text-gray-500">{branch.location}</div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-sm text-gray-500">
//                         {branch.phone}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {userRole === 'cashier' && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Wallet size={20} />
//                 Today's Cash Summary
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Total Sales:</span>
//                   <span className="font-bold">रु {totalSales}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Completed Orders:</span>
//                   <span className="font-bold">{filteredOrders.filter(o => o.status === 'completed').length}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Pending Payments:</span>
//                   <span className="font-bold text-yellow-600">{pendingOrders}</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {(userRole === 'admin' || userRole === 'branch-head') && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <AlertTriangle size={20} />
//                 Low Stock Items
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {filteredInventory
//                   .filter(item => item.quantity <= item.reorderLevel)
//                   .slice(0, 5)
//                   .map((item) => (
//                     <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
//                       <div>
//                         <div className="font-medium">{item.name}</div>
//                         <div className="text-sm text-gray-500">{item.category}</div>
//                       </div>
//                       <div className="text-right">
//                         <div className={`font-bold ${item.quantity <= item.reorderLevel ? 'text-red-600' : 'text-green-600'}`}>
//                           {item.quantity} {item.unit}
//                         </div>
//                         <div className="text-sm text-gray-500">Reorder: {item.reorderLevel}</div>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  BarChart3,
  Package,
  ShoppingCart,
  Wallet,
  TrendingUp,
  AlertTriangle,
  Building,
} from 'lucide-react';

import {
  mockOrders,
  mockInventory,
  mockBranches,
  mockPurchases,
  mockLedger,
} from '@/lib/mockData';

import { UserRole } from '@/lib/types';

export default function DashboardContent() {
  const getUserFromLocalStorage = () => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };

  const user = getUserFromLocalStorage();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const userRole = user.role as UserRole;
  const isAdmin = userRole === 'admin';

  /* ===========================
     BRANCH FILTERING ONLY
     =========================== */

  const filteredOrders = isAdmin
    ? mockOrders
    : mockOrders.filter(o => o.branchId === user.branchId);

  const filteredBranches = isAdmin
    ? mockBranches
    : mockBranches.filter(b => b.id === user.branchId);

  const filteredInventory = isAdmin
    ? mockInventory
    : mockInventory.filter(i => i.branchId === user.branchId);

  /* ===========================
     DASHBOARD STATS (FOR ALL)
     =========================== */

  const totalOrders = filteredOrders.length;
  const totalInventory = filteredInventory.length;
  const lowStockItems = filteredInventory.filter(
    item => item.quantity <= item.reorderLevel
  ).length;

  const totalSales = filteredOrders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const pendingOrders = filteredOrders.filter(
    order => order.status === 'pending'
  ).length;

  const totalBranches = filteredBranches.length;

  const stats = [
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Sales',
      value: `रु ${totalSales.toLocaleString()}`,
      icon: Wallet,
      color: 'bg-green-500',
    },
    {
      title: 'Inventory Items',
      value: totalInventory,
      icon: Package,
      color: 'bg-purple-500',
    },
    {
      title: 'Branches',
      value: totalBranches,
      icon: Building,
      color: 'bg-orange-500',
    },
    {
      title: 'Pending Orders',
      value: pendingOrders,
      icon: AlertTriangle,
      color: 'bg-yellow-500',
    },
    {
      title: 'Low Stock Items',
      value: lowStockItems,
      icon: TrendingUp,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="space-y-6 fade-in">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {user.name}!
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map(stat => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              <div className={`${stat.color} p-2 rounded-lg`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RECENT ORDERS */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 size={20} />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredOrders.slice(0, 5).map(order => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <div className="font-medium">{order.id}</div>
                  <div className="text-sm text-gray-500">
                    {order.customerName} • {order.orderType}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">
                    रु {order.totalAmount}
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* BRANCH OVERVIEW */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building size={20} />
              Branch Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredBranches.map(branch => (
              <div
                key={branch.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <div className="font-medium">{branch.name}</div>
                  <div className="text-sm text-gray-500">
                    {branch.location}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {branch.phone}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* LOW STOCK */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle size={20} />
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredInventory
              .filter(i => i.quantity <= i.reorderLevel)
              .slice(0, 5)
              .map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      {item.category}
                    </div>
                  </div>
                  <div className="font-bold text-red-600">
                    {item.quantity} {item.unit}
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
