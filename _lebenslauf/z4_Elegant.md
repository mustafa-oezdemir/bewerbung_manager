
* Konu: A4 formatında koyu sağ panelli “Elegant” Lebenslauf şablonu
* İstenilen çıktı: Referans görseldeki beyaz ana içerik alanı, koyu lacivert sağ panel, tipografi, sütun oranları, profil fotoğrafı ve bölüm yerleşimini yüksek görsel doğrulukla yeniden oluşturan; React, TypeScript, CSS, PDF, ATS ve Canva benzeri düzenleme sistemiyle uyumlu Lebenslauf şablonu
* Kullanılacak framework: RASCEF
* Senin yazacağın prompt:

Sen Electron, React, TypeScript, modern CSS, A4 belge tasarımı, ATS uyumluluğu, görsel editörler ve PDF üretimi konusunda uzman kıdemli bir frontend geliştiricisisin.

“Bewerbung Studio” uygulamam için **Elegant** adlı Lebenslauf şablonunu oluşturacaksın.

Sana verdiğim referans görseli ana tasarım kaynağı olarak kullan. Oluşturulan ekran önizlemesi ve PDF çıktısı; referans görseldeki A4 kompozisyonuna, sütun oranlarına, koyu sağ panel yapısına, profil fotoğrafı konumuna, tipografik hiyerarşiye, renk kullanımına, section çizgilerine ve boşluk sistemine mümkün olduğunca yakın olmalıdır.

Referans görselde bulunan üçüncü taraf marka, logo, “Powered by” metni ve platform adreslerini kopyalama. Footer yalnızca kullanıcıya ait website, sayfa numarası veya isteğe bağlı kısa bilgiler içermelidir.

## 1. Template bilgileri

Şablon adı:

```text
Elegant
```

Açıklama:

```text
Moderne Lebenslauf-Vorlage. Schönes, stilvolles Design, das Ihren Hintergrund und Ihre Leistungen hervorhebt.
```

Template metadata için mevcut type sistemine uyarlanmış şu özellikleri kullan:

```ts
{
  id: "elegant",
  name: "Elegant",
  category: "professional-elegant",
  documentKind: "lebenslauf",
  description:
    "Moderne Lebenslauf-Vorlage. Schönes, stilvolles Design, das Ihren Hintergrund und Ihre Leistungen hervorhebt.",
  atsSupported: true,
  supportsPhoto: true,
  supportsFreeform: true,
  supportsMultiplePages: true,
  defaultOutputMode: "visual"
}
```

Projede mevcut bir template registry varsa yeni ve paralel bir kayıt sistemi oluşturma; mevcut yapıyı genişlet.

## 2. A4 sayfa standardı

Belge kesin olarak şu ölçüde olmalıdır:

```text
210 mm × 297 mm
```

Temel yapı:

```css
@page {
  size: A4;
  margin: 0;
}

.elegant-resume-page {
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

A4 tasarımında `100vh`, `100vw` veya yalnızca piksel tabanlı ölçüler kullanma. Belge koordinatlarında `mm`, tipografide tercihen `pt` kullan.

## 3. Referans yerleşim

Sayfa iki ana dikey alandan oluşmalıdır:

```text
Sol beyaz içerik alanı: yaklaşık %67
Sağ koyu panel: yaklaşık %33
```

Yaklaşık ölçüler:

```text
Sayfa genişliği: 210 mm
Sol alan genişliği: 140 mm
Sağ panel genişliği: 70 mm

Sol içerik padding:
- üst: 14 mm
- sağ: 10 mm
- alt: 13 mm
- sol: 17 mm

Sağ panel padding:
- üst: 13 mm
- sağ: 12 mm
- alt: 13 mm
- sol: 12 mm
```

Sağ panel sayfanın üstünden altına kadar kesintisiz uzanmalıdır.

Ana grid:

```css
.elegant-resume-page {
  display: grid;
  grid-template-columns:
    minmax(0, var(--elegant-main-width))
    var(--elegant-sidebar-width);
}

.elegant-resume-main,
.elegant-resume-sidebar {
  min-width: 0;
}
```

Dar Electron penceresinde sütunları alt alta geçirme. A4 oranını koru, preview zoom veya scroll kullan.

## 4. Design tokenları

Template değerlerini CSS ve componentler içine dağınık biçimde yazma. Merkezi bir TypeScript varsayılan nesnesi oluştur:

```ts
export const elegantTemplateDefaults = {
  page: {
    widthMm: 210,
    heightMm: 297,
  },

  layout: {
    mainWidthMm: 140,
    sidebarWidthMm: 70,

    mainPaddingTopMm: 14,
    mainPaddingRightMm: 10,
    mainPaddingBottomMm: 13,
    mainPaddingLeftMm: 17,

    sidebarPaddingTopMm: 13,
    sidebarPaddingRightMm: 12,
    sidebarPaddingBottomMm: 13,
    sidebarPaddingLeftMm: 12,

    headerMinHeightMm: 38,
    sectionGapMm: 7,
    entryGapMm: 5,
  },

  colors: {
    sidebarBackground: "#264A68",
    sidebarText: "#FFFFFF",
    sidebarMutedText: "#E2E9EF",
    primary: "#0788FF",
    heading: "#3B4247",
    text: "#4B5359",
    mutedText: "#6D757A",
    divider: "#B9BFC3",
    pageBackground: "#FFFFFF",
  },

  typography: {
    fontFamily:
      '"Source Sans 3", "Segoe UI", Arial, Helvetica, sans-serif',
    nameSizePt: 22,
    professionSizePt: 12,
    sectionTitleSizePt: 12,
    sidebarSectionTitleSizePt: 11.5,
    entryTitleSizePt: 11,
    bodySizePt: 8.7,
    smallSizePt: 8,
    lineHeight: 1.3,
  },
} as const;
```

Renk ve ölçüleri referansla karşılaştırarak görsel doğruluk için düzenle.

Kullanıcının design panelinden en az şu değerleri değiştirebilmesini sağla:

* Sağ panel rengi
* Ana vurgu rengi
* Başlık ve gövde renkleri
* Font ailesi
* Font boyutu
* Satır yüksekliği
* Sağ panel genişliği
* Section aralıkları
* Sayfa kenar boşlukları

## 5. Sol ana içerik alanı

Sol beyaz alan şu bölümleri içermelidir:

```text
Profil başlığı
İletişim bilgileri
ERFAHRUNG
AUSBILDUNG
```

Opsiyonel bölümler:

```text
PROJEKTE
ZERTIFIKATE
WEITERBILDUNGEN
VERÖFFENTLICHUNGEN
AUSZEICHNUNGEN
```

Varsayılan section sırası referansla uyumlu olmalıdır.

## 6. Profil başlığı

Sol alanın üst kısmında:

* Vorname
* Nachname
* Berufsbezeichnung
* Spezialisierungen
* Telefon
* E-Mail
* LinkedIn
* Wohnort
* Opsiyonel doğum tarihi ve yeri
* Opsiyonel GitHub veya website

gösterilmelidir.

Örnek:

```text
ISABELLA NEUMANN

Bauingenieurin | Projektmanagement |
Qualitätssicherung

+49 30 12345678
isabella@example.de
linkedin.com/in/isabella-neumann
Berlin, Deutschland
```

İsim:

* Büyük
* Güçlü ama aşırı kalın olmayan
* Koyu gri
* Büyük harfli
* Sol hizalı

olmalıdır.

Meslek unvanı ve uzmanlıklar canlı mavi renkte gösterilmelidir.

Önerilen CSS yapısı:

```css
.elegant-header {
  min-height: var(--elegant-header-height);
  margin-bottom: 10mm;
}

.elegant-header__name {
  margin: 0;
  color: var(--elegant-heading);
  font-size: var(--elegant-name-size);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

.elegant-header__profession {
  max-width: 108mm;
  margin: 2mm 0 3mm;
  color: var(--elegant-primary);
  font-size: var(--elegant-profession-size);
  font-weight: 400;
  line-height: 1.25;
}

.elegant-header__contacts {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5mm 4mm;
  max-width: 110mm;
  color: var(--elegant-muted);
  font-size: var(--elegant-small-size);
  line-height: 1.3;
}
```

Eksik iletişim bilgileri render edilmemeli ve boşluk bırakmamalıdır.

URL alanları PDF içinde tıklanabilir olmalıdır.

## 7. Sol alan section başlıkları

Referans görselde section başlıkları:

* Büyük harfli
* Koyu gri
* Orta font ağırlığı
* Altında ince gri çizgi

olarak görünmektedir.

```css
.elegant-main-section {
  margin-bottom: var(--elegant-section-gap);
}

.elegant-main-section__title {
  margin: 0 0 4mm;
  padding-bottom: 1.5mm;
  border-bottom: 0.3mm solid var(--elegant-divider);
  color: var(--elegant-heading);
  font-size: var(--elegant-section-title-size);
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
  break-after: avoid;
  page-break-after: avoid;
}
```

Section başlığı sayfa sonunda tek başına bırakılmamalıdır.

## 8. Berufserfahrung tasarımı

Her deneyim kaydı şu sırada gösterilmelidir:

1. Pozisyon
2. Tarih
3. Şirket
4. Lokasyon
5. Kısa açıklama
6. Başarı maddeleri

Örnek:

```text
Bauingenieurin                             2017–2021
Bauwelt AG                                 München

Koordination und Überwachung von Bauvorhaben,
Verantwortung für das Budgetmanagement.

• Überwachung von 15+ Bauprojekten ...
• Optimierung von Arbeitsabläufen ...
```

Pozisyon sol tarafta, tarih sağ tarafta olmalıdır.

Şirket canlı mavi, konum koyu gri veya muted renkte gösterilmelidir.

```css
.elegant-experience-entry {
  margin-bottom: var(--elegant-entry-gap);
  break-inside: avoid;
  page-break-inside: avoid;
}

.elegant-experience-entry__heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  column-gap: 5mm;
  align-items: baseline;
}

.elegant-experience-entry__role {
  margin: 0;
  color: var(--elegant-heading);
  font-size: var(--elegant-entry-title-size);
  font-weight: 400;
  line-height: 1.2;
}

.elegant-experience-entry__date {
  color: var(--elegant-text);
  font-size: var(--elegant-body-size);
  white-space: nowrap;
}

.elegant-experience-entry__organization-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  column-gap: 5mm;
  align-items: baseline;
  margin-top: 1mm;
}

.elegant-experience-entry__company {
  color: var(--elegant-primary);
  font-size: var(--elegant-entry-title-size);
  font-weight: 400;
}

.elegant-experience-entry__location {
  color: var(--elegant-text);
  font-size: var(--elegant-body-size);
  text-align: right;
}

.elegant-experience-entry__summary {
  margin: 2mm 0 1mm;
  color: var(--elegant-text);
  font-size: var(--elegant-body-size);
  line-height: var(--elegant-line-height);
}

.elegant-experience-entry__achievements {
  margin: 0;
  padding-left: 4mm;
  color: var(--elegant-text);
  font-size: var(--elegant-body-size);
  line-height: var(--elegant-line-height);
}

.elegant-experience-entry__achievements li {
  margin: 0.5mm 0;
  padding-left: 0.5mm;
}
```

Uzun pozisyon, şirket veya konum bilgilerinde satır düzeni kontrollü biçimde alt satıra geçmelidir. Metni kesme veya `overflow: hidden` kullanma.

## 9. Ausbildung tasarımı

Eğitim alanı deneyim bölümünden daha kompakt olmalıdır.

Görsel sıra:

```text
Abschluss                                  Tarih
Bildungseinrichtung                        Lokasyon
```

Örnek:

```text
Master of Science in Projektmanagement     2012–2014
RWTH Aachen Universität                    Aachen
```

Eğitim kurumu vurgu renginde gösterilmelidir.

Her eğitim kaydı mümkün olduğunca tek parça tutulmalıdır.

## 10. Sağ koyu panel

Sağ panel sayfanın tam yüksekliğini kaplamalıdır.

Varsayılan bölümler:

```text
Profil fotoğrafı
ZUSAMMENFASSUNG
STÄRKEN
FÄHIGKEITEN
SPRACHEN
```

Opsiyonel:

```text
ZERTIFIKATE
WEITERBILDUNGEN
INTERESSEN
REFERENZEN
```

Panel CSS:

```css
.elegant-resume-sidebar {
  position: relative;
  min-height: 297mm;
  padding:
    var(--elegant-sidebar-padding-top)
    var(--elegant-sidebar-padding-right)
    var(--elegant-sidebar-padding-bottom)
    var(--elegant-sidebar-padding-left);
  color: var(--elegant-sidebar-text);
  background: var(--elegant-sidebar-background);
}
```

Sağ panelin arka planı PDF’de eksiksiz basılmalıdır. PDF üretiminde `printBackground: true` kullanılmalıdır.

## 11. Profil fotoğrafı

Fotoğraf panelin üst kısmında yatay olarak ortalanmalıdır.

Referansa yakın başlangıç ölçüsü:

```text
Fotoğraf genişliği: yaklaşık 27 mm
Fotoğraf yüksekliği: yaklaşık 27 mm
Üst mesafe: yaklaşık 0–2 mm
Altındaki ilk section’a mesafe: yaklaşık 17–20 mm
```

Fotoğraf şekli:

* Hafif yuvarlatılmış kare
* Alternatif olarak daire
* En-boy oranı korunmalı

```css
.elegant-sidebar-photo {
  width: 27mm;
  height: 27mm;
  margin: 0 auto 18mm;
  overflow: hidden;
  border-radius: 1.5mm;
  background: rgb(255 255 255 / 12%);
}

.elegant-sidebar-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

Fotoğraf yoksa:

* Boş fotoğraf kutusu PDF’ye girmemeli
* Panelin üstünde gereksiz büyük boşluk oluşmamalı
* İlk section kontrollü biçimde yukarı taşınmalıdır

## 12. Sağ panel section başlıkları

Section başlıkları:

* Beyaz
* Büyük harfli
* Altında açık renkli ince çizgi
* Sol hizalı

olmalıdır.

```css
.elegant-sidebar-section {
  margin-bottom: 9mm;
}

.elegant-sidebar-section__title {
  margin: 0 0 4mm;
  padding-bottom: 1.8mm;
  border-bottom: 0.3mm solid rgb(255 255 255 / 75%);
  color: var(--elegant-sidebar-text);
  font-size: var(--elegant-sidebar-title-size);
  font-weight: 400;
  line-height: 1;
  text-transform: uppercase;
  break-after: avoid;
}
```

## 13. Zusammenfassung

Özet sağ panelde beyaz veya çok açık renkli metinle gösterilmelidir.

```css
.elegant-sidebar-summary {
  margin: 0;
  color: var(--elegant-sidebar-muted);
  font-size: var(--elegant-body-size);
  line-height: 1.4;
  hyphens: auto;
  overflow-wrap: break-word;
}
```

Sabit yükseklik ve metin kesme kullanma.

## 14. Stärken

Her güçlü yön şu yapıyı kullanmalıdır:

* Sol tarafta beyaz ikon
* Sağ tarafta başlık
* Altında kısa kanıt veya açıklama

Örnek:

```text
Zielorientierte Führungskraft

Erfolgreiche Leitung von interdisziplinären Teams,
was zu termingerechten und budgetkonformen Abschlüssen führte.
```

```css
.elegant-strength {
  display: grid;
  grid-template-columns: 6mm minmax(0, 1fr);
  column-gap: 2mm;
  margin-bottom: 6mm;
  break-inside: avoid;
}

.elegant-strength__icon {
  color: var(--elegant-sidebar-text);
  font-size: 11pt;
  line-height: 1;
}

.elegant-strength__title {
  margin: 0 0 1.5mm;
  color: var(--elegant-sidebar-text);
  font-size: 10pt;
  font-weight: 400;
  line-height: 1.2;
}

.elegant-strength__description {
  margin: 0;
  color: var(--elegant-sidebar-muted);
  font-size: var(--elegant-body-size);
  line-height: 1.4;
}
```

Visual modda ikon gösterilebilir. ATS modunda ikon yerine yalnızca açık metin kullanılmalıdır.

## 15. Fähigkeiten

Beceri alanı kısa, sade ve okunabilir olmalıdır.

Gösterim biçimleri:

* Nokta ayraçlı satırlar
* Virgülle ayrılmış liste
* Kategori grupları
* Açık seviye metinleri

Örnek:

```text
Projektmanagement · Qualitätssicherung ·
Budgetmanagement · MS Office · Teamführung ·
Selbstorganisation · Kommunikationsstärke
```

Mevcut knowledge sistemiyle bağlantı kur:

```text
src/features/knowledge/
src/components/knowledge/
src/components/document/KnowledgeSectionRenderer.tsx
```

Çok uzun beceri listesi panel dışına taşmamalıdır.

## 16. Sprachen

Visual görünümde şu yapı kullanılabilir:

```text
Deutsch
Muttersprache                         ● ● ● ● ●

Englisch
Fortgeschritten                      ● ● ● ● ○
```

ATS görünümünde yalnızca açık metin göster:

```text
Deutsch – Muttersprache
Englisch – B2
```

Nokta sistemi içerik modelinde asıl seviye olarak saklanmamalıdır. Veri modelinde CEFR veya açık seviye değeri tutulmalıdır.

## 17. Footer

Referans görseldeki üçüncü taraf marka alanını kopyalama.

Footer’da şu bilgiler desteklenmelidir:

* Website veya portfolio
* Sayfa numarası
* Opsiyonel son güncelleme tarihi

```css
.elegant-resume-footer {
  position: absolute;
  right: calc(var(--elegant-sidebar-width) + 10mm);
  bottom: 7mm;
  left: var(--elegant-main-padding-left);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--elegant-muted);
  font-size: 7.2pt;
}
```

Footer sağ koyu panelin üzerine kontrolsüz taşmamalıdır.

## 18. ATS görünümü

Visual iki sütunlu düzeni otomatik olarak ATS uyumlu kabul etme.

İki output mode destekle:

```ts
type ResumeOutputMode = "visual" | "ats";
```

ATS modunda:

* Tek sütunlu yapı kullan
* Sağ koyu paneli kaldır
* Profil fotoğrafını varsayılan olarak gizle
* Section içeriklerini mantıksal DOM sırasına göre render et
* İkonları kaldır
* Dil noktalarını açık metne dönüştür
* Tablo kullanma
* Metni seçilebilir bırak
* Dekoratif renk bloklarına bağımlı bilgi sunma
* Standart Almanca başlıklar kullan

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

Visual ve ATS için iki ayrı içerik kaydı oluşturma. Aynı ResumeData modeli iki renderer tarafından kullanılmalıdır.

## 19. Canva benzeri düzenleme

Her bölüm bağımsız editör kartı olmalıdır:

```text
elegant.header
elegant.experience
elegant.education
elegant.photo
elegant.summary
elegant.strengths
elegant.skills
elegant.languages
elegant.footer
```

Kullanıcı:

* Kartı seçebilmeli
* Fareyle taşıyabilmeli
* Sekiz tutamaçla büyütüp küçültebilmeli
* Kartı gizleyebilmeli
* Kilitleyebilmeli
* Katman sırasını değiştirebilmeli
* X, Y, genişlik ve yükseklik değerlerini elle girebilmeli
* Kartı başka sayfaya taşıyabilmeli
* Template varsayılan düzenine dönebilmelidir

Yerleşim CSS stringleri olarak değil, A4 koordinatlarıyla saklanmalıdır:

```ts
interface DocumentElementLayout {
  elementId: string;
  templateId: "elegant";
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

Preview zoom değeri gerçek koordinatlara yazılmamalıdır.

## 20. Flow ve freeform modu

İki çalışma modu destekle:

```ts
type DocumentLayoutMode = "flow" | "freeform";
```

### Flow modu

* Varsayılan mod
* İçerik uzunluğuna göre otomatik büyüme
* Otomatik pagination
* Experience ve education kayıtlarını mümkün olduğunca bölmeme
* Section başlığını sayfa sonunda yalnız bırakmama
* Sol ve sağ alan içeriğini kontrollü yönetme

### Freeform modu

* Kullanıcı kartları manuel taşır
* Kartlar sabit A4 koordinatlarıyla çalışır
* Sayfa dışına taşma engellenir
* Çakışma uyarısı gösterilir
* Otomatik pagination uygulanmaz
* Kullanıcı yeni sayfa ekler veya kartı başka sayfaya taşır

## 21. Çok sayfalı davranış

İçerik bir sayfaya sığmadığında:

* İkinci gerçek A4 sayfası oluştur
* İlk sayfadaki büyük profil header’ını tekrar etme
* İkinci sayfada sadeleştirilmiş isim ve meslek başlığı kullan
* Deneyim kaydını mümkün olduğunca bölme
* Section başlığını tek başına bırakma
* Sağ panelin ikinci sayfada nasıl devam edeceğini merkezi bir ayarla yönet

Desteklenebilecek seçenek:

```ts
type SidebarContinuationMode =
  | "repeat"
  | "compact"
  | "first-page-only";
```

Varsayılan davranış:

```text
compact
```

İkinci sayfada panel tekrarlanıyorsa profil fotoğrafı yeniden gösterilmemelidir.

## 22. Component yapısı

Şablonu tek bir büyük component içinde oluşturma.

Önerilen yapı:

```text
src/components/resume/templates/elegant/
├── ElegantResume.tsx
├── ElegantPage.tsx
├── ElegantHeader.tsx
├── ElegantMainContent.tsx
├── ElegantSidebar.tsx
├── ElegantPhoto.tsx
├── ElegantExperienceSection.tsx
├── ElegantEducationSection.tsx
├── ElegantSummarySection.tsx
├── ElegantStrengthsSection.tsx
├── ElegantSkillsSection.tsx
├── ElegantLanguagesSection.tsx
├── ElegantFooter.tsx
├── elegant.defaults.ts
├── elegant.layout.ts
├── elegant.types.ts
└── elegant.css
```

Mevcut ortak componentler varsa tekrar yazma:

* Experience renderer
* Education renderer
* KnowledgeSectionRenderer
* Language renderer
* Contact renderer
* Photo renderer
* EditableDocumentElement
* DocumentBackgroundLayer
* Pagination utilities
* Design token sistemi
* Template registry

Template-specific componentler yalnızca Elegant tasarım farklarını yönetmelidir.

## 23. Template dosyaları

Mevcut proje yapısında şu dosyalar bulunmaktadır:

```text
public/templates/Elegant_Lebenslauf_ATS.docx
public/templates/Elegant_Lebenslauf_Muster.docx
public/templates/Elegant_Lebenslauf_Muster.preview.png
```

Bu mevcut dosyaları ve `electron/templates/` altındaki filename, scanner, validator, mapper ve repository servislerini kullan.

Aynı template için ikinci bir adlandırma standardı oluşturma.

Development ve paketlenmiş Windows uygulamasında:

* ATS DOCX
* Muster DOCX
* Preview PNG

dosyalarının bulunabildiğini test et.

## 24. Print ve PDF stilleri

```css
@media screen {
  .elegant-resume-page {
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

  .elegant-resume-page {
    width: 210mm;
    height: 297mm;
    min-height: 297mm;
    margin: 0;
    overflow: hidden;
    box-shadow: none;
    break-after: page;
    page-break-after: always;
  }

  .elegant-resume-page:last-child {
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
* Profil fotoğrafının yüklenmesini bekle
* `printBackground: true` kullan
* Preview zoom transformunu kaldır
* Selection ve resize araçlarını gizle
* Her sayfanın gerçek A4 ölçüsünde olduğunu doğrula

## 25. Görsel doğruluk süreci

İlk uygulamadan sonra referans görsel ile oluşturulan şablonu karşılaştır.

Şu değerleri tek tek kontrol et:

* Sağ panel genişliği
* Panel rengi
* Profil fotoğrafı ölçüsü ve konumu
* Sol header’ın üst ve sol boşlukları
* İsim font boyutu ve ağırlığı
* Meslek unvanının satır kırılması
* İletişim satırlarının spacing değeri
* Erfahrung bölümünün başlangıç yüksekliği
* Section çizgilerinin uzunluğu ve kalınlığı
* Deneyim kayıtları arasındaki dikey boşluk
* Sağ panel section aralıkları
* Sidebar metin satır yüksekliği
* Footer konumu
* A4 alt sınırında kalan beyaz alan

Gerekirse design tokenlarını birkaç iterasyonda düzelt. Sonuç yalnızca benzer bir tema değil, referansla belirgin biçimde eşleşen bir kompozisyon olmalıdır.

## 26. Test gereksinimleri

Şu durumları test et:

1. Elegant template metadata kaydı
2. Mevcut Elegant DOCX ve preview dosyalarının eşleştirilmesi
3. Varsayılan sağ panel genişliği
4. Panel renginin design ayarıyla değişmesi
5. Fotoğraflı kullanım
6. Fotoğrafsız kullanım
7. Uzun isim
8. Uzun meslek unvanı
9. Eksik iletişim bilgileri
10. Uzun Zusammenfassung
11. Çok sayıda Stärke
12. Uzun Fähigkeiten listesi
13. Birden fazla dil
14. Üç veya daha fazla Berufserfahrung kaydı
15. Uzun şirket ve lokasyon adları
16. Tek sayfalık çıktı
17. İki sayfalık çıktı
18. Sidebar continuation modları
19. Visual ve ATS renderer farkları
20. ATS doğrusal DOM sırası
21. Kart sürükleme
22. Kart resize
23. Kart kilitleme ve gizleme
24. Layout reset
25. Preview zoom altında koordinatların değişmemesi
26. PDF’de editör araçlarının görünmemesi
27. PDF’de sağ panel arka planının basılması
28. Uygulama yeniden açıldığında layout’un geri yüklenmesi
29. Setup ve Portable sürümde template kaynaklarının bulunması
30. Template değişiminde ResumeData içeriğinin korunması

## 27. Çalışma sırası

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

Mevcut Elegant DOCX ve preview dosyalarının sistem tarafından nasıl algılandığını belirle.

### Aşama 2: Referans ölçüm planı

Referans görseldeki:

* A4 oranını
* Sağ panel genişliğini
* Header yüksekliğini
* Fotoğraf konumunu
* Section başlangıçlarını
* Footer konumunu

milimetre cinsinden yaklaşık olarak çıkar.

### Aşama 3: Metadata ve design tokenları

* Elegant template kaydını oluştur veya güncelle
* Varsayılan renkleri tanımla
* Layout ölçülerini tanımla
* Section sırasını belirle

### Aşama 4: React componentleri

* Page
* Header
* Main content
* Sidebar
* Sectionlar
* Footer

componentlerini oluştur.

### Aşama 5: Tam CSS

Eksiksiz ve production-ready `elegant.css` dosyasını oluştur.

### Aşama 6: Editör entegrasyonu

* Selection
* Drag
* Resize
* Lock
* Hide
* Layer
* Layout reset

özelliklerini bağla.

### Aşama 7: ATS, pagination ve PDF

* Tek sütun ATS renderer
* Çok sayfalı çıktı
* Sidebar continuation
* PDF background
* Preview/PDF tutarlılığı

özelliklerini tamamla.

### Aşama 8: Görsel karşılaştırma

Referans ile üretilen önizlemeyi karşılaştır ve ölçü, spacing, font ve renk farklılıklarını gider.

Her aşama tamamlandıktan sonra sonraki aşamaya geçmeden bekle.

## 28. Kod çıktı formatı

Her dosya için şu formatı kullan:

```text
Dosya: src/ilgili/dosya.tsx
İşlem: Güncellenecek | Yeni oluşturulacak | Silinecek
Amaç: Değişikliğin teknik açıklaması
```

Ardından eksiksiz ve doğrudan kullanılabilir kodu ver.

Kurallar:

* Eksik import bırakma
* Hayali type, service veya component üretme
* Pseudocode yazma
* “Mevcut kod burada kalacak” gibi eksik blok kullanma
* JSX ve CSS class adlarını eşleştir
* Mevcut ortak rendererları gerekçesiz kopyalama
* Demo veriyi gerçek kullanıcı verisi olarak saklama
* Üçüncü taraf marka veya logo kopyalama
* Visual iki sütun düzenini otomatik ATS uyumlu kabul etme
* `dist-electron`, `artifacts`, `release` veya `windows-release` dosyalarını düzenleme
* Ben istemeden Tailwind, Bootstrap veya ağır UI framework’ü ekleme
* Mevcut projeyi baştan yazma

## 29. Beklenen cevap formatı

Her cevapta şu başlıkları kullan:

### 1. Referans görsel analizi

### 2. A4 ölçüm ve yerleşim planı

### 3. Mevcut projeden yeniden kullanılacak yapılar

### 4. Elegant template mimarisi

### 5. Değiştirilecek dosyalar

### 6. Design tokenları

### 7. React ve TypeScript kodları

### 8. Tam CSS kodu

### 9. ATS, pagination ve PDF değişiklikleri

### 10. Testler

### 11. PowerShell komutları

### 12. Görsel karşılaştırma kontrol listesi

İlk olarak yalnızca **Aşama 1 ve Aşama 2’yi** gerçekleştir. Mevcut proje yapısını incele, `public/templates` altında bulunan Elegant dosyalarının mevcut servislerle nasıl eşleştiğini belirle ve referans görselin A4 alanlarını milimetre bazında analiz et. Henüz mevcut kodla doğrulanmamış component, import veya API üretme.
