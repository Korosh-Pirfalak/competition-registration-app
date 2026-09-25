// ========================================
// DOM ELEMENTS
// ========================================

const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const trackInput = document.getElementById("track");
const registrationForm = document.getElementById("registration-form");
const clearAllBtn = document.getElementById("clear-all-btn");
const participantsList = document.getElementById("participants-list");
const participantsCount = document.getElementById("participants-count");
const searchInput = document.getElementById("search-input");
const exportJsonBtn = document.getElementById("export-json-btn");

// ========================================
// DATA
// ========================================

// اطلاعات شرکت‌کنندگان را از Local Storage می‌خوانیم.
// اگر اطلاعاتی وجود نداشته باشد، یک آرایه خالی ایجاد می‌کنیم.
const participants = JSON.parse(localStorage.getItem("participants")) || [];

// ========================================
// EVENT LISTENERS
// ========================================

// ثبت فرم
registrationForm.addEventListener("submit", register);

// اجرای اولیه برنامه بعد از آماده شدن DOM
document.addEventListener("DOMContentLoaded", initializeParticipants);

// پاک کردن تمام شرکت‌کنندگان
clearAllBtn.addEventListener("click", clearAllParticipants);

// جستجو هنگام تایپ
searchInput.addEventListener("input", searchParticipants);

// خروجی گرفتن از اطلاعات به صورت JSON
exportJsonBtn.addEventListener("click", exportParticipantsAsJson);

// به جای ساختن Event Listener برای دکمه حذف هر کارت،
// یک Listener روی والد کارت‌ها قرار می‌دهیم.
participantsList.addEventListener("click", handleParticipantListClick);

// ========================================
// REGISTRATION
// ========================================

function register(event) {
  // جلوگیری از ارسال پیش‌فرض فرم و Refresh شدن صفحه
  event.preventDefault();

  // در هر بار ثبت، خطاهای قبلی را پاک می‌کنیم
  // تا چند پیام خطا همزمان نمایش داده نشود.
  clearValidationErrors();

  // دریافت و تمیز کردن اطلاعات ورودی کاربر
  const fullNameValue = fullNameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const ageValue = Number(ageInput.value);
  const trackValue = trackInput.value;

  // ------------------------------------
  // VALIDATION
  // ------------------------------------

  const fieldsAreValid = validateRequiredFields(
    fullNameValue,
    emailValue,
    ageInput.value,
    trackValue,
  );

  if (!fieldsAreValid) {
    return;
  }

  const fullNameIsValid = validateFullName(fullNameValue);

  if (!fullNameIsValid) {
    return;
  }

  const ageIsValid = validateAge(ageValue);

  if (!ageIsValid) {
    return;
  }

  const emailIsValid = validateEmail();

  if (!emailIsValid) {
    return;
  }

  // ------------------------------------
  // CREATE PARTICIPANT
  // ------------------------------------

  const participant = {
    fullName: fullNameValue,
    email: emailValue,
    age: ageValue,
    track: trackValue,
  };

  // اضافه کردن شرکت‌کننده به آرایه
  participants.push(participant);

  // ذخیره آخرین وضعیت آرایه در Local Storage
  saveParticipants();

  // به‌روزرسانی تعداد شرکت‌کنندگان
  updateParticipantsCount();

  // نمایش کارت شرکت‌کننده جدید
  renderParticipantCard(participant);

  // پاک کردن تمام ورودی‌های فرم
  registrationForm.reset();
}

// ========================================
// INITIALIZATION
// ========================================

function initializeParticipants() {
  // هنگام باز شدن صفحه، اطلاعات ذخیره‌شده را دوباره نمایش می‌دهیم.
  participants.forEach((participant) => {
    renderParticipantCard(participant);
  });

  // نمایش تعداد شرکت‌کنندگان
  updateParticipantsCount();
}

// ========================================
// PARTICIPANT CARD
// ========================================

function renderParticipantCard(
  participant,
  index = participants.indexOf(participant),
) {
  participantsList.insertAdjacentHTML(
    "beforeend",
    `
      <div
        class="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-800/50 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5"
        data-index="${index}"
      >
        <div class="flex min-w-0 gap-4 sm:gap-5">
          <div
            class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cyan-950 text-2xl font-bold sm:h-20 sm:w-20 sm:text-3xl"
          >
            ${participant.fullName[0] || ""}${participant.fullName[1] || ""}
          </div>

          <div class="flex min-w-0 flex-col gap-1">
            <span>
              ${participant.fullName}
            </span>

            <span>
              ${participant.age} سال | ${participant.track}
            </span>

            <span class="break-all">
              ${participant.email}
            </span>
          </div>
        </div>

        <button
          type="button"
          data-action="delete"
          class="cursor-pointer rounded-xl bg-red-800/20 px-7 py-3 text-center text-red-600"
        >
          حذف
        </button>
      </div>
    `,
  );
}

// ========================================
// DELETE PARTICIPANT
// ========================================

function handleParticipantListClick(event) {
  // فقط وقتی روی دکمه حذف کلیک شده باشد ادامه می‌دهیم.
  const deleteButton = event.target.closest('[data-action="delete"]');

  if (!deleteButton) {
    return;
  }

  const participantCard = deleteButton.closest("[data-index]");

  if (!participantCard) {
    return;
  }

  const index = Number(participantCard.dataset.index);

  removeParticipant(index);
}

function removeParticipant(index) {
  // حذف یک شرکت‌کننده از آرایه
  participants.splice(index, 1);

  // ذخیره وضعیت جدید
  saveParticipants();

  // اگر سرچ فعال است، نتایج سرچ را دوباره نمایش بده.
  // در غیر این صورت، کل لیست را نمایش بده.
  if (searchInput.value === "") {
    renderAllParticipants();
  } else {
    searchParticipants();
  }

  // به‌روزرسانی تعداد شرکت‌کنندگان
  updateParticipantsCount();
}

// ========================================
// CLEAR ALL PARTICIPANTS
// ========================================

function clearAllParticipants() {
  // آرایه اصلی را خالی می‌کنیم.
  participants.length = 0;

  // اطلاعات قبلی Local Storage را حذف می‌کنیم.
  localStorage.removeItem("participants");

  // لیست کارت‌ها را خالی می‌کنیم.
  participantsList.innerHTML = "";

  // تعداد را به‌روزرسانی می‌کنیم.
  updateParticipantsCount();
}

// ========================================
// RENDER ALL PARTICIPANTS
// ========================================

function renderAllParticipants(list = participants) {
  // قبل از Render دوباره، کارت‌های قبلی را پاک می‌کنیم.
  participantsList.innerHTML = "";

  list.forEach((participant) => {
    // index واقعی شرکت‌کننده در آرایه اصلی را پیدا می‌کنیم.
    const index = participants.indexOf(participant);

    renderParticipantCard(participant, index);
  });
}

// ========================================
// VALIDATION
// ========================================

function validateFullName(fullNameValue) {
  const nameError = document.getElementById("nameError");

  // نام باید بیشتر از 3 کاراکتر داشته باشد.
  if (fullNameValue.length <= 3) {
    showValidationError(
      "nameError",
      nameError,
      `
            نکته: نام و نام خانوادگی شما باید
            <span class="font-bold text-amber-300">
                بیشتر از 3 حرف
            </span>
            داشته باشد.
            `,
    );

    return false;
  }

  removeValidationError(nameError);

  return true;
}

function validateAge(ageValue) {
  const ageError = document.getElementById("ageError");

  // قبل از بررسی، خطای قبلی سن را پاک می‌کنیم.
  removeValidationError(ageError);

  // سن باید حداقل 18 سال باشد.
  if (ageValue < 18) {
    showValidationError(
      "ageError",
      null,
      `
            نکته: سن شما باید
            <span class="font-bold text-amber-300">
                18 سال یا بیشتر
            </span>
            باشد.
            `,
    );

    return false;
  }

  // سن‌های غیرمنطقی را قبول نمی‌کنیم.
  if (ageValue > 100) {
    showValidationError(
      "ageError",
      null,
      `
            نکته: سن وارد شده
            <span class="font-bold text-amber-300">
                نامعتبر
            </span>
            است.
            `,
    );

    return false;
  }

  return true;
}

function validateRequiredFields(
  fullNameValue,
  emailValue,
  ageValue,
  trackValue,
) {
  const emptyError = document.getElementById("emptyError");

  // تمام فیلدهای اصلی باید پر باشند.
  if (
    fullNameValue === "" ||
    emailValue === "" ||
    ageValue === "" ||
    trackValue === ""
  ) {
    showValidationError(
      "emptyError",
      emptyError,
      `
            نکته: شما باید
            <span class="font-bold text-amber-300">
                تمام فیلدها را
            </span>
            پر کنید.
            `,
    );

    return false;
  }

  removeValidationError(emptyError);

  return true;
}

function validateEmail() {
  const emailError = document.getElementById("emailError");

  // قبل از بررسی، خطای قبلی ایمیل را پاک می‌کنیم.
  removeValidationError(emailError);

  // validity.typeMismatch مشخص می‌کند که مقدار واردشده
  // با فرمت استاندارد یک ایمیل مطابقت دارد یا خیر.
  if (emailInput.validity.typeMismatch) {
    showValidationError(
      "emailError",
      null,
      `
            نکته: شما باید
            <span class="font-bold text-amber-300">
                فرمت ایمیل را صحیح
            </span>
            وارد کنید.
            `,
    );

    return false;
  }

  return true;
}

// ========================================
// VALIDATION ERROR UI
// ========================================

function clearValidationErrors() {
  const errorMessages = registrationForm.querySelectorAll('[id$="Error"]');

  errorMessages.forEach((errorMessage) => {
    errorMessage.remove();
  });
}

function showValidationError(errorId, existingError, message) {
  // اگر این خطا قبلاً نمایش داده شده، دوباره آن را نساز.
  if (existingError) {
    return;
  }

  const errorMessage = document.createElement("div");

  errorMessage.id = errorId;

  addErrorMessageClasses(errorMessage);

  errorMessage.innerHTML = `
        <div class="flex gap-3">
            <span class="mt-0.5 text-amber-300">
                💡
            </span>

            <p class="text-xs leading-6 text-slate-400">
                ${message}
            </p>
        </div>
    `;

  registrationForm.appendChild(errorMessage);
}

function removeValidationError(errorElement) {
  if (errorElement) {
    errorElement.remove();
  }
}

function addErrorMessageClasses(errorMessage) {
  errorMessage.classList.add(
    "rounded-2xl",
    "border",
    "border-amber-400/10",
    "bg-amber-400/5",
    "p-4",
  );
}

// ========================================
// PARTICIPANTS COUNT
// ========================================

function updateParticipantsCount() {
  // چون participants همیشه آخرین وضعیت آرایه را دارد،
  // نیازی نیست برای گرفتن تعداد دوباره Local Storage را بخوانیم.
  participantsCount.textContent = `${participants.length} شرکت‌کننده`;
}

// ========================================
// SEARCH
// ========================================

function searchParticipants() {
  const searchValue = searchInput.value.trim().toLowerCase();

  // اگر چیزی جستجو نشده، تمام شرکت‌کنندگان را نمایش بده.
  if (searchValue === "") {
    renderAllParticipants();
    return;
  }

  // شرکت‌کنندگانی که نام یا ایمیلشان با عبارت جستجو مطابقت دارد.
  const filteredParticipants = participants.filter((participant) => {
    const name = participant.fullName.toLowerCase();
    const email = participant.email.toLowerCase();

    return name.includes(searchValue) || email.includes(searchValue);
  });

  renderAllParticipants(filteredParticipants);
}

// ========================================
// LOCAL STORAGE
// ========================================

function saveParticipants() {
  // تبدیل آرایه JavaScript به JSON و ذخیره آن در Local Storage
  localStorage.setItem("participants", JSON.stringify(participants));
}

// ========================================
// JSON EXPORT
// ========================================

function exportParticipantsAsJson() {
  // اگر شرکت‌کننده‌ای وجود ندارد، فایل خالی ایجاد نکن.
  if (participants.length === 0) {
    return;
  }

  // تبدیل اطلاعات شرکت‌کنندگان به JSON
  const json = JSON.stringify(participants);

  // ساخت یک فایل موقت از اطلاعات JSON
  const blob = new Blob([json], {
    type: "application/json",
  });

  // ساخت URL موقت برای دسترسی مرورگر به Blob
  const url = URL.createObjectURL(blob);

  // ساخت لینک موقت برای دانلود فایل
  const downloadLink = document.createElement("a");

  downloadLink.setAttribute("href", url);
  downloadLink.setAttribute("download", "participants.json");

  // شروع دانلود
  downloadLink.click();

  // آزاد کردن URL موقت بعد از استفاده
  URL.revokeObjectURL(url);
}
