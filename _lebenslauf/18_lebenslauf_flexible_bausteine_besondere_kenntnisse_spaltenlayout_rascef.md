
* **Markdown dosya adı:** `18_lebenslauf_flexible_bausteine_besondere_kenntnisse_spaltenlayout_rascef.md`
* **Konu:** Lebenslauf içinde özellikle **7. Besondere Kenntnisse** altında tamamen esnek alt bölüm/Baustein sistemi; kullanıcı tarafından bölüm ekleme, yeniden adlandırma, madde ekleme, gösterme/gizleme, sıralama ve iki sütunda sağ/sol konumlandırma
* **İstenilen çıktı:** `Stärken`, `Zertifikate`, `Kernkompetenzen`, `Technische Schwerpunkte`, `Weiterbildungen`, `Projekt-Highlight`, `Sprachen`, `IT-Kenntnisse`, `Tools`, `Methoden` vb. bölümlerin hazır alternatifler olarak sunulduğu; kullanıcının istediğini aktive ettiği, her bölümün altına madde madde içerik eklediği, başlığını değiştirebildiği ve iki sütunlu CV'lerde bölümü **links / rechts / volle Breite** konumlandırabildiği son derece esnek Lebenslauf bölüm sistemi
* **Kullanılacak framework:** RASCEF
* **Senin yazacağın prompt:**

```text
Sen kıdemli bir ElectronJS + TypeScript geliştiricisi, Document Editor Architect, UI/UX Designer ve profesyonel Lebenslauf Builder sistemleri konusunda uzman bir Software Architect'sin.

Görevin, mevcut Bewerbung Manager içindeki Lebenslauf bölüm sistemini daha esnek hale getirmektir.

Özellikle:

**7. Besondere Kenntnisse**

bölümü artık yalnızca tek bir sabit section olmayacaktır.

Bu bölüm, kullanıcının kendi Lebenslauf'una göre farklı içerik bloklarını seçebildiği, düzenleyebildiği ve istediği konuma yerleştirebildiği merkezi bir **Baustein-Container** olarak çalışmalıdır.

==================================================
1. ANA PRENSİP
==================================================

Lebenslauf şu 9 semantic ana bölümü korumaya devam etmelidir:

1. Überschrift
2. Persönliche Daten
3. Bewerbungsfoto
4. Kurzprofil
5. Beruflicher Werdegang
6. Bildungsweg
7. Besondere Kenntnisse
8. Interessen und Hobbys
9. Ort, Datum und Unterschrift

Ancak:

**7. Besondere Kenntnisse**

çok esnek bir container olmalıdır.

Bu container altında kullanıcının istediği sayıda alt bölüm bulunabilmelidir.

==================================================
2. BESONDERE KENNTNISSE = FLEXIBLE BAUSTEINE
==================================================

Varsayılan olarak kullanıcıya aşağıdaki hazır Baustein seçeneklerini sun:

- Kernkompetenzen
- Technische Schwerpunkte
- Stärken
- Fachliche Kenntnisse
- IT-Kenntnisse
- Softwarekenntnisse
- Tools
- Technologien
- Methoden
- Sprachen
- Zertifikate
- Weiterbildungen
- Projekt-Highlight
- Projekte
- Soft Skills
- Hard Skills
- Branchenkenntnisse
- Führerschein
- Ehrenamt
- Publikationen
- Auszeichnungen
- Sonstige Kenntnisse

Bu liste genişletilebilir olmalıdır.

Component içine hardcode edilmiş statik UI mantığı kurma.

Merkezi:

ResumeBlockRegistry

veya:

KnowledgeBlockRegistry

kullan.

==================================================
3. KULLANICI HANGİ BÖLÜMLERİ İSTERSE SEÇSİN
==================================================

Editor içinde:

„Bereiche hinzufügen“

butonu oluştur.

Tıklandığında örneğin:

[ ] Kernkompetenzen
[ ] Technische Schwerpunkte
[ ] Stärken
[ ] Zertifikate
[ ] Weiterbildungen
[ ] Projekt-Highlight
[ ] Sprachen
[ ] IT-Kenntnisse
[ ] Tools
[ ] Methoden
[ ] Projekte

gibi liste göster.

Kullanıcı istediği bölümü aktive edebilsin.

Aktif edilen bölüm anında preview üzerinde görünmelidir.

==================================================
4. CUSTOM BEREICH
==================================================

Kullanıcı yalnızca hazır seçeneklerle sınırlı kalmamalıdır.

Buton:

+ Eigenen Bereich hinzufügen

olsun.

Kullanıcı:

Titel:
[________________]

girerek tamamen kendi bölümünü oluşturabilsin.

Örneğin:

- Branchenerfahrung
- Kundenservice-Kompetenzen
- SAP-Kenntnisse
- Persönliche Stärken
- Open-Source-Projekte

==================================================
5. HER BÖLÜM YENİDEN ADLANDIRILABİLSİN
==================================================

Her Baustein:

Umbenennen

desteklemelidir.

Örneğin:

Kernkompetenzen
→ Fachliche Kompetenzen

Technische Schwerpunkte
→ IT & Technik

Stärken
→ Persönliche Stärken

Weiterbildungen
→ Fortbildungen

Projekt-Highlight
→ Ausgewähltes Projekt

Semantic type korunmalıdır.

Örneğin:

semanticType = "project-highlight"

displayTitle = "Ausgewähltes Projekt"

==================================================
6. BÖLÜM İÇİ MADDELER
==================================================

Her bölüm altında kullanıcı istediği kadar alt madde oluşturabilmelidir.

Örneğin:

KERNKOMPETENZEN

• Prozessanalyse
• Datenanalyse
• Strukturierte Problemlösung
• Technische Dokumentation

Editor:

Kernkompetenzen

[Prozessanalyse               ] [↑][↓][×]
[Datenanalyse                 ] [↑][↓][×]
[Strukturierte Problemlösung  ] [↑][↓][×]

+ Punkt hinzufügen

==================================================
7. BULLET ITEM MODELİ
==================================================

Her basit madde:

id
text
description?
icon?
level?
order
visible

taşıyabilsin.

Bu sayede basit:

• Java

veya daha gelişmiş:

Java
Fortgeschritten

şeklinde render edilebilir.

==================================================
8. FARKLI RENDERER TİPLERİ
==================================================

Her bölüm aynı görünmek zorunda değildir.

Baustein şu rendererType değerlerinden birini kullanabilsin:

- bullet-list
- text-list
- icon-list
- skill-level
- tag-list
- timeline
- certificate-list
- project-highlight
- language-level
- two-column-list
- compact-grid

Template varsayılan renderer önerebilir.

Kullanıcı template izin veriyorsa değiştirebilir.

==================================================
9. KERNKOMPETENZEN
==================================================

Default renderer:

bullet-list

veya:

icon-list

İçerik kullanıcı tarafından tamamen düzenlenebilir.

Pehlione White Blue template için bu bölüm varsayılan aktif olabilir.

==================================================
10. TECHNISCHE SCHWERPUNKTE
==================================================

Default renderer:

icon-list

veya:

compact-list

Örnek:

Monitoring & Visualisierung
API-Integration
Softwareentwicklung
Datenverarbeitung

Her item:
- başlık
- optional açıklama
- optional icon

taşıyabilsin.

==================================================
11. STÄRKEN
==================================================

Kullanıcı Stärken bölümünü ekleyebilsin.

Örnek:

• Zuverlässigkeit
• Strukturierte Arbeitsweise
• Lernbereitschaft
• Teamfähigkeit

Ancak içerikleri sistem uydurmamalıdır.

Kullanıcı veya profil verisi tarafından sağlanmalıdır.

==================================================
12. ZERTIFIKATE
==================================================

Zertifikate özel bir Baustein olarak desteklenmelidir.

Entry:

title
issuer
date
credentialId?
url?
visible

taşıyabilir.

Basit veya ayrıntılı görünüm seçilebilir.

==================================================
13. WEITERBILDUNGEN
==================================================

Weiterbildungen da bu flexible sistemde kullanılabilmelidir.

Bu bölüm:

- Besondere Kenntnisse altında kompakt olarak
veya
- ayrı ana ResumeSection olarak

render edilebilir.

Kullanıcı seçim yapabilsin.

Örneğin:

Darstellung:
(•) Kompakt unter Besondere Kenntnisse
( ) Eigener Hauptabschnitt

==================================================
14. PROJEKT-HIGHLIGHT
==================================================

`Projekt-Highlight` önemli hazır Bausteinlerden biri olsun.

Bir veya birden fazla project-highlight eklenebilsin.

Alanlar:

- Projekttitel
- Rolle
- Zeitraum
- Kurzbeschreibung
- Technologien
- Tätigkeiten
- Ergebnis
- GitHub / URL
- visible

Örneğin Pehlione template'te sağ ana content içinde geniş section olarak render edilebilir.

Başka bir template'te kompakt blok olabilir.

==================================================
15. PROJEKT-HIGHLIGHT KONUMU SERBEST OLSUN
==================================================

Projekt-Highlight sadece `Besondere Kenntnisse` görsel alanında kalmak zorunda değildir.

Semantic olarak bu flexible Baustein sisteminden yönetilebilir; fakat layout konumu kullanıcı tarafından seçilebilir.

Örneğin:

Projekt-Highlight
Position:
[ Hauptspalte ▼ ]

==================================================
16. İKİ SÜTUNLU TEMPLATE SİSTEMİ
==================================================

İki sütun destekleyen CV template'lerinde kullanıcı her Abschnitt/Baustein için konum belirleyebilmelidir.

Seçenekler:

- Links
- Rechts
- Volle Breite

Internal:

column:
"left"
"right"
"full"

==================================================
17. KOLON SEÇİM UI
==================================================

Her bölüm editöründe açık bir alan göster:

Position im Lebenslauf

[ Links ] [ Rechts ] [ Volle Breite ]

veya:

Spalte:
[ Linke Spalte ▼ ]

Seçim preview üzerinde anında uygulanmalıdır.

==================================================
18. TEMPLATE CAPABILITY KONTROLÜ
==================================================

Her template tüm konumları desteklemeyebilir.

Örneğin:

Modern:
left / right / full

Stilvoll:
main / sidebar

Pehlione:
sidebar / main / full

Klassisch:
full only

Übersichtlich:
full / timeline

Bu nedenle sabit `left/right` kodlama yerine semantic slot sistemi oluştur.

==================================================
19. LAYOUT SLOT SİSTEMİ
==================================================

Her template kendi slotlarını tanımlasın.

Örnek:

Pehlione:

slots:
- sidebar
- main
- full

Stilvoll:

slots:
- sidebar
- main

Modern:

slots:
- left
- right
- full

Klassisch:

slots:
- main

UI bunları kullanıcı dostu isimlerle göstersin:

Linke Spalte
Rechte Spalte
Hauptbereich
Seitenleiste
Volle Breite

==================================================
20. DRAG & DROP + OKLAR
==================================================

Kullanıcı bölümleri iki yöntemle konumlandırabilsin:

1. Oklar:
↑
↓
←
→

2. Drag & Drop

Ancak drag-and-drop zorunlu ana yöntem olmasın.

Keyboard ve erişilebilirlik için oklar her zaman bulunmalıdır.

==================================================
21. SOLA / SAĞA HAREKET
==================================================

Örneğin kullanıcı:

Kernkompetenzen

üzerinde:

→

tuşuna basarsa:

left
→
right

gidebilir.

Projekt-Highlight:

sidebar'a sığmıyorsa:

→ operation engellenebilir.

Tooltip:

„Dieser Bereich benötigt die Hauptspalte.“

==================================================
22. BÖLÜM SIRASI
==================================================

Her slot kendi order listesini tutmalıdır.

Örnek:

LEFT:
1. Persönliche Daten
2. Kernkompetenzen
3. Technische Schwerpunkte
4. Sprachen

RIGHT:
1. Kurzprofil
2. Berufserfahrung
3. Ausbildung
4. Projekt-Highlight
5. Weiterbildungen

Kullanıcı bu sıralamayı değiştirebilmelidir.

==================================================
23. ADIM ADIM LAYOUT EDITOR
==================================================

Kullanıcı için ayrı bir:

„Bereiche & Anordnung“

editor ekranı oluştur.

Adım 1:
Bölümleri seç

Adım 2:
Bölüm isimlerini düzenle

Adım 3:
Alt maddeleri düzenle

Adım 4:
Bölümlerin sırasını belirle

Adım 5:
Sol / Sağ / Tam genişlik konumunu seç

Adım 6:
Preview kontrolü

Bu wizard zorunlu olmamalıdır.
Advanced editor olarak kullanılabilir.

==================================================
24. HIZLI BÖLÜM YÖNETİMİ
==================================================

Normal editor'de her bölüm card'ı şu kontrollere sahip olsun:

Kernkompetenzen

[✓ Sichtbar]

Titel:
[Kernkompetenzen]

Position:
[Linke Spalte ▼]

Darstellung:
[Bullet-Liste ▼]

[↑] [↓] [←] [→]

[Bearbeiten]

[Ausblenden]

==================================================
25. SICHTBARKEIT
==================================================

Her flexible Baustein:

visible = true / false

olmalıdır.

Kullanıcı bölümün içeriğini silmeden geçici olarak gizleyebilmelidir.

Bu çok önemli.

„Ausblenden“:
veriyi silmez.

„Löschen“:
bölüm instance'ını kaldırır.

İkisini birbirinden ayır.

==================================================
26. REQUIRED BÖLÜMLER AYRI KALSIN
==================================================

Şu ana semantic bölümler hala required kurallarına tabi:

Überschrift
Persönliche Daten
Beruflicher Werdegang
Bildungsweg

Bunlar normal flexible Baustein gibi tamamen kaldırılamaz.

Ancak template slot konumu izin veriyorsa hareket ettirilebilir.

==================================================
27. BESONDERE KENNTNISSE FLEXIBLE CONTAINER
==================================================

Semantic olarak:

Besondere Kenntnisse

bir container olarak korunmalıdır.

Altında örneğin:

Besondere Kenntnisse
├── Kernkompetenzen
├── Technische Schwerpunkte
├── Stärken
├── Sprachen
├── Zertifikate
├── Weiterbildungen
├── Projekt-Highlight
└── Custom Blocks

bulunabilir.

Ancak final CV'de:

„Besondere Kenntnisse“

ana başlığının görünmesi zorunlu değildir.

Template yalnızca alt başlıkları render edebilir.

==================================================
28. CONTAINER TITLE AYARI
==================================================

Kullanıcı şunlardan birini seçebilsin:

[ ] Übergeordneten Titel anzeigen

Açıksa:

BESONDERE KENNTNISSE

altında:
Kernkompetenzen
Technische Schwerpunkte

görünür.

Kapalıysa doğrudan:

KERNKOMPETENZEN

TECHNISCHE SCHWERPUNKTE

görünür.

==================================================
29. TEMPLATE DEFAULTLARI
==================================================

Her template kendi önerilen Baustein ve placement değerlerine sahip olmalıdır.

Örneğin Pehlione White Blue:

SIDEBAR:
- Kontakt
- Kernkompetenzen
- Technische Schwerpunkte

MAIN:
- Kurzprofil
- Berufserfahrung
- Ausbildung
- Projekt-Highlight
- Weiterbildungen

Ancak kullanıcı bunları değiştirebilmelidir.

==================================================
30. USER OVERRIDE TEMPLATE'TEN ÖNCELİKLİ OLSUN
==================================================

Hierarchy:

Template Default
↓
Profile Preference
↓
Resume Draft Override
↓
Application-specific Override

Kullanıcı explicit olarak bir bölümün yerini değiştirmişse template tekrar seçildiğinde gereksiz yere resetleme.

==================================================
31. TEMPLATE DEĞİŞTİRMEDE MAPPING
==================================================

Örneğin Pehlione'da:

Kernkompetenzen = sidebar

kullanılıyor.

Kullanıcı Stilvoll'a geçerse:

sidebar

orada da varsa otomatik map et.

Eğer hedef template aynı slotu desteklemiyorsa:

fallbackSlot

kullan.

İçerik silinmemelidir.

==================================================
32. BÖLÜM EKLEME MODALI
==================================================

Modern modal/drawer oluştur:

BEREICH HINZUFÜGEN

Suche:
[________________]

Empfohlen:
- Kernkompetenzen
- Technische Schwerpunkte
- Sprachen
- Stärken

Fachlich:
- IT-Kenntnisse
- Tools
- Methoden
- Zertifikate

Karriere:
- Weiterbildungen
- Projekt-Highlight
- Projekte

Persönlich:
- Interessen
- Ehrenamt
- Auszeichnungen

+ Eigenen Bereich erstellen

==================================================
33. ALT MADDE EKLEME
==================================================

Bölüm içine madde eklemek çok hızlı olmalıdır.

Örneğin:

TECHNISCHE SCHWERPUNKTE

[Monitoring & Visualisierung        ]
[API-Integration                    ]
[Softwareentwicklung                ]

+ Punkt hinzufügen

Enter tuşu yeni madde oluşturabilsin.

==================================================
34. MADDE SIRALAMA
==================================================

Alt maddeler de:

↑
↓

ile sıralanabilsin.

Drag-and-drop opsiyonel olarak desteklenebilir.

==================================================
35. MADDE GİZLEME
==================================================

Bir bölüm aktif kalırken tek bir madde gizlenebilsin.

Örneğin:

KERNKOMPETENZEN

[✓] Prozessanalyse
[✓] Datenanalyse
[ ] Grafana / PRTG
[✓] Strukturierte Problemlösung

Böylece aynı profil farklı Bewerbungen için kolayca özelleştirilebilir.

==================================================
36. PROFILE BASE + APPLICATION OVERRIDE
==================================================

Örneğin Java Developer profile:

Kernkompetenzen:
- Java
- Spring Boot
- REST
- SQL

Sachbearbeiter profile:

Kernkompetenzen:
- Strukturierte Arbeitsweise
- Dokumentation
- Prozessverständnis

Aynı kullanıcı farklı profil setleri oluşturabilmelidir.

Application-specific değişikliklar master profile'ı bozmamalıdır.

==================================================
37. SECTION TEMPLATE PRESETS
==================================================

Kullanıcı bölüm görünümü için hazır preset seçebilsin.

Örneğin:

Kernkompetenzen:

Darstellung:
- Liste
- Icons
- Grid
- Tags
- Kompakt

Sprachen:

- CEFR
- Text
- Level Bar

Zertifikate:

- Kompakt
- Detail

==================================================
38. İKİ SÜTUN GENİŞLİĞİ
==================================================

İki kolonlu template’lerde ayrıca kullanıcı kolon oranını ayarlayabilsin.

Örneğin:

Linke Spalte
30%

Rechte Spalte
70%

veya slider:

25 / 75
30 / 70
35 / 65
40 / 60

Template safe limits belirlemelidir.

==================================================
39. FULL WIDTH SECTION
==================================================

Bazı bölüm kullanıcı isterse iki kolonun tamamını kaplayabilsin.

Örneğin:

Projekt-Highlight
→ Volle Breite

Berufserfahrung
→ Volle Breite

Bu durumda section yeni satırdan başlamalıdır.

==================================================
40. SECTION BREAK / PAGE BREAK
==================================================

Kullanıcı advanced ayarda bölüm için:

Seitenumbruch davor

seçeneğini açabilsin.

Özellikle:

- Projekte
- Weiterbildungen
- Zertifikate

için yararlı olabilir.

Ancak default automatic pagination olmalıdır.

==================================================
41. DESIGN AYARLARI BÖLÜM BAZLI DA OLABİLSİN
==================================================

Global design dışında section-specific override desteklenebilir.

Örneğin:

Kernkompetenzen:
- titleColor
- iconStyle
- spacing
- renderer

Ancak default olarak global design kullan.

Advanced mode içinde göster.

==================================================
42. MARGIN / PADDING / SPACING
==================================================

Önceki sistemde olduğu gibi:

Seitenränder
Innenabstand
Abschnittsabstand
Zeilenabstand

1–10 scale ile ayarlanmalıdır.

Ek olarak section bazında:

Vorheriger Abstand
Nachfolgender Abstand

opsiyonel advanced control olabilir.

==================================================
43. SAME DESIGN ACROSS DOCUMENTS
==================================================

Lebenslauf, Deckblatt ve Anschreiben:

- color
- font
- accent
- line style
- heading typography

açısından ortak:

ApplicationDesignProfile

kullanmalıdır.

Ancak Lebenslauf section placement yalnızca ResumeDocument'a aittir.

==================================================
44. STATE MODEL
==================================================

Gerekirse aşağıdaki yapıları oluştur:

ResumeBlockDefinition
ResumeBlockInstance
ResumeBlockItem
ResumeLayoutSlot
ResumeTemplateSlotDefinition
ResumeBlockRegistry
ResumeKnowledgeContainer
ResumeLayoutOverride

Örneğin:

ResumeBlockInstance {
  id
  semanticType
  title
  visible
  slot
  order
  rendererType
  items
  styleOverrides
}

==================================================
45. TEMPLATE SLOT MODEL
==================================================

Örneğin:

ResumeTemplateSlotDefinition {
  id
  label
  maxWidth
  supportedBlockTypes
  supportsFullWidth
  order
}

==================================================
46. PREVIEW INTERACTION
==================================================

Preview'da bir bölüm seçildiğinde:

- highlight
- title
- edit
- move
- visibility
- add
- delete

kontrolleri ortaya çıkmalı.

Örneğin:

Kernkompetenzen

[←] [↑] [↓] [→]

+ Abschnitt

🗑

==================================================
47. TOOLTIP
==================================================

Okların anlamı açık olsun:

← In linke Spalte verschieben
→ In rechte Spalte verschieben
↑ Nach oben
↓ Nach unten

==================================================
48. ACCEPTANCE CRITERIA
==================================================

Görev tamamlanmış sayılmadan önce:

A)
Besondere Kenntnisse flexible container olarak çalışmalı.

B)
Kernkompetenzen eklenebilmeli.

C)
Technische Schwerpunkte eklenebilmeli.

D)
Stärken eklenebilmeli.

E)
Zertifikate eklenebilmeli.

F)
Weiterbildungen eklenebilmeli.

G)
Projekt-Highlight eklenebilmeli.

H)
Custom section eklenebilmeli.

I)
Bölüm yeniden adlandırılabilmeli.

J)
Bölüm gösterilip gizlenebilmeli.

K)
Her bölüm altında sınırsız/uygun sayıda madde eklenebilmeli.

L)
Alt maddeler sıralanabilmeli.

M)
Alt maddeler ayrı ayrı gizlenebilmeli.

N)
İki kolonlu template'te section sağa/sola taşınabilmeli.

O)
Section full-width yapılabilmeli.

P)
Template izin vermiyorsa geçersiz konum engellenmeli.

Q)
Template değişince içerik kaybolmamalı.

R)
User override korunmalı.

S)
Preview gerçek zamanlı güncellenmeli.

T)
PDF/DOCX aynı yerleşimi kullanmalı.

==================================================
49. UYGULAMA SIRASI
==================================================

Şu sırada uygula:

1. mevcut ResumeSection mimarisini analiz et
2. ResumeBlockRegistry oluştur
3. Besondere Kenntnisse container yapısını genişlet
4. hazır Baustein tiplerini tanımla
5. custom block oluşturmayı ekle
6. block item modelini oluştur
7. add/edit/delete/hide/rename işlemlerini ekle
8. item ekleme/sıralama/gizleme işlemlerini ekle
9. template slot modelini oluştur
10. left/right/full placement sistemini ekle
11. move arrow kontrollerini bağla
12. drag-and-drop opsiyonunu ekle
13. template-specific default placement ekle
14. template switching mapping oluştur
15. profile/application override mantığını bağla
16. Design panel ile entegre et
17. Live Preview ile bağla
18. DOCX/PDF renderer'a bağla
19. pagination testlerini yap
20. tüm interaction testlerini ekle

==================================================
50. SONUÇ
==================================================

Ortaya çıkan Lebenslauf Builder sabit bölümlerden oluşan bir form olmamalıdır.

Bunun yerine kullanıcı:

- istediği bölümü seçebilmeli
- istemediğini gizleyebilmeli
- bölüm adı değiştirebilmeli
- kendi bölümünü ekleyebilmeli
- bölüm içine madde madde içerik ekleyebilmeli
- maddeleri gösterebilmeli/gizleyebilmeli
- bölümleri yukarı/aşağı taşıyabilmeli
- iki kolonlu CV'de sağa/sola taşıyabilmeli
- gerektiğinde tam genişlik kullanabilmeli
- Projekt-Highlight gibi özel bölümleri istediği konuma koyabilmeli
- template değiştirirken verilerini kaybetmemeli

Ana prensip:

**Lebenslauf içeriği modüler Bausteinlerden oluşmalı; template yalnızca bu Bausteinlerin nasıl ve nerede gösterileceğini belirlemeli, son kararı ise kullanıcı verebilmelidir.**
```
