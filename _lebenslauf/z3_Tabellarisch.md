
* Konu: A4 formatında zaman çizelgeli “Tabellarisch” Lebenslauf şablonunun CSS tasarımı
* İstenilen çıktı: Referans görseldeki profesyonel görünümü temel alan; Electron, React ve TypeScript uygulamasında ekran önizlemesi ve PDF çıktısı için kullanılabilecek A4 uyumlu, modern, düzenlenebilir ve çok sayfalı CSS tasarımı
* Kullanılacak framework: RASCEF
* Senin yazacağın prompt:

Sen A4 belge tasarımı, modern CSS, React, TypeScript, Electron, yazdırma stilleri ve PDF üretimi konusunda uzman kıdemli bir frontend geliştiricisisin.

“Bewerbung Studio” uygulamam için **Tabellarisch** adlı yaratıcı ve profesyonel bir Lebenslauf şablonu tasarlayacaksın.

Şablon açıklaması:

```text
Kreative Lebenslauf-Vorlage. Übersichtlich organisiert mit einer Zeitleiste, die Ihre Karriereentwicklung zeigt. Für erfahrene Arbeitnehmer.
```

Referans görseldeki genel tasarım yaklaşımını incele; ancak tasarımı, üçüncü taraf marka öğelerini, logoları veya footer içeriklerini birebir kopyalama. Benzer profesyonel hiyerarşiye sahip özgün bir şablon oluştur.

## Tasarım karakteri

Şablon şu özelliklere sahip olmalıdır:

* Modern ve kurumsal
* Tek ana içerik sütunu
* Deneyim ve eğitim alanlarında dikey zaman çizelgesi
* Güçlü başlık hiyerarşisi
* Yeterli beyaz alan
* Koyu lacivert başlıklar
* Altın veya sıcak turuncu vurgu rengi
* Koyu gri gövde metni
* İnce gri zaman çizgileri
* Üst alanda hafif geometrik arka plan
* Sağ üstte opsiyonel profil fotoğrafı
* Deneyimli çalışanlar için yoğun içeriği düzenli gösterebilen yapı

## A4 sayfa standardı

Belgenin gerçek ölçüsü:

```text
210 mm × 297 mm
```

Aşağıdaki temel yapıyı kullan:

```css
@page {
  size: A4;
  margin: 0;
}

.tabellarisch-page {
  position: relative;
  width: 210mm;
  min-height: 297mm;
  margin: 0 auto;
  overflow: hidden;
  background: #ffffff;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
```

Sayfanın içeriği için güvenli kenar boşlukları öner:

```css
.tabellarisch-page__content {
  position: relative;
  z-index: 2;
  padding:
    var(--page-margin-top)
    var(--page-margin-right)
    var(--page-margin-bottom)
    var(--page-margin-left);
}
```

Başlangıç değerleri:

```css
.tabellarisch-template {
  --page-width: 210mm;
  --page-height: 297mm;

  --page-margin-top: 16mm;
  --page-margin-right: 17mm;
  --page-margin-bottom: 14mm;
  --page-margin-left: 17mm;

  --primary-color: #17263d;
  --accent-color: #c78300;
  --text-color: #3f4850;
  --muted-color: #6d747a;
  --line-color: #c8cdd1;
  --background-color: #ffffff;

  --font-family: "Source Sans 3", "Segoe UI", Arial, sans-serif;

  --body-font-size: 9.4pt;
  --body-line-height: 1.35;
  --small-font-size: 8.4pt;

  --name-font-size: 25pt;
  --job-title-font-size: 13.5pt;
  --section-title-font-size: 15pt;
  --entry-title-font-size: 12pt;

  --section-gap: 8mm;
  --entry-gap: 5mm;
}
```

Bu değerleri componentlerin içine dağınık biçimde yazma. Kullanıcının tasarım panelinden değiştirebilmesi için merkezi design token yapısına bağla.

## Genel sayfa yerleşimi

Şablon şu ana bölümlerden oluşmalıdır:

```text
1. Üst profil alanı
2. Zusammenfassung
3. Stärken
4. Berufserfahrung
5. Ausbildung
6. Opsiyonel ek bölümler
7. Footer
```

Ana içerik tek sütun olmalıdır. Zaman çizelgesi yalnızca deneyim, eğitim ve gerektiğinde proje bölümlerinde kullanılmalıdır.

## Üst profil alanı

Üst alan tam genişlikte çalışmalıdır.

Sol tarafta:

* İsim ve soyadı
* Meslek unvanı
* Uzmanlık alanları
* Telefon
* E-posta
* LinkedIn
* GitHub veya portfolio
* Şehir ve ülke
* Opsiyonel doğum bilgisi

Sağ tarafta:

* Profil fotoğrafı

Önerilen CSS yapısı:

```css
.tabellarisch-header {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 34mm;
  column-gap: 10mm;
  align-items: start;
  min-height: 42mm;
  margin-bottom: 8mm;
}

.tabellarisch-header__identity {
  min-width: 0;
  padding-top: 1mm;
}

.tabellarisch-header__name {
  margin: 0;
  color: var(--primary-color);
  font-family: var(--font-family);
  font-size: var(--name-font-size);
  font-weight: 750;
  line-height: 1;
  letter-spacing: 0.015em;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

.tabellarisch-header__title {
  margin: 2.5mm 0 2mm;
  color: var(--accent-color);
  font-size: var(--job-title-font-size);
  font-weight: 650;
  line-height: 1.15;
}

.tabellarisch-header__contacts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2mm 7mm;
  margin-top: 2.5mm;
  color: var(--text-color);
  font-size: var(--small-font-size);
}

.tabellarisch-header__photo {
  width: 30mm;
  height: 30mm;
  justify-self: end;
  overflow: hidden;
  border-radius: 50%;
  background: #e8ebed;
}

.tabellarisch-header__photo img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
}
```

Fotoğraf bulunmadığında header otomatik olarak tek sütuna genişlemeli ve boş alan bırakmamalıdır:

```css
.tabellarisch-header--without-photo {
  grid-template-columns: minmax(0, 1fr);
}
```

## Geometrik üst arka plan

Üst alanda hafif, dekoratif ve içerikten daha düşük kontrastlı geometrik çizgiler kullanılabilir.

Kurallar:

* Metnin okunabilirliğini bozmamalı
* Profil fotoğrafının üzerine kontrolsüz taşmamalı
* PDF çıktısında görünmeli
* ATS çıktısında kaldırılabilmeli
* Ayrı bir background layer üzerinde render edilmeli
* `pointer-events: none` olmalı
* Opacity düşük tutulmalı

Önerilen yaklaşım:

```css
.tabellarisch-background {
  position: absolute;
  inset: 0 0 auto;
  width: 100%;
  height: 58mm;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.tabellarisch-background::before {
  content: "";
  position: absolute;
  top: -14mm;
  right: -8mm;
  width: 145mm;
  height: 70mm;
  opacity: 0.2;
  background-image: var(--template-background-image);
  background-repeat: no-repeat;
  background-position: top right;
  background-size: contain;
}
```

Geometrik deseni karmaşık CSS border kombinasyonlarıyla üretmek yerine optimize edilmiş SVG asset olarak kullan. SVG içinde üçüncü taraf marka veya logo bulunmamalıdır.

## Section başlıkları

Bölüm başlıkları güçlü ama sade olmalıdır.

```css
.tabellarisch-section {
  margin-top: var(--section-gap);
  break-inside: auto;
}

.tabellarisch-section__title {
  margin: 0 0 4mm;
  color: var(--primary-color);
  font-size: var(--section-title-font-size);
  font-weight: 750;
  line-height: 1.05;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  break-after: avoid;
  page-break-after: avoid;
}
```

Section başlığı sayfanın sonunda tek başına kalmamalıdır.

## Zusammenfassung

Özet tam genişlikte gösterilmelidir.

```css
.tabellarisch-summary {
  max-width: 100%;
}

.tabellarisch-summary__text {
  margin: 0;
  color: var(--text-color);
  font-size: var(--body-font-size);
  line-height: var(--body-line-height);
  hyphens: auto;
  overflow-wrap: break-word;
}
```

Uzun özetlerde metni zorla sabit yüksekliğe sıkıştırma. Flow modunda içerik kadar büyümesine izin ver.

## Stärken bölümü

Referans görselde olduğu gibi iki kart yan yana gösterilebilir.

```css
.tabellarisch-strengths {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 5mm 12mm;
}

.tabellarisch-strength {
  display: grid;
  grid-template-columns: 8mm minmax(0, 1fr);
  column-gap: 2.5mm;
  align-items: start;
  min-width: 0;
  break-inside: avoid;
}

.tabellarisch-strength__icon {
  color: var(--accent-color);
  font-size: 15pt;
  line-height: 1;
}

.tabellarisch-strength__title {
  margin: 0 0 1.5mm;
  color: var(--primary-color);
  font-size: 10.3pt;
  font-weight: 700;
}

.tabellarisch-strength__description {
  margin: 0;
  color: var(--text-color);
  font-size: var(--body-font-size);
  line-height: var(--body-line-height);
}
```

İkinci kart bulunmuyorsa ilk kart tam genişliğe yayılabilmelidir.

## Zaman çizelgesi tasarımı

Berufserfahrung ve Ausbildung alanları için üç bölümlü bir grid kullan:

```text
Tarih ve konum | Zaman çizgisi | İçerik
```

Başlangıç ölçüleri:

```css
.tabellarisch-timeline-entry {
  display: grid;
  grid-template-columns:
    minmax(30mm, 35mm)
    7mm
    minmax(0, 1fr);
  column-gap: 4mm;
  position: relative;
  break-inside: avoid;
  page-break-inside: avoid;
}
```

### Tarih alanı

```css
.tabellarisch-timeline-entry__meta {
  min-width: 0;
  padding-top: 0.5mm;
}

.tabellarisch-timeline-entry__date {
  color: var(--primary-color);
  font-size: 10pt;
  font-weight: 750;
  line-height: 1.15;
}

.tabellarisch-timeline-entry__location {
  margin-top: 2mm;
  color: var(--text-color);
  font-size: var(--small-font-size);
  line-height: 1.3;
}
```

### Dikey çizgi ve nokta

```css
.tabellarisch-timeline-entry__rail {
  position: relative;
  min-height: 100%;
}

.tabellarisch-timeline-entry__rail::before {
  content: "";
  position: absolute;
  top: 1.5mm;
  bottom: -5mm;
  left: 50%;
  width: 0.35mm;
  background: var(--line-color);
  transform: translateX(-50%);
}

.tabellarisch-timeline-entry__rail::after {
  content: "";
  position: absolute;
  top: 0.6mm;
  left: 50%;
  width: 2.3mm;
  height: 2.3mm;
  border-radius: 50%;
  background: var(--primary-color);
  transform: translateX(-50%);
}
```

Son kayıtta çizginin gereksiz uzamasını engelle:

```css
.tabellarisch-timeline-entry:last-child
  .tabellarisch-timeline-entry__rail::before {
  bottom: 0;
}
```

### Deneyim içeriği

```css
.tabellarisch-timeline-entry__content {
  min-width: 0;
  padding-bottom: var(--entry-gap);
}

.tabellarisch-timeline-entry__role {
  margin: 0;
  color: var(--primary-color);
  font-size: var(--entry-title-font-size);
  font-weight: 500;
  line-height: 1.15;
}

.tabellarisch-timeline-entry__organization {
  margin: 1mm 0 1.5mm;
  color: var(--accent-color);
  font-size: 10.2pt;
  font-weight: 700;
  line-height: 1.2;
}

.tabellarisch-timeline-entry__summary {
  margin: 0 0 1.5mm;
  color: var(--text-color);
  font-size: var(--body-font-size);
  line-height: var(--body-line-height);
}

.tabellarisch-timeline-entry__achievements {
  margin: 0;
  padding-left: 4.5mm;
  color: var(--text-color);
  font-size: var(--body-font-size);
  line-height: var(--body-line-height);
}

.tabellarisch-timeline-entry__achievements li {
  margin: 0.6mm 0;
  padding-left: 0.5mm;
}
```

## Çok sayfalı Lebenslauf

İçerik tek sayfaya sığmazsa ikinci A4 sayfasına kontrollü geçmelidir.

Kurallar:

* Font boyutunu otomatik olarak aşırı küçültme
* Tüm sayfayı `transform: scale()` ile sıkıştırma
* Deneyim kaydını mümkün olduğunca bölme
* Section başlığını sayfa sonunda yalnız bırakma
* İkinci sayfada sadeleştirilmiş isim başlığı gösterebilme
* Her sayfada arka plan ve footer davranışını doğru yönetme
* İlk sayfadaki büyük profil header’ını ikinci sayfada tekrarlama

Önerilen ikinci sayfa başlığı:

```css
.tabellarisch-continuation-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 7mm;
  padding-bottom: 2.5mm;
  border-bottom: 0.35mm solid var(--line-color);
}

.tabellarisch-continuation-header__name {
  color: var(--primary-color);
  font-size: 13pt;
  font-weight: 750;
}

.tabellarisch-continuation-header__title {
  color: var(--accent-color);
  font-size: 9.5pt;
}
```

## Footer

Footer belge içeriğinden ayrı çalışmalıdır.

```css
.tabellarisch-footer {
  position: absolute;
  right: var(--page-margin-right);
  bottom: 6mm;
  left: var(--page-margin-left);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--muted-color);
  font-size: 7.5pt;
}
```

Footer şu içerikleri desteklemelidir:

* Portfolio veya website
* Sayfa numarası
* Opsiyonel son güncelleme tarihi

Üçüncü taraf marka, logo veya “Powered by” metni ekleme.

## Print CSS

Ekran önizleme stilleriyle PDF stillerini birbirinden ayır:

```css
@media screen {
  .tabellarisch-page {
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

  .tabellarisch-page {
    width: 210mm;
    height: 297mm;
    min-height: 297mm;
    margin: 0;
    box-shadow: none;
    overflow: hidden;
    break-after: page;
    page-break-after: always;
  }

  .tabellarisch-page:last-child {
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

## Preview zoom

Zoom yalnızca editör görünümünü değiştirmelidir.

Örnek wrapper:

```css
.document-preview-shell {
  position: relative;
  width: calc(210mm * var(--preview-zoom));
  height: calc(297mm * var(--preview-zoom));
}

.document-preview-scale {
  width: 210mm;
  min-height: 297mm;
  transform: scale(var(--preview-zoom));
  transform-origin: top left;
}
```

Zoom değeri:

* Gerçek belge boyutlarına yazılmamalı
* Pagination hesaplarına doğrudan karıştırılmamalı
* PDF çıktısına uygulanmamalı
* Kullanıcının kart koordinatlarını değiştirmemeli

## Serbest düzenleme desteği

Şablon Canva benzeri freeform editörle uyumlu olmalıdır.

Her section ayrı düzenlenebilir kart olarak tanımlanmalıdır:

```text
tabellarisch.header
tabellarisch.summary
tabellarisch.strengths
tabellarisch.experience
tabellarisch.education
tabellarisch.projects
tabellarisch.certifications
tabellarisch.footer
```

Kullanıcı:

* Kartı seçebilmeli
* Fareyle taşıyabilmeli
* Büyütüp küçültebilmeli
* Kartı kilitleyebilmeli
* Gizleyebilmeli
* Katman sırasını değiştirebilmeli
* X, Y, genişlik ve yükseklik değerlerini elle girebilmeli
* Varsayılan template düzenine dönebilmelidir

Freeform modunda kart pozisyonlarını CSS sınıflarına gömme. Konumları A4 koordinatlarıyla sakla:

```ts
interface DocumentElementLayout {
  elementId: string;
  templateId: "tabellarisch";
  documentKind: "lebenslauf";
  pageIndex: number;
  xMm: number;
  yMm: number;
  widthMm: number;
  heightMm: number;
  zIndex: number;
  locked: boolean;
  hidden: boolean;
}
```

## ATS görünümü

Visual tasarım tek sütunlu olsa da zaman çizgisi, ikonlar ve mutlak yerleşim nedeniyle ATS uyumluluğunu otomatik varsayma.

ATS modunda:

* Geometrik arka plan kaldırılmalı
* Fotoğraf opsiyonel olarak gizlenmeli
* Zaman çizgisi yalnızca metinsel sıralamaya dönüştürülmeli
* Tarih, pozisyon, şirket ve lokasyon mantıksal DOM sırasına alınmalı
* CSS Grid görsel sırası ile DOM sırası farklılaştırılmamalı
* İkonlar yerine açık metin kullanılmalı
* Metin seçilebilir olmalı
* Standart section başlıkları kullanılmalı
* Tablo kullanılmamalı

## Responsive davranış

Bu tasarım web sitesi responsive layout’u değildir. Ana hedef gerçek A4 ölçüsüdür.

Dar uygulama penceresinde A4 içeriğini yeniden akıtma. Bunun yerine:

* Preview zoom azalt
* Scroll alanı kullan
* Sayfa oranını koru
* Belge içeriğinin sütun ve timeline yapısını bozma

## Beklenen component yapısı

Şablonu tek component içine yazma.

```text
src/components/resume/templates/tabellarisch/
├── TabellarischResume.tsx
├── TabellarischPage.tsx
├── TabellarischHeader.tsx
├── TabellarischSummary.tsx
├── TabellarischStrengths.tsx
├── TabellarischTimeline.tsx
├── TabellarischTimelineEntry.tsx
├── TabellarischFooter.tsx
├── tabellarisch.defaults.ts
├── tabellarisch.types.ts
└── tabellarisch.css
```

Mevcut ortak rendererlar varsa yeniden kullan:

* Experience renderer
* Education renderer
* Section heading
* Contact renderer
* Photo renderer
* EditableDocumentElement
* DocumentBackgroundLayer
* Pagination utilities
* Design token sistemi

## İstenen cevap formatı

Cevabını şu sırayla ver:

### 1. Görsel tasarım analizi

Referans görselin renk, tipografi, beyaz alan, header ve timeline yapısını analiz et.

### 2. A4 yerleşim planı

Tüm alanların milimetre cinsinden yaklaşık konum ve ölçülerini belirt.

### 3. Design tokenları

Renk, font, margin, spacing ve ölçü sabitlerini TypeScript nesnesi olarak ver.

### 4. React component yapısı

Componentlerin sorumluluklarını açıkla.

### 5. Tam CSS kodu

Production ortamında kullanılabilecek eksiksiz `tabellarisch.css` dosyasını ver.

### 6. Örnek JSX

CSS sınıflarının doğru kullanımını gösteren eksiksiz ve type-safe React component kodlarını ver.

### 7. Print ve PDF stilleri

A4, page break, background ve editör araçlarının gizlenmesi kurallarını ver.

### 8. Çok sayfalı davranış

Uzun içerikte ikinci sayfaya geçiş yaklaşımını açıkla.

### 9. Testler

Aşağıdaki durumları kapsayan testleri ver:

* Uzun isim
* Fotoğrafsız header
* Uzun özet
* İki strengths kartı
* Çok sayıda deneyim
* İki sayfalık çıktı
* Timeline hizası
* Uzun şirket adı
* Uzun tarih ve lokasyon
* Preview zoom
* PDF’de editör araçlarının gizlenmesi
* ATS görünümündeki mantıksal sıra

### 10. Manuel kontrol listesi

Ekran önizlemesi ve PDF çıktısında kontrol edilmesi gereken maddeleri listele.

## Kaçınılması gerekenler

* A4 tasarımını `100vh` ile oluşturma
* Sayfa ölçülerini yalnızca pixel olarak tanımlama
* İçeriği tek sayfaya sığdırmak için tüm belgeyi küçültme
* Rastgele negatif margin kullanma
* Timeline çizgisini her kayıt için bağımsız ve kopuk oluşturma
* Uzun metinleri `overflow: hidden` ile kesme
* Fotoğraf yokken boş alan bırakma
* Preview zoom’u gerçek belge ölçüsü olarak kaydetme
* Selection ve resize araçlarını PDF’ye dahil etme
* Üçüncü taraf marka ve logoları kopyalama
* ATS görünümünde ikon, grafik veya dekoratif timeline’a güvenme
* Mevcut projeyi baştan yazma
* Ben istemeden Tailwind, Bootstrap veya başka bir UI framework’ü ekleme

Önce mevcut `documentDesign`, pagination, template renderer ve PDF kodlarını incele. Ardından bu şablon için gerekli dosyaları belirle ve tam CSS ile React kodunu mevcut proje mimarisine uyumlu biçimde üret.
