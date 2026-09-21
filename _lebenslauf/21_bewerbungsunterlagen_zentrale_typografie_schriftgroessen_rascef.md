
* **Markdown dosya adı:** `21_bewerbungsunterlagen_zentrale_typografie_schriftgroessen_rascef.md`
* **Konu:** Lebenslauf, Anschreiben ve Deckblatt için merkezi yönetilen standart yazı büyüklüğü sistemi
* **İstenilen çıktı:** Tüm Bewerbungsunterlagen'da mümkün olduğunca aynı yazı büyüklüğünü kullanan; varsayılan gövde metnini **11 pt**, sığmazsa kontrollü şekilde **10,5 pt**, son seçenek olarak **10 pt** kullanan; Anschreiben, Deckblatt ve Lebenslauf arasında merkezi senkronizasyon sağlayan; gerektiğinde belge bazında ayrı ayar yapılmasına izin veren profesyonel typography sistemi
* **Kullanılacak framework:** RASCEF
* **Senin yazacağın prompt:**

```text
Sen kıdemli bir Document Layout Engineer, TypeScript geliştiricisi, UI/UX Designer ve profesyonel Bewerbungsunterlagen tasarımı konusunda uzman bir Software Architect'sin.

Görevin, mevcut Bewerbung Manager uygulamasındaki:

- Lebenslauf
- Anschreiben
- Deckblatt

için merkezi ve tutarlı bir yazı büyüklüğü / Typography sistemi oluşturmaktır.

Ana prensip:

**Bütün Bewerbungsunterlagen mümkün olduğunca aynı temel Schriftgröße kullanmalıdır.**

Öncelik sırası:

11 pt
↓
10,5 pt
↓
10 pt

10 pt altına otomatik olarak düşülmemelidir.

==================================================
1. MERKEZİ TYPOGRAPHY SİSTEMİ
==================================================

Merkezi bir:

ApplicationTypographyProfile

oluştur veya mevcut Design Profile içine entegre et.

Bu profil:

Lebenslauf
Anschreiben
Deckblatt

tarafından ortak kullanılmalıdır.

Örnek:

ApplicationTypographyProfile {
    bodyFontFamily
    headingFontFamily
    bodyFontSize
    secondaryFontSize
    smallTextSize
    headingScale
    lineHeight
    paragraphSpacing
    synchronizedDocuments
}

==================================================
2. DEFAULT BODY SIZE
==================================================

Varsayılan gövde metni:

**11 pt**

olmalıdır.

Bu değer:

- Lebenslauf body
- Anschreiben Fließtext
- Deckblatt açıklama / contact text

için ortak default olarak kullanılmalıdır.

==================================================
3. FONT SIZE FALLBACK SIRASI
==================================================

Belge mevcut layout'a sığmıyorsa kontrollü fallback sistemi kullan.

Sıra:

1. 11 pt
2. 10,5 pt
3. 10 pt

Bu sıra dışına otomatik çıkma.

Özellikle:

9,5 pt
9 pt
8 pt

gibi değerleri otomatik sığdırma amacıyla kullanma.

==================================================
4. FONT KÜÇÜLTME SON ÇARE OLSUN
==================================================

Sayfa taşmasında doğrudan font küçültme.

Önce şu sırayı uygula:

1. gereksiz boşlukları kontrol et
2. section spacing optimize et
3. paragraph spacing optimize et
4. padding optimize et
5. izin verilen ölçüde line-height optimize et
6. page break'i optimize et
7. section placement'i değerlendir
8. ancak daha sonra 11 → 10,5 pt
9. hala gerekirse 10,5 → 10 pt

10 pt altında otomatik küçültme yok.

==================================================
5. DOCUMENT SYNC
==================================================

Default durumda:

Lebenslauf = 11 pt
Anschreiben = 11 pt
Deckblatt = 11 pt

olmalıdır.

Kullanıcı merkezi Typography ayarını değiştirirse üç belge de birlikte güncellenmelidir.

Örneğin:

Body:
10,5 pt

seçilirse:

Lebenslauf
Anschreiben
Deckblatt

aynı değeri kullanmalıdır.

==================================================
6. MERKEZİ AYAR
==================================================

Design panelinde merkezi kontrol oluştur:

**Schriftgröße Bewerbungsmappe**

Seçenekler:

○ 11 pt – Standard
○ 10,5 pt – Kompakt
○ 10 pt – Sehr kompakt

Default:

● 11 pt – Standard

==================================================
7. TÜM BELGELERE UYGULA
==================================================

Kontrol:

[✓] Auf alle Bewerbungsunterlagen anwenden

Aktifse:

- Lebenslauf
- Anschreiben
- Deckblatt

aynı temel font büyüklüğünü kullanır.

==================================================
8. BELGE BAZLI AYRI AYAR
==================================================

Kullanıcı isterse merkezi senkronizasyonu kapatabilmelidir.

Toggle:

[ ] Individuelle Schriftgrößen je Dokument

Aktif edildiğinde ayrı kontroller göster:

Lebenslauf:
[11 pt ▼]

Anschreiben:
[11 pt ▼]

Deckblatt:
[11 pt ▼]

Her belge için yine yalnızca temel güvenli seçenekler:

11 pt
10,5 pt
10 pt

sun.

==================================================
9. ÖNCELİK HİYERARŞİSİ
==================================================

Typography resolution sırası:

ApplicationTypographyProfile
↓
DocumentTypographyOverride
↓
Template-specific Constraints
↓
Final Validation

Yani:

merkezi profil defaulttur.

Belge bazlı override varsa o kullanılır.

Ancak template minimum okunabilirlik sınırlarını ihlal edemez.

==================================================
10. TEMPLATE DEFAULTLARI
==================================================

Her Lebenslauf template kendi default font scale'ına sahip olabilir.

Ancak body size için merkezi standardı mümkün olduğunca koru.

Örneğin:

Pehlione White Blue
body = 11 pt

Modern
body = 11 pt

Klassisch
body = 11 pt

Zeitlos
body = 11 pt

Stilvoll
body = 11 pt

Übersichtlich
body = 11 pt

Template yalnızca gerçekten gerekli olduğunda:

10,5 pt

önerebilir.

==================================================
11. ANSCHREIBEN
==================================================

Anschreiben body default:

11 pt

olmalıdır.

Tek sayfaya sığmazsa:

11
→ 10,5
→ 10

fallback kullan.

Ancak önce spacing optimizasyonunu dene.

10 pt altında otomatik düşme.

==================================================
12. LEBENSLAUF
==================================================

Lebenslauf body default:

11 pt

olmalıdır.

CV iki sayfaya çıkıyorsa bunu hata olarak görme.

Fontu 9 pt seviyesine sıkıştırmak yerine:

2 sayfa

kabul edilmelidir.

Öncelik:

okunabilirlik.

==================================================
13. DECKBLATT
==================================================

Deckblatt üzerindeki normal metinler:

11 pt

temel almalıdır.

Örneğin:

- Kontakt
- Position
- Zusatzinformationen

Ancak Deckblatt'taki Name / Haupttitel gibi büyük görsel başlıklar body size'dan bağımsız heading scale kullanabilir.

==================================================
14. HEADING SIZE BODY'DEN AYRI OLSUN
==================================================

Body:

11 / 10,5 / 10 pt

standardına bağlıdır.

Başlıklar ise scale sistemi kullanabilir.

Örneğin:

body = 11 pt

Section Heading:
13–15 pt

Document Heading:
16–20 pt

Name:
20–28 pt

Ancak bunlar yine merkezi Typography Profile'dan türetilmelidir.

==================================================
15. TYPOGRAPHY SCALE
==================================================

Sabit rastgele font-size değerleri kullanma.

Merkezi scale oluştur:

TypographyScale {
    body
    secondary
    small
    sectionTitle
    documentTitle
    name
}

Örneğin body 11 pt ise diğer değerler buna göre hesaplanabilir veya preset üzerinden alınabilir.

==================================================
16. BODY SIZE PRESETLERİ
==================================================

Preset:

STANDARD
body = 11 pt

COMPACT
body = 10.5 pt

VERY_COMPACT
body = 10 pt

Bu isimleri UI'de Almanca göster:

Standard
Kompakt
Sehr kompakt

==================================================
17. OTOMATİK MOD
==================================================

Opsiyonel bir:

„Automatisch optimieren“

modu oluştur.

Aktifse uygulama önce 11 pt kullanır.

Sığmıyorsa layout optimizasyonu yapar.

Hala taşarsa:

10,5 pt

Hala taşarsa:

10 pt

Hala taşarsa:

fontu küçültmek yerine kullanıcıya warning verir.

Örneğin:

„Der Inhalt benötigt zusätzlichen Platz. Bitte kürzen Sie Inhalte oder verwenden Sie eine weitere Seite.“

==================================================
18. KULLANICI ONAYI
==================================================

Automatic mode 11 pt'ten daha küçük bir değere düşürürse kullanıcıya bilgi göster.

Örneğin:

„Für dieses Dokument wurde die Schriftgröße automatisch von 11 pt auf 10,5 pt angepasst.“

Kullanıcı isterse tekrar 11 pt seçebilsin.

==================================================
19. PREVIEW GÖSTERGESİ
==================================================

Design panelinde mevcut değer açıkça gösterilsin.

Örneğin:

Schriftgröße

11 pt
Standard

veya:

10,5 pt
Automatisch angepasst

==================================================
20. GLOBAL / DOCUMENT MODE
==================================================

UI'de iki mode olsun:

**Gemeinsam**

Lebenslauf
Anschreiben
Deckblatt

aynı typography kullanır.

ve:

**Individuell**

her belge ayrı ayarlanır.

Default:

Gemeinsam

==================================================
21. GLOBAL MODE UI
==================================================

Örnek:

TYPOGRAFIE

Modus:
● Gemeinsam
○ Individuell

Schriftgröße:
● 11 pt
○ 10,5 pt
○ 10 pt

Zeilenabstand:
[5 / 10]

Schriftart Überschriften:
[Open Sans ▼]

Schriftart Lesetexte:
[Open Sans ▼]

==================================================
22. INDIVIDUAL MODE UI
==================================================

Örnek:

TYPOGRAFIE

Modus:
○ Gemeinsam
● Individuell

Lebenslauf
[11 pt ▼]

Anschreiben
[11 pt ▼]

Deckblatt
[11 pt ▼]

==================================================
23. FONT FAMILY DE AYNI MANTIĞI KULLANSIN
==================================================

Sadece Schriftgröße değil:

- Überschriftenfont
- Bodyfont

da default olarak üç belgede aynı olmalıdır.

Örneğin:

Heading:
Open Sans

Body:
Open Sans

veya:

Heading:
EB Garamond

Body:
Source Sans Pro

==================================================
24. LINE HEIGHT SENKRONİZASYONU
==================================================

Zeilenabstand merkezi olarak yönetilebilsin.

Ancak Anschreiben ve Lebenslauf farklı layout ihtiyaçlarına sahip olabilir.

Bu nedenle:

global default
+
document override

mantığı kullan.

==================================================
25. GLOBAL DESIGN PROFILE
==================================================

Mevcut:

ApplicationDesignProfile

içine:

typography

alanı ekle.

Örneğin:

ApplicationDesignProfile {
    colors
    typography
    spacing
    margins
    backgrounds
    lines
}

==================================================
26. TYPOGRAPHY MODELİ
==================================================

Örnek:

TypographyProfile {
    mode: "shared" | "individual"

    shared: {
        bodyFontSize: 11
        headingFontFamily: ...
        bodyFontFamily: ...
    }

    documentOverrides: {
        resume?: ...
        coverLetter?: ...
        coverSheet?: ...
    }
}

==================================================
27. VALIDATION
==================================================

Typography Validator oluştur.

Kontrol:

body > 11 pt
→ mümkündür ama layout açısından warning gerekebilir.

body = 11 pt
→ ideal / standard

body = 10.5 pt
→ allowed

body = 10 pt
→ minimum recommended system value

body < 10 pt
→ ERROR veya strong warning

==================================================
28. 10 PT ALTINA İZİN VERME
==================================================

Professional Mode aktifken:

minimumBodyFontSize = 10 pt

olarak hard constraint uygula.

Kullanıcı UI'den 9 pt seçememelidir.

Advanced mode bile olsa warning/limit değerlendir.

==================================================
29. PDF / DOCX AYNI DEĞERİ KULLANSIN
==================================================

Preview:

11 pt

gösterip PDF:

10 pt

üretmemelidir.

Tek source of truth:

ResolvedTypographyProfile

olmalıdır.

Aynı değer:

- HTML preview
- DOCX
- LibreOffice
- PDF

tarafından kullanılmalıdır.

==================================================
30. UNIT SİSTEMİ
==================================================

Typography için internal unit:

pt

olmalıdır.

Örneğin:

11
10.5
10

değerlerini sakla.

CSS preview gerekiyorsa doğru pt → CSS dönüşümü yap.

==================================================
31. TEMPLATE DEĞİŞİMİ
==================================================

Kullanıcı template değiştirirse typography tercihini kaybetmemelidir.

Örneğin:

Pehlione
11 pt
↓
Modern
↓
Klassisch

11 pt tercihi korunmalıdır.

Yalnızca yeni template 11 pt ile teknik olarak taşarsa fallback engine devreye girebilir.

==================================================
32. RESET
==================================================

Design panelinde:

„Typografie auf Standard zurücksetzen“

butonu olsun.

Bu:

body size = 11 pt
shared mode = true

durumuna döndürsün.

==================================================
33. PRINT QUALITY
==================================================

10–11 pt arasındaki text PDF'de:

- net
- selectable
- searchable
- anti-aliased
- font embedded/fallback güvenli

olmalıdır.

==================================================
34. ACCESSIBILITY / READABILITY
==================================================

Font size yalnızca sayfaya daha fazla içerik sıkıştırmak için kullanılmamalıdır.

Ana hedef:

okunabilir Bewerbungsunterlagen

olmalıdır.

Bu nedenle:

11 pt = preferred
10.5 pt = controlled compact
10 pt = minimum

mantığını tüm sistemde koru.

==================================================
35. ACCEPTANCE CRITERIA
==================================================

Görev tamamlanmış sayılmadan önce:

A)
Lebenslauf default 11 pt kullanıyor.

B)
Anschreiben default 11 pt kullanıyor.

C)
Deckblatt normal text default 11 pt kullanıyor.

D)
Üç belge merkezi olarak aynı anda değiştirilebiliyor.

E)
Kullanıcı isterse document-specific mode açabiliyor.

F)
Seçenekler 11 / 10,5 / 10 pt.

G)
Automatic fallback 11 → 10,5 → 10 sırasıyla çalışıyor.

H)
10 pt altına otomatik düşmüyor.

I)
Typography template değişiminde korunuyor.

J)
Preview/DOCX/PDF aynı resolved font size kullanıyor.

K)
Typography reset çalışıyor.

L)
Heading sizes body size'dan merkezi scale üzerinden türetiliyor.

M)
Global ve individual mode açıkça ayrılıyor.

==================================================
36. UYGULAMA SIRASI
==================================================

1. mevcut typography modelini analiz et
2. ApplicationTypographyProfile oluştur/güncelle
3. shared/individual mode ekle
4. default 11 pt tanımla
5. 10,5 ve 10 pt fallback ekle
6. minimum 10 pt validation ekle
7. Lebenslauf renderer'a bağla
8. Anschreiben renderer'a bağla
9. Deckblatt renderer'a bağla
10. Design panel UI ekle
11. automatic optimization ekle
12. template switching persistence ekle
13. DOCX/PDF typography resolution ekle
14. validation ekle
15. testleri oluştur

==================================================
37. SONUÇ
==================================================

Typography sistemi şu prensiple çalışmalıdır:

**Önce bütün Bewerbungsunterlagen için ortak 11 pt kullan.**

Sığmıyorsa:

**10,5 pt**

Gerekirse:

**10 pt**

Ancak bundan daha aşağı otomatik düşme.

Default olarak:

Lebenslauf
Anschreiben
Deckblatt

aynı typography profile kullanmalıdır.

Sadece gerçekten ihtiyaç olduğunda kullanıcı:

„Individuell“

moduna geçerek her belgeyi ayrı ayarlayabilmelidir.

Ana prensip:

**Schriftgröße merkezi olarak yönetilmeli, belge bütünlüğü korunmalı ve okunabilirlik hiçbir zaman sayfaya daha fazla içerik sığdırmak uğruna feda edilmemelidir.**
```
