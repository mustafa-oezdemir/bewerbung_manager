![Eine klassische, einspaltige Lebenslauf Vorlage mit grauen Akzentfarben.](https://cdn.enhancv.com/predefined-examples/ivg5GKkniAZFrFGkDvYOhROM9g2oyDaRzShXBQuF/image.png)


* Konu: Referans görsele yüksek doğrulukta benzeyen “Ivy League” tek sütunlu Lebenslauf şablonu
* İstenilen çıktı: A4 ölçüsünde; referanstaki suluboya arka planı, ortalanmış profil başlığı, klasik serif bölüm başlıkları, mavi-turuncu renk paleti, yatay bölüm çizgileri ve tek sütunlu kariyer düzenini yeniden üreten; React, TypeScript, CSS, PDF, ATS ve görsel editör sistemiyle uyumlu Lebenslauf şablonu
* Kullanılacak framework: RASCEF
* Senin yazacağın prompt:

Sen Electron, React, TypeScript, CSS, A4 belge tasarımı, ATS uyumluluğu, PDF üretimi ve görsel karşılaştırmalı frontend geliştirme konusunda uzman kıdemli bir yazılım geliştiricisisin.

“Bewerbung Studio” uygulamam için **Ivy League** adlı klasik, tek sütunlu Lebenslauf şablonunu oluşturacaksın.

Sana verdiğim referans görsel ana tasarım kaynağıdır. Oluşturulacak ekran önizlemesi ve PDF çıktısı; referanstaki A4 kompozisyonuna, tam sayfa suluboya arka planına, ortalanmış profil başlığına, serif bölüm başlıklarına, mavi ve turuncu renk kullanımına, yatay ayırıcı çizgilere, içerik genişliğine ve dikey boşluklara mümkün olduğunca yakın görünmelidir.

Sonuç yalnızca klasik bir CV teması olmamalıdır. Referans görseldeki yerleşim, oranlar ve tipografik hiyerarşi ölçülerek yüksek doğrulukta yeniden oluşturulmalıdır.

Referansta bulunan üçüncü taraf logo, marka, “Powered by” veya platform adreslerini kopyalama. Footer yalnızca kullanıcıya ait website, sayfa numarası veya isteğe bağlı belge bilgisini içermelidir.

## 1. Template bilgileri

Şablon adı:

```text
Ivy League
```

Açıklama:

```text
Die klassische Harvard-Lebenslaufvorlage, aktualisiert für das
21. Jahrhundert mit einem raffinierten, ATS-freundlichen Design.
```

Kısa açıklama:

```text
Eine klassische, einspaltige Lebenslaufvorlage mit eleganter
Typografie und dezenten Akzentfarben.
```

Teknik template kimliği:

```text
ivy-league
```

Mevcut metadata modeline uyarlanacak hedef özellikler:

```ts
{
  id: "ivy-league",
  name: "Ivy League",
  category: "classic-professional",
  documentKind: "lebenslauf",
  description:
    "Klassische einspaltige Lebenslaufvorlage mit eleganter Typografie und ATS-freundlicher Struktur.",
  atsSupported: true,
  supportsPhoto: false,
  supportsFreeform: true,
  supportsMultiplePages: true,
  defaultOutputMode: "visual"
}
```

Projede mevcut template registry, type veya store yapısı varsa ikinci bir sistem oluşturma. Mevcut yapıyı genişlet.

## 2. Yeni template dosyaları

Mevcut filename service standardını inceleyerek aşağıdaki kaynakların karşılığını ekle:

```text
public/templates/Ivy_League_Lebenslauf_ATS.docx
public/templates/Ivy_League_Lebenslauf_Muster.docx
public/templates/Ivy_League_Lebenslauf_Muster.preview.png
```

Dosya adındaki boşluk ve alt çizgi kurallarını mevcut:

```text
electron/templates/template-filename.service.ts
```

ile doğrula. Mevcut servis farklı bir normalizasyon kullanıyorsa ona uy.

Aşağıdaki servislerin yeni template’i doğru algılamasını sağla:

```text
electron/templates/template-filename.service.ts
electron/templates/template-mapper.ts
electron/templates/template-preview.service.ts
electron/templates/template-scanner.ts
electron/templates/template-validator.ts
electron/templates/template.repository.ts
electron/templates/template.service.ts
```

Development, Setup ve Portable sürümlerde template kaynaklarının bulunabildiğini test et.

## 3. A4 standardı

Belge gerçek A4 ölçüsünde olmalıdır:

```text
210 mm × 297 mm
```

Temel sayfa stili:

```css
@page {
  size: A4;
  margin: 0;
}

.ivy-league-page {
  position: relative;
  width: 210mm;
  height: 297mm;
  min-height: 297mm;
  margin: 0 auto;
  overflow: hidden;
  background: #f8fbf8;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
```

Belge ölçülerini `100vh`, `100vw` veya yalnızca piksel değerleriyle oluşturma.

Belge konumlarında `mm`, font ölçülerinde tercihen `pt` kullan.

## 4. Referans görselin A4 ölçüm planı

Referans görsel yaklaşık olarak gerçek A4 oranındadır.

Başlangıç ölçülerini şu şekilde oluştur:

```text
Sayfa genişliği: 210 mm
Sayfa yüksekliği: 297 mm

Sol içerik boşluğu: 14 mm
Sağ içerik boşluğu: 14 mm
Üst güvenli boşluk: 13 mm
Alt güvenli boşluk: 12 mm

Kullanılabilir içerik genişliği: 182 mm
Header başlangıcı: yaklaşık 13 mm
Header yüksekliği: yaklaşık 19 mm
İlk section başlangıcı: yaklaşık 34 mm
Footer tabanı: yaklaşık 284 mm
```

Şablon tek ana sütun kullanmalıdır. İçerik genişliğini gereksiz biçimde daraltma.

## 5. Ana kompozisyon

Sayfa şu sırayla oluşturulmalıdır:

```text
1. Ortalanmış profil başlığı
2. Zusammenfassung
3. Stärken
4. Erfahrung
5. Ausbildung
6. Sprachen
7. Footer
```

Opsiyonel bölümler:

```text
Projekte
Kenntnisse
Zertifikate
Weiterbildungen
Veröffentlichungen
Auszeichnungen
Ehrenamt
```

Kullanıcı bölüm sırasını değiştirebilmeli ve istemediği bölümleri gizleyebilmelidir.

## 6. Tam sayfa suluboya arka plan

Referans görselde tüm sayfaya yayılan çok açık bir suluboya dokusu bulunmaktadır.

Arka planın özellikleri:

* Çok açık buz mavisi
* Çok açık mint tonu
* Açık krem veya bej bölgeler
* Beyaz boşluklarla yumuşak geçişler
* Düşük kontrast
* Metnin okunabilirliğini bozmayan yoğunluk
* Sayfa kenarlarına kadar uzanan desen
* Tekrarlanmayan büyük kompozisyon

Arka planı içerik componentlerinin içine ekleme. Mevcut:

```text
src/components/document/DocumentBackgroundLayer.tsx
```

üzerinden ayrı katmanda render et.

Önerilen yapı:

```tsx
<DocumentBackgroundLayer>
  <IvyLeagueWatercolorBackground />
</DocumentBackgroundLayer>
```

Tercihen özgün ve optimize edilmiş SVG kullan.

SVG veya arka plan:

* Referanstaki dokunun birebir kopyası olmamalı
* Benzer pastel suluboya karakteri taşımalı
* `pointer-events: none` kullanmalı
* İçeriğin arkasında kalmalı
* PDF çıktısında aynı yerde görünmeli
* Kullanıcı tarafından kapatılabilmeli
* Opacity değeri tasarım panelinden ayarlanabilmeli
* ATS görünümünde kaldırılabilmeli

Arka plan için büyük Base64 stringlerini React state içine kaydetme.

## 7. Design tokenları

Şablon değerlerini CSS ve JSX içine dağınık yazma.

Mevcut `documentDesign.ts` sistemini kullan veya uyumlu biçimde genişlet.

Başlangıç değerleri:

```ts
export const ivyLeagueTemplateDefaults = {
  page: {
    widthMm: 210,
    heightMm: 297,
    marginTopMm: 13,
    marginRightMm: 14,
    marginBottomMm: 12,
    marginLeftMm: 14,
  },

  layout: {
    contentWidthMm: 182,
    headerHeightMm: 19,
    sectionGapMm: 6.5,
    entryGapMm: 4.5,
    titleRuleGapMm: 1.5,
    strengthsColumnGapMm: 8,
  },

  colors: {
    primary: "#073C8C",
    accent: "#FF6A00",
    heading: "#073C8C",
    text: "#3F4B50",
    mutedText: "#667177",
    divider: "#0B459A",
    activeLevel: "#073C8C",
    inactiveLevel: "#DCE9E8",
    pageBackground: "#F8FBF8",
  },

  typography: {
    headingFontFamily:
      '"Georgia", "Times New Roman", Times, serif',
    bodyFontFamily:
      '"Source Sans 3", "Segoe UI", Arial, Helvetica, sans-serif',
    nameSizePt: 17.5,
    professionSizePt: 11.5,
    sectionTitleSizePt: 13.5,
    entryTitleSizePt: 10.5,
    bodySizePt: 8.5,
    smallSizePt: 7.8,
    lineHeight: 1.34,
  },

  background: {
    opacity: 0.58,
  },
} as const;
```

Renkleri, fontları ve ölçüleri referans önizlemeyle karşılaştırarak düzenle.

Kullanıcı tasarım panelinden en az şu ayarları değiştirebilmelidir:

* Ana mavi renk
* Turuncu vurgu rengi
* Gövde metni rengi
* Heading fontu
* Body fontu
* Font boyutu
* Satır yüksekliği
* Kenar boşlukları
* Section aralıkları
* Suluboya arka planı
* Arka plan opacity değeri

## 8. Header

Header sayfanın üst kısmında ortalanmış olmalıdır.

İçerik:

* Vorname
* Nachname
* Berufsbezeichnung
* Spezialisierungen
* Telefon
* E-posta
* LinkedIn
* Wohnort
* Opsiyonel doğum tarihi ve yeri
* Opsiyonel website veya GitHub

Örnek:

```text
LENA HOFFMANN

Ingenieurin | Maschinenbau | Regelwerke | FEM

+49 30 12345678 · lena@example.de · linkedin.com
· München, Deutschland · Geb. 01.03.1990 in München
```

İsim:

* Büyük harfli
* Koyu mavi
* Serif font
* Kalın
* Ortalanmış
* Kontrollü harf aralıklı

Meslek unvanı:

* Turuncu
* Sans-serif
* Normal veya orta font ağırlığı
* Ortalanmış
* Uzun içerikte kontrollü satır kırmalı

İletişim bilgileri:

* Tek veya iki satırda gösterilebilmeli
* Ortalanmış olmalı
* Küçük koyu gri metin kullanmalı
* Nokta ayraçlarla ayrılabilmeli
* Eksik alanlar gereksiz ayraç oluşturmamalı
* PDF içinde URL’ler tıklanabilir olmalı

Önerilen CSS yaklaşımı:

```css
.ivy-league-header {
  position: relative;
  z-index: 2;
  text-align: center;
  margin-bottom: 5.5mm;
}

.ivy-league-header__name {
  margin: 0;
  color: var(--ivy-primary);
  font-family: var(--ivy-heading-font);
  font-size: var(--ivy-name-size);
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.015em;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

.ivy-league-header__profession {
  margin: 1.5mm 0 1.3mm;
  color: var(--ivy-accent);
  font-family: var(--ivy-body-font);
  font-size: var(--ivy-profession-size);
  font-weight: 400;
  line-height: 1.2;
}

.ivy-league-header__contacts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8mm 2.5mm;
  color: var(--ivy-text);
  font-family: var(--ivy-body-font);
  font-size: var(--ivy-small-size);
  line-height: 1.25;
}
```

Bu template varsayılan olarak profil fotoğrafı kullanmamalıdır. Kullanıcı fotoğraf eklerse şablonun klasik merkezî yapısını bozmayacak opsiyonel bir varyant tanımlanabilir; ancak başlangıç görünümü fotoğrafsız olmalıdır.

## 9. Section başlıkları

Referans görselde section başlıkları:

* Ortalanmış
* Serif fontlu
* Koyu mavi
* Başlığın altında tam genişlikte ince mavi çizgi
* Başlıktan önce ve sonra dengeli boşluk

şeklindedir.

```css
.ivy-league-section {
  position: relative;
  z-index: 2;
  margin-bottom: var(--ivy-section-gap);
}

.ivy-league-section__title {
  margin: 0;
  padding-bottom: var(--ivy-title-rule-gap);
  border-bottom: 0.3mm solid var(--ivy-divider);
  color: var(--ivy-heading);
  font-family: var(--ivy-heading-font);
  font-size: var(--ivy-section-title-size);
  font-weight: 700;
  line-height: 1.05;
  text-align: center;
  break-after: avoid;
  page-break-after: avoid;
}
```

Başlıklar referanstaki gibi baş harfi büyük biçimde kullanılmalıdır:

```text
Zusammenfassung
Stärken
Erfahrung
Ausbildung
Sprachen
```

Bu template’de section başlıklarını otomatik olarak tamamı büyük harfe dönüştürme.

## 10. Zusammenfassung

Özet section başlığının altında tam genişlikte gösterilmelidir.

Kurallar:

* Sol hizalı gövde metni
* Koyu gri
* Sans-serif
* Yaklaşık 2–4 satır
* Sabit yüksekliğe sıkıştırılmamalı
* `overflow: hidden` kullanılmamalı
* Uzun metin flow modunda alanı büyütmeli
* Satır uzunluğu A4 genişliğini dengeli kullanmalı

```css
.ivy-league-summary {
  margin: 2.5mm 0 0;
  color: var(--ivy-text);
  font-size: var(--ivy-body-size);
  line-height: var(--ivy-line-height);
  text-align: left;
  hyphens: auto;
  overflow-wrap: break-word;
}
```

## 11. Stärken

Referans görselde güçlü yönler yatay olarak üç sütunda gösterilmektedir.

Başlangıç düzeni:

```text
Analytische Fähigkeiten
Kundenbetreuung
Teamführung
```

Her öğe:

* Sol tarafta turuncu ikon
* Sağda mavi başlık
* Altında kısa açıklama
* Üç sütunlu grid

kullanmalıdır.

```css
.ivy-league-strengths {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: var(--ivy-strengths-column-gap);
  margin-top: 2.5mm;
}

.ivy-league-strength {
  display: grid;
  grid-template-columns: 6mm minmax(0, 1fr);
  column-gap: 1.5mm;
  align-items: start;
  min-width: 0;
  break-inside: avoid;
}

.ivy-league-strength__icon {
  color: var(--ivy-accent);
  font-size: 13pt;
  line-height: 1;
}

.ivy-league-strength__title {
  margin: 0 0 1mm;
  color: var(--ivy-primary);
  font-size: 9.5pt;
  font-weight: 600;
  line-height: 1.15;
}

.ivy-league-strength__description {
  margin: 0;
  color: var(--ivy-text);
  font-size: var(--ivy-body-size);
  line-height: var(--ivy-line-height);
}
```

Bir veya iki güçlü yön olduğunda grid kalan alanı profesyonel biçimde kullanmalıdır.

Üçten fazla kayıt bulunduğunda yeni satıra geçmelidir.

ATS modunda ikonlar kaldırılmalı ve güçlü yönler doğrusal metin olarak gösterilmelidir.

## 12. Erfahrung

Berufserfahrung tam sayfa genişliğini kullanmalıdır.

Her deneyim kaydı şu yapıda olmalıdır:

```text
Şirket adı                              Lokasyon
Pozisyon                                Tarih
Kısa görev açıklaması
Başarı maddeleri
```

Örnek:

```text
Siemens AG                              Berlin, Deutschland
Senior Maschinenbauingenieur            2019–2023
```

Renk hiyerarşisi:

* Şirket: turuncu
* Pozisyon: koyu mavi
* Lokasyon ve tarih: koyu gri
* Gövde: koyu gri

Önerilen CSS:

```css
.ivy-league-experience-entry {
  margin-top: 2.5mm;
  margin-bottom: var(--ivy-entry-gap);
  break-inside: avoid;
  page-break-inside: avoid;
}

.ivy-league-experience-entry__top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  column-gap: 8mm;
  align-items: baseline;
}

.ivy-league-experience-entry__company {
  margin: 0;
  color: var(--ivy-accent);
  font-size: var(--ivy-entry-title-size);
  font-weight: 500;
  line-height: 1.15;
}

.ivy-league-experience-entry__location {
  color: var(--ivy-text);
  font-size: var(--ivy-body-size);
  text-align: right;
}

.ivy-league-experience-entry__role-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  column-gap: 8mm;
  margin-top: 0.7mm;
}

.ivy-league-experience-entry__role {
  color: var(--ivy-primary);
  font-size: 9.7pt;
  font-weight: 500;
}

.ivy-league-experience-entry__date {
  color: var(--ivy-text);
  font-size: var(--ivy-body-size);
  white-space: nowrap;
}

.ivy-league-experience-entry__summary {
  margin: 1.5mm 0 1mm;
  color: var(--ivy-text);
  font-size: var(--ivy-body-size);
  line-height: var(--ivy-line-height);
}

.ivy-league-experience-entry__achievements {
  margin: 0;
  padding-left: 4.5mm;
  color: var(--ivy-text);
  font-size: var(--ivy-body-size);
  line-height: var(--ivy-line-height);
}

.ivy-league-experience-entry__achievements li {
  margin: 0.4mm 0;
  padding-left: 0.5mm;
}
```

Uzun şirket, pozisyon veya lokasyon metinlerinde içerik kesilmemeli. Gerekirse sağ alan kontrollü biçimde alt satıra geçmelidir.

Bir deneyim kaydı mümkün olduğunca sayfalar arasında bölünmemelidir.

## 13. Ausbildung

Eğitim bölümü deneyim yapısının daha kompakt sürümünü kullanmalıdır.

Görsel sıra:

```text
Eğitim kurumu                            Lokasyon
Derece                                   Tarih
```

Örnek:

```text
Technische Universität München           München, Deutschland
Master in Maschinenbau                    2011–2013
```

Renkler:

* Kurum: turuncu
* Derece: koyu mavi
* Lokasyon ve tarih: koyu gri

Her eğitim kaydı mümkün olduğunca tek parça tutulmalıdır.

## 14. Sprachen

Referans görselde dil bölümü sayfanın alt kısmında yatay olarak düzenlenmiştir.

Başlangıç görünümü:

```text
Deutsch    Muttersprache    ● ● ● ● ●

Englisch   Fortgeschritten  ● ● ● ○ ○
```

İki dil yan yana gösterilebilir.

```css
.ivy-league-languages {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 20mm;
  margin-top: 2.5mm;
}

.ivy-league-language {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 2mm;
  align-items: center;
  min-width: 0;
}

.ivy-league-language__name {
  color: var(--ivy-primary);
  font-weight: 500;
}

.ivy-league-language__level {
  color: var(--ivy-text);
}

.ivy-league-language__dots {
  display: flex;
  gap: 1mm;
}

.ivy-league-language__dot {
  width: 2.1mm;
  height: 2.1mm;
  border-radius: 50%;
  background: var(--ivy-inactive-level);
}

.ivy-league-language__dot--active {
  background: var(--ivy-active-level);
}
```

Veri modelinde nokta sayısını ana seviye olarak saklama. CEFR veya açık seviye değeri kullan.

ATS modunda:

```text
Deutsch – Muttersprache
Englisch – B2
```

formatını göster.

## 15. Footer

Footer sade, küçük ve markasız olmalıdır.

Sol tarafta:

```text
portfolio.example.com
```

Sağ tarafta:

```text
Seite 1 / 2
```

Desteklenen alanlar:

* Website
* Portfolio
* Sayfa numarası
* Opsiyonel güncelleme tarihi

```css
.ivy-league-footer {
  position: absolute;
  right: var(--ivy-page-margin-right);
  bottom: 6mm;
  left: var(--ivy-page-margin-left);
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--ivy-muted);
  font-size: 7.1pt;
}
```

Üçüncü taraf marka, platform logosu veya “Powered by” metni ekleme.

## 16. ATS görünümü

Tek sütunlu visual düzen ATS açısından avantajlıdır; ancak dekoratif stilleri otomatik olarak ATS güvenli kabul etme.

İki çıktı modu destekle:

```ts
type ResumeOutputMode = "visual" | "ats";
```

ATS modunda:

* Suluboya arka planını kaldır
* İkonları kaldır
* Dil noktalarını açık metne dönüştür
* Standart sistem fontu kullan
* Tüm içeriği doğrusal DOM sırasıyla render et
* Mutlak konumlandırma kullanma
* Tablo kullanma
* Metni seçilebilir ve aranabilir tut
* Section başlıklarını standart Almanca başlıklarla göster

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

Her ana section bağımsız editör kartı olmalıdır:

```text
ivy-league.header
ivy-league.summary
ivy-league.strengths
ivy-league.experience
ivy-league.education
ivy-league.languages
ivy-league.background
ivy-league.footer
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
* Template başlangıç düzenine dönebilmelidir

Layout değerlerini CSS transform stringi olarak saklama.

```ts
interface DocumentElementLayout {
  elementId: string;
  templateId: "ivy-league";
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

Preview zoom değerini gerçek layout koordinatlarına yazma.

## 18. Flow ve freeform modu

İki layout modu destekle:

```ts
type DocumentLayoutMode = "flow" | "freeform";
```

### Flow modu

* Varsayılan kullanım
* Tek sütunlu normal belge akışı
* Otomatik pagination
* İçerik uzunluğuna göre section büyümesi
* Experience kayıtlarını mümkün olduğunca bölmeme
* Section başlığını sayfa sonunda yalnız bırakmama
* Stärken grid’ini kontrollü biçimde yeni satıra geçirme

### Freeform modu

* Kartlar manuel A4 koordinatlarıyla taşınır
* Kartlar büyütülüp küçültülebilir
* Otomatik pagination uygulanmaz
* A4 dışına taşma engellenir
* Kart çakışmaları kullanıcıya bildirilir
* Kullanıcı yeni sayfa ekleyebilir

## 19. Çok sayfalı davranış

İçerik ilk sayfaya sığmazsa:

* İkinci gerçek A4 sayfası oluştur
* Büyük header’ı ikinci sayfada tekrar etme
* İkinci sayfada sadeleştirilmiş isim ve meslek başlığı kullan
* Suluboya arka planı her sayfada gösterebilme veya yalnızca ilk sayfada kullanma seçeneği sun
* Experience kaydını mümkün olduğunca bölme
* Section başlığını tek başına bırakma
* Footer sayfa numarasını güncelle
* Tüm içeriği tek sayfaya sığdırmak için fontları aşırı küçültme
* Sayfayı `transform: scale()` ile sıkıştırma

Önerilen ayar:

```ts
type BackgroundContinuationMode =
  | "all-pages"
  | "first-page-only"
  | "none";
```

Varsayılan:

```text
all-pages
```

## 20. React component mimarisi

Şablonu tek büyük component içinde oluşturma.

Önerilen yapı:

```text
src/components/resume/templates/ivy-league/
├── IvyLeagueResume.tsx
├── IvyLeaguePage.tsx
├── IvyLeagueHeader.tsx
├── IvyLeagueBackground.tsx
├── IvyLeagueSectionHeading.tsx
├── IvyLeagueSummarySection.tsx
├── IvyLeagueStrengthsSection.tsx
├── IvyLeagueExperienceSection.tsx
├── IvyLeagueEducationSection.tsx
├── IvyLeagueLanguagesSection.tsx
├── IvyLeagueFooter.tsx
├── ivy-league.defaults.ts
├── ivy-league.layout.ts
├── ivy-league.types.ts
└── ivy-league.css
```

Ancak mevcut ortak rendererlar varsa tekrar yazma:

* Experience renderer
* Education renderer
* Language renderer
* Contact renderer
* KnowledgeSectionRenderer
* EditableDocumentElement
* DocumentBackgroundLayer
* Pagination utilities
* Design token sistemi
* Template registry

Template-specific componentler yalnızca Ivy League görsel farklılıklarını yönetmelidir.

## 21. Print ve PDF

```css
@media screen {
  .ivy-league-page {
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

  .ivy-league-page {
    width: 210mm;
    height: 297mm;
    min-height: 297mm;
    margin: 0;
    overflow: hidden;
    box-shadow: none;
    break-after: page;
    page-break-after: always;
  }

  .ivy-league-page:last-child {
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

PDF üretiminden önce:

* Fontların yüklenmesini bekle
* Suluboya SVG veya arka plan assetinin yüklenmesini bekle
* `printBackground: true` kullan
* Preview zoom transformunu kaldır
* Selection, resize ve guide araçlarını gizle
* Her sayfanın gerçek A4 ölçüsünde olduğunu doğrula

## 22. Görsel doğruluk süreci

İlk uygulamadan sonra referans görsel ile oluşturulan önizlemeyi yan yana karşılaştır.

Şunları tek tek ölç:

* Sayfa kenar boşlukları
* İsim alanının üst konumu
* İsim font ailesi, boyutu ve ağırlığı
* Meslek unvanının turuncu tonu
* İletişim satırının yatay konumu
* İlk section başlangıç yüksekliği
* Section başlıklarının ortalanması
* Yatay çizgilerin kalınlığı ve uzunluğu
* Stärken bölümünün üç sütunlu oranları
* Experience kayıtlarının dikey boşlukları
* Şirket ve pozisyon renkleri
* Gövde font boyutu
* Madde işareti girintileri
* Ausbildung başlangıç noktası
* Dil alanının yatay yerleşimi
* Suluboya arka planının yoğunluğu ve konumu
* Footer konumu
* Sayfa altında kalan boşluk

İlk sonuç referanstan belirgin şekilde farklıysa tokenları, spacing değerlerini, fontları ve arka plan opacity değerini yeniden ayarla.

## 23. Test gereksinimleri

Şu senaryoları test et:

1. Ivy League metadata kaydı
2. ATS, Muster ve preview dosyalarının doğru eşleşmesi
3. Varsayılan tek sütunlu yerleşim
4. Suluboya arka planının açılıp kapatılması
5. Uzun isim
6. Uzun meslek unvanı
7. Eksik iletişim bilgileri
8. Uzun Zusammenfassung
9. Bir, iki, üç ve dört Stärke
10. Üç veya daha fazla Berufserfahrung kaydı
11. Uzun şirket, pozisyon ve lokasyon metinleri
12. Çok sayıda achievement maddesi
13. Birden fazla Ausbildung kaydı
14. İki ve daha fazla dil
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
25. Arka planın PDF’de doğru basılması
26. Template değişiminde ResumeData içeriğinin korunması
27. Uygulama yeniden açıldığında layout’un geri yüklenmesi
28. Setup ve Portable sürümde template kaynaklarının bulunması

## 24. Çalışma sırası

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

Mevcut ortak rendererları, template metadata sistemini, persistence akışını ve PDF üretimini belirle.

### Aşama 2: Referans ölçüm planı

Referans görseldeki:

* A4 oranını
* Kenar boşluklarını
* Header yüksekliğini
* Section başlangıçlarını
* Stärken sütunlarını
* Experience alanını
* Dil yerleşimini
* Footer konumunu

milimetre cinsinden yaklaşık olarak çıkar.

### Aşama 3: Metadata ve design tokenları

* Ivy League metadata kaydını ekle
* Template filename eşleştirmesini yap
* Renk, tipografi ve layout varsayılanlarını oluştur
* Section sırasını tanımla

### Aşama 4: React componentleri

Page, background, header, sectionlar ve footer componentlerini oluştur.

### Aşama 5: Tam CSS

Eksiksiz ve production-ready `ivy-league.css` dosyasını oluştur.

### Aşama 6: Editör entegrasyonu

Selection, drag, resize, lock, hide, layer ve reset özelliklerini bağla.

### Aşama 7: ATS, pagination ve PDF

Tek sütun ATS görünümünü, çok sayfalı çıktıyı ve PDF uyumluluğunu tamamla.

### Aşama 8: Görsel karşılaştırma

Referans ile üretilen çıktı arasındaki spacing, font, renk ve ölçü farklarını gider.

Her aşamadan sonra sonraki aşamaya geçmeden bekle.

## 25. Kod çıktı formatı

Her dosya için:

```text
Dosya: src/ilgili/dosya.tsx
İşlem: Güncellenecek | Yeni oluşturulacak | Silinecek
Amaç: Yapılan değişikliğin teknik açıklaması
```

Ardından eksiksiz ve doğrudan uygulanabilir kodu ver.

Kurallar:

* Eksik import bırakma
* Hayali type, component veya API üretme
* Pseudocode yazma
* JSX ve CSS class adlarını eşleştir
* Mevcut ortak rendererları gerekçesiz kopyalama
* Demo içeriği gerçek kullanıcı verisi olarak saklama
* Referanstaki üçüncü taraf marka ve logoları kopyalama
* Visual görünümü otomatik ATS uyumlu kabul etme
* `dist-electron`, `artifacts`, `release` veya `windows-release` dosyalarını düzenleme
* Ben istemeden Tailwind, Bootstrap veya ağır bir UI framework ekleme
* Mevcut projeyi baştan yazma

## 26. Beklenen cevap formatı

Her cevapta şu başlıkları kullan:

### 1. Referans görsel analizi

### 2. A4 ölçüm ve yerleşim planı

### 3. Mevcut projeden yeniden kullanılacak yapılar

### 4. Ivy League template mimarisi

### 5. Değiştirilecek dosyalar

### 6. Design tokenları

### 7. React ve TypeScript kodları

### 8. Tam CSS kodu

### 9. ATS, pagination ve PDF değişiklikleri

### 10. Testler

### 11. PowerShell komutları

### 12. Görsel karşılaştırma kontrol listesi

İlk olarak yalnızca **Aşama 1 ve Aşama 2’yi** gerçekleştir. Mevcut proje yapısını analiz et, yeni Ivy League kaynaklarının mevcut template servislerine nasıl bağlanacağını belirle ve referans görseldeki A4 yerleşimini milimetre bazında çıkar. Mevcut kodla doğrulanmamış component, import veya API üretme.
