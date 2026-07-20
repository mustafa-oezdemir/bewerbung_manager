![Eine einspaltige Lebenslauf Vorlage, perfekt für alle Branchen. Mit blauem Akzent.](https://cdn.enhancv.com/predefined-examples/GYOCEx7eqx7pwOHg4xYmTodsXmVaHmDN1VzJkJXm/image.png)


* Konu: Referans görseldeki sade, tek sütunlu ve ATS odaklı Lebenslauf şablonunun oluşturulması
* İstenilen çıktı: A4 ölçüsünde; referans görseldeki mavi renk paleti, üst profil alanı, dairesel fotoğraf, açık geometrik arka plan, tam genişlikte bölümler ve kompakt içerik düzenini yüksek görsel doğrulukla yeniden üreten; React, TypeScript, CSS, Electron ve PDF sistemiyle uyumlu Lebenslauf şablonu
* Kullanılacak framework: RASCEF
* Senin yazacağın prompt:

Sen Electron, React, TypeScript, modern CSS, A4 belge tasarımı, ATS uyumluluğu ve PDF üretimi konusunda uzman kıdemli bir frontend geliştiricisisin.

“Bewerbung Studio” uygulamam için referans görseldeki sade ve profesyonel Lebenslauf şablonunu oluşturacaksın.

Şablon adı ayrıca belirtilmemişse kullanıcı arayüzünde:

```text
Einfach
```

teknik kimlik olarak:

```text
einfach
```

kullan.

Şablon açıklaması:

```text
Kostenlose, einfache Lebenslauf-Vorlage. Durchläuft mühelos die ATS-Prüfungen.
```

Sana verilen görsel ana tasarım referansıdır. Ekran önizlemesi ve PDF çıktısı; referanstaki A4 yerleşimine, mavi renk sistemine, tipografik hiyerarşiye, fotoğraf konumuna, bölüm çizgilerine, spacing değerlerine ve dekoratif geometrik arka plana mümkün olduğunca yakın olmalıdır.

Yalnızca benzer renklerde genel bir CV tasarlama. Referansı ölçerek sayfa kompozisyonunu yüksek doğrulukta yeniden oluştur.

Referans görselde bulunan üçüncü taraf logo, “Powered by”, platform adı ve website adreslerini kopyalama. Footer yalnızca kullanıcıya ait website, portfolio, güncelleme tarihi veya sayfa numarası içermelidir.

## 1. Template metadata

Mevcut template type ve registry yapısına uygun şekilde aşağıdaki özelliklerin karşılığını oluştur:

```ts
{
  id: "einfach",
  name: "Einfach",
  category: "simple-professional",
  documentKind: "lebenslauf",
  description:
    "Kostenlose, einfache Lebenslauf-Vorlage. Durchläuft mühelos die ATS-Prüfungen.",
  atsSupported: true,
  supportsPhoto: true,
  supportsFreeform: true,
  supportsMultiplePages: true,
  defaultOutputMode: "visual"
}
```

Projede mevcut template registry varsa paralel bir sistem oluşturma.

## 2. Template kaynak dosyaları

Mevcut filename service standardını inceleyerek şu kaynakları destekle:

```text
public/templates/Einfach_Lebenslauf_ATS.docx
public/templates/Einfach_Lebenslauf_Muster.docx
public/templates/Einfach_Lebenslauf_Muster.preview.png
```

Aşağıdaki mevcut servislerle uyumlu çalış:

```text
electron/templates/template-filename.service.ts
electron/templates/template-mapper.ts
electron/templates/template-preview.service.ts
electron/templates/template-scanner.ts
electron/templates/template-validator.ts
electron/templates/template.repository.ts
electron/templates/template.service.ts
```

Mevcut adlandırma kuralı farklıysa yeni standart oluşturma; mevcut servisin beklediği dosya yapısını kullan.

## 3. A4 standardı

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

.einfach-page {
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

A4 düzeninde `100vh`, `100vw` veya yalnızca piksel tabanlı ölçüler kullanma. Yerleşimde `mm`, tipografide tercihen `pt` kullan.

## 4. Referans yerleşim planı

Şablon tek ana içerik sütunundan oluşmalıdır.

Ana bölgeler:

```text
1. Tam genişlikte profil başlığı
2. Zusammenfassung
3. Stärken
4. Erfahrung
5. Ausbildung
6. Sprachen
7. Footer
```

Referansa yakın başlangıç ölçüleri:

```text
Sayfa genişliği: 210 mm
Sayfa yüksekliği: 297 mm

Sol kenar boşluğu: 15 mm
Sağ kenar boşluğu: 15 mm
Üst boşluk: 14 mm
Alt güvenli boşluk: 12 mm

Kullanılabilir içerik genişliği: 180 mm
Header yüksekliği: yaklaşık 33–37 mm
İlk bölüm başlangıcı: yaklaşık 48–51 mm
Footer tabanı: yaklaşık 285 mm
```

Sayfa tek sütunlu olmalı; ancak Stärken ve Sprachen bölümlerinde kontrollü alt grid kullanılabilir.

## 5. Design tokenları

Tasarım değerlerini CSS ve componentlere dağınık biçimde yazma. Mevcut `documentDesign.ts` sistemini kullan veya genişlet.

Başlangıç tokenları:

```ts
export const einfachTemplateDefaults = {
  page: {
    widthMm: 210,
    heightMm: 297,
    marginTopMm: 14,
    marginRightMm: 15,
    marginBottomMm: 12,
    marginLeftMm: 15,
  },

  layout: {
    headerHeightMm: 36,
    sectionGapMm: 7,
    entryGapMm: 4.5,
    strengthsColumnGapMm: 15,
  },

  colors: {
    primary: "#073B8F",
    accent: "#4AA7F5",
    heading: "#073B8F",
    text: "#424B50",
    mutedText: "#667177",
    divider: "#073B8F",
    pattern: "#EAF6FD",
    activeLevel: "#55ACF2",
    inactiveLevel: "#E1E5E8",
    pageBackground: "#FFFFFF",
  },

  typography: {
    fontFamily:
      '"Source Sans 3", "Segoe UI", Arial, Helvetica, sans-serif',
    nameSizePt: 24,
    professionSizePt: 11.5,
    sectionTitleSizePt: 14,
    entryTitleSizePt: 11,
    bodySizePt: 8.5,
    smallSizePt: 7.8,
    lineHeight: 1.3,
  },

  background: {
    opacity: 0.72,
  },
} as const;
```

Renk ve ölçüleri referansla karşılaştırarak gerektiğinde düzelt.

Kullanıcı şu ayarları değiştirebilmelidir:

* Ana mavi renk
* Açık mavi vurgu rengi
* Metin rengi
* Font ailesi
* Font boyutu
* Satır yüksekliği
* Sayfa kenar boşlukları
* Section aralıkları
* Fotoğraf görünürlüğü
* Geometrik arka plan
* Arka plan opacity değeri

## 6. Profil başlığı

Header tam genişlikte çalışmalıdır.

Sol tarafta:

* Vorname
* Nachname
* Berufsbezeichnung
* Spezialisierungen
* Telefon
* E-posta
* LinkedIn
* Wohnort
* Opsiyonel doğum tarihi ve yeri
* Opsiyonel GitHub veya website

Sağ tarafta:

* Dairesel profil fotoğrafı

Örnek:

```text
ANNA KOCH

Regionaler Vertriebsleiter | Baustoffe | Teamführung

+49 30 12345678                 anna@example.de
linkedin.com                    Berlin, Deutschland
Geb. 01.03.1990 in München
```

İsim:

* Büyük harfli
* Koyu lacivert
* Kalın
* Sol hizalı
* Güçlü ama dengeli
* Uzun isimlerde kontrollü satır kırmalı

Meslek unvanı:

* Açık mavi
* Kalın veya yarı kalın
* Uzun içerikte iki satıra geçebilmeli

İletişim bilgileri:

* Küçük koyu gri metin
* Açık mavi ikonlar
* İki sütunlu kompakt grid
* Eksik alanlarda boş ikon veya gereksiz satır oluşturmamalı
* URL’ler PDF içinde tıklanabilir olmalı

Önerilen yapı:

```css
.einfach-header {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 32mm;
  column-gap: 9mm;
  align-items: start;
  min-height: var(--einfach-header-height);
}

.einfach-header__name {
  margin: 0;
  color: var(--einfach-primary);
  font-size: var(--einfach-name-size);
  font-weight: 750;
  line-height: 1;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

.einfach-header__profession {
  margin: 2mm 0;
  color: var(--einfach-accent);
  font-size: var(--einfach-profession-size);
  font-weight: 700;
  line-height: 1.2;
}

.einfach-header__contacts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1mm 8mm;
  max-width: 118mm;
  color: var(--einfach-text);
  font-size: var(--einfach-small-size);
}
```

## 7. Profil fotoğrafı

Fotoğraf referanstaki gibi sağ üstte dairesel görünmelidir.

Başlangıç ölçüsü:

```text
Yaklaşık 28–31 mm çap
```

```css
.einfach-header__photo {
  width: 30mm;
  height: 30mm;
  justify-self: end;
  overflow: hidden;
  border-radius: 50%;
  background: #edf1f3;
}

.einfach-header__photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

Fotoğraf yoksa:

* Boş fotoğraf alanı gösterilmemeli
* Header tek sütuna genişlemeli
* PDF’de placeholder bulunmamalı

## 8. Geometrik arka plan

Referans görselde çok açık mavi, büyük geometrik şekiller bulunmaktadır.

Şekiller:

* Kalın köşeli çizgiler
* Kısmi daireler
* Büyük `L` benzeri geometrik parçalar
* Header ve sectionlar arasında düşük kontrastlı dekorasyon
* İçeriğin okunmasını engellemeyen opacity

Mevcut:

```text
src/components/document/DocumentBackgroundLayer.tsx
```

üzerinden ayrı arka plan katmanı olarak render et.

Özgün ve optimize edilmiş SVG kullan. Referanstaki şekilleri birebir kopyalama; aynı sade geometrik karakteri koruyan yeni bir kompozisyon oluştur.

Kurallar:

* `pointer-events: none`
* İçeriğin altında kalmalı
* PDF’de doğru basılmalı
* ATS görünümünde kaldırılmalı
* Kullanıcı tarafından açılıp kapatılabilmeli
* Opacity tasarım ayarından kontrol edilmeli

## 9. Section başlıkları

Referans görselde bölüm başlıkları:

* Büyük harfli
* Koyu lacivert
* Kalın
* Altında tam genişlikte lacivert çizgi

olarak görünmektedir.

```css
.einfach-section {
  position: relative;
  z-index: 2;
  margin-bottom: var(--einfach-section-gap);
}

.einfach-section__title {
  margin: 0 0 3.5mm;
  padding-bottom: 1mm;
  border-bottom: 0.65mm solid var(--einfach-divider);
  color: var(--einfach-heading);
  font-size: var(--einfach-section-title-size);
  font-weight: 750;
  line-height: 1;
  text-transform: uppercase;
  break-after: avoid;
  page-break-after: avoid;
}
```

Section başlıklarını sayfa sonunda tek başına bırakma.

## 10. Zusammenfassung

Özet tam genişlikte gösterilmelidir.

Kurallar:

* Yaklaşık 3–5 satır
* Koyu gri gövde metni
* Sabit yükseklik kullanılmamalı
* `overflow: hidden` ile kesilmemeli
* Uzun içerikte flow modunda alan büyümeli

## 11. Stärken

Referans görselde iki güçlü yön yan yana gösterilmektedir.

Başlangıç düzeni:

```text
Führungskompetenz
Vertriebsstrategie
```

Her öğe:

* Açık mavi ikon
* Koyu lacivert başlık
* Altında kısa açıklama veya kanıt

kullanmalıdır.

```css
.einfach-strengths {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: var(--einfach-strengths-column-gap);
}

.einfach-strength {
  display: grid;
  grid-template-columns: 7mm minmax(0, 1fr);
  column-gap: 2mm;
  break-inside: avoid;
}

.einfach-strength__icon {
  color: var(--einfach-accent);
  font-size: 14pt;
  line-height: 1;
}

.einfach-strength__title {
  margin: 0 0 1.5mm;
  color: var(--einfach-primary);
  font-size: 9.5pt;
  font-weight: 700;
}

.einfach-strength__description {
  margin: 0;
  color: var(--einfach-text);
  font-size: var(--einfach-body-size);
  line-height: var(--einfach-line-height);
}
```

Tek güçlü yön varsa tam genişliğe yayılabilmelidir. Üçten fazla öğede yeni satıra geçmelidir.

## 12. Erfahrung

Her deneyim kaydı şu yapıyı kullanmalıdır:

```text
Pozisyon
Şirket
Tarih · Lokasyon
Kısa görev açıklaması
Başarı maddeleri
```

Renk düzeni:

* Pozisyon: koyu lacivert
* Şirket: açık mavi
* Tarih ve lokasyon: gri
* Gövde: koyu gri

Deneyim kayıtları arasında ince kesikli ayırıcı çizgi kullanılabilir.

```css
.einfach-experience-entry {
  margin-bottom: var(--einfach-entry-gap);
  padding-bottom: 3mm;
  border-bottom: 0.25mm dashed #d4d9dc;
  break-inside: avoid;
  page-break-inside: avoid;
}

.einfach-experience-entry:last-child {
  border-bottom: 0;
}

.einfach-experience-entry__role {
  margin: 0;
  color: var(--einfach-primary);
  font-size: var(--einfach-entry-title-size);
  font-weight: 500;
  line-height: 1.15;
}

.einfach-experience-entry__company {
  margin-top: 1mm;
  color: var(--einfach-accent);
  font-weight: 700;
}

.einfach-experience-entry__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1mm 4mm;
  margin: 1mm 0 1.5mm;
  color: var(--einfach-muted);
  font-size: var(--einfach-small-size);
}

.einfach-experience-entry__summary,
.einfach-experience-entry__achievements {
  color: var(--einfach-text);
  font-size: var(--einfach-body-size);
  line-height: var(--einfach-line-height);
}
```

Uzun şirket, pozisyon veya lokasyon bilgilerini kesme. Kontrollü satır kırılması kullan.

## 13. Ausbildung

Eğitim bölümü deneyim alanından daha kompakt olmalıdır.

Örnek:

```text
Master in Betriebswirtschaft
Universität München
2008–2010 · München, Deutschland
```

Renk düzeni:

* Derece: koyu lacivert
* Kurum: açık mavi
* Tarih ve lokasyon: gri

Her eğitim kaydı mümkün olduğunca tek parça tutulmalıdır.

## 14. Sprachen

Referans görselde diller yatay olarak iki kolon hâlinde gösterilmektedir.

Örnek:

```text
Deutsch
Muttersprache       ● ● ● ● ●

Englisch
Erweitert           ● ● ● ○ ○
```

Aktif noktalar açık mavi, pasif noktalar açık gri olmalıdır.

Veri modelinde nokta sayısı değil CEFR veya açık seviye saklanmalıdır.

ATS modunda:

```text
Deutsch – Muttersprache
Englisch – B2
```

formatı kullanılmalıdır.

## 15. Footer

Footer sade ve markasız olmalıdır.

Desteklenen alanlar:

* Website
* Portfolio
* Sayfa numarası
* Opsiyonel güncelleme tarihi

Örnek:

```text
portfolio.example.com                     Seite 1 / 2
```

Üçüncü taraf marka, logo veya “Powered by” metni ekleme.

## 16. ATS görünümü

Visual tasarımı otomatik olarak ATS uyumlu kabul etme.

İki çıktı modu kullan:

```ts
type ResumeOutputMode = "visual" | "ats";
```

ATS görünümünde:

* Tek sütun kullan
* Profil fotoğrafını varsayılan olarak gizle
* Geometrik arka planı kaldır
* İkonları kaldır
* Dil noktalarını açık metne dönüştür
* Mantıksal DOM sırasını koru
* Tablo kullanma
* Mutlak konumlandırmaya bağlı bilgi sunma
* Metni seçilebilir ve aranabilir bırak

ATS sırası:

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

Visual ve ATS görünümü aynı `ResumeData` modelini kullanmalıdır.

## 17. Canva benzeri serbest düzenleme

Her ana bölüm bağımsız editör kartı olmalıdır:

```text
einfach.header
einfach.summary
einfach.strengths
einfach.experience
einfach.education
einfach.languages
einfach.background
einfach.footer
```

Kullanıcı:

* Kartı seçebilmeli
* Fareyle taşıyabilmeli
* Sekiz resize tutamacıyla büyütüp küçültebilmeli
* Kartı gizleyebilmeli
* Kilitleyebilmeli
* Katman sırasını değiştirebilmeli
* X, Y, genişlik ve yüksekliği elle girebilmeli
* Kartı başka sayfaya taşıyabilmeli
* Template varsayılan düzenine dönebilmelidir

Layout değerlerini CSS stringi olarak değil A4 koordinatlarıyla sakla:

```ts
interface DocumentElementLayout {
  elementId: string;
  templateId: "einfach";
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

* Varsayılan mod
* İçerik uzunluğuna göre büyüyen sectionlar
* Otomatik pagination
* Deneyim kayıtlarını mümkün olduğunca bölmeme
* Section başlığını sayfa sonunda yalnız bırakmama
* Kart çakışmasını engelleme

### Freeform modu

* Kartlar manuel A4 koordinatlarıyla taşınır
* Kartlar büyütülüp küçültülebilir
* Otomatik pagination uygulanmaz
* A4 sınırı dışına taşma engellenir
* Çakışma uyarısı gösterilir
* Kullanıcı yeni sayfa ekleyebilir

## 19. Çok sayfalı davranış

İçerik ilk sayfaya sığmazsa:

* İkinci gerçek A4 sayfası oluştur
* Büyük profil header’ını tekrar etme
* İkinci sayfada sadeleştirilmiş isim ve meslek başlığı göster
* Deneyim kaydını mümkün olduğunca bölme
* Section başlığını sayfa sonunda yalnız bırakma
* Dekoratif arka planı yalnızca ilk sayfada veya tüm sayfalarda gösterme seçeneği sun
* Footer sayfa numarasını güncelle
* İçeriği zorla tek sayfaya sıkıştırma

## 20. Component mimarisi

Şablonu tek büyük component içine yazma.

Önerilen yapı:

```text
src/components/resume/templates/einfach/
├── EinfachResume.tsx
├── EinfachPage.tsx
├── EinfachHeader.tsx
├── EinfachBackground.tsx
├── EinfachSectionHeading.tsx
├── EinfachSummarySection.tsx
├── EinfachStrengthsSection.tsx
├── EinfachExperienceSection.tsx
├── EinfachEducationSection.tsx
├── EinfachLanguagesSection.tsx
├── EinfachFooter.tsx
├── einfach.defaults.ts
├── einfach.layout.ts
├── einfach.types.ts
└── einfach.css
```

Ancak projedeki ortak rendererları gerekçesiz yeniden yazma:

* Experience renderer
* Education renderer
* Language renderer
* Contact renderer
* Photo renderer
* EditableDocumentElement
* DocumentBackgroundLayer
* Pagination utilities
* Design token sistemi
* Template registry

## 21. Print ve PDF

PDF oluştururken:

* Gerçek A4 ölçüsünü koru
* `printBackground: true` kullan
* Fontların yüklenmesini bekle
* Profil fotoğrafının yüklenmesini bekle
* Background SVG’nin yüklenmesini bekle
* Preview zoom transformunu kaldır
* Selection, resize, guide ve grid araçlarını gizle
* Metni seçilebilir bırak
* URL’leri tıklanabilir tut

Print CSS içinde şu editör elemanlarını gizle:

```css
@media print {
  .editor-selection,
  .editor-resize-handle,
  .editor-toolbar,
  .editor-guide,
  .editor-grid {
    display: none !important;
  }
}
```

## 22. Görsel doğruluk süreci

İlk uygulamadan sonra referans görsel ile çıktı önizlemesini yan yana karşılaştır.

Şunları ölç:

* İsim alanının üst ve sol konumu
* Fotoğraf çapı ve konumu
* Header yüksekliği
* İletişim alanının kolon düzeni
* İlk section başlangıç noktası
* Section çizgilerinin kalınlığı
* Stärken kartlarının kolon genişliği
* Experience kayıtları arasındaki spacing
* Body font boyutu
* Madde işaretlerinin girintisi
* Ausbildung başlangıç yüksekliği
* Dil noktalarının ölçüsü
* Geometrik arka planın konumu ve opacity değeri
* Footer konumu
* Sayfanın altında kalan boşluk

Belirgin fark varsa design tokenlarını, fontları ve spacing değerlerini yeniden düzenle.

## 23. Test gereksinimleri

Şu durumları test et:

1. Einfach metadata kaydı
2. ATS, Muster ve preview dosyalarının eşleşmesi
3. Varsayılan tek sütunlu düzen
4. Fotoğraflı ve fotoğrafsız kullanım
5. Uzun isim
6. Uzun meslek unvanı
7. Eksik iletişim bilgileri
8. Uzun Zusammenfassung
9. Bir, iki ve üç Stärke
10. Üç veya daha fazla Berufserfahrung kaydı
11. Uzun şirket, pozisyon ve lokasyon bilgileri
12. Çok sayıda achievement maddesi
13. Birden fazla Ausbildung kaydı
14. Birden fazla dil
15. Tek sayfalık çıktı
16. İki sayfalık çıktı
17. Visual ve ATS görünüm farkları
18. ATS doğrusal DOM sırası
19. Kart sürükleme
20. Kart resize
21. Kart kilitleme ve gizleme
22. Layout reset
23. Preview zoom altında koordinatların değişmemesi
24. PDF’de editör araçlarının görünmemesi
25. Geometrik arka planın PDF’de doğru basılması
26. Template değişiminde ResumeData içeriğinin korunması
27. Uygulama yeniden açıldığında layout’un geri yüklenmesi
28. Setup ve Portable sürümde template kaynaklarının bulunması

## 24. Çalışma sırası

Görevi aşamalı gerçekleştir:

### Aşama 1: Mevcut mimariyi analiz et

Özellikle incele:

```text
src/shared/documentDesign.ts
src/shared/documentPagination.ts
src/shared/schema.ts
src/shared/templates.ts
src/store/useAppStore.ts
src/features/templates/
src/components/document/
src/components/templates/
src/views/DocumentsView.tsx
electron/templates/
electron/documents.ts
electron/pdf.ts
electron/storage.ts
electron/preload.ts
public/templates/
```

### Aşama 2: Referans ölçüm planı

Referans görseldeki A4 oranını, header’ı, fotoğrafı, section başlangıçlarını, strengths grid’ini, experience alanını, language bölümünü ve footer konumunu milimetre bazında çıkar.

### Aşama 3: Metadata ve design tokenları

Template kaydı, dosya eşleştirmesi, renkler, tipografi ve layout varsayılanlarını oluştur.

### Aşama 4: React componentleri ve CSS

Page, header, background, sectionlar ve footer bileşenlerini oluştur; production-ready CSS yaz.

### Aşama 5: Editör entegrasyonu

Selection, drag, resize, lock, hide, layer ve reset davranışlarını bağla.

### Aşama 6: ATS, pagination ve PDF

Tek sütun ATS görünümünü, çok sayfalı çıktıyı ve PDF uyumluluğunu tamamla.

### Aşama 7: Görsel karşılaştırma

Referansla çıktı arasındaki ölçü, spacing, renk ve tipografi farklılıklarını gider.

Her aşama tamamlandıktan sonra bir sonraki aşamaya geçmeden bekle.

## 25. Kod çıktı formatı

Her dosya için:

```text
Dosya: src/ilgili/dosya.tsx
İşlem: Güncellenecek | Yeni oluşturulacak | Silinecek
Amaç: Yapılan değişikliğin teknik açıklaması
```

Ardından eksiksiz ve doğrudan uygulanabilir kodu ver.

Eksik import, hayali API, pseudocode veya yarım kod bloğu üretme. Mevcut ortak rendererları gerekçesiz kopyalama. `dist-electron`, `artifacts`, `release` ve `windows-release` klasörlerini doğrudan düzenleme.

İlk olarak yalnızca **Aşama 1 ve Aşama 2’yi** gerçekleştir. Mevcut proje yapısını analiz et, yeni template kaynaklarının mevcut servislerle nasıl eşleşeceğini belirle ve referans görselin A4 yerleşimini milimetre bazında çıkar. Henüz mevcut kodla doğrulanmamış component, import veya API üretme.
