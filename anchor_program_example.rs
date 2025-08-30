// Sample Anchor Program for Solana Loyalty NFTs
// This is a reference implementation - actual deployment requires Rust environment

use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    metadata::{create_metadata_accounts_v3, CreateMetadataAccountsV3, Metadata},
    token::{mint_to, Mint, MintTo, Token, TokenAccount},
};
use mpl_token_metadata::{pda::find_metadata_account, state::DataV2};

declare_id!("EXAMPLE_PROGRAM_ID_XXXXXXXXXX");

#[program]
pub mod loyalty_nft_program {
    use super::*;

    pub fn initialize_program(ctx: Context<InitializeProgram>) -> Result<()> {
        let loyalty_program = &mut ctx.accounts.loyalty_program;
        loyalty_program.admin = ctx.accounts.admin.key();
        loyalty_program.program_fee = 250; // 2.5% fee in basis points
        loyalty_program.bump = *ctx.bumps.get("loyalty_program").unwrap();
        Ok(())
    }

    pub fn create_merchant(
        ctx: Context<CreateMerchant>,
        merchant_name: String,
        contact_info: String,
    ) -> Result<()> {
        let merchant_account = &mut ctx.accounts.merchant_account;
        merchant_account.merchant = ctx.accounts.merchant.key();
        merchant_account.name = merchant_name;
        merchant_account.contact_info = contact_info;
        merchant_account.total_campaigns = 0;
        merchant_account.total_nfts_minted = 0;
        merchant_account.total_redeemed = 0;
        merchant_account.bump = *ctx.bumps.get("merchant_account").unwrap();
        Ok(())
    }

    pub fn create_loyalty_campaign(
        ctx: Context<CreateLoyaltyCampaign>,
        series_id: String,
        name: String,
        symbol: String,
        uri: String,
        discount_percent: u16,
        max_supply: u64,
    ) -> Result<()> {
        // Create the NFT mint
        let cpi_accounts = MintTo {
            mint: ctx.accounts.loyalty_nft_mint.to_account_info(),
            to: ctx.accounts.merchant_token_account.to_account_info(),
            authority: ctx.accounts.merchant.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        mint_to(cpi_ctx, max_supply)?;

        // Create metadata for the NFT
        let data_v2 = DataV2 {
            name,
            symbol,
            uri,
            seller_fee_basis_points: 0,
            creators: None,
            collection: None,
            uses: None,
        };

        let metadata_ctx = CpiContext::new(
            ctx.accounts.metadata_program.to_account_info(),
            CreateMetadataAccountsV3 {
                metadata: ctx.accounts.metadata.to_account_info(),
                mint: ctx.accounts.loyalty_nft_mint.to_account_info(),
                mint_authority: ctx.accounts.merchant.to_account_info(),
                update_authority: ctx.accounts.merchant.to_account_info(),
                payer: ctx.accounts.merchant.to_account_info(),
                system_program: ctx.accounts.system_program.to_account_info(),
                rent: ctx.accounts.rent.to_account_info(),
            },
        );

        create_metadata_accounts_v3(metadata_ctx, data_v2, false, true, None)?;

        // Update merchant stats
        let merchant_account = &mut ctx.accounts.merchant_account;
        merchant_account.total_campaigns += 1;

        Ok(())
    }

    pub fn mint_loyalty_nft(
        ctx: Context<MintLoyaltyNft>,
        nonce: u64,
    ) -> Result<()> {
        // Mint single NFT to customer
        let cpi_accounts = MintTo {
            mint: ctx.accounts.loyalty_nft_mint.to_account_info(),
            to: ctx.accounts.customer_token_account.to_account_info(),
            authority: ctx.accounts.merchant.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        mint_to(cpi_ctx, 1)?;

        // Update merchant stats
        let merchant_account = &mut ctx.accounts.merchant_account;
        merchant_account.total_nfts_minted += 1;

        Ok(())
    }

    pub fn redeem_loyalty_nft(
        ctx: Context<RedeemLoyaltyNft>,
        nonce: u64,
    ) -> Result<()> {
        // Create redemption record to prevent replay attacks
        let redemption_record = &mut ctx.accounts.redemption_record;
        redemption_record.user = ctx.accounts.user.key();
        redemption_record.mint = ctx.accounts.loyalty_nft_mint.key();
        redemption_record.nonce = nonce;
        redemption_record.redeemed_at = Clock::get()?.unix_timestamp;
        redemption_record.bump = *ctx.bumps.get("redemption_record").unwrap();

        // Update merchant stats
        let merchant_account = &mut ctx.accounts.merchant_account;
        merchant_account.total_redeemed += 1;

        // Burn or lock the NFT (simplified - actual implementation would burn)
        // burn_nft(ctx)?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeProgram<'info> {
    #[account(
        init,
        seeds = [b"loyalty_program"],
        bump,
        payer = admin,
        space = LoyaltyProgram::LEN
    )]
    pub loyalty_program: Account<'info, LoyaltyProgram>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateMerchant<'info> {
    #[account(
        init,
        seeds = [b"merchant", merchant.key().as_ref()],
        bump,
        payer = merchant,
        space = MerchantAccount::LEN
    )]
    pub merchant_account: Account<'info, MerchantAccount>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(series_id: String)]
pub struct CreateLoyaltyCampaign<'info> {
    #[account(
        mut,
        seeds = [b"merchant", merchant.key().as_ref()],
        bump = merchant_account.bump
    )]
    pub merchant_account: Account<'info, MerchantAccount>,
    #[account(
        init,
        seeds = [b"mint", merchant.key().as_ref(), series_id.as_bytes()],
        bump,
        payer = merchant,
        mint::decimals = 0,
        mint::authority = merchant,
    )]
    pub loyalty_nft_mint: Account<'info, Mint>,
    #[account(
        init,
        payer = merchant,
        associated_token::mint = loyalty_nft_mint,
        associated_token::authority = merchant,
    )]
    pub merchant_token_account: Account<'info, TokenAccount>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    pub metadata: UncheckedAccount<'info>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub metadata_program: Program<'info, Metadata>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct MintLoyaltyNft<'info> {
    #[account(
        mut,
        seeds = [b"merchant", merchant.key().as_ref()],
        bump = merchant_account.bump
    )]
    pub merchant_account: Account<'info, MerchantAccount>,
    #[account(mut)]
    pub loyalty_nft_mint: Account<'info, Mint>,
    #[account(
        init_if_needed,
        payer = merchant,
        associated_token::mint = loyalty_nft_mint,
        associated_token::authority = customer,
    )]
    pub customer_token_account: Account<'info, TokenAccount>,
    /// CHECK: This is the customer receiving the NFT
    pub customer: UncheckedAccount<'info>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(nonce: u64)]
pub struct RedeemLoyaltyNft<'info> {
    #[account(
        init,
        seeds = [b"redeem", user.key().as_ref(), loyalty_nft_mint.key().as_ref(), nonce.to_le_bytes().as_ref()],
        bump,
        payer = user,
        space = RedemptionRecord::LEN
    )]
    pub redemption_record: Account<'info, RedemptionRecord>,
    #[account(
        mut,
        seeds = [b"merchant", merchant.key().as_ref()],
        bump = merchant_account.bump
    )]
    pub merchant_account: Account<'info, MerchantAccount>,
    #[account(mut)]
    pub loyalty_nft_mint: Account<'info, Mint>,
    #[account(
        mut,
        associated_token::mint = loyalty_nft_mint,
        associated_token::authority = user,
    )]
    pub user_token_account: Account<'info, TokenAccount>,
    /// CHECK: This is the merchant whose NFT is being redeemed
    pub merchant: UncheckedAccount<'info>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct LoyaltyProgram {
    pub admin: Pubkey,
    pub program_fee: u16, // Basis points
    pub bump: u8,
}

impl LoyaltyProgram {
    pub const LEN: usize = 8 + 32 + 2 + 1;
}

#[account]
pub struct MerchantAccount {
    pub merchant: Pubkey,
    pub name: String,
    pub contact_info: String,
    pub total_campaigns: u64,
    pub total_nfts_minted: u64,
    pub total_redeemed: u64,
    pub bump: u8,
}

impl MerchantAccount {
    pub const LEN: usize = 8 + 32 + (4 + 50) + (4 + 100) + 8 + 8 + 8 + 1;
}

#[account]
pub struct RedemptionRecord {
    pub user: Pubkey,
    pub mint: Pubkey,
    pub nonce: u64,
    pub redeemed_at: i64,
    pub bump: u8,
}

impl RedemptionRecord {
    pub const LEN: usize = 8 + 32 + 32 + 8 + 8 + 1;
}

#[error_code]
pub enum LoyaltyError {
    #[msg("Invalid discount percentage")]
    InvalidDiscountPercent,
    #[msg("NFT already redeemed")]
    AlreadyRedeemed,
    #[msg("Insufficient NFT balance")]
    InsufficientBalance,
}