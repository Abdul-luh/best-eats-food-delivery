import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryRow } from "@/components/home/CategoryRow";
import { FeaturedRestaurants } from "@/components/home/FeaturedRestaurants";
import { PopularFoods } from "@/components/home/PopularFoods";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoryRow />
      <FeaturedRestaurants />
      <PopularFoods />
      
      {/* Newsletter / CTA */}
      <section className="py-20 bg-brand-600 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 border-[40px] border-white rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 border-[40px] border-white rounded-full" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Hungry? Order Now!</h2>
          <p className="text-xl opacity-90 mb-10 leading-relaxed">
            Join thousands of happy customers and get your favorite food delivered in minutes. 
            First order gets a 20% discount!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex-1 max-w-sm">
              <input 
                type="email" 
                placeholder="Enter your email for 20% off" 
                className="w-full h-14 px-6 rounded-2xl text-slate-900 focus:ring-4 focus:ring-white/20 transition-all outline-none"
              />
            </div>
            <button className="h-14 px-10 bg-white text-brand-600 font-bold rounded-2xl hover:bg-slate-100 transition-all shadow-xl">
              Get Discount
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
