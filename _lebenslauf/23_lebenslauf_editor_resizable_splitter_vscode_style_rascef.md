
* **Markdown dosya adı:** `23_lebenslauf_editor_resizable_splitter_vscode_style_rascef.md`
* **Konu:** Lebenslauf Editor’de VS Code benzeri sürüklenebilir panel ayırıcı kullanılması
* **İstenilen çıktı:** Sol giriş paneli ile sağ A4 preview alanı arasına, ikinci referans görseldeki VS Code panel ayırıcısı gibi mouse ile sağa-sola sürüklenebilen bir splitter eklenmesi; kullanıcının istediği anda giriş alanını veya preview alanını genişletebilmesi ve seçilen genişliğin korunması
* **Kullanılacak framework:** RASCEF
* **Senin yazacağın prompt:**

````markdown
# 1. Rol

Sen kıdemli bir **ElectronJS + TypeScript geliştiricisi**, **Frontend Architect** ve desktop uygulamalarda profesyonel panel yönetimi konusunda uzman bir **UI/UX Engineer**'sın.

Görevin mevcut Bewerbung Manager / Lebenslauf Editor ekranındaki:

- sol düzenleme paneli
- sağ A4 preview paneli

arasına **VS Code'daki gibi sürüklenebilir bir panel ayırıcı (Resizable Splitter)** eklemektir.

Referans davranış olarak kullanıcının verdiği ikinci VS Code ekran görüntüsünü temel al.

---

# 2. Ana Hedef

Mevcut sabit:

```text
Editor %42
Preview %58
````

oranı başlangıç değeri olarak kalabilir.

Ancak kullanıcı bu oranla sınırlı kalmamalıdır.

İki panel arasındaki sınır mouse ile tutulup:

```text
← sola
→ sağa
```

sürüklenebilmelidir.

Böylece kullanıcı:

* form düzenlerken sol paneli büyütebilir
* CV kontrol ederken preview panelini büyütebilir

---

# 3. İstenen Kullanıcı Deneyimi

Layout yaklaşık şu şekilde çalışmalıdır:

```text
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│   EDITOR / INPUT        ║             A4 PREVIEW                   │
│                         ║                                          │
│                         ║                                          │
│                         ║                                          │
│                         ║                                          │
│                         ║                                          │
│                         ║                                          │
│                         ║                                          │
│                         ║                                          │
└────────────────────────────────────────────────────────────────────┘
                          ↑
                    draggable splitter
```

Kullanıcı ortadaki divider'ı tutarak yatay yönde hareket ettirebilmelidir.

---

# 4. VS Code Benzeri Davranış

VS Code'daki panel resize davranışını örnek al.

Splitter:

* normal durumda ince görünmeli
* hover edildiğinde belirginleşmeli
* drag sırasında accent rengi gösterebilmeli
* mouse cursor değişmeli

Cursor:

```css
cursor: col-resize;
```

olmalıdır.

---

# 5. Splitter Genişliği

Splitter görünür olarak ince olmalı.

Örneğin:

```text
1–2 px visual line
```

Ancak mouse ile yakalanması zor olmamalıdır.

Bu nedenle hit-area:

```text
6–10 px
```

olabilir.

Yani görünür çizgi ince fakat interaction alanı daha geniş olabilir.

---

# 6. Hover State

Normal:

```text
subtle / transparent
```

Hover:

```text
accent color
```

Drag sırasında:

```text
strong accent
```

kullanılabilir.

Mevcut dark UI theme ile uyumlu olsun.

---

# 7. Başlangıç Oranı

İlk açılışta:

```text
Editor: 42%
Preview: 58%
```

kullan.

Ancak kullanıcı daha önce oran değiştirdiyse onun tercihini geri yükle.

---

# 8. Minimum Editor Width

Sol panel aşırı daraltılamamalıdır.

Örneğin:

```text
minEditorWidth = 480–520px
```

arasında uygun bir değer belirle.

Ana hedef:

* form label'ları okunabilsin
* input'lar kullanılabilsin
* section navigation görünür kalsın

---

# 9. Minimum Preview Width

Preview da tamamen kullanılamaz hale gelmemelidir.

Örneğin:

```text
minPreviewWidth = 420–500px
```

gibi uygun minimum belirle.

Gerçek değer mevcut preview scaling sistemine göre seçilmelidir.

---

# 10. Maksimum Editor Width

Sol panel ekranın tamamını kaplamamalıdır.

Örneğin:

```text
maxEditorWidth = viewportWidth - minPreviewWidth
```

mantığı kullan.

Sabit rastgele maximum pixel değeri kullanmak yerine viewport'a göre hesapla.

---

# 11. Maksimum Preview Width

Aynı şekilde preview genişliği de:

```text
viewportWidth - minEditorWidth
```

ile sınırlandırılmalıdır.

---

# 12. Drag Başlangıcı

Kullanıcı splitter üzerinde:

```text
pointerdown
```

yaptığında resize işlemi başlamalıdır.

State:

```text
isResizing = true
```

olabilir.

---

# 13. Drag Hareketi

Drag sırasında:

```text
pointermove
```

ile yeni panel genişliği hesaplanmalıdır.

Örnek mantık:

```text
newEditorWidth =
pointerX - workspaceLeft
```

Sonra:

```text
clamp(
  newEditorWidth,
  minEditorWidth,
  maxEditorWidth
)
```

uygula.

---

# 14. Drag Bitişi

```text
pointerup
```

sonrası:

```text
isResizing = false
```

olmalıdır.

Global event listener'lar temizlenmelidir.

Memory leak bırakma.

---

# 15. Pointer Events Kullan

Sadece mouse event kullanmak yerine mümkünse:

```text
Pointer Events
```

kullan.

Örneğin:

* pointerdown
* pointermove
* pointerup

Bu yöntem:

* mouse
* stylus
* farklı input device

desteği açısından daha sağlamdır.

---

# 16. Text Selection Engelle

Resize sırasında sayfadaki metinlerin yanlışlıkla seçilmesini engelle.

Drag süresince:

```css
user-select: none;
```

uygulanabilir.

Drag bitince eski değer geri gelsin.

---

# 17. Preview Resize Sırasında Davranış

Kullanıcı splitter'ı sürüklerken A4 document layout yeniden hesaplanmamalıdır.

Değişmesi gereken yalnızca:

```text
preview display scale
```

olmalıdır.

Yani:

```text
A4 gerçek geometri
210 × 297 mm
```

korunmalıdır.

---

# 18. Fit Page Otomatik Güncellensin

Preview:

```text
Fit Page
```

modundaysa panel genişliği değiştikçe preview scale otomatik hesaplanmalıdır.

Örneğin:

```text
availablePreviewWidth
↓
calculatePreviewScale()
↓
A4 display scale
```

Ancak ResumeDocument layout değişmemelidir.

---

# 19. Kullanıcı Manuel Zoom Seçmişse

Kullanıcı manuel:

```text
75%
80%
100%
```

zoom seçmişse splitter drag bunu otomatik değiştirmemelidir.

Sadece `Fit Page` modunda auto-scale hesapla.

---

# 20. Oranı Kaydet

Kullanıcının seçtiği panel genişliği kalıcı olmalıdır.

Örneğin:

```text
editorPanelRatio = 0.46
```

veya:

```text
editorPanelWidth = ...
```

saklanabilir.

Tercihen ratio sakla.

---

# 21. Persistence

Tercih şu seviyelerden uygun birinde saklanabilir:

```text
localStorage
application settings
user preferences
```

Mevcut Settings/Persistence sistemini kullan.

Duplicate settings sistemi oluşturma.

---

# 22. Uygulama Tekrar Açılınca

Kullanıcı uygulamayı kapatıp yeniden açtığında en son kullandığı panel oranı geri gelmelidir.

Örneğin:

```text
önceki kullanım:
Editor 48%
Preview 52%

yeni açılış:
Editor 48%
Preview 52%
```

---

# 23. Reset Fonksiyonu

İsteğe bağlı olarak:

```text
Layout zurücksetzen
```

veya splitter üzerinde double click davranışı ekle.

Double click:

```text
42 / 58
```

default oranına dönebilir.

---

# 24. Double Click

VS Code benzeri davranış için splitter üzerinde:

```text
double click
```

ile default layout'a dönme özelliğini değerlendir.

Önerilen:

```text
Editor 42%
Preview 58%
```

---

# 25. Keyboard Accessibility

Splitter keyboard ile de kontrol edilebilir olmalıdır.

Örneğin splitter focus aldığında:

```text
ArrowLeft
ArrowRight
```

ile panel boyutu değiştirilebilsin.

Adım:

```text
10px
```

veya uygun oran kullanılabilir.

Shift ile daha büyük adım desteklenebilir.

---

# 26. ARIA

Splitter için uygun accessibility kullan.

Örneğin:

```text
role="separator"
aria-orientation="vertical"
aria-valuemin
aria-valuemax
aria-valuenow
tabIndex=0
```

ekle.

---

# 27. CSS Grid ile Önerilen Yapı

Ana workspace CSS Grid ise:

```css
grid-template-columns:
  minmax(500px, var(--editor-width))
  8px
  minmax(450px, 1fr);
```

mantığı kullanılabilir.

Buradaki orta sütun splitter alanıdır.

---

# 28. CSS Variable Kullan

Panel genişliğini central CSS variable ile yönet.

Örneğin:

```css
--resume-editor-width: 42%;
```

Drag sırasında bu değer güncellenebilir.

Ancak mevcut framework/state mimarisi daha uygunsa ona göre uygula.

---

# 29. React / TypeScript State

Örnek state:

```text
editorPanelWidth
isResizing
```

veya ratio tabanlı:

```text
editorRatio
isResizing
```

kullanılabilir.

Tercihen oran tabanlı yaklaşım responsive davranışta daha kullanışlıdır.

---

# 30. ResizeObserver

Preview container boyutunu takip etmek için gerekirse:

```text
ResizeObserver
```

kullan.

Özellikle:

```text
Fit Page
```

hesaplamasında faydalı olabilir.

---

# 31. Performans

Drag sırasında her pixel hareketinde pahalı:

* PDF generation
* DOCX generation
* ResumeDocument rebuild
* server request

çalıştırma.

Drag sırasında sadece layout / preview scale güncellensin.

---

# 32. requestAnimationFrame

Resize render işlemi ağırsa:

```text
requestAnimationFrame
```

veya uygun throttle kullan.

Ama resize hissi akıcı olmalıdır.

---

# 33. Transition Kullanma

Splitter aktif olarak drag edilirken panel width üzerinde CSS transition kullanma.

Aksi halde mouse hareketi gecikmeli hissedilir.

Drag dışındayken reset gibi aksiyonlarda kısa transition kullanılabilir.

---

# 34. Sol Panel Scroll Korunsun

Splitter hareket ettirildiğinde sol panelin:

```text
scrollTop
```

değeri resetlenmemelidir.

Kullanıcı hangi bölümde çalışıyorsa orada kalmalıdır.

---

# 35. Preview Scroll Korunsun

Aynı şekilde preview:

```text
Page 2
```

üzerindeyse panel resize sonrası Page 1'e atlamamalıdır.

Scroll position korunmalıdır.

---

# 36. Form State Korunsun

Resize işlemi hiçbir şekilde:

* input state
* active section
* unsaved changes
* section order
* design state

değerlerini değiştirmemelidir.

Bu sadece workspace layout işlemidir.

---

# 37. Normal Edit Mode

Normal Lebenslauf Edit mode:

```text
Editor | Splitter | Preview
```

şeklinde çalışmalıdır.

Default:

```text
42 | splitter | 58
```

---

# 38. Template & Design Mode

`Vorlage & Design` mode üç panel kullanıyorsa farklı splitter sistemi gerekebilir:

```text
Vorlage
|
Preview
|
Design
```

Bu görevde öncelik:

```text
Content Editor ↔ Preview
```

splitter'dır.

Ancak mimari ileride 3 panelli resize desteğine uygun olmalıdır.

---

# 39. Future Support

İleride aşağıdaki yapı mümkün olmalıdır:

```text
Template Sidebar
║
Preview
║
Design Sidebar
```

Yani reusable:

```text
ResizablePane
ResizableSplitView
```

component tasarla.

---

# 40. Reusable Component

Tercihen generic component oluştur:

```text
ResizableSplitView
```

Örnek API:

```text
direction="horizontal"
defaultRatio={0.42}
minPrimary={500}
minSecondary={450}
persistKey="resume-editor-layout"
```

Bu component daha sonra başka ekranlarda da kullanılabilir.

---

# 41. Collapse Desteğine Hazır Ol

Gelecekte:

```text
sol paneli kapat
preview full width
```

veya tam tersi desteklenebilir.

Bu yüzden component'i sadece tek kullanım durumuna göre hardcode etme.

---

# 42. Layout Presets

İleride üç hızlı preset eklenebilir:

```text
Editor Fokus
Ausgeglichen
Preview Fokus
```

Örneğin:

```text
Editor Fokus:
55 / 45

Ausgeglichen:
42 / 58

Preview Fokus:
30 / 70
```

Bu görevde opsiyoneldir ama mimariyi hazır kur.

---

# 43. Görsel Tasarım

Splitter mevcut koyu tema ile uyumlu olmalıdır.

Normal:

```text
çok hafif border
```

Hover:

```text
accent
```

Drag:

```text
daha güçlü accent
```

İkinci VS Code referans görselindeki gibi sade görünmelidir.

---

# 44. Splitter İkonu Kullanma

Sürekli görünen büyük drag icon kullanma.

VS Code gibi sade bir boundary yeterlidir.

İstenirse hover sırasında küçük affordance gösterilebilir.

---

# 45. Ekran Kenarına Yapışma

Panel aşırı küçültülmeye çalışılırsa splitter minimum noktada durmalıdır.

Mouse hareket etmeye devam etse bile panel minimum genişliğin altına inmemelidir.

---

# 46. Window Resize

Application window küçültülürse kayıtlı ratio uygulanırken:

```text
minEditorWidth
minPreviewWidth
```

kuralları yeniden değerlendirilmelidir.

Geçersiz stored size uygulama.

---

# 47. Small Screen Fallback

Viewport şu koşulu karşılamıyorsa:

```text
width < minEditor + minPreview + splitter
```

iki kolonlu resize zorlanmamalıdır.

Responsive fallback:

```text
Editor
↓
Preview
```

veya drawer/tab sistemi kullanılabilir.

Desktop ana kullanım olmaya devam etsin.

---

# 48. Kaydedilecek Ayar

Örnek:

```json
{
  "resumeEditor": {
    "splitRatio": 0.42
  }
}
```

Ancak mevcut user settings yapısına uygun gerçek modeli kullan.

---

# 49. Acceptance Criteria

Görev tamamlanmış sayılmadan önce:

1. Sol ve sağ panel arasında görünür bir splitter var.
2. Splitter mouse ile sağa/sola sürüklenebiliyor.
3. Cursor `col-resize` oluyor.
4. Sol panel genişleyebiliyor.
5. Sağ panel genişleyebiliyor.
6. Minimum width sınırları çalışıyor.
7. Panel tamamen kaybolmuyor.
8. Preview A4 oranını koruyor.
9. Fit Page resize sırasında güncelleniyor.
10. Manuel zoom bozulmuyor.
11. Form state kaybolmuyor.
12. Active section değişmiyor.
13. Scroll pozisyonları gereksiz resetlenmiyor.
14. Kullanıcının seçtiği ratio kaydediliyor.
15. Uygulama yeniden açıldığında ratio geri geliyor.
16. Double click ile default `42 / 58` değerine dönülebiliyor.
17. Keyboard resize çalışıyor.
18. PDF/DOCX çıktısı splitter değişikliğinden etkilenmiyor.
19. Resize akıcı çalışıyor.
20. Future 3-panel layout için reusable mimari hazırlanmış durumda.

---

# 50. Uygulama Sırası

1. Mevcut Lebenslauf editor workspace component'ini bul.
2. Sol ve sağ panel wrapper'larını tespit et.
3. Generic `ResizableSplitView` tasarla.
4. Sol paneli primary pane yap.
5. Sağ preview panelini secondary pane yap.
6. Araya draggable separator ekle.
7. Pointer event'lerini bağla.
8. Min/max width clamp ekle.
9. Default ratio `0.42` yap.
10. Ratio persistence ekle.
11. Double-click reset ekle.
12. Keyboard accessibility ekle.
13. Fit Page resize entegrasyonu ekle.
14. Scroll/state persistence kontrol et.
15. Window resize fallback ekle.
16. Dark theme styling yap.
17. 1920×1080 test et.
18. 1600×900 test et.
19. 1440×900 test et.
20. 1366×768 test et.
21. PDF/DOCX etkilenmediğini doğrula.
22. Testleri ekle.

---

# 51. Sonuç

İstenen final davranış:

```text
Başlangıç:

Editor 42% | Preview 58%

Kullanıcı splitter'ı →
Editor 50% | Preview 50%

Kullanıcı splitter'ı ←
Editor 35% | Preview 65%

Double Click
Editor 42% | Preview 58%
```

Ana hedef:

**VS Code'daki gibi doğal, hızlı ve akıcı bir panel resize deneyimi oluştur.**

Kullanıcı form doldururken sol paneli büyütebilmeli; Lebenslauf tasarımını kontrol ederken sağdaki A4 preview'u büyütebilmelidir.

En önemli prensip:

> Panel oranını uygulama değil kullanıcı da kontrol edebilmeli; resize işlemi sadece çalışma alanını değiştirmeli, Lebenslauf içeriğini veya PDF layout'unu hiçbir şekilde etkilememelidir.

```

```
