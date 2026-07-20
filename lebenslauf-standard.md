# Modern Lebenslauf Standardı

Bu dosya, modern ama profesyonel görünen Lebenslauf tasarımlarının içerik ve görsel kararlarını sabitler. Amaç, eski görünen şablonlardan uzak durmak ve ATS uyumunu bozmadan daha güncel bir sonuç üretmektir.

Bu standart tek bir sabit tasarım üretmek için değil, kullanıcının ihtiyacına göre seçebileceği çoklu şablon ailesi üretmek için kullanılmalıdır.

## 1. Tasarım İlkesi

Modern görünüm burada "daha fazla renk" veya "daha fazla dekor" anlamına gelmez. Modern görünüm şu dört nitelikle tanımlanır:

- Güçlü hiyerarşi
- Kontrollü boşluk kullanımı
- Az ama bilinçli vurgu
- İçeriğin tasarımdan daha önde olması

## 2. Görsel Yön

Hedef estetik:

- Minimal
- Profesyonel
- Net
- Hafif editoryal
- Teknoloji profiline uygun

Kaçınılacak estetik:

- Kalın renk bloklarıyla sayfayı ikiye bölen yapılar
- Büyük diyagonal şekiller
- Eski görünümlü yan sütun panelleri
- Yetenek seviyesi için nokta, halka veya progress bar dizileri
- Aşırı doygun turkuaz veya koyu mavi alanlar
- CV'nin üst kısmını afiş gibi gösteren büyük dekor yüzeyler

## 3. Sayfa Kompozisyonu

Varsayılan düzen tek ana akışlı olmalıdır.

Kural:

- Ana içerik tek kolon üzerinde okunmalıdır.
- İkincil bilgiler gerekiyorsa ayrı bir dar sütun yerine aynı akış içinde kompakt bloklar halinde çözülmelidir.
- İlk sayfada en üst bölüm, isim ve rol bilgisini temiz biçimde öne çıkarmalıdır.
- Bölümler arasında net ritim olmalı; aşırı çizgi ve kutu kullanılmamalıdır.

Tercih edilen üst yapı:

```text
Kopfbereich
Kurzprofil
Berufserfahrung
Ausbildung
Kompetenzen
Zertifikate
Sprachen
Opsiyonel ek bölümler
```

## 3.1 Şablon Ailesi Mantığı

Kullanıcı uygulama içinde tek bir Lebenslauf görünümüne zorlanmamalıdır. Aynı içerik sistemi üzerinde çalışan, fakat farklı görsel tonlara sahip birden fazla şablon sunulmalıdır.

Temel ilke:

- İçerik modeli ortak kalır.
- A4 ölçü sistemi ortak kalır.
- Bölüm sırası ve ATS güvenliği ortak kalır.
- Değişen şey görsel yorum, spacing yoğunluğu, vurgu seviyesi ve bilgi sunum biçimidir.

Her şablon, ayrı bir rastgele tasarım değil, ortak tasarım sisteminin bir varyantı olmalıdır.

## 3.2 İç Şablon Aileleri

Sistem tarafında başlangıçta en az aşağıdaki tasarım aileleri desteklenmelidir:

```text
minimal
classic-modern
editorial
compact
technical
soft-professional
```

Kısa tanımlar:

- `minimal`: en sade, yüksek okunabilirlik, az vurgu, ATS açısından en güvenli yön
- `classic-modern`: Alman kurumsal beklentiye yakın, temiz ve dengeli modernleşmiş görünüm
- `editorial`: daha güçlü tipografi ve beyaz alan kullanan rafine görünüm
- `compact`: aynı bilgi yoğunluğunu daha sıkı ritimle veren varyant
- `technical`: teknik yetkinlikleri ve proje bloklarını daha net öne çıkaran yapı
- `soft-professional`: daha sıcak ama hala profesyonel, daha yumuşak accent kullanan görünüm

## 3.3 Kullanıcıya Gösterilecek Kategori Sistemi

Kullanıcıya doğrudan iç teknik aile adları gösterilmek zorunda değildir. Arayüzde daha anlaşılır ve pazarlanabilir kategori etiketleri kullanılmalıdır.

Başlangıç kategori seti:

```text
Alle Vorlagen
Modern
Tabellarisch
Klassisch
Kreativ
```

Bu kategoriler filtre mantığında çalışmalıdır:

- `Alle Vorlagen`: tüm aktif şablonları gösterir
- `Modern`: `minimal`, `classic-modern`, `editorial`, `technical`, `soft-professional` ailelerinden uygun olanları içerir
- `Tabellarisch`: daha klasik Alman CV mantığına yakın, net akışlı ve ATS güvenli varyantları içerir
- `Klassisch`: düşük dekor, yüksek ciddiyet, kurumsal tonda varyantları içerir
- `Kreativ`: kontrollü accent, daha belirgin tipografi veya hafif kompozisyon farkı olan ama yine de profesyonel kalan varyantları içerir

Kural:

- Bir şablon birden fazla kategoriye ait olabilir.
- Kategori, layout motorunu değil kullanıcı filtreleme ve keşif deneyimini tanımlar.
- İç aile ile kullanıcı kategorisi birbirine karıştırılmamalıdır.

Örnek eşleme mantığı:

```text
minimal -> Modern, Tabellarisch, Klassisch
classic-modern -> Modern, Tabellarisch, Klassisch
editorial -> Modern, Kreativ
compact -> Modern, Tabellarisch
technical -> Modern, Tabellarisch
soft-professional -> Modern, Klassisch, Kreativ
```

## 3.4 Kullanıcı Seçim Modeli

Uygulama tarafında kullanıcı şunları seçebilmelidir:

- Kategori filtresi
- Şablon ailesi
- Accent rengi
- Font çifti
- Margin preset'i
- Fotoğraflı veya fotosuz kullanım
- Kompakt veya rahat spacing yoğunluğu

Ancak kullanıcı seçimi bu sınırları ihlal etmemelidir:

- A4 oranı bozulamaz.
- Yasaklı kalıplar aktif hale gelemez.
- Bilgi sırası anlamsız biçimde değiştirilemez.
- ATS riskini artıran yoğun dekor katmanı açılamaz.

## 3.5 Tasarım Token Yaklaşımı

Şablon çeşitliliği kopya bileşenlerle değil, ortak token sistemiyle üretilmelidir.

Her şablon en az şu kararları override edebilmelidir:

```text
heading font
body font
accent color
section spacing
header spacing
separator style
title weight
meta text color
surface decoration density
```

Bu yaklaşım sayesinde kullanıcı farklı şablonlar arasında geçiş yaptığında içerik yeniden yazılmaz; yalnızca görsel yorum değişir.

## 4. Başlık Sistemi

Üst alan şu sırayla çalışmalıdır:

1. Belge etiketi: `Lebenslauf` küçük ve ikincil
2. Aday adı: en baskın öğe
3. Hedef rol satırı: net ve kısa
4. İletişim satırı: tek satırlık, sakin, ikincil bilgi

Kurallar:

- İsim büyük ama bağıran bir afiş gibi olmamalıdır.
- Rol satırı 1 cümleyi geçmemelidir.
- Telefon, e-posta, şehir, LinkedIn tek satırda veya kontrollü iki satırda akmalıdır.
- İkon zorunlu değildir; metin öncelikli olmalıdır.

## 5. Renk Sistemi

Modern standart için renk kullanımı sınırlı tutulur.

Kurallar:

- En fazla 1 ana vurgu rengi kullan.
- Gövde metni koyu nötr tonda kalmalıdır.
- Çizgiler ve ikincil metinler düşük kontrastlı ama okunur gri tonlarında olmalıdır.
- Geniş dolgu alanları yerine ince çizgi, başlık vurgusu veya küçük accent yüzeyleri tercih edilmelidir.

Önerilen yön:

```text
Ana metin: koyu antrasit
İkincil metin: orta gri
Accent: soğuk mavi veya sakin petrol tonu
Arka plan: beyaz
```

## 6. Tipografi Kararı

Varsayılan modern kombinasyon:

- Başlıklar: Rubik
- Gövde: Inter

Kurallar:

- İsim satırı güçlü ama rafine görünmelidir.
- Bölüm başlıkları tüm sayfada tek biçimde kullanılmalıdır.
- Gövde metni sıkışık görünmemeli, 11 pt civarında kalmalıdır.
- Tamamı büyük harf kullanılan başlıklar sınırlı kullanılmalıdır.

## 7. İçerik Hiyerarşisi

### 7.1 Zusammenfassung

- 3 ila 5 satırlık kısa profil
- Genel motivasyon yerine somut teknik yön ve çalışma tarzı öne çıkarılmalı
- Her başvuruya göre uyarlanabilir olmalı

### 7.2 Berufserfahrung

- En kritik bölüm budur; sayfanın görsel ağırlığı burada olmalıdır.
- Her pozisyonda şu sıra korunmalıdır:

```text
Rol
Şirket
Tarih ve konum
2 ila 4 güçlü madde
```

- Madde sayısı kısa tutulmalı, ama etkisi güçlü olmalıdır.
- Görev listesi yerine çıktı, etki ve kullanılan teknoloji birlikte verilmelidir.

### 7.3 Ausbildung

- Öz ve temiz tutulmalı
- Yakın tarihli ve ilgili eğitim öne gelmeli

### 7.4 Kompetenzen

- Uzun paragraf yerine yapılandırılmış kısa satırlar kullanılmalı
- Kategorik sunum tercih edilmeli

Örnek yön:

```text
Backend
Frontend
Datenbanken
Tools und DevOps
```

### 7.5 Sprachen

- Metin tabanlı seviye yazılmalı
- Görsel puanlama yerine açık sözel tanım kullanılmalı

Doğru örnek:

```text
Deutsch - fließend
Englisch - fließend
Türkisch - Muttersprache
```

### 7.6 Zertifikate

- Liste kısa tutulmalı
- En güçlü ve güncel sertifikalar öne çıkmalı

## 8. Yasaklı Kalıplar

Bu standartta aşağıdaki kalıplar kullanılmaz:

- Tam yükseklik renkli sol sidebar
- Skill seviyesini gösteren yuvarlak nokta satırları
- Büyük diyagonal banner arka planları
- Gereksiz kalın ayırıcı çizgiler
- Her bilgi alanında ayrı kutu görünümü
- Bir sayfada üçten fazla farklı yazı ağırlığı kombinasyonu

## 9. Kabul Edilen Modern Kalıplar

- Üstte sakin bir marka çizgisi veya küçük geometrik vurgu
- Tek kolon ana akış
- Dengeli beyaz alan
- Başlıklarda temiz harf aralığı
- Bölümler arasında ince separator kullanımı
- Teknik yetkinlikleri kısa kategori satırlarıyla verme

## 9.1 Şablonlar Arası Çeşitlilik Kuralı

Şablonlar yalnızca renk değiştirerek çoğaltılmış gibi görünmemelidir. Her varyantın ayırt edici ama sistem içinde kontrollü bir kimliği olmalıdır.

Örnek farklılaşma eksenleri:

- Başlık bloğunun yüksekliği
- Bölüm başlıklarının hizası
- Separator kullanımı
- Meta bilginin tek satır veya iki satır akması
- Özet bölümünün daha sakin veya daha baskın ele alınması
- Sertifikalar ve diller bölümünün inline veya blok çözülmesi

Ancak şu farklar yapay çeşitlilik sayılır ve yeterli değildir:

- Sadece ana rengi değiştirmek
- Sadece fontu değiştirmek
- Aynı layout'u küçük padding farklarıyla yeniden sunmak

## 10. Junior Yazılım Geliştirici Profili İçin Yorum

Bu workspace içindeki profil için tasarım şu mesajı vermelidir:

- Öğrenmeye açık
- Teknik olarak ciddi
- Karmaşık görünmeye çalışmayan
- Modern araçlara yakın
- Düzenli ve güvenilir

Bu nedenle en uygun yön, dekoratif iki sütunlu CV yerine sade tek kolonlu modern Alman CV standardıdır.

Bu karar, kullanıcının başka varyantlar seçemeyeceği anlamına gelmez. Sadece başlangıç ailesinde en güçlü varsayılan yönün bu olması gerektiğini söyler.

## 11. Çıktı Kriteri

Bir Lebenslauf tasarımı ancak şu şartları sağlıyorsa kabul edilir:

- İlk bakışta modern ama kurumsal görünür.
- En önemli bilgi 5 saniyede taranabilir.
- PDF çıktısı temiz kalır.
- ATS açısından bilgi kaybı riski yaratmaz.
- İçerik, dekoratif öğelerden daha baskındır.
- Aynı sistemden Anschreiben tasarımı da türetilebilir.
- Kullanıcı diğer şablonlara geçtiğinde içerik bozulmadan tutarlı biçimde yeniden render edilebilir.
