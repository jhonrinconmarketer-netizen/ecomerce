import { Header } from '@/components/Header';
import { Hero } from '@/sections/Hero';
import { ProductCatalog } from '@/sections/ProductCatalog';
import { ProductLanding } from '@/sections/ProductLanding';
import { Cart } from '@/sections/Cart';
import { Footer } from '@/sections/Footer';
import { useNavigationStore } from '@/store/navigationStore';
import { getProductById } from '@/data/products';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const { currentView, selectedProductId } = useNavigationStore();

  const renderContent = () => {
    switch (currentView) {
      case 'product':
        if (selectedProductId) {
          const product = getProductById(selectedProductId);
          if (product) {
            return <ProductLanding product={product} />;
          }
        }
        return (
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-stone-600">Producto no encontrado</p>
          </div>
        );

      case 'cart':
        return <Cart />;

      case 'checkout':
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-stone-800 mb-4">
                Checkout en desarrollo
              </h1>
              <p className="text-stone-600">
                Esta funcionalidad estará disponible próximamente.
              </p>
            </div>
          </div>
        );

      case 'home':
      default:
        return (
          <>
            <Hero />
            <ProductCatalog />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>{renderContent()}</main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default App;
