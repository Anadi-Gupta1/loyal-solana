# Solana Loyalty NFTs — Merchant Loyalty Platform

A revolutionary blockchain-based loyalty program platform that enables merchants to mint custom-branded NFTs as customer rewards, leveraging Solana's speed and low fees for real-time loyalty transactions.

## 🌟 Features

- **Merchant Dashboard**: Create and manage loyalty NFT campaigns
- **Customer Wallet**: Collect, view, and redeem loyalty NFTs
- **Atomic Redemption**: Instant, verifiable redemptions with zero fraud risk
- **Cross-Platform Portability**: Loyalty tokens work across multiple merchants
- **Real-time Analytics**: Track campaign performance and customer engagement
- **Solana Integration**: Lightning-fast transactions with minimal fees

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Phantom Wallet (or compatible Solana wallet)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd solana-loyalty-nfts

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file:

```bash
# Solana Configuration
VITE_SOLANA_NETWORK=devnet
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com

# Program Configuration
VITE_PROGRAM_ID=EXAMPLE_DEVNET_XXXXXXXXX

# Supabase Configuration (for backend)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🏗️ Architecture

### Frontend Stack
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **@solana/wallet-adapter** for wallet integration
- **Vite** for development and building

### Backend & Database
- **Supabase** for merchant metadata and analytics
- **Real-time subscriptions** for live updates
- **PostgreSQL** for structured data storage

### Blockchain Layer
- **Solana blockchain** for NFT storage and transactions
- **Anchor framework** for smart contract development
- **SPL Tokens** for NFT minting and management

## 📋 On-Chain Program Structure

### Program Accounts (PDAs)

```rust
// Root program configuration
loyalty_program: seeds = ["loyalty_program"]

// Per-merchant account
merchant_account: seeds = ["merchant", merchant_pubkey]

// Campaign-specific NFT mint
loyalty_nft_mint: seeds = ["mint", merchant_pubkey, series_id]

// Anti-replay redemption tracking
redemption_record: seeds = ["redeem", user_pubkey, mint_pubkey, nonce]
```

### Core Instructions

1. **initialize_program**: Set up global program state
2. **create_merchant**: Register a new merchant
3. **create_loyalty_campaign**: Launch a new NFT campaign
4. **mint_loyalty_nft**: Issue NFT to customer
5. **redeem_loyalty_nft**: Atomic redemption with replay protection

## 🎯 Demo Interfaces

### Merchant Dashboard
- Create custom loyalty campaigns
- Set discount percentages and redemption rules
- Monitor real-time analytics
- Track NFT minting and redemption rates

### Customer Wallet
- View loyalty NFT collection
- Track reward values and expiration dates
- Redeem NFTs for instant discounts
- Browse participating merchants

## 🔧 Development Commands

```bash
# Development
npm run dev                 # Start development server
npm run build              # Build for production
npm run preview            # Preview production build

# Testing
npm run test               # Run unit tests
npm run test:integration   # Run integration tests
npm run test:coverage      # Generate coverage report

# Blockchain (when Anchor is set up)
anchor build               # Build Rust program
anchor test                # Run Anchor tests
anchor deploy              # Deploy to configured network
```

## 🔐 Security Features

### Smart Contract Security
- **PDA-based architecture** prevents unauthorized access
- **Replay attack prevention** via unique nonce system
- **Atomic redemption** ensures transaction integrity
- **Authority validation** on all critical operations

### Frontend Security
- **Wallet signature verification** for all transactions
- **Input validation** and sanitization
- **HTTPS-only** in production
- **Environment variable protection**

## 📊 Analytics & Metrics

Track key performance indicators:
- **Merchant Count**: Total registered merchants
- **NFT Minting Volume**: Daily/monthly minting activity
- **Redemption Rate**: Percentage of minted NFTs redeemed
- **Customer Engagement**: Unique wallets and repeat usage
- **Revenue Tracking**: Platform fees and merchant performance

## 🌐 API Endpoints

```typescript
// Merchant management
POST /api/merchants/register
GET  /api/merchants/:id
PUT  /api/merchants/:id

// Campaign management
POST /api/campaigns/create
GET  /api/campaigns/:merchantId
PUT  /api/campaigns/:id/status

// Analytics
GET  /api/analytics/merchants/:id
GET  /api/analytics/platform/overview
```

## 🛣️ Roadmap

### Phase 1: MVP (Completed)
- ✅ Basic NFT minting and redemption
- ✅ Merchant and customer interfaces
- ✅ Wallet integration

### Phase 2: Enhancement (In Progress)
- 🔄 Advanced analytics dashboard
- 🔄 Mobile-responsive design
- 🔄 Multi-merchant partnerships

### Phase 3: Scale (Planned)
- 📋 Mainnet deployment
- 📋 Advanced campaign features
- 📋 Third-party integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.loyalty-nfts.dev](https://docs.loyalty-nfts.dev)
- **Discord**: [Join our community](https://discord.gg/loyalty-nfts)
- **Issues**: [GitHub Issues](https://github.com/your-org/loyalty-nfts/issues)

## 🏆 Grant Information

This project is funded by the Solana Foundation Grant Program. See [grant_form_fields.md](grant_form_fields.md) for complete grant application details.

---

**Built with ❤️ on Solana** | **Powered by the Solana Foundation Grant Program**