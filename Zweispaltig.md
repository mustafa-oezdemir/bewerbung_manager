
![Ein zweispaltiger Lebenslauf mit blauer Akzentfarbe und Fokus auf Erfahrung und Leistungen.](https://cdn.enhancv.com/predefined-examples/XHiNXHD5CWUGCGVKQTJArS7MY8iHn7Awe5tqWOpY/image.png) 



##### Zweispaltig

We've tested these templates with major ATS vendors to ensure they parse correctly. Keep your content focused on the reader, though - humans still make the vast majority of hiring decisions.

Kostenlose, zweispaltige Lebenslauf-Vorlage. Perfekt für jede Branche. 


* Konu: Bewerbung Studio için ATS uyumlu, iki sütunlu “Zweispaltig” Lebenslauf şablonunun oluşturulması
* İstenilen çıktı: Referans görseldeki yapıyı temel alan; Electron, React ve TypeScript uygulamasına entegre edilebilen, kullanıcı tarafından düzenlenebilir, sürüklenebilir ve yeniden boyutlandırılabilir iki sütunlu Lebenslauf şablonu
* Kullanılacak framework: RASCEF
* Senin yazacağın prompt:

Sen Electron, React, TypeScript, A4 belge tasarımı, özgeçmiş UX’i, ATS uyumluluğu ve PDF üretimi konusunda uzman kıdemli bir yazılım geliştiricisisin.

“Bewerbung Studio” uygulamam için ilk Lebenslauf şablonunu oluşturacağız.

Şablon adı:

```text
Zweispaltig
```

Şablon açıklaması:

```text
Kostenlose, zweispaltige Lebenslauf-Vorlage. Perfekt für jede Branche.

Dieses Template wurde für eine zuverlässige Verarbeitung durch verbreitete ATS-Systeme konzipiert. Der Inhalt muss dennoch in erster Linie für Personalverantwortliche klar, übersichtlich und schnell erfassbar bleiben.
```

Referans olarak verdiğim görseldeki genel düzeni, içerik hiyerarşisini ve iki sütunlu yapıyı incele. Görseli birebir kopyalama; aynı profesyonel yaklaşımı kullanan özgün, modern ve production kalitesinde bir Lebenslauf tasarımı oluştur.

## 1. Temel tasarım

Belge:

```text
A4: 210 mm × 297 mm
```

Yerleşim:

* Üstte tam genişlikte profil başlığı
* Başlığın altında iki sütunlu ana içerik
* Sol sütun geniş ve içerik ağırlıklı
* Sağ sütun daha dar ve tamamlayıcı bilgiler için
* İki sütun arasında yeterli boşluk
* Alt kısımda sade footer
* Beyaz veya kullanıcı tarafından seçilen arka plan
* Profesyonel, modern ve okunabilir görünüm

Başlangıç oranı:

```text
Sol sütun: yaklaşık %62
Sağ sütun: yaklaşık %38
```

Bu oran sabit kodlanmamalıdır. Template varsayılanı olarak tanımlanmalı ve kullanıcının serbest düzenleme sisteminde değiştirilebilmelidir.

## 2. ATS yaklaşımı

İki sütunlu görsel şablon ile ATS uyumluluğunu birlikte destekle.

Uygulamada aynı template için iki çıktı modu bulunmalıdır:

```ts
type ResumeOutputMode = "visual" | "ats";
```

### Visual modu

* İki sütunlu tasarım
* Profil fotoğrafı
* İkonlar
* Renkli başlıklar
* Grafikler
* Görsel güçlü yönler alanı
* Kullanıcı tarafından taşınabilen kartlar

### ATS modu

* Tek sütunlu, doğrusal okuma sırası
* Tablo kullanılmaması
* Grafiklerin metinsel karşılıklarla değiştirilmesi
* İkonların yanında veya yerine açık metin kullanılması
* Section içeriklerinin mantıksal DOM sırasıyla sunulması
* Standart başlıkların korunması
* Fotoğrafın opsiyonel olarak kaldırılması
* Metnin kopyalanabilir ve aranabilir olması

ATS çıktısında içerik sırası şöyle olmalıdır:

1. Persönliche Daten
2. Berufliches Profil
3. Berufserfahrung
4. Ausbildung
5. Kenntnisse
6. Sprachen
7. Projekte
8. Zertifikate und Weiterbildungen
9. Weitere Informationen

Visual görünümde iki sütun kullanılsa bile veri modeli ATS çıktısıyla ortak olmalıdır. Aynı içerik iki farklı veri modeliyle tekrar saklanmamalıdır.

## 3. Profil başlığı

Belgenin üst kısmında tam genişlikte bir profil alanı oluştur.

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
* Portfolio
* Doğum tarihi ve yeri, yalnızca kullanıcı eklerse
* Profil fotoğrafı, opsiyonel

Örnek yerleşim:

```text
BENJAMIN KRÜGER

Frontend Entwickler | Vue.js | Angular | Microservices

Telefon                    E-Mail
LinkedIn                   Wohnort
Portfolio                  GitHub
```

Kurallar:

* İsim en güçlü görsel öğe olmalı
* Meslek unvanı ikinci seviyede olmalı
* İletişim bilgileri daha küçük ama okunabilir olmalı
* Fotoğraf sağ üstte dairesel veya yumuşak köşeli gösterilebilmeli
* Uzun isimlerde tasarım taşmamalı
* Eksik iletişim alanları boş satır oluşturmamalı
* URL’ler PDF içinde tıklanabilir olmalı
* İkon kullanılmasına rağmen açık metin ve erişilebilir açıklama korunmalı

## 4. Sol sütun bölümleri

Sol sütun ana kariyer içeriğini taşımalıdır.

Başlangıç bölümleri:

```text
ZUSAMMENFASSUNG
BERUFSERFAHRUNG
AUSBILDUNG
PROJEKTE
```

Kullanıcı bölüm sırasını değiştirebilmelidir.

### Zusammenfassung

Kısa profesyonel profil alanı.

İçerik kuralları:

* Yaklaşık 3–6 satır
* Deneyim yılı
* Uzmanlık alanı
* Sektör veya teknoloji odağı
* Ölçülebilir güçlü yön
* Hedeflenen role uygun değer önerisi
* Birinci tekil şahıs kullanımından mümkün olduğunca kaçınma
* Genel ve kanıtsız sıfatlarla doldurmama

### Berufserfahrung

Her deneyim kaydı şu alanları desteklemelidir:

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
2. Şirket
3. Tarih ve konum
4. Kısa görev açıklaması
5. Ölçülebilir başarı maddeleri
6. Opsiyonel teknoloji listesi

Başarı maddelerinde mümkün olduğunca şu yapı kullanılmalı:

```text
Aksiyon + yapılan çalışma + ölçülebilir sonuç
```

Örnek:

```text
Einführung automatisierter End-to-End-Tests, wodurch die Fehlerquote im Release-Prozess um 30 % reduziert wurde.
```

Kurallar:

* En güncel deneyim üstte
* Tarihler tutarlı formatta
* Devam eden pozisyon için `heute`
* Her deneyim kartı mümkün olduğunca sayfa arasında bölünmemeli
* Çok uzun açıklamalarda kontrollü pagination uygulanmalı
* Madde işaretleri hizalı olmalı
* Boş başarı listesi gereksiz boşluk oluşturmamalı

### Ausbildung

Alanlar:

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

Gösterim sırası:

1. Abschluss
2. Bildungseinrichtung
3. Tarih ve konum
4. Opsiyonel Schwerpunkt veya başarı bilgisi

### Projekte

Her proje için:

* Projektname
* Rolle
* Zeitraum
* Kısa açıklama
* Kullanılan teknolojiler
* Ölçülebilir sonuç
* GitHub veya canlı proje bağlantısı
* Opsiyonel müşteri veya sektör bilgisi

Projeler bölümü kullanıcı tarafından kapatılabilmelidir.

## 5. Sağ sütun bölümleri

Sağ sütun şu bölümleri desteklemelidir:

```text
STÄRKEN
KENNTNISSE
SPRACHEN
MEIN ALLTAG
ZERTIFIKATE
TRAINING / COURSES
```

Kullanıcı istemediği bölümleri gizleyebilmeli ve sıralarını değiştirebilmelidir.

### Stärken

Her güçlü yön şu alanları desteklemelidir:

```ts
interface StrengthItem {
  id: string;
  title: string;
  description: string;
  iconId?: string;
}
```

Örnekler:

* Teamarbeit
* Problemlösung
* Kommunikation
* Eigenverantwortung
* Analytisches Denken
* Kundenorientierung

Kurallar:

* Yalnızca sıfat listesi verilmemeli
* Her güçlü yön kısa bir kanıt veya sonuç içermeli
* Visual modda ikon gösterilebilir
* ATS modunda yalnızca açık metin gösterilmeli

### Kenntnisse

Bilgiler kategori bazlı gösterilmelidir:

```text
Programmiersprachen
Frameworks
Datenbanken
Cloud
DevOps
Tools
Methoden
```

Mevcut knowledge sistemiyle bağlantı kurulmalıdır:

```text
src/features/knowledge/
src/components/knowledge/
src/components/document/KnowledgeSectionRenderer.tsx
```

Bilgi seviyeleri için şu gösterim türleri desteklenebilir:

* Text
* Tag
* Level label
* Progress bar
* Dot scale

ATS modunda grafik yerine açık seviye metni kullanılmalıdır:

```text
JavaScript – Fortgeschritten
Deutsch – C1
```

### Sprachen

Her dil için:

* Dil adı
* CEFR seviyesi
* Opsiyonel ana dil durumu
* Opsiyonel sertifika

Örnek:

```text
Deutsch – C1
Englisch – B2
Türkisch – Muttersprache
```

Yıldız gibi belirsiz değerlendirme sistemlerini ATS modunda kullanma.

### Mein Alltag

Referans görseldeki halka grafik benzeri bir bölüm desteklenebilir.

Ancak bu alan:

* Tamamen opsiyonel olmalı
* Kullanıcının gerçek aktivitelerine dayanmalı
* Kariyer açısından anlamlı olmalı
* Dekoratif ama açıklamasız grafik olarak bırakılmamalı

Örnek aktiviteler:

```text
Weiterbildung
Open-Source
Tech-Community
Mentoring
```

Visual modda halka grafik gösterilebilir.

ATS modunda şu formata dönüştürülmelidir:

```text
Weiterbildung: 5 Stunden pro Woche
Open-Source: Regelmäßige Beiträge
Tech-Community: Teilnahme an Workshops und Hackathons
Mentoring: Unterstützung von Nachwuchsentwicklern
```

### Zertifikate und Training

Her kayıt:

* Zertifikatsname
* Anbieter
* Ausstellungsdatum
* Ablaufdatum, varsa
* Credential ID, varsa
* Doğrulama bağlantısı, varsa

“Training / Courses” başlığı kullanıcı arayüzünde Almanca olarak varsayılan biçimde şu şekilde gösterilsin:

```text
WEITERBILDUNGEN
```

İngilizce başlık yalnızca seçilen belge dili İngilizceyse kullanılmalıdır.

## 6. Footer

Footer sade olmalıdır.

Desteklenen içerik:

* Portfolio veya web sitesi
* Sayfa numarası
* Son güncelleme tarihi, opsiyonel
* Kullanıcının seçtiği kısa bilgi

Uygulama markası veya “Powered by” metni kullanıcı Lebenslauf PDF’sine otomatik eklenmemelidir.

## 7. Tasarım tokenları

Template stillerini componentlerin içine dağınık şekilde yazma.

Merkezi bir template tasarım modeli oluştur veya mevcut `documentDesign.ts` yapısını genişlet.

Örnek:

```ts
interface ZweispaltigTemplateTokens {
  pageWidthMm: 210;
  pageHeightMm: 297;
  marginTopMm: number;
  marginRightMm: number;
  marginBottomMm: number;
  marginLeftMm: number;
  columnGapMm: number;
  leftColumnRatio: number;
  rightColumnRatio: number;
  sectionGapMm: number;
  entryGapMm: number;
  primaryColor: string;
  accentColor: string;
  textColor: string;
  mutedTextColor: string;
  dividerColor: string;
  fontFamily: string;
  bodyFontSizePt: number;
  bodyLineHeight: number;
  sectionTitleFontSizePt: number;
  nameFontSizePt: number;
}
```

Varsayılan görünüm:

* Koyu lacivert ana renk
* Açık mavi vurgu rengi
* Koyu gri gövde metni
* İnce ve düzenli ayırıcı çizgiler
* Modern sans-serif font
* Yüksek okunabilirlik
* Yeterli beyaz alan

Tüm değerler kullanıcı tasarım paneli üzerinden değiştirilebilir olmalıdır.

## 8. Canva benzeri serbest düzenleme

Bu Lebenslauf şablonu mevcut freeform editör sistemiyle uyumlu olmalıdır.

Her bölüm bir kart olarak tanımlanmalıdır:

```ts
interface ResumeLayoutElement {
  elementId: string;
  sectionId: string;
  documentKind: "lebenslauf";
  pageIndex: number;
  xMm: number;
  yMm: number;
  widthMm: number;
  heightMm: number;
  zIndex: number;
  locked: boolean;
  hidden: boolean;
  resizable: boolean;
  movable: boolean;
}
```

Kullanıcı şunları yapabilmelidir:

* Kartı seçme
* Fareyle taşıma
* Büyütme ve küçültme
* Sayısal konum girme
* Kartı gizleme
* Kartı kilitleme
* Öne veya arkaya gönderme
* Bölüm sırasını değiştirme
* Sol ve sağ sütun arasında taşıma
* Yeni sayfaya taşıma
* Template başlangıç düzenine sıfırlama

Ancak başlangıç düzeni profesyonel ve doğrudan kullanılabilir olmalıdır. Kullanıcı manuel düzenleme yapmak zorunda kalmamalıdır.

## 9. Flow ve freeform modu

Şablon iki çalışma modunu desteklemelidir:

```ts
type DocumentLayoutMode = "flow" | "freeform";
```

### Flow

* İçerik otomatik akar
* Bölümler içerik uzunluğuna göre büyür
* Pagination otomatik yapılır
* Kartların birbirinin üzerine gelmesi engellenir
* Standart kullanıcılar için varsayılan moddur

### Freeform

* Kartlar sabit A4 koordinatlarına göre yerleşir
* Kullanıcı kartları Canva gibi taşır
* Kartlar manuel olarak büyütülür
* Sayfa dışına çıkış engellenir
* Çakışma uyarısı gösterilir
* Kullanıcı gerekli olduğunda yeni sayfa ekler

Flow modundan freeform moduna geçerken mevcut hesaplanmış yerleşim başlangıç koordinatlarına dönüştürülmelidir.

## 10. İçerik veri modeli

Lebenslauf içeriği görsel kartların içine sabit yazılmamalıdır.

Merkezi ve yeniden kullanılabilir veri modeli kullanılmalıdır:

```ts
interface ResumeData {
  personalDetails: PersonalDetails;
  professionalSummary?: string;
  workExperience: WorkExperience[];
  education: EducationEntry[];
  skills: KnowledgeCategory[];
  languages: LanguageEntry[];
  strengths: StrengthItem[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  activities: ActivityEntry[];
  sectionOrder: ResumeSectionId[];
  hiddenSections: ResumeSectionId[];
}
```

İçerik ile layout state’i ayrı tutulmalıdır:

```text
ResumeData = ne gösterilecek?
ResumeLayout = nerede ve nasıl gösterilecek?
DocumentDesignSettings = hangi görsel stille gösterilecek?
```

Bu üç sorumluluğu tek nesnede birleştirme.

## 11. Component yapısı

Şablonu tek büyük component içinde oluşturma.

Önerilen yapı:

```text
src/components/resume/templates/zweispaltig/
├── ZweispaltigResume.tsx
├── ZweispaltigHeader.tsx
├── ZweispaltigColumn.tsx
├── ZweispaltigSection.tsx
├── ZweispaltigExperienceSection.tsx
├── ZweispaltigEducationSection.tsx
├── ZweispaltigKnowledgeSection.tsx
├── ZweispaltigStrengthsSection.tsx
├── ZweispaltigActivitiesSection.tsx
├── ZweispaltigFooter.tsx
├── zweispaltig.defaults.ts
├── zweispaltig.layout.ts
├── zweispaltig.types.ts
└── zweispaltig.css
```

Mevcut proje yapısını inceleyerek nihai klasör yerini belirle. Var olan `DocumentBackgroundLayer`, `KnowledgeSectionRenderer`, template store ve design utilities tekrar kullanılmalıdır.

## 12. Template kaydı

Template kütüphanesinde aşağıdaki bilgiler bulunmalıdır:

```ts
{
  id: "zweispaltig",
  name: "Zweispaltig",
  category: "professional",
  documentKind: "lebenslauf",
  description:
    "Kostenlose, zweispaltige Lebenslauf-Vorlage. Perfekt für jede Branche.",
  atsSupported: true,
  supportsFreeform: true,
  supportsPhoto: true,
  supportsMultiplePages: true
}
```

Mevcut template type yapısına göre uyumlu nihai modeli oluştur.

Preview görseli ayrıca tanımlanmalıdır:

```text
public/templates/Zweispaltig_Lebenslauf_Muster.preview.png
```

Mevcut dosya adlandırma servisi kullanılıyorsa ona uygun isim üret.

## 13. Kullanıcı metinleri

Arayüz ve varsayılan section başlıkları Almanca olmalıdır:

```text
Persönliche Daten
Zusammenfassung
Berufserfahrung
Ausbildung
Kenntnisse
Sprachen
Stärken
Projekte
Zertifikate
Weiterbildungen
Weitere Aktivitäten
```

Eksik veya hatalı Almanca metin kullanma.

Kullanıcı belge dilini değiştirdiğinde başlıkları merkezi çeviri haritasından getir. İçeriğin kendisini otomatik ve izinsiz çevirmeye çalışma.

## 14. Örnek içerik

Template önizlemesi için profesyonel ancak tamamen örnek olduğu açık olan bir demo veri seti oluştur.

Örnek profil:

```text
Benjamin Krüger
Frontend Entwickler
```

Demo içerik yalnızca template preview veya örnek belge için kullanılmalıdır. Yeni kullanıcı belgesi oluşturulduğunda demo kişi bilgileri gerçek kullanıcı verisiymiş gibi kaydedilmemelidir.

Boş belge oluşturulurken kullanıcıya yönlendirici placeholder metinleri gösterilebilir:

```text
Kurze berufliche Zusammenfassung hinzufügen
Berufserfahrung hinzufügen
Ausbildung hinzufügen
Kenntnisse hinzufügen
```

Bu placeholder metinleri PDF çıktısına dahil edilmemelidir.

## 15. Pagination

* Bir deneyim kaydı mümkün olduğunca bölünmemeli
* Section başlığı sayfanın sonunda tek başına kalmamalı
* Sağ sütun içeriği ilk sayfaya sığmıyorsa kontrollü devam etmeli
* Çok uzun Lebenslauf ikinci A4 sayfasına geçebilmeli
* İkinci sayfada header’ın sadeleştirilmiş sürümü kullanılabilmeli
* Kolonlar birbirinden tamamen bağımsız ölçülmemeli
* Kart çakışmaları engellenmeli
* Freeform modunda taşma otomatik düzeltilmemeli; kullanıcıya uyarı gösterilmeli
* Flow modunda otomatik pagination kullanılmalı

## 16. PDF kuralları

PDF çıktısında:

* A4 ölçüsü korunmalı
* Metin seçilebilir olmalı
* Linkler tıklanabilir olmalı
* Fontlar doğru yüklenmeli
* Fotoğraf bozulmamalı
* Selection çerçevesi görünmemeli
* Resize handle görünmemeli
* Grid ve kılavuzlar görünmemeli
* Boş placeholder alanları görünmemeli
* Preview zoom PDF’ye aktarılmamalı
* Visual ve ATS PDF çıktıları ayrı üretilebilmeli

## 17. Testler

Aşağıdaki senaryoları test et:

1. Template metadata kaydı
2. Varsayılan iki sütun oranları
3. Section sıralaması
4. Boş bölümlerin gizlenmesi
5. Uzun isim
6. Fotoğraflı ve fotoğrafsız kullanım
7. Birden fazla Berufserfahrung kaydı
8. Uzun achievement maddeleri
9. Çok sayıda bilgi ve yetenek
10. Uzun sağ sütun içeriği
11. İki sayfalık Lebenslauf
12. Visual ve ATS görünüm farkları
13. ATS modundaki doğrusal DOM sırası
14. Knowledge seviyelerinin metinsel karşılığı
15. Kartların sürüklenmesi
16. Kartların resize edilmesi
17. Flow ve freeform geçişi
18. Layout reset
19. Tasarım ayarlarının uygulanması
20. PDF’de editör kontrollerinin bulunmaması
21. Kayıt sonrası layout’un geri yüklenmesi
22. Template preview dosyasının development ve production ortamında bulunması

## 18. Çalışma sırası

Görevi aşamalı gerçekleştir:

### Aşama 1: Mevcut yapıyı analiz et

Özellikle incele:

```text
src/shared/documentDesign.ts
src/shared/documentPagination.ts
src/shared/schema.ts
src/shared/templates.ts
src/features/templates/
src/store/useAppStore.ts
src/components/document/
src/components/templates/
src/views/DocumentsView.tsx
electron/templates/
electron/documents.ts
electron/pdf.ts
```

Mevcut type, store, template ve renderer yapılarını belirle.

### Aşama 2: Veri modeli

* ResumeData modelini oluştur veya genişlet
* Section tiplerini tanımla
* Visual ve ATS output modlarını ekle
* Varsayılan demo veriyi ayrı tut

### Aşama 3: Template metadata ve varsayılanlar

* Zweispaltig template kaydını oluştur
* Tasarım tokenlarını tanımla
* Flow ve freeform başlangıç layoutlarını oluştur

### Aşama 4: React componentleri

* Header
* Sol sütun
* Sağ sütun
* Section rendererları
* Footer
* Boş durumlar

### Aşama 5: Editör entegrasyonu

* Seçim
* Drag
* Resize
* Lock
* Hide
* Layer
* Reset

### Aşama 6: ATS görünümü

* Tek sütunlu renderer
* Doğrusal DOM sırası
* Grafiklerin metinsel karşılığı
* ATS PDF modu

### Aşama 7: Pagination ve PDF

* Çok sayfalı çıktı
* Font ve görsel yükleme
* Preview ile PDF tutarlılığı

### Aşama 8: Testler

* Unit test
* Component test
* PDF kontrolü
* Paketlenmiş Windows uygulaması kontrolü

Her aşama tamamlandıktan sonra sonraki aşamaya geçmeden bekle.

## Kod çıktı formatı

Her dosya için:

```text
Dosya: src/ilgili/dosya.tsx
İşlem: Güncellenecek | Yeni oluşturulacak | Silinecek
Amaç: Değişikliğin teknik açıklaması
```

Ardından eksiksiz ve doğrudan kullanılabilir kodu ver.

Kurallar:

* Eksik import bırakma
* Hayali API üretme
* Pseudocode kullanma
* Demo içerikle gerçek kullanıcı verisini karıştırma
* İçerik ve layout state’ini aynı modelde birleştirme
* Görsel iki sütun düzenini ATS uyumludur diye kesin varsayma
* `dist-electron`, `artifacts`, `release` ve `windows-release` dosyalarını doğrudan düzenleme
* Mevcut projeyi baştan yazma
* Ben istemeden yeni UI framework’ü ekleme

## Cevap formatı

Her cevapta şu başlıkları kullan:

### 1. Mevcut yapı analizi

### 2. Zweispaltig template mimarisi

### 3. İçerik veri modeli

### 4. Değiştirilecek dosyalar

### 5. Kod değişiklikleri

### 6. Testler

### 7. PowerShell komutları

### 8. Manuel kontrol listesi

Önce yalnızca Aşama 1’i gerçekleştir. Mevcut dosyaları incele, template oluşturma planını ve değiştirilmesi gereken kaynak dosyaları çıkar. Kod üretmeden önce mevcut sistemde hangi type, component ve servislerin yeniden kullanılacağını açıkça belirle.
