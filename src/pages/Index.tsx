import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { MerchantDashboard } from '@/components/MerchantDashboard';
import { CustomerWallet } from '@/components/CustomerWallet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [activeView, setActiveView] = useState<'hero' | 'merchant' | 'customer'>('hero');

  if (activeView === 'merchant') {
    return (
      <>
        <Navbar />
        <MerchantDashboard />
        <div className="fixed bottom-6 right-6 z-50">
          <Button onClick={() => setActiveView('hero')} variant="outline">
            ← Back to Home
          </Button>
        </div>
      </>
    );
  }

  if (activeView === 'customer') {
    return (
      <>
        <Navbar />
        <CustomerWallet />
        <div className="fixed bottom-6 right-6 z-50">
          <Button onClick={() => setActiveView('hero')} variant="outline">
            ← Back to Home
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Hero />
      
      {/* Demo Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore the Platform</h2>
          <p className="text-muted-foreground text-lg">Try our merchant dashboard and customer wallet interfaces</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-primary/5 to-solana-cyan/5 border-primary/20" onClick={() => setActiveView('merchant')}>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                🏪 Merchant Dashboard
              </CardTitle>
              <CardDescription>
                Create and manage loyalty NFT campaigns for your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                • Design custom loyalty campaigns<br/>
                • Track redemption analytics<br/>
                • Mint NFTs for customers<br/>
                • Real-time campaign monitoring
              </p>
              <Button variant="hero" className="w-full">
                View Merchant Demo →
              </Button>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-accent/5 to-loyalty-gold/5 border-accent/20" onClick={() => setActiveView('customer')}>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                👛 Customer Wallet
              </CardTitle>
              <CardDescription>
                Manage your loyalty NFT collection and redeem rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                • View loyalty NFT collection<br/>
                • Track reward values<br/>
                • Redeem NFTs for discounts<br/>
                • Portable across merchants
              </p>
              <Button variant="loyalty" className="w-full">
                View Customer Demo →
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Index;
