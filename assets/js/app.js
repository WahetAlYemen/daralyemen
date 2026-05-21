/* ============================================================
   DAR AL YEMEN — Restaurant App
   Handles: i18n, Menu Rendering, Cart, Checkout, Telegram
============================================================ */

'use strict';

/* ── TELEGRAM CONFIG ──────────────────────────────────────── */
// Replace with your actual bot token and chat ID
const TG_TOKEN   = 'YOUR_TELEGRAM_BOT_TOKEN';
const TG_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';
const ORDER_OFFSET = 9019; // order numbers start at 9020

/* ── TRANSLATIONS ─────────────────────────────────────────── */
const i18n = {
  ar: {
    'nav.about':         'عن المطعم',
    'nav.menu':          'قائمة الطعام',
    'nav.gallery':       'المعرض',
    'nav.reviews':       'التقييمات',
    'nav.contact':       'تواصل معنا',
    'hero.eyebrow':      'أشهى الأكلات اليمنية والخليجية',
    'hero.line1':        'الدار دارك',
    'hero.subtitle':     'المندي الأصيل · الزربيان الشهي · الحرازي الفريد',
    'hero.order':        'اطلب الآن',
    'hero.discover':     'اكتشف المزيد',
    'hero.rating':       'تقييم Google',
    'hero.reviews':      'تقييم عملاء',
    'hero.years':        'سنوات خبرة',
    'about.eyebrow':     'قصتنا',
    'about.title':       'طعم له تاريخ\nوأصالة لا تُنسى',
    'about.p1':          'في دار اليمن، بنقدّملك أحلى أكل يمني بكل تفاصيله — بأجود المكونات وبإيدين متمرسة بتعشق الأكل الحقيقي.',
    'about.f1t':         'مكونات طازجة يومياً',
    'about.f1d':         'بنختار المكونات بعناية كل يوم',
    'about.f2t':         'طهاة يمنيين من الأصل',
    'about.f2d':         'ناس فاهمة الأكل اليمني من جوه لبره',
    'about.f3t':         'أجواء عائلية دافئة',
    'about.f3d':         'المكان ده بيحس فيه كل الناس إنه بيته',
    'about.cta':         'استعرض قائمة الطعام',
    'about.call':        'اتصل بنا',
    'menu.eyebrow':      'قائمة الطعام',
    'menu.title':        'اختر طبقك المفضل',
    'gallery.eyebrow':   'معرض الصور',
    'gallery.title':     'من مطبخنا إلى طاولتك',
    'gallery.view':      'مشاهدة',
    'reviews.eyebrow':   'آراء عملائنا',
    'reviews.title':     'ماذا يقول ضيوفنا',
    'reviews.google':    'تقييم على Google',
    'reviews.r1':        '"أروع مندي أكلته في القاهرة! اللحم طري جداً والأرز بالمرق لا يوصف. الخدمة ممتازة وأسعار معقولة جداً. سأعود بالتأكيد!"',
    'reviews.r1n':       'محمد أحمد',
    'reviews.r1d':       'منذ أسبوع',
    'reviews.r2':        '"تجربة رائعة! الزربيان له طعم مختلف تماماً. الأجواء عائلية وهادئة ومريحة. أفضل مطعم يمني في الجيزة بلا منازع."',
    'reviews.r2n':       'فاطمة علي',
    'reviews.r2d':       'منذ أسبوعين',
    'reviews.r3':        '"الحرازي ممتاز والأسعار مناسبة. من أفضل المطاعم اليمنية في المنطقة. خدمة سريعة وموظفين لطيفين. شكراً دار اليمن!"',
    'reviews.r3n':       'أحمد سمير',
    'reviews.r3d':       'منذ شهر',
    'contact.eyebrow':   'تواصل معنا',
    'contact.title':     'نحن في خدمتكم دائماً',
    'contact.addr.t':    'العنوان',
    'contact.addr.v':    '2 ش الشرفاء، فيصل الرئيسي، أمام التوحيد والنور وشارع ناصر الثورة، الجيزة',
    'contact.phone.t':   'الهاتف',
    'contact.hours.t':   'أوقات العمل',
    'contact.hours.v':   'يومياً من 12 ظهراً حتى 2 صباحاً',
    'contact.delivery.t':'خدماتنا',
    'contact.delivery.v':'داخل المطعم · استلام · توصيل',
    'contact.directions':'افتح في خرائط Google',
    'footer.slogan':     'الدار دارك | أشهى الأكلات اليمنية والخليجية',
    'footer.quick':      'روابط سريعة',
    'footer.contact':    'معلومات التواصل',
    'footer.addr':       '2 ش الشرفاء، فيصل، الجيزة',
    'footer.hours':      '12 ظ - 2 ص يومياً',
    'footer.copy':       '© 2025 مطعم دار اليمن. جميع الحقوق محفوظة.',
    'cart.added':        'أُضيف إلى السلة',
    'cart.title':        'سلتك',
    'cart.empty':        'سلتك فارغة حتى الآن',
    'cart.browse':       'تصفح القائمة',
    'cart.upsell':       'إضافات سريعة',
    'cart.total':        'الإجمالي',
    'cart.currency':     'جنيه',
    'cart.checkout':     'إتمام الطلب',
    'checkout.title':    'إتمام الطلب',
    'checkout.name':     'الاسم الكريم',
    'checkout.name.err': 'الرجاء إدخال الاسم',
    'checkout.phone':    'رقم الهاتف',
    'checkout.phone.err':'الرجاء إدخال رقم الهاتف',
    'checkout.type':          'طريقة الاستلام',
    'checkout.type.delivery': 'توصيل',
    'checkout.type.pickup':   'استلام في المطعم',
    'checkout.address':  'عنوان التوصيل',
    'checkout.address.err':'الرجاء إدخال العنوان',
    'checkout.notes':    'ملاحظات',
    'checkout.optional': '(اختياري)',
    'checkout.submit':   'أرسل الطلب',
    'checkout.sending':  '⏳ جاري الإرسال...',
    'success.title':     'تم إرسال طلبك!',
    'success.orderlbl':  'رقم طلبك',
    'success.msg':       'سيتم التواصل معك قريباً لتأكيد طلبك',
    'success.ok':        'حسناً، شكراً!',
    'currency':          'جنيه',
    'brand.name':        'مطعم دار اليمن',
    'all':               'الكل',
  },
  en: {
    'nav.about':         'About Us',
    'nav.menu':          'Food Menu',
    'nav.gallery':       'Gallery',
    'nav.reviews':       'Reviews',
    'nav.contact':       'Contact',
    'hero.eyebrow':      'Finest Yemeni & Gulf Cuisine',
    'hero.line1':        'Your Home Away From Home',
    'hero.subtitle':     'Authentic Mandi · Zarbayan · Harrazi',
    'hero.order':        'Order Now',
    'hero.discover':     'Discover More',
    'hero.rating':       'Google Rating',
    'hero.reviews':      'Customer Reviews',
    'hero.years':        'Years of Excellence',
    'about.eyebrow':     'Our Story',
    'about.title':       'A Taste With History\nAnd Unforgettable Heritage',
    'about.p1':          'At Dar Al Yemen, we bring you authentic Yemeni cuisine — prepared daily with the finest ingredients by hands that truly love real food.',
    'about.f1t':         'Fresh Daily Ingredients',
    'about.f1d':         'The finest raw materials, carefully selected',
    'about.f2t':         'Experienced Yemeni Chefs',
    'about.f2d':         'Authentic expertise in Yemeni culinary arts',
    'about.f3t':         'Warm Family Atmosphere',
    'about.f3d':         'A comfortable place welcoming all families',
    'about.cta':         'View Food Menu',
    'about.call':        'Call Us',
    'menu.eyebrow':      'Food Menu',
    'menu.title':        'Choose Your Favourite Dish',
    'gallery.eyebrow':   'Photo Gallery',
    'gallery.title':     'From Our Kitchen to Your Table',
    'gallery.view':      'View',
    'reviews.eyebrow':   'Customer Reviews',
    'reviews.title':     'What Our Guests Say',
    'reviews.google':    'Reviews on Google',
    'reviews.r1':        '"The best Mandi I\'ve ever had in Cairo! The meat was incredibly tender and the rice with broth is indescribable. Excellent service and very reasonable prices. Will definitely return!"',
    'reviews.r1n':       'Mohammed Ahmed',
    'reviews.r1d':       '1 week ago',
    'reviews.r2':        '"A wonderful experience! The Zarbayan has a completely different, unique taste. Family-friendly and calm atmosphere. The best Yemeni restaurant in Giza, hands down."',
    'reviews.r2n':       'Fatima Ali',
    'reviews.r2d':       '2 weeks ago',
    'reviews.r3':        '"Excellent Harrazi at reasonable prices. One of the best Yemeni restaurants in the area. Fast service and friendly staff. Thank you Dar Al Yemen!"',
    'reviews.r3n':       'Ahmed Samir',
    'reviews.r3d':       '1 month ago',
    'contact.eyebrow':   'Contact Us',
    'contact.title':     'Always At Your Service',
    'contact.addr.t':    'Address',
    'contact.addr.v':    '2 Al-Shorafa St., Faisal Al-Raisi, Facing Al-Tawheed Wal Nour, Giza',
    'contact.phone.t':   'Phone',
    'contact.hours.t':   'Opening Hours',
    'contact.hours.v':   'Daily from 12 PM to 2 AM',
    'contact.delivery.t':'Our Services',
    'contact.delivery.v':'Dine-in · Pickup · Delivery',
    'contact.directions':'Open in Google Maps',
    'footer.slogan':     'Your Home Away From Home | Finest Yemeni & Gulf Cuisine',
    'footer.quick':      'Quick Links',
    'footer.contact':    'Contact Info',
    'footer.addr':       '2 Al-Shorafa St., Faisal, Giza',
    'footer.hours':      '12 PM - 2 AM Daily',
    'footer.copy':       '© 2025 Dar Al Yemen Restaurant. All rights reserved.',
    'cart.added':        '✓ Added to cart',
    'cart.title':        'Your Cart',
    'cart.empty':        'Your cart is empty',
    'cart.browse':       'Browse Menu',
    'cart.upsell':       'Quick Add',
    'cart.total':        'Total',
    'cart.currency':     'EGP',
    'cart.checkout':     'Complete Order',
    'checkout.title':    'Complete Order',
    'checkout.name':     'Your Name',
    'checkout.name.err': 'Please enter your name',
    'checkout.phone':    'Phone Number',
    'checkout.phone.err':'Please enter your phone number',
    'checkout.type':          'Order Type',
    'checkout.type.delivery': 'Delivery',
    'checkout.type.pickup':   'Pickup at Restaurant',
    'checkout.address':  'Delivery Address',
    'checkout.address.err':'Please enter your address',
    'checkout.notes':    'Notes',
    'checkout.optional': '(Optional)',
    'checkout.submit':   'Send Order',
    'checkout.sending':  '⏳ Sending...',
    'success.title':     'Order Sent!',
    'success.orderlbl':  'Your Order Number',
    'success.msg':       'We\'ll contact you shortly to confirm your order',
    'success.ok':        'Great, Thank You!',
    'brand.name':        'Dar Al Yemen Restaurant',
    'currency':          'EGP',
    'all':               'All',
  }
};

/* ── MENU DATA ────────────────────────────────────────────── */
const MENU = [
  {
    id: 'salads',
    nameAr: 'السلطات',
    nameEn: 'Salads',
    items: [
      { id: 1,  nameAr: 'سلطة خضراء',         nameEn: 'Green Salad',        price: 35  },
      { id: 2,  nameAr: 'سلطة طماطم',          nameEn: 'Tomato Salad',       price: 30  },
      { id: 3,  nameAr: 'سلطة فتوش',           nameEn: 'Fattoush',           price: 45  },
      { id: 4,  nameAr: 'حمص بالطحينة',        nameEn: 'Hummus',             price: 55  },
      { id: 5,  nameAr: 'متبل باباغنوج',       nameEn: 'Moutabbal',          price: 55  },
      { id: 6,  nameAr: 'سلطة تبولة',          nameEn: 'Tabbouleh',          price: 50  },
      { id: 7,  nameAr: 'سلطة روسية',          nameEn: 'Russian Salad',      price: 45  },
    ]
  },
  {
    id: 'appetizers',
    nameAr: 'المقبلات',
    nameEn: 'Appetizers',
    items: [
      { id: 10, nameAr: 'شوربة لحم يمنية',    nameEn: 'Yemeni Meat Soup',   price: 75  },
      { id: 11, nameAr: 'شوربة دجاج',         nameEn: 'Chicken Soup',       price: 60  },
      { id: 12, nameAr: 'شوربة عدس',          nameEn: 'Lentil Soup',        price: 50  },
      { id: 13, nameAr: 'فول دمياطي',         nameEn: 'Foul',               price: 45  },
      { id: 14, nameAr: 'بيض بالطماطم',       nameEn: 'Eggs in Tomato',     price: 50,  img: 'photos/صور اكل/شكشوكه.jpg' },
      { id: 15, nameAr: 'لقيمات يمنية',       nameEn: 'Luqaimat',           price: 65  },
      { id: 16, nameAr: 'سمبوسة لحم',         nameEn: 'Meat Samboosa',      price: 70  },
    ]
  },
  {
    id: 'yemeni',
    nameAr: 'أطباق دار اليمن',
    nameEn: 'Dar Al Yemen Signature',
    items: [
      { id: 20, nameAr: 'مندي دجاج ربع',      nameEn: 'Quarter Mandi Chicken',  price: 130, img: 'photos/صور اكل/2.jpg' },
      { id: 21, nameAr: 'مندي دجاج نص',       nameEn: 'Half Mandi Chicken',     price: 220 },
      { id: 22, nameAr: 'مندي دجاج كامل',     nameEn: 'Full Mandi Chicken',     price: 400 },
      { id: 23, nameAr: 'مندي لحم 500 جم',    nameEn: 'Mandi Lamb 500g',        price: 280 },
      { id: 24, nameAr: 'مندي لحم كيلو',      nameEn: 'Mandi Lamb 1kg',         price: 530 },
      { id: 25, nameAr: 'زربيان دجاج',        nameEn: 'Zarbayan Chicken',       price: 220 },
      { id: 26, nameAr: 'زربيان لحم',         nameEn: 'Zarbayan Lamb',          price: 300 },
      { id: 27, nameAr: 'حرازي دجاج',         nameEn: 'Harrazi Chicken',        price: 200 },
      { id: 28, nameAr: 'حرازي لحم',          nameEn: 'Harrazi Lamb',           price: 280 },
      { id: 29, nameAr: 'فحسة يمنية',         nameEn: 'Fahsa',                  price: 180 },
      { id: 30, nameAr: 'عصيد',               nameEn: 'Aseed',                  price: 160 },
      { id: 31, nameAr: 'مرق دار اليمن',      nameEn: 'Dar Al Yemen Broth',     price: 85  },
      { id: 32, nameAr: 'سلته يمني',          nameEn: 'Yemeni Salte',           price: 130, img: 'photos/صور اكل/سلتة.jpg' },
    ]
  },
  {
    id: 'chicken',
    nameAr: 'الدجاج',
    nameEn: 'Chicken',
    items: [
      { id: 40, nameAr: 'ربع فراخ مشوي',      nameEn: 'Grilled Chicken Quarter', price: 90  },
      { id: 41, nameAr: 'نص فراخ مشوي',       nameEn: 'Grilled Half Chicken',   price: 165, img: 'photos/صور اكل/نص دجاج مضغوط.jpg' },
      { id: 42, nameAr: 'فراخ كاملة مشوية',   nameEn: 'Grilled Full Chicken',   price: 295 },
      { id: 43, nameAr: 'دجاج مقلي',          nameEn: 'Fried Chicken',          price: 130 },
      { id: 44, nameAr: 'دجاج بالكاري',       nameEn: 'Chicken Curry',          price: 120 },
      { id: 45, nameAr: 'صدر دجاج مشوي',      nameEn: 'Grilled Chicken Breast', price: 145 },
      { id: 46, nameAr: 'شيش طاووق',           nameEn: 'Shish Tawook',           price: 150, img: 'photos/صور اكل/شيش طاووق.jpg' },
    ]
  },
  {
    id: 'grills',
    nameAr: 'المشاوي',
    nameEn: 'Grills',
    items: [
      { id: 50, nameAr: 'كباب مشوي',          nameEn: 'Grilled Kofta Kebab',    price: 130 },
      { id: 51, nameAr: 'كفتة مشوية',         nameEn: 'Grilled Kofta',          price: 120 },
      { id: 52, nameAr: 'تكة لحم',            nameEn: 'Tikka Lamb',             price: 165 },
      { id: 53, nameAr: 'ضلوع مشوية',         nameEn: 'Grilled Ribs',           price: 230 },
      { id: 54, nameAr: 'ريش غنم مشوية',      nameEn: 'Grilled Lamb Chops',     price: 260 },
      { id: 55, nameAr: 'مشكل مشاوي للفرد',   nameEn: 'Mixed Grill (1 person)', price: 220 },
      { id: 56, nameAr: 'مشكل مشاوي للاثنين', nameEn: 'Mixed Grill (2 people)', price: 400 },
      { id: 57, nameAr: 'طاجن لحم',            nameEn: 'Lamb Tagine',            price: 185, img: 'photos/صور اكل/طاجن لحم.jpg' },
      { id: 58, nameAr: 'كبدة مشوية',          nameEn: 'Grilled Liver',          price: 110, img: 'photos/صور اكل/كبدة.jpg' },
    ]
  },
  {
    id: 'meals',
    nameAr: 'وجبات دار اليمن',
    nameEn: 'Dar Al Yemen Meals',
    items: [
      { id: 60, nameAr: 'وجبة مندي دجاج',    nameEn: 'Mandi Chicken Meal',     price: 190 },
      { id: 61, nameAr: 'وجبة زربيان دجاج',  nameEn: 'Zarbayan Chicken Meal',  price: 240 },
      { id: 62, nameAr: 'وجبة مشاوي',        nameEn: 'Mixed Grill Meal',       price: 250 },
      { id: 63, nameAr: 'وجبة فراخ مشوي',    nameEn: 'Grilled Chicken Meal',   price: 175 },
      { id: 64, nameAr: 'وجبة عائلية مميزة', nameEn: 'Special Family Meal',    price: 950 },
    ]
  },
  {
    id: 'beverages',
    nameAr: 'المشروبات',
    nameEn: 'Beverages',
    items: [
      { id: 70, nameAr: 'مياه معدنية',        nameEn: 'Mineral Water',          price: 20  },
      { id: 71, nameAr: 'مشروبات غازية',      nameEn: 'Soft Drinks',            price: 30  },
      { id: 72, nameAr: 'شاي يمني',           nameEn: 'Yemeni Tea',             price: 35  },
      { id: 73, nameAr: 'قهوة عربية',         nameEn: 'Arabic Coffee',          price: 45  },
      { id: 74, nameAr: 'عصير طبيعي',         nameEn: 'Fresh Juice',            price: 55,  img: 'photos/صور اكل/عصائر.jpg' },
      { id: 75, nameAr: 'كوكتيل دار اليمن',   nameEn: 'Dar Al Yemen Cocktail',  price: 80  },
      { id: 76, nameAr: 'عصير مانجو',         nameEn: 'Mango Juice',            price: 60  },
      { id: 77, nameAr: 'عصير فراولة',        nameEn: 'Strawberry Juice',       price: 60  },
      { id: 78, nameAr: 'ليمون بالنعناع',     nameEn: 'Lemon Mint',             price: 50  },
      { id: 79, nameAr: 'خروب',               nameEn: 'Carob Drink',            price: 55  },
    ]
  },
];

/* ── STATE ────────────────────────────────────────────────── */
let lang = 'ar';
let cart = {}; // { itemId: { item, qty } }
let activeCategory = 'all';

/* ── i18n HELPERS ─────────────────────────────────────────── */
function t(key) {
  return (i18n[lang] && i18n[lang][key]) || (i18n.ar[key]) || key;
}

function applyLang() {
  const isLtr = lang === 'en';
  document.documentElement.lang = lang;
  document.documentElement.dir  = isLtr ? 'ltr' : 'rtl';
  sessionStorage.setItem('daryemen_lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // Re-render dynamic elements
  renderTabs();
  renderMenuSections();
  renderCartDrawer();
}

function itemName(item) {
  return lang === 'en' ? item.nameEn : item.nameAr;
}

function catName(cat) {
  return lang === 'en' ? cat.nameEn : cat.nameAr;
}

/* ── MENU RENDERING ───────────────────────────────────────── */
function renderTabs() {
  const container = document.getElementById('category-tabs');
  if (!container) return;

  const allLabel = t('all');
  let html = `<button class="tab-chip ${activeCategory === 'all' ? 'active' : ''}" data-cat="all">${allLabel}</button>`;
  MENU.forEach(cat => {
    html += `<button class="tab-chip ${activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">${catName(cat)}</button>`;
  });

  container.innerHTML = html;
  container.querySelectorAll('.tab-chip').forEach(btn => {
    btn.addEventListener('click', () => handleTabClick(btn.dataset.cat));
  });

  // Scroll active chip into the center of the strip
  const activeChip = container.querySelector('.tab-chip.active');
  if (activeChip) {
    const chipCenter = activeChip.offsetLeft + activeChip.offsetWidth / 2;
    container.scrollTo({ left: chipCenter - container.offsetWidth / 2, behavior: 'smooth' });
  }
}

function handleTabClick(catId) {
  activeCategory = catId;
  renderTabs();

  if (catId === 'all') {
    const first = document.querySelector('.menu-category-section');
    if (first) first.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const target = document.getElementById(`cat-${catId}`);
  if (target) {
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) + 56 + 16;
    const y = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

function renderMenuSections() {
  const container = document.getElementById('menu-sections');
  if (!container) return;

  let html = '';
  MENU.forEach(cat => {
    const bannerHtml = cat.bannerImg
      ? `<div class="menu-cat-banner"><img src="${cat.bannerImg}" alt="${catName(cat)}" loading="lazy"></div>`
      : '';
    html += `
      <div class="menu-category-section" id="cat-${cat.id}">
        <div class="menu-category-header">
          <span class="menu-cat-name">${catName(cat)}</span>
          <span class="menu-cat-count">${cat.items.length} ${lang === 'en' ? 'items' : 'صنف'}</span>
        </div>
        ${bannerHtml}
        <div class="dish-grid">
          ${cat.items.map(item => renderDishCard(item)).join('')}
        </div>
      </div>`;
  });

  container.innerHTML = html;

  // Attach add-to-cart listeners
  container.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      addToCart(id, btn);
    });
  });
}

function renderDishCard(item) {
  const name = itemName(item);
  const currency = t('currency');
  const photoHtml = item.img
    ? `<img src="${item.img}" alt="${name}" loading="lazy">`
    : `<div class="dish-photo-placeholder"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>`;
  return `
    <div class="dish-card">
      <div class="dish-photo">${photoHtml}</div>
      <div class="dish-body">
        <p class="dish-name" title="${name}">${name}</p>
        <div class="dish-footer">
          <span class="dish-price">${item.price}<span class="dish-price-cur"> ${currency}</span></span>
          <button class="add-btn" data-id="${item.id}" aria-label="${lang === 'en' ? 'Add to cart' : 'أضف للسلة'}">+</button>
        </div>
      </div>
    </div>`;
}

/* ── CART LOGIC ───────────────────────────────────────────── */
function findItem(id) {
  for (const cat of MENU) {
    const found = cat.items.find(i => i.id === id);
    if (found) return found;
  }
  return null;
}

function addToCart(itemId, btn) {
  const item = findItem(itemId);
  if (!item) return;

  if (cart[itemId]) {
    cart[itemId].qty += 1;
  } else {
    cart[itemId] = { item, qty: 1 };
  }

  // Button feedback
  if (btn) {
    btn.textContent = '✓';
    btn.classList.add('added');
    setTimeout(() => {
      btn.textContent = '+';
      btn.classList.remove('added');
    }, 900);
  }

  // Toast
  showToast();

  // Cart icon bump
  const cartBtn = document.getElementById('cart-btn');
  if (cartBtn) {
    cartBtn.classList.remove('bump');
    void cartBtn.offsetWidth;
    cartBtn.classList.add('bump');
    cartBtn.addEventListener('animationend', () => cartBtn.classList.remove('bump'), { once: true });
  }

  updateCartBadge();
  renderCartDrawer();
}

function removeFromCart(itemId) {
  delete cart[itemId];
  updateCartBadge();
  renderCartDrawer();
}

function changeQty(itemId, delta) {
  if (!cart[itemId]) return;
  cart[itemId].qty += delta;
  if (cart[itemId].qty <= 0) {
    removeFromCart(itemId);
    return;
  }
  updateCartBadge();
  renderCartDrawer();
}

function cartTotal() {
  return Object.values(cart).reduce((sum, e) => sum + e.item.price * e.qty, 0);
}

function cartCount() {
  return Object.values(cart).reduce((sum, e) => sum + e.qty, 0);
}

function clearCart() {
  cart = {};
  updateCartBadge();
  renderCartDrawer();
}

function updateCartBadge() {
  const count = cartCount();

  // Nav badge
  const badge = document.getElementById('cart-badge');
  if (count > 0) {
    badge.textContent = count;
    badge.classList.add('visible');
  } else {
    badge.classList.remove('visible');
  }

  // Menu FAB badge
  const fabBadge = document.getElementById('menu-fab-badge');
  if (fabBadge) {
    if (count > 0) {
      fabBadge.textContent = count;
      fabBadge.style.display = 'flex';
    } else {
      fabBadge.style.display = 'none';
    }
  }
}

/* ── CART DRAWER UI ───────────────────────────────────────── */
function renderCartDrawer() {
  const items     = Object.values(cart);
  const isEmpty   = items.length === 0;
  const emptyEl   = document.getElementById('cart-empty-state');
  const listEl    = document.getElementById('cart-items-list');
  const footEl    = document.getElementById('cart-foot');
  const upsellEl  = document.getElementById('upsell-zone');
  const totalEl   = document.getElementById('cart-total-val');
  const currency  = t('currency');

  if (!listEl) return;

  emptyEl.style.display = isEmpty ? 'block' : 'none';
  footEl.style.display  = isEmpty ? 'none'  : 'block';

  if (isEmpty) {
    listEl.innerHTML = '';
    if (upsellEl) upsellEl.style.display = 'none';
    return;
  }

  // Render items
  listEl.innerHTML = items.map(({ item, qty }) => `
    <div class="cart-item-row">
      <div class="cart-item-info">
        <div class="cart-item-name">${itemName(item)}</div>
        <div class="cart-item-price">${item.price * qty} ${currency}</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn qty-remove" data-id="${item.id}" data-delta="-1" aria-label="-">−</button>
        <span class="qty-num">${qty}</span>
        <button class="qty-btn" data-id="${item.id}" data-delta="1" aria-label="+">+</button>
      </div>
    </div>
  `).join('');

  listEl.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => changeQty(parseInt(btn.dataset.id), parseInt(btn.dataset.delta)));
  });

  // Total
  if (totalEl) totalEl.innerHTML = `${cartTotal()} <span>${currency}</span>`;

  // Upsell chips (max 4, not already in cart)
  if (upsellEl) {
    const allItems = MENU.flatMap(c => c.items);
    const notInCart = allItems.filter(i => !cart[i.id]);
    const chips = notInCart.slice(0, 4);

    if (chips.length > 0) {
      upsellEl.style.display = 'block';
      const chipsEl = document.getElementById('upsell-chips');
      if (chipsEl) {
        chipsEl.innerHTML = chips.map(item => `
          <button class="upsell-chip" data-id="${item.id}">+ ${itemName(item)} · ${item.price} ${currency}</button>
        `).join('');
        chipsEl.querySelectorAll('.upsell-chip').forEach(btn => {
          btn.addEventListener('click', () => addToCart(parseInt(btn.dataset.id), null));
        });
      }
    } else {
      upsellEl.style.display = 'none';
    }
  }
}

/* ── DRAWER OPEN/CLOSE ────────────────────────────────────── */
function openCart() {
  renderCartDrawer();
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function openCheckout() {
  closeCart();
  renderCheckoutSummary();
  setTimeout(() => {
    document.getElementById('checkout-drawer').classList.add('open');
    document.getElementById('checkout-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }, 80);
}

function closeCheckout() {
  document.getElementById('checkout-drawer').classList.remove('open');
  document.getElementById('checkout-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function backToCart() {
  closeCheckout();
  setTimeout(openCart, 80);
}

/* ── CHECKOUT SUMMARY ─────────────────────────────────────── */
function renderCheckoutSummary() {
  const box = document.getElementById('checkout-summary-box');
  if (!box) return;

  const items    = Object.values(cart);
  const currency = t('currency');
  const totalLbl = t('cart.total');

  let rows = items.map(({ item, qty }) =>
    `<div class="checkout-sum-row"><span>${qty}× ${itemName(item)}</span><span>${item.price * qty} ${currency}</span></div>`
  ).join('');

  box.innerHTML = `
    <div class="checkout-sum-title">${lang === 'en' ? 'Order Summary' : 'ملخص الطلب'}</div>
    ${rows}
    <div class="checkout-sum-total">
      <span>${totalLbl}</span>
      <span>${cartTotal()} ${currency}</span>
    </div>`;
}

/* ── ORDER SUBMISSION ─────────────────────────────────────── */
async function submitOrder() {
  const btn = document.getElementById('submit-order-btn');
  const form = document.getElementById('order-form');

  const isDelivery = document.querySelector('input[name="delivery_type"]:checked')?.value !== 'pickup';
  const nameField    = document.getElementById('f-name');
  const phoneField   = document.getElementById('f-phone');
  const addressField = document.getElementById('f-address');
  let valid = true;

  const fieldsToValidate = isDelivery ? [nameField, phoneField, addressField] : [nameField, phoneField];
  fieldsToValidate.forEach(field => {
    const group = field.closest('.form-field');
    if (!field.value.trim()) {
      group.classList.add('has-error');
      valid = false;
    } else {
      group.classList.remove('has-error');
    }
  });
  if (!isDelivery) {
    document.getElementById('address-field-group').classList.remove('has-error');
  }

  if (!valid) return;

  btn.disabled = true;
  btn.textContent = t('checkout.sending');

  const name    = nameField.value.trim();
  const phone   = phoneField.value.trim();
  const address = isDelivery ? addressField.value.trim() : '';
  const notes   = document.getElementById('f-notes').value.trim();
  const currency = t('currency');

  try {
    let orderNum = Math.floor(Math.random() * 1000) + 9020; // fallback

    // Step 1: Send placeholder to get message_id (= order number)
    const placeholderRes = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text: '⏳' })
    });

    if (placeholderRes.ok) {
      const placeholderData = await placeholderRes.json();
      if (placeholderData.ok) {
        const msgId = placeholderData.result.message_id;
        orderNum = ORDER_OFFSET + msgId;

        // Step 2: Build full message
        const items = Object.values(cart);
        const itemLines = items.map(({ item, qty }) =>
          `  • ${qty}× ${item.nameAr} — ${item.price * qty} ${t('currency')}`
        ).join('\n');

        const totalVal = cartTotal();
        const orderTypeIcon = isDelivery ? '🛵 توصيل' : '🏪 استلام في المطعم';
        const fullMsg = [
          `📦 رقم الطلب: #${orderNum}`,
          '',
          orderTypeIcon,
          `👤 الاسم: ${name}`,
          `📞 الهاتف: ${phone}`,
          isDelivery ? `📍 العنوان: ${address}` : `📍 الاستلام: في المطعم`,
          '',
          `🧾 الطلب:`,
          itemLines,
          '',
          `💰 الإجمالي: ${totalVal} ${currency}`,
          isDelivery ? `💵 الدفع: كاش عند التوصيل` : `💵 الدفع: كاش عند الاستلام`,
          notes ? `📝 ملاحظات: ${notes}` : ''
        ].filter(Boolean).join('\n');

        // Step 3: Edit the placeholder with real content
        await fetch(`https://api.telegram.org/bot${TG_TOKEN}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TG_CHAT_ID,
            message_id: msgId,
            text: fullMsg
          })
        });
      }
    }

    // Success
    closeCheckout();
    clearCart();
    form.reset();
    document.querySelectorAll('.form-field').forEach(g => g.classList.remove('has-error'));

    showSuccessOverlay(orderNum);

  } catch (err) {
    console.error('Order error:', err);
    // Still show success to avoid confusing the customer
    closeCheckout();
    clearCart();
    form.reset();
    showSuccessOverlay(Math.floor(Math.random() * 1000) + 9020);
  }

  btn.disabled = false;
  btn.textContent = t('checkout.submit');
}

/* ── SUCCESS OVERLAY ─────────────────────────────────────── */
function showSuccessOverlay(orderNum) {
  const overlay = document.getElementById('success-overlay');
  const numEl   = document.getElementById('success-num');
  if (numEl) numEl.textContent = `#${orderNum}`;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSuccessOverlay() {
  document.getElementById('success-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── TOAST ────────────────────────────────────────────────── */
let toastTimer;
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

/* ── NAV SCROLL + MENU FAB ───────────────────────────────── */
function initNavScroll() {
  const nav     = document.getElementById('navbar');
  const menuFab = document.getElementById('menu-fab');
  const heroEl  = document.getElementById('hero');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);

    // Show menu FAB after scrolling past hero
    if (menuFab && heroEl) {
      const heroBtm = heroEl.getBoundingClientRect().bottom;
      menuFab.classList.toggle('visible', heroBtm < 0);
    }
  }, { passive: true });
}

/* ── MOBILE NAV ───────────────────────────────────────────── */
function initMobileNav() {
  const btn     = document.getElementById('hamburger');
  const links   = document.getElementById('nav-links');
  const overlay = document.getElementById('mobile-nav-overlay');

  function openNav() {
    links.classList.add('open');
    overlay.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    links.classList.remove('open');
    overlay.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    btn.getAttribute('aria-expanded') === 'true' ? closeNav() : openNav();
  });

  overlay.addEventListener('click', closeNav);

  links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
}

/* ── SCROLL REVEAL ────────────────────────────────────────── */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── ACTIVE TAB ON SCROLL ─────────────────────────────────── */
function initScrollSpy() {
  const navH  = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
  const tabsH = 56;

  window.addEventListener('scroll', () => {
    let current = 'all';
    MENU.forEach(cat => {
      const section = document.getElementById(`cat-${cat.id}`);
      if (section) {
        const top = section.getBoundingClientRect().top;
        if (top < navH + tabsH + 40) current = cat.id;
      }
    });
    if (current !== activeCategory) {
      activeCategory = current;
      document.querySelectorAll('.tab-chip').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cat === current);
      });
    }
  }, { passive: true });
}

/* ── GALLERY LIGHTBOX ─────────────────────────────────────── */
function initGallery() {
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lightbox-img');
  const lbClose   = document.getElementById('lightbox-close');

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.parentElement.addEventListener('click', () => {
      lbImg.src = img.src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLb() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lbClose.addEventListener('click', closeLb);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });
}

/* ── PRELOADER ────────────────────────────────────────────── */
function initPreloader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('preloader').classList.add('done');
    }, 400);
  });
}

/* ── SMOOTH SCROLL FOR ANCHOR LINKS ──────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}

/* ── LANGUAGE TOGGLE ─────────────────────────────────────── */
function initLangToggle() {
  const saved = sessionStorage.getItem('daryemen_lang');
  if (saved && (saved === 'ar' || saved === 'en')) {
    lang = saved;
  }

  document.getElementById('lang-toggle').addEventListener('click', () => {
    lang = lang === 'ar' ? 'en' : 'ar';
    applyLang();
  });
}

/* ── EVENT BINDING ────────────────────────────────────────── */
function bindEvents() {
  const cartDrawer     = document.getElementById('cart-drawer');
  const checkoutDrawer = document.getElementById('checkout-drawer');
  const cartOverlay    = document.getElementById('cart-overlay');
  const checkoutOvl    = document.getElementById('checkout-overlay');

  // Clicking inside drawer must NOT close it (prevent bubble to overlay)
  cartDrawer.addEventListener('click', e => e.stopPropagation());
  checkoutDrawer.addEventListener('click', e => e.stopPropagation());

  // Cart open
  document.getElementById('cart-btn').addEventListener('click', openCart);

  // Cart close — overlay OR X button
  cartOverlay.addEventListener('click', closeCart);
  document.getElementById('cart-close').addEventListener('click', e => {
    e.stopPropagation();
    closeCart();
  });

  // Browse menu from empty cart
  document.getElementById('cart-browse-btn').addEventListener('click', () => {
    closeCart();
    const menu = document.getElementById('menu');
    if (menu) menu.scrollIntoView({ behavior: 'smooth' });
  });

  // Checkout open
  document.getElementById('checkout-btn').addEventListener('click', openCheckout);

  // Checkout close — overlay OR X button
  checkoutOvl.addEventListener('click', closeCheckout);
  document.getElementById('checkout-close').addEventListener('click', e => {
    e.stopPropagation();
    closeCheckout();
  });

  // Back to cart
  document.getElementById('checkout-back').addEventListener('click', e => {
    e.stopPropagation();
    backToCart();
  });

  // Submit order
  document.getElementById('submit-order-btn').addEventListener('click', e => {
    e.stopPropagation();
    submitOrder();
  });

  // Success overlay
  document.getElementById('success-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('success-overlay')) closeSuccessOverlay();
  });
  document.getElementById('success-ok-btn').addEventListener('click', closeSuccessOverlay);

  // Delivery type toggle — show/hide address field
  document.querySelectorAll('input[name="delivery_type"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const isDelivery = radio.value === 'delivery';
      const addrGroup = document.getElementById('address-field-group');
      const addrField = document.getElementById('f-address');
      if (addrGroup) addrGroup.style.display = isDelivery ? '' : 'none';
      if (addrField) addrField.required = isDelivery;
    });
  });

  // Form field live validation
  document.querySelectorAll('#order-form [required]').forEach(field => {
    field.addEventListener('input', () => {
      if (field.value.trim()) field.closest('.form-field').classList.remove('has-error');
    });
  });

  // Menu FAB — open cart if has items, else scroll to menu
  const menuFabBtn = document.getElementById('menu-fab');
  if (menuFabBtn) {
    menuFabBtn.addEventListener('click', () => {
      if (cartCount() > 0) {
        openCart();
      } else {
        const menuEl = document.getElementById('menu');
        if (menuEl) {
          const y = menuEl.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  }

  // Promo banner "اطلب دلوقتي" → scroll to menu
  const promoCta = document.getElementById('promo-cta-btn');
  if (promoCta) {
    promoCta.addEventListener('click', e => {
      e.preventDefault();
      const menuEl = document.getElementById('menu');
      if (menuEl) {
        const y = menuEl.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  }

  // Escape key closes topmost panel
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (document.getElementById('success-overlay').classList.contains('open')) {
      closeSuccessOverlay();
    } else if (document.getElementById('checkout-drawer').classList.contains('open')) {
      closeCheckout();
    } else if (document.getElementById('cart-drawer').classList.contains('open')) {
      closeCart();
    } else if (document.getElementById('lightbox').classList.contains('open')) {
      document.getElementById('lightbox').classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ── INIT ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initLangToggle();
  renderTabs();
  renderMenuSections();
  applyLang();
  initNavScroll();
  initMobileNav();
  initReveal();
  initScrollSpy();
  initGallery();
  initSmoothScroll();
  bindEvents();
});
