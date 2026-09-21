
* **Markdown dosya adı:** `15_lebenslauf_pehlione_white_blue_style_rascef.md`
* **Konu:** **Pehlione** adlı yeni Lebenslauf stil ailesinin oluşturulması ve **Pehlione White Blue** varyantının eklenmesi
* **İstenilen çıktı:** Verilen referans tasarıma benzer mantıkta; sol tarafta güçlü bilgi sütunu, sağda ana içerik alanı, koyu mavi–beyaz kurumsal renk sistemi, teknik/endiştriyel karakter, ikonlu section başlıkları ve profesyonel blueprint/engineering hissi taşıyan yeni bir Lebenslauf template ailesi oluşturulması. Bu yeni stilin ana adı **Pehlione** olmalı; beyaz-mavi varyantı ise **Pehlione White Blue** olarak gruplanmalı.
* **Kullanılacak framework:** RASCEF
* **Senin yazacağın prompt:**

```text
Sen kıdemli bir UI/UX Designer, Document Layout Engineer, Branding Designer ve ElectronJS + TypeScript geliştiricisisin. Ayrıca profesyonel Lebenslauf sistemleri ve Bewerbungsunterlagen tasarımı konusunda uzmansın.

Görevin, mevcut Bewerbung Manager / Lebenslauf Builder sistemine yeni bir stil ailesi eklemektir.

Yeni stil ailesinin ana adı:

**Pehlione**

Bu ailenin ilk varyantı:

**Pehlione White Blue**

olacaktır.

Kullanıcı tarafından verilen referans tasarımın görsel mantığını temel al, ancak birebir kopyalama.
Aynı görsel karakteri özgün biçimde yeniden yorumla.

==================================================
1. ANA AMAÇ
==================================================

Sisteme yeni bir Lebenslauf stil ailesi ekle:

Style Family:
- Pehlione

Style Variant:
- Pehlione White Blue

Bu stil:
- teknik
- profesyonel
- kurumsal
- güçlü
- modern
- net
- düzenli
- mühendislik hissi veren
- Almanya’daki profesyonel Bewerbung standardına uygun

olmalıdır.

Bu tasarım özellikle şu profiller için çok uygun olmalıdır:
- Fachinformatiker
- Software Developer
- Industrial Engineer
- Technical Specialist
- Data / Monitoring / Integration odaklı roller
- teknik-proses temelli işler

Ancak sadece bunlarla sınırlama.

==================================================
2. STİL AİLESİ MANTIĞI
==================================================

Sadece tek bir template ekleme.
Bir stil ailesi mantığı kur:

Family:
Pehlione

Variant örnekleri ileride desteklenebilir:
- Pehlione White Blue
- Pehlione Dark Blue
- Pehlione Clean Light
- Pehlione Technical Minimal

Şu an implement edilmesi gereken varyant:
**Pehlione White Blue**

Bu yüzden yapı:
- family
- variant
- preset
ayrımıyla kurulmalıdır.

==================================================
3. TEMPLATE KİMLİĞİ
==================================================

Önerilen kimlik:

templateId:
`pehlione_white_blue`

styleFamily:
`pehlione`

displayName:
`Pehlione White Blue`

category:
`Technical / Premium`

layoutMode:
`sidebar-left-structured`

designCharacter:
`technical-blueprint-professional`

==================================================
4. GENEL TASARIM KARAKTERİ
==================================================

Tasarım şu hissi vermelidir:

- teknik uzmanlık
- mühendislik disiplini
- yapılandırılmış bilgi sunumu
- güvenilirlik
- mavi-beyaz kurumsal profesyonellik
- güçlü görsel kimlik
- sade ama karakterli bir görünüm

Kaçınılacaklar:
- aşırı renkli görünüm
- rastgele renk kombinasyonu
- fazla yuvarlak eğlenceli görünüm
- aşırı modern startup stili
- süslü arka planlar
- gereksiz gradient
- CV okunabilirliğini bozan dekorasyon

==================================================
5. RENK SİSTEMİ
==================================================

Bu stil ailesi için merkezi renk sistemi oluştur.

Ana grup:
**Pehlione White Blue**

Temel renk mantığı:
- beyaz ana zemin
- koyu kurumsal mavi başlıklar
- orta mavi accent
- açık gri yardımcı çizgiler
- siyaha yakın body text

Örnek renk ailesi:
- Primary Blue: derin kurumsal mavi
- Secondary Blue: orta mavi
- Accent Blue: canlı ama profesyonel mavi
- White: temiz beyaz
- Light Gray: section ayrımları için
- Dark Text: gövde metni için

Color token isimleri örneğin:
- pehlionePrimaryBlue
- pehlioneSecondaryBlue
- pehlioneAccentBlue
- pehlioneWhite
- pehlioneLineGray
- pehlioneTextDark

Bu yapıyı global style registry ile tanımla.

==================================================
6. VARYANT ADLANDIRMA
==================================================

Kullanıcı arayüzünde grup ve varyant şu mantıkla görünmelidir:

Family:
Pehlione

Variant:
Pehlione White Blue

Template listesinde kullanıcı bunu açıkça seçebilmelidir.

İleride aynı aile altında başka varyantlar da eklenebileceği için veri modelini genişletilebilir kur.

==================================================
7. SAYFA FORMATI
==================================================

Format:
DIN A4
210 × 297 mm
Portrait

Preview:
- gerçek A4 oranı
- print-first
- live preview
- multi-page desteğe hazır

==================================================
8. LAYOUT YAPISI
==================================================

Pehlione White Blue için temel yapı:

LEFT SIDEBAR
+
RIGHT MAIN CONTENT

Önerilen oran:
- sol sütun: %28–32
- sağ sütun: %68–72

Sol sütun:
- üstte görsel/graphic alan
- Kontakt
- Kernkompetenzen
- Technische Schwerpunkte
- opsiyonel Skills / Links

Sağ sütun:
- Name + Berufsbezeichnung
- Kurzprofil
- Berufserfahrung
- Ausbildung
- Projekt-Highlight
- Weiterbildungen
- opsiyonel Projekte / Zertifikate

==================================================
9. SOL ÜST GÖRSEL ALAN
==================================================

Referans tasarımda olduğu gibi sol üstte güçlü bir görsel blok bulunabilir.

Ancak bunu doğrudan kopyalama.

Aynı teknik hissi veren özgün bir alan tasarla.

Örneğin:
- blueprint / engineering çizim hissi
- teknik şema
- dişli / sistem / devre / grid estetiği
- koyu mavi arka plan üzerinde teknik çizgi motifleri

Kurallar:
- bu alan dekoratif destek unsurudur
- içerik okunabilirliğini gölgelememeli
- ATS ve export açısından temel bilgi alanı olmamalı
- isteğe bağlı kapatılabilir olmalı

Bu alanı:
`heroGraphicBlock`
veya benzeri config ile yönet.

==================================================
10. SAĞ ÜST BAŞLIK ALANI
==================================================

Sağ üstte güçlü bir başlık yapısı oluştur.

İçerik:
- tam ad
- ana mesleki başlık / kombinasyon başlığı
- ince ayırıcı çizgi

Örnek yapı:
Mustafa Özdemir
Industrieingenieur / Fachinformatiker für Anwendungsentwicklung

Başlık:
- çok güçlü görünmeli
- koyu mavi kullanılmalı
- sayfa karakterini tanımlamalı

==================================================
11. SECTION BAŞLIKLARI
==================================================

Sağ taraftaki ana bölümler için ikonlu başlık sistemi kur.

Örnek bölümler:
- Kurzprofil
- Berufserfahrung
- Ausbildung
- Projekt-Highlight
- Weiterbildungen

Başlık sistemi:
- solda ikon kutusu
- yanında büyük section title
- altında ince mavi ayırıcı çizgi

İkon kutusu:
- koyu mavi dolu veya güçlü outline
- beyaz ikon
- tutarlı boyut

==================================================
12. SOL SIDEBAR SECTIONLARI
==================================================

Sol tarafta aşağıdaki bölümler desteklensin:

1. Kontakt
2. Kernkompetenzen
3. Technische Schwerpunkte
4. Optional: Sprachen
5. Optional: Zertifikate Kurzliste
6. Optional: Links

Varsayılan yapı:
- Kontakt
- Kernkompetenzen
- Technische Schwerpunkte

==================================================
13. KONTAKT BLOĞU
==================================================

Kontakt section’ında ikonlu satır yapısı kullan.

Desteklenecek alanlar:
- Ort / Land
- Telefon
- E-Mail
- LinkedIn
- GitHub
- Website

İkonlar:
- minimal
- tutarlı
- mavi kurumsal stil
- fazla kalabalık olmayacak şekilde

==================================================
14. KERNKOMPETENZEN
==================================================

Bu bölüm kısa madde listesi olarak gösterilsin.

Örnek içerik türü:
- Prozessanalyse und Prozessoptimierung
- Datenanalyse und Monitoring
- Technische Dokumentation
- API-Integration und Datenverarbeitung
- Strukturierte Problemlösung

Bu bölüm:
- sol sütunda
- kısa
- yüksek okunabilir
- 5–8 madde civarında

olmalıdır.

==================================================
15. TECHNISCHE SCHWERPUNKTE
==================================================

Bu bölüm de sol sütunda yer almalı.

Her satır:
- küçük ikon
- başlık / kısa açıklama

Örnek kategori türleri:
- Monitoring & Visualisierung
- API-Integration & Datenverarbeitung
- Softwareentwicklung
- Datenanalyse & Prozessverständnis
- Qualität, Sicherheit & verantwortungsbewusstes Arbeiten

Bu yapı reusable component ile kurulmalıdır.

==================================================
16. KURZPROFIL
==================================================

Sağ sütunda ilk ana içerik bölümü.

Kısa, profesyonel özet metin içerir.

Kurallar:
- 1 paragraf veya 2 kısa paragraf
- okunabilir
- aşırı uzun değil
- güçlü ama sade
- teknik/iş odaklı

==================================================
17. BERUFSERFAHRUNG
==================================================

Ana bölüm yapısı:

LEFT META:
tarih aralığı

RIGHT CONTENT:
pozisyon
kurum
bullet pointler

Örnek:
11/2024 – 06/2025
Praktikum Softwareentwicklung
Universitätsstadt Marburg, Fachdienst Technische Dienste

- ...
- ...
- ...

Eski deneyimler için aynı yapı tekrar kullanılmalı.

==================================================
18. AUSBILDUNG
==================================================

Aynı section mantığı:
- tarih
- derece / unvan
- kurum
- opsiyonel ek bilgi

Örnek:
Fachinformatiker für Anwendungsentwicklung (IHK)
Studium Industrieingenieurwesen

==================================================
19. PROJEKT-HIGHLIGHT
==================================================

Bu template’in önemli farklaştırıcı bölümlerinden biri olmalı.

Amaç:
Kullanıcının en güçlü teknik projesini ayrı section olarak öne çıkarmak.

Örnek içerik:
- proje adı
- kısa açıklama
- kullanılan teknoloji / katkı
- sonuç / değer

Bu bölüm özellikle yazılım ve teknik profiller için önemli olmalı.

==================================================
20. WEITERBILDUNGEN
==================================================

Kısa liste veya madde yapısı kullanılabilir.

Örnek:
- Software- und IT-Weiterbildungen über Coursera / IBM / Microsoft

İleride çok sayfalı görünümde daha geniş de olabilir.

==================================================
21. TYPOGRAPHY
==================================================

Bu template için güçlü ama profesyonel bir tipografi sistemi kur.

Öneri:
- Heading: güçlü sans-serif
- Body: okunaklı sans-serif
- maksimum 2 font family

Örnek adaylar:
- Open Sans
- Source Sans Pro
- Inter
- Jost
- Exo 2
- IBM Plex Sans

Ana hedef:
teknik ve profesyonel karakter.

==================================================
22. FONT HİYERARŞİSİ
==================================================

Önerilen:
- Name: 24–32 pt
- Subtitle / Berufsbezeichnung: 12–16 pt
- Section title: 13–17 pt
- Body: 10–11 pt
- Meta / Date: 9–10 pt

Okunabilirlik her zaman korunmalıdır.

==================================================
23. ÇİZGİLER VE AYIRICILAR
==================================================

Bu stilin karakterinde mavi çizgiler önemlidir.

Kullan:
- başlık altında yatay çizgi
- sol sütun section ayırıcıları
- gerektiğinde dotted / subtle section separator

Ancak aşırı çizgi kalabalığı yapma.

==================================================
24. ICON SİSTEMİ
==================================================

İkonlar bu template’in ana kimlik öğelerindendir.

İkon kullanımı:
- Kontakt
- Kurzprofil
- Berufserfahrung
- Ausbildung
- Projekt-Highlight
- Weiterbildungen
- Technische Schwerpunkte

İkon seti:
- tek stil
- aynı stroke / weight
- kurumsal ve temiz

==================================================
25. TEMPLATE AİLESİ ENTEGRASYONU
==================================================

Bu yeni stil, mevcut template sistemi içine düzgün entegre edilmeli.

Kullanıcı:
Vorlage wählen
alanında:

Pehlione
veya
Pehlione White Blue

adıyla bu tasarımı görebilmeli.

Thumbnail oluşturulmalı.
Selected state mevcut sistemle uyumlu olmalı.

==================================================
26. DESIGN ANPASSEN ENTEGRASYONU
==================================================

Bu template seçildiğinde kullanıcı sağ panelden tasarımı ayarlayabilmelidir.

Özellikle şu ayarlar desteklensin:
- Pehlione Blue tone variations
- beyaz/mavi kontrast seviyesi
- section çizgi rengi
- icon style
- heading font
- body font
- font sizes
- line-height
- sidebar width
- hero graphic görünürlüğü

==================================================
27. STİL AİLESİ PRESETLERİ
==================================================

En az şu preset mantığını kur:

Family:
Pehlione

Preset / Variant:
- White Blue (ilk uygulanacak)

İleride başka varyant eklemek kolay olmalı.

==================================================
28. INTERACTION MANTIĞI
==================================================

Bu template mevcut editor davranışını desteklemeli:

- template seçimi
- ortada live preview
- section’a tıklayınca ilgili editor açılması
- sol panelde section düzenleme
- altta floating toolbar
- Vorlage & Design ile geri dönme

==================================================
29. SECTION EDIT DESTEKLERİ
==================================================

Aşağıdaki bölümlere tıklanınca ilgili editör açılmalı:
- Kontakt
- Kernkompetenzen
- Technische Schwerpunkte
- Kurzprofil
- Berufserfahrung
- Ausbildung
- Projekt-Highlight
- Weiterbildungen

==================================================
30. ATS UYUMLULUĞU
==================================================

Tasarım güçlü görsel kimliğe sahip olsa da ATS açısından mümkün olduğunca temiz kalmalıdır.

Kurallar:
- gerçek text kullan
- section başlıkları text olarak üret
- ikonlar dekoratif destek olsun
- asıl bilgi görsel bağımlı olmasın
- export semantic reading order korusun

==================================================
31. DOCX / LIBREOFFICE / PDF
==================================================

Bu tasarım şu çıktıları desteklemeli:
- DOCX
- PDF

DOCX, LibreOffice Writer ile açılabilmeli.
PDF, yüksek kaliteli ve selectable text içermeli.

==================================================
32. COMPONENT MİMARİSİ
==================================================

Örnek yapı:

PehlioneResumeRenderer
├── PehlioneSidebar
│   ├── HeroGraphicBlock
│   ├── ContactSection
│   ├── CoreCompetenciesSection
│   └── TechnicalFocusSection
│
└── PehlioneMainContent
    ├── HeaderBlock
    ├── ShortProfileSection
    ├── ExperienceSection
    ├── EducationSection
    ├── ProjectHighlightSection
    └── FurtherEducationSection

Reusable component kullan.
Mevcut section renderer’ları uygunsa yeniden değerlendir.

==================================================
33. DATA MODEL
==================================================

Yeni duplicate document modeli oluşturma.

Mevcut:
- ResumeDocument
- ResumeTemplate
- ResumeSection
- ResumeDesignTokens
- ResumeTemplateRegistry

ile uyumlu çalış.

Ek olarak:
PehlioneTemplateConfig
ve
PehlioneStyleVariantConfig

tanımlanabilir.

==================================================
34. TEMPLATE CAPABILITIES
==================================================

Pehlione White Blue için örnek capability’ler:

supportsPhoto: false veya optional
supportsHeroGraphic: true
supportsSidebar: true
supportsIcons: true
supportsProjectHighlight: true
supportsTechnicalFocus: true
supportsCoreCompetencies: true
supportsTwoColumns: true
supportsTimeline: optional
supportsColumnMove: limited

Not:
Bu tasarım fotoğrafsız da güçlü çalışmalıdır.
Eğer foto kullanılacaksa yalnızca kontrollü opsiyon olarak ekle.

==================================================
35. SECTION SIRASI
==================================================

Varsayılan sıra:

SIDEBAR:
1. Kontakt
2. Kernkompetenzen
3. Technische Schwerpunkte

MAIN:
1. Kurzprofil
2. Berufserfahrung
3. Ausbildung
4. Projekt-Highlight
5. Weiterbildungen

Kullanıcı belirli sınırlar içinde sıralama yapabilsin.

==================================================
36. MARKA KİMLİĞİ
==================================================

Bu stil yalnızca bir template değil, aynı zamanda küçük bir marka dili taşımalıdır.

Ana ad:
Pehlione

Bu yüzden:
- thumbnail
- başlık görünümü
- renk sistemi
- preset ismi
- template listesi
- design preset isimleri

hep aynı aile mantığında olmalıdır.

==================================================
37. THUMBNAIL
==================================================

Template seçme paneli için bu tasarımın kendine özgü thumbnail’i oluşturulmalıdır.

Thumbnail:
- mavi-beyaz karakteri göstermeli
- sol sidebar + sağ içerik yapısını belli etmeli
- diğer template’lerden ayrışmalı

==================================================
38. TESTLER
==================================================

Mutlaka test et:
- Pehlione White Blue template seçilebiliyor
- preview doğru render ediliyor
- renkler doğru uygulanıyor
- sidebar + main content doğru dağılıyor
- Kontakt düzenleniyor
- Kurzprofil düzenleniyor
- Berufserfahrung düzenleniyor
- Ausbildung düzenleniyor
- Projekt-Highlight düzenleniyor
- Technische Schwerpunkte düzenleniyor
- Design anpassen çalışıyor
- DOCX export çalışıyor
- PDF export çalışıyor
- LibreOffice açıyor
- ATS text order korunuyor
- uzun başlıklar taşmıyor

==================================================
39. UYGULAMA SIRASI
==================================================

Bu görevi şu sırayla uygula:

1. mevcut ResumeTemplateRegistry analiz et
2. yeni style family olarak `pehlione` tanımla
3. `pehlione_white_blue` varyantını ekle
4. renk token sistemini oluştur
5. layout config oluştur
6. sol sidebar yapısını oluştur
7. hero graphic block ekle
8. sağ header alanını oluştur
9. section başlık ikon sistemini kur
10. Kontakt bölümünü bağla
11. Kernkompetenzen bölümünü bağla
12. Technische Schwerpunkte bölümünü bağla
13. Kurzprofil bölümünü bağla
14. Berufserfahrung bölümünü bağla
15. Ausbildung bölümünü bağla
16. Projekt-Highlight bölümünü bağla
17. Weiterbildungen bölümünü bağla
18. Design anpassen entegrasyonunu yap
19. thumbnail oluştur
20. export/testleri ekle

==================================================
40. SONUÇ
==================================================

Ortaya çıkan yeni stil:

**Pehlione White Blue**

şu özellikleri taşımalıdır:
- mavi-beyaz kurumsal kimlik
- teknik/mühendislik hissi
- güçlü başlık alanı
- sol bilgi sütunu
- sağ ana içerik alanı
- ikonlu section başlıkları
- profesyonel ve premium görünüm
- modern ama ciddi
- ATS açısından mümkün olduğunca temiz
- DOCX/LibreOffice/PDF uyumlu
- Pehlione stil ailesinin ilk varyantı olarak genişletilebilir

En önemli prensip:

**Pehlione = teknik profesyonellik + kurumsal mavi kimlik + yapılandırılmış içerik + güçlü görsel hiyerarşi.**

Bu görevi öyle uygula ki ileride aynı aile altında başka Pehlione varyantları da kolayca eklenebilsin.
```
