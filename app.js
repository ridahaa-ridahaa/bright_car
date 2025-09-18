// بيانات تجريبية للخدمات
const services = [
  { name: "غسيل خارجي", desc: "تنظيف خارجي للسيارة", price: 50 },
  { name: "غسيل داخلي", desc: "تنظيف المقاعد والديكور الداخلي", price: 80 },
  { name: "بوليش", desc: "تلميع خارجي للسيارة", price: 150 }
];

// تحميل الخدمات في الصفحة
const servicesList = document.getElementById("servicesList");
const tpl = document.getElementById("serviceCardTpl");

services.forEach(service => {
  const clone = tpl.content.cloneNode(true);
  clone.querySelector(".svcName").textContent = service.name;
  clone.querySelector(".svcDesc").textContent = service.desc;
  clone.querySelector(".svcPrice").textContent = service.price;
  clone.querySelector(".bookBtn").addEventListener("click", () => openModal(service));
  servicesList.appendChild(clone);
});

// التحكم بالنافذة
const modal = document.getElementById("bookingModal");
const closeModalBtn = document.getElementById("closeModal");
const confirmBookingBtn = document.getElementById("confirmBooking");

const svcNameEl = document.getElementById("svcName");
const svcPriceEl = document.getElementById("svcPrice");
const qtyInput = document.getElementById("qty");
const subtotalEl = document.getElementById("subtotal");
const taxEl = document.getElementById("tax");
const totalEl = document.getElementById("total");

let currentService = null;

function openModal(service) {
  currentService = service;
  svcNameEl.textContent = service.name;
  svcPriceEl.textContent = service.price;
  qtyInput.value = 1;
  updateTotals();
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

function updateTotals() {
  const qty = parseInt(qtyInput.value);
  const subtotal = qty * currentService.price;
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  subtotalEl.textContent = subtotal.toFixed(2);
  taxEl.textContent = tax.toFixed(2);
  totalEl.textContent = total.toFixed(2);
}

qtyInput.addEventListener("input", updateTotals);
closeModalBtn.addEventListener("click", closeModal);
confirmBookingBtn.addEventListener("click", () => {
  alert("تم تأكيد الحجز ✅");
  closeModal();
});
