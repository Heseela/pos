// 'use client';

// import { Order } from '@/lib/types';
// import { CheckCircle, Clock, XCircle, ChefHat, Truck, Check } from 'lucide-react';

// interface OrderListProps {
//   orders: Order[];
// }

// const statusIcons = {
//   pending: Clock,
//   preparing: ChefHat,
//   ready: Truck,
//   served: CheckCircle,
//   completed: CheckCircle,
//   cancelled: XCircle,
// };

// const statusColors = {
//   pending: 'bg-yellow-100 text-yellow-800',
//   preparing: 'bg-blue-100 text-blue-800',
//   ready: 'bg-purple-100 text-purple-800',
//   served: 'bg-green-100 text-green-800',
//   completed: 'bg-green-100 text-green-800',
//   cancelled: 'bg-red-100 text-red-800',
// };

// const orderTypeColors = {
//   'dine-in': 'bg-blue-50 text-blue-700 border-blue-200',
//   'takeaway': 'bg-green-50 text-green-700 border-green-200',
//   'online': 'bg-purple-50 text-purple-700 border-purple-200',
//   'table-booking': 'bg-orange-50 text-orange-700 border-orange-200',
// };

// export default function OrderList({ orders }: OrderListProps) {
//   if (orders.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <div className="text-gray-400 mb-4">No orders found</div>
//         <div className="text-gray-500">Try changing your search criteria</div>
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full">
//         <thead>
//           <tr className="border-b">
//             <th className="text-left py-3 px-4 font-medium">Order ID</th>
//             <th className="text-left py-3 px-4 font-medium">Customer</th>
//             <th className="text-left py-3 px-4 font-medium">Type</th>
//             <th className="text-left py-3 px-4 font-medium">Items</th>
//             <th className="text-left py-3 px-4 font-medium">Amount</th>
//             <th className="text-left py-3 px-4 font-medium">Status</th>
//             <th className="text-left py-3 px-4 font-medium">Time</th>
//             <th className="text-left py-3 px-4 font-medium">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => {
//             const StatusIcon = statusIcons[order.status];
//             const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
            
//             return (
//               <tr key={order.id} className="border-b hover:bg-gray-50">
//                 <td className="py-3 px-4">
//                   <div className="font-medium text-primary">{order.id}</div>
//                 </td>
//                 <td className="py-3 px-4">
//                   <div className="font-medium">{order.customerName || 'N/A'}</div>
//                   <div className="text-sm text-gray-500">{order.contact || 'No contact'}</div>
//                 </td>
//                 <td className="py-3 px-4">
//                   <span className={`px-3 py-1 rounded-full text-xs font-medium border ${orderTypeColors[order.orderType]}`}>
//                     {order.orderType.replace('-', ' ').toUpperCase()}
//                   </span>
//                 </td>
//                 <td className="py-3 px-4">
//                   <div className="font-medium">{totalItems} items</div>
//                   <div className="text-sm text-gray-500">
//                     {order.items.slice(0, 2).map(item => item.foodItem).join(', ')}
//                     {order.items.length > 2 && '...'}
//                   </div>
//                 </td>
//                 <td className="py-3 px-4">
//                   <div className="font-bold">RS.{order.totalAmount.toLocaleString()}</div>
//                 </td>
//                 <td className="py-3 px-4">
//                   <div className="flex items-center gap-2">
//                     <StatusIcon size={16} />
//                     <span className={`px-2 py-1 text-xs rounded-full ${statusColors[order.status]}`}>
//                       {order.status.toUpperCase()}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="py-3 px-4">
//                   <div className="text-sm text-gray-500">
//                     {new Date(order.createdAt).toLocaleTimeString([], { 
//                       hour: '2-digit', 
//                       minute: '2-digit' 
//                     })}
//                   </div>
//                 </td>
//                 <td className="py-3 px-4">
//                   <div className="flex gap-2">
//                     <button className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary-dark">
//                       View
//                     </button>
//                     <button className="px-3 py-1 text-sm border rounded hover:bg-gray-100">
//                       Edit
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }