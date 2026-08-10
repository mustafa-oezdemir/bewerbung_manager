
* Konu: Referans görselle aynı yerleşime sahip “Modern” Lebenslauf şablonu
* İstenilen çıktı: A4 ölçüsünde; referans görseldeki sütun oranları, tipografi, boşluklar, dalgalı arka plan, profil fotoğrafı, bölüm yerleşimleri ve renk düzenini mümkün olduğunca doğru yeniden üreten; React, TypeScript, CSS, PDF ve Canva benzeri editör sistemiyle uyumlu tam şablon
* Kullanılacak framework: RASCEF
* Senin yazacağın prompt:

Sen Electron, React, TypeScript, modern CSS, A4 belge tasarımı, PDF üretimi ve görsel karşılaştırmalı frontend geliştirme konusunda uzman kıdemli bir yazılım geliştiricisisin.

“Bewerbung Studio” uygulamam için **Modern** adlı Lebenslauf şablonunu oluşturacaksın.

Sana verdiğim referans görseli ana tasarım kaynağı olarak kullan. Oluşturacağın ekran önizlemesi ve PDF çıktısı; referans görseldeki sayfa düzenine, sütun oranlarına, renk kullanımına, boşluklara, tipografik hiyerarşiye, profil fotoğrafı konumuna, dekoratif dalga şekillerine ve bölüm yerleşimine görsel olarak mümkün olduğunca yakın olmalıdır.

Referans görseli yalnızca genel ilham kaynağı olarak yorumlama. Ölçü, hizalama, spacing ve oranları sistematik biçimde analiz ederek yüksek doğrulukta yeniden oluştur.

Üçüncü taraf logo, “Powered by”, marka adı veya platform adresi kopyalama. Bunların yerine kullanıcıya ait web sitesi ve sayfa numarası kullanılabilen nötr bir footer oluştur.

## 1. Şablon bilgileri

Şablon adı:

```text
Modern
```

Açıklama:

```text
Perfekte Lebenslauf-Vorlage mit kreativen Elementen, die Berufserfahrung und Qualifikationen übersichtlich zur Geltung bringt.
```

Template metadata karşılığı:

```ts
{
  id: "modern",
  name: "Modern",
  category: "creative-professional",
  documentKind: "lebenslauf",
  description:
    "Perfekte Lebenslauf-Vorlage mit kreativen Elementen, die Berufserfahrung und Qualifikationen übersichtlich zur Geltung bringt.",
  atsSupported: true,
  supportsPhoto: true,
  supportsFreeform: true,
  supportsMultiplePages: true,
  defaultOutputMode: "visual"
}
```

Mevcut template type yapısı farklıysa paralel bir sistem kurma; mevcut yapıyı genişlet.

## 2. A4 sayfa standardı

Belge kesin olarak A4 ölçüsünde olmalıdır:

```text
210 mm × 297 mm
```

Temel CSS:

```css
@page {
  size: A4;
  margin: 0;
}

.modern-resume-page {
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

Sayfa tasarımı `100vh`, viewport yüzdeleri veya yalnızca piksel ölçüleriyle oluşturulmamalıdır.

Gerçek belge ölçüleri `mm` ve tipografi değerleri tercihen `pt` kullanmalıdır.

## 3. Görsel eşleşme hedefi

Referans görseldeki aşağıdaki özellikleri olabildiğince doğru yeniden oluştur:

* Sayfa üstünde geniş, açık turkuaz dalgalı arka plan
* Dalga alanı içinde ince beyaz dekoratif çizgiler
* Sayfanın sol altında ikinci açık turkuaz dalga alanı
* Üst sol tarafta isim ve meslek unvanı
* Üst sağ tarafta dairesel profil fotoğrafı
* Ana içerikte yaklaşık `%58 / %42` oranında iki sütun
* Sol sütunda deneyim ve eğitim
* Sağ sütunda iletişim, özet, güçlü yönler ve diller
* İnce gri section çizgileri
* Turkuaz vurgu rengi
* Koyu gri gövde metni
* Sade ve ince sans-serif tipografi
* Yoğun içeriğe rağmen dengeli beyaz alan
* Sayfanın alt kısmında sade footer

Hedef yalnızca benzer bir tema oluşturmak değil, referans görseldeki kompozisyona mümkün olduğunca yakın sonuç üretmektir.

## 4. Yaklaşık A4 yerleşim planı

Referans görseli temel alarak başlangıç yerleşimini şu ölçülerle oluştur:

```text
Sayfa genişliği: 210 mm
Sayfa yüksekliği: 297 mm

Sol kenar boşluğu: 17 mm
Sağ kenar boşluğu: 17 mm
Üst içerik başlangıcı: 15 mm
Alt güvenli boşluk: 14 mm

Header yüksekliği: yaklaşık 35–39 mm
Header ile ana içerik arası: 10–12 mm

Ana içerik genişliği: 176 mm
Sütun aralığı: 11 mm
Sol sütun: yaklaşık 101 mm
Sağ sütun: yaklaşık 64 mm
```

Bu değerleri merkezi template tokenları olarak tanımla. CSS dosyasının farklı bölümlerinde tekrar eden magic number kullanma.

## 5. Tasarım tokenları

Aşağıdaki yapıya benzer bir TypeScript nesnesi oluştur:

```ts
export const modernTemplateDefaults = {
  page: {
    widthMm: 210,
    heightMm: 297,
    marginTopMm: 15,
    marginRightMm: 17,
    marginBottomMm: 14,
    marginLeftMm: 17,
  },

  layout: {
    headerHeightMm: 38,
    contentTopMm: 56,
    columnGapMm: 11,
    leftColumnWidthMm: 101,
    rightColumnWidthMm: 64,
    sectionGapMm: 6,
    entryGapMm: 4,
  },

  colors: {
    primary: "#06B6C9",
    primarySoft: "#C7F1F5",
    heading: "#303437",
    text: "#444B4F",
    mutedText: "#686F73",
    divider: "#AEB4B6",
    iconBackground: "#F2F3F3",
    pageBackground: "#FFFFFF",
  },

  typography: {
    fontFamily:
      '"Source Sans 3", "Segoe UI", Arial, Helvetica, sans-serif',
    nameSizePt: 23,
    professionSizePt: 12.5,
    sectionTitleSizePt: 9.2,
    entryTitleSizePt: 11,
    bodySizePt: 8.4,
    smallSizePt: 7.9,
    lineHeight: 1.27,
  },
} as const;
```

Renkleri ve ölçüleri referans görselle karşılaştırarak gerektiğinde düzelt.

## 6. Dekoratif arka plan

Üst ve sol alt dalga alanlarını ayrı bir background layer içinde oluştur.

Tercih edilen yöntem:

* Optimize edilmiş özgün SVG
* CSS değişkeni üzerinden renk değiştirme
* A4 koordinatlarına göre sabit konumlandırma
* PDF çıktısında aynı yerde görünme
* `pointer-events: none`
* İçerikten düşük `z-index`
* ATS modunda gizlenebilme

Önerilen katman:

```tsx
<DocumentBackgroundLayer>
  <ModernTopWave />
  <ModernBottomWave />
</DocumentBackgroundLayer>
```

Üst dalga yaklaşık olarak:

* Sayfanın üst kenarından başlamalı
* Sağ tarafa doğru daha aşağı inmelidir
* Sol üstte içeriğin okunabileceği beyaz alan bırakmalıdır
* Profil fotoğrafının arkasında görünmelidir
* Sağ kenarda yaklaşık 48–55 mm yüksekliğe ulaşmalıdır

Alt dalga:

* Sol alt köşeden başlamalı
* Yaklaşık 55–70 mm genişliğinde olmalıdır
* Sayfanın alt ve sol kenarından taşarak devam ediyormuş izlenimi vermelidir
* Eğitim içeriğini kapatmamalıdır

Dekoratif çizgiler SVG içinde olmalı ve beyaz veya çok düşük kontrastlı açık renkte kullanılmalıdır.

## 7. Header tasarımı

Header iki ana alandan oluşmalıdır:

```text
Sol: isim ve meslek unvanı
Sağ: profil fotoğrafı
```

İsim örneği:

```text
SOPHIA BAUER
```

Meslek unvanı:

```text
Architekt | Projektleitung | Kitaeinrichtungen
```

Önerilen CSS:

```css
.modern-resume-header {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 32mm;
  column-gap: 10mm;
  align-items: start;
  min-height: 36mm;
}

.modern-resume-header__identity {
  min-width: 0;
}

.modern-resume-header__name {
  margin: 0;
  color: var(--modern-heading);
  font-family: var(--modern-font-family);
  font-size: var(--modern-name-size);
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

.modern-resume-header__profession {
  margin: 2mm 0 0;
  color: var(--modern-primary);
  font-size: var(--modern-profession-size);
  font-weight: 500;
  line-height: 1.18;
}

.modern-resume-header__photo {
  width: 25mm;
  height: 25mm;
  justify-self: end;
  margin-top: 0;
  overflow: hidden;
  border-radius: 50%;
  background: #e8eaeb;
}

.modern-resume-header__photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

Fotoğraf bulunmadığında:

* Header tek sütuna dönüşmeli
* Sağ tarafta boş alan kalmamalı
* İsim alanı genişlemeli
* Dalga arka plan bozulmamalıdır

## 8. İki sütunlu ana içerik

Ana içerik:

```css
.modern-resume-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns:
    minmax(0, var(--modern-left-column-width))
    minmax(0, var(--modern-right-column-width));
  column-gap: var(--modern-column-gap);
  align-items: start;
}

.modern-resume-column {
  min-width: 0;
}
```

Sütun oranları referans görsele yakın olmalıdır.

Dar uygulama penceresinde belge sütunlarını alt alta geçirme. Bunun yerine preview zoom azaltılmalı ve scroll kullanılmalıdır.

## 9. Sol sütun içeriği

Sol sütunun varsayılan bölüm sırası:

```text
ERFAHRUNG
AUSBILDUNG
```

Opsiyonel olarak:

```text
PROJEKTE
WEITERBILDUNGEN
ZERTIFIKATE
```

eklenebilmelidir.

### Erfahrung

Her deneyim kaydı şu görsel sırayı kullanmalıdır:

1. Pozisyon
2. Şirket
3. Tarih
4. Konum
5. Kısa açıklama
6. Başarı maddeleri

İlk satır yapısı:

```text
Senior Architekt
Bauhaus AG          2019–2023          München, Deutschland
```

Pozisyon başlığı koyu gri, şirket turkuaz olmalıdır.

Tarih ve konum küçük ikonlarla gösterilebilir.

```css
.modern-experience-entry {
  margin-bottom: 4.5mm;
  break-inside: avoid;
  page-break-inside: avoid;
}

.modern-experience-entry__role {
  margin: 0 0 1mm;
  color: var(--modern-heading);
  font-size: var(--modern-entry-title-size);
  font-weight: 500;
  line-height: 1.15;
}

.modern-experience-entry__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1mm 4mm;
  margin-bottom: 1.5mm;
  color: var(--modern-muted);
  font-size: var(--modern-small-size);
}

.modern-experience-entry__company {
  margin-right: auto;
  color: var(--modern-primary);
  font-weight: 600;
}

.modern-experience-entry__summary {
  margin: 0 0 1mm;
  color: var(--modern-text);
  font-size: var(--modern-body-size);
  line-height: var(--modern-line-height);
}

.modern-experience-entry__achievements {
  margin: 0;
  padding-left: 4mm;
  color: var(--modern-text);
  font-size: var(--modern-body-size);
  line-height: var(--modern-line-height);
}

.modern-experience-entry__achievements li {
  margin: 0.35mm 0;
  padding-left: 0.5mm;
}
```

Uzun şirket adı, tarih veya konum bulunduğunda alanlar kontrollü şekilde alt satıra geçmelidir.

### Ausbildung

Referans görseldeki gibi sade ve kompakt olmalıdır.

```text
Master in Architektur
Technische Universität      2010–2012      Berlin, Deutschland
```

Her eğitim kaydı mümkün olduğunca bölünmeden gösterilmelidir.

## 10. Sağ sütun içeriği

Sağ sütunun varsayılan bölüm sırası:

```text
KONTAKTDATEN
ZUSAMMENFASSUNG
STÄRKEN
SPRACHEN
```

### Kontaktdaten

Her iletişim satırında:

* Açık gri dairesel ikon alanı
* Turkuaz ikon
* Sağında iletişim değeri

bulunmalıdır.

Desteklenen alanlar:

* Telefon
* E-posta
* LinkedIn
* Website
* GitHub
* Wohnort
* Geburtsdatum und Geburtsort

```css
.modern-contact-list {
  display: grid;
  gap: 3.2mm;
}

.modern-contact-item {
  display: grid;
  grid-template-columns: 9mm minmax(0, 1fr);
  column-gap: 3mm;
  align-items: center;
  min-width: 0;
}

.modern-contact-item__icon {
  display: grid;
  place-items: center;
  width: 8.5mm;
  height: 8.5mm;
  border-radius: 50%;
  color: var(--modern-primary);
  background: var(--modern-icon-background);
}

.modern-contact-item__value {
  min-width: 0;
  color: var(--modern-text);
  font-size: var(--modern-body-size);
  line-height: 1.2;
  overflow-wrap: anywhere;
}
```

Eksik alanlar render edilmemeli ve boşluk oluşturmamalıdır.

### Zusammenfassung

Sağ sütundaki özet daha kompakt tipografide gösterilmelidir.

Sabit yükseklik veya `overflow: hidden` kullanılmamalıdır.

### Stärken

Her güçlü yön:

* Başlık
* Kısa açıklama veya kanıt

içermelidir.

Örnek:

```text
Projektmanagement

5 Jahre Erfahrung in der Überwachung und Leitung von Bauprojekten,
wodurch die Projektkosten um 15 % reduziert wurden.
```

Güçlü yönler arasında yaklaşık 4 mm dikey boşluk kullanılmalıdır.

### Sprachen

Referans görseldeki yapı:

```text
Deutsch        Native        ● ● ● ● ●
Englisch       Proficient    ● ● ● ● ○
```

Almanca belge için varsayılan etiketleri şu biçimde kullan:

```text
Deutsch – Muttersprache
Englisch – Fortgeschritten
```

Visual modda nokta göstergesi kullanılabilir.

ATS modunda nokta göstergeleri kaldırılmalı ve CEFR veya açık metin seviyesi gösterilmelidir.

## 11. Section başlıkları

Referans görselde section başlıkları:

* Küçük harf boyutu
* Orta font ağırlığı
* Gri renk
* Altında ince gri çizgi

kullanır.

```css
.modern-section {
  margin-bottom: var(--modern-section-gap);
}

.modern-section__title {
  margin: 0 0 3.2mm;
  padding-bottom: 1mm;
  color: var(--modern-muted);
  border-bottom: 0.35mm solid var(--modern-divider);
  font-size: var(--modern-section-title-size);
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
  break-after: avoid;
  page-break-after: avoid;
}
```

Başlık çizgisi section genişliğinin tamamını kaplamalıdır.

## 12. Footer

Footer sayfanın alt kısmında sade olmalıdır.

Sol tarafta:

```text
portfolio.example.com
```

Sağ tarafta:

```text
Seite 1 / 2
```

Üçüncü taraf marka veya logo ekleme.

```css
.modern-resume-footer {
  position: absolute;
  right: var(--modern-page-margin-right);
  bottom: 6mm;
  left: var(--modern-page-margin-left);
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--modern-muted);
  font-size: 7.2pt;
}
```

## 13. Görsel doğruluk kontrolü

İlk uygulamadan sonra referans görsel ile oluşturulan önizlemeyi karşılaştır.

Şunları tek tek ölç:

* Header’ın üst ve sol mesafesi
* İsim başlangıç konumu
* Fotoğraf çapı ve konumu
* Üst dalganın yüksekliği
* Ana içerik başlangıç yüksekliği
* Sol ve sağ sütun genişliği
* Sütun aralığı
* Section çizgilerinin kalınlığı
* Body font boyutu
* Satır yüksekliği
* Experience kayıtları arası boşluk
* Sağ sütundaki contact ikonlarının çapı
* Alt dalganın genişliği ve yüksekliği
* Footer konumu

Gerekirse birkaç iterasyon yaparak CSS tokenlarını düzelt.

Yalnızca “benziyor” seviyesinde bırakma. Görsel hiyerarşi ve ana yerleşim referansla belirgin biçimde eşleşmelidir.

## 14. Canva benzeri düzenleme desteği

Her bölüm bağımsız editör kartı olmalıdır:

```text
modern.header
modern.experience
modern.education
modern.contacts
modern.summary
modern.strengths
modern.languages
modern.footer
```

Kullanıcı:

* Kartı seçebilmeli
* Fareyle taşıyabilmeli
* Sekiz tutamaçla resize edebilmeli
* Kartı kilitleyebilmeli
* Gizleyebilmeli
* Katman sırasını değiştirebilmeli
* X, Y, genişlik ve yükseklik değerlerini elle girebilmeli
* Template varsayılan düzenine dönebilmelidir

Yerleşim A4 koordinatlarıyla saklanmalıdır:

```ts
interface DocumentElementLayout {
  elementId: string;
  templateId: "modern";
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

Preview zoom değeri gerçek koordinatlara kaydedilmemelidir.

## 15. Flow ve freeform modu

Şablon iki modu desteklemelidir:

```ts
type DocumentLayoutMode = "flow" | "freeform";
```

### Flow modu

* Varsayılan kullanım
* İçerik kadar büyüyen bölümler
* Otomatik pagination
* Kart çakışmasını engelleme
* Deneyim kayıtlarını mümkün olduğunca bölmeme

### Freeform modu

* Kullanıcı kartları manuel taşır
* Kartları büyütüp küçültür
* A4 sınırı dışına çıkış engellenir
* Çakışma uyarısı gösterilir
* Otomatik pagination uygulanmaz
* Kullanıcı yeni sayfa ekleyebilir

## 16. ATS modu

Visual tasarım iki sütunlu olduğu için ATS uyumluluğunu otomatik varsayma.

Ayrı ATS görünümü oluştur:

```ts
type ResumeOutputMode = "visual" | "ats";
```

ATS görünümünde:

* Tek sütun kullan
* Dalga arka planlarını kaldır
* Fotoğrafı varsayılan olarak gizleyebil
* Dairesel ikon alanlarını kaldır
* Dil seviye noktalarını açık metne dönüştür
* Mantıksal DOM sırası kullan
* Tablo kullanma
* Metni seçilebilir tut
* Standart Almanca bölüm başlıkları kullan

ATS içerik sırası:

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

## 17. Çok sayfalı davranış

İçerik bir sayfaya sığmıyorsa:

* İkinci gerçek A4 sayfası oluştur
* İlk sayfadaki büyük header’ı tekrar etme
* İkinci sayfada sadeleştirilmiş isim ve meslek başlığı kullan
* Experience kaydını mümkün olduğunca bölme
* Section başlığını sayfa sonunda yalnız bırakma
* Arka plan dalgalarını yalnızca uygun sayfalarda göster
* Footer sayfa numarasını güncelle
* İçeriği tek sayfaya sığdırmak için fontu aşırı küçültme
* Tüm sayfayı scale ederek PDF oluşturma

## 18. Component yapısı

Şablonu tek bir büyük component içinde oluşturma.

Önerilen yapı:

```text
src/components/resume/templates/modern/
├── ModernResume.tsx
├── ModernPage.tsx
├── ModernHeader.tsx
├── ModernBackground.tsx
├── ModernMainColumn.tsx
├── ModernSidebar.tsx
├── ModernContactSection.tsx
├── ModernSummarySection.tsx
├── ModernStrengthsSection.tsx
├── ModernLanguagesSection.tsx
├── ModernExperienceSection.tsx
├── ModernEducationSection.tsx
├── ModernFooter.tsx
├── modern.defaults.ts
├── modern.layout.ts
├── modern.types.ts
└── modern.css
```

Mevcut ortak componentler varsa yeniden kullan:

* Experience renderer
* Education renderer
* Knowledge renderer
* Language renderer
* Contact renderer
* Photo renderer
* EditableDocumentElement
* DocumentBackgroundLayer
* Pagination utilities
* Design token sistemi
* Template registry

## 19. Template dosyaları

Mevcut filename service standardına uygun olarak:

```text
Modern_Lebenslauf_ATS.docx
Modern_Lebenslauf_Muster.docx
Modern_Lebenslauf_Muster.preview.png
```

dosyalarını destekle.

Bunlar:

```text
public/templates/
```

altında bulunmalıdır.

Development ve paketlenmiş Windows uygulamasında template ve preview dosyalarının bulunabildiğini doğrula.

## 20. PDF ve print CSS

```css
@media screen {
  .modern-resume-page {
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

  .modern-resume-page {
    width: 210mm;
    height: 297mm;
    min-height: 297mm;
    margin: 0;
    overflow: hidden;
    box-shadow: none;
    break-after: page;
    page-break-after: always;
  }

  .modern-resume-page:last-child {
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
* Background SVG’nin yüklenmesini bekle
* `printBackground: true` kullan
* Preview zoom transformunu kaldır
* Editor araçlarını gizle

## 21. Çalışma sırası

Görevi aşağıdaki sırayla gerçekleştir:

### Aşama 1: Mevcut kodu incele

Özellikle:

```text
src/shared/documentDesign.ts
src/shared/documentPagination.ts
src/shared/schema.ts
src/shared/templates.ts
src/store/useAppStore.ts
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

dosyalarını incele.

### Aşama 2: Görsel ölçüm planı

Referans görseldeki A4 alanlarını analiz et ve yaklaşık `mm` karşılıklarını çıkar.

### Aşama 3: Metadata ve design tokenları

Modern template kaydını, varsayılan renkleri ve layout ölçülerini oluştur.

### Aşama 4: React componentleri

Header, background, sütunlar, sectionlar ve footer componentlerini oluştur.

### Aşama 5: Tam CSS

Eksiksiz `modern.css` dosyasını oluştur.

### Aşama 6: Editör entegrasyonu

Drag, resize, lock, hide, layer ve reset davranışlarını bağla.

### Aşama 7: Pagination ve PDF

Çok sayfalı görünümü ve PDF üretimini tamamla.

### Aşama 8: Görsel karşılaştırma

Referans ile çıktı arasındaki önemli farkları belirle ve spacing, ölçü, font ve renk tokenlarını düzelt.

Her aşamadan sonra bir sonraki aşamaya geçmeden bekle.

## 22. Kod çıktı formatı

Her dosya için:

```text
Dosya: src/ilgili/dosya.tsx
İşlem: Güncellenecek | Yeni oluşturulacak | Silinecek
Amaç: Değişikliğin teknik açıklaması
```

Ardından eksiksiz ve doğrudan kullanılabilir kodu ver.

Kurallar:

* Eksik import bırakma
* Hayali type veya API üretme
* Pseudocode yazma
* “Mevcut kod burada kalacak” gibi eksik blok bırakma
* JSX ile CSS class adlarını uyumlu tut
* Demo veriyi gerçek kullanıcı verisi olarak kaydetme
* Üretilmiş `dist-electron`, `artifacts`, `release` veya `windows-release` dosyalarını düzenleme
* Mevcut projeyi baştan yazma
* Ben istemeden Tailwind veya başka UI framework’üne geçme

## 23. Beklenen cevap formatı

Her cevapta şu başlıkları kullan:

### 1. Referans görsel analizi

### 2. A4 ölçüm ve yerleşim planı

### 3. Yeniden kullanılacak mevcut yapılar

### 4. Değiştirilecek dosyalar

### 5. Design tokenları

### 6. React ve TypeScript kodları

### 7. Tam CSS kodu

### 8. Pagination ve PDF değişiklikleri

### 9. Testler

### 10. PowerShell komutları

### 11. Görsel karşılaştırma kontrol listesi

İlk olarak yalnızca **Aşama 1 ve Aşama 2’yi** gerçekleştir. Referans görseldeki yapıyı milimetre bazında analiz et, mevcut proje dosyalarıyla eşleştir ve hangi dosyaların değişeceğini belirle. Henüz varsayımsal veya mevcut sisteme bağlanmamış kod üretme.
