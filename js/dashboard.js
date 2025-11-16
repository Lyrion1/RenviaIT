// dashboard.js — renders bookings, downloads, and impact metrics
(function(){
  function formatDate(d){ return new Date(d).toLocaleString(); }
  function calcMetrics(bookings){
    const pickups = bookings.filter(b=>b.status==='completed').length;
    const kg = pickups * 12; // example average
    const co2 = Math.round(kg * 0.5);
    return { pickups, kg, co2 };
  }
  function render(){
    const root = document.getElementById('dashboard-root');
    const bookings = JSON.parse(localStorage.getItem('renvia_bookings')||'[]');
    const metrics = calcMetrics(bookings);
    // metrics
    document.getElementById('metric-pickups') && (document.getElementById('metric-pickups').innerText = metrics.pickups);
    document.getElementById('metric-kg') && (document.getElementById('metric-kg').innerText = metrics.kg);
    document.getElementById('metric-co2') && (document.getElementById('metric-co2').innerText = metrics.co2);

    let html = '';
    html += '<div class="grid grid-cols-1 md:grid-cols-3 gap-4">';
    html += '<div class="col-span-2 bg-white p-4 rounded shadow">';
    html += '<h3 class="font-semibold">Bookings</h3>';
    html += '<table class="w-full text-sm mt-3"><thead><tr><th>ID</th><th>Name</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>';
    bookings.forEach(b=>{
      html += `<tr class="border-t"><td class="py-2">${b.id}</td><td>${b.name||b.org||'-'}</td><td>${b.date||b.created}</td><td>${b.status||'pending'}</td><td><button onclick="toggleComplete('${b.id}')" class="text-sm text-green-600">Toggle Complete</button> <button onclick="downloadBooking('${b.id}')" class="text-sm text-blue-600 ml-2">Download</button></td></tr>`;
    });
    html += '</tbody></table></div>';
    html += '<div class="bg-white p-4 rounded shadow">';
    html += '<h3 class="font-semibold">Your impact</h3>';
    html += `<div class="mt-3 text-sm">Pickups completed: ${metrics.pickups}</div>`;
    html += `<div class="text-sm">Kg recycled: ${metrics.kg}</div>`;
    html += `<div class="text-sm">CO₂ saved (est): ${metrics.co2}</div>`;

    html += '<div class="mt-4"><button onclick="exportCSV()" class="bg-gray-100 px-3 py-2 rounded">Export CSV</button></div>';
    html += '</div></div>';
    root.innerHTML = html;
  }
  window.toggleComplete = function(id){
    const all = JSON.parse(localStorage.getItem('renvia_bookings')||'[]');
    const i = all.findIndex(x=>x.id===id); if(i>-1){ all[i].status = (all[i].status==='completed')? 'pending':'completed'; localStorage.setItem('renvia_bookings', JSON.stringify(all)); render(); }
  }
  window.downloadBooking = function(id){
    const all = JSON.parse(localStorage.getItem('renvia_bookings')||'[]'); const b = all.find(x=>x.id===id); if(!b) return; const blob = new Blob([JSON.stringify(b,null,2)],{type:'application/json'}); const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=id+'.json'; document.body.appendChild(a); a.click(); a.remove();
  }
  window.exportCSV = function(){
    const all = JSON.parse(localStorage.getItem('renvia_bookings')||'[]'); if(!all.length){ alert('No bookings'); return; }
    const keys = ['id','name','email','org','items','address','date','status','created','paidWith'];
    const rows = [keys.join(',')];
    all.forEach(r=>rows.push(keys.map(k=>`"${(r[k]||'').toString().replace(/"/g,'""')}"`).join(',')));
    const blob = new Blob([rows.join('\n')],{type:'text/csv'}); const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='renvia_bookings.csv'; document.body.appendChild(a); a.click(); a.remove();
  }
  // init
  document.addEventListener('DOMContentLoaded', ()=>{ render(); });
})();