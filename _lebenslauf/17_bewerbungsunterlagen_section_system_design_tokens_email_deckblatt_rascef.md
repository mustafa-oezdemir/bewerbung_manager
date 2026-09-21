
* **Markdown dosya adı:** `17_bewerbungsunterlagen_section_system_design_tokens_email_deckblatt_rascef.md`
* **Konu:** Deckblatt, Lebenslauf, Anschreiben ve Bewerbungs-E-Mail için ortak section sistemi, görünürlük kuralları ve merkezi tasarım ayarları
* **İstenilen çıktı:** Lebenslauf’un 9 temel bölümünü zorunlu/tavsiye/opsiyonel kurallarla modelleyen; Pehlione White Blue dahil tüm CV şablonlarında özel bilgi bölümlerinin kullanıcı tarafından gösterilip gizlenebildiği ve yeniden adlandırılabildiği; Deckblatt meslek başlığı ve iletişim bilgilerinin düzenlenebildiği; E-Mail metninin profesyonel şekilde düzeltildiği; CV, Deckblatt ve Anschreiben arasında aynı renk, font ve spacing sisteminin kullanıldığı modern bir belge düzenleme altyapısı
* **Kullanılacak framework:** RASCEF
* **Senin yazacağın prompt:**

```text
Sen kıdemli bir ElectronJS + TypeScript geliştiricisi, Document Layout Engineer, UI/UX Designer ve Almanya'daki profesyonel Bewerbungsunterlagen konusunda uzman bir Software Architect'sin.

Görevin, mevcut Bewerbung Manager uygulamasındaki:

- Deckblatt
- Lebenslauf
- Anschreiben
- Bewerbungs-E-Mail

modüllerini aşağıdaki kurallara göre güncellemektir.

Bu görev özellikle belge bölümlerinin görünürlüğü, yeniden adlandırılması, düzenlenmesi ve Deckblatt/Lebenslauf/Anschreiben arasındaki ortak Design System'in kurulmasına odaklanır.

==================================================
1. ANA PRENSİP
==================================================

Bewerbungsunterlagen birbirinden bağımsız tasarımlar gibi davranmamalıdır.

Şu belgeler:

Deckblatt
Anschreiben
Lebenslauf

aynı Bewerbung'a aitse ortak bir:

ApplicationDesignProfile

kullanmalıdır.

Ortak kullanılacak değerler:

- Schriftfamilie Überschriften
- Schriftfamilie Lesetext
- Primärfarbe
- Sekundärfarbe
- Textfarbe
- Hintergrundfarbe
- Akzentfarbe
- Linienfarbe
- Schriftgrößen
- Zeilenabstand
- Abschnittsabstand
- Margin
- Padding
- Icon Style
- Header Style

olmalıdır.

Lebenslauf temel tasarım kaynağı olabilir; ancak kullanıcı yaptığı ortak değişiklikleri Deckblatt ve Anschreiben'a da uygulayabilmelidir.

==================================================
2. LEBENSLAUF İÇİN 9 ANA BÖLÜM
==================================================

Her Lebenslauf aşağıdaki 9 semantic ana bölümü desteklemelidir:

1. Überschrift
2. Persönliche Daten
3. Bewerbungsfoto
4. Kurzprofil im Lebenslauf
5. Beruflicher Werdegang
6. Bildungsweg
7. Besondere Kenntnisse
8. Interessen und Hobbys
9. Ort, Datum und Unterschrift

Bu 9 bölüm bütün Lebenslauf template'leri için ortak semantic temel oluşturmalıdır.

Ancak her template bunları görsel olarak farklı şekilde render edebilir.

==================================================
3. BÖLÜM ZORUNLULUKLARI
==================================================

Aşağıdaki statüleri kullan:

REQUIRED
RECOMMENDED
OPTIONAL

Kurallar:

1. Überschrift
→ REQUIRED

2. Persönliche Daten
→ REQUIRED

3. Bewerbungsfoto
→ OPTIONAL

4. Kurzprofil im Lebenslauf
→ RECOMMENDED

5. Beruflicher Werdegang
→ REQUIRED

6. Bildungsweg
→ REQUIRED

7. Besondere Kenntnisse
→ RECOMMENDED

8. Interessen und Hobbys
→ OPTIONAL

9. Ort, Datum und Unterschrift
→ RECOMMENDED

==================================================
4. REQUIRED DAVRANIŞI
==================================================

REQUIRED bölümler normal kullanıcı tarafından tamamen kaldırılamamalıdır.

Bunlar:

- Überschrift
- Persönliche Daten
- Beruflicher Werdegang
- Bildungsweg

için geçerlidir.

UI'de:

„Pflicht“

etiketi gösterilebilir.

Hide/Delete action devre dışı olmalıdır.

Ancak içeriğin bazı alt alanları optional olabilir.

==================================================
5. RECOMMENDED DAVRANIŞI
==================================================

RECOMMENDED bölümleri kullanıcı:

- gösterebilir
- gizleyebilir

Örneğin:

Kurzprofil
Besondere Kenntnisse
Ort, Datum und Unterschrift

Default olarak açık olabilir.

Ancak kullanıcı kapatabilmelidir.

UI etiketi:

„Empfohlen“

==================================================
6. OPTIONAL DAVRANIŞI
==================================================

OPTIONAL bölümler:

Bewerbungsfoto
Interessen und Hobbys

kullanıcı tarafından özgürce:

- aktive edilebilir
- gizlenebilir
- kaldırılabilir

UI etiketi:

„Optional“

==================================================
7. BÖLÜM VERİ MODELİ
==================================================

Merkezi type oluştur:

ResumeSectionDefinition

Örnek alanlar:

id
semanticType
defaultTitle
customTitle
requirement
visible
enabled
order
allowedTemplates
allowedColumns
children
styleOverrides
locked
renamable
hideable
deletable

Örneğin:

requirement:
"required" | "recommended" | "optional"

==================================================
8. ÜBERSCHRIFT
==================================================

Überschrift required olmalıdır.

Default:

Lebenslauf

Ancak template tasarımına göre visible title olarak:

Lebenslauf

gösterilmesi zorunlu değildir.

Örneğin modern template yalnızca:

Mustafa Özdemir

gösterebilir.

Semantic bölüm sistemde yine mevcut olmalıdır.

Kullanıcı gerektiğinde başlığı değiştirebilsin:

Lebenslauf
Curriculum Vitae
CV

Ancak template’in görsel mantığına uygun render et.

==================================================
9. PERSÖNLICHE DATEN
==================================================

Persönliche Daten required bölümdür.

Ancak içindeki alanların tamamı required değildir.

Desteklenecek alanlar:

- Vorname
- Nachname
- Adresse
- Telefon
- E-Mail
- LinkedIn
- GitHub
- Website
- Geburtsdatum
- Geburtsort
- Staatsangehörigkeit
- Führerschein
- Xing
- weitere Links

Kullanıcı her bir alan için:

[✓] Anzeigen
[ ] Ausblenden

seçebilmelidir.

Örneğin:

Adresse        [✓]
Telefon        [✓]
E-Mail         [✓]
LinkedIn       [✓]
GitHub         [ ]
Website        [✓]
Geburtsdatum   [ ]

Bu görünürlük template'ten bağımsız ResumeDocument state'inde tutulmalıdır.

==================================================
10. CONTACT FIELD AYARLARI
==================================================

Örneğin profile içinde şu veriler bulunabilir:

Adresse:
Am Richtsberg 20, 35039 Marburg

Telefon:
+49 176 93153406

E-Mail:
mustafa.ozdemir1408@gmail.com

LinkedIn:
https://www.linkedin.com/in/mustafa-oezdemir/

GitHub:
https://github.com/mustafa-oezdemir

Website:
https://pehlione.com/

Ancak bunları template içine hardcode etme.

Veriler aktif kullanıcı profilinden gelmelidir.

Her contact field:

value
visible
label
order

taşımalıdır.

==================================================
11. BEWERBUNGSFOTO
==================================================

Bewerbungsfoto optional olmalıdır.

Kullanıcı:

- anzeigen
- ausblenden
- Foto hochladen
- Foto ersetzen
- Foto löschen

işlemlerini yapabilmelidir.

Template foto desteklemiyorsa UI bunu belirtmelidir.

==================================================
12. KURZPROFIL
==================================================

Kurzprofil recommended olmalıdır.

Kullanıcı:

- gösterebilir
- gizleyebilir
- düzenleyebilir
- bölüm adını değiştirebilir

Default title:

Kurzprofil

Alternatif kullanıcı title'ları:

Profil
Über mich
Kurzprofil
Berufliches Profil

gibi olabilir.

==================================================
13. BERUFLICHER WERDEGANG
==================================================

Required.

Bu semantic section altında:

- Berufserfahrung
- Praktikum
- Werkstudent
- frühere Berufserfahrung
- relevante Tätigkeit

gibi entry'ler bulunabilir.

Template isterse görünen başlığı:

Berufserfahrung

olarak kullanabilir.

Kullanıcı visible title'ı değiştirebilir ancak section semantic type değişmemelidir.

==================================================
14. BILDUNGSWEG
==================================================

Required.

Alt entry türleri:

- Ausbildung
- Studium
- Schule
- Umschulung
- berufliche Ausbildung

olabilir.

Template visible heading:

Ausbildung
Bildungsweg
Ausbildung & Studium

gibi değiştirilebilir.

==================================================
15. BESONDERE KENNTNISSE
==================================================

Bu bölüm özel ve dinamik bir container olmalıdır.

Requirement:

RECOMMENDED

Bu container altında template'e veya kullanıcıya göre farklı alt bölümler bulunabilir.

Örnekler:

- Kernkompetenzen
- Technische Schwerpunkte
- Stärken
- Kenntnisse
- Technische Kenntnisse
- Zertifikate
- Sprachen
- Softwarekenntnisse
- IT-Kenntnisse
- Tools
- Methoden
- Soft Skills

Kullanıcı bu bölümleri kendi isteğine göre:

- gösterebilmeli
- gizleyebilmeli
- sıralayabilmeli
- yeniden adlandırabilmeli
- yeni alt bölüm ekleyebilmeli

==================================================
16. PEHLIONE WHITE BLUE ÖZEL KURALI
==================================================

Pehlione White Blue template için:

Besondere Kenntnisse

semantic container altında varsayılan olarak:

1. Kernkompetenzen
2. Technische Schwerpunkte

bulunmalıdır.

Yani:

Besondere Kenntnisse
├── Kernkompetenzen
└── Technische Schwerpunkte

Kullanıcı:

Kernkompetenzen
→ düzenleyebilir
→ gizleyebilir
→ yeniden adlandırabilir

Technische Schwerpunkte
→ düzenleyebilir
→ gizleyebilir
→ yeniden adlandırabilir

==================================================
17. DİĞER CV TEMPLATE'LERİ
==================================================

Diğer Lebenslauf template'lerinde Besondere Kenntnisse farklı olabilir.

Örneğin:

Modern:
- Kenntnisse
- Sprachen

Klassisch:
- Kenntnisse
- Sprachen

Zeitlos:
- Kenntnisse
- Zertifikate

Stilvoll:
- Kenntnisse
- Sprachen
- Stärken

Pehlione:
- Kernkompetenzen
- Technische Schwerpunkte

Ama bunlar sadece template defaultlarıdır.

Kullanıcı isterse değiştirebilmelidir.

==================================================
18. CUSTOM KNOWLEDGE SECTIONS
==================================================

Kullanıcı:

„+ Bereich hinzufügen“

ile yeni bir Besondere-Kenntnisse alt bölümü oluşturabilsin.

Örneğin:

Stärken

Sonra:

Stärken
→ Soft Skills

olarak yeniden adlandırabilsin.

Her custom subsection:

id
title
type
visible
order
items
rendererType

taşımalıdır.

==================================================
19. BESONDERE KENNTNISSE EDITOR
==================================================

Editor örneği:

BESONDERE KENNTNISSE

[✓] Kernkompetenzen
    [Umbenennen]
    [Bearbeiten]

[✓] Technische Schwerpunkte
    [Umbenennen]
    [Bearbeiten]

[ ] Zertifikate
    [Aktivieren]

[ ] Sprachen
    [Aktivieren]

[ ] Stärken
    [Aktivieren]

+ Eigenen Bereich hinzufügen

==================================================
20. INTERESSEN UND HOBBYS
==================================================

Optional.

Kullanıcı:

- göster
- gizle
- yeniden adlandır

yapabilir.

Örneğin:

Interessen
Hobbys
Interessen & Engagement

==================================================
21. ORT, DATUM UND UNTERSCHRIFT
==================================================

Recommended.

Kullanıcı ayrı ayrı seçebilsin:

[✓] Ort
[✓] Datum
[✓] Unterschrift

Örneğin yalnızca:

Marburg, 21.09.2026
[Unterschrift]
Mustafa Özdemir

veya tamamen gizli olabilir.

==================================================
22. DECKBLATT BAŞLIK ALANI
==================================================

Deckblatt üzerinde:

Mustafa Özdemir

altında yer alan mesleki başlık kullanıcı tarafından düzenlenebilir olmalıdır.

Örneğin mevcut:

Softwareentwickler / Fachinformatiker für Anwendungsentwicklung

bir text input üzerinden değiştirilebilsin.

Bu bilgi:

profile.defaultProfessionalTitle

değerinden gelebilir.

Ancak Bewerbungs-spezifisch override yapılabilmelidir.

Örneğin kullanıcı belirli Bewerbung için:

Sachbearbeitung / Kundenservice

veya başka uygun bir başlık yazabilir.

Master profile istemeden değiştirilmemelidir.

==================================================
23. DECKBLATT KONTAKT
==================================================

Deckblatt üzerindeki Kontakt alanında kullanıcı hangi bilgilerin görüneceğini seçebilmelidir.

Alanlar:

Adresse
Telefon
E-Mail
LinkedIn
GitHub
Website

UI örneği:

KONTAKT AUF DEM DECKBLATT

[✓] Adresse
[✓] Telefon
[✓] E-Mail
[ ] LinkedIn
[ ] GitHub
[✓] Website

Sadece seçili bilgiler Deckblatt üzerinde gösterilmelidir.

==================================================
24. DECKBLATT İLE LEBENSLAUF AYRI GÖRÜNÜRLÜK
==================================================

Contact visibility document bazlı olabilir.

Örneğin:

Lebenslauf:
LinkedIn = sichtbar

Deckblatt:
LinkedIn = ausgeblendet

Bu nedenle yalnızca global field visible flag kullanma.

Şu yapıyı destekle:

documentVisibility:
- resume
- coverSheet
- coverLetter

==================================================
25. BEWERBUNGS-E-MAIL METNİNİ DÜZELT
==================================================

Mevcut e-mail sonunda tekrar ve akış problemi bulunuyor.

Şu yapı kullanılmamalıdır:

Meine vollständigen Bewerbungsunterlagen finden Sie im beigefügten PDF.
Für Rückfragen stehe ich Ihnen gerne zur Verfügung und freue mich auf einen persönlichen Austausch.

Anlagen
- Lebenslauf

Über die Gelegenheit zu einem persönlichen Gespräch freue ich mich.

Mit freundlichen Grüßen

...

Çünkü:

„freue mich auf einen persönlichen Austausch“

ve

„Über die Gelegenheit zu einem persönlichen Gespräch freue ich mich.“

aynı anlamı tekrar ediyor.

==================================================
26. YENİ PROFESYONEL E-MAIL SONU
==================================================

Varsayılan profesyonel metin şu mantıkta olmalıdır:

Meine vollständigen Bewerbungsunterlagen finden Sie im beigefügten PDF.

Für Rückfragen stehe ich Ihnen gerne zur Verfügung. Über die Gelegenheit zu einem persönlichen Gespräch freue ich mich.

Mit freundlichen Grüßen

{{profile.fullName}}

==================================================
27. E-MAIL ANLAGEN
==================================================

E-Mail içinde „Anlagen“ bölümü sadece gerçekten anlamlıysa gösterilsin.

Tek bir PDF Bewerbungsmappe gönderiliyorsa:

Anlage:
Bewerbungsunterlagen.pdf

gibi gösterilebilir.

Eğer kullanıcı yalnızca tek bir Gesamt-PDF gönderiyorsa:

Anlagen
- Lebenslauf

şeklinde yanlış/eksik liste oluşturma.

Gerçek attachment state üzerinden üret.

Örneğin:

Anlagen
- Bewerbungsunterlagen.pdf

veya ayrı dosyalar gönderiliyorsa:

Anlagen
- Anschreiben.pdf
- Lebenslauf.pdf
- Zeugnisse.pdf

==================================================
28. E-MAIL DUPLIKASYON VALIDATOR
==================================================

E-Mail template validator tekrar eden kapanış ifadelerini kontrol etsin.

Örneğin:

„persönlichen Austausch“
+
„persönlichen Gespräch“

aynı closing block içinde gereksiz tekrar oluşturuyorsa warning ver.

==================================================
29. ORTAK DESIGN SYSTEM
==================================================

Deckblatt
Anschreiben
Lebenslauf

aynı:

ApplicationDesignProfile

kullanmalıdır.

Örneğin:

ApplicationDesignProfile {
    colorPalette
    typography
    spacing
    margins
    sectionSpacing
    lineHeight
    background
    icons
}

==================================================
30. FARBEN
==================================================

Kullanıcı ayrı ayrı seçebilmeli:

- Primärfarbe
- Akzentfarbe
- Überschriftenfarbe
- Lesetextfarbe
- Linienfarbe
- Hintergrundfarbe

Özellikle:

Textfarbe

kullanıcı tarafından ayarlanabilir olmalıdır.

Ancak yeterli kontrast kontrol edilmelidir.

==================================================
31. COLOR CONSISTENCY
==================================================

Default durumda:

Lebenslauf
Deckblatt
Anschreiben

aynı primary/accent color kullanmalıdır.

Örneğin Pehlione White Blue seçilmişse:

Lebenslauf:
Pehlione Blue

Deckblatt:
aynı Pehlione Blue

Anschreiben:
aynı Pehlione Blue

kullanmalıdır.

Kullanıcı isterse document-specific override yapabilir.

==================================================
32. TYPOGRAPHY CONSISTENCY
==================================================

Default:

headingFont
bodyFont

üç belgede de aynı olmalıdır.

Örneğin:

Lebenslauf
Deckblatt
Anschreiben

aynı font ailesinden gelmelidir.

==================================================
33. ZEILENABSTAND
==================================================

Zeilenabstand için daha önceki sınırlı scale yerine:

1–10

kademeli sistem oluştur.

Örneğin:

1 = sehr kompakt
2
3
4
5 = Standard
6
7
8
9
10 = sehr luftig

Internal değerleri kontrollü line-height değerlerine map et.

Örneğin yaklaşık:

1 → 1.00
5 → 1.20
10 → 1.50

Ancak template veya document standardının minimum/maximum sınırları korunmalıdır.

==================================================
34. ABSCHNITTSABSTAND
==================================================

Section'lar arası spacing de:

1–10

scale ile ayarlanabilmelidir.

Örneğin:

Abschnittsabstand
1 ───────────── 10

1:
çok kompakt

5:
standard

10:
çok ferah

==================================================
35. MARGIN AYARI
==================================================

Kullanıcı genel margin yoğunluğunu ayarlayabilsin.

UI:

Seitenränder
1 ───────────── 10

Ancak gerçek A4 ölçüleri arka planda mm üzerinden tutulmalıdır.

Örneğin scale:
1 = minimum allowed margin
5 = template default
10 = maximum comfortable margin

==================================================
36. PADDING AYARI
==================================================

Section internal padding için:

1–10

scale kullan.

Örneğin:

Innenabstand
1 ───────────── 10

Bu özellikle:

- sidebar
- header
- section box
- contact block

alanlarında kullanılabilir.

==================================================
37. AYARLARIN AYRI OLMASI
==================================================

Karıştırma:

Margin
≠
Padding
≠
Section Gap
≠
Line Height

Design panelde ayrı kontroller olmalıdır:

Seitenränder
Innenabstand
Abschnittsabstand
Zeilenabstand

==================================================
38. STANDARD DEĞERLER
==================================================

Her template kendi default değerlerine sahip olmalıdır.

Örneğin:

Pehlione White Blue:

marginScale = 5
paddingScale = 5
sectionGapScale = 5
lineHeightScale = 5

Kullanıcı değiştirmedikçe professional default kullanılmalıdır.

==================================================
39. RESET STANDARD
==================================================

Design panelinde:

„Auf Standard zurücksetzen“

butonu olmalıdır.

Bu:

- color
- font
- spacing
- background
- margins

ayarlarını template defaultuna döndürmelidir.

İçeriği silmemelidir.

==================================================
40. BACKGROUND COLOR
==================================================

Bazı CV template'lerinde arka plan rengi bulunabilir.

Kullanıcı background rengini ayarlayabilmelidir.

Destekle:

- Weiß
- Hell
- Mittel
- Dunkel
- Custom

==================================================
41. BACKGROUND SHADE SCALE
==================================================

Background yoğunluğu için 1–10 scale destekle.

Örneğin:

1 = neredeyse beyaz
5 = orta yoğunluk
10 = en koyu izin verilen ton

Ancak metin kontrastı otomatik kontrol edilmelidir.

==================================================
42. BACKGROUND SCOPE
==================================================

Kullanıcı arka planın hangi alana uygulanacağını seçebilsin:

- komplette Seite
- Sidebar
- Header
- bestimmte Abschnitte

Template capability'ye göre seçenekleri göster.

Örneğin Pehlione:

Sidebar Background
Hero Background

destekleyebilir.

==================================================
43. AUTOMATIC TEXT CONTRAST
==================================================

Koyu background seçilirse sistem:

Textfarbe

için uygun kontrast önerebilsin.

Örneğin:

dark blue background
→ white text

Ancak kullanıcının manuel override hakkı olabilir.

WCAG benzeri kontrast kontrolü yap ve warning göster.

==================================================
44. MODERN DESIGN PANEL
==================================================

Sağdaki:

DESIGN ANPASSEN

panelini modern accordion sistemiyle düzenle.

Önerilen bölümler:

Farben
Hintergrund
Schriftgröße
Schriftfarbe
Zeilenabstand
Schriftart Überschriften
Schriftart Lesetexte
Seitenränder
Innenabstand
Abschnittsabstand
Linien
Icons
Foto
Layout
Seitenzahlen

==================================================
45. DOCUMENT SYNC SEÇENEĞİ
==================================================

Kullanıcı design ayarı yaparken toggle bulunabilir:

[✓] Auf alle Bewerbungsunterlagen anwenden

Aktifse:

Lebenslauf
Deckblatt
Anschreiben

aynı design profile ile güncellenir.

Kapalıysa sadece mevcut belge değişir.

==================================================
46. BELGE BAZLI OVERRIDE
==================================================

Hierarchy:

ApplicationDesignProfile
↓
TemplateDefaults
↓
DocumentOverride
↓
UserOverride

mantığında çalışmalıdır.

==================================================
47. SECTION EDIT MODE
==================================================

Lebenslauf preview üzerinde section'a tıklanınca:

- edit paneli açılmalı
- görünürlük ayarı
- title rename
- content edit
- move
- delete/hide

seçenekleri gösterilmeli.

Örneğin:

KERNKOMPETENZEN

[✓ Sichtbar]

Titel:
[Kernkompetenzen            ]

Inhalt:
[...]

[Nach oben]
[Nach unten]
[Ausblenden]

==================================================
48. SECTION UMbenennen
==================================================

Recommended ve optional section başlıkları yeniden adlandırılabilsin.

Özellikle:

Besondere Kenntnisse alt bölümleri

özgürce rename edilebilmelidir.

Örneğin:

Kernkompetenzen
→ Fachliche Kompetenzen

Technische Schwerpunkte
→ IT & Technik

Stärken
→ Persönliche Stärken

==================================================
49. SEMANTIC TYPE KORUNMALI
==================================================

Görünen title değişse bile semantic type değişmemelidir.

Örneğin:

semanticType:
skills

displayTitle:
IT & Technik

Bu ATS, AI ve template mapping için önemlidir.

==================================================
50. TEMPLATE DEĞİŞİMİ
==================================================

Kullanıcı:

Pehlione
→ Modern
→ Klassisch
→ Stilvoll

template değiştirdiğinde:

- 9 semantic section korunmalı
- personal data korunmalı
- career data korunmalı
- education korunmalı
- custom Besondere Kenntnisse sub-sections mümkün olduğunca korunmalı

Yalnızca presentation değişmelidir.

==================================================
51. TEMPLATE-SPECIFIC KNOWLEDGE MAPPING
==================================================

Yeni template Besondere Kenntnisse için farklı default section kullanıyorsa mapping yap.

Örneğin:

Pehlione:
Kernkompetenzen
Technische Schwerpunkte

Stilvoll:
Kenntnisse
Sprachen

Ancak kullanıcının explicit custom section'larını silme.

==================================================
52. VALIDATION
==================================================

Export öncesi kontrol et:

REQUIRED:
- Überschrift semantic olarak mevcut mu?
- Persönliche Daten mevcut mu?
- Beruflicher Werdegang mevcut mu?
- Bildungsweg mevcut mu?

RECOMMENDED section kapalıysa export'u engelleme.

Yalnızca INFO/WARNING ver.

==================================================
53. COMPLETENESS
==================================================

Vollständigkeit göstergesi yeni section sistemini dikkate almalıdır.

Required eksik:
yüksek ağırlıklı eksiklik.

Recommended eksik:
öneri.

Optional eksik:
completeness'i ciddi biçimde düşürmemeli.

==================================================
54. MODERN UI
==================================================

Görsel sonuç:

- sade
- ferah
- modern
- profesyonel
- açık hiyerarşili

olmalıdır.

Editor çok sayıda ayar içerse bile kullanıcıyı boğmamalıdır.

Progressive disclosure kullan:

önce sık kullanılan ayarlar,
advanced options daha sonra.

==================================================
55. DATA MODEL
==================================================

Gerekirse aşağıdaki modelleri oluştur/güncelle:

ApplicationDesignProfile
DocumentDesignOverride
ResumeSectionDefinition
ResumeSectionInstance
ResumeKnowledgeGroup
ResumePersonalFieldVisibility
CoverSheetConfig
CoverSheetContactVisibility
EmailTemplateConfig
SpacingScaleConfig
BackgroundConfig

Duplicate modeller oluşturma.
Mevcut eşdeğer yapıları genişlet.

==================================================
56. ÖNEMLİ ACCEPTANCE CRITERIA
==================================================

Görev ancak aşağıdakiler çalışıyorsa tamamlanmış sayılmalıdır:

A)
Lebenslauf 9 semantic ana bölümü destekliyor.

B)
Required alanlar gizlenemiyor.

C)
Recommended alanlar açılıp kapatılabiliyor.

D)
Optional alanlar özgürce açılıp kapatılabiliyor.

E)
Persönliche Daten altında contact field'ları tek tek gösterilip gizlenebiliyor.

F)
Besondere Kenntnisse altında template'e göre farklı alt bölümler kullanılabiliyor.

G)
Pehlione White Blue'da Kernkompetenzen + Technische Schwerpunkte düzenlenebiliyor.

H)
Kullanıcı custom Besondere Kenntnisse bölümü ekleyebiliyor.

I)
Bu bölümleri yeniden adlandırabiliyor.

J)
Deckblatt'taki mesleki başlığı değiştirebiliyor.

K)
Deckblatt Kontakt alanlarında Adresse/Telefon/E-Mail/LinkedIn/GitHub/Website tek tek gösterilip gizlenebiliyor.

L)
E-Mail kapanış metnindeki tekrar düzeltilmiş.

M)
E-Mail Anlagen gerçek attachment listesine göre üretiliyor.

N)
Margin, padding, section spacing ve line-height ayrı ayrı 1–10 scale üzerinden değiştirilebiliyor.

O)
Kullanıcı Schriftfarbe değiştirebiliyor.

P)
Background rengi ve açıklık/koyuluk derecesi ayarlanabiliyor.

Q)
Lebenslauf, Deckblatt ve Anschreiben ortak Design Profile kullanabiliyor.

R)
Template değiştirildiğinde içerik kaybolmuyor.

S)
Final çıktı modern ve profesyonel görünüyor.

==================================================
57. UYGULAMA SIRASI
==================================================

Şu sırayla uygula:

1. mevcut ResumeSection modelini analiz et
2. 9 semantic section sistemini oluştur
3. requirement enum ekle
4. visibility rules ekle
5. Persönliche Daten field visibility ekle
6. Besondere Kenntnisse dynamic container oluştur
7. Pehlione knowledge mapping ekle
8. custom subsection add/rename/hide desteği ekle
9. Deckblatt professional title override ekle
10. Deckblatt contact visibility ekle
11. E-Mail closing template'ini düzelt
12. attachment-aware Anlagen sistemi ekle
13. ApplicationDesignProfile oluştur/güncelle
14. renk/font sync ekle
15. spacing scale 1–10 yap
16. margin/padding/section gap/line-height ayır
17. background + shade control ekle
18. auto contrast validation ekle
19. Design anpassen UI'yi güncelle
20. template switching compatibility ekle
21. validation/completeness güncelle
22. testleri ekle

==================================================
58. SONUÇ
==================================================

Ortaya çıkacak sistemde kullanıcı yalnızca hazır bir Lebenslauf template'i doldurmayacaktır.

Kullanıcı:

- hangi bilgilerin gösterileceğini
- hangi bölümlerin kullanılacağını
- Besondere Kenntnisse altında hangi kategorilerin bulunacağını
- bölüm isimlerini
- renkleri
- yazı rengini
- fontları
- satır aralığını
- bölüm aralığını
- margin/padding değerlerini
- background rengini ve yoğunluğunu

kontrollü biçimde ayarlayabilmelidir.

Aynı zamanda uygulama profesyonel varsayılanları korumalı ve kullanıcıyı kötü görünümlü bir belge oluşturmaya zorlamamalıdır.

Ana prensip:

**İçerik kullanıcıya ait, template sunum katmanıdır, design ise bütün Bewerbungsunterlagen boyunca ortak ve tutarlı bir sistemdir.**
```
