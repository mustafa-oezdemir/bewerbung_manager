![Eine zweispaltige Lebenslauf Vorlage, ideal für Personen mit vielen Erfahrungen und Fähigkeiten. Mit blauem Akzent.](https://cdn.enhancv.com/predefined-examples/CHyBOXyZ9L7HLKZcR6stqJkZUxOR0gYxPRF9gJ7n/image.png)


* Konu: Referans görseldeki iki sütunlu “Stilvoll” Lebenslauf şablonunun oluşturulması
* İstenilen çıktı: A4 ölçüsünde; referanstaki yeşil vurgu rengi, geniş sağ içerik alanı, dar sol bilgi sütunu, üst profil başlığı, geometrik arka plan, profil fotoğrafı ve bölüm düzenini yüksek görsel doğrulukla yeniden üreten; React, TypeScript, CSS, Electron, PDF, ATS ve serbest yerleşim sistemiyle uyumlu Lebenslauf şablonu
* Kullanılacak framework: RASCEF
* Senin yazacağın prompt:

Sen Electron, React, TypeScript, modern CSS, A4 belge tasarımı, ATS uyumluluğu, PDF üretimi ve görsel karşılaştırmalı frontend geliştirme konusunda uzman kıdemli bir yazılım geliştiricisisin.

“Bewerbung Studio” uygulamam için **Stilvoll** adlı Lebenslauf şablonunu oluşturacaksın.

Sana verdiğim referans görsel ana tasarım kaynağıdır. Oluşturacağın ekran önizlemesi ve PDF çıktısı; referanstaki A4 kompozisyonuna, sütun oranlarına, yeşil vurgu renklerine, üst profil alanına, fotoğraf konumuna, geometrik arka plan desenine, bölüm çizgilerine, tipografiye ve boşluklara mümkün olduğunca yakın olmalıdır.

Sonuç yalnızca benzer renkler kullanan genel bir tasarım olmamalıdır. Referans görseldeki ölçüleri, hizalamaları ve bilgi hiyerarşisini analiz ederek görsel olarak belirgin biçimde eşleşen production kalitesinde bir şablon oluştur.

Referanstaki üçüncü taraf logo, marka, website, “Powered by” veya benzeri platform metinlerini kopyalama. Footer yalnızca kullanıcıya ait website, portfolio, sayfa numarası veya isteğe bağlı belge bilgilerini içermelidir.

## 1. Template bilgileri

Kullanıcı arayüzündeki şablon adı:

```text
Stilvoll
```

Teknik kimlik:

```text
stilvoll
```

Açıklama:

```text
Eine stilvolle, übersichtliche Lebenslaufvorlage für Professionals mit umfangreichen Fähigkeiten, Projekten und Berufserfahrung. Ideal für Softwareentwickler, Datenwissenschaftler und andere qualifizierte Fachkräfte.
```

Mevcut template metadata modeline uyarlanacak hedef özellikler:

```ts
{
  id: "stilvoll",
  name: "Stilvoll",
  category: "modern-professional",
  documentKind: "lebenslauf",
  description:
    "Eine stilvolle, übersichtliche Lebenslaufvorlage für Professionals mit umfangreichen Fähigkeiten, Projekten und Berufserfahrung.",
  atsSupported: true,
  supportsPhoto: true,
  supportsFreeform: true,
  supportsMultiplePages: true,
  defaultOutputMode: "visual"
}
```

Projede mevcut template registry, type veya store sistemi varsa ikinci bir yapı oluşturma. Var olan sistemi genişlet.

## 2. Template kaynakları

Mevcut filename service standardını inceleyerek şu dosyaların karşılığını oluştur:

```text
public/templates/Stilvoll_Lebenslauf_ATS.docx
public/templates/Stilvoll_Lebenslauf_Muster.docx
public/templates/Stilvoll_Lebenslauf_Muster.preview.png
```

Aşağıdaki servislerle uyumlu çalış:

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

Development, Setup ve Portable sürümlerde DOCX ve preview kaynaklarının bulunabildiğini test et.

## 3. A4 sayfa standardı

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

.stilvoll-page {
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

A4 tasarımında `100vh`, `100vw` veya yalnızca piksel ölçüleri kullanma. Belge konumlarında `mm`, tipografide tercihen `pt` kullan.

## 4. Referans görselin yerleşimi

Sayfa şu ana bölgelerden oluşmalıdır:

```text
1. Tam genişlikte üst profil alanı
2. Dar sol bilgi sütunu
3. Geniş sağ kariyer sütunu
4. Alt footer
5. Sağ üst ve sağ orta alanda dekoratif geometrik desen
```

Referansa yakın başlangıç ölçüleri:

```text
Sayfa genişliği: 210 mm
Sayfa yüksekliği: 297 mm

Sol dış boşluk: 15 mm
Sağ dış boşluk: 15 mm
Üst boşluk: 14 mm
Alt güvenli boşluk: 13 mm

Header yüksekliği: yaklaşık 34–38 mm
Ana içerik başlangıcı: yaklaşık 48–51 mm

Kullanılabilir içerik genişliği: yaklaşık 180 mm
Sol sütun genişliği: yaklaşık 54 mm
Sütun aralığı: yaklaşık 11 mm
Sağ sütun genişliği: yaklaşık 115 mm
```

Sütun oranı yaklaşık:

```text
Sol sütun: %30
Sağ sütun: %64
Sütun boşluğu: %6
```

olmalıdır.

Bu ölçüleri merkezi template tokenları olarak tanımla. CSS ve JSX içine tekrarlanan magic numberlar yazma.

## 5. Design tokenları

Mevcut `documentDesign.ts` yapısını kullan veya uyumlu biçimde genişlet.

Başlangıç değerleri:

```ts
export const stilvollTemplateDefaults = {
  page: {
    widthMm: 210,
    heightMm: 297,
    marginTopMm: 14,
    marginRightMm: 15,
    marginBottomMm: 13,
    marginLeftMm: 15,
  },

  layout: {
    headerHeightMm: 36,
    contentTopMm: 50,
    leftColumnWidthMm: 54,
    columnGapMm: 11,
    rightColumnWidthMm: 115,
    sectionGapMm: 7,
    entryGapMm: 5,
  },

  colors: {
    primary: "#36B873",
    primaryDark: "#075E50",
    primarySoft: "#D9F2E5",
    heading: "#0A5D52",
    text: "#465156",
    mutedText: "#6D777C",
    divider: "#AEB8B5",
    pattern: "#DCE2DF",
    iconBackground: "#F1F3F2",
    pageBackground: "#FFFFFF",
    inactiveLevel: "#DDE2E0",
  },

  typography: {
    fontFamily:
      '"Source Sans 3", "Segoe UI", Arial, Helvetica, sans-serif',
    nameSizePt: 23,
    professionSizePt: 12,
    sectionTitleSizePt: 9.5,
    entryTitleSizePt: 11,
    bodySizePt: 8.5,
    smallSizePt: 7.8,
    lineHeight: 1.32,
  },
} as const;
```

Renk ve ölçüleri referans önizlemeyle karşılaştırarak gerektiğinde düzelt.

Kullanıcı tasarım panelinden şu değerleri değiştirebilmelidir:

* Ana yeşil renk
* Koyu yeşil başlık rengi
* Gövde metni rengi
* Geometrik desen rengi ve opacity değeri
* Font ailesi
* Font boyutu
* Satır yüksekliği
* Sütun genişlikleri
* Sütun aralığı
* Section aralıkları
* Sayfa kenar boşlukları

## 6. Üst profil alanı

Header tam sayfa genişliğini kullanmalıdır.

Sol tarafta:

* Vorname
* Nachname
* Berufsbezeichnung
* Spezialisierungen
* Telefon
* E-posta
* LinkedIn
* Wohnort
* Opsiyonel doğum tarihi
* Opsiyonel website veya GitHub

Sağ tarafta:

* Profil fotoğrafı

Örnek yapı:

```text
SEBASTIAN WAGNER

Pflegefachmann | Notfallmedizin | Patientenbetreuung

+49 30 12345678 · sebastian@example.de · linkedin.com
· Berlin · Geb. 01.03.1990
```

İsim:

* Büyük harfli
* Koyu yeşil
* İnce veya orta font ağırlığında
* Sol hizalı
* Uzun isimlerde kontrollü satır kırmalı

Meslek unvanı:

* Canlı yeşil
* İsimden daha küçük
* Tek veya iki satıra geçebilmeli

İletişim bilgileri:

* Küçük gri metin
* Yatay ve sarılabilen yapı
* Eksik alanlarda gereksiz ikon veya ayraç oluşturmamalı
* URL’ler PDF içinde tıklanabilir olmalı

Önerilen yapı:

```css
.stilvoll-header {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 28mm;
  column-gap: 10mm;
  align-items: start;
  min-height: var(--stilvoll-header-height);
}

.stilvoll-header__name {
  margin: 0;
  color: var(--stilvoll-heading);
  font-size: var(--stilvoll-name-size);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.015em;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

.stilvoll-header__profession {
  margin: 2mm 0 2.5mm;
  color: var(--stilvoll-primary);
  font-size: var(--stilvoll-profession-size);
  font-weight: 400;
  line-height: 1.2;
}

.stilvoll-header__contacts {
  display: flex;
  flex-wrap: wrap;
  gap: 1mm 3.5mm;
  color: var(--stilvoll-muted);
  font-size: var(--stilvoll-small-size);
  line-height: 1.25;
}
```

## 7. Profil fotoğrafı

Fotoğraf sağ üstte, hafif yuvarlatılmış kare olarak gösterilmelidir.

Başlangıç ölçüsü:

```text
Yaklaşık 25–27 mm genişlik
Yaklaşık 25–27 mm yükseklik
```

```css
.stilvoll-header__photo {
  width: 26mm;
  height: 26mm;
  justify-self: end;
  overflow: hidden;
  border-radius: 1.5mm;
  background: #e8ebea;
}

.stilvoll-header__photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

Fotoğraf yoksa:

* Boş kutu gösterilmemeli
* Header tek sütuna genişlemeli
* PDF’ye placeholder girmemeli

## 8. Geometrik arka plan

Referans görselde üst ve sağ tarafta açık gri geometrik chevron veya zikzak desenleri bulunmaktadır.

Bu desen:

* Header arkasında başlamalı
* Sağ sütunun arka planında aşağı doğru devam edebilmeli
* Düşük kontrastlı olmalı
* Metnin okunabilirliğini bozmamalı
* İçerik üstünde görünmemeli
* PDF’de aynı konumda basılmalı
* ATS modunda kaldırılmalı

Mevcut:

```text
src/components/document/DocumentBackgroundLayer.tsx
```

üzerinden ayrı katmanda render et.

Özgün ve optimize edilmiş SVG kullan. Referanstaki deseni birebir kopyalama; aynı geometrik ritmi taşıyan yeni bir desen oluştur.

## 9. Ana içerik

Ana içerik iki sütunlu olmalıdır:

```css
.stilvoll-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns:
    minmax(0, var(--stilvoll-left-column-width))
    minmax(0, var(--stilvoll-right-column-width));
  column-gap: var(--stilvoll-column-gap);
  align-items: start;
}

.stilvoll-column {
  min-width: 0;
}
```

Dar Electron penceresinde sütunları alt alta geçirme. A4 oranını koru; preview zoom ve scroll kullan.

## 10. Sol sütun

Varsayılan bölümler:

```text
ZUSAMMENFASSUNG
STÄRKEN
SPRACHEN
```

Softwareentwickler veya Datenwissenschaftler profillerinde opsiyonel olarak:

```text
FÄHIGKEITEN
TECHNOLOGIEN
ZERTIFIKATE
```

eklenebilmelidir.

### Zusammenfassung

Sol sütunda kompakt profesyonel özet gösterilmelidir.

Kurallar:

* Yaklaşık 7–12 kısa satır
* Sabit yüksekliğe sıkıştırılmamalı
* `overflow: hidden` kullanılmamalı
* Uzun içerik flow modunda alanı büyütmeli
* Gövde metni koyu gri olmalı

### Stärken

Her güçlü yön:

* Sol tarafta açık gri dairesel ikon alanı
* Yeşil ikon
* Sağ tarafta koyu yeşil başlık
* Altında kısa kanıt veya açıklama

içermelidir.

Örnek:

```text
Patientenfokus

Stets im Interesse der Patienten handelnd, mit über
6 Jahren Erfahrung in der Optimierung der Betreuung.
```

```css
.stilvoll-strength {
  display: grid;
  grid-template-columns: 9mm minmax(0, 1fr);
  column-gap: 3mm;
  margin-bottom: 5mm;
  break-inside: avoid;
}

.stilvoll-strength__icon {
  display: grid;
  place-items: center;
  width: 8mm;
  height: 8mm;
  border-radius: 50%;
  color: var(--stilvoll-primary);
  background: var(--stilvoll-icon-background);
}

.stilvoll-strength__title {
  margin: 0 0 1mm;
  color: var(--stilvoll-heading);
  font-size: 9.5pt;
  font-weight: 500;
}

.stilvoll-strength__description {
  margin: 0;
  color: var(--stilvoll-text);
  font-size: var(--stilvoll-body-size);
  line-height: var(--stilvoll-line-height);
}
```

### Sprachen

Referans görünümü:

```text
Deutsch       Muttersprache       ━━━━━
Englisch      Erweitert           ━━━□□
```

Visual modda kısa yatay seviye çubukları kullanılabilir.

Veri modelinde çubuk genişliği değil, CEFR veya açık seviye değeri saklanmalıdır.

ATS görünümünde:

```text
Deutsch – Muttersprache
Englisch – B2
```

kullanılmalıdır.

## 11. Sağ sütun

Varsayılan bölümler:

```text
ERFAHRUNG
AUSBILDUNG
```

Softwareentwickler ve Datenwissenschaftler için opsiyonel bölümler:

```text
PROJEKTE
FÄHIGKEITEN
TECHNOLOGIEN
ZERTIFIKATE
WEITERBILDUNGEN
VERÖFFENTLICHUNGEN
```

Kullanıcı section sırasını değiştirebilmeli ve bölümleri gizleyebilmelidir.

## 12. Section başlıkları

Referans görselde section başlıkları:

* Küçük veya orta boy
* Gri
* Büyük harfli
* Altında ince gri çizgi
* Sol hizalı

olarak görünmektedir.

```css
.stilvoll-section {
  margin-bottom: var(--stilvoll-section-gap);
}

.stilvoll-section__title {
  margin: 0 0 3.5mm;
  padding-bottom: 1mm;
  border-bottom: 0.3mm solid var(--stilvoll-divider);
  color: var(--stilvoll-muted);
  font-size: var(--stilvoll-section-title-size);
  font-weight: 400;
  line-height: 1;
  text-transform: uppercase;
  break-after: avoid;
  page-break-after: avoid;
}
```

Section başlığı sayfa sonunda tek başına bırakılmamalıdır.

## 13. Berufserfahrung

Her deneyim kaydı şu sırayı kullanmalıdır:

```text
Pozisyon
Şirket                    Tarih · Lokasyon
Kısa açıklama
Başarı maddeleri
```

Örnek:

```text
Pflegefachmann Notfallmedizin
Universitätsklinikum Düsseldorf      2017–heute · Düsseldorf
```

Renk düzeni:

* Pozisyon: koyu yeşil
* Şirket: canlı yeşil
* Tarih ve lokasyon: gri
* Gövde: koyu gri

```css
.stilvoll-experience-entry {
  margin-bottom: var(--stilvoll-entry-gap);
  break-inside: avoid;
  page-break-inside: avoid;
}

.stilvoll-experience-entry__role {
  margin: 0;
  color: var(--stilvoll-heading);
  font-size: var(--stilvoll-entry-title-size);
  font-weight: 400;
  line-height: 1.15;
}

.stilvoll-experience-entry__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 1mm 4mm;
  margin: 1mm 0 1.5mm;
}

.stilvoll-experience-entry__company {
  margin-right: auto;
  color: var(--stilvoll-primary);
  font-size: 9.8pt;
  font-weight: 400;
}

.stilvoll-experience-entry__date-location {
  color: var(--stilvoll-muted);
  font-size: var(--stilvoll-small-size);
}

.stilvoll-experience-entry__summary {
  margin: 0 0 1mm;
  color: var(--stilvoll-text);
  font-size: var(--stilvoll-body-size);
  line-height: var(--stilvoll-line-height);
}

.stilvoll-experience-entry__achievements {
  margin: 0;
  padding-left: 4mm;
  color: var(--stilvoll-text);
  font-size: var(--stilvoll-body-size);
  line-height: var(--stilvoll-line-height);
}
```

Uzun şirket, pozisyon veya lokasyon bilgileri kesilmemeli; kontrollü şekilde alt satıra geçmelidir.

## 14. Ausbildung

Eğitim bölümü deneyim yapısının daha kompakt sürümünü kullanmalıdır.

Örnek:

```text
Master in Klinischer Pflege
Hochschule für Gesundheit Bochum      2009–2011 · Bochum
```

Derece koyu yeşil, kurum canlı yeşil, tarih ve konum gri olmalıdır.

## 15. Projeler ve teknik yetenekler

Bu template özellikle çok sayıda proje ve yeteneğe sahip kullanıcılar için uygun olmalıdır.

### Projekte

Her proje:

* Projektname
* Rolle
* Zeitraum
* Kısa açıklama
* Kullanılan teknolojiler
* Ölçülebilir sonuç
* GitHub veya canlı bağlantı

alanlarını desteklemelidir.

### Fähigkeiten ve Technologien

Mevcut knowledge sistemiyle bağlantı kur:

```text
src/features/knowledge/
src/components/knowledge/
src/components/document/KnowledgeSectionRenderer.tsx
```

Gösterim seçenekleri:

* Kategori bazlı liste
* Kompakt etiketler
* Nokta ayraçlı satırlar
* Açık seviye metinleri

ATS görünümünde grafik veya belirsiz seviye çubuğu yerine açık metin kullanılmalıdır.

## 16. Footer

Footer sade ve markasız olmalıdır.

Sol tarafta:

```text
portfolio.example.com
```

Sağ tarafta:

```text
Seite 1 / 2
```

Desteklenen içerik:

* Website
* Portfolio
* Sayfa numarası
* Opsiyonel güncelleme tarihi

Üçüncü taraf logo, platform adı veya “Powered by” metni ekleme.

## 17. Canva benzeri serbest düzenleme

Her bölüm bağımsız editör kartı olmalıdır:

```text
stilvoll.header
stilvoll.summary
stilvoll.strengths
stilvoll.languages
stilvoll.experience
stilvoll.education
stilvoll.projects
stilvoll.skills
stilvoll.background
stilvoll.footer
```

Kullanıcı:

* Kartı seçebilmeli
* Fareyle taşıyabilmeli
* Sekiz resize tutamacıyla büyütüp küçültebilmeli
* Kartı kilitleyebilmeli
* Gizleyebilmeli
* Katman sırasını değiştirebilmeli
* X, Y, genişlik ve yükseklik değerlerini elle girebilmeli
* Kartı başka sayfaya taşıyabilmeli
* Template varsayılan düzenine dönebilmelidir

Layout değerlerini CSS transform stringi olarak saklama.

```ts
interface DocumentElementLayout {
  elementId: string;
  templateId: "stilvoll";
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

## 18. Flow ve freeform modu

İki layout modu destekle:

```ts
type DocumentLayoutMode = "flow" | "freeform";
```

### Flow modu

* Varsayılan kullanım
* İçerik uzunluğuna göre büyüyen sectionlar
* Otomatik pagination
* Deneyim ve proje kayıtlarını mümkün olduğunca bölmeme
* Section başlığını sayfa sonunda yalnız bırakmama
* Sol ve sağ sütun çakışmasını engelleme

### Freeform modu

* Kullanıcı kartları manuel taşır
* Kartları büyütüp küçültür
* Otomatik pagination uygulanmaz
* A4 sınırı dışına taşma engellenir
* Çakışma uyarısı gösterilir
* Kullanıcı yeni sayfa ekleyebilir

## 19. ATS görünümü

Visual iki sütunlu düzeni otomatik olarak ATS uyumlu kabul etme.

İki çıktı modu kullan:

```ts
type ResumeOutputMode = "visual" | "ats";
```

ATS görünümünde:

* Tek sütun kullan
* Profil fotoğrafını varsayılan olarak gizle
* Geometrik arka planı kaldır
* İkonları kaldır
* Dil seviye çubuklarını açık metne dönüştür
* Mantıksal DOM sırası kullan
* Mutlak konumlandırmaya bağlı bilgi sunma
* Tablo kullanma
* Metni seçilebilir ve aranabilir bırak

ATS sırası:

```text
1. Persönliche Daten
2. Zusammenfassung
3. Berufserfahrung
4. Projekte
5. Ausbildung
6. Kenntnisse
7. Sprachen
8. Stärken
9. Zertifikate
10. Weiterbildungen
```

Visual ve ATS görünümü aynı `ResumeData` modelini kullanmalıdır.

## 20. Çok sayfalı davranış

İçerik ilk sayfaya sığmazsa:

* İkinci gerçek A4 sayfası oluştur
* Büyük profil header’ını tekrar etme
* İkinci sayfada sade isim ve meslek başlığı kullan
* Deneyim veya proje kaydını mümkün olduğunca bölme
* Section başlığını tek başına bırakma
* Geometrik deseni yalnızca ilk sayfada veya tüm sayfalarda kullanma seçeneği sun
* Footer sayfa numarasını güncelle
* Fontları aşırı küçültme
* Belgeyi `transform: scale()` ile tek sayfaya sıkıştırma

## 21. Component mimarisi

Şablonu tek büyük component içinde oluşturma.

Önerilen yapı:

```text
src/components/resume/templates/stilvoll/
├── StilvollResume.tsx
├── StilvollPage.tsx
├── StilvollHeader.tsx
├── StilvollBackground.tsx
├── StilvollLeftColumn.tsx
├── StilvollMainColumn.tsx
├── StilvollSectionHeading.tsx
├── StilvollSummarySection.tsx
├── StilvollStrengthsSection.tsx
├── StilvollLanguagesSection.tsx
├── StilvollExperienceSection.tsx
├── StilvollEducationSection.tsx
├── StilvollProjectsSection.tsx
├── StilvollSkillsSection.tsx
├── StilvollFooter.tsx
├── stilvoll.defaults.ts
├── stilvoll.layout.ts
├── stilvoll.types.ts
└── stilvoll.css
```

Mevcut ortak rendererlar varsa tekrar yazma:

* Experience renderer
* Education renderer
* Project renderer
* Language renderer
* KnowledgeSectionRenderer
* Contact renderer
* Photo renderer
* EditableDocumentElement
* DocumentBackgroundLayer
* Pagination utilities
* Design token sistemi
* Template registry

Template-specific componentler yalnızca Stilvoll tasarım farklarını yönetmelidir.

## 22. Print ve PDF

```css
@media screen {
  .stilvoll-page {
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

  .stilvoll-page {
    width: 210mm;
    height: 297mm;
    min-height: 297mm;
    margin: 0;
    overflow: hidden;
    box-shadow: none;
    break-after: page;
    page-break-after: always;
  }

  .stilvoll-page:last-child {
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

PDF üretmeden önce:

* Fontların yüklenmesini bekle
* Profil fotoğrafının yüklenmesini bekle
* Geometrik SVG’nin yüklenmesini bekle
* `printBackground: true` kullan
* Preview zoom transformunu kaldır
* Selection, resize ve guide araçlarını gizle
* Her sayfanın gerçek A4 ölçüsünde olduğunu doğrula

## 23. Görsel doğruluk süreci

İlk uygulamadan sonra referans görselle oluşturulan önizlemeyi yan yana karşılaştır.

Şunları tek tek ölç:

* Header’ın üst ve sol başlangıcı
* İsim font boyutu ve ağırlığı
* Meslek unvanının yeşil tonu
* İletişim satırlarının konumu
* Profil fotoğrafının ölçüsü
* Geometrik desenin konumu ve opacity değeri
* Ana içerik başlangıç yüksekliği
* Sol ve sağ sütun genişlikleri
* Sütun aralığı
* Section çizgilerinin kalınlığı
* Sol özet metninin satır yüksekliği
* Strength ikonlarının çapı
* Experience kayıtları arasındaki boşluk
* Gövde font boyutu
* Dil çubuklarının uzunluğu
* Ausbildung başlangıç noktası
* Footer konumu
* Sayfanın altında kalan boşluk

İlk sonuç referanstan belirgin biçimde farklıysa ölçüleri, spacing değerlerini, fontları ve renk tokenlarını yeniden düzenle.

## 24. Test gereksinimleri

Şu durumları test et:

1. Stilvoll metadata kaydı
2. ATS, Muster ve preview dosyalarının eşleşmesi
3. Varsayılan sütun oranları
4. Profil fotoğraflı kullanım
5. Fotoğrafsız kullanım
6. Uzun isim
7. Uzun meslek unvanı
8. Eksik iletişim bilgileri
9. Uzun Zusammenfassung
10. Çok sayıda Stärke
11. Birden fazla dil
12. Çok sayıda teknik yetenek
13. Birden fazla proje
14. Üç veya daha fazla Berufserfahrung kaydı
15. Uzun şirket, pozisyon ve lokasyon bilgileri
16. Tek sayfalık çıktı
17. İki sayfalık çıktı
18. Visual ve ATS görünüm farkları
19. ATS doğrusal DOM sırası
20. Kart sürükleme
21. Kart resize
22. Kart kilitleme ve gizleme
23. Layout reset
24. Preview zoom altında koordinatların değişmemesi
25. PDF’de editör araçlarının görünmemesi
26. Geometrik desenin PDF’de doğru basılması
27. Template değişiminde ResumeData içeriğinin korunması
28. Uygulama yeniden açıldığında layout’un geri yüklenmesi
29. Setup ve Portable sürümde template kaynaklarının bulunması

## 25. Çalışma sırası

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

Mevcut template registry, ortak rendererlar, persistence ve PDF üretim akışını belirle.

### Aşama 2: Referans ölçüm planı

Referans görseldeki:

* A4 oranını
* Header yüksekliğini
* Profil fotoğrafını
* Sütun genişliklerini
* Ana içerik başlangıcını
* Geometrik arka planı
* Section yerleşimlerini
* Footer konumunu

milimetre cinsinden yaklaşık olarak çıkar.

### Aşama 3: Metadata ve design tokenları

Stilvoll metadata kaydını, filename eşleştirmesini, renkleri, tipografiyi ve varsayılan layout ölçülerini oluştur.

### Aşama 4: React componentleri

Page, background, header, sütunlar, sectionlar ve footer componentlerini oluştur.

### Aşama 5: Tam CSS

Eksiksiz ve production-ready `stilvoll.css` dosyasını oluştur.

### Aşama 6: Editör entegrasyonu

Selection, drag, resize, lock, hide, layer ve reset özelliklerini bağla.

### Aşama 7: ATS, pagination ve PDF

Tek sütun ATS görünümünü, çok sayfalı çıktıyı ve PDF uyumluluğunu tamamla.

### Aşama 8: Görsel karşılaştırma

Referansla üretilen çıktı arasındaki ölçü, spacing, font ve renk farklılıklarını gider.

Her aşamadan sonra bir sonraki aşamaya geçmeden bekle.

## 26. Kod çıktı formatı

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

## 27. Beklenen cevap formatı

Her cevapta şu başlıkları kullan:

### 1. Referans görsel analizi

### 2. A4 ölçüm ve yerleşim planı

### 3. Mevcut projeden yeniden kullanılacak yapılar

### 4. Stilvoll template mimarisi

### 5. Değiştirilecek dosyalar

### 6. Design tokenları

### 7. React ve TypeScript kodları

### 8. Tam CSS kodu

### 9. ATS, pagination ve PDF değişiklikleri

### 10. Testler

### 11. PowerShell komutları

### 12. Görsel karşılaştırma kontrol listesi

İlk olarak yalnızca **Aşama 1 ve Aşama 2’yi** gerçekleştir. Mevcut proje mimarisini analiz et, Stilvoll kaynaklarının mevcut template servislerine nasıl bağlanacağını belirle ve referans görseldeki A4 yerleşimini milimetre bazında çıkar. Mevcut kodla doğrulanmamış component, import veya API üretme.
