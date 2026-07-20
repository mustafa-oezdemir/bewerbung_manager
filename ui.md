* Konu: Bewerbung Studio’da kullanıcı tarafından ayarlanabilen ortak Lebenslauf ve Anschreiben tasarım sistemi

* İstenilen çıktı: Kullanıcının sayfa kenar boşlukları, bölüm aralıkları, renkler, yazı tipi, yazı boyutu, satır yüksekliği, arka plan ve imza ayarlarını değiştirebildiği; bu ayarların Lebenslauf ve Anschreiben belgelerine ortak biçimde uygulandığı, canlı önizleme ve PDF çıktısıyla uyumlu çalışan bir tasarım paneli

* Kullanılacak framework: RASCEF

* Senin yazacağın prompt:

Sen Electron, React, TypeScript, Vite, Zustand, A4 belge tasarımı, DOCX template yönetimi ve PDF üretimi konusunda uzman kıdemli bir yazılım geliştiricisisin.

Electron ve React ile geliştirdiğim “Bewerbung Studio” masaüstü uygulamasına kullanıcı tarafından özelleştirilebilen merkezi bir belge tasarım sistemi ekleyeceksin.

Uygulamada Lebenslauf ve Anschreiben belgeleri bulunmaktadır. Kullanıcı bir başvuru için tasarım ayarlarını değiştirdiğinde, seçilen ayarlar hem Lebenslauf hem Anschreiben üzerinde aynı tasarım diliyle uygulanmalıdır. İleride Deckblatt da aynı sisteme bağlanabilmelidir.

Göreve başlamadan önce mevcut proje yapısını ve özellikle aşağıdaki dosyaları incele:

```text
src/shared/documentDesign.ts
src/shared/documentDesign.test.ts
src/shared/documentPagination.ts
src/shared/schema.ts
src/store/useAppStore.ts
src/components/document/DocumentBackgroundLayer.tsx
src/views/DocumentsView.tsx
src/app.css
electron/documents.ts
electron/pdf.ts
electron/preload.ts
electron/storage.ts
```

Projede karşılığı bulunan mevcut component, type, store ve servisleri yeniden kullan. Dosyaların içeriğini görmeden hayali API veya import üretme.

## Temel hedef

Referans görsellerdeki yapıya benzer, modern ve kullanılabilir bir belge ayar paneli oluştur.

Panelde aşağıdaki bölümler bulunmalıdır:

### 1. Design und Schriftart

Bu ana bölüm aşağıdaki ayarları içermelidir:

* Seitenränder
* Abschnittsabstand
* Farben
* Schriftstil
* Schriftgröße
* Zeilenhöhe
* Hintergründe
* Unterschrift

Ayarlar paneli açılıp kapatılabilmeli ve belge önizlemesinin yanında çalışmalıdır.

## 2. Seitenränder

Kullanıcı A4 belgenin iç kenar boşluklarını değiştirebilmelidir.

Özellikler:

* Slider
* Eksi ve artı butonları
* Sayısal değer gösterimi
* Minimum ve maksimum sınırlar
* “schmal” ve “breit” açıklamaları
* Değer değiştiğinde anlık önizleme
* Geçersiz veya belgeyi kullanılamaz hâle getiren değerlere izin verilmemesi

Kenar boşlukları tercihen milimetre cinsinden saklanmalıdır.

Gerekirse tek bir genel margin yerine şu alanlara genişletilebilecek bir veri modeli oluştur:

```ts
top
right
bottom
left
```

İlk sürümde tek slider kullanılsa bile veri modeli gelecekte dört kenarın ayrı ayarlanmasını desteklemelidir.

## 3. Abschnittsabstand

Kullanıcı belge bölümleri arasındaki dikey boşluğu ayarlayabilmelidir.

Özellikler:

* Slider
* Eksi ve artı butonları
* Sayısal değer
* “kompakt” ve “mehr Platz” açıklamaları
* Lebenslauf ve Anschreiben bölümlerine ortak uygulanması
* Sayfalama hesaplarının yeni spacing değerine göre yeniden yapılması

Bu değer yalnızca CSS görünümünü değil, pagination ve PDF çıktısını da etkilemelidir.

## 4. Farben

Referans görseldeki gibi renk seçenekleri sun.

Kullanıcı:

* Hazır renklerden birini seçebilmeli
* Seçili rengi açık biçimde görebilmeli
* Özel renk ekleyebilmeli
* Eklediği özel rengi silebilmeli
* Rengi HEX formatında tanımlayabilmeli
* Geçersiz renk değerlerinde doğrulama mesajı görmeli

Renk sistemi yalnızca tek bir renk alanından oluşmamalıdır. Aşağıdaki tasarım tokenlarını destekle:

```ts
primaryColor
secondaryColor
accentColor
textColor
mutedTextColor
backgroundColor
```

Basit arayüzde ana renk seçimi gösterilebilir; ancak veri modeli gelecekte ayrıntılı renk düzenlemesini desteklemelidir.

Renkler şu alanlara tutarlı uygulanmalıdır:

* Başlıklar
* Bölüm başlıkları
* Çizgiler
* İkonlar
* Linkler
* Vurgu alanları
* Anschreiben ve Lebenslauf ortak tasarım öğeleri

## 5. Schriftstil

Kullanıcı yazı tipini dropdown üzerinden seçebilmelidir.

Başlangıçta güvenli ve profesyonel font seçenekleri sun:

* Raleway
* Arial
* Calibri
* Aptos
* Helvetica
* Georgia
* Times New Roman
* Verdana
* Source Sans 3
* Inter

Font ailesi tüm belgeye ortak uygulanmalıdır.

Font seçerken:

* Ekran önizlemesi
* Electron renderer
* PDF üretimi
* Paketlenmiş Windows uygulaması

aynı sonucu vermelidir.

Sistemde bulunmayan fontlar için güvenli fallback font zinciri kullanılmalıdır. Font yüklenmesi tamamlandıktan sonra belge ölçümü ve pagination yeniden çalıştırılmalıdır.

## 6. Schriftgröße

Kullanıcı genel belge yazı boyutunu değiştirebilmelidir.

Özellikler:

* Slider
* Eksi ve artı butonları
* Küçük ve büyük “A” göstergeleri
* Seçili boyutun metinsel veya sayısal gösterimi
* Minimum ve maksimum sınır
* Canlı önizleme

Yazı boyutu değiştiğinde başlıklar ve alt başlıklar orantılı ölçeklenmelidir. Her element için rastgele font-size tanımlama. Merkezi typography tokenları kullan:

```ts
bodyFontSize
smallFontSize
sectionTitleFontSize
documentTitleFontSize
lineHeight
```

## 7. Zeilenhöhe

Kullanıcı satır yüksekliğini değiştirebilmelidir.

Özellikler:

* Slider
* Eksi ve artı butonları
* Sayısal değer
* “komprimiert” ve “geräumig” açıklamaları
* Güvenli minimum ve maksimum sınırlar
* Uzun metinlerde okunabilirliğin korunması
* Pagination’ın yeniden hesaplanması

Satır yüksekliği unitless sayı olarak saklanmalı veya tutarlı bir ölçü standardı kullanılmalıdır.

## 8. Hintergründe

Referans görseldeki gibi bir arka plan galerisi oluştur.

Kullanıcı:

* Arka plansız düz tasarımı seçebilmeli
* Hazır arka plan desenlerinden birini seçebilmeli
* Seçili arka planı açık biçimde görebilmeli
* Arka plan yoğunluğunu gerektiğinde ayarlayabilmeli
* Arka planı kaldırabilmeli

Arka planlar belge içeriğini kapatmamalı ve okunabilirliği bozmamalıdır.

Teknik kurallar:

* Arka plan ayrı katmanda render edilmeli
* `DocumentBackgroundLayer.tsx` kullanılmalı veya genişletilmeli
* İçeriğin arkasında kalmalı
* A4 sınırlarını aşmamalı
* Her sayfada doğru biçimde tekrarlanmalı
* Preview ve PDF çıktısında aynı konumu korumalı
* `pointer-events: none` kullanılmalı
* Z-index yapısı güvenli olmalı
* Background opacity veri modelinde saklanabilmeli

Arka plan kaynaklarını `public` içinden kırılgan URL’lerle yönetme. Development ve production ortamlarında çalışan merkezi bir asset çözümleme sistemi kullan.

## 9. Unterschrift

Kullanıcı Anschreiben için imza ekleyebilmelidir.

Özellikler:

* “Neu hinzufügen” butonu
* PNG, JPG veya WebP seçebilme
* Şeffaf PNG desteği
* Dosya türü ve boyut doğrulaması
* Önizleme
* Değiştirme
* Silme
* Boyutlandırma
* Hizalama seçimi
* Anschreiben üzerinde doğru konuma yerleştirme

İmza güvenli biçimde kullanıcı veri klasöründe saklanmalıdır. Uygulama kaynağına veya `app.asar` içine yazılmamalıdır.

Renderer doğrudan `fs` kullanmamalıdır. Dosya seçimi, kopyalama ve silme işlemleri güvenli preload/IPC katmanı üzerinden yapılmalıdır.

İmza ayarı ortak tasarım profilinde bulunabilir; ancak varsayılan olarak yalnızca Anschreiben üzerinde gösterilmelidir. Lebenslauf üzerinde kullanıcı ayrıca etkinleştirmedikçe görünmemelidir.

## Ortak tasarım modeli

Lebenslauf ve Anschreiben için ayrı ayrı kopyalanmış ayar modelleri oluşturma.

Merkezi ve type-safe bir `DocumentDesignSettings` modeli kullan veya mevcut modeli genişlet.

Örnek hedef yapı:

```ts
type DocumentKind = "lebenslauf" | "anschreiben" | "deckblatt";

interface DocumentMargins {
  topMm: number;
  rightMm: number;
  bottomMm: number;
  leftMm: number;
}

interface DocumentTypography {
  fontFamily: string;
  bodyFontSizePt: number;
  lineHeight: number;
  scaleRatio: number;
}

interface DocumentColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  mutedText: string;
  background: string;
}

interface DocumentBackgroundSettings {
  backgroundId: string | null;
  opacity: number;
}

interface DocumentSignatureSettings {
  assetId: string | null;
  widthMm: number;
  alignment: "left" | "center" | "right";
  showInAnschreiben: boolean;
  showInLebenslauf: boolean;
}

interface DocumentDesignSettings {
  margins: DocumentMargins;
  sectionSpacingMm: number;
  typography: DocumentTypography;
  colors: DocumentColors;
  background: DocumentBackgroundSettings;
  signature: DocumentSignatureSettings;
}
```

Bu yapı yalnızca örnektir. Mevcut proje tiplerini inceleyerek uyumlu ve gereksiz migration gerektirmeyen nihai modeli oluştur.

## Lebenslauf ve Anschreiben ortaklığı

Aynı başvuruya ait Lebenslauf ve Anschreiben şu özellikleri ortak kullanmalıdır:

* Font ailesi
* Ana renk
* İkincil renk
* Vurgu rengi
* Genel tipografi oranı
* Sayfa kenar boşlukları
* Bölüm boşluk sistemi
* Arka plan stili
* Başlık ve çizgi tasarımı
* Ortak belge kimliği

Ancak belge türüne özgü ayarlar desteklenmelidir:

* Anschreiben imzası
* Anschreiben mektup alanları
* Lebenslauf bölüm sıralaması
* Lebenslauf fotoğraf görünürlüğü
* Belge türüne özgü header/footer içeriği

Ortak tasarım ayarları ile belgeye özgü içerik ayarlarını birbirine karıştırma.

## Tasarım profili

Her başvuru için tek bir ortak tasarım profili kullanılmalıdır.

Aşağıdaki davranışları destekle:

* Kullanıcı bir template seçtiğinde ilgili varsayılan tasarım ayarları yüklenir.
* Kullanıcı değişiklik yaptığında yalnızca o başvurunun tasarım profili güncellenir.
* Lebenslauf ve Anschreiben aynı profil üzerinden render edilir.
* Kullanıcı varsayılan değerlere geri dönebilir.
* Template değiştirildiğinde kullanıcıya mevcut özelleştirmeleri koruma veya template varsayılanlarına dönme seçeneği sunulabilir.
* Ayarlar uygulama yeniden başlatıldığında kaybolmamalıdır.
* Eski kayıtlarda alanlar eksikse güvenli varsayılan değerlerle migration uygulanmalıdır.

## Canlı önizleme

Kullanıcı slider veya seçim alanını değiştirdiğinde sonuç belge önizlemesinde anında görünmelidir.

Performans kuralları:

* Her slider hareketinde gereksiz tüm uygulamayı render etme
* Gerekirse geçici preview state ile kalıcı store state’i ayır
* Slider değişimini akıcı göster
* Kalıcı kayıt için kontrollü debounce kullanılabilir
* Rastgele `setTimeout` kullanma
* `useMemo`, selector ve component ayrıştırmasını gerektiği yerde uygula
* Zustand store’da geniş ve gereksiz subscription oluşturma
* Font, margin ve line-height değişikliklerinde pagination güvenli biçimde yeniden hesaplanmalı
* Sonsuz ölçüm/render döngüsü oluşmamalı

## A4 ve PDF uyumluluğu

Belge standardı:

```css
@page {
  size: A4;
  margin: 0;
}
```

Gerçek sayfa ölçüsü:

```text
210 mm × 297 mm
```

Kurallar:

* Preview scale değeri belge tasarım ayarı değildir.
* Zoom yalnızca kullanıcı arayüzündeki görünüm boyutunu değiştirmelidir.
* Margin, font-size, line-height ve spacing gerçek belge koordinatlarında hesaplanmalıdır.
* PDF oluştururken preview’e özel transform kuralları kullanılmamalıdır.
* Screen CSS ve print CSS aynı tasarım tokenlarından beslenmelidir.
* Lebenslauf ve Anschreiben PDF çıktılarında aynı tasarım profili kullanılmalıdır.
* Arka plan, font ve imza PDF içinde eksiksiz görünmelidir.
* Sayfa taşmaları kontrollü pagination ile çözülmelidir.

## UI bileşenleri

Ayar panelini tek bir dev component içinde oluşturma.

Mantıklı component ayrımı kullan:

```text
DocumentDesignPanel
DocumentMarginControl
DocumentSpacingControl
DocumentColorPalette
DocumentFontSelector
DocumentFontSizeControl
DocumentLineHeightControl
DocumentBackgroundPicker
DocumentSignatureControl
```

Proje yapısına uygunsa bu componentleri `src/components/document-design/` veya mevcut component organizasyonuna uygun bir klasörde oluştur.

Ortak slider componenti oluşturulabiliyorsa tekrar eden kodu azalt:

```text
DesignSliderControl
```

Bu component aşağıdaki alanları destekleyebilmelidir:

* Label
* Value
* Minimum
* Maximum
* Step
* Minus button
* Plus button
* Sol açıklama
* Sağ açıklama
* Opsiyonel ikon veya tipografi göstergesi

## Erişilebilirlik

* Tüm butonlarda anlaşılır `aria-label` bulunmalı
* Slider klavye ile değiştirilebilmeli
* Aktif renk ve arka plan seçeneklerinde `aria-pressed` veya uygun seçim durumu kullanılmalı
* Sadece renk ile seçim durumu belirtilmemeli
* Focus stilleri görünür olmalı
* Kapatma butonunun erişilebilir adı bulunmalı
* Renk kontrastı okunabilirliği bozarsa kullanıcı uyarılmalı
* İkon butonlarında tooltip veya erişilebilir metin bulunmalı

## Store ve kalıcılık

Mevcut `useAppStore` yapısını incele.

* Aynı ayarları farklı store bölümlerinde tekrar saklama
* Tasarım güncellemeleri için type-safe actionlar oluştur
* Tüm tasarım nesnesini her küçük değişiklikte kontrolsüz değiştirme
* Nested state güncellemelerinde immutable yaklaşım kullan
* Eski kaydedilmiş veriler için migration ekle
* Storage schema versiyonu varsa güncelle
* Tasarım profilini ilgili application/document kaydıyla ilişkilendir
* Kullanıcı özel renklerini ve imza referansını kalıcı olarak sakla
* Base64 imzayı doğrudan büyük JSON state içine koyma; dosya veya asset kimliği kullan

## Güvenlik

Electron güvenlik ayarlarını bozma:

* `contextIsolation` açık kalmalı
* `nodeIntegration` açılmamalı
* Renderer içinde doğrudan `fs`, `path` veya Electron main API kullanılmamalı
* IPC kanalları whitelist yaklaşımıyla tanımlanmalı
* Dosya uzantısı yalnızca istemci tarafında değil main process içinde de doğrulanmalı
* Kullanıcı tarafından seçilen dosya yolu HTML içine güvenli olmayan biçimde basılmamalı
* Yerel görseller güvenli bir IPC, asset URL veya custom protocol üzerinden sunulmalı

## Test gereksinimleri

Aşağıdaki durumlar için test yaz veya mevcut testleri güncelle:

1. Varsayılan tasarım ayarlarının doğru yüklenmesi
2. Eski verilerin yeni `DocumentDesignSettings` modeline migration edilmesi
3. Margin değerlerinin minimum ve maksimum sınırları
4. Section spacing değişikliğinin uygulanması
5. Font ailesi değişikliği
6. Font-size ölçek hesaplaması
7. Line-height sınırları
8. Geçerli ve geçersiz HEX renkleri
9. Özel renk ekleme ve silme
10. Arka plan seçme ve kaldırma
11. İmza dosyası doğrulaması
12. İmzanın yalnızca Anschreiben üzerinde varsayılan olarak gösterilmesi
13. Lebenslauf ve Anschreiben’in aynı design profile kimliğini kullanması
14. Template değişiminden sonra varsayılan ayarların doğru uygulanması
15. Preview zoom değişiminin gerçek belge ölçülerini değiştirmemesi
16. Tasarım değişikliği sonrası pagination’ın yeniden hesaplanması
17. PDF üretiminde renk, font, arka plan ve imzanın korunması
18. Uygulama yeniden açıldığında ayarların geri yüklenmesi

Öncelikle şu test dosyalarını değerlendir:

```text
src/shared/documentDesign.test.ts
src/shared/documentPagination.test.ts
src/shared/schema.test.ts
electron/documents.test.ts
electron/pdf.test.ts
electron/storage.test.ts
```

Gerekirse component testleri ekle.

## Çalışma sırası

Görevi aşamalı olarak gerçekleştir:

### Aşama 1: Mevcut sistem analizi

* İlgili dosyaları incele
* Var olan design modelini belirle
* Store ve persistence ilişkisini çıkar
* Preview ile PDF render akışını tespit et
* Değiştirilecek dosyaları listele

Bu aşamada henüz gereksiz kod üretme.

### Aşama 2: Veri modeli

* Ortak `DocumentDesignSettings` modelini oluştur veya genişlet
* Default değerleri tanımla
* Validation ve migration ekle
* Lebenslauf ve Anschreiben ortak profil bağlantısını kur

### Aşama 3: State yönetimi

* Store actionlarını ekle
* Persistence sistemini güncelle
* Reset ve template default davranışlarını ekle

### Aşama 4: UI

* Ayar panelini componentlere ayır
* Slider, renk, font, arka plan ve imza kontrollerini oluştur
* Erişilebilirlik kurallarını uygula

### Aşama 5: Belge render sistemi

* Tasarım tokenlarını Lebenslauf ve Anschreiben rendererlarına bağla
* Arka plan katmanını güncelle
* İmza rendererını ekle
* A4 ve pagination uyumunu sağla

### Aşama 6: Electron ve dosya işlemleri

* İmza seçimi ve saklama IPC’sini ekle
* Production-safe asset erişimini oluştur
* Preload type tanımlarını güncelle

### Aşama 7: PDF

* Ortak tasarım profilini PDF üretimine aktar
* Preview ve PDF görünüm farklarını gider
* Font, arka plan ve imza yüklenmesini bekleyen güvenli mekanizma kullan

### Aşama 8: Test ve doğrulama

* Unit testleri yaz
* Component davranışlarını doğrula
* Development ve paketlenmiş EXE üzerinde kontrol adımlarını ver

## Kod çıktı formatı

Her dosya için şu yapıyı kullan:

```text
Dosya: src/ilgili/dosya.tsx
İşlem: Güncellenecek | Yeni oluşturulacak | Silinecek
Amaç: Yapılan değişikliğin teknik açıklaması
```

Ardından tam ve doğrudan kullanılabilir kodu ver.

Kod verirken:

* Eksik import bırakma
* Tanımsız type veya interface kullanma
* Projede olmayan API’leri varmış gibi kabul etme
* Pseudocode üretme
* “Mevcut kod burada kalacak” gibi uygulanamaz bloklar bırakma
* CSS ve JSX class isimlerini eşleştir
* Yeni IPC kanallarının preload ve TypeScript tanımlarını birlikte güncelle
* Gereksiz npm paketi ekleme
* Yeni paket zorunluysa önce gerekçesini açıkla
* Üretilmiş `dist-electron`, `artifacts`, `release` veya `windows-release` dosyalarını doğrudan düzenleme

## Her cevapta kullanılacak format

### 1. Mevcut durum analizi

Mevcut kodun tasarım, state, preview ve PDF akışını açıkla.

### 2. Problem ve eksikler

Ortak design profile sisteminde eksik veya hatalı noktaları belirt.

### 3. Çözüm mimarisi

Veri modeli, componentler, store, IPC ve PDF ilişkisini açıkla.

### 4. Değiştirilecek dosyalar

Dosya yollarını ve değişiklik amaçlarını listele.

### 5. Kod değişiklikleri

Tam ve uygulanabilir kodları ver.

### 6. Testler

Eklenen ve güncellenen testleri göster.

### 7. PowerShell komutları

Test, development build ve Windows build komutlarını sırayla ver.

### 8. Manuel kontrol listesi

Lebenslauf, Anschreiben, preview, PDF, installer ve portable sürüm için kontrol adımlarını belirt.

## Kaçınılması gerekenler

* Lebenslauf ve Anschreiben için iki ayrı ve tekrar eden tasarım sistemi oluşturma
* Preview zoom ile gerçek belge ölçülerini birbirine karıştırma
* Margin ve spacing sorunlarını negatif margin ile gizleme
* Slider değişikliklerinde tüm uygulamayı gereksiz render etme
* Base64 görselleri büyük application state içine kaydetme
* Renderer içinde doğrudan dosya sistemi kullanma
* `nodeIntegration` açma
* `contextIsolation` kapatma
* `app.asar` içine kullanıcı dosyası yazma
* Yalnızca UI oluşturup PDF ve persistence katmanlarını eksik bırakma
* Rastgele pixel değerleri kullanma
* Her template için aynı componentlerin kopyasını oluşturma
* Ben istemeden Tailwind, Bootstrap veya başka bir UI framework’üne geçme
* Mevcut projeyi baştan yazma

Bundan sonra sana ilgili kaynak dosyaları parça parça vereceğim. Her adımda yalnızca mevcut aşama için gerekli değişiklikleri yap, tam kodu ve testleri ver, ardından bir sonraki aşama için bekle.
