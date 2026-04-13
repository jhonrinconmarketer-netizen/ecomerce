import { useState } from 'react';
import { products, categories } from '@/data/products';
import { useNavigationStore } from '@/store/navigationStore';
import { ShoppingCart, Eye, Star, Sofa, Lightbulb, Utensils, Palette, Zap, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap: Record<string, React.ElementType> = {
  sofa: Sofa,
  lightbulb: Lightbulb,
  utensils: Utensils,
  palette: Palette,
  zap: Zap,
  grid: Grid,
};

export function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { goToProduct } = useNavigationStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product: typeof products[0], e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} agregado al carrito`, {
      description: `Cantidad: 1`,
    });
  };

  return (
    <section id="products-section" className="py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
            Nuestros Productos
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Explora nuestra colección de productos cuidadosamente seleccionados 
            para transformar cada espacio de tu hogar.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Grid;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25'
                    : 'bg-white text-stone-600 hover:bg-amber-50 hover:text-amber-700 border border-stone-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 cursor-pointer"
                onClick={() => goToProduct(product.id)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <Badge className="absolute top-4 left-4 bg-amber-600 text-white border-0">
                      {product.badge}
                    </Badge>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white text-stone-800 hover:bg-amber-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToProduct(product.id);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalles
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-stone-600">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-stone-800 mb-2 group-hover:text-amber-700 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-sm text-stone-500 line-clamp-2 mb-4">
                    {product.shortDescription}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-stone-800">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-stone-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <Button
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Agregar
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
