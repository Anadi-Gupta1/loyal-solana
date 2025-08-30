import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, Gift, Star, Calendar, ExternalLink, Store } from 'lucide-react';
import { useState } from 'react';

interface LoyaltyNFT {
  id: string;
  merchant: string;
  title: string;
  description: string;
  discount: string;
  expiryDate: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  redeemed: boolean;
}

export const CustomerWallet = () => {
  const [nfts] = useState<LoyaltyNFT[]>([
    {
      id: '1',
      merchant: 'Coffee Corner',
      title: 'Free Coffee NFT',
      description: 'Get a free coffee of your choice',
      discount: '100% OFF',
      expiryDate: '2024-12-31',
      rarity: 'Common',
      redeemed: false
    },
    {
      id: '2',
      merchant: 'Fashion Store',
      title: 'VIP Member Discount',
      description: '20% off any item in store',
      discount: '20% OFF',
      expiryDate: '2024-11-30',
      rarity: 'Rare',
      redeemed: false
    },
    {
      id: '3',
      merchant: 'Tech Gadgets',
      title: 'Early Access Pass',
      description: 'First access to new product launches',
      discount: 'EXCLUSIVE',
      expiryDate: '2025-01-15',
      rarity: 'Epic',
      redeemed: false
    }
  ]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-muted-foreground';
      case 'Rare': return 'text-primary';
      case 'Epic': return 'text-solana-cyan';
      case 'Legendary': return 'text-loyalty-gold';
      default: return 'text-muted-foreground';
    }
  };

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'secondary';
      case 'Rare': return 'default';
      case 'Epic': return 'outline';
      case 'Legendary': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Wallet className="w-8 h-8 text-primary" />
              My Loyalty NFTs
            </h1>
            <p className="text-muted-foreground">Your collection of loyalty rewards and exclusive offers</p>
          </div>
        </div>

        {/* Wallet Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-solana-cyan/10 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total NFTs</CardTitle>
              <Gift className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{nfts.length}</div>
              <p className="text-xs text-muted-foreground">Across {new Set(nfts.map(n => n.merchant)).size} merchants</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-accent/10 to-loyalty-gold/10 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Rewards</CardTitle>
              <Star className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{nfts.filter(n => !n.redeemed).length}</div>
              <p className="text-xs text-muted-foreground">Ready to redeem</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-loyalty-gold/10 to-primary/10 border-loyalty-gold/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Value</CardTitle>
              <Wallet className="h-4 w-4 text-loyalty-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-loyalty-gold">$127</div>
              <p className="text-xs text-muted-foreground">Estimated savings</p>
            </CardContent>
          </Card>
        </div>

        {/* NFT Collection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <Card key={nft.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant={getRarityBadgeColor(nft.rarity)} className={getRarityColor(nft.rarity)}>
                    {nft.rarity}
                  </Badge>
                  <Badge variant="outline" className="text-accent font-semibold">
                    {nft.discount}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{nft.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  {nft.merchant}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{nft.description}</p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Expires: {nft.expiryDate}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="loyalty" className="flex-1">
                    Redeem Now
                  </Button>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {nfts.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Gift className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No NFTs Yet</h3>
              <p className="text-muted-foreground mb-6">Start shopping with our partner merchants to earn loyalty NFTs!</p>
              <Button variant="hero">Discover Merchants</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};