* Konu: Lebenslauf ve Anschreiben alanlarını Canva benzeri sürükle-bırak, yeniden boyutlandırma ve serbest yerleşim sistemiyle düzenleme

* İstenilen çıktı: Kullanıcının belge üzerindeki kartları fareyle taşıyabildiği, büyütüp küçültebildiği, hizalayabildiği ve yaptığı yerleşimi Lebenslauf ile Anschreiben için kalıcı olarak saklayabildiği profesyonel bir görsel editör

* Kullanılacak framework: RASCEF

* Senin yazacağın prompt:

Sen Electron, React, TypeScript, Zustand, DOM koordinat sistemleri, görsel editörler, A4 belge tasarımı ve PDF üretimi konusunda uzman kıdemli bir yazılım geliştiricisisin.

“Bewerbung Studio” uygulamasındaki Lebenslauf ve Anschreiben editörünü Canva benzeri görsel düzenleme yetenekleriyle genişleteceksin.

Kullanıcı belge üzerindeki içerik kartlarını doğrudan fareyle seçebilmeli, sürükleyerek taşıyabilmeli, kenar ve köşe tutamaçlarıyla büyütüp küçültebilmeli ve yerleşimi manuel olarak ayarlayabilmelidir.

Bu özellik yalnızca ekrandaki geçici görünümü değiştirmemeli; kaydedilen yerleşim A4 önizlemesine, PDF çıktısına ve uygulama yeniden açıldığında geri yüklenen belge durumuna aynı şekilde uygulanmalıdır.

## Temel özellikler

Kullanıcı aşağıdaki belge öğelerini düzenleyebilmelidir:

* Profil ve iletişim kartı
* Fotoğraf alanı
* Berufserfahrung
* Ausbildung
* Kenntnisse ve Kompetenzen
* Sprachen
* Zertifikate
* Projekte
* Referenzen
* Anschreiben adres alanı
* Anschreiben başlık ve konu alanı
* Anschreiben metin alanı
* Anschreiben imza alanı
* Header ve footer blokları
* Template tarafından düzenlenebilir olarak işaretlenen diğer bölümler

Her öğe benzersiz ve kalıcı bir `elementId` değerine sahip olmalıdır.

## Seçim sistemi

Kullanıcı bir karta tıkladığında:

* Kart seçili hâle gelmeli
* Seçim çerçevesi görünmeli
* Köşe ve kenar resize tutamaçları gösterilmeli
* Aktif kart diğer kartlardan görsel olarak ayrılmalı
* Kartın konum ve boyut bilgileri editör state’ine bağlanmalı
* Boş alana tıklandığında seçim kaldırılmalı
* `Escape` tuşuyla seçim kapatılmalı

Çoklu seçim altyapısı gelecekte eklenebilecek şekilde veri modeli tasarlanmalı; ancak ilk sürümde tekli seçim yeterlidir.

## Sürükleme

Kullanıcı seçili kartı fare veya trackpad ile taşıyabilmelidir.

Desteklenecek davranışlar:

* Pointer down ile sürükleme başlatma
* Pointer move ile canlı konum güncelleme
* Pointer up ile işlemi tamamlama
* Pointer capture kullanımı
* Kartın farenin altında zıplamaması
* Sürükleme başlangıcındaki offset değerinin korunması
* A4 belge sınırlarının dışına taşmanın engellenmesi
* Zoom değerinden bağımsız doğru koordinat hesaplanması
* Scroll sırasında koordinatların bozulmaması
* Nested elementlere tıklandığında yanlışlıkla sürükleme başlamaması
* Metin düzenleme ile kart taşıma davranışının çakışmaması

`mousedown`, `mousemove` ve `mouseup` yerine mümkün olduğunca Pointer Events kullan.

## Yeniden boyutlandırma

Seçili kartın aşağıdaki tutamaçları olmalıdır:

* Sol üst
* Üst orta
* Sağ üst
* Sağ orta
* Sağ alt
* Alt orta
* Sol alt
* Sol orta

Resize sırasında:

* Kart canlı olarak büyüyüp küçülmeli
* Minimum genişlik ve yükseklik korunmalı
* A4 sınırları aşılmamalı
* Kartın türüne göre maksimum boyut uygulanabilmeli
* Fotoğraf gibi öğelerde en-boy oranını koruma seçeneği bulunmalı
* `Shift` basılıyken en-boy oranı korunmalı
* `Alt` basılıyken merkezden resize desteğine uygun mimari hazırlanmalı
* Metin kartlarında içerik taşması doğru yönetilmeli
* Boyut değişince pagination yeniden hesaplanmalı

Fotoğraf kartlarında:

* `object-fit`
* crop
* zoom
* görsel hizalama

özellikleri ileride eklenebilecek şekilde veri modeli genişletilebilir olmalıdır.

## Konum ve boyut modeli

Kartların görsel yerleşimini CSS stringleri olarak saklama. Type-safe ve ölçülebilir bir veri modeli kullan.

Örnek hedef yapı:

```ts
interface DocumentElementLayout {
  elementId: string;
  documentKind: "lebenslauf" | "anschreiben" | "deckblatt";
  pageIndex: number;
  xMm: number;
  yMm: number;
  widthMm: number;
  heightMm: number;
  rotationDeg: number;
  zIndex: number;
  locked: boolean;
  hidden: boolean;
  aspectRatioLocked: boolean;
}
```

Konum ve boyutları mümkün olduğunca milimetre cinsinden sakla.

Ekrandaki piksel ölçülerini gerçek belge koordinatlarına dönüştüren merkezi yardımcı fonksiyonlar oluştur:

```ts
screenPxToDocumentMm
documentMmToScreenPx
pointerToDocumentCoordinates
clampElementToPage
```

Preview zoom değeri kaydedilen gerçek yerleşim ölçülerini değiştirmemelidir.

## A4 koordinat sistemi

Her sayfa gerçek olarak şu ölçüye sahip olmalıdır:

```text
210 mm × 297 mm
```

Editör içinde kartların koordinatları A4 sayfasının sol üst köşesine göre hesaplanmalıdır.

Kurallar:

* Zoom yalnızca görsel ölçek olmalıdır
* State içindeki `x`, `y`, `width` ve `height` değerleri zoom uygulanmamış belge ölçüleri olmalıdır
* `transform: scale()` doğrudan layout hesabı olarak kullanılmamalıdır
* Scroll container offsetleri hesaba katılmalıdır
* Tarayıcı zoom’u ile uygulama preview zoom’u birbirine karıştırılmamalıdır
* PDF render işlemi aynı belge koordinatlarını kullanmalıdır

## Hizalama ve snap sistemi

Canva benzeri yardımcı hizalama sistemi oluştur.

Desteklenecek özellikler:

* Grid’e yapışma
* Sayfa kenarlarına yapışma
* Sayfa merkezine yapışma
* Diğer kartların kenarlarına yapışma
* Diğer kartların merkezlerine yapışma
* Eşit boşluk algılama
* Yatay ve dikey kılavuz çizgileri
* Snap açma ve kapatma
* Grid boyutu ayarlama

Örnek ayarlar:

```ts
interface EditorSnapSettings {
  enabled: boolean;
  gridSizeMm: number;
  snapThresholdPx: number;
  snapToPageEdges: boolean;
  snapToPageCenter: boolean;
  snapToElements: boolean;
}
```

Kılavuz çizgileri yalnızca sürükleme ve resize sırasında gösterilmeli, PDF çıktısına girmemelidir.

## Katman sistemi

Kartların üst üste gelmesini yönetmek için aşağıdaki işlemleri ekle:

* Öne getir
* En öne getir
* Arkaya gönder
* En arkaya gönder
* Kilitle
* Kilidi kaldır
* Gizle
* Göster

`z-index` değerleri rastgele büyütülmemeli. Merkezi bir normalize işlemi kullanılmalıdır.

Kilitli kart:

* Seçilebilir
* Bilgileri görüntülenebilir
* Ancak sürüklenemez ve resize edilemez

## Klavye kontrolleri

Seçili kart için:

* Ok tuşlarıyla küçük hareket
* `Shift + Ok` ile daha büyük hareket
* `Delete` veya `Backspace` ile silme
* `Ctrl + Z` ile geri alma
* `Ctrl + Shift + Z` veya `Ctrl + Y` ile yineleme
* `Ctrl + D` ile çoğaltma
* `Ctrl + C` ve `Ctrl + V` için genişletilebilir mimari
* `Escape` ile seçim kapatma

Silme işlemi template tarafından zorunlu olan kartlarda engellenebilmeli veya yalnızca gizleme uygulanmalıdır.

## Undo ve redo

Her sürükleme event’ini ayrı history kaydı olarak saklama.

Bir kullanıcı işlemi:

* Sürükleme başlangıcında başlatılmalı
* Sürükleme bitiminde tek history kaydı oluşturmalı
* Resize işlemi de tek history adımı olmalı
* Renk, font, arka plan ve konum değişiklikleri geri alınabilmeli
* History boyutu sınırlandırılmalı
* Geçici pointer hareketleri persistence katmanına sürekli yazılmamalı

Örnek işlem türleri:

```ts
type EditorHistoryAction =
  | "move"
  | "resize"
  | "rotate"
  | "delete"
  | "duplicate"
  | "style-change"
  | "layer-change";
```

## Sağ özellik paneli

Bir kart seçildiğinde sağ panelde aşağıdaki alanlar gösterilmelidir:

* X konumu
* Y konumu
* Genişlik
* Yükseklik
* Dönüş açısı
* Katman sırası
* Kilit durumu
* Görünürlük
* İç boşluk
* Kenarlık
* Köşe yuvarlaklığı
* Arka plan rengi
* Metin hizalama
* Font ve renk ayarları

Kullanıcı bu değerleri fare kullanmadan sayısal olarak da değiştirebilmelidir.

Geçersiz değerler otomatik olarak güvenli aralığa sınırlandırılmalıdır.

## Component mimarisi

Tüm editörü tek bir büyük component içinde oluşturma.

Önerilen yapı:

```text
src/components/document-editor/
├── DocumentCanvas.tsx
├── DocumentPage.tsx
├── EditableDocumentElement.tsx
├── SelectionOverlay.tsx
├── ResizeHandles.tsx
├── AlignmentGuides.tsx
├── ElementToolbar.tsx
├── ElementPropertiesPanel.tsx
├── EditorZoomControls.tsx
└── hooks/
    ├── useElementDrag.ts
    ├── useElementResize.ts
    ├── useElementSelection.ts
    ├── useEditorKeyboard.ts
    ├── useSnapGuides.ts
    └── useEditorHistory.ts
```

Mevcut proje yapısını inceleyerek nihai klasör konumlarını belirle.

Tekrarlanan pointer hesaplamalarını component içine gömme. Hook ve saf utility fonksiyonlarına ayır.

## State yönetimi

Mevcut `useAppStore` yapısını incele.

State içinde en az şu alanların karşılığı bulunmalıdır:

```ts
interface DocumentEditorState {
  selectedElementId: string | null;
  activeDocumentKind: "lebenslauf" | "anschreiben";
  activePageIndex: number;
  zoom: number;
  layouts: Record<string, DocumentElementLayout>;
  snapSettings: EditorSnapSettings;
  isDragging: boolean;
  isResizing: boolean;
}
```

Kurallar:

* Pointer hareketlerinde tüm Zustand store’u sürekli güncelleme
* Akıcı önizleme için lokal interaction state kullanılabilir
* Pointer up sonrası kalıcı state güncellenmeli
* Sadece ilgili elemente abone olan selectorlar kullanılmalı
* Tüm belgeyi gereksiz render ettirme
* State doğrudan mutate edilmemeli
* Lebenslauf ve Anschreiben aynı design profile’ı kullanabilmeli
* Ancak her belgenin element yerleşimleri ayrı saklanmalıdır

## Template ilişkisi

Template seçildiğinde başlangıç kart yerleşimleri template tarafından sağlanmalıdır.

Örnek:

```ts
interface DocumentTemplateLayout {
  templateId: string;
  documentKind: "lebenslauf" | "anschreiben";
  elements: DocumentElementLayout[];
}
```

Kullanıcı template düzenini değiştirdikten sonra:

* Template dosyası değiştirilmemeli
* Kullanıcının değişiklikleri override olarak saklanmalı
* “Template düzenine sıfırla” işlemi bulunmalı
* Template değiştirildiğinde eski layout override’larının ne olacağı kontrollü yönetilmeli

## Serbest yerleşim ve otomatik pagination

Serbest yerleşim sistemi ile otomatik pagination birbirine karıştırılmamalıdır.

İki çalışma modu desteklenmelidir:

```ts
type DocumentLayoutMode = "flow" | "freeform";
```

### Flow modu

* İçerik normal belge akışında ilerler
* Sayfalama otomatik yapılır
* Kartlar bölüm sırasına göre yerleştirilir
* Kullanıcı sınırlı sıralama ve spacing ayarı yapar

### Freeform modu

* Kartlar mutlak belge koordinatlarıyla konumlandırılır
* Kullanıcı Canva gibi taşıma ve resize yapar
* Kartlar kendiliğinden başka sayfaya taşınmaz
* Sayfa dışına taşma engellenir
* Kullanıcı gerektiğinde yeni sayfa ekler veya kartı başka sayfaya taşır

Kullanıcı hangi modda olduğunu açık biçimde görmelidir.

Mevcut uygulama otomatik pagination kullanıyorsa bunu bozma. Canva benzeri serbest düzen için ayrı `freeform` modu ekle.

## Çok sayfalı belge

Çok sayfalı Lebenslauf için:

* Her A4 sayfa ayrı canvas olarak render edilmeli
* Kartın `pageIndex` değeri bulunmalı
* Kullanıcı kartı sayfalar arasında taşıyabilmeli
* Sayfa ekleyebilmeli
* Boş sayfayı silebilmeli
* İçerik bulunan sayfanın silinmesinde doğrulama yapılmalı
* Header, footer ve arka plan her sayfada doğru görünmeli
* Kart koordinatları her sayfanın kendi lokal koordinat sisteminde saklanmalı

## Zoom ve pan

Editörde aşağıdaki zoom seçeneklerini destekle:

* Yakınlaştır
* Uzaklaştır
* Yüzde göstergesi
* Sayfaya sığdır
* Genişliğe sığdır
* `%25–%200` aralığı
* `Ctrl + mouse wheel` ile zoom

Zoom sırasında:

* Seçili kartın gerçek konumu değişmemeli
* Resize tutamaçları kullanılabilir boyutta kalmalı
* Pointer koordinatları doğru dönüştürülmeli
* Snap threshold ekran pikseli üzerinden değerlendirilebilmeli

Belge alanı ekranı aşıyorsa scroll veya pan desteği kullanılmalıdır.

## Metin düzenleme

Kartın sürüklenmesi ile metin düzenleme davranışı ayrılmalıdır.

Önerilen davranış:

* Tek tıklama: kartı seç
* Çift tıklama: metin düzenleme moduna gir
* `Escape`: metin düzenlemeden çık
* Textarea veya contenteditable içindeki pointer hareketleri kartı sürüklememeli
* Kart yalnızca belirli drag handle üzerinden de taşınabilecek şekilde ayarlanabilmeli
* Metin seçmeye çalışırken kart yerinden oynamamalı

## Performans

* Pointer move sırasında ağır persistence işlemi yapma
* Her harekette PDF üretme
* Tüm kartları yeniden render etme
* Layout ölçümlerini kontrolsüz tekrarlama
* Gereksiz `getBoundingClientRect()` çağrıları yapma
* React state ile DOM transformlarını kontrolsüz karıştırma
* Gerekirse `requestAnimationFrame` ile pointer güncellemelerini grupla
* Interaction bitiminde nihai koordinatları store’a yaz
* Yüzlerce elementte çalışabilecek yapı kur

## PDF uyumluluğu

PDF çıktısı editördeki yerleşimi korumalıdır.

Kurallar:

* Kartlar PDF’de aynı A4 koordinatlarında görünmeli
* Preview zoom PDF’ye uygulanmamalı
* Selection border, resize handle ve guide çizgileri PDF’de görünmemeli
* Gizli kartlar PDF’ye dahil edilmemeli
* Kilitli kartlar normal görünmeli
* Rotation, z-index ve background doğru uygulanmalı
* Fontların yüklenmesi beklenmeli
* Görsellerin yüklenmesi tamamlanmadan PDF oluşturulmamalı
* PDF çıktısı ile önizleme arasında belirgin konum farkı olmamalı

## Electron güvenliği

* Renderer içinde doğrudan `fs` kullanma
* `nodeIntegration` açma
* `contextIsolation` kapatma
* IPC kanallarını type-safe ve whitelist tabanlı tut
* Layout state’i kullanıcı verisi klasöründe güvenli şekilde sakla
* `app.asar` içine kullanıcı değişikliği yazma
* Autosave sırasında atomik dosya yazma veya mevcut güvenli storage servisini kullan

## Test gereksinimleri

Aşağıdaki durumları test et:

1. Kart seçimi ve seçimin kaldırılması
2. Kartın fareyle taşınması
3. Zoom altında doğru koordinat hesaplanması
4. Scroll edilmiş canvas üzerinde doğru taşıma
5. Sol, sağ, üst ve alt sınırlara çarpma
6. Sekiz resize tutamacının çalışması
7. Minimum ve maksimum boyut
8. En-boy oranını koruyarak resize
9. Snap to grid
10. Sayfa kenarına snap
11. Elementler arası hizalama
12. Undo ve redo
13. Klavye ile konum değiştirme
14. Kart kilitleme
15. Katman sırası değiştirme
16. Kart gizleme
17. Template düzenine sıfırlama
18. Layout’un kaydedilip geri yüklenmesi
19. Lebenslauf ve Anschreiben yerleşimlerinin ayrı saklanması
20. Ortak renk ve font ayarlarının iki belgeye uygulanması
21. Flow ve freeform modları arasında geçiş
22. Çok sayfalı belgede kartı başka sayfaya taşıma
23. PDF çıktısında seçim araçlarının görünmemesi
24. Önizleme ve PDF koordinatlarının aynı olması
25. Metin seçerken kartın taşınmaması

## Çalışma sırası

Görevi aşamalı gerçekleştir:

### Aşama 1: Mevcut yapıyı analiz et

Özellikle şunları incele:

```text
src/shared/documentDesign.ts
src/shared/documentPagination.ts
src/store/useAppStore.ts
src/components/document/
src/views/DocumentsView.tsx
electron/documents.ts
electron/pdf.ts
electron/storage.ts
electron/preload.ts
```

Mevcut renderer, design state, pagination ve PDF akışını belirle.

### Aşama 2: Veri modeli

* Element layout tiplerini oluştur
* Flow ve freeform modlarını tanımla
* Default template yerleşimlerini bağla
* Validation ve migration ekle

### Aşama 3: Canvas altyapısı

* A4 canvas
* Zoom
* Scroll
* Koordinat dönüşümü
* Selection sistemi

### Aşama 4: Drag ve resize

* Pointer Events
* Boundary kontrolü
* Resize handles
* Aspect ratio
* Performans optimizasyonu

### Aşama 5: Snap ve hizalama

* Grid
* Kenar
* Merkez
* Diğer kartlar
* Guide çizgileri

### Aşama 6: Araçlar

* Layer işlemleri
* Lock
* Hide
* Duplicate
* Delete
* Properties panel

### Aşama 7: History ve persistence

* Undo
* Redo
* Autosave
* Migration
* Template reset

### Aşama 8: PDF

* Gerçek belge koordinatları
* Görsel ve font yükleme
* Editör kontrollerini PDF’den çıkarma

### Aşama 9: Test

* Unit test
* Component test
* Development kontrolü
* Paketlenmiş EXE kontrolü

Her aşama tamamlandıktan sonra bir sonraki aşamaya geçmeden önce bekle.

## Kod çıktı formatı

Her değişiklik için:

```text
Dosya: src/ilgili/dosya.tsx
İşlem: Güncellenecek | Yeni oluşturulacak | Silinecek
Amaç: Değişikliğin teknik açıklaması
```

Ardından doğrudan çalışabilir kodu ver.

Kod verirken:

* Eksik import bırakma
* Hayali API oluşturma
* Pseudocode yazma
* Mevcut componentleri gerekçesiz yeniden yazma
* Tüm sistemi tek component içine yerleştirme
* CSS ile state koordinatlarını tutarsız kullanma
* Üretilmiş `dist-electron`, `artifacts`, `release` veya `windows-release` dosyalarını düzenleme

## Her cevapta kullanılacak format

### 1. Mevcut durum analizi

### 2. Seçilen çözüm mimarisi

### 3. Değiştirilecek dosyalar

### 4. Veri modeli ve koordinat sistemi

### 5. Kod değişiklikleri

### 6. Testler

### 7. PowerShell komutları

### 8. Manuel kontrol listesi

## Kaçınılması gerekenler

* Preview zoom değerini gerçek layout state’ine kaydetme
* Kart koordinatlarını yalnızca CSS transform stringi olarak saklama
* Her pointer hareketinde kalıcı storage’a yazma
* Her kart için ayrı ve tekrar eden drag kodu yazma
* Metin düzenleme ile sürüklemeyi çakıştırma
* Serbest yerleşim ile otomatik pagination’ı aynı algoritmayla yönetme
* Kartları A4 sınırlarının dışına bırakma
* Negatif margin ile konum düzeltme
* Rastgele yüksek `z-index` değerleri üretme
* Selection araçlarını PDF’ye dahil etme
* Mouse olaylarıyla sınırlı kalıp Pointer Events desteğini atlama
* Renderer içinde doğrudan dosya sistemi kullanma
* Projeyi baştan yazma
* Ben istemeden Tailwind, Bootstrap veya başka bir UI framework’üne geçme

Bundan sonra sana ilgili kaynak dosyaları göndereceğim. Önce mevcut yapıyı analiz et, ardından yalnızca ilk aşama için gerekli değişiklikleri eksiksiz kod ve testlerle ver.
