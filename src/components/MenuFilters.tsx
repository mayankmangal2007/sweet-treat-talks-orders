import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MenuFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const categories = [
  { id: 'all', name: 'All Items', color: 'bg-bakery-brown' },
  { id: 'cakes', name: 'Cakes', color: 'bg-bakery-orange' },
  { id: 'cookies', name: 'Cookies', color: 'bg-bakery-warm' },
  { id: 'cupcakes', name: 'Cupcakes', color: 'bg-bakery-cream' },
  { id: 'others', name: 'Others', color: 'bg-primary' }
];

export const MenuFilters = ({ 
  selectedCategory, 
  onCategoryChange, 
  searchTerm, 
  onSearchChange 
}: MenuFiltersProps) => {
  return (
    <div className="bg-card p-6 rounded-lg border border-border mb-6">
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search for your favorite treats..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 mb-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Categories:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className={selectedCategory === category.id 
              ? `${category.color} text-white hover:opacity-80` 
              : "hover:bg-bakery-cream"
            }
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};