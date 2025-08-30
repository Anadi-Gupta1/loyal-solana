import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';

export const WalletConnect = () => {
  return (
    <div className="wallet-connect">
      <WalletMultiButton className="!bg-gradient-to-r !from-primary !to-solana-cyan !text-primary-foreground !border-0 !rounded-lg !font-medium !px-6 !py-3 !transition-all !duration-300 hover:!scale-105 hover:!shadow-lg" />
    </div>
  );
};

export const ConnectWalletButton = ({ className = '' }: { className?: string }) => {
  return (
    <Button variant="hero" className={className}>
      Connect Wallet
    </Button>
  );
};