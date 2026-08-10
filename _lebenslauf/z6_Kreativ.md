![Eine kreative Lebenslauf Vorlage, ideal um viele Informationen auf einer einzigen Seite unterzubringen. Mit schwarzem Akzent.](https://cdn.enhancv.com/predefined-examples/Gzn40uHXqRn3GagwIVqPhJiJPy4vTD1otoudCeu8/image.png)

* Konu: Referans görselle yüksek doğrulukta eşleşen “Kreativ” Lebenslauf şablonunun oluşturulması
* İstenilen çıktı: Referans görseldeki yeşil üst bant, iki sütunlu içerik düzeni, profil fotoğrafı, bölüm başlıkları, dekoratif dairesel arka plan, renkler, tipografi ve boşlukları A4 ölçüsünde yeniden üreten; React, TypeScript, CSS, Electron, PDF, ATS ve Canva benzeri serbest düzenleme sistemiyle uyumlu Lebenslauf şablonu
* Kullanılacak framework: RASCEF
* Senin yazacağın prompt:

Sen Electron, React, TypeScript, modern CSS, A4 belge tasarımı, ATS uyumluluğu, PDF üretimi ve görsel karşılaştırmalı frontend geliştirme konusunda uzman kıdemli bir yazılım geliştiricisisin.

“Bewerbung Studio” uygulamam için **Kreativ** adlı Lebenslauf şablonunu oluşturacaksın.

Sana verdiğim referans görsel ana tasarım kaynağıdır. Oluşturulacak ekran önizlemesi ve PDF çıktısı; referans görseldeki A4 kompozisyonuna, üst yeşil profil alanına, sütun oranlarına, profil fotoğrafı konumuna, renk paletine, bölüm çizgilerine, dekoratif dairesel arka plana, yazı boyutlarına ve boşluklara mümkün olduğunca yakın görünmelidir.

Sonuç yalnızca yeşil renkli benzer bir şablon olmamalıdır. Referans görseldeki yerleşim ve görsel hiyerarşi ölçülerek yüksek doğrulukta yeniden oluşturulmalıdır.

Referanstaki üçüncü taraf logo, marka, “Powered by” metni veya platform adresini kopyalama. Footer yalnızca kullanıcıya ait website, sayfa numarası veya isteğe bağlı kısa belge bilgilerini içermelidir.

## 1. Template bilgileri

Şablon adı:

```text
Kreativ
```

Açıklama:

```text
Schöne Lebenslauf-Vorlage. Stellen Sie Ihre Qualifikationen auf elegante Weise in den Mittelpunkt.
```

Mevcut template metadata modeline göre şu özelliklerin karşılığını oluştur:

```ts
{
  id: "kreativ",
  name: "Kreativ",
  category: "creative-professional",
  documentKind: "lebenslauf",
  description:
    "Schöne Lebenslauf-Vorlage. Stellen Sie Ihre Qualifikationen auf elegante Weise in den Mittelpunkt.",
  atsSupported: true,
  supportsPhoto: true,
  supportsFreeform: true,
  supportsMultiplePages: true,
  defaultOutputMode: "visual"
}
```

Mevcut template registry, type ve store yapısını kullan. Paralel veya tekrar eden ikinci bir template sistemi kurma.

## 2. Mevcut template dosyaları

Projede bulunan şu dosyaları kullan:

```text
public/templates/Kreativ_Lebenslauf_ATS.docx
public/templates/Kreativ_Lebenslauf_Muster.docx
public/templates/Kreativ_Lebenslauf_Muster.preview.png
```

Aşağıdaki mevcut servislerle uyumlu çalış:

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

Yeni veya farklı bir dosya adlandırma standardı oluşturma.

## 3. A4 standardı

Belge kesin olarak:

```text
210 mm × 297 mm
```

ölçüsünde olmalıdır.

Temel sayfa yapısı:

```css
@page {
  size: A4;
  margin: 0;
}

.kreativ-page {
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

A4 yerleşiminde `100vh`, `100vw` veya yalnızca piksel tabanlı ölçüler kullanma. Belge koordinatlarında `mm`, tipografide tercihen `pt` kullan.

## 4. Referans görselin ana kompozisyonu

Şablon dört temel bölgeden oluşmalıdır:

```text
1. Tam genişlikte yeşil üst profil bandı
2. Sol geniş ana içerik sütunu
3. Sağ dar tamamlayıcı içerik sütunu
4. Alt footer alanı
```

Referansa yakın başlangıç ölçüleri:

```text
Sayfa genişliği: 210 mm
Sayfa yüksekliği: 297 mm

Üst yeşil alan yüksekliği: yaklaşık 45–47 mm

Sayfa sol boşluğu: 15 mm
Sayfa sağ boşluğu: 15 mm
Ana içerik üst başlangıcı: yaklaşık 55–57 mm
Alt güvenli boşluk: yaklaşık 13 mm

Kullanılabilir içerik genişliği: yaklaşık 180 mm
Sol sütun: yaklaşık 105 mm
Sütun aralığı: yaklaşık 11 mm
Sağ sütun: yaklaşık 64 mm
```

Ana içerik oranı yaklaşık:

```text
Sol sütun: %62
Sağ sütun: %38
```

olmalıdır.

Bu değerleri template tokenları olarak tanımla. CSS ve JSX içine tekrarlanan magic numberlar yazma.

## 5. Design tokenları

Mevcut `documentDesign.ts` yapısını kullan veya genişlet.

Hedef başlangıç değerleri:

```ts
export const kreativTemplateDefaults = {
  page: {
    widthMm: 210,
    heightMm: 297,
    marginLeftMm: 15,
    marginRightMm: 15,
    marginBottomMm: 13,
  },

  layout: {
    headerHeightMm: 46,
    contentTopMm: 56,
    leftColumnWidthMm: 105,
    columnGapMm: 11,
    rightColumnWidthMm: 64,
    sectionGapMm: 7,
    entryGapMm: 4.5,
  },

  colors: {
    primary: "#37B978",
    primaryDark: "#075D4E",
    primarySoft: "#D9F2E5",
    heading: "#075D4E",
    text: "#465156",
    mutedText: "#687277",
    divider: "#B8C4C0",
    lightDivider: "#D7DFDC",
    pageBackground: "#FFFFFF",
    headerText: "#FFFFFF",
    inactiveLevel: "#E1E5E3",
  },

  typography: {
    fontFamily:
      '"Source Sans 3", "Segoe UI", Arial, Helvetica, sans-serif',
    nameSizePt: 23,
    professionSizePt: 11.5,
    sectionTitleSizePt: 14,
    entryTitleSizePt: 11,
    bodySizePt: 8.5,
    smallSizePt: 7.8,
    lineHeight: 1.3,
  },
} as const;
```

Renk, ölçü ve font değerlerini referans görüntüyle karşılaştırarak gerektiğinde düzelt.

Kullanıcı tasarım panelinden en az şu değerleri değiştirebilmelidir:

* Üst bant rengi
* Ana vurgu rengi
* Başlık rengi
* Gövde metin rengi
* Font ailesi
* Font boyutu
* Satır yüksekliği
* Sütun oranları
* Sütun aralığı
* Section aralıkları
* Sayfa kenar boşlukları

## 6. Yeşil üst profil bandı

Sayfanın üst kısmı tam genişlikte yeşil arka plan olmalıdır.

İçerik:

* Ad ve soyad
* Meslek unvanı
* Uzmanlık alanları
* Telefon
* E-posta
* LinkedIn
* Wohnort
* Opsiyonel doğum tarihi ve yeri
* Profil fotoğrafı

Referansa yakın yapı:

```text
MARIE SCHRÖDER

IT-Prozess und Projektmanagerin | Softwareentwicklung

Telefon                     E-Mail
LinkedIn                    Wohnort
Geburtsdatum und Geburtsort
```

Header yerleşimi:

* Kimlik bilgileri solda
* Fotoğraf sağda
* İsim beyaz ve güçlü
* Meslek unvanı beyaz
* İletişim bilgileri daha küçük beyaz metin
* İletişim satırları iki sütunlu kompakt grid olarak gösterilebilir

Önerilen yapı:

```css
.kreativ-header {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 29mm;
  column-gap: 10mm;
  align-items: center;
  height: var(--kreativ-header-height);
  padding: 12mm 15mm 7mm;
  color: var(--kreativ-header-text);
  background: var(--kreativ-primary);
}

.kreativ-header__identity {
  min-width: 0;
}

.kreativ-header__name {
  margin: 0;
  color: var(--kreativ-header-text);
  font-size: var(--kreativ-name-size);
  font-weight: 700;
  line-height: 1;
  overflow-wrap: anywhere;
}

.kreativ-header__profession {
  margin: 1.5mm 0 2mm;
  color: var(--kreativ-header-text);
  font-size: var(--kreativ-profession-size);
  font-weight: 600;
  line-height: 1.15;
}

.kreativ-header__contacts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1mm 8mm;
  max-width: 115mm;
  font-size: var(--kreativ-small-size);
}
```

Uzun isim veya meslek unvanı tasarımı bozmamalı, kontrollü şekilde satır kırmalıdır.

Eksik iletişim alanları boş ikon veya anlamsız boşluk oluşturmamalıdır.

## 7. Profil fotoğrafı

Fotoğraf referanstaki gibi üst sağda yer almalıdır.

Yaklaşık ölçü:

```text
26–29 mm genişlik
27–30 mm yükseklik
```

Şekil:

* Hafif yuvarlatılmış kare
* Alternatif olarak kullanıcı seçerse daire
* `object-fit: cover`
* Kullanıcı tarafından crop ve zoom yapılabilmeli

```css
.kreativ-header__photo {
  width: 28mm;
  height: 29mm;
  justify-self: end;
  overflow: hidden;
  border-radius: 1.5mm;
  background: rgb(255 255 255 / 18%);
}

.kreativ-header__photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

Fotoğraf yoksa:

* Boş fotoğraf alanı görünmemeli
* Header metni sağa doğru genişlemeli
* PDF’de placeholder bulunmamalıdır

## 8. Dekoratif dairesel arka plan

Referans görselde ana içeriğin sağ üst arka planında açık gri veya açık yeşil konsantrik daireler bulunmaktadır.

Bu dekorasyon:

* Sağ sütunun arkasında
* Header’ın hemen altında
* Düşük kontrastta
* Metni kapatmadan
* Yaklaşık 65–80 mm genişlikte

gösterilmelidir.

Özgün bir SVG kullan. Referanstaki vektörü birebir kopyalama.

Önerilen yaklaşım:

```tsx
<DocumentBackgroundLayer>
  <KreativCircularPattern />
</DocumentBackgroundLayer>
```

Kurallar:

* `pointer-events: none`
* İçeriğin arkasında kalmalı
* PDF’de aynı yerde görünmeli
* ATS modunda gizlenmeli
* Kullanıcının arka plan seçimine göre kapatılabilmeli
* Opacity design ayarından kontrol edilebilmelidir

## 9. Ana içerik sütunları

Header altında iki sütunlu grid kullan:

```css
.kreativ-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns:
    minmax(0, var(--kreativ-left-column-width))
    minmax(0, var(--kreativ-right-column-width));
  column-gap: var(--kreativ-column-gap);
  padding:
    10mm
    var(--kreativ-page-margin-right)
    var(--kreativ-page-margin-bottom)
    var(--kreativ-page-margin-left);
  align-items: start;
}

.kreativ-column {
  min-width: 0;
}
```

Dar Electron penceresinde sütunları alt alta geçirme. A4 oranını koru, preview zoom ve scroll kullan.

## 10. Sol sütun

Varsayılan bölümler:

```text
ERFAHRUNG
AUSBILDUNG
```

Opsiyonel:

```text
PROJEKTE
WEITERBILDUNGEN
ZERTIFIKATE
```

Sol sütun ana kariyer geçmişini taşımalıdır.

## 11. Sağ sütun

Varsayılan bölümler:

```text
ZUSAMMENFASSUNG
STÄRKEN
SPRACHEN
FÄHIGKEITEN
```

Opsiyonel:

```text
INTERESSEN
REFERENZEN
EHRENAMT
```

## 12. Section başlıkları

Referans görselde bölüm başlıkları:

* Koyu yeşil
* Büyük harfli
* Kalın
* Altında kalın koyu yeşil çizgi

şeklindedir.

```css
.kreativ-section {
  margin-bottom: var(--kreativ-section-gap);
}

.kreativ-section__title {
  margin: 0 0 3.5mm;
  padding-bottom: 1mm;
  color: var(--kreativ-heading);
  border-bottom: 0.65mm solid var(--kreativ-heading);
  font-size: var(--kreativ-section-title-size);
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
  break-after: avoid;
  page-break-after: avoid;
}
```

Section başlığı sayfa sonunda tek başına kalmamalıdır.

## 13. Berufserfahrung

Her deneyim kaydı şu sırada gösterilmelidir:

1. Pozisyon
2. Şirket
3. Tarih
4. Lokasyon
5. Kısa görev açıklaması
6. Başarı maddeleri

Örnek:

```text
Senior IT-Projektmanagerin

TechnologieLösungen AG
2018–2023 · München, Deutschland

Leitung komplexer IT-Projekte von der Konzeption bis zur Implementierung.

• Erfolgreiche Durchführung von über 15 IT-Projekten ...
• Optimierung des Anforderungsmanagements ...
```

Pozisyon koyu yeşil, şirket canlı yeşil olmalıdır.

Tarih ve konum küçük ikonlarla aynı satırda gösterilebilir.

```css
.kreativ-experience-entry {
  margin-bottom: var(--kreativ-entry-gap);
  padding-bottom: 3mm;
  border-bottom: 0.25mm dashed var(--kreativ-light-divider);
  break-inside: avoid;
  page-break-inside: avoid;
}

.kreativ-experience-entry:last-child {
  border-bottom: 0;
}

.kreativ-experience-entry__role {
  margin: 0 0 1mm;
  color: var(--kreativ-heading);
  font-size: var(--kreativ-entry-title-size);
  font-weight: 500;
  line-height: 1.15;
}

.kreativ-experience-entry__company {
  color: var(--kreativ-primary);
  font-size: 9.5pt;
  font-weight: 700;
}

.kreativ-experience-entry__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1mm 4mm;
  margin: 1mm 0 1.5mm;
  color: var(--kreativ-muted);
  font-size: var(--kreativ-small-size);
}

.kreativ-experience-entry__summary {
  margin: 0 0 1mm;
  color: var(--kreativ-text);
  font-size: var(--kreativ-body-size);
  line-height: var(--kreativ-line-height);
}

.kreativ-experience-entry__achievements {
  margin: 0;
  padding-left: 4mm;
  color: var(--kreativ-text);
  font-size: var(--kreativ-body-size);
  line-height: var(--kreativ-line-height);
}
```

Uzun şirket veya lokasyon bilgileri kesilmemeli ve kontrollü satır kırmalıdır.

## 14. Ausbildung

Eğitim bölümü referanstaki gibi kompakt olmalıdır:

```text
Master in Wirtschaftsinformatik
Universität Hamburg
2010–2012 · Hamburg, Deutschland
```

Derece koyu yeşil, kurum canlı yeşil olmalıdır.

Her eğitim kaydı mümkün olduğunca bölünmeden tutulmalıdır.

## 15. Zusammenfassung

Sağ sütunda yaklaşık 6–10 satırlık profesyonel özet gösterilmelidir.

Kurallar:

* Sabit yükseklik kullanma
* `overflow: hidden` ile kesme
* Uzun içerikte flow modunda alanı büyütme
* Metni koyu gri kullanma
* Arka plandaki dekoratif dairelerle yeterli kontrast sağlama

## 16. Stärken

Her güçlü yön:

* Sol tarafta yeşil ikon
* Sağda koyu yeşil başlık
* Altında kısa açıklama veya kanıt
* Kayıtlar arasında ince kesikli çizgi

içermelidir.

Örnek:

```text
Projektmanagement

Mehr als 5 Jahre erfolgreiche Leitung und Umsetzung
komplexer IT-Projekte, wobei Budget-, Zeit- und
inhaltliche Ziele eingehalten wurden.
```

```css
.kreativ-strength {
  display: grid;
  grid-template-columns: 7mm minmax(0, 1fr);
  column-gap: 2.5mm;
  padding: 0 0 3mm;
  margin-bottom: 3mm;
  border-bottom: 0.25mm dashed var(--kreativ-light-divider);
  break-inside: avoid;
}

.kreativ-strength__icon {
  color: var(--kreativ-primary);
  font-size: 15pt;
  line-height: 1;
}

.kreativ-strength__title {
  margin: 0 0 1.5mm;
  color: var(--kreativ-heading);
  font-size: 9.5pt;
  font-weight: 700;
}

.kreativ-strength__description {
  margin: 0;
  color: var(--kreativ-text);
  font-size: var(--kreativ-body-size);
  line-height: var(--kreativ-line-height);
}
```

Visual modda ikon kullanılabilir. ATS modunda yalnızca açık metin gösterilmelidir.

## 17. Sprachen

Visual görünüm:

```text
Deutsch
Muttersprache                         ● ● ● ● ●

Englisch
Fortgeschritten                      ● ● ● ○ ○
```

Noktalar:

* Aktif: yeşil
* Pasif: açık gri
* Yaklaşık 3.5–4 mm çapında

Veri modelinde nokta sayısı değil, CEFR veya açık seviye saklanmalıdır.

ATS modunda:

```text
Deutsch – Muttersprache
Englisch – B2
```

formatı kullanılmalıdır.

## 18. Fähigkeiten

Referanstaki gibi beceriler ayrı küçük etiketler veya altı çizgili metin parçaları olarak gösterilmelidir.

Örnek:

```text
Jira
Künstliche Intelligenz
Asana
Full Stack Development
```

Stil:

* Koyu gri veya koyu yeşil metin
* Açık gri alt çizgi
* Beyaz arka plan
* Aşırı yuvarlatılmış badge kullanılmamalı
* Satır dolduğunda kontrollü biçimde aşağı geçmeli

```css
.kreativ-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5mm 4mm;
}

.kreativ-skill {
  padding: 0 1.5mm 1.2mm;
  border-bottom: 0.3mm solid var(--kreativ-divider);
  color: var(--kreativ-text);
  font-size: 8.4pt;
  font-weight: 700;
}
```

Mevcut knowledge sistemi kullanılmalıdır:

```text
src/features/knowledge/
src/components/knowledge/
src/components/document/KnowledgeSectionRenderer.tsx
```

## 19. Footer

Footer sade ve markasız olmalıdır.

Sol:

```text
portfolio.example.com
```

Sağ:

```text
Seite 1 / 2
```

Desteklenen alanlar:

* Website
* Portfolio
* Sayfa numarası
* Opsiyonel güncelleme tarihi

Üçüncü taraf logo veya “Powered by” metni ekleme.

## 20. Canva benzeri serbest düzenleme

Her ana bölüm bağımsız editör kartı olmalıdır:

```text
kreativ.header
kreativ.experience
kreativ.education
kreativ.summary
kreativ.strengths
kreativ.languages
kreativ.skills
kreativ.background
kreativ.footer
```

Kullanıcı:

* Kartı seçebilmeli
* Fareyle taşıyabilmeli
* Sekiz resize tutamacıyla büyütüp küçültebilmeli
* Kartı kilitleyebilmeli
* Gizleyebilmeli
* Katman sırasını değiştirebilmeli
* X, Y, genişlik ve yüksekliği elle girebilmeli
* Kartı başka sayfaya taşıyabilmeli
* Template varsayılan düzenine dönebilmelidir

Yerleşimi CSS transform stringleri olarak kaydetme. A4 koordinatlarıyla sakla:

```ts
interface DocumentElementLayout {
  elementId: string;
  templateId: "kreativ";
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

## 21. Flow ve freeform modu

İki layout modu destekle:

```ts
type DocumentLayoutMode = "flow" | "freeform";
```

### Flow modu

* Varsayılan kullanım
* İçerik uzunluğuna göre büyüyen alanlar
* Otomatik pagination
* Experience kayıtlarını mümkün olduğunca bölmeme
* Section başlığını sayfa sonunda yalnız bırakmama
* Sol ve sağ sütunda çakışmayı engelleme

### Freeform modu

* Kullanıcı kartları manuel taşır
* Kartları büyütüp küçültür
* A4 sınırından çıkış engellenir
* Çakışma uyarısı gösterilir
* Otomatik pagination uygulanmaz
* Kullanıcı yeni sayfa ekleyebilir

Flow ve freeform mantıklarını tek algoritma içinde kontrolsüz şekilde birleştirme.

## 22. ATS görünümü

Visual düzen iki sütunlu olduğu için ATS uyumluluğunu otomatik varsayma.

İki output mode destekle:

```ts
type ResumeOutputMode = "visual" | "ats";
```

ATS görünümünde:

* Tek sütun kullan
* Yeşil üst bant yerine sade başlık kullan
* Profil fotoğrafını varsayılan olarak gizle
* Dekoratif dairesel arka planı kaldır
* İkonları kaldır
* Dil noktalarını açık metne dönüştür
* Mutlak pozisyonlama kullanma
* Mantıksal DOM sırasını koru
* Tablo kullanma
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

Visual ve ATS çıktıları aynı ResumeData modelini kullanmalıdır.

## 23. Çok sayfalı davranış

İçerik ilk A4 sayfasına sığmazsa:

* İkinci gerçek A4 sayfası oluştur
* Büyük yeşil profil header’ını tekrar etme
* İkinci sayfada sade isim ve meslek başlığı kullan
* Experience kayıtlarını mümkün olduğunca bölme
* Section başlığını tek başına bırakma
* Dekoratif dairesel arka planı yalnızca ilk sayfada gösterebilme
* Footer sayfa numarasını güncelle
* Fontları aşırı küçültme
* Tüm belgeyi `transform: scale()` ile sıkıştırma

## 24. React component yapısı

Şablonu tek büyük component içinde oluşturma.

Önerilen yapı:

```text
src/components/resume/templates/kreativ/
├── KreativResume.tsx
├── KreativPage.tsx
├── KreativHeader.tsx
├── KreativBackground.tsx
├── KreativLeftColumn.tsx
├── KreativRightColumn.tsx
├── KreativSectionHeading.tsx
├── KreativExperienceSection.tsx
├── KreativEducationSection.tsx
├── KreativSummarySection.tsx
├── KreativStrengthsSection.tsx
├── KreativLanguagesSection.tsx
├── KreativSkillsSection.tsx
├── KreativFooter.tsx
├── kreativ.defaults.ts
├── kreativ.layout.ts
├── kreativ.types.ts
└── kreativ.css
```

Ancak projede ortak rendererlar varsa yeniden yazma:

* Experience renderer
* Education renderer
* Language renderer
* KnowledgeSectionRenderer
* Contact renderer
* Photo renderer
* EditableDocumentElement
* DocumentBackgroundLayer
* Pagination utilities
* Design token sistemi
* Template registry

Template-specific componentler yalnızca Kreativ tasarım farklarını yönetmelidir.

## 25. Print ve PDF

```css
@media screen {
  .kreativ-page {
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

  .kreativ-page {
    width: 210mm;
    height: 297mm;
    min-height: 297mm;
    margin: 0;
    overflow: hidden;
    box-shadow: none;
    break-after: page;
    page-break-after: always;
  }

  .kreativ-page:last-child {
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
* Dekoratif SVG’nin yüklenmesini bekle
* `printBackground: true` kullan
* Preview zoom transformunu kaldır
* Selection ve resize araçlarını gizle
* Her sayfanın gerçek A4 ölçüsünde olduğunu doğrula

## 26. Görsel doğruluk süreci

İlk uygulamadan sonra referans görsel ile oluşturulan önizlemeyi yan yana karşılaştır.

Şunları tek tek ölç:

* Yeşil header yüksekliği
* Header rengi
* İsim başlangıç noktası
* İsim font boyutu ve ağırlığı
* Meslek unvanının satır yüksekliği
* İletişim bilgilerinin kolon yapısı
* Fotoğrafın ölçüsü ve sağ konumu
* Ana içeriğin başlangıç yüksekliği
* Sol ve sağ sütun genişlikleri
* Sütun aralığı
* Section çizgilerinin kalınlığı
* Gövde font boyutu
* Experience kayıtları arasındaki spacing
* Kesikli ayırıcı çizgiler
* Sağ arka plan dairelerinin konumu ve opacity değeri
* Dil seviye noktalarının çapı
* Beceri etiketlerinin boşlukları
* Footer konumu
* Sayfanın altındaki kalan beyaz alan

İlk sonuç referanstan belirgin biçimde farklıysa tokenları, spacing ve font değerlerini yeniden düzenle.

## 27. Test gereksinimleri

Şu durumları test et:

1. Kreativ metadata kaydı
2. ATS, Muster ve preview dosyalarının doğru eşleşmesi
3. Varsayılan header yüksekliği
4. Header renginin değiştirilmesi
5. Fotoğraflı kullanım
6. Fotoğrafsız kullanım
7. Uzun isim
8. Uzun meslek unvanı
9. Eksik iletişim bilgileri
10. Uzun Zusammenfassung
11. Çok sayıda Stärke
12. Birden fazla dil
13. Uzun Fähigkeiten listesi
14. Üç veya daha fazla Berufserfahrung kaydı
15. Uzun şirket ve lokasyon isimleri
16. Tek sayfalık çıktı
17. İki sayfalık çıktı
18. Visual ve ATS renderer farkları
19. ATS doğrusal DOM sırası
20. Kart sürükleme
21. Kart resize
22. Kart kilitleme ve gizleme
23. Template layout reset
24. Preview zoom altında koordinatların değişmemesi
25. PDF’de editör araçlarının görünmemesi
26. Header ve background renklerinin PDF’de basılması
27. Template değişiminde ResumeData içeriğinin korunması
28. Uygulama yeniden açıldığında layout’un geri yüklenmesi
29. Setup ve Portable sürümde template kaynaklarının bulunması

## 28. Çalışma sırası

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

Kreativ DOCX ve preview dosyalarının mevcut servislerle nasıl bulunduğunu belirle.

### Aşama 2: Referans ölçüm planı

Referans görseldeki:

* A4 oranını
* Header yüksekliğini
* Fotoğraf ölçüsünü
* Sütun genişliklerini
* İçerik başlangıçlarını
* Dekoratif arka plan konumunu
* Footer yerleşimini

milimetre cinsinden yaklaşık olarak çıkar.

### Aşama 3: Metadata ve design tokenları

Kreativ template kaydını, varsayılan renkleri, tipografiyi ve layout ölçülerini oluştur.

### Aşama 4: React componentleri

Page, header, background, sütunlar, sectionlar ve footer componentlerini oluştur.

### Aşama 5: Tam CSS

Eksiksiz ve production-ready `kreativ.css` dosyasını oluştur.

### Aşama 6: Editör entegrasyonu

Selection, drag, resize, lock, hide, layer ve reset özelliklerini bağla.

### Aşama 7: ATS, pagination ve PDF

Tek sütun ATS görünümünü, çok sayfalı çıktıyı ve PDF uyumluluğunu tamamla.

### Aşama 8: Görsel karşılaştırma

Referansla üretilen çıktı arasındaki ölçü, spacing, font ve renk farklılıklarını gider.

Her aşama tamamlandıktan sonra sonraki aşamaya geçmeden bekle.

## 29. Kod çıktı formatı

Her dosya için:

```text
Dosya: src/ilgili/dosya.tsx
İşlem: Güncellenecek | Yeni oluşturulacak | Silinecek
Amaç: Değişikliğin teknik açıklaması
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

## 30. Beklenen cevap formatı

Her cevapta şu başlıkları kullan:

### 1. Referans görsel analizi

### 2. A4 ölçüm ve yerleşim planı

### 3. Mevcut projeden yeniden kullanılacak yapılar

### 4. Kreativ template mimarisi

### 5. Değiştirilecek dosyalar

### 6. Design tokenları

### 7. React ve TypeScript kodları

### 8. Tam CSS kodu

### 9. ATS, pagination ve PDF değişiklikleri

### 10. Testler

### 11. PowerShell komutları

### 12. Görsel karşılaştırma kontrol listesi

İlk olarak yalnızca **Aşama 1 ve Aşama 2’yi** gerçekleştir. Mevcut proje yapısını incele, `public/templates` altında bulunan Kreativ dosyalarının mevcut servislerle nasıl eşleştiğini belirle ve referans görseldeki A4 yerleşimini milimetre bazında analiz et. Mevcut kodla doğrulanmamış component, import veya API üretme.
