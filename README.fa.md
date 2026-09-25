<p align="center">
  🇮🇷 <strong>فارسی</strong> | 🇺🇸 <a href="./README.md">English</a>
</p>

<h1 align="center">🏆 سامانه ثبت‌نام مسابقه</h1>

<p align="center">
  <img src="./assest/screenshots/hero.png" alt="پیش‌نمایش سامانه ثبت‌نام مسابقه" width="100%">
</p>

<p align="center">
  یک وب‌اپلیکیشن ریسپانسیو برای ثبت‌نام مسابقه که با HTML، Tailwind CSS و Vanilla JavaScript ساخته شده است.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML-5-E34F26?style=flat-square&logo=html5&logoColor=orange">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=bluesky">
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=yellow">
  <img src="https://img.shields.io/badge/Responsive-Yes-22C55E?style=flat-square">
</p>

<p align="center">
  <a href="YOUR_GITHUB_PAGES_URL">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit-success?style=for-the-badge">
  </a>
</p>

---

## 📖 توضیحات

Competition Registration App یک پروژه فرانت‌اند ریسپانسیو است که با هدف شبیه‌سازی یک سامانه ثبت‌نام مسابقه ساخته شده است.

کاربران می‌توانند شرکت‌کنندگان را ثبت کنند، بین شرکت‌کنندگان جستجو کنند، افراد را به‌صورت جداگانه حذف کنند، تمام ثبت‌نام‌ها را پاک کنند و اطلاعات شرکت‌کنندگان را به‌صورت فایل JSON خروجی بگیرند.

این پروژه به‌عنوان بخشی از تمرین‌های توسعه فرانت‌اند من ساخته شده و تمرکز آن روی منطق JavaScript، کار با DOM، اعتبارسنجی فرم، ذخیره‌سازی در مرورگر، مدیریت رویدادها و طراحی ریسپانسیو بوده است.

---

## ✨ قابلیت‌ها

- 📝 ثبت‌نام شرکت‌کنندگان
- ✅ اعتبارسنجی فرم
- 🔞 حداقل سن ۱۸ سال
- 🔎 جستجوی شرکت‌کنندگان بر اساس نام یا ایمیل
- 🗑️ حذف شرکت‌کنندگان به‌صورت جداگانه
- 🧹 حذف تمام شرکت‌کنندگان
- 💾 ذخیره دائمی اطلاعات با LocalStorage
- 🔢 نمایش لحظه‌ای تعداد شرکت‌کنندگان
- 📦 خروجی گرفتن اطلاعات شرکت‌کنندگان به‌صورت JSON
- 📱 طراحی کاملاً ریسپانسیو
- 🎨 رابط کاربری مدرن با تم تاریک
- ⚡ سبک و کاملاً Client-Side

---

## 🚀 نحوه اجرای پروژه

### ۱. دریافت Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### ۲. ورود به پوشه پروژه

```bash
cd competition-registration-app
```

### ۳. نصب وابستگی‌ها

```bash
npm install
```

### ۴. اجرای Tailwind CSS

```bash
npm run dev
```

این دستور Tailwind CSS را در حالت Watch اجرا می‌کند و فایل CSS کامپایل‌شده را به‌صورت خودکار تولید می‌کند.

### ۵. اجرای پروژه

فایل `index.html` را با استفاده از یک Local Development Server مانند **Live Server** باز کنید.

---

## 🛠 تکنولوژی‌های استفاده‌شده

<p>
  <img src="https://img.shields.io/badge/HTML-5-E34F26?style=for-the-badge&logo=html5&logoColor=orange">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=bluesky">
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=yellow">
</p>

### Web APIهای استفاده‌شده

- LocalStorage
- Blob API
- URL.createObjectURL()
- DOM API
- Form Validation API

---

## 🧠 مفاهیم JavaScript تمرین‌شده

این پروژه به من کمک کرد چندین مفهوم JavaScript را در یک پروژه واقعی تمرین و استفاده کنم:

- کار با DOM
- Event Listenerها
- Event Delegation
- مدیریت Eventها
- متدهای آرایه مانند `forEach()`، `filter()` و `splice()`
- Objects و Arrays
- Functions و Parameters
- Template Literals
- JSON Serialization و Parsing
- `localStorage`
- Form Validation
- `dataset`
- `insertAdjacentHTML()`
- Browser APIs
- Dynamic UI Rendering
- منطق جستجو و فیلتر کردن

---

## 💾 ذخیره‌سازی اطلاعات

اطلاعات شرکت‌کنندگان با استفاده از `localStorage` در مرورگر ذخیره می‌شوند.

به همین دلیل، شرکت‌کنندگان ثبت‌شده حتی پس از Refresh کردن یا باز کردن مجدد صفحه در همان مرورگر باقی می‌مانند.

آرایه شرکت‌کنندگان با استفاده از `JSON.stringify()` به JSON تبدیل و با استفاده از `JSON.parse()` بازیابی می‌شود.

---

## 🔍 جستجو

این برنامه امکان جستجوی لحظه‌ای بین شرکت‌کنندگان را فراهم می‌کند.

کاربر می‌تواند بر اساس موارد زیر جستجو کند:

- نام شرکت‌کننده
- آدرس ایمیل

برای انجام جستجو از متد `filter()` در JavaScript استفاده شده تا فقط شرکت‌کنندگانی که با عبارت جستجو مطابقت دارند نمایش داده شوند.

---

## ✅ اعتبارسنجی فرم

فرم ثبت‌نام شامل اعتبارسنجی سمت کاربر برای موارد زیر است:

- فیلدهای ضروری
- نام کامل
- فرمت ایمیل
- سن
- رشته مسابقه

فقط شرکت‌کنندگانی که **۱۸ سال یا بیشتر** داشته باشند می‌توانند ثبت‌نام کنند.

سیستم اعتبارسنجی همچنین از ایجاد و باقی ماندن چند پیام خطای غیرضروری روی فرم جلوگیری می‌کند.

---

## 📦 خروجی JSON

اطلاعات شرکت‌کنندگان ثبت‌شده را می‌توان به‌صورت یک فایل JSON خروجی گرفت.

برنامه از `Blob` API و Object URLهای موقت مرورگر استفاده می‌کند تا فایل JSON را مستقیماً در سمت کاربر ایجاد و دانلود کند.

برای این قابلیت نیازی به Backend Server وجود ندارد.

---

## 📱 طراحی ریسپانسیو

رابط کاربری کاملاً ریسپانسیو است و با اندازه‌های مختلف صفحه‌نمایش سازگار می‌شود.

| دستگاه             | وضعیت |
| :----------------- | :---: |
| 🖥️ دسکتاپ بزرگ     |  ✅   |
| 💻 دسکتاپ و لپ‌تاپ |  ✅   |
| 📟 تبلت            |  ✅   |
| 📱 موبایل          |  ✅   |

---

## 📂 ساختار پروژه

```text
📦 competition-registration-app/

├── .vscode/
│   └── tasks.json
├── assets/
│   └── screenshots/
│       └── hero.png
├── js/
│   └── script.js
├── src/
│   ├── input.css
│   └── output.css
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.fa.md
└── README.md
```

---

## 🌐 دموی آنلاین

این پروژه با استفاده از **GitHub Pages** منتشر خواهد شد.

پس از فعال‌سازی GitHub Pages، دموی آنلاین پروژه از اینجا در دسترس خواهد بود:

**YOUR_GITHUB_PAGES_URL**

---

## 👨‍💻 سازنده

**کوروش پیرفلک**

Front-End Developer in Progress

---

⭐ اگر این پروژه برایتان جالب یا مفید بود، می‌توانید با دادن Star از آن حمایت کنید!
