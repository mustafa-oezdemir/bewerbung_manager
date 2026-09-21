
* **Markdown dosya adı:** `19_lebenslauf_kenntnisse_zusatzangaben_flexible_bausteine_rascef.md`
* **Konu:** Lebenslauf içinde **„Kenntnisse & Zusatzangaben“** adlı merkezi ve tamamen esnek bölüm oluşturulması
* **İstenilen çıktı:** Kullanıcının uygulama içinden `Kenntnisse & Zusatzangaben` altında istediği alt bölümleri seçebildiği, seçilen bölümlerin CV’de anında göründüğü, içeriklerini doğrudan düzenleyebildiği, bölüm ve maddeleri gizleyip gösterebildiği, yeniden adlandırabildiği ve template’e göre konumlandırabildiği modüler bir Lebenslauf sistemi
* **Kullanılacak framework:** RASCEF
* **Senin yazacağın prompt:**

```text
Sen kıdemli bir ElectronJS + TypeScript geliştiricisi, UI/UX Designer ve modüler Lebenslauf Builder sistemleri konusunda uzman bir Software Architect'sin.

Görevin, mevcut Bewerbung Manager içindeki Lebenslauf modülünde merkezi bir:

**Kenntnisse & Zusatzangaben**

bölümü oluşturmaktır.

Bu bölüm kullanıcının CV’sini başvuruya göre özelleştirebildiği esnek bir container olacaktır.

Temel kullanıcı deneyimi:

Kenntnisse & Zusatzangaben
↓
İstediğim alanları seç
↓
Seçilen alanlar CV’de görünsün
↓
CV veya edit panelinden bölüme tıkla
↓
İçeriği düzenle
↓
Maddeler ekle / sil / sırala
↓
İstediğim bölümü göster veya gizle
↓
Live Preview anında güncellensin

==================================================
1. ANA BÖLÜM
==================================================

Semantic ana bölüm:

sectionType:
`knowledge-additional`

Default title:

**Kenntnisse & Zusatzangaben**

Requirement:

RECOMMENDED

Yani kullanıcı bu bölümün tamamını gösterebilir veya gizleyebilir.

Bu bölüm eski:

„Besondere Kenntnisse“

semantic alanının daha esnek kullanıcı arayüzü karşılığı olarak kullanılabilir.

==================================================
2. ALT BÖLÜMLER
==================================================

Kullanıcı aşağıdaki hazır Bausteinlerden istediğini seçebilsin:

- Kenntnisse
- Fachliche Kenntnisse
- IT-Kenntnisse
- Softwarekenntnisse
- Technologien
- Tools
- Methoden
- Kernkompetenzen
- Technische Schwerpunkte
- Stärken
- Soft Skills
- Sprachen
- Zertifikate
- Weiterbildungen
- Projekte
- Projekt-Highlight
- Branchenkenntnisse
- Führerschein
- Ehrenamt
- Auszeichnungen
- Publikationen
- Interessen
- Sonstige Angaben

Bu liste genişletilebilir olmalıdır.

==================================================
3. SEÇİM EKRANI
==================================================

Editor içinde:

**Kenntnisse & Zusatzangaben**

başlığının altında modern bir seçim alanı oluştur.

Örneğin:

Bereiche auswählen

[✓] Kernkompetenzen
[✓] Technische Schwerpunkte
[ ] Stärken
[ ] Sprachen
[✓] Zertifikate
[ ] Weiterbildungen
[✓] Projekt-Highlight
[ ] IT-Kenntnisse
[ ] Tools

+ Eigenen Bereich hinzufügen

Checkbox/toggle açıldığı anda bölüm CV preview’da görünmelidir.

Kapatıldığında içerik silinmeden CV’den gizlenmelidir.

==================================================
4. CONTENT VE VISIBILITY AYRIMI
==================================================

Çok önemli:

Ausblenden
≠
Löschen

Kullanıcı bir bölümü gizlediğinde mevcut verileri korunmalıdır.

Örneğin:

Stärken

içinde 5 madde varsa kullanıcı Stärken’i kapattığında maddeler database/state içinde kalmalı.

Daha sonra tekrar açıldığında geri gelmelidir.

==================================================
5. CV’DE ANINDA GÖSTER
==================================================

Kullanıcı:

[✓] Kernkompetenzen

seçtiğinde CV üzerinde:

KERNKOMPETENZEN

başlığı görünmelidir.

Kullanıcı:

[✓] Zertifikate

seçtiğinde:

ZERTIFIKATE

section’ı eklenmelidir.

Live Preview refresh için sayfanın yeniden açılması gerekmemelidir.

==================================================
6. CV ÜZERİNDEN DÜZENLEME
==================================================

Kullanıcı CV preview’da:

KERNKOMPETENZEN

başlığına veya section alanına tıklarsa doğrudan ilgili editor açılmalıdır.

Örneğin:

CV:
KERNKOMPETENZEN

↓ click

Sol editor:

KERNKOMPETENZEN

Titel:
[Kernkompetenzen]

Sichtbar:
[✓]

Position:
[Linke Spalte ▼]

Darstellung:
[Liste ▼]

Inhalte:
[...]

==================================================
7. ALT MADDE EKLEME
==================================================

Basit liste bölümlerinde kullanıcı madde madde içerik ekleyebilsin.

Örneğin:

KERNKOMPETENZEN

[Prozessanalyse                    ] [↑][↓][×]
[Datenanalyse                      ] [↑][↓][×]
[Strukturierte Problemlösung       ] [↑][↓][×]

+ Punkt hinzufügen

Enter ile yeni satır eklemek de desteklenebilir.

==================================================
8. MADDE BAZLI GÖRÜNÜRLÜK
==================================================

Sadece section değil, section içindeki tek tek maddeler de gösterilip gizlenebilsin.

Örneğin:

TECHNISCHE SCHWERPUNKTE

[✓] Monitoring & Visualisierung
[✓] API-Integration
[ ] Grafana / PRTG
[✓] Softwareentwicklung

Böylece kullanıcı her Bewerbung için CV’yi özelleştirebilir.

==================================================
9. MADDE SIRALAMA
==================================================

Her alt madde:

↑
↓

ile sıralanabilsin.

Drag & Drop opsiyonel olarak eklenebilir.

==================================================
10. BÖLÜM YENİDEN ADLANDIRMA
==================================================

Her alt bölüm yeniden adlandırılabilsin.

Örneğin:

Kernkompetenzen
→ Fachliche Kompetenzen

Technische Schwerpunkte
→ IT & Technik

Stärken
→ Persönliche Stärken

Zertifikate
→ Zertifikate & Qualifikationen

Semantic type değişmemelidir.

Örnek:

semanticType:
`core-competencies`

displayTitle:
`Fachliche Kompetenzen`

==================================================
11. CUSTOM BÖLÜM
==================================================

Kullanıcı:

+ Eigenen Bereich hinzufügen

ile kendi bölümünü oluşturabilsin.

Örneğin:

Kundenservice-Kompetenzen

SAP-Kenntnisse

Open-Source

Branchenerfahrung

Persönliche Stärken

Yeni bölüm diğer hazır bölümlerle aynı özelliklere sahip olmalıdır.

==================================================
12. FARKLI İÇERİK TİPLERİ
==================================================

Her bölüm yalnızca bullet list olmak zorunda değildir.

Destekle:

- bullet-list
- text-list
- icon-list
- skill-level
- tags
- compact-grid
- language-level
- certificate-list
- timeline
- project-highlight

==================================================
13. KENNTNISSE
==================================================

Kenntnisse için örnek:

MS Excel
Sehr gute Kenntnisse

Java
Fortgeschritten

Git
Gute Kenntnisse

Model:

name
level
description?
visible

==================================================
14. STÄRKEN
==================================================

Stärken basit bullet-list olarak başlayabilir.

Örneğin:

• Strukturierte Arbeitsweise
• Lernbereitschaft
• Zuverlässigkeit

Ancak bu değerleri sistem uydurmamalıdır.

Kullanıcı tarafından girilmelidir.

==================================================
15. SPRACHEN
==================================================

Sprachen özel renderer kullanabilsin.

Örneğin:

Deutsch    C1
Englisch   B2

Alanlar:

language
level
levelSystem
visible

==================================================
16. ZERTIFIKATE
==================================================

Zertifikate item yapısı:

title
issuer?
date?
credentialId?
url?
visible

CV’de compact veya detail görünümü seçilebilsin.

==================================================
17. WEITERBILDUNGEN
==================================================

Weiterbildungen:

title
provider
date
description

taşıyabilsin.

Kullanıcı isterse:

Kenntnisse & Zusatzangaben altında kompakt

veya:

ayrı Hauptabschnitt

olarak gösterebilsin.

==================================================
18. PROJEKT-HIGHLIGHT
==================================================

Projekt-Highlight desteklenmelidir.

Alanlar:

Projekttitel
Rolle
Zeitraum
Kurzbeschreibung
Technologien
Aufgaben
Ergebnis
GitHub / URL

Kullanıcı bunu:

Kenntnisse & Zusatzangaben

altından aktive edebilsin.

Ancak template uygunsa CV’de ana geniş içerik alanında render edilebilsin.

==================================================
19. PEHLIONE WHITE BLUE
==================================================

Pehlione White Blue için default seçim:

Kenntnisse & Zusatzangaben

altında:

[✓] Kernkompetenzen
[✓] Technische Schwerpunkte
[ ] Stärken
[ ] Sprachen
[ ] Zertifikate
[✓/optional] Projekt-Highlight
[ ] Weiterbildungen

olabilir.

Bu yalnızca default preset’tir.

Son kararı kullanıcı vermelidir.

==================================================
20. TEMPLATE’LER ARASINDA FARKLILIK
==================================================

Her CV template aynı alt bölümleri default olarak göstermek zorunda değildir.

Örneğin:

Pehlione White Blue:
- Kernkompetenzen
- Technische Schwerpunkte
- Projekt-Highlight

Modern:
- Kenntnisse
- Sprachen

Stilvoll:
- Kenntnisse
- Stärken
- Sprachen

Klassisch:
- Kenntnisse
- Zertifikate

Ancak kullanıcı istediğinde bu defaultları değiştirebilmelidir.

==================================================
21. TEMPLATE DEĞİŞİMİNDE VERİ KORUNSUN
==================================================

Örneğin:

Pehlione
→ Modern
→ Klassisch
→ Pehlione

geçişinde kullanıcının:

- Kernkompetenzen
- Stärken
- Zertifikate
- Projekt-Highlight
- custom blocks

verileri kaybolmamalıdır.

Template yalnızca presentation layer olmalıdır.

==================================================
22. BÖLÜM KONUMU
==================================================

Her aktif Baustein için:

Position

seçeneği göster.

Template destekliyorsa:

[ Linke Spalte ]
[ Rechte Spalte ]
[ Volle Breite ]

veya semantic slot isimleri:

[ Sidebar ]
[ Hauptbereich ]
[ Volle Breite ]

kullanılabilir.

==================================================
23. KOLON DEĞİŞTİRME
==================================================

Preview’da section controls:

←
↑
↓
→

olsun.

Anlam:

← başka uygun sol slot
→ başka uygun sağ slot
↑ yukarı
↓ aşağı

Template izin vermiyorsa ilgili arrow disabled olmalıdır.

==================================================
24. SECTION ORDER
==================================================

Örneğin kullanıcı şu düzeni oluşturabilsin:

LEFT / SIDEBAR:

1. Persönliche Daten
2. Kernkompetenzen
3. Technische Schwerpunkte
4. Sprachen

RIGHT / MAIN:

1. Kurzprofil
2. Berufserfahrung
3. Bildungsweg
4. Projekt-Highlight
5. Weiterbildungen

Ve bunu istediği zaman değiştirebilsin.

==================================================
25. ANA CONTAINER BAŞLIĞI
==================================================

Kullanıcı:

„Kenntnisse & Zusatzangaben“

üst başlığının final CV’de görünüp görünmeyeceğini seçebilsin.

Toggle:

[ ] Übergeordneten Titel im Lebenslauf anzeigen

Kapalıysa final CV:

KERNKOMPETENZEN

TECHNISCHE SCHWERPUNKTE

SPrachen

şeklinde gösterilebilir.

Açıksa:

KENNTNISSE & ZUSATZANGABEN

altında ilgili alt bölümler render edilebilir.

==================================================
26. EDITOR UI
==================================================

Sol panelde örnek yapı:

KENNTNISSE & ZUSATZANGABEN

Aktive Bereiche

☑ Kernkompetenzen
   Position: Sidebar
   [Bearbeiten]

☑ Technische Schwerpunkte
   Position: Sidebar
   [Bearbeiten]

☐ Stärken

☑ Projekt-Highlight
   Position: Hauptbereich
   [Bearbeiten]

☐ Zertifikate

☐ Sprachen

+ Bereich hinzufügen

==================================================
27. SECTION CARD
==================================================

Aktif bölüm açıldığında:

KERNKOMPETENZEN

Sichtbar                    [✓]

Titel
[Kernkompetenzen]

Position
[Sidebar ▼]

Darstellung
[Liste ▼]

Inhalt

[Prozessanalyse            ] [↑][↓][×]
[Datenanalyse              ] [↑][↓][×]

+ Punkt hinzufügen

[Umbenennen]
[Ausblenden]
[Löschen]

==================================================
28. PREVIEW ↔ EDITOR SENKRONİZASYONU
==================================================

Çift yönlü çalışmalıdır.

Editor’dan section seç:

→ Preview ilgili section’a scroll eder.

Preview’dan section’a tıkla:

→ Editor ilgili section’ı açar.

==================================================
29. APPLICATION-SPECIFIC CV
==================================================

Bu özellik Bewerbungs-spezifisch kullanılmalıdır.

Örneğin kullanıcı aynı master profile ile:

Java Developer Bewerbung

için:

Kernkompetenzen
Technologien
Projekt-Highlight

gösterebilir.

Sachbearbeiter Bewerbung

için:

Stärken
Prozesskenntnisse
Weiterbildungen

gösterebilir.

Master profile içerikleri korunmalıdır.

==================================================
30. CONTENT HIERARCHY
==================================================

State hierarchy:

Profile Base Content
↓
Resume Content
↓
Template Defaults
↓
Application-specific Visibility & Placement
↓
User Layout Overrides

şeklinde çalışmalıdır.

==================================================
31. DESIGN İLE ENTEGRASYON
==================================================

Kenntnisse & Zusatzangaben altındaki bütün Bausteinler ortak:

ApplicationDesignProfile
+
ResumeDesignTokens

kullanmalıdır.

Yani:

font
text color
accent color
heading style
spacing
line style

CV’nin geri kalanıyla uyumlu olmalıdır.

==================================================
32. INDIVIDUAL SECTION STYLE
==================================================

Advanced modda kullanıcı belirli section için küçük override yapabilsin.

Örneğin:

Kernkompetenzen:
- icon/no icon
- grid/list
- title color

Ancak default ortak design system kullanılmalıdır.

==================================================
33. VALIDATION
==================================================

Kenntnisse & Zusatzangaben Recommended olduğu için tamamen kapalıysa export engellenmemelidir.

Yalnızca INFO veya WARNING:

„Der Bereich Kenntnisse & Zusatzangaben ist ausgeblendet.“

verilebilir.

==================================================
34. EMPTY SECTION
==================================================

Aktif ama içeriği olmayan section final PDF’e otomatik boş başlık olarak basılmamalıdır.

Örneğin:

Stärken visible=true
items=[]

ise editor warning versin:

„Dieser Bereich enthält noch keine Angaben.“

Export:
template/config politikasına göre gizlenebilir.

==================================================
35. MODERN UX
==================================================

Amaç kullanıcıya yüzlerce ayarı aynı anda göstermek değildir.

Önce:

Bereich auswählen

sonra:

Inhalt bearbeiten

sonra:

Position bestimmen

sonra gerekirse:

Darstellung anpassen

mantığı kullan.

==================================================
36. TYPESCRIPT MODELİ
==================================================

Gerekirse şu typed modelleri oluştur veya mevcut modelleri genişlet:

KnowledgeAdditionalSection

ResumeBlockDefinition

ResumeBlockInstance

ResumeBlockItem

ResumeBlockRendererType

ResumeBlockPlacement

Örneğin:

ResumeBlockInstance {
    id
    type
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
37. KABUL KRİTERLERİ
==================================================

Görev ancak aşağıdakiler çalışıyorsa tamamlanmış sayılmalıdır:

1. `Kenntnisse & Zusatzangaben` Lebenslauf sisteminde mevcut.
2. Kullanıcı alt bölümleri kendisi seçebiliyor.
3. Seçilen bölüm CV’de anında görünüyor.
4. Kullanıcı preview’daki bölüme tıklayıp düzenleyebiliyor.
5. Kullanıcı bölüm başlığını değiştirebiliyor.
6. Kullanıcı bölümü gizleyebiliyor.
7. Gizleme içeriği silmiyor.
8. Kullanıcı bölüm içine madde ekleyebiliyor.
9. Maddeler sıralanabiliyor.
10. Maddeler ayrı ayrı gizlenebiliyor.
11. Custom bölüm eklenebiliyor.
12. Zertifikate özel veri tipiyle çalışıyor.
13. Sprachen özel veri tipiyle çalışıyor.
14. Weiterbildungen eklenebiliyor.
15. Projekt-Highlight eklenebiliyor.
16. İki kolonlu CV’de section konumu seçilebiliyor.
17. Sol/sağ/full-width placement çalışıyor.
18. Template değişiminde içerik kaybolmuyor.
19. Application-specific görünürlük destekleniyor.
20. PDF ve DOCX preview ile aynı section seçimini kullanıyor.

==================================================
38. UYGULAMA SIRASI
==================================================

1. mevcut Besondere-Kenntnisse modelini analiz et
2. görünür adını `Kenntnisse & Zusatzangaben` olarak güncelle
3. flexible block registry’yi bağla
4. hazır block listesini oluştur
5. block selection UI oluştur
6. custom block oluşturmayı ekle
7. block edit form oluştur
8. bullet item editing ekle
9. item visibility ekle
10. section visibility ekle
11. rename ekle
12. placement/slot sistemini bağla
13. preview click/edit senkronizasyonunu kur
14. template defaultlarını bağla
15. application-specific overrides ekle
16. DesignTokens ile entegre et
17. PDF/DOCX renderer'ı güncelle
18. testleri ekle

==================================================
39. SONUÇ
==================================================

`Kenntnisse & Zusatzangaben` artık sabit bir metin alanı olmamalıdır.

Bu bölüm kullanıcının CV’sini başvuruya göre kurduğu esnek bir yapı olmalıdır.

Örneğin kullanıcı tek bir Bewerbung’da:

KERNKOMPETENZEN
• Prozessanalyse
• Datenanalyse
• Dokumentation

TECHNISCHE SCHWERPUNKTE
• API-Integration
• Monitoring

PROJEKT-HIGHLIGHT
Grafana Datasource Plugin für PRTG

gösterebilir.

Başka bir Bewerbung’da ise:

STÄRKEN
• Strukturierte Arbeitsweise
• Zuverlässigkeit

SPRACHEN
Deutsch – C1
Englisch – B2

ZERTIFIKATE
...

gösterebilir.

Ana prensip:

**Kullanıcı önce hangi Inhalte/Bausteine istediğine karar verir; uygulama bunları seçilen Lebenslauf template'inin tasarımına uygun şekilde render eder ve kullanıcı CV üzerinde bunları istediği zaman yeniden düzenleyebilir.**
```
