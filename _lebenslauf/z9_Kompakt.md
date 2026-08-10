![Eine kompakte Lebenslauf Vorlage, ideal um viele Informationen auf einer einzigen Seite unterzubringen. Mit blauem Akzent.](https://cdn.enhancv.com/predefined-examples/RZDQqGdnFGDp3BKBo9GVKN7bdV0YOAaOG7BXTN4m/image.png)


* Konu: Referans görselle yüksek doğrulukta eşleşen “Kompakt” tek sayfalık Lebenslauf şablonu
* İstenilen çıktı: A4 ölçüsünde; küçük kenar boşlukları, mavi-turuncu renk paleti, iki sütunlu yoğun içerik düzeni, sağ üst dekoratif çizgiler ve tek sayfaya optimize edilmiş bilgi hiyerarşisiyle referans görsele mümkün olduğunca yakın çalışan; React, TypeScript, CSS, Electron, PDF, ATS ve serbest düzenleme sistemiyle uyumlu Lebenslauf şablonu
* Kullanılacak framework: RASCEF
* Senin yazacağın prompt:

Sen Electron, React, TypeScript, modern CSS, A4 belge tasarımı, ATS uyumluluğu, PDF üretimi ve görsel karşılaştırmalı frontend geliştirme konusunda uzman kıdemli bir yazılım geliştiricisisin.

“Bewerbung Studio” uygulamam için **Kompakt** adlı tek sayfalık Lebenslauf şablonunu oluşturacaksın.

Sana verdiğim referans görsel ana tasarım kaynağıdır. Oluşturacağın ekran önizlemesi ve PDF çıktısı; referanstaki A4 kompozisyonuna, küçük kenar boşluklarına, sol geniş ve sağ dar sütun yapısına, mavi-turuncu renk paletine, sağ üst dekoratif çizgilere, yazı boyutlarına, section başlangıçlarına ve yoğun içerik kullanımına mümkün olduğunca yakın görünmelidir.

Sonuç yalnızca benzer renklerde genel bir CV tasarımı olmamalıdır. Referans görseldeki yerleşimi milimetre bazında analiz ederek görsel olarak belirgin biçimde eşleşen, tek sayfada yüksek bilgi yoğunluğu sağlayan production kalitesinde bir şablon oluştur.

Referansta bulunan üçüncü taraf logo, platform adı, “Powered by” metni ve website adresini kopyalama. Footer yalnızca kullanıcıya ait website, portfolio, sayfa numarası veya isteğe bağlı belge bilgilerini içermelidir.

## 1. Template bilgileri

Kullanıcı arayüzündeki şablon adı:

```text
Kompakt
```

Teknik kimlik:

```text
kompakt
```

Açıklama:

```text
Einseitige Lebenslaufvorlage mit kleineren Seitenrändern und platzsparender Informationsstruktur.
```

Mevcut template metadata modeline uyarlanacak hedef özellikler:

```ts
{
  id: "kompakt",
  name: "Kompakt",
  category: "compact-professional",
  documentKind: "lebenslauf",
  description:
    "Einseitige Lebenslaufvorlage mit kleineren Seitenrändern und platzsparender Informationsstruktur.",
  atsSupported: true,
  supportsPhoto: false,
  supportsFreeform: true,
  supportsMultiplePages: true,
  optimizedForSinglePage: true,
  defaultOutputMode: "visual"
}
```

Mevcut template registry, store ve type sistemini kullan. Paralel bir template altyapısı oluşturma.

## 2. Mevcut template kaynakları

Projede bulunan şu dosyaları kullan:

```text
public/templates/Kompakt_Lebenslauf_ATS.docx
public/templates/Kompakt_Lebenslauf_Muster.docx
public/templates/Kompakt_Lebenslauf_Muster.preview.png
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

Yeni bir dosya adlandırma standardı oluşturma.

Development, Setup ve Portable sürümlerde ATS DOCX, Muster DOCX ve preview PNG dosyalarının bulunabildiğini doğrula.

## 3. A4 sayfa standardı

Belge kesin olarak:

```text
210 mm × 297 mm
```

ölçüsünde olmalıdır.

Temel yapı:

```css
@page {
  size: A4;
  margin: 0;
}

.kompakt-page {
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

A4 yerleşimini `100vh`, `100vw` veya yalnızca piksel değerleriyle oluşturma.

Belge konumlarında `mm`, font ölçülerinde tercihen `pt` kullan.

## 4. Referans yerleşimi

Şablon aşağıdaki bölgelerden oluşmalıdır:

```text
1. Üstte sade isim alanı
2. Sol geniş kariyer sütunu
3. Sağ dar tamamlayıcı bilgi sütunu
4. Sağ üst ve orta alanda dekoratif çizgi deseni
5. Sayfanın altında sade footer
```

Referansa yakın başlangıç ölçüleri:

```text
Sayfa genişliği: 210 mm
Sayfa yüksekliği: 297 mm

Sol kenar boşluğu: 13 mm
Sağ kenar boşluğu: 13 mm
Üst kenar boşluğu: 13 mm
Alt güvenli boşluk: 12 mm

Header yüksekliği: yaklaşık 20–23 mm
Ana içerik başlangıcı: yaklaşık 31–34 mm

Kullanılabilir içerik genişliği: yaklaşık 184 mm
Sol sütun genişliği: yaklaşık 108 mm
Sütun aralığı: yaklaşık 10 mm
Sağ sütun genişliği: yaklaşık 66 mm
```

Sütun oranı yaklaşık:

```text
Sol sütun: %59
Sütun aralığı: %5
Sağ sütun: %36
```

olmalıdır.

Küçük kenar boşlukları içeriğe daha fazla alan sağlamalı; ancak metin A4 baskı güvenli alanının dışına çıkmamalıdır.

## 5. Design tokenları

Mevcut `documentDesign.ts` yapısını kullan veya genişlet.

Başlangıç değerleri:

```ts
export const kompaktTemplateDefaults = {
  page: {
    widthMm: 210,
    heightMm: 297,
    marginTopMm: 13,
    marginRightMm: 13,
    marginBottomMm: 12,
    marginLeftMm: 13,
  },

  layout: {
    headerHeightMm: 22,
    contentTopMm: 33,
    leftColumnWidthMm: 108,
    columnGapMm: 10,
    rightColumnWidthMm: 66,
    sectionGapMm: 5.5,
    entryGapMm: 4,
  },

  colors: {
    primary: "#073D96",
    accent: "#FF6200",
    heading: "#073D96",
    text: "#3F494F",
    mutedText: "#6D757A",
    divider: "#AEB6BA",
    pattern: "#FFD7BC",
    pageBackground: "#FFFFFF",
    activeLevel: "#FF6200",
    inactiveLevel: "#E1E5E7",
  },

  typography: {
    fontFamily:
      '"Source Sans 3", "Segoe UI", Arial, Helvetica, sans-serif',
    nameSizePt: 20,
    sectionTitleSizePt: 8.5,
    entryTitleSizePt: 10.5,
    bodySizePt: 8,
    smallSizePt: 7.4,
    lineHeight: 1.25,
  },

  background: {
    patternOpacity: 0.72,
  },
} as const;
```

Renkleri, ölçüleri ve tipografiyi referans önizlemeyle karşılaştırarak düzenle.

Kullanıcı tasarım panelinden şu değerleri değiştirebilmelidir:

* Ana mavi renk
* Turuncu vurgu rengi
* Gövde metni rengi
* Dekoratif çizgi rengi ve opacity değeri
* Font ailesi
* Font boyutu
* Satır yüksekliği
* Sütun oranları
* Sütun aralığı
* Section boşlukları
* Sayfa kenar boşlukları

## 6. Üst isim alanı

Referans görselde header oldukça sade ve kompakttır.

İçerik:

* Vorname
* Nachname

Opsiyonel olarak meslek unvanı isim altında gösterilebilir; ancak varsayılan görünümde yalnızca isim kullanılmalıdır.

Örnek:

```text
Julian Fischer
```

İsim:

* Koyu mavi
* Sans-serif
* Orta font ağırlığı
* Büyük ancak aşırı baskın olmayan
* Sol hizalı
* Baş harfleri büyük
* Büyük harfe zorlanmayan

olmalıdır.

```css
.kompakt-header {
  position: relative;
  z-index: 2;
  min-height: var(--kompakt-header-height);
}

.kompakt-header__name {
  margin: 0;
  color: var(--kompakt-primary);
  font-size: var(--kompakt-name-size);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.005em;
  overflow-wrap: anywhere;
}
```

Uzun isimlerde tasarım bozulmamalı ve kontrollü satır kırılmalıdır.

## 7. Dekoratif çizgi arka planı

Referans görselin sağ üstünden başlayan ve sağ sütunun arkasında aşağı doğru devam eden ince turuncu çizgiler bulunmaktadır.

Desenin özellikleri:

* Çok ince turuncu çizgiler
* Birbirine paralel akışlar
* Yuvarlatılmış dönüşler
* Bazı çizgilerin ucunda küçük daireler
* Sağ üstte yoğun
* Sağ orta bölgede hafif devam eden
* Metnin okunmasını engellemeyen düşük kontrast
* Fotoğraf veya logo içermeyen özgün tasarım

Mevcut:

```text
src/components/document/DocumentBackgroundLayer.tsx
```

üzerinden ayrı bir background layer olarak render et.

Önerilen yapı:

```tsx
<DocumentBackgroundLayer>
  <KompaktFlowLines />
</DocumentBackgroundLayer>
```

Kurallar:

* Özgün ve optimize edilmiş SVG kullan
* Referans vektörünü birebir kopyalama
* `pointer-events: none`
* İçerikten düşük `z-index`
* PDF çıktısında aynı konum
* Kullanıcı tarafından kapatılabilme
* Opacity değerinin design ayarından değiştirilebilmesi
* ATS modunda gizlenme

## 8. Ana içerik sütunları

Ana içerik iki sütunlu grid olmalıdır:

```css
.kompakt-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns:
    minmax(0, var(--kompakt-left-column-width))
    minmax(0, var(--kompakt-right-column-width));
  column-gap: var(--kompakt-column-gap);
  align-items: start;
}

.kompakt-column {
  min-width: 0;
}
```

Dar Electron penceresinde sütunları alt alta geçirme. Preview zoom azalt ve scroll kullan.

## 9. Sol sütun

Varsayılan bölümler:

```text
ERFAHRUNG
AUSBILDUNG
SPRACHEN
```

Opsiyonel:

```text
PROJEKTE
WEITERBILDUNGEN
ZERTIFIKATE
```

Sol sütun ana kariyer geçmişini taşımalıdır.

## 10. Sağ sütun

Varsayılan bölümler:

```text
KONTAKTDATEN
ZUSAMMENFASSUNG
STÄRKEN
ERFOLGE
FÄHIGKEITEN
```

Opsiyonel:

```text
INTERESSEN
REFERENZEN
EHRENAMT
```

Sağ sütun kompakt ve hızlı taranabilir olmalıdır.

## 11. Section başlıkları

Referansta section başlıkları:

* Küçük
* Gri
* Büyük harfli
* İnce veya normal font ağırlığında
* Çizgisiz veya çok sade

şeklindedir.

```css
.kompakt-section {
  margin-bottom: var(--kompakt-section-gap);
}

.kompakt-section__title {
  margin: 0 0 3mm;
  color: var(--kompakt-muted);
  font-size: var(--kompakt-section-title-size);
  font-weight: 400;
  line-height: 1;
  text-transform: uppercase;
  break-after: avoid;
  page-break-after: avoid;
}
```

Section başlığı sayfa sonunda tek başına kalmamalıdır.

## 12. Berufserfahrung

Her deneyim kaydı şu sırayı kullanmalıdır:

```text
Pozisyon
Şirket        Tarih        Lokasyon
Kısa açıklama
Başarı maddeleri
```

Örnek:

```text
Stellvertretender Restaurantleiter
Sushi Palace     2019–2023     Düsseldorf
```

Renk hiyerarşisi:

* Pozisyon: koyu mavi
* Şirket: turuncu
* Tarih ve konum: gri
* Gövde: koyu gri

```css
.kompakt-experience-entry {
  margin-bottom: var(--kompakt-entry-gap);
  break-inside: avoid;
  page-break-inside: avoid;
}

.kompakt-experience-entry__role {
  margin: 0;
  color: var(--kompakt-primary);
  font-size: var(--kompakt-entry-title-size);
  font-weight: 500;
  line-height: 1.15;
}

.kompakt-experience-entry__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.8mm 4mm;
  margin: 0.6mm 0 1mm;
  font-size: var(--kompakt-small-size);
}

.kompakt-experience-entry__company {
  color: var(--kompakt-accent);
  font-weight: 500;
}

.kompakt-experience-entry__date,
.kompakt-experience-entry__location {
  color: var(--kompakt-muted);
}

.kompakt-experience-entry__summary {
  margin: 0 0 0.8mm;
  color: var(--kompakt-text);
  font-size: var(--kompakt-body-size);
  line-height: var(--kompakt-line-height);
}

.kompakt-experience-entry__achievements {
  margin: 0;
  padding-left: 4mm;
  color: var(--kompakt-text);
  font-size: var(--kompakt-body-size);
  line-height: var(--kompakt-line-height);
}

.kompakt-experience-entry__achievements li {
  margin: 0.25mm 0;
}
```

Tek sayfa hedefi nedeniyle gereksiz dikey boşluk kullanma; ancak satırları okunamaz hâle getirme.

Uzun pozisyon, şirket veya lokasyon bilgileri kesilmemeli ve kontrollü biçimde alt satıra geçmelidir.

## 13. Ausbildung

Eğitim kayıtları deneyim kayıtlarından daha kompakt olmalıdır.

Örnek:

```text
Master in Hotel- und Restaurantmanagement
Technische Universität München
2011–2013    München, Bayern
```

Renkler:

* Derece: koyu mavi
* Kurum: turuncu
* Tarih ve konum: gri

Her kayıt mümkün olduğunca bölünmeden tutulmalıdır.

## 14. Kontaktdaten

Sağ sütunda iletişim bilgileri ikonlarla gösterilmelidir.

Alanlar:

* Telefon
* E-posta
* LinkedIn
* Website
* Wohnort
* Doğum tarihi ve yeri

Her satırda:

* Turuncu ikon
* Koyu mavi iletişim değeri
* Yaklaşık 3–4 mm dikey aralık

bulunmalıdır.

```css
.kompakt-contact-list {
  display: grid;
  gap: 3.5mm;
}

.kompakt-contact-item {
  display: grid;
  grid-template-columns: 5mm minmax(0, 1fr);
  column-gap: 1.5mm;
  align-items: center;
}

.kompakt-contact-item__icon {
  color: var(--kompakt-accent);
}

.kompakt-contact-item__value {
  min-width: 0;
  color: var(--kompakt-primary);
  font-size: 8.8pt;
  line-height: 1.2;
  overflow-wrap: anywhere;
}
```

Eksik alanlar render edilmemeli ve boşluk bırakmamalıdır.

## 15. Zusammenfassung

Sağ sütundaki özet:

* Kompakt
* Koyu gri
* Yaklaşık 7–10 kısa satır
* Normal font ağırlığında
* Sabit yüksekliğe sıkıştırılmayan

bir yapı kullanmalıdır.

Metni `overflow: hidden` ile kesme.

## 16. Stärken

Her güçlü yön:

* Turuncu ikon
* Koyu mavi başlık
* Altında kısa kanıt veya açıklama

içermelidir.

Örnek:

```text
Teamleitung

Erfolgreiche Führung von Teams mit bis zu 30 Mitarbeitern,
wobei hohe Motivation und Produktivität gewährleistet wurde.
```

```css
.kompakt-strength {
  display: grid;
  grid-template-columns: 5mm minmax(0, 1fr);
  column-gap: 1.5mm;
  margin-bottom: 5mm;
  break-inside: avoid;
}

.kompakt-strength__icon {
  color: var(--kompakt-accent);
  font-size: 11pt;
  line-height: 1;
}

.kompakt-strength__title {
  margin: 0 0 1mm;
  color: var(--kompakt-primary);
  font-size: 9pt;
  font-weight: 500;
}

.kompakt-strength__description {
  margin: 0;
  color: var(--kompakt-text);
  font-size: var(--kompakt-body-size);
  line-height: var(--kompakt-line-height);
}
```

ATS modunda ikonları kaldır ve açık metin kullan.

## 17. Erfolge

Her başarı:

* Turuncu ikon
* Koyu mavi başlık
* Kısa açıklama

kullanmalıdır.

Örnek:

```text
Kulturnacht Event

Organisation eines erfolgreichen japanischen Kulturabends,
der über 300 Besucher anzog.
```

Başarılar Stärken ile aynı ortak kart altyapısını kullanabilir; yalnızca içerik türü ve varsayılan ikon farklı olmalıdır.

## 18. Fähigkeiten

Beceriler referanstaki gibi metin etiketleri şeklinde gösterilmelidir.

Örnek:

```text
Qualitätskontrolle
Hygienevorschriften
Kommunikation
Kulturkenntnisse
Serviceorientierung
Stressmanagement
Deutsch
Englisch
Japanisch
```

Stil:

* Koyu mavi
* Kalın
* İnce gri alt çizgi
* Beyaz arka plan
* Satır dolduğunda aşağı geçme
* Aşırı yuvarlatılmış badge kullanmama

```css
.kompakt-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 2mm 3mm;
}

.kompakt-skill {
  padding: 0 1.5mm 1mm;
  border-bottom: 0.3mm solid var(--kompakt-divider);
  color: var(--kompakt-primary);
  font-size: 7.8pt;
  font-weight: 700;
}
```

Mevcut knowledge sistemiyle bağlantı kur:

```text
src/features/knowledge/
src/components/knowledge/
src/components/document/KnowledgeSectionRenderer.tsx
```

## 19. Sprachen

Referansta diller sol sütunun altında yatay biçimde gösterilir.

Örnek:

```text
Deutsch     Muttersprache     ● ● ● ● ●

Englisch    Fortgeschritten   ● ● ● ● ○
```

İki dil yan yana gösterilebilir.

Aktif seviye noktaları turuncu, pasif noktalar açık gri olmalıdır.

Veri modelinde nokta sayısını değil CEFR veya açık dil seviyesini sakla.

ATS modunda:

```text
Deutsch – Muttersprache
Englisch – B2
```

formatını kullan.

## 20. Tek sayfa optimizasyonu

Kompakt template’in temel amacı mümkün olduğunca fazla içeriği tek A4 sayfasında profesyonel biçimde gösterebilmektir.

Ancak şu yöntemleri kullanma:

* Tüm sayfayı `transform: scale()` ile küçültme
* Gövde fontunu okunamaz seviyeye düşürme
* Satır yüksekliğini aşırı sıkıştırma
* Metni kesme
* `overflow: hidden` ile içerik gizleme
* Negatif marginlerle içeriği üst üste bindirme

Tek sayfaya sığdırma sırası şu şekilde olmalıdır:

1. Kullanılmayan boş sectionları kaldır
2. Section aralıklarını güvenli sınırlar içinde azalt
3. Entry aralıklarını azalt
4. Gövde fontunu izin verilen minimum değere kadar küçült
5. Satır yüksekliğini güvenli minimum değere kadar azalt
6. Uzun açıklamalar için kullanıcıya içerik kısaltma uyarısı göster
7. Hâlâ sığmıyorsa ikinci sayfa oluştur

Güvenli sınırlar:

```text
Minimum body font size: 7.5 pt
Minimum line-height: 1.18
Minimum section gap: 3.5 mm
Minimum entry gap: 2.5 mm
```

İçeriği otomatik olarak özetleme veya silme.

## 21. Canva benzeri serbest düzenleme

Her section bağımsız editör kartı olmalıdır:

```text
kompakt.header
kompakt.experience
kompakt.education
kompakt.languages
kompakt.contacts
kompakt.summary
kompakt.strengths
kompakt.achievements
kompakt.skills
kompakt.background
kompakt.footer
```

Kullanıcı:

* Kartı seçebilmeli
* Fareyle taşıyabilmeli
* Sekiz resize tutamacıyla büyütüp küçültebilmeli
* Kartı kilitleyebilmeli
* Gizleyebilmeli
* Katman sırasını değiştirebilmeli
* X, Y, genişlik ve yükseklik değerlerini elle girebilmeli
* Sol ve sağ sütun arasında taşıyabilmeli
* Kartı başka sayfaya taşıyabilmeli
* Template varsayılan düzenine dönebilmelidir

Yerleşimi CSS transform stringi olarak saklama.

```ts
interface DocumentElementLayout {
  elementId: string;
  templateId: "kompakt";
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

## 22. Flow ve freeform modu

İki layout modu destekle:

```ts
type DocumentLayoutMode = "flow" | "freeform";
```

### Flow modu

* Varsayılan mod
* Tek sayfa optimizasyon kurallarını uygular
* İçerik kadar büyüyen sectionlar kullanır
* Otomatik pagination destekler
* Kart çakışmasını engeller
* Deneyim kayıtlarını mümkün olduğunca bölmez

### Freeform modu

* Kullanıcı kartları manuel taşır
* Kartları büyütüp küçültür
* Otomatik pagination uygulanmaz
* A4 dışına taşma engellenir
* Kart çakışmalarında uyarı gösterilir
* Kullanıcı yeni sayfa ekleyebilir

## 23. ATS görünümü

Visual iki sütunlu düzeni otomatik olarak ATS uyumlu kabul etme.

İki çıktı modu destekle:

```ts
type ResumeOutputMode = "visual" | "ats";
```

ATS görünümünde:

* Tek sütun kullan
* Dekoratif çizgileri kaldır
* İkonları kaldır
* Dil noktalarını açık metne dönüştür
* Beceri etiketlerini düz metin listesine dönüştür
* Mantıksal DOM sırası kullan
* Tablo kullanma
* Mutlak konumlandırmaya bağlı bilgi sunma
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
8. Erfolge
9. Projekte
10. Zertifikate
```

Visual ve ATS görünümü aynı `ResumeData` modelini kullanmalıdır.

## 24. Çok sayfalı davranış

Tek sayfa hedeflenmesine rağmen içerik sığmıyorsa:

* İkinci gerçek A4 sayfası oluştur
* Büyük isim alanını tekrar etme
* İkinci sayfada sade isim ve meslek başlığı kullan
* Deneyim kaydını mümkün olduğunca bölme
* Section başlığını sayfa sonunda yalnız bırakma
* Dekoratif çizgileri yalnızca ilk sayfada gösterebilme
* Footer sayfa numarasını güncelle
* İçeriği zorla tek sayfaya sıkıştırma

## 25. Component mimarisi

Şablonu tek büyük component içine yazma.

Önerilen yapı:

```text
src/components/resume/templates/kompakt/
├── KompaktResume.tsx
├── KompaktPage.tsx
├── KompaktHeader.tsx
├── KompaktBackground.tsx
├── KompaktLeftColumn.tsx
├── KompaktRightColumn.tsx
├── KompaktSectionHeading.tsx
├── KompaktExperienceSection.tsx
├── KompaktEducationSection.tsx
├── KompaktLanguagesSection.tsx
├── KompaktContactSection.tsx
├── KompaktSummarySection.tsx
├── KompaktStrengthsSection.tsx
├── KompaktAchievementsSection.tsx
├── KompaktSkillsSection.tsx
├── KompaktFooter.tsx
├── kompakt.defaults.ts
├── kompakt.layout.ts
├── kompakt.types.ts
└── kompakt.css
```

Mevcut ortak rendererlar varsa tekrar yazma:

* Experience renderer
* Education renderer
* Language renderer
* KnowledgeSectionRenderer
* Contact renderer
* Strength renderer
* EditableDocumentElement
* DocumentBackgroundLayer
* Pagination utilities
* Design token sistemi
* Template registry

Template-specific componentler yalnızca Kompakt tasarım farklarını yönetmelidir.

## 26. Print ve PDF

```css
@media screen {
  .kompakt-page {
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

  .kompakt-page {
    width: 210mm;
    height: 297mm;
    min-height: 297mm;
    margin: 0;
    overflow: hidden;
    box-shadow: none;
    break-after: page;
    page-break-after: always;
  }

  .kompakt-page:last-child {
    break-after: auto;
    page-break-after: auto;
  }

  .editor-selection,
  .editor-resize-handle,
  .editor-toolbar,
  .editor-guide,
  .editor-grid,
  .single-page-overflow-warning {
    display: none !important;
  }
}
```

PDF üretmeden önce:

* Fontların yüklenmesini bekle
* Dekoratif SVG’nin yüklenmesini bekle
* `printBackground: true` kullan
* Preview zoom transformunu kaldır
* Selection, resize ve guide araçlarını gizle
* Her sayfanın gerçek A4 ölçüsünde olduğunu doğrula

## 27. Görsel doğruluk süreci

İlk uygulamadan sonra referans görselle oluşturulan önizlemeyi yan yana karşılaştır.

Şunları tek tek ölç:

* Sol ve üst kenar boşlukları
* İsim başlangıç konumu
* İsim font boyutu ve ağırlığı
* Ana içerik başlangıç yüksekliği
* Sol ve sağ sütun genişlikleri
* Sütun aralığı
* Section başlıklarının boyutu ve rengi
* Experience kayıtlarının dikey aralığı
* Gövde font boyutu
* Madde işaretlerinin girintisi
* Sağ kontak ikonlarının konumu
* Dekoratif turuncu çizgilerin konumu
* Özet metninin genişliği
* Strength ve achievement kartlarının boşlukları
* Dil noktalarının çapı
* Beceri etiketlerinin çizgileri
* Footer konumu
* Sayfanın altındaki kalan boşluk

İlk sonuç referanstan belirgin biçimde farklıysa design tokenlarını, fontları ve spacing değerlerini yeniden düzenle.

## 28. Test gereksinimleri

Şu senaryoları test et:

1. Kompakt metadata kaydı
2. ATS, Muster ve preview dosyalarının eşleşmesi
3. Varsayılan küçük kenar boşlukları
4. Varsayılan sütun oranları
5. Uzun isim
6. Eksik iletişim bilgileri
7. Uzun Zusammenfassung
8. Üç veya daha fazla Berufserfahrung kaydı
9. Çok sayıda achievement maddesi
10. Birden fazla Ausbildung kaydı
11. Çok sayıda Stärke
12. Çok sayıda Erfolg
13. Uzun Fähigkeiten listesi
14. İki ve daha fazla dil
15. Tek sayfaya sığan içerik
16. Tek sayfaya sığmayan içerik
17. Güvenli kompaktlaştırma sınırları
18. İkinci sayfa oluşturulması
19. Visual ve ATS görünüm farkları
20. ATS doğrusal DOM sırası
21. Kart sürükleme
22. Kart resize
23. Kart kilitleme ve gizleme
24. Layout reset
25. Preview zoom altında koordinatların değişmemesi
26. PDF’de editör araçlarının görünmemesi
27. Dekoratif çizgilerin PDF’de doğru basılması
28. Template değişiminde ResumeData içeriğinin korunması
29. Uygulama yeniden açıldığında layout’un geri yüklenmesi
30. Setup ve Portable sürümde template kaynaklarının bulunması

## 29. Çalışma sırası

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

Mevcut Kompakt DOCX ve preview dosyalarının sistem tarafından nasıl bulunduğunu belirle.

### Aşama 2: Referans ölçüm planı

Referans görseldeki:

* A4 oranını
* Küçük kenar boşluklarını
* Header yüksekliğini
* Sütun genişliklerini
* İçerik başlangıcını
* Dekoratif çizgileri
* Bölüm konumlarını
* Footer yerleşimini

milimetre cinsinden yaklaşık olarak çıkar.

### Aşama 3: Metadata ve design tokenları

Kompakt metadata kaydını, varsayılan renkleri, tipografiyi ve layout ölçülerini oluştur.

### Aşama 4: React componentleri

Page, background, header, sütunlar, sectionlar ve footer componentlerini oluştur.

### Aşama 5: Tam CSS

Eksiksiz ve production-ready `kompakt.css` dosyasını oluştur.

### Aşama 6: Tek sayfa optimizasyonu

Güvenli spacing ve tipografi sınırları içinde tek sayfa yerleşimini uygula; içerik hâlâ sığmıyorsa ikinci sayfa üret.

### Aşama 7: Editör entegrasyonu

Selection, drag, resize, lock, hide, layer ve reset özelliklerini bağla.

### Aşama 8: ATS, pagination ve PDF

Tek sütun ATS görünümünü, çok sayfalı çıktıyı ve PDF uyumluluğunu tamamla.

### Aşama 9: Görsel karşılaştırma

Referansla üretilen çıktı arasındaki ölçü, spacing, font ve renk farklılıklarını gider.

Her aşama tamamlandıktan sonra sonraki aşamaya geçmeden bekle.

## 30. Kod çıktı formatı

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
* Visual iki sütun düzenini otomatik ATS uyumlu kabul etme
* Tek sayfaya sığdırmak için metin silme veya otomatik özetleme yapma
* `dist-electron`, `artifacts`, `release` veya `windows-release` dosyalarını düzenleme
* Ben istemeden Tailwind, Bootstrap veya ağır UI framework ekleme
* Mevcut projeyi baştan yazma

## 31. Beklenen cevap formatı

Her cevapta şu başlıkları kullan:

### 1. Referans görsel analizi

### 2. A4 ölçüm ve yerleşim planı

### 3. Mevcut projeden yeniden kullanılacak yapılar

### 4. Kompakt template mimarisi

### 5. Değiştirilecek dosyalar

### 6. Design tokenları

### 7. React ve TypeScript kodları

### 8. Tam CSS kodu

### 9. Tek sayfa optimizasyonu

### 10. ATS, pagination ve PDF değişiklikleri

### 11. Testler

### 12. PowerShell komutları

### 13. Görsel karşılaştırma kontrol listesi

İlk olarak yalnızca **Aşama 1 ve Aşama 2’yi** gerçekleştir. Mevcut proje yapısını analiz et, `public/templates` altında bulunan Kompakt dosyalarının mevcut template servisleriyle nasıl eşleştiğini belirle ve referans görseldeki A4 yerleşimini milimetre bazında çıkar. Mevcut kodla doğrulanmamış component, import veya API üretme.
