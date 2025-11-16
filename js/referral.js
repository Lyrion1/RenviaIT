// referral.js — generate and track basic referral links and credits
(function(){
  function ensureReferral(){
    let user = JSON.parse(localStorage.getItem('renvia_user')||'null');
    if(!user){ user = { id: 'u_'+Date.now(), created: new Date().toISOString(), credits:0 }; localStorage.setItem('renvia_user', JSON.stringify(user)); }
    return user;
  }
  window.referral = {
    getLink(){ const u=ensureReferral(); return location.origin + location.pathname + '?r='+u.id; },
    credit(referrerId){ if(!referrerId) return; const events = JSON.parse(localStorage.getItem('renvia_referrals')||'[]'); events.unshift({ referrer: referrerId, ts: new Date().toISOString() }); localStorage.setItem('renvia_referrals', JSON.stringify(events));
      // increase credit for referrer if exists
      const user = JSON.parse(localStorage.getItem('renvia_user')||'null'); if(user && user.id===referrerId){ user.credits = (user.credits||0)+1; localStorage.setItem('renvia_user', JSON.stringify(user)); }
    }
  };
})();