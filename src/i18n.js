import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  silentTranslationWarn: process.env.NODE_ENV === 'production' ? true : false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    "en": '',
  },
});

function setI18nLanguage (lang) {
  i18n.locale = lang;
  document.querySelector('html').setAttribute('lang', lang);
  return lang;
}

export function loadLanguageAsync (lang) {

  i18n.setLocaleMessage(lang, languages[lang]);
  return setI18nLanguage(lang);
}

const languages = {
  'en': {
    "title":                "Title",
    "category":             "Category",
    "format":               "Format",
    "categoryPlaceholder":  "Showing all categories",
    "filterPlaceholder":    "Begin typing to filter by title or category",
    "news":                 "Visit the News & Events section to view press releases and posts.",
    "All categories":        "All categories",
    "All employers & employees":         "All employers & employees",
    "Community & family gatherings":            "Community & family gatherings",
    "Contact tracing":       "Contact tracing",
    "Education & childcare":            "Education & childcare",
    "Entertainment & culture":        "Entertainment & culture",
    "Food, restaurants & hospitality":                 "Food, restaurants & hospitality",
    "Gyms, recreation & sports":                 "Gyms, recreation & sports",
    "Home health care & outpatient services":                 "Home health care & outpatient services",
    "Manufacturing, construction & real estate":        "Manufacturing, construction & real estate",
    "Offices":              "Offices",
    "Personal health & safety":       "Personal health & safety",
    "Retail & personal services":               "Retail & personal services",
    "Retail & professional services": "Retail & professional services",
    "Senior care & recreation":           "Senior care & recreation",
    "Testing":              "Testing",
    "Transportation":       "Transportation",
    "Vaccine":              "Vaccine",
    "Application (PDF)":          "Application (PDF)",
    "Application":          "Application",
    "Document collection":   "Document collection",
    "Guidance":             "Guidance",
    "Guidance document (PDF)":             "Guidance document (PDF)",
    "Illustrated guidance (PDF)":  "Illustrated guidance (PDF)",
    "Interactive map":       "Interactive map",
    "Sector-specific safety protocols":      "Sector-specific safety protocols",
    "Service page":          "Service page",
    "Website":              "Website",
  },
  'es': {
    "title":                "Título",
    "category":             "Categoría",
    "format":               "Formato",
    "categoryPlaceholder":  "Mostrando todas las categorías",
    "filterPlaceholder":    "Comience a escribir para filtrar por título o categoría",
    "news":                 "Visite la sección Noticias y Eventos para ver publicaciones",
    "All categories":        "Todas las categorías",
    "All employers & employees":         "Todos los empleadores y empleados",
    "Community & family gatherings":            "Reuniones comunitarias y familiares",
    "Contact tracing":       "Rastreo de contactos",
    "Education & childcare":            "Educación y cuidado de niños",
    "Entertainment & culture":        "Entretenimiento y cultura",
    "Food, restaurants & hospitality":                 "Alimentos, restaurantes y hospitalidad",
    "Gyms, recreation & sports":                 "Gimnasios, recreación y deportes",
    "Home health care & outpatient services":                 "Servicios de atención de la salud y pacientes ambulatorios",
    "Manufacturing, construction & real estate":        "Fabricación, construcción y bienes raíces",
    "Offices":              "Oficinas",
    "Personal health & safety":       "Salud y seguridad personal",
    "Retail & personal services":               "Servicios personales y de venta minorista",
    "Senior care & recreation":           "Atención y recreación para adultos mayores",
    "Testing":              "Pruebas",
    "Transportation":       "Transporte",
    "Vaccine":              "Vacunas",
    "Application (PDF)":          "Solicitud (PDF)",
    "Document collection":   "Recolección de documentos",
    "Guidance":             "Guía",
    "Illustrated guidance (PDF)":  "Guías ilustradas (PDF)",
    "Interactive map":       "Mapa interactivo",
    "Sector-specific safety protocols":      "Protocolos específicos de seguridad",
    "Service page":          "Página de servicio",
    "Website":              "Sitio web",
  },
  'fr': {
    "title":                "Titre",
    "category":             "Catégorie",
    "format":               "Format",
    "categoryPlaceholder":  "Montrer toutes catégories",
    "filterPlaceholder":    "Commencer à saisir pour filtrer par titre et catégorie",
    "news":                 "Rendez-vous sur la section Actualités et événements pour afficher les nouvelles publications.",
  },
  'ht': {
    "title":                "Tit",
    "category":             "Kategori",
    "format":               "Fòma",
    "categoryPlaceholder":  "Montre tout kategori",
    "filterPlaceholder":    "Kòmanse tape pou triye pa tit oswa kategori",
  },
  'id': {
    "title":                "Judul",
    "category":             "Kategori",
    "format":               "Format",
    "categoryPlaceholder":  "Menampilkan semua kategori",
    "filterPlaceholder":    "Mulailah mengetik untuk memfilter berdasarkan judul atau kategori",
    "news":                 "",
  },
  'km': {
    "title":                "តួនាទី",
    "category":             "ប្រភេទ",
    "format":               "ទ្រង់ទ្រាយ",
    "categoryPlaceholder":  "បង្ហាញគ្រប់ប្រភេទ",
    "filterPlaceholder":    "ចាប់ផ្តើមវាយបញ្ចូលដើម្បីចម្រោះឯកសារតាមចំណងជើង ឬប្រភេទ",
    "news":                 "",
  },
  'ko': {
    "title":                "제목",
    "category":             "범주",
    "format":               "형식",
    "categoryPlaceholder":  "모든 범주 보기",
    "filterPlaceholder":    "제목이나 범주로 검색하려면 입력을 시작하세요",
    "news":                 "포스트를 보려면 뉴스 및 이벤트 섹션을 방문하세요.",
  },
  'ru': {
    "title": "Название",
    "category":             "Категория",
    "format":               "Формат",
    "categoryPlaceholder":  "Показаны все категории",
    "filterPlaceholder":    "Начните ввод текста для фильтрации по названию или категории",
    "news":                 "Для просмотра публикаций перейдите в раздел «Новости и события».",
  },
  'sw': {
    "title":                "Kichwa",
    "category":             "Kategoria",
    "format":               "Umbizo",
    "categoryPlaceholder":  "Inaonyesha kategoria zote",
    "filterPlaceholder":    "Anza kucharaza ili kuchuja kwa kichwa au kategoria",
    "news":                 "",
  },
  'vt': {
    "title":                "Tiêu đề",
    "category":             "Hạng mục",
    "format":               "Định dạng",
    "categoryPlaceholder":  "Hiển thị tất cả các hạng mục",
    "filterPlaceholder":    "Bắt đầu nhập để lọc theo tiêu đề hoặc hạng mục",
    "news":                 "Truy cập phần Tin Tức & Sự Kiện để xem các bài đăng.",
  },
  'zh': {
    "title":                "标题",
    "category":             "类别",
    "format":               "格式",
    "categoryPlaceholder":  "显示所有类别",
    "filterPlaceholder":    "开始输入以便按标题或类别筛选",
    "news":                 "浏览“新闻和事件”以查看发布的内容。",
  },
};