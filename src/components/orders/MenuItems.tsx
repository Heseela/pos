import { FoodItem } from '@/lib/types';

interface MenuItemsProps {
  foodItems: FoodItem[];
  filterCategory: string;
  onFilterChange: (category: string) => void;
  onAddToCart: (item: FoodItem) => void;
}

export default function MenuItems({ 
  foodItems, 
  filterCategory, 
  onFilterChange, 
  onAddToCart 
}: MenuItemsProps) {
  const categories = ['all', ...Array.from(new Set(foodItems.map(item => item.category)))];

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Menu Items</h2>
        <div className="flex gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onFilterChange(category)}
              className={`px-3 py-1 rounded-full text-sm ${
                filterCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {foodItems.map(item => (
          <button
            key={item.id}
            onClick={() => onAddToCart(item)}
            disabled={!item.available}
            className={`p-3 rounded-lg border text-left transition-all ${
              item.available
                ? 'hover:border-primary hover:bg-primary/5 border-gray-200'
                : 'opacity-50 cursor-not-allowed border-gray-100'
            }`}
          >
            <div className="font-medium">{item.name}</div>
            <div className="text-sm text-gray-600 mb-2">{item.category}</div>
            <div className="font-bold text-primary">RS.{item.price}</div>
            {item.description && (
              <div className="text-xs text-gray-500 mt-1">{item.description}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}