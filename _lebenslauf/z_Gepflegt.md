
* Konu: Bewerbung Studio için ATS destekli, sol renkli panel kullanan “Gepflegt” Lebenslauf şablonunun oluşturulması
* İstenilen çıktı: Mevcut “Zweispaltig” şablonuyla aynı içerik, tasarım ve serbest yerleşim altyapısını kullanan; kurumsal ve müşteri odaklı pozisyonlara uygun, düzenlenebilir, çok sayfalı ve PDF uyumlu ikinci Lebenslauf şablonu
* Kullanılacak framework: RASCEF
* Senin yazacağın prompt:

Sen Electron, React, TypeScript, Zustand, A4 belge tasarımı, ATS uyumluluğu, görsel belge editörleri ve PDF üretimi konusunda uzman kıdemli bir yazılım geliştiricisisin.

“Bewerbung Studio” uygulamam için ikinci Lebenslauf şablonunu oluşturacağız.

Şablon adı:

```text
Gepflegt
```

Almanca açıklaması:

```text
Eine raffinierte Lebenslaufvorlage, perfekt für Business Development Manager, Vertriebsleiter und andere kundenorientierte Positionen.
```

ATS bilgilendirme metni:

```text
Dieses Template wurde mit verbreiteten ATS-Systemen getestet. Dennoch muss der Inhalt in erster Linie klar, relevant und für Personalverantwortliche leicht erfassbar bleiben.
```

Referans görseldeki tasarım yaklaşımını analiz et; ancak tasarımı, marka öğelerini veya örnek platform logosunu birebir kopyalama. Aynı profesyonel karaktere sahip, özgün ve production kalitesinde bir Lebenslauf şablonu geliştir.

Bu şablon mevcut “Zweispaltig” şablonundan bağımsız, tekrar eden bir sistem oluşturmamalıdır. Ortak içerik modeli, belge tasarım ayarları, sürükle-bırak editörü, template registry, knowledge sistemi, pagination ve PDF altyapısı yeniden kullanılmalıdır.

## 1. Şablon karakteri

“Gepflegt” aşağıdaki görsel karaktere sahip olmalıdır:

* Kurumsal
* Zarif
* Düzenli
* Güven veren
* Müşteri ilişkileri ve yönetim pozisyonlarına uygun
* Güçlü ama abartısız renk kullanımı
* Hızlı taranabilen bilgi hiyerarşisi
* Yeterli beyaz alan
* Profesyonel sans-serif tipografi

Özellikle şu hedef pozisyonlara uygun olmalıdır:

* Business Development Manager
* Vertriebsleiter
* Account Manager
* Projektleiter
* Product Manager
* Customer Success Manager
* Consultant
* Teamleiter
* Senior Softwareentwickler
* SAP-Berater

## 2. A4 ve ana yerleşim

Belge ölçüsü:

```text
210 mm × 297 mm
```

Yerleşim iki ana alandan oluşmalıdır:

### Sol renkli panel

Yaklaşık genişlik:

```text
%27–%31
```

İçerik:

* Profil fotoğrafı
* Zusammenfassung
* Stärken
* Sprachen
* Fähigkeiten veya Kenntnisse
* Opsiyonel Zertifikate
* Opsiyonel Kontaktdaten

### Sağ ana içerik alanı

Yaklaşık genişlik:

```text
%69–%73
```

İçerik:

* İsim ve meslek unvanı
* İletişim bilgileri
* Berufserfahrung
* Ausbildung
* Opsiyonel Projekte
* Opsiyonel Weiterbildungen
* Opsiyonel Zertifikate

Başlangıç oranlarını template varsayılanı olarak tanımla. Componentlerin içinde sabit ve dağınık yüzdeler kullanma. Kullanıcının serbest düzenleme modunda sütun genişlikleri değiştirilebilmelidir.

## 3. Renkli sol panel

Sol panel ilk tasarımda koyu petrol yeşili veya koyu teal tonunda olmalıdır.

Örnek başlangıç tokenları:

```ts
{
  sidebarBackground: "#087875",
  sidebarText: "#FFFFFF",
  primaryColor: "#00B8B5",
  headingColor: "#354147",
  bodyTextColor: "#3F494E",
  dividerColor: "#C7CED1",
  pageBackground: "#FFFFFF"
}
```

Bunlar yalnızca başlangıç değerleridir. Nihai renkleri tasarım sistemine ve erişilebilirlik kurallarına göre belirle.

Kullanıcı tasarım panelinden aşağıdaki değerleri değiştirebilmelidir:

* Sol panel arka plan rengi
* Ana vurgu rengi
* Başlık rengi
* Gövde metni rengi
* Ayırıcı çizgi rengi
* Sayfa arka planı
* Sol panel genişliği
* Sol panel iç boşlukları

Renk değişiklikleri Lebenslauf önizlemesine ve PDF çıktısına aynı biçimde uygulanmalıdır.

## 4. Üst profil alanı

Sağ sütunun üstünde güçlü bir profil başlığı oluştur.

İçerik:

* Vorname
* Nachname
* Berufsbezeichnung
* Spezialisierungen
* Telefon
* E-Mail
* Wohnort
* LinkedIn
* GitHub
* Portfolio veya Website

Görsel hiyerarşi:

1. İsim ve soyadı
2. Meslek unvanı ve uzmanlıklar
3. İletişim bilgileri

Kurallar:

* İsim büyük harflerle veya güçlü font ağırlığıyla gösterilebilir.
* Uzun isimler satır taşmasına neden olmamalıdır.
* Meslek unvanı vurgu renginde gösterilmelidir.
* İletişim bilgileri gerektiğinde birden fazla satıra geçebilmelidir.
* Eksik alanlar boş ikon veya anlamsız boşluk oluşturmamalıdır.
* URL alanları PDF içinde tıklanabilir olmalıdır.
* Yalnız ikonlara güvenilmemeli; erişilebilir metin veya açık bağlantı değeri bulunmalıdır.
* ATS görünümünde ikonlar kaldırılabilmelidir.

## 5. Profil fotoğrafı

Fotoğraf varsayılan olarak sol panelin üst bölümünde yer almalıdır.

Desteklenecek özellikler:

* Kare
* Yuvarlatılmış köşe
* Daire
* Fotoğrafsız kullanım
* Crop
* Zoom
* Yatay ve dikey odak ayarı
* Kullanıcı tarafından resize
* Kullanıcı tarafından taşıma
* En-boy oranını kilitleme
* ATS çıktısında fotoğrafı kaldırma

Fotoğraf gizlendiğinde üst bölümde gereksiz boş alan kalmamalıdır.

Fotoğraf dosyaları kullanıcı veri dizininde güvenli biçimde saklanmalı; Base64 olarak büyük application state içine yazılmamalıdır.

## 6. Sol panel bölümleri

Varsayılan sıra:

```text
ZUSAMMENFASSUNG
STÄRKEN
SPRACHEN
FÄHIGKEITEN
```

Kullanıcı:

* Bölüm sırasını değiştirebilmeli
* Bölümü gizleyebilmeli
* Başlığı değiştirebilmeli
* Kartı taşıyabilmeli
* Kartı büyütüp küçültebilmeli
* Yeni sayfaya taşıyabilmeli

### Zusammenfassung

Kısa profesyonel profil özeti içermelidir.

İçerik ölçütleri:

* 3–7 kısa satır
* Deneyim yılı
* Uzmanlık alanı
* Sektör bilgisi
* Liderlik veya müşteri sorumluluğu
* Ölçülebilir bir başarı
* Hedeflenen pozisyona uygun değer önerisi

Genel, kanıtsız ve tekrar eden sıfatlarla doldurulmuş metinlerden kaçınılmalıdır.

### Stärken

Her güçlü yön şu yapıyı desteklemelidir:

```ts
interface StrengthItem {
  id: string;
  title: string;
  description?: string;
  evidence?: string;
  iconId?: string;
}
```

Örnekler:

* Technisches Verständnis
* Agile Produktentwicklung
* Mentorship
* Kundenorientierung
* Verhandlungsstärke
* Strategisches Denken
* Kommunikation
* Führungskompetenz

Her güçlü yön mümkün olduğunca kısa bir kanıt veya sonuç içermelidir.

Visual görünümde ikon kullanılabilir. ATS görünümünde ikon kaldırılmalı ve içerik açık metin olarak sunulmalıdır.

### Sprachen

Her dil kaydı şu alanları desteklemelidir:

```ts
interface LanguageEntry {
  id: string;
  language: string;
  cefrLevel?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  native?: boolean;
  label?: string;
  certificate?: string;
}
```

Visual görünüm seçenekleri:

* Nokta göstergesi
* Seviye etiketi
* Kısa bar
* Açık metin

ATS görünümünde yalnızca açık seviye kullanılmalıdır:

```text
Deutsch – C1
Englisch – B2
Türkisch – Muttersprache
```

Varsayılan dil adları belge dili Almancaysa Almanca gösterilmelidir. Referanstaki “German”, “English”, “Native” ve “Proficient” gibi karışık dil kullanımını doğrudan kopyalama.

### Fähigkeiten

Bölümün varsayılan Almanca başlığı:

```text
FÄHIGKEITEN
```

Kullanıcı isterse başlığı şu seçeneklerden biriyle değiştirebilmelidir:

```text
KENNTNISSE
KOMPETENZEN
FACHKENNTNISSE
```

Mevcut knowledge sistemiyle bağlantı kurulmalıdır:

```text
src/features/knowledge/
src/components/knowledge/
src/components/document/KnowledgeSectionRenderer.tsx
```

Gösterim biçimleri:

* Virgülle ayrılmış liste
* Nokta ayraçlı liste
* Etiketler
* Kategori grupları
* Seviye metinleri

Örnek:

```text
SAP · ABAP · Fiori · UI5 · JavaScript · TypeScript · Node.js · SQL
```

Çok uzun listelerde:

* Metin taşmamalı
* Kelimeler okunabilir biçimde bölünmeli
* Panel dışına çıkılmamalı
* İstenirse kategori bazlı gruplama yapılabilmeli

## 7. Sağ ana içerik bölümleri

Varsayılan sıra:

```text
ERFAHRUNG
AUSBILDUNG
```

Alternatif standart Almanca başlıklar desteklenmelidir:

```text
BERUFSERFAHRUNG
AUSBILDUNG
PROJEKTE
ZERTIFIKATE
WEITERBILDUNGEN
```

Kullanıcı section başlığını seçebilmeli; fakat farklı belgelerde tutarsız ve yanlış Almanca başlıklar otomatik oluşturulmamalıdır.

## 8. Berufserfahrung

Her iş deneyimi ortak Lebenslauf veri modelinden gelmelidir:

```ts
interface WorkExperience {
  id: string;
  position: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  summary?: string;
  achievements: string[];
  technologies?: string[];
}
```

Görsel hiyerarşi:

1. Pozisyon
2. Tarih aralığı
3. Şirket
4. Şehir ve ülke
5. Kısa görev açıklaması
6. Ölçülebilir başarı maddeleri
7. Opsiyonel teknoloji veya uzmanlık alanları

Başlangıç yerleşiminde:

* Pozisyon sol tarafta
* Tarih sağ tarafta
* Şirket vurgu renginde
* Lokasyon sağ tarafta
* Açıklama ve başarılar altında

olabilir.

Responsive belge mantığında uzun pozisyon veya şirket adı bulunduğunda tarih ve lokasyon alt satıra geçebilmelidir.

Başarı cümleleri şu prensibi izlemelidir:

```text
Aksiyon + bağlam + ölçülebilir sonuç
```

Örnek:

```text
Optimierung der Softwareentwicklungsprozesse, wodurch die Umsetzungsgeschwindigkeit um 25 % gesteigert wurde.
```

Kurallar:

* En güncel deneyim üstte olmalı
* Tarihler tutarlı formatta olmalı
* Devam eden görev için `heute` kullanılmalı
* Bir deneyim kartı mümkün olduğunca sayfalar arasında bölünmemeli
* Section başlığı sayfa sonunda tek başına kalmamalı
* Başarı listesi boşsa gereksiz madde işareti görünmemeli
* Çok uzun içerik kontrollü şekilde ikinci sayfaya aktarılmalı

## 9. Ausbildung

Ortak veri modeli kullanılmalıdır:

```ts
interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  focusAreas?: string[];
}
```

Yerleşim:

* Abschluss sol tarafta
* Tarih sağ tarafta
* Eğitim kurumu vurgu renginde
* Lokasyon sağ tarafta
* Opsiyonel açıklama altta

Uzun kurum ve bölüm adlarında taşma olmamalıdır.

## 10. Opsiyonel bölümler

Şablon aşağıdaki bölümleri de desteklemelidir:

* Projekte
* Zertifikate
* Weiterbildungen
* Veröffentlichungen
* Auszeichnungen
* Ehrenamt
* Interessen
* Referenzen
* Mitgliedschaften

Bu bölümler başlangıçta kapalı olabilir. Kullanıcı belge editöründen ekleyebilmelidir.

## 11. Footer

Footer sade ve markasız olmalıdır.

Desteklenen içerik:

* Website veya Portfolio
* Sayfa numarası
* Opsiyonel son güncelleme tarihi
* Opsiyonel kısa gizlilik notu

Aşağıdaki gibi üçüncü taraf marka öğeleri bulunmamalıdır:

```text
Powered by
Enhancv
www.enhancv.com
```

Referans görselde bulunan marka veya logo kopyalanmamalıdır.

## 12. Ortak içerik ve tasarım altyapısı

“Gepflegt” için yeni ve tekrar eden bir ResumeData modeli oluşturma.

Şu ayrım korunmalıdır:

```text
ResumeData
Ne gösterilecek?

DocumentDesignSettings
Hangi görsel stille gösterilecek?

DocumentLayout
Nerede ve hangi ölçüde gösterilecek?

TemplateDefinition
Şablonun varsayılanları ve yetenekleri nelerdir?
```

“Zweispaltig” ve “Gepflegt” aynı içerik kayıtlarını farklı tasarımlarla render edebilmelidir.

Kullanıcı template değiştirdiğinde:

* Kişisel bilgiler kaybolmamalı
* Berufserfahrung kayıtları kaybolmamalı
* Ausbildung kayıtları kaybolmamalı
* Kenntnisse kayıtları kaybolmamalı
* Yalnızca template-specific tasarım ve başlangıç layout’u değişmeli
* Kullanıcıya manuel layout override’larını koruma veya sıfırlama seçeneği sunulabilmeli

## 13. Template metadata

Mevcut template type sistemine göre aşağıdaki bilgilerin karşılığını oluştur:

```ts
{
  id: "gepflegt",
  name: "Gepflegt",
  category: "professional",
  documentKind: "lebenslauf",
  description:
    "Eine raffinierte Lebenslaufvorlage, perfekt für Business Development Manager, Vertriebsleiter und andere kundenorientierte Positionen.",
  atsSupported: true,
  supportsPhoto: true,
  supportsFreeform: true,
  supportsMultiplePages: true,
  defaultOutputMode: "visual"
}
```

Mevcut type alanları farklıysa yeni ve paralel bir registry oluşturma; mevcut metadata modelini genişlet.

## 14. Dosya adlandırması

Mevcut template filename service yapısını kullan.

Kaynak dosyalar gerekiyorsa mevcut standarda uygun adlandır:

```text
Gepflegt_Lebenslauf_ATS.docx
Gepflegt_Lebenslauf_Muster.docx
Gepflegt_Lebenslauf_Muster.preview.png
```

Dosyalar:

```text
public/templates/
```

altında yönetilmelidir.

Development ve paketlenmiş Windows uygulamasında aynı dosyaların bulunabildiğini doğrula.

## 15. Visual ve ATS çıktısı

Şablon iki çıktı modunu desteklemelidir:

```ts
type ResumeOutputMode = "visual" | "ats";
```

### Visual modu

* Sol renkli panel
* İki alanlı yerleşim
* Profil fotoğrafı
* İkonlar
* Beceri göstergeleri
* Güçlü renk hiyerarşisi
* Serbest kart düzenleme
* Kullanıcı tarafından değiştirilebilir sütun oranı

### ATS modu

* Tek sütun
* Doğrusal DOM sırası
* Standart section başlıkları
* İkon yerine açık metin
* Grafik yerine metinsel seviye
* Tablo kullanılmaması
* Dekoratif arka planın kaldırılması
* Fotoğrafın varsayılan olarak gizlenebilmesi
* Metnin seçilebilir olması
* Mantıksal okuma sırasının korunması

ATS içerik sırası:

1. Persönliche Daten
2. Berufliches Profil
3. Berufserfahrung
4. Ausbildung
5. Kenntnisse
6. Sprachen
7. Stärken
8. Projekte
9. Zertifikate
10. Weiterbildungen

İki sütunlu visual tasarımın otomatik olarak ATS uyumlu olduğunu varsayma. ATS için ayrı renderer veya açık output mode kullan.

## 16. Canva benzeri düzenleme

Her bölüm editör içinde ayrı ve kalıcı kimliğe sahip bir kart olmalıdır.

Örnek elementler:

```text
gepflegt.profile-photo
gepflegt.summary
gepflegt.strengths
gepflegt.languages
gepflegt.skills
gepflegt.header
gepflegt.experience
gepflegt.education
gepflegt.projects
gepflegt.footer
```

Kullanıcı:

* Kartı seçebilmeli
* Fareyle taşıyabilmeli
* Sekiz tutamaçla resize edebilmeli
* Kartı kilitleyebilmeli
* Kartı gizleyebilmeli
* Öne veya arkaya gönderebilmeli
* Sol panel ile sağ alan arasında taşıyabilmeli
* Yeni sayfaya taşıyabilmeli
* Sayısal X, Y, genişlik ve yükseklik girebilmeli
* Template başlangıç layout’una dönebilmelidir

Koordinatlar CSS stringi olarak değil, A4 belge ölçüleriyle saklanmalıdır:

```ts
interface DocumentElementLayout {
  elementId: string;
  documentKind: "lebenslauf";
  templateId: "gepflegt";
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

Zoom değeri gerçek koordinatlara yazılmamalıdır.

## 17. Flow ve freeform modu

Şablon mevcut iki layout modunu desteklemelidir:

```ts
type DocumentLayoutMode = "flow" | "freeform";
```

### Flow modu

* Varsayılan mod
* İçerik uzunluğuna göre otomatik büyüme
* Otomatik pagination
* Kart çakışmasının engellenmesi
* Section sırasına göre render
* Sağ alanın ikinci sayfaya devam edebilmesi
* Sol panelin ikinci sayfada yeniden veya sadeleştirilmiş biçimde gösterilebilmesi

### Freeform modu

* Kullanıcı kartları manuel yerleştirir
* Otomatik taşıma yapılmaz
* Sayfa dışına taşma engellenir
* Çakışma uyarısı gösterilir
* Sayfa ekleme ve kartı başka sayfaya taşıma desteklenir
* Başlangıç koordinatları flow layout’tan üretilebilir

Flow ve freeform mantıklarını aynı algoritmanın içine kontrolsüz biçimde karıştırma.

## 18. Çok sayfalı davranış

İçerik bir sayfaya sığmadığında:

* Sağ ana içerik ikinci sayfaya devam etmelidir
* Deneyim kartları mümkün olduğunca bölünmemelidir
* Section başlığı tek başına sayfa sonunda bırakılmamalıdır
* İkinci sayfada sadeleştirilmiş isim başlığı gösterilebilmelidir
* Sol panel ikinci sayfada tekrar edebilir veya kullanıcının seçimine göre kaldırılabilir
* Sayfa numarası doğru güncellenmelidir
* PDF çıktısında her sayfa gerçek A4 ölçüsünde olmalıdır

Şu seçenek veri modelinde desteklenebilir:

```ts
type SidebarContinuationMode =
  | "repeat"
  | "first-page-only"
  | "compact";
```

## 19. Component yapısı

Şablonu tek bir büyük component içinde oluşturma.

Önerilen yapı:

```text
src/components/resume/templates/gepflegt/
├── GepflegtResume.tsx
├── GepflegtHeader.tsx
├── GepflegtSidebar.tsx
├── GepflegtMainContent.tsx
├── GepflegtSummarySection.tsx
├── GepflegtStrengthsSection.tsx
├── GepflegtLanguagesSection.tsx
├── GepflegtSkillsSection.tsx
├── GepflegtExperienceSection.tsx
├── GepflegtEducationSection.tsx
├── GepflegtFooter.tsx
├── gepflegt.defaults.ts
├── gepflegt.layout.ts
├── gepflegt.types.ts
└── gepflegt.css
```

Ancak mevcut projede ortak Resume section componentleri bulunuyorsa tekrar yazma.

Öncelikle şu ortak yapıları yeniden kullan:

* Experience renderer
* Education renderer
* KnowledgeSectionRenderer
* Language renderer
* Section heading
* Contact information renderer
* Photo renderer
* EditableDocumentElement
* DocumentBackgroundLayer
* Design token sistemi
* Pagination utilities
* Template metadata store

Template-specific componentler yalnızca “Gepflegt” tasarım farklarını yönetmelidir.

## 20. CSS ve tasarım tokenları

Template-specific değerleri merkezi bir default nesnesinde tut.

Örnek hedef yapı:

```ts
interface GepflegtTemplateTokens {
  pageWidthMm: 210;
  pageHeightMm: 297;
  sidebarWidthMm: number;
  sidebarPaddingTopMm: number;
  sidebarPaddingRightMm: number;
  sidebarPaddingBottomMm: number;
  sidebarPaddingLeftMm: number;
  mainPaddingTopMm: number;
  mainPaddingRightMm: number;
  mainPaddingBottomMm: number;
  mainPaddingLeftMm: number;
  sectionSpacingMm: number;
  entrySpacingMm: number;
  sidebarBackground: string;
  sidebarTextColor: string;
  accentColor: string;
  headingColor: string;
  bodyTextColor: string;
  dividerColor: string;
  fontFamily: string;
  bodyFontSizePt: number;
  bodyLineHeight: number;
  nameFontSizePt: number;
  jobTitleFontSizePt: number;
  sectionTitleFontSizePt: number;
}
```

Magic numberları CSS ve JSX içine dağınık şekilde yazma.

## 21. Demo içerik

Template preview için referanstakine benzer profesyonel ancak özgün demo veri oluşturulabilir.

Örnek kişi:

```text
Maximilian Schneider
Principal Softwareentwickler
```

Demo veri yalnızca:

* Template preview
* Örnek belge
* Test fixture

olarak kullanılmalıdır.

Yeni kullanıcının gerçek Lebenslauf kaydına demo içerik otomatik yazılmamalıdır.

Preview içindeki kişi fotoğrafı veya örnek bilgiler gerçek kullanıcı verisi olarak kaydedilmemelidir.

## 22. PDF gereksinimleri

PDF çıktısında:

* A4 ölçüsü korunmalı
* Sol panel sayfa boyunca doğru yükseklikte görünmeli
* Renkler doğru basılmalı
* `printBackground` desteği etkin olmalı
* Metin seçilebilir kalmalı
* Linkler tıklanabilir olmalı
* Profil fotoğrafı bozulmamalı
* Fontlar yüklenmeden PDF üretilmemeli
* Selection border görünmemeli
* Resize tutamaçları görünmemeli
* Grid ve hizalama kılavuzları görünmemeli
* Placeholder metinler görünmemeli
* Preview zoom PDF’ye aktarılmamalı
* Visual ve ATS PDF ayrı üretilebilmeli

## 23. Test gereksinimleri

Aşağıdaki senaryoları test et:

1. Gepflegt metadata kaydı
2. Template filename eşleştirmesi
3. Varsayılan sol panel genişliği
4. Kullanıcının panel genişliğini değiştirmesi
5. Varsayılan renk tokenları
6. Kullanıcı renk değişiklikleri
7. Fotoğraflı ve fotoğrafsız kullanım
8. Uzun isim ve meslek unvanı
9. Eksik iletişim bilgileri
10. Uzun Zusammenfassung
11. Çok sayıda Stärke
12. Uzun Fähigkeiten listesi
13. CEFR dil seviyeleri
14. Birden fazla Berufserfahrung kaydı
15. Uzun başarı maddeleri
16. Uzun kurum ve şirket adları
17. Tek sayfalık çıktı
18. İki sayfalık çıktı
19. Sidebar continuation seçenekleri
20. Visual ve ATS renderer farkları
21. ATS doğrusal DOM sırası
22. Kart sürükleme
23. Kart resize
24. Kart gizleme ve kilitleme
25. Template layout reset
26. Zweispaltig ile Gepflegt arasında template değiştirme
27. İçerik verilerinin template değişiminde korunması
28. PDF’de editor araçlarının görünmemesi
29. Preview ile PDF koordinatlarının uyumu
30. Production build içinde preview ve DOCX kaynaklarının bulunması

## 24. Çalışma sırası

Görevi aşamalı gerçekleştir.

### Aşama 1: Mevcut mimari analizi

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

Ayrıca daha önce oluşturulan “Zweispaltig” şablonunun dosyalarını belirle.

Şunları açıkça tespit et:

* Ortak ResumeData modeli
* Ortak section rendererları
* Template metadata yapısı
* Template varsayılan değerleri
* Design token sistemi
* Flow ve freeform düzenleri
* Drag ve resize altyapısı
* Persistence sistemi
* PDF render akışı
* ATS output akışı
* Yeniden kullanılacak componentler
* Yalnız “Gepflegt” için oluşturulması gereken dosyalar

Bu aşamada henüz kod üretme.

### Aşama 2: Template metadata ve defaults

* Gepflegt metadata kaydı
* Tasarım tokenları
* Dosya adı eşleştirmesi
* Preview kaydı
* Varsayılan section sırası
* Varsayılan flow ve freeform layout

### Aşama 3: Template componentleri

* Header
* Sidebar
* Main content
* Section stilleri
* Footer
* Boş durumlar

### Aşama 4: Editör entegrasyonu

* Kart seçimi
* Sürükleme
* Resize
* Lock
* Hide
* Layer
* Reset
* Sayfalar arası taşıma

### Aşama 5: ATS görünümü

* Tek sütun renderer
* Doğrusal içerik sırası
* Grafiklerin metinsel gösterimi
* ATS PDF üretimi

### Aşama 6: Pagination ve PDF

* Çok sayfalı belge
* Sidebar continuation
* Font ve görsel yükleme
* Print background
* Preview/PDF tutarlılığı

### Aşama 7: Test ve production doğrulaması

* Unit testler
* Component testleri
* PDF testleri
* Template resource testleri
* Setup ve Portable sürüm kontrolü

Her aşama tamamlandıktan sonra sonraki aşamaya geçmeden bekle.

## 25. Kod çıktı formatı

Her dosya için:

```text
Dosya: src/ilgili/dosya.tsx
İşlem: Güncellenecek | Yeni oluşturulacak | Silinecek
Amaç: Yapılan değişikliğin teknik açıklaması
```

Ardından eksiksiz ve doğrudan kullanılabilir kodu ver.

Kurallar:

* Eksik import bırakma
* Hayali type, service veya component üretme
* Pseudocode yazma
* “Zweispaltig” ile ortak kodları tekrar oluşturma
* Demo veriyi gerçek kullanıcı verisine yazma
* Referans görseldeki marka ve logoları kopyalama
* Visual iki sütun düzenini otomatik ATS uyumlu kabul etme
* İçerik, tasarım ve layout state’ini tek nesnede birleştirme
* `dist-electron`, `artifacts`, `release` veya `windows-release` klasörlerini doğrudan düzenleme
* Mevcut projeyi baştan yazma
* Ben istemeden UI framework veya ağır drag-drop paketi ekleme

## 26. Cevap formatı

Her cevapta şu başlıkları kullan:

### 1. Mevcut yapı analizi

### 2. Zweispaltig ile paylaşılacak altyapı

### 3. Gepflegt template mimarisi

### 4. Değiştirilecek dosyalar

### 5. Kod değişiklikleri

### 6. Testler

### 7. PowerShell komutları

### 8. Manuel kontrol listesi

Önce yalnızca Aşama 1’i gerçekleştir. Mevcut dosyaları ve daha önce oluşturulan “Zweispaltig” şablonunu analiz et. Hangi yapıların ortak kullanılacağını, hangi dosyaların yalnız “Gepflegt” için oluşturulacağını ve mevcut sistemde hangi eksiklerin bulunduğunu belirle. Henüz kod yazma.
