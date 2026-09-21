
* **Markdown dosya adı:** `22_lebenslauf_editor_layout_sol_panel_genis_preview_dar_rtf.md`
* **Konu:** Lebenslauf edit ekranında sol giriş panelini genişletme ve sağ A4 preview alanını daha kompakt hale getirme
* **İstenilen çıktı:** Soldaki düzenleme alanının tam görünmesi, sağdaki çıktı alanındaki gereksiz boşlukların azaltılması ve desktop kullanımına uygun dengeli iki sütunlu layout
* **Kullanılacak framework:** RTF
* **Senin yazacağın prompt:**

````markdown
# 1. Rol

Sen kıdemli bir **ElectronJS + TypeScript geliştiricisi**, **UI/UX Designer** ve desktop form-editor arayüzleri konusunda uzman bir **Frontend Architect**'sin.

Görevin, mevcut Bewerbung Manager uygulamasındaki **Lebenslauf edit ekranının iki sütunlu layout'unu** iyileştirmektir.

---

# 2. Mevcut Ekran Yapısı

Ekran şu iki ana çalışma alanından oluşmaktadır:

1. **Sol taraf**
   - Kullanıcı veri girişi
   - Lebenslauf bölümlerini düzenleme
   - Section ayarları
   - Form alanları
   - Navigation

2. **Sağ taraf**
   - Lebenslauf A4 Live Preview
   - PDF'e yakın çıktı görünümü

---

# 3. Mevcut Problem

Şu anda layout dengeli değildir.

Problemler:

1. Sağdaki preview alanı gereğinden fazla geniştir.
2. A4 sayfasının sağında ve solunda büyük miktarda kullanılmayan boşluk vardır.
3. Soldaki form/edit alanı çok dar kalmaktadır.
4. Uzun input alanları tam görünmemektedir.
5. Başlıklar bazı durumlarda kesilmektedir.
6. Kullanıcının asıl çalışma yaptığı sol panel yeterli alan almamaktadır.
7. Preview alanı gereğinden fazla ekran alanı tüketmektedir.

Ana amaç:

> **Sol taraf aktif çalışma alanı, sağ taraf destekleyici preview alanı olmalıdır.**

---

# 4. Sol Giriş Panelini Genişlet

Sol paneli belirgin şekilde genişlet.

Kullanıcı aşağıdaki alanları rahat şekilde görebilmelidir:

- Lebenslaufprofil
- Persönliche Daten
- Berufserfahrung
- Bildungsweg
- Kenntnisse & Zusatzangaben
- Section ayarları
- Input alanları
- Select / Dropdown alanları
- Açıklamalar
- Navigation butonları

Form alanlarında gereksiz yatay kırılmalar olmamalıdır.

---

# 5. Önerilen Ana Layout Oranı

Desktop ekranlarda başlangıç oranı:

- **Sol Editor Panel:** %42
- **Sağ Preview Panel:** %58

Yaklaşık:

```text
┌──────────────────────────────────┬────────────────────────────────────────┐
│                                  │                                        │
│        EDITOR / INPUT            │            A4 PREVIEW                  │
│             %42                  │               %58                      │
│                                  │                                        │
└──────────────────────────────────┴────────────────────────────────────────┘
````

Gerekirse güvenli aralık kullan:

* Sol: %40–45
* Sağ: %55–60

Default olarak:

```text
42 / 58
```

kullan.

---

# 6. Sol Panel Minimum Genişliği

Sol edit alanının minimum genişliğini koru.

Örneğin:

```text
min-width: 520px
```

veya mevcut uygulamanın viewport yapısına göre uygun değer belirle.

Ama kullanıcı form alanlarını okuyamayacak kadar daralmamalıdır.

---

# 7. Sağ Preview Alanını Daralt

Sağ taraftaki preview container'ın gereksiz genişliğini azalt.

A4 belge:

* ortalanmış kalmalı
* gerçek A4 oranını korumalı
* rahat okunmalı
* container'ın tüm genişliğini işgal etmemeli

Preview container'ın amacı yalnızca belgeyi göstermek olmalıdır.

---

# 8. Preview Çevresindeki Boşlukları Azalt

Şu alanları kontrol et:

* preview container padding
* page outer margin
* wrapper gap
* horizontal padding
* centering logic

A4 sayfasının etrafında sadece görsel ayrım sağlayacak kadar boşluk bırak.

Örneğin:

```text
20–32 px
```

gibi kontrollü bir workspace padding yeterli olabilir.

Ancak gerçek ölçüyü mevcut UI sistemine göre belirle.

---

# 9. A4 Boyutunu Bozma

Preview paneli daraltılırken A4 document geometry değiştirilmemelidir.

Belge:

```text
210 × 297 mm
```

oranını korumalıdır.

Preview gerekirse scale edilmelidir.

Örneğin:

```text
transform: scale(...)
```

veya mevcut preview zoom sistemi kullanılabilir.

Ancak document layout küçülmemelidir.

---

# 10. Preview Auto-Fit

Preview alanı için otomatik:

```text
Fit Page
```

mantığı kullan.

Sağ panel genişliğine göre A4 sayfası uygun zoom seviyesinde gösterilsin.

Örneğin:

* büyük ekran → %90
* orta ekran → %80
* daha dar ekran → %70

Ancak bunlar display zoom değerleridir.

PDF çıktısına etkisi olmamalıdır.

---

# 11. CSS Grid Tercihi

Ana workspace için tercihen **CSS Grid** kullan.

Örneğin:

```css
grid-template-columns:
  minmax(520px, 42%)
  minmax(0, 58%);
```

Ancak mevcut projede Flexbox kullanılıyorsa sırf bunun için mimariyi gereksiz yere değiştirme.

Ama layout temiz ve sürdürülebilir olmalıdır.

---

# 12. Flexbox Kullanılıyorsa

Alternatif olarak:

```css
.editor-panel {
  flex: 0 0 42%;
}

.preview-panel {
  flex: 1 1 58%;
}
```

mantığı kullanılabilir.

Min-width kurallarını unutma.

---

# 13. Sol Panel Scroll

Sol taraf uzun içerik içerdiği için bağımsız vertical scroll desteklemelidir.

Örneğin:

```text
height: available viewport
overflow-y: auto
```

Ancak horizontal scroll oluşmamalıdır.

---

# 14. Sağ Panel Scroll

Preview çok sayfalı olduğunda sağ panel kendi vertical scroll'una sahip olabilir.

Örneğin:

```text
Page 1
Page 2
Page 3
```

alt alta gösterilebilir.

Sol panel scroll hareketi sağ preview'ı gereksiz yere hareket ettirmemelidir.

---

# 15. Panel Yüksekliği

Viewport yüksekliği kullanılmalıdır.

Header varsa:

```text
availableHeight =
100vh - headerHeight
```

mantığı kullan.

Her iki ana panel de kalan kullanılabilir ekran yüksekliğini kullanmalıdır.

---

# 16. Input Alanlarını Tam Genişlik Kullan

Sol panelde form inputları:

```text
width: 100%
```

kullanmalıdır.

Özellikle:

* Jobtitel
* Arbeitgeber
* E-Mail
* URL
* Adresse
* Beschreibung

alanları tam görünmelidir.

---

# 17. Form Gridlerini İyileştir

Uygun alanlarda iki kolonlu form grid kullanılabilir.

Örneğin:

```text
Vorname          Nachname
E-Mail           Telefon
Startdatum       Enddatum
```

Ancak uzun alanlarda:

```text
Adresse
Website
Beschreibung
```

tam genişlik kullanılmalıdır.

---

# 18. Uzun Başlıkların Kesilmesini Önle

Örneğin:

```text
Mustafa Özdemir · Softwareentwickler / Fachinformatiker für Anwendungsentwicklung
```

gibi uzun alanlar kesilmemelidir.

Gerekirse:

```text
white-space: normal
overflow-wrap: anywhere
```

veya uygun responsive typography kullan.

Ama kullanıcı içeriği tam görebilmelidir.

---

# 19. Preview Container Max Width

Sağ panelin tamamının dev bir boş container haline gelmesini önle.

Preview workspace içinde A4 page için kontrollü:

```text
max-width
```

kullanılabilir.

Örneğin:

```text
preview content wrapper
≈ A4 scaled width + küçük workspace padding
```

olmalıdır.

---

# 20. Preview Ortalaması

A4 page sağ panel içinde yatay olarak ortalanmalıdır.

Ancak:

```text
justify-content: center
```

kullanırken container'ın gereksiz boşluk üretmesine izin verme.

---

# 21. Desktop Öncelikli Tasarım

Ana hedef:

**Desktop Application**

olmalıdır.

Özellikle:

* 1920×1080
* 1600×900
* 1440×900
* 1366×768

gibi yaygın çözünürlükleri test et.

---

# 22. Büyük Ekran Davranışı

Çok geniş ekranlarda sol panel gereksiz yere devasa olmamalıdır.

Örneğin:

```text
max-width: 750–850 px
```

gibi kontrollü üst limit değerlendirilebilir.

Kalan alan preview workspace'e verilebilir.

---

# 23. Orta Ekran Davranışı

Orta genişliklerde örneğin:

```text
1440 px
```

sol panel minimum rahat kullanım genişliğini korumalıdır.

Preview otomatik küçülmelidir.

---

# 24. Dar Ekran Davranışı

Ekran çok daraldığında:

1. önce preview zoom küçülsün
2. sonra paneller kontrollü daralsın
3. en son gerekirse stacked / drawer mode kullanılsın

Form alanlarını okunamaz hale getirerek çözme.

---

# 25. Resizable Splitter İçin Hazırlık

İleride kullanıcının panel genişliğini manuel değiştirebilmesi için mimariyi hazırla.

Örneğin:

```text
Editor
   |
   | draggable divider
   |
Preview
```

Ancak bu görevde splitter zorunlu değildir.

İlk aşamada doğru default oranı oluştur.

---

# 26. Tercih Edilen Gelecek Özellik

İleride:

```text
[◀] [divider] [▶]
```

veya draggable divider ile kullanıcı:

* editorü genişletebilir
* preview'u genişletebilir

Bu nedenle layout kodunu sabit ve kırılgan kurma.

---

# 27. Sol Panel Önceliği

Bu ekranın temel UX prensibi:

> Kullanıcı burada veri giriyor ve CV düzenliyor.

Bu nedenle giriş paneli ikinci planda bırakılamaz.

Öncelik:

```text
Editability > Decorative Preview Space
```

olmalıdır.

---

# 28. Preview Ana İçerik Değildir

Preview önemlidir ancak kullanıcı etkileşiminin çoğu sol tarafta gerçekleşir.

Bu nedenle preview etrafındaki boşluk için ekran alanı harcanmamalıdır.

---

# 29. Sticky Header / Navigation

Sol panel içinde:

```text
Deckblatt
Anschreiben
E-Mail
Lebenslauf
```

navigation varsa üstte sticky kalabilir.

Aynı şekilde bölüm navigation veya save state de sticky olabilir.

---

# 30. Panel Padding

Sol panel iç padding'i kullanıcı dostu olmalıdır.

Örneğin:

```text
16–24 px
```

aralığı değerlendirilebilir.

Form alanına ayrılan gerçek kullanılabilir genişliği gereksiz padding ile azaltma.

---

# 31. Preview Panel Padding

Sağ panel padding'i sol form alanından daha kompakt olabilir.

Örneğin:

```text
12–24 px
```

Amaç:
A4 preview için mümkün olan alanı kullanmak.

---

# 32. Dark Background Workspace

Mevcut koyu workspace korunabilir.

Ancak preview sayfasının etrafındaki koyu alan sadece belge ayrımı için kullanılmalıdır.

Boş koyu alan ekranın büyük kısmını kaplamamalıdır.

---

# 33. A4 Page Shadow

A4 preview'da hafif:

```text
box-shadow
```

kullanılabilir.

Ama yüksek blur / büyük shadow boşluk hissini büyütmemelidir.

---

# 34. Scrollbar

Scrollbars modern ve ince olmalıdır.

Özellikle sol panel scrollbar:

* input alanına binmemeli
* geniş alan tüketmemeli
* kolay kullanılabilir olmalı

---

# 35. Form Label Davranışı

Form label'ları:

* kesilmemeli
* input üzerine binmemeli
* gerektiğinde wrap edebilmeli

Sol panel genişletildiğinde bu problem büyük ölçüde çözülmelidir.

---

# 36. Preview Zoom Kaydedilebilir

Kullanıcı örneğin:

```text
80%
```

zoom seçtiyse session boyunca korunabilir.

Ancak panel boyutu değişince `Fit Page` mode tekrar hesaplanabilir.

---

# 37. Edit Mode / Design Mode Aynı Layout Sistemini Kullansın

Şu ekranlarda panel genişliği tutarlı olmalıdır:

* Lebenslauf bearbeiten
* Vorlage wählen
* Design anpassen
* Kenntnisse & Zusatzangaben
* Section bearbeiten

Her ekran için tamamen farklı width sistemi oluşturma.

---

# 38. Template Design Mode

`Vorlage & Design` ekranında gerekirse üç kolon olabilir:

```text
Vorlage wählen
A4 Preview
Design anpassen
```

Ama normal content editing ekranında:

```text
Editor
A4 Preview
```

iki kolonlu geniş editor layout kullanılmalıdır.

Bu iki modu birbirine karıştırma.

---

# 39. Normal Edit Mode Oranı

Normal Lebenslauf editing:

```text
Editor      Preview
42%         58%
```

öner.

---

# 40. Design Mode Oranı

Template / Design mode açıldığında:

```text
Template Sidebar | Preview | Design Sidebar
```

ayrı workspace oranı kullanılabilir.

Normal edit modunun geniş sol form panelini burada aynen kullanmak zorunda değilsin.

---

# 41. Animasyon

Panel genişliği değişiyorsa hafif transition kullanılabilir.

Örneğin:

```text
150–250 ms
```

Ancak resize sırasında lag yaratacak ağır animasyon kullanma.

---

# 42. Performance

A4 preview resize sırasında sürekli pahalı document regeneration yapmamalıdır.

Container resize:

→ sadece preview scale hesaplasın.

Document content render gereksiz yere tekrar üretilmemelidir.

---

# 43. Accessibility

Keyboard kullanıcıları:

* sol form alanlarına ulaşabilmeli
* scroll yapabilmeli
* preview toolbar'a erişebilmeli

Panel width değişiklikleri focus state'i bozmamalıdır.

---

# 44. Beklenen Görsel Sonuç

Yeni görünüm yaklaşık şu şekilde olmalıdır:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ Bewerbungs-Navigation                                                   │
├─────────────────────────────────┬───────────────────────────────────────┤
│                                 │                                       │
│  LEBENSLAUF EDITOR              │           A4 PREVIEW                  │
│                                 │                                       │
│  Lebenslaufprofil               │              ┌───────────┐            │
│                                 │              │           │            │
│  Section bearbeiten             │              │    CV     │            │
│                                 │              │           │            │
│  Eingabefelder                  │              │           │            │
│                                 │              └───────────┘            │
│                                 │                                       │
│        ca. 42 %                 │               ca. 58 %                │
│                                 │                                       │
└─────────────────────────────────┴───────────────────────────────────────┘
```

---

# 45. Acceptance Criteria

Görev tamamlanmış sayılmadan önce aşağıdakiler çalışmalıdır:

1. Sol panel mevcut duruma göre belirgin şekilde genişlemiş olmalı.
2. Form alanları tam görünmeli.
3. Uzun Lebenslaufprofil başlıkları gereksiz yere kesilmemeli.
4. Sağ preview alanı daha kompakt olmalı.
5. A4 preview gerçek oranını korumalı.
6. Preview etrafındaki gereksiz yatay boşluk azaltılmalı.
7. A4 belge ortalanmış kalmalı.
8. Sol ve sağ panel bağımsız scroll destekleyebilmeli.
9. 1920×1080 ekran düzgün görünmeli.
10. 1440×900 ekran düzgün görünmeli.
11. 1366×768 ekran kullanılabilir olmalı.
12. PDF/DOCX çıktısının layout'u bu UI değişikliğinden etkilenmemeli.
13. Preview zoom yalnızca görsel ölçekleme yapmalı.
14. Normal content edit ekranı template/design ekranından ayrı layout kullanabilmeli.
15. Gelecekte resizable splitter eklemeye uygun mimari kurulmalı.

---

# 46. Uygulama Sırası

1. Mevcut editor/preview parent layout component'ini bul.
2. Mevcut width/flex/grid değerlerini analiz et.
3. Sol panelin minimum kullanılabilir genişliğini belirle.
4. Desktop default oranını `42 / 58` yap.
5. Sol panel form width'lerini düzelt.
6. Sağ preview wrapper padding'lerini azalt.
7. A4 auto-fit hesaplamasını güncelle.
8. Bağımsız scroll davranışını kontrol et.
9. 1920×1080 test et.
10. 1600×900 test et.
11. 1440×900 test et.
12. 1366×768 test et.
13. Template/Design mode'un bozulmadığını kontrol et.
14. PDF/DOCX export'un etkilenmediğini doğrula.
15. Responsive fallback ekle.
16. Testleri güncelle.

---

# 47. Sonuç

Ana hedef:

**Sol taraftaki edit alanı kullanıcı için ana çalışma alanıdır ve tam görünmelidir.**

Sağ taraftaki A4 preview:

* daha az ekran alanı kullanmalı
* gereksiz kenar boşluğu üretmemeli
* A4 oranını korumalı
* düzgün ortalanmalı
* gerektiğinde otomatik küçülmelidir.

Default desktop düzen:

**Editor %42 / Preview %58**

olarak başlasın.

En önemli prensip:

> Kullanılmayan preview boşluklarını azalt, kazanılan alanı form düzenleme paneline ver ve kullanıcının tüm giriş alanlarını rahatça görmesini sağla.

```

```
