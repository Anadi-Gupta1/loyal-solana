import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Store, Users, TrendingUp, Gift } from 'lucide-react';
import { useState } from 'react';

export const MerchantDashboard = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Coffee Loyalty Program',
      description: 'Get a free coffee after 10 purchases',
      nftsMinted: 156,
      redeemed: 23,
      active: true
    },
    {
      id: 2,
      name: 'VIP Customer Rewards',
      description: '20% discount for premium customers',
      nftsMinted: 45,
      redeemed: 12,
      active: true
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Merchant Dashboard</h1>
            <p className="text-muted-foreground">Manage your loyalty NFT campaigns</p>
          </div>
          <Button variant="hero" className="gap-2">
            <Plus className="w-4 h-4" />
            Create Campaign
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total NFTs Minted</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">1,234</div>
              <p className="text-xs text-muted-foreground">+20% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-solana-cyan">8</div>
              <p className="text-xs text-muted-foreground">2 pending approval</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Redemptions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">456</div>
              <p className="text-xs text-muted-foreground">85% redemption rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-loyalty-gold">892</div>
              <p className="text-xs text-muted-foreground">+15% new customers</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Campaign Form */}
          <Card>
            <CardHeader>
              <CardTitle>Create New Campaign</CardTitle>
              <CardDescription>Design a new loyalty NFT campaign for your customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input id="campaign-name" placeholder="e.g., Summer Sale Rewards" />
              </div>
              
              <div>
                <Label htmlFor="campaign-description">Description</Label>
                <Textarea id="campaign-description" placeholder="Describe the rewards and redemption rules..." />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="discount-percent">Discount %</Label>
                  <Input id="discount-percent" type="number" placeholder="10" />
                </div>
                <div>
                  <Label htmlFor="nft-supply">NFT Supply</Label>
                  <Input id="nft-supply" type="number" placeholder="1000" />
                </div>
              </div>
              
              <Button variant="solana" className="w-full">
                Create & Mint NFTs
              </Button>
            </CardContent>
          </Card>

          {/* Active Campaigns */}
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>Monitor your live loyalty programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <Badge variant={campaign.active ? "default" : "secondary"}>
                        {campaign.active ? "Active" : "Paused"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{campaign.description}</p>
                    <div className="flex justify-between text-sm">
                      <span>Minted: <span className="font-medium text-primary">{campaign.nftsMinted}</span></span>
                      <span>Redeemed: <span className="font-medium text-accent">{campaign.redeemed}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};