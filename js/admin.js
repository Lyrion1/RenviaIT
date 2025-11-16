// admin.js — simple admin actions: view, mark completed, export, simulate notifications
function loadAdmin(){
  const root = document.getElementById('admin-root');
  const bookings = JSON.parse(localStorage.getItem('renvia_bookings')||'[]');
  let html = '<div class="bg-white p-4 rounded shadow">';
  html += '<h3 class="font-semibold">Submissions</h3>';
  html += '<table class="w-full text-sm mt-3"><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Status</th><th>Actions</th></tr></thead><tbody>';
  bookings.forEach(b=>{
    html += `<tr class="border-t"><td class="py-2">${b.id}</td><td>${b.name}</td><td>${b.email}</td><td>${b.status}</td><td><button onclick="adminToggle('${b.id}')" class="text-green-600">Toggle</button> <button onclick="adminNotify('${b.id}')" class="ml-2 text-blue-600">Notify</button></td></tr>`;
  });
  html += '</tbody></table>';
  html += '<div class="mt-4"><button onclick="adminExport()" class="bg-gray-100 px-3 py-2 rounded">Export CSV</button></div>';
  html += '</div>';
  root.innerHTML = html;
}
function adminToggle(id){ const all = JSON.parse(localStorage.getItem('renvia_bookings')||'[]'); const i=all.findIndex(x=>x.id===id); if(i>-1){ all[i].status = (all[i].status==='completed')?'pending':'completed'; localStorage.setItem('renvia_bookings', JSON.stringify(all)); loadAdmin(); } }
function adminExport(){ const all = JSON.parse(localStorage.getItem('renvia_bookings')||'[]'); const keys = ['id','name','email','org','items','address','date','status','created']; const rows=[keys.join(',')]; all.forEach(r=>rows.push(keys.map(k=>`"${(r[k]||'').toString().replace(/"/g,'""')}"`).join(','))); const blob=new Blob([rows.join('\n')],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='admin_bookings.csv'; document.body.appendChild(a); a.click(); a.remove(); }
function adminNotify(id){ const all = JSON.parse(localStorage.getItem('renvia_bookings')||'[]'); const b = all.find(x=>x.id===id); const events = JSON.parse(localStorage.getItem('renvia_events')||'[]'); events.unshift({ type:'admin_notify', ts:new Date().toISOString(), id:id, email:b&&b.email }); localStorage.setItem('renvia_events', JSON.stringify(events)); alert('Simulated notification logged'); }