import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockOrders, mockInventory, mockBranches } from '@/lib/mockData';
import { BarChart3, Package, ShoppingCart, Users, Wallet, TrendingUp, AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  const totalOrders = mockOrders.length;
  const totalInventory = mockInventory.length;
  const lowStockItems = mockInventory.filter(item => item.quantity <= item.reorderLevel).length;
  const totalSales = mockOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = mockOrders.filter(order => order.status === 'pending').length;

  const stats = [
    { title: 'Total Orders', value: totalOrders, icon: ShoppingCart, color: 'bg-blue-500' },
    { title: 'Total Sales', value: `RS.${totalSales.toLocaleString()}`, icon: Wallet, color: 'bg-green-500' },
    { title: 'Inventory Items', value: totalInventory, icon: Package, color: 'bg-purple-500' },
    { title: 'Branches', value: mockBranches.length, icon: Users, color: 'bg-orange-500' },
    { title: 'Pending Orders', value: pendingOrders, icon: AlertTriangle, color: 'bg-yellow-500' },
    { title: 'Low Stock Items', value: lowStockItems, icon: TrendingUp, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 size={20} />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{order.id}</div>
                    <div className="text-sm text-gray-500">
                      {order.customerName} • {order.orderType}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">RS.{order.totalAmount}</div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle size={20} />
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockInventory
                .filter(item => item.quantity <= item.reorderLevel)
                .slice(0, 5)
                .map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.category}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${item.quantity <= item.reorderLevel ? 'text-red-600' : 'text-green-600'}`}>
                        {item.quantity} {item.unit}
                      </div>
                      <div className="text-sm text-gray-500">Reorder: {item.reorderLevel}</div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}