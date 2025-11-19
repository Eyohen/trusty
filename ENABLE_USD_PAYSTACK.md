# How to Enable USD on Your Paystack Account

Your code is now set to USD, but payments will fail until you enable USD in your Paystack dashboard.

## Steps to Enable USD

### 1. Login to Paystack Dashboard
Go to: https://dashboard.paystack.com/

### 2. Navigate to Settings
**Settings** → **Preferences** → **Payment Currency**

### 3. Enable Multi-Currency

For **Nigerian Businesses**:
- Click on "Multi-Currency Settings"
- Select "Enable USD"
- You'll need to complete business verification

### 4. Complete Business Verification (if required)

You may need to provide:
- Business registration documents
- Bank account details
- ID verification
- Proof of address

### 5. Submit for Approval

- Submit your application
- Wait for Paystack approval (typically 1-3 business days)
- You'll receive an email when approved

### 6. Test USD Payments

Once approved:
- Use test mode with test key
- Test card: `4084 0840 8408 4081`
- Should work with USD

---

## Alternative: Contact Paystack Support

If you can't find the USD settings:

1. **Email**: support@paystack.com
2. **Subject**: "Request to Enable USD Payments"
3. **Include**:
   - Your business name
   - Account email
   - Reason for needing USD

**Response time**: Usually 24-48 hours

---

## Temporary Solution: Use NGN

While waiting for USD approval, you can temporarily use NGN:

1. Change currency in Checkout.jsx from 'USD' to 'NGN'
2. Convert your USD prices to NGN
3. Switch back to USD once approved

Current exchange rate (approximate): $1 USD ≈ ₦1,550 NGN

---

## Check Account Status

To verify if USD is enabled:
1. Dashboard → Settings → Currencies
2. Look for "Supported Currencies" list
3. USD should be listed and enabled

---

## Important Notes

- **Test mode**: USD might work in test mode even if not fully enabled for live mode
- **Webhooks**: Update webhook URLs when switching currencies
- **Conversion**: Paystack handles currency conversion automatically
- **Fees**: Different fees may apply for USD vs NGN transactions

---

Once USD is enabled in your Paystack dashboard, the payment modal will work perfectly with USD! 🎉
