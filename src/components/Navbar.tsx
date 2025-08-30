import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WalletConnect } from './WalletConnect';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-solana-cyan rounded-lg"></div>
          <span className="text-xl font-bold">Loyalty NFTs</span>
          <Badge variant="secondary" className="ml-2">Beta</Badge>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#merchants" className="text-muted-foreground hover:text-foreground transition-colors">For Merchants</a>
          <a href="#customers" className="text-muted-foreground hover:text-foreground transition-colors">For Customers</a>
          <a href="#docs" className="text-muted-foreground hover:text-foreground transition-colors">Docs</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <WalletConnect />
        </div>
      </div>
    </nav>
  );
};