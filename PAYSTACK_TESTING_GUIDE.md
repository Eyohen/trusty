# Paystack Integration - Testing Guide

## What Was Fixed

### 1. **Switched to react-paystack Library** ✅
   - Replaced manual `window.PaystackPop` integration with `react-paystack` library
   - More reliable script loading and error handling
   - Better React integration with hooks

### 2. **Added Script Loading Detection** ✅
   - Monitors Paystack script loading status
   - Shows loading indicator while payment system initializes
   - Displays error if script fails to load after 5 seconds
   - Disables payment button until system is ready

### 3. **Comprehensive Error Messages** ✅
   - Validates customer information (name, email)
   - Validates email format with regex
   - Checks for API key presence
   - Shows specific error messages for each failure point
   - Better visual error display with icons

### 4. **Environment Configuration** ✅
   - Updated to use TEST key for development: `pk_test_1f5a5ab118af9e29eec25cef9c99aeb3dc3cf877`
   - Added comments for switching to live key in production
   - Added debug logs to verify environment setup

### 5. **Improved UI/UX** ✅
   - Loading spinner while payment system initializes
   - Loading spinner during payment processing
   - Better error display with visual indicators
   - Disabled button states to prevent double-clicks

---

## How to Test

### Step 1: Start the Dev Server
```bash
cd /Users/henry/Desktop/Projects/trustytranscript/trusty
npm run dev
```

### Step 2: Open the Checkout Page
Navigate to: `http://localhost:5174/checkout` (or whatever port Vite assigns)

### Step 3: Check Browser Console
Open Developer Tools (F12 or Cmd+Opt+I) and look for:
```
=== PAYSTACK DEBUG INFO ===
Environment: development
API URL: http://localhost:9000
Paystack Key Present: true
Paystack Key Type: TEST
=========================
✅ Paystack script loaded successfully
```

### Step 4: Fill in the Form
- Duration: 45 minutes (default)
- Customer Name: John Doe
- Email: test@example.com

### Step 5: Click "Pay with Paystack"
- Button should show "Processing..." with spinner
- Paystack modal should open
- You should see the payment form

### Step 6: Use Test Cards
Paystack provides test cards for different scenarios:

**Successful Payment:**
- Card: `4084 0840 8408 4081`
- Expiry: Any future date (e.g., 12/25)
- CVV: 408
- OTP: 123456

**Failed Payment:**
- Card: `5060 6666 6666 6666 6666`
- Will show payment failed

**Insufficient Funds:**
- Card: `5060 6666 6666 6666 6666`

More test cards: https://paystack.com/docs/payments/test-payments/

---

## Troubleshooting

### Issue: Button shows "Loading Payment System..." forever

**Solution:**
1. Check browser console for errors
2. Verify Paystack script in `index.html`:
   ```html
   <script src="https://js.paystack.co/v1/inline.js"></script>
   ```
3. Check if ad blocker is blocking the script
4. Try hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

---

### Issue: "Payment system configuration error" message

**Solution:**
1. Restart dev server (Ctrl+C, then `npm run dev`)
2. Verify `.env` file has:
   ```
   VITE_PAYSTACK_PUBLIC_KEY="pk_test_1f5a5ab118af9e29eec25cef9c99aeb3dc3cf877"
   ```
3. Check console for "Paystack Key Present: true"

---

### Issue: Modal opens but shows error immediately

**Solution:**
1. Verify test key is correct in `.env`
2. Check if Paystack account is active
3. Verify account is configured for USD
4. Check browser console for specific error

---

### Issue: Payment succeeds but verification fails

**Solution:**
1. Check backend is running on `http://localhost:9000`
2. Verify backend `/api/orders/verify-payment` endpoint exists
3. Check backend logs for errors
4. Ensure JWT token is valid (check AuthContext)

---

## Debug Console Logs

When testing, you'll see these helpful logs:

```javascript
// On page load
=== PAYSTACK DEBUG INFO ===
Environment: development
Paystack Key Present: true
Paystack Key Type: TEST

// When script loads
✅ Paystack script loaded successfully

// When creating order
Creating order...
Order created successfully: { order: {...}, paymentReference: "..." }

// When initializing payment
Initializing Paystack with config: { amount: 4050, currency: 'USD', ... }

// On payment success
Payment successful: { reference: "...", status: "success" }
```

---

## For Production

When deploying to production:

1. Update `.env`:
   ```env
   VITE_PAYSTACK_PUBLIC_KEY="pk_live_d2600cd411e787df1135a9b161447361dd0aa805"
   ```

2. Update backend `.env`:
   ```env
   PAYSTACK_SECRET_KEY="sk_live_YOUR_SECRET_KEY"
   ```

3. Test with real payment methods

4. Verify Paystack dashboard shows transactions

---

## Additional Resources

- [Paystack Documentation](https://paystack.com/docs)
- [react-paystack Docs](https://github.com/iamraphson/react-paystack)
- [Test Cards](https://paystack.com/docs/payments/test-payments/)
- [Paystack Dashboard](https://dashboard.paystack.com)

---

## Need Help?

If the modal still doesn't open:
1. Check all console logs
2. Verify network tab shows Paystack script loaded (200 status)
3. Test in incognito mode (no extensions)
4. Try different browser
5. Check backend is running and accessible
