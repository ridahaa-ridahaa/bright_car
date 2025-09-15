
const services = [
  {id: 'svc1', name: 'غسيل سريع', price: 80},
  {id: 'svc2', name: 'غسيل كامل', price: 200},
  {id: 'svc3', name: 'تلميع خارجي', price: 150}
];

const taxRate = 0.15;

function $(sel){ return document.querySelector(sel) }
function createCard(svc){
  const tpl = document.getElementById('serviceCardTpl')
  const node = tpl.content.cloneNode(true)
  node.querySelector('.svc-name').textContent = svc.name
  node.querySelector('.price').textContent = svc.price + ' ريال'
  const btn = node.querySelector('.book')
  btn.addEventListener('click', ()=> openBooking(svc))
  return node
}

function renderServices(){
  const list = $('#servicesList')
  list.innerHTML = ''
  services.forEach(svc=>{
    list.appendChild(createCard(svc))
  })
}

let current = null
function openBooking(svc){
  current = svc
  $('#svcName').textContent = svc.name
  $('#svcPrice').textContent = svc.price.toFixed(2)
  $('#qty').value = 1
  updateTotals()
  $('#bookingModal').classList.remove('hidden')
}

function closeBooking(){ $('#bookingModal').classList.add('hidden') }

function updateTotals(){
  const qty = Number($('#qty').value)
  const subtotal = current.price * qty
  const tax = subtotal * taxRate
  const total = subtotal + tax
  $('#subtotal').textContent = subtotal.toFixed(2)
  $('#tax').textContent = tax.toFixed(2)
  $('#total').textContent = total.toFixed(2)
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderServices()
  $('#closeModal').addEventListener('click', closeBooking)
  $('#qty').addEventListener('input', updateTotals)
  $('#confirmBooking').addEventListener('click', ()=>{
    const qty = Number($('#qty').value)
    const subtotal = current.price * qty
    const tax = subtotal * taxRate
    const total = subtotal + tax
    // Save booking locally (demo). In production you'd POST to your API.
    const bookings = JSON.parse(localStorage.getItem('bookings')||'[]')
    const id = 'BK-'+Date.now()
    bookings.push({id, serviceId: current.id, serviceName: current.name, qty, subtotal, tax, total, createdAt: new Date().toISOString()})
    localStorage.setItem('bookings', JSON.stringify(bookings))
    alert('تم تأكيد الحجز! رقم: '+id)
    closeBooking()
  })
})

// register service worker
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('service-worker.js').catch(()=>{})
}
