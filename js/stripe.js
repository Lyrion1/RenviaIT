// stripe.js — small helper prepared for future integration
// Currently uses placeholder redirect simulation. Replace RENVIA_CONFIG.STRIPE_PUBLISHABLE with real key.

export async function startCheckout(priceId){
  const pk = window.RENVIA_CONFIG.STRIPE_PUBLISHABLE;
  if(!pk || pk.includes('PLACEHOLDER')){ console.warn('Stripe publishable key placeholder — simulate checkout');
    // simulate
    setTimeout(()=>{ window.location.href = 'thankyou.html?type=payment&sim=1'; }, 600);
    return;
  }
  // Real integration example (left as TODO): load Stripe and call redirectToCheckout
}