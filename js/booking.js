// booking.js — handle booking form, Formspree lead, localStorage backup, and payment simulation

function bookingForm(){
  return {
    form: { name: '', email: '', org:'', items:'', address:'', date:'' },
    estimate: '49',
    async submit(){
      // validation
      if(!this.form.name || !this.form.email) { alert('Name & email required'); return; }
      const booking = { id: 'bk_'+Date.now(), ...this.form, status:'pending', created: new Date().toISOString() };
      // save locally
      const all = JSON.parse(localStorage.getItem('renvia_bookings')||'[]');
      all.unshift(booking);
      localStorage.setItem('renvia_bookings', JSON.stringify(all));
      // send to Formspree (lead capture) — placeholder
      try{
        const formspree = window.RENVIA_CONFIG.FORMSPREE_ID || 'YOUR_FORMSPREE_ID';
        await fetch('https://formspree.io/f/'+formspree, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ message: JSON.stringify(booking), email: this.form.email }) });
      }catch(e){ console.log('Formspree send failed', e); }
      // log simulated notification for founder
      const events = JSON.parse(localStorage.getItem('renvia_events')||'[]');
      events.unshift({ type:'new_lead', ts:new Date().toISOString(), data:booking });
      localStorage.setItem('renvia_events', JSON.stringify(events));
      // redirect to thankyou
      window.location.href='thankyou.html?type=booking&id='+booking.id;
    },
    pay(method){
      // Simulate Stripe: store pending then redirect to thankyou with a paid flag
      const booking = { id: 'bk_'+Date.now(), ...this.form, status:'paid', paidWith:method, created: new Date().toISOString() };
      const all = JSON.parse(localStorage.getItem('renvia_bookings')||'[]');
      all.unshift(booking);
      localStorage.setItem('renvia_bookings', JSON.stringify(all));
      // In real setup stripe.js will be used — here we redirect
      window.location.href='thankyou.html?type=payment&id='+booking.id;
    }
  }
}

// expose for non-Alpine use
window.bookingForm = bookingForm;