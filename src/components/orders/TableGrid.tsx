import { Table } from '@/lib/types';
import { Check, User, Clock } from 'lucide-react';

interface TableGridProps {
  tables: Table[];
  selectedTable: Table | null;
  onTableClick: (table: Table) => void;
}

export default function TableGrid({ tables, selectedTable, onTableClick }: TableGridProps) {
  const getStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'booked': return 'bg-blue-100 text-blue-800';
      case 'reserved': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Table['status']) => {
    switch (status) {
      case 'available': return <Check className="w-4 h-4" />;
      case 'occupied': return <User className="w-4 h-4" />;
      case 'booked': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-lg border p-4">
      <h2 className="text-lg font-semibold mb-4">Tables</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tables.map(table => (
          <button
            key={table.id}
            onClick={() => onTableClick(table)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedTable?.id === table.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary/50'
            } ${
              table.status === 'occupied'
                ? 'bg-red-50'
                : table.status === 'booked'
                ? 'bg-blue-50'
                : table.status === 'reserved'
                ? 'bg-purple-50'
                : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-lg font-bold">Table {table.number}</div>
                <div className="text-sm text-gray-500">
                  Capacity: {table.capacity} persons
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(table.status)}`}>
                {getStatusIcon(table.status)}
                {table.status.toUpperCase()}
              </span>
            </div>
            
            {table.currentOrder && (
              <div className="mt-2 text-sm text-left">
                <div className="text-gray-600">
                  {table.currentOrder.items} items • RS.{table.currentOrder.totalAmount}
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}