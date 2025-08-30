import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, Store, Users, Zap } from 'lucide-react';
import heroImage from '@/assets/hero-loyalty-nft.jpg';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with hero image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          filter: 'brightness(0.3)'
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <Badge variant="secondary" className="mb-6 px-4 py-2 text-lg">
          ⚡ Powered by Solana
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-solana-cyan to-accent bg-clip-text text-transparent">
          Loyalty NFTs
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Revolutionary loyalty program platform where merchants mint custom NFTs for customer rewards. 
          Verifiable on-chain, tradeable, and redeemable instantly.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="hero" size="lg" className="text-lg px-8 py-4">
            Connect Wallet
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary/30 hover:border-primary">
            View Demo
          </Button>
        </div>
        
        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
            <Store className="w-12 h-12 text-primary mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">For Merchants</h3>
            <p className="text-muted-foreground">Create custom loyalty campaigns with programmable NFTs</p>
          </Card>
          
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-solana-cyan/20 hover:border-solana-cyan/40 transition-all duration-300 hover:scale-105">
            <Users className="w-12 h-12 text-solana-cyan mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">For Customers</h3>
            <p className="text-muted-foreground">Collect, trade, and redeem loyalty NFTs across platforms</p>
          </Card>
          
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105">
            <Coins className="w-12 h-12 text-accent mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Atomic Redemption</h3>
            <p className="text-muted-foreground">Instant, verifiable redemptions with zero fraud risk</p>
          </Card>
          
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-loyalty-gold/20 hover:border-loyalty-gold/40 transition-all duration-300 hover:scale-105">
            <Zap className="w-12 h-12 text-loyalty-gold mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">Sub-second transactions powered by Solana blockchain</p>
          </Card>
        </div>
      </div>
    </section>
  );
};