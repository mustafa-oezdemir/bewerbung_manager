![Grüne moderne Lebenslaufvorlage](https://cdn.enhancv.com/predefined-examples/u4sMqAHXgZiomUwUaeNJd0EbgxV1EUrK3Hc7POOl/image.png)

* Konu: A4 formatında, referans görselle yüksek doğrulukta eşleşen “Zeitgenössisch” Lebenslauf şablonu
* İstenilen çıktı: Referans görseldeki yeşil renk paleti, iki sütunlu düzen, organik profil fotoğrafı arka planı, bölüm ikonları, tipografi, boşluklar ve içerik hiyerarşisini mümkün olduğunca doğru yeniden üreten; React, TypeScript, CSS, Electron, PDF ve serbest düzenleme sistemiyle uyumlu Lebenslauf şablonu
* Kullanılacak framework: RASCEF
* Senin yazacağın prompt:

![Ein zweispaltiger Lebenslauf mit blauer Akzentfarbe und Fokus auf Erfahrung und Leistungen.](https://cdn.enhancv.com/predefined-examples/XHiNXHD5CWUGCGVKQTJArS7MY8iHn7Awe5tqWOpY/image.png)

Sen Electron, React, TypeScript, modern CSS, A4 belge tasarımı, PDF üretimi, ATS uyumluluğu ve görsel karşılaştırmalı frontend geliştirme konusunda uzman kıdemli bir yazılım geliştiricisisin.

“Bewerbung Studio” uygulamam için **Zeitgenössisch** adlı Lebenslauf şablonunu oluşturacaksın.

Sana verdiğim referans görsel ana tasarım kaynağıdır. Oluşturacağın React önizlemesi ve PDF çıktısı; referanstaki A4 kompozisyonuna, sütun oranlarına, profil fotoğrafı alanına, yeşil renk tonlarına, section ikonlarına, yazı boyutlarına, satır aralıklarına ve içerik başlangıç konumlarına mümkün olduğunca yakın görünmelidir.

Sonuç yalnızca benzer bir tema olmamalıdır. Referans görseldeki görsel hiyerarşiyi ve yerleşimi ölçülebilir biçimde yeniden üret.

Referansta bulunan üçüncü taraf marka, logo, “Unterstützt von”, “Powered by” veya platform adreslerini kopyalama. Footer yalnızca kullanıcıya ait website, sayfa numarası veya isteğe bağlı belge bilgisi içermelidir.

## 1. Template bilgileri

Görünen şablon adı:

```text
Zeitgenössisch
```

Dosya ve teknik kimliklerde ASCII uyumlu isim kullan:

```text
zeitgenoessisch
```

Açıklama:

```text
Eine saubere, moderne Lebenslaufvorlage, die zentrale Erfolge, Erfahrungen und Fähigkeiten hervorhebt und darauf ausgelegt ist, die Stärken jedes Professionals hervorzuheben.
```

Mevcut template metadata modeline uyarlanacak hedef özellikler:

```ts
{
  id: "zeitgenoessisch",
  name: "Zeitgenössisch",
  category: "modern-professional",
  documentKind: "lebenslauf",
  description:
    "Eine saubere, moderne Lebenslaufvorlage, die zentrale Erfolge, Erfahrungen und Fähigkeiten hervorhebt.",
  atsSupported: true,
  supportsPhoto: true,
  supportsFreeform: true,
  supportsMultiplePages: true,
  defaultOutputMode: "visual"
}
```

Projede mevcut template registry bulunuyorsa ikinci bir kayıt sistemi kurma. Var olan type ve store yapısını genişlet.

## 2. Mevcut template dosyaları

Projede bulunan şu dosyaları kullan:

```text
public/templates/Zeitgenoessisch_Lebenslauf_ATS.docx
public/templates/Zeitgenoessisch_Lebenslauf_Muster.docx
public/templates/Zeitgenoessisch_Lebenslauf_Muster.preview.png
```

Şu servislerle uyumlu çalış:

```text
electron/templates/template-filename.service.ts
electron/templates/template-mapper.ts
electron/templates/template-placeholder.service.ts
electron/templates/template-preview.service.ts
electron/templates/template-scanner.ts
electron/templates/template-validator.ts
electron/templates/template.repository.ts
electron/templates/template.service.ts
```

Dosya sistemi kimliği `Zeitgenoessisch`, kullanıcı arayüzündeki isim ise `Zeitgenössisch` olmalıdır.

## 3. A4 sayfa standardı

Belge kesin olarak:

```text
210 mm × 297 mm
```

ölçüsünde olmalıdır.

Temel stil:

```css
@page {
  size: A4;
  margin: 0;
}

.zeitgenoessisch-page {
  position: relative;
  width: 210mm;
  height: 297mm;
  min-height: 297mm;
  margin: 0 auto;
  overflow: hidden;
  background: #ffffff;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
```

A4 belge tasarımında `100vh`, `100vw` veya yalnızca piksel ölçüleri kullanma. Belge yerleşiminde `mm`, tipografide tercihen `pt` kullan.

## 4. Referans yerleşim analizi

Sayfa iki ana sütundan oluşmalıdır:

```text
Sol sütun: yaklaşık %31
Sütun boşluğu: yaklaşık %4
Sağ sütun: yaklaşık %65
```

Başlangıç A4 ölçüleri:

```text
Sayfa genişliği: 210 mm
Sayfa yüksekliği: 297 mm

Sol dış boşluk: 17 mm
Sağ dış boşluk: 17 mm
Üst boşluk: 15 mm
Alt güvenli boşluk: 14 mm

Kullanılabilir içerik genişliği: yaklaşık 176 mm
Sol sütun genişliği: yaklaşık 50 mm
Sütun aralığı: yaklaşık 11 mm
Sağ sütun genişliği: yaklaşık 115 mm
```

Referans görselde:

* Profil fotoğrafı sol üstte
* İsim ve meslek unvanı sağ üstte
* Sol sütunda kontaklar, güçlü yönler ve diller
* Sağ sütunda özet, deneyim ve eğitim
* Sağ sütun daha baskın ve geniş
* İçerik kartları kesintisiz beyaz arka plan üzerinde
* Yeşil renk yalnızca vurgu, ikon ve dekoratif alanlarda kullanılıyor

Bu oranları template varsayılanları olarak tanımla. CSS içinde tekrar eden sabit sayılar kullanma.

## 5. Design tokenları

Template ölçülerini, renklerini ve tipografisini merkezi bir TypeScript nesnesinde tut.

Hedef yapı:

```ts
export const zeitgenoessischTemplateDefaults = {
  page: {
    widthMm: 210,
    heightMm: 297,
    marginTopMm: 15,
    marginRightMm: 17,
    marginBottomMm: 14,
    marginLeftMm: 17,
  },

  layout: {
    leftColumnWidthMm: 50,
    columnGapMm: 11,
    rightColumnWidthMm: 115,
    headerMinHeightMm: 38,
    sectionGapMm: 7,
    entryGapMm: 5,
  },

  colors: {
    primary: "#2FB478",
    primaryDark: "#075E4E",
    primarySoft: "#CBECDD",
    primaryPale: "#E5F5EC",
    heading: "#374247",
    text: "#434D52",
    mutedText: "#687277",
    divider: "#D5DEDA",
    pageBackground: "#FFFFFF",
  },

  typography: {
    fontFamily:
      '"Source Sans 3", "Segoe UI", Arial, Helvetica, sans-serif',
    nameSizePt: 25,
    professionSizePt: 12.5,
    sectionTitleSizePt: 11,
    entryTitleSizePt: 10.5,
    bodySizePt: 8.5,
    smallSizePt: 7.8,
    lineHeight: 1.32,
  },
} as const;
```

Bu değerleri referans görüntüyle karşılaştırarak gerektiğinde düzelt.

Kullanıcı tasarım panelinden şu ayarları değiştirebilmelidir:

* Ana yeşil renk
* Koyu yeşil başlık rengi
* Açık yeşil ikon arka planı
* Font ailesi
* Font boyutu
* Satır yüksekliği
* Sütun genişlikleri
* Sütun aralığı
* Section aralıkları
* Sayfa kenar boşlukları

## 6. Üst profil alanı

Üst alan iki parçadan oluşmalıdır:

```text
Sol: profil fotoğrafı ve dekoratif organik şekiller
Sağ: isim ve meslek unvanı
```

Örnek içerik:

```text
SARAH ZIMMERMANN

BUCHHALTERIN | FINANZBUCHHALTUNG
| PERSONALVERWALTUNG
```

İsim:

* Büyük harfli
* İnce veya orta ağırlıkta
* Koyu gri
* Geniş harf aralıklı
* Sağ sütunun başlangıcına hizalı

olmalıdır.

Meslek unvanı:

* İki satıra geçebilmeli
* Açık yeşil, yuvarlatılmış bir arka plan içinde bulunmalı
* Koyu yeşil veya koyu gri metin kullanmalı
* Referanstaki gibi kapsül biçimli ancak aşırı yuvarlak olmayan bir forma sahip olmalı

Önerilen stil yaklaşımı:

```css
.zeitgenoessisch-header__name {
  margin: 0;
  color: var(--zeit-heading);
  font-size: var(--zeit-name-size);
  font-weight: 300;
  line-height: 1;
  letter-spacing: 0.025em;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

.zeitgenoessisch-header__profession {
  display: inline-block;
  max-width: 100%;
  margin-top: 3mm;
  padding: 2.5mm 4mm;
  border-radius: 4mm;
  color: var(--zeit-primary-dark);
  background: var(--zeit-primary-soft);
  font-size: var(--zeit-profession-size);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

Uzun isim veya meslek unvanı bulunduğunda taşma olmamalıdır.

## 7. Profil fotoğrafı ve organik arka plan

Fotoğraf sol üstte yaklaşık:

```text
34–38 mm çapında
```

dairesel olarak gösterilmelidir.

Fotoğrafın arkasında:

* Açık mint yeşili organik şekil
* Daha koyu yarı saydam yeşil şekil
* Sol alt tarafta küçük yeşil daire

bulunmalıdır.

Bu dekorasyon üçüncü taraf kaynağın birebir vektörel kopyası olmamalıdır. Aynı kompozisyon hissini veren özgün SVG veya CSS şekilleri oluştur.

Önerilen katmanlar:

```tsx
<div className="zeitgenoessisch-photo-composition">
  <ModernOrganicPhotoBackground />
  <img className="zeitgenoessisch-photo" ... />
  <span className="zeitgenoessisch-photo-accent" />
</div>
```

Kurallar:

* Arka plan şekilleri `pointer-events: none` kullanmalı
* Fotoğrafın üzerinde kalmamalı
* PDF çıktısında aynı konumda görünmeli
* Fotoğraf kullanıcı tarafından crop ve zoom yapılabilmeli
* Fotoğraf yoksa dekoratif alan kaldırılmalı veya kompaktlaştırılmalı
* Boş fotoğraf placeholder’ı PDF’ye girmemeli

## 8. Sol sütun

Sol sütunun varsayılan bölümleri:

```text
KONTAKTE
STÄRKEN
SPRACHEN
```

Opsiyonel olarak:

```text
FÄHIGKEITEN
ZERTIFIKATE
INTERESSEN
```

eklenebilmelidir.

Sol sütun başlangıçta profil fotoğrafının altından başlamalıdır.

### Kontakte

Section başlığının solunda yeşil, açık renkli kare ikon alanı bulunmalıdır.

İletişim alanları:

* Telefon
* E-posta
* Website
* LinkedIn
* Wohnort
* GitHub, varsa

Her satırda:

* Küçük yeşil ikon
* Yanında değer

gösterilmelidir.

```css
.zeitgenoessisch-contact-list {
  display: grid;
  gap: 2.3mm;
}

.zeitgenoessisch-contact-item {
  display: grid;
  grid-template-columns: 5mm minmax(0, 1fr);
  column-gap: 1.5mm;
  align-items: start;
}

.zeitgenoessisch-contact-item__icon {
  color: var(--zeit-primary);
}

.zeitgenoessisch-contact-item__value {
  min-width: 0;
  color: var(--zeit-text);
  font-size: var(--zeit-body-size);
  line-height: 1.25;
  overflow-wrap: anywhere;
}
```

Eksik alanlar render edilmemelidir.

### Stärken

Her güçlü yön:

* Sol tarafta küçük koyu yeşil nokta
* Sağda kalın başlık
* Altında kısa kanıt veya açıklama

içermelidir.

Örnek:

```text
Kommunikation

Verbesserte die Kommunikation zwischen Abteilungen,
was zu 20 % weniger Fehlern führte.
```

```css
.zeitgenoessisch-strength {
  display: grid;
  grid-template-columns: 4mm minmax(0, 1fr);
  column-gap: 2mm;
  margin-bottom: 5mm;
  break-inside: avoid;
}

.zeitgenoessisch-strength__bullet {
  width: 2mm;
  height: 2mm;
  margin-top: 1.5mm;
  border-radius: 50%;
  background: var(--zeit-primary-dark);
}

.zeitgenoessisch-strength__title {
  margin: 0 0 1mm;
  color: var(--zeit-heading);
  font-size: 9.5pt;
  font-weight: 700;
}

.zeitgenoessisch-strength__description {
  margin: 0;
  color: var(--zeit-text);
  font-size: var(--zeit-body-size);
  line-height: var(--zeit-line-height);
}
```

### Sprachen

Her dil kaydı:

* Dil adı
* Açık seviye
* Visual modda yeşil nokta göstergesi

içermelidir.

Örnek:

```text
DEUTSCH
Muttersprache              ● ● ● ● ●

ENGLISCH
Versiert                    ● ● ● ● ○
```

Veri modelinde görsel nokta sayısı değil, CEFR veya açık seviye saklanmalıdır.

ATS çıktısında:

```text
Deutsch – Muttersprache
Englisch – B2
```

formatı kullanılmalıdır.

## 9. Sağ sütun

Sağ sütunun varsayılan sırası:

```text
ZUSAMMENFASSUNG
ERFAHRUNG
AUSBILDUNG
```

Opsiyonel olarak:

```text
PROJEKTE
ZERTIFIKATE
WEITERBILDUNGEN
```

eklenebilmelidir.

## 10. Section başlıkları ve ikonları

Referanstaki section başlıkları:

* Koyu yeşil
* Büyük harfli
* Kalın
* Solunda açık yeşil, yuvarlatılmış kare ikon alanı

şeklindedir.

Önerilen yapı:

```tsx
<header className="zeitgenoessisch-section-heading">
  <span className="zeitgenoessisch-section-heading__icon">
    {icon}
  </span>

  <h2 className="zeitgenoessisch-section-heading__title">
    ERFAHRUNG
  </h2>
</header>
```

Önerilen stil:

```css
.zeitgenoessisch-section-heading {
  display: flex;
  align-items: center;
  gap: 2mm;
  margin-bottom: 4mm;
  break-after: avoid;
  page-break-after: avoid;
}

.zeitgenoessisch-section-heading__icon {
  display: grid;
  place-items: center;
  width: 6.5mm;
  height: 6.5mm;
  border-radius: 1.5mm;
  color: var(--zeit-primary-dark);
  background: var(--zeit-primary-soft);
}

.zeitgenoessisch-section-heading__title {
  margin: 0;
  color: var(--zeit-primary-dark);
  font-size: var(--zeit-section-title-size);
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}
```

İkonlar dekoratif destek olmalıdır. Bilginin tek taşıyıcısı olmamalıdır.

## 11. Zusammenfassung

Özet tam sağ sütun genişliğini kullanmalıdır.

Kurallar:

* Yaklaşık 5–8 satır
* Sabit yükseklik kullanılmamalı
* `overflow: hidden` ile kesilmemeli
* Gövde metni koyu gri olmalı
* Satır yüksekliği sıkışık ama okunabilir olmalı
* Kullanıcı içeriği uzattığında flow modunda alan büyümeli

```css
.zeitgenoessisch-summary {
  margin: 0;
  color: var(--zeit-text);
  font-size: var(--zeit-body-size);
  line-height: var(--zeit-line-height);
  hyphens: auto;
  overflow-wrap: break-word;
}
```

## 12. Erfahrung

Referans tasarımda her deneyim kaydı şu yapıyı kullanır:

```text
Şirket adı                         Lokasyon
Pozisyon                           Tarih
Kısa görev açıklaması
Başarı maddeleri
```

Örnek:

```text
Siemens AG                         Berlin, Deutschland
Senior Buchhalterin                2019–2023
```

Şirket adı koyu ve kalın olmalıdır.

Pozisyon normal font ağırlığında gösterilmelidir.

Lokasyon ve tarih sağ hizalı olmalıdır.

```css
.zeitgenoessisch-experience-entry {
  margin-bottom: var(--zeit-entry-gap);
  break-inside: avoid;
  page-break-inside: avoid;
}

.zeitgenoessisch-experience-entry__top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 35mm;
  column-gap: 5mm;
  align-items: start;
}

.zeitgenoessisch-experience-entry__company {
  margin: 0;
  color: var(--zeit-heading);
  font-size: var(--zeit-entry-title-size);
  font-weight: 700;
  line-height: 1.2;
}

.zeitgenoessisch-experience-entry__location {
  color: var(--zeit-text);
  font-size: var(--zeit-body-size);
  line-height: 1.2;
  text-align: right;
}

.zeitgenoessisch-experience-entry__role-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 35mm;
  column-gap: 5mm;
  margin-top: 1mm;
}

.zeitgenoessisch-experience-entry__role {
  color: var(--zeit-text);
  font-size: var(--zeit-entry-title-size);
  font-weight: 400;
}

.zeitgenoessisch-experience-entry__date {
  color: var(--zeit-text);
  font-size: var(--zeit-body-size);
  text-align: right;
}

.zeitgenoessisch-experience-entry__summary {
  margin: 1.5mm 0 1mm;
  color: var(--zeit-text);
  font-size: var(--zeit-body-size);
  line-height: var(--zeit-line-height);
}

.zeitgenoessisch-experience-entry__achievements {
  margin: 0;
  padding-left: 4mm;
  color: var(--zeit-text);
  font-size: var(--zeit-body-size);
  line-height: var(--zeit-line-height);
}
```

Uzun şirket veya lokasyon adı bulunduğunda metin kesilmemeli; grid kontrollü biçimde alt satıra geçmelidir.

## 13. Ausbildung

Eğitim alanında:

```text
Üniversite veya kurum adı          Lokasyon
Derece                              Tarih
```

yapısı kullanılmalıdır.

Kurum adı koyu ve kalın, derece normal font ağırlığında olmalıdır.

Her eğitim kaydı mümkün olduğunca bölünmeden tutulmalıdır.

## 14. Footer

Referanstaki üçüncü taraf marka ve platform bilgilerini kopyalama.

Footer şu içerikleri desteklemelidir:

* Kullanıcının website veya portfolio adresi
* Sayfa numarası
* Opsiyonel son güncelleme tarihi

```css
.zeitgenoessisch-footer {
  position: absolute;
  right: var(--zeit-page-margin-right);
  bottom: 6mm;
  left: var(--zeit-page-margin-left);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--zeit-muted);
  font-size: 7.2pt;
}
```

## 15. Canva benzeri serbest düzenleme

Her ana bölüm bağımsız editör kartı olmalıdır:

```text
zeitgenoessisch.photo
zeitgenoessisch.header
zeitgenoessisch.contacts
zeitgenoessisch.strengths
zeitgenoessisch.languages
zeitgenoessisch.summary
zeitgenoessisch.experience
zeitgenoessisch.education
zeitgenoessisch.footer
```

Kullanıcı:

* Kartı seçebilmeli
* Fareyle taşıyabilmeli
* Sekiz resize tutamacıyla büyütüp küçültebilmeli
* Kartı kilitleyebilmeli
* Gizleyebilmeli
* Katman sırasını değiştirebilmeli
* X, Y, genişlik ve yüksekliği sayısal olarak girebilmeli
* Sol ve sağ sütun arasında taşıyabilmeli
* Kartı başka sayfaya taşıyabilmeli
* Varsayılan template yerleşimine dönebilmelidir

Yerleşimi CSS stringi olarak kaydetme. A4 koordinatları kullan:

```ts
interface DocumentElementLayout {
  elementId: string;
  templateId: "zeitgenoessisch";
  documentKind: "lebenslauf";
  pageIndex: number;
  xMm: number;
  yMm: number;
  widthMm: number;
  heightMm: number;
  rotationDeg: number;
  zIndex: number;
  locked: boolean;
  hidden: boolean;
}
```

Preview zoom değeri gerçek layout state’ine kaydedilmemelidir.

## 16. Flow ve freeform modu

İki düzen modu desteklenmelidir:

```ts
type DocumentLayoutMode = "flow" | "freeform";
```

### Flow modu

* Varsayılan mod
* İçerik uzunluğuna göre alanların büyümesi
* Otomatik pagination
* Kart çakışmasının engellenmesi
* Experience kayıtlarının mümkün olduğunca bölünmemesi
* Section başlığının sayfa sonunda yalnız bırakılmaması

### Freeform modu

* Kartların A4 koordinatlarıyla manuel yerleştirilmesi
* Otomatik pagination uygulanmaması
* A4 dışına taşmanın engellenmesi
* Kart çakışmalarında kullanıcıya uyarı verilmesi
* Yeni sayfa ekleme ve kartı sayfalar arasında taşıma

## 17. ATS görünümü

Visual tasarım iki sütunlu olduğu için ATS uyumluluğunu otomatik varsayma.

İki output mode kullan:

```ts
type ResumeOutputMode = "visual" | "ats";
```

ATS görünümünde:

* Tek sütun kullan
* Profil fotoğrafını varsayılan olarak gizle
* Organik dekoratif şekilleri kaldır
* Section ikonlarını kaldır
* Dil noktalarını açık metne dönüştür
* Mantıksal DOM sırası kullan
* Tablo kullanma
* Mutlak yerleşime bağlı bilgi sunma
* Metni seçilebilir ve aranabilir bırak

ATS içerik sırası:

```text
1. Persönliche Daten
2. Zusammenfassung
3. Berufserfahrung
4. Ausbildung
5. Kenntnisse
6. Sprachen
7. Stärken
8. Projekte
9. Zertifikate
10. Weiterbildungen
```

Visual ve ATS için iki ayrı içerik modeli oluşturma. Aynı ResumeData kullanılmalıdır.

## 18. Çok sayfalı davranış

İçerik ilk sayfaya sığmazsa:

* İkinci gerçek A4 sayfası oluştur
* İlk sayfadaki büyük fotoğraf kompozisyonunu tekrar etme
* İkinci sayfada sadeleştirilmiş isim ve meslek başlığı kullan
* Experience kaydını mümkün olduğunca bölme
* Section başlığını sayfa sonunda yalnız bırakma
* Sol sütun içeriklerini ikinci sayfada tekrar etme veya kompakt gösterme seçeneği sun
* Footer sayfa numarasını güncelle
* Belgeyi tek sayfaya sığdırmak için fontu aşırı küçültme
* Tüm sayfayı `transform: scale()` ile sıkıştırma

## 19. React component mimarisi

Şablonu tek büyük component içine yazma.

Önerilen yapı:

```text
src/components/resume/templates/zeitgenoessisch/
├── ZeitgenoessischResume.tsx
├── ZeitgenoessischPage.tsx
├── ZeitgenoessischHeader.tsx
├── ZeitgenoessischPhoto.tsx
├── ZeitgenoessischLeftColumn.tsx
├── ZeitgenoessischMainColumn.tsx
├── ZeitgenoessischSectionHeading.tsx
├── ZeitgenoessischContactSection.tsx
├── ZeitgenoessischStrengthsSection.tsx
├── ZeitgenoessischLanguagesSection.tsx
├── ZeitgenoessischSummarySection.tsx
├── ZeitgenoessischExperienceSection.tsx
├── ZeitgenoessischEducationSection.tsx
├── ZeitgenoessischFooter.tsx
├── zeitgenoessisch.defaults.ts
├── zeitgenoessisch.layout.ts
├── zeitgenoessisch.types.ts
└── zeitgenoessisch.css
```

Ancak projede ortak rendererlar bulunuyorsa tekrar yazma:

* Experience renderer
* Education renderer
* Contact renderer
* Language renderer
* KnowledgeSectionRenderer
* Photo renderer
* EditableDocumentElement
* DocumentBackgroundLayer
* Pagination utilities
* Design token sistemi
* Template registry

Template-specific componentler yalnızca görsel farklılıkları yönetmelidir.

## 20. Print ve PDF stilleri

```css
@media screen {
  .zeitgenoessisch-page {
    box-shadow: 0 4px 22px rgb(15 23 42 / 14%);
  }
}

@media print {
  html,
  body {
    margin: 0;
    padding: 0;
    background: #ffffff;
  }

  .zeitgenoessisch-page {
    width: 210mm;
    height: 297mm;
    min-height: 297mm;
    margin: 0;
    overflow: hidden;
    box-shadow: none;
    break-after: page;
    page-break-after: always;
  }

  .zeitgenoessisch-page:last-child {
    break-after: auto;
    page-break-after: auto;
  }

  .editor-selection,
  .editor-resize-handle,
  .editor-toolbar,
  .editor-guide,
  .editor-grid {
    display: none !important;
  }
}
```

PDF oluşturmadan önce:

* Fontların yüklenmesini bekle
* Fotoğrafın yüklenmesini bekle
* Dekoratif SVG katmanlarının yüklenmesini bekle
* `printBackground: true` kullan
* Preview zoom transformunu kaldır
* Editor seçim ve resize araçlarını gizle
* Her sayfanın gerçek A4 ölçüsünde olduğunu doğrula

## 21. Görsel doğruluk süreci

İlk uygulamadan sonra referans ile üretilen önizlemeyi yan yana karşılaştır.

Şunları tek tek ölç:

* Profil fotoğrafının çapı
* Organik arka plan şekillerinin boyutu
* Fotoğrafın sayfa üstüne ve soluna uzaklığı
* İsim başlangıç noktası
* İsim font boyutu ve ağırlığı
* Meslek unvanı kapsülünün genişliği ve yüksekliği
* Sol sütun genişliği
* Sütunlar arası boşluk
* Section ikon kutularının ölçüsü
* Sağ sütundaki içerik başlangıç yüksekliği
* Experience satırlarının dikey aralıkları
* Gövde metni font boyutu
* Achievement madde aralıkları
* Footer konumu
* Sayfa altındaki kalan beyaz alan

İlk sonuçta belirgin fark varsa tokenları ve CSS ölçülerini yeniden düzenle. Sonuç referanstaki kompozisyona görsel olarak belirgin biçimde yaklaşmalıdır.

## 22. Test gereksinimleri

Şu senaryoları test et:

1. Zeitgenössisch metadata kaydı
2. ASCII dosya adı ile kullanıcı arayüzü adının doğru eşleşmesi
3. ATS, Muster ve preview dosyalarının bulunması
4. Varsayılan sütun ölçüleri
5. Profil fotoğraflı kullanım
6. Fotoğrafsız kullanım
7. Uzun isim
8. İki satırlı meslek unvanı
9. Eksik iletişim bilgileri
10. Uzun Zusammenfassung
11. Çok sayıda Stärke
12. Birden fazla dil
13. Uzun şirket ve lokasyon adı
14. Üç veya daha fazla Berufserfahrung kaydı
15. Tek sayfalık çıktı
16. İki sayfalık çıktı
17. Visual ve ATS renderer farkları
18. ATS doğrusal DOM sırası
19. Kart sürükleme
20. Kart resize
21. Kart kilitleme ve gizleme
22. Template layout reset
23. Preview zoom altında koordinatların değişmemesi
24. PDF’de editor araçlarının görünmemesi
25. Dekoratif şekillerin PDF’de doğru basılması
26. Template değişiminde ResumeData içeriğinin korunması
27. Uygulama yeniden açıldığında layout’un geri yüklenmesi
28. Setup ve Portable sürümde template kaynaklarının bulunması

## 23. Çalışma sırası

Görevi aşamalı gerçekleştir.

### Aşama 1: Mevcut yapıyı analiz et

Özellikle incele:

```text
src/shared/documentDesign.ts
src/shared/documentPagination.ts
src/shared/schema.ts
src/shared/templates.ts
src/store/useAppStore.ts
src/features/templates/
src/components/document/
src/components/knowledge/
src/components/templates/
src/views/DocumentsView.tsx
electron/templates/
electron/documents.ts
electron/pdf.ts
electron/storage.ts
electron/preload.ts
public/templates/
```

Mevcut Zeitgenoessisch DOCX ve preview dosyalarının servisler tarafından nasıl bulunduğunu belirle.

### Aşama 2: Referans ölçüm planı

Referans görseldeki:

* A4 oranını
* Sütun genişliklerini
* Fotoğraf ölçüsünü
* İsim alanını
* Meslek unvanı kapsülünü
* Section başlangıçlarını
* Footer konumunu

milimetre cinsinden yaklaşık olarak çıkar.

### Aşama 3: Metadata ve design tokenları

Template kaydını, varsayılan renkleri, tipografiyi ve layout ölçülerini oluştur.

### Aşama 4: React componentleri

Page, header, fotoğraf, sütunlar, sectionlar ve footer componentlerini oluştur.

### Aşama 5: Tam CSS

Eksiksiz ve production-ready `zeitgenoessisch.css` dosyasını oluştur.

### Aşama 6: Editör entegrasyonu

Selection, drag, resize, lock, hide, layer ve reset davranışlarını bağla.

### Aşama 7: ATS, pagination ve PDF

Tek sütun ATS görünümü, çok sayfalı çıktı ve PDF uyumluluğunu tamamla.

### Aşama 8: Görsel karşılaştırma

Referansla çıktı arasındaki ölçü, font, spacing ve renk farklılıklarını gider.

Her aşamadan sonra bir sonraki aşamaya geçmeden bekle.

## 24. Kod çıktı formatı

Her dosya için:

```text
Dosya: src/ilgili/dosya.tsx
İşlem: Güncellenecek | Yeni oluşturulacak | Silinecek
Amaç: Yapılan değişikliğin teknik açıklaması
```

Ardından eksiksiz ve doğrudan kullanılabilir kodu ver.

Kurallar:

* Eksik import bırakma
* Hayali type, component veya API üretme
* Pseudocode yazma
* JSX ve CSS class adlarını eşleştir
* Mevcut ortak rendererları gerekçesiz kopyalama
* Demo içeriği gerçek kullanıcı verisi olarak kaydetme
* Referanstaki üçüncü taraf marka ve logoları kopyalama
* Visual iki sütun düzenini otomatik ATS uyumlu kabul etme
* `dist-electron`, `artifacts`, `release` veya `windows-release` dosyalarını düzenleme
* Ben istemeden Tailwind, Bootstrap veya ağır bir UI framework ekleme
* Mevcut projeyi baştan yazma

## 25. Beklenen cevap formatı

Her cevapta şu başlıkları kullan:

### 1. Referans görsel analizi

### 2. A4 ölçüm ve yerleşim planı

### 3. Mevcut projeden yeniden kullanılacak yapılar

### 4. Zeitgenössisch template mimarisi

### 5. Değiştirilecek dosyalar

### 6. Design tokenları

### 7. React ve TypeScript kodları

### 8. Tam CSS kodu

### 9. ATS, pagination ve PDF değişiklikleri

### 10. Testler

### 11. PowerShell komutları

### 12. Görsel karşılaştırma kontrol listesi

İlk olarak yalnızca **Aşama 1 ve Aşama 2’yi** gerçekleştir. Mevcut proje yapısını incele, `public/templates` altında bulunan Zeitgenoessisch dosyalarının mevcut servislerle nasıl eşleştiğini belirle ve referans görseldeki A4 yerleşimini milimetre bazında analiz et. Mevcut kodla doğrulanmamış component, import veya API üretme.
