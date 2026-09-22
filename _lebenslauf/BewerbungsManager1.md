* Konu: **Yeni Lebenslauf sistemiyle birlikte Word/DOCX üretiminin de tamamen aynı veri, bölüm, tasarım ve şablon sistemi üzerinden çalışması**
* İstenilen çıktı: **Profile ve Lebenslauf Editor’da girilen/değiştirilen tüm verilerin yalnızca ekrandaki A4 Preview ve PDF’de değil, oluşturulan Word `.docx` Lebenslauf dosyalarında da aynı şekilde çalışması; Word için ayrı ve çakışan ikinci bir veri sistemi oluşturulmaması**
* Kullanılacak framework: **RASCEF**
* Senin yazacağın prompt:

```text
Mevcut ana BewerbungsManager geliştirme talimatlarına aşağıdaki gereksinimleri zorunlu olarak ekle.

Yeni kuracağımız Lebenslauf sistemi yalnızca React Preview ve PDF için tasarlanmayacak.

WORD / DOCX ÇIKTISI DA BİRİNCİ SINIF ÇIKTI FORMATIDIR.

Repository:
https://github.com/mustafa-oezdemir/bewerbung_manager.git

Projede mevcut Word altyapısını önce incele.

Özellikle:

- bewerbung-studio/electron/documents.ts
- bewerbung-studio/electron/templates/
- template-placeholder.service.ts
- template-mapper.ts
- template-scanner.ts
- template-preview.service.ts
- public/templates/
- mevcut *_Lebenslauf_Muster.docx
- mevcut *_Lebenslauf_ATS.docx
- DOCX ile ilgili testler
- docxtemplater
- pizzip

altyapısını incele.

Yeni sistem tasarlanırken Word üretimini sonradan eklenen ayrı bir özellik olarak düşünme.

==================================================
1. TEK CANONICAL VERİ MODELİ
==================================================

Aynı Lebenslauf için ayrı ayrı:

React data
PDF data
Word data

oluşturma.

Tek kaynak:

ApplicantProfile
        +
Resume Content
        +
Resume Configuration
        +
Template Configuration
        +
Design Settings

olmalıdır.

Bundan:

                 Canonical Resume Model
                         │
             createResumeViewModel(...)
                         │
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓
     React Preview      PDF            DOCX

üretilmelidir.

Word için ikinci bir profile modeli veya ikinci bir Lebenslauf içeriği oluşturma.

==================================================
2. PROFILE'DA DEĞİŞEN VERİ WORD'DE DE DEĞİŞMELİ
==================================================

Kullanıcı Profile veya Lebenslauf Editor içinde örneğin:

- Vorname
- Nachname
- Berufsbezeichnung
- Kurzprofil
- Berufserfahrung
- Bildungsweg
- Kenntnisse
- Kernkompetenzen
- Sprachen
- Zertifikate
- Projekte
- Interessen
- Custom Sections

değiştirdiğinde aynı veri:

A4 Preview
PDF
DOCX

üçünde de kullanılmalıdır.

Örneğin kullanıcı:

"Kernkompetenzen"

başlığını:

"Fachliche Kompetenzen"

olarak değiştirirse Word Lebenslauf'ta da aynı başlık görünmelidir.

==================================================
3. SECTION VISIBILITY WORD'E UYGULANSIN
==================================================

Kullanıcı Lebenslauf Editor içinde bir bölümü:

sichtbar / unsichtbar

yaptığında Word çıktısında da aynı davranış uygulanmalıdır.

Örneğin:

Bewerbungsfoto = aus
Interessen = aus
Kurzprofil = an
Kenntnisse = an
Unterschrift = an

ise DOCX de aynı yapıda oluşturulmalıdır.

Gizlenmiş bir section için Word içinde boş başlık veya boş paragraf bırakma.

==================================================
4. SECTION ORDER WORD'DE DE AYNI OLMALI
==================================================

Kullanıcı bölümleri sürükleyerek:

Kurzprofil
Berufserfahrung
Bildungsweg
Kernkompetenzen
Sprachen

şeklinde sıraladıysa Word dosyası mümkün olduğu ölçüde aynı semantic sırayı kullanmalıdır.

Section sıralamasını DOCX template içine hard-code ederek canonical configuration'dan koparma.

==================================================
5. CUSTOM SECTIONS
==================================================

Yeni generic block/section sistemi Word tarafından da desteklenmelidir.

Örneğin kullanıcı:

Weiterbildungen
Führerschein
Ehrenamt
Publikationen
Auszeichnungen
Projekte
Methoden
Tools
Vertriebskompetenzen
Pflegekompetenzen
Maschinen & Werkzeuge
Eigener Bereich

eklerse bunlar yalnızca React template'lerinde değil Word çıktısında da üretilebilmelidir.

Custom section'ların Word üretimi için mümkünse generic loop/block sistemi kullan.

Her yeni section için documents.ts içine ayrı özel kod eklemek zorunda kalmayalım.

==================================================
6. WORD TEMPLATE ADAPTER
==================================================

Word üretimi için ortak bir adapter katmanı tasarla.

Örneğin:

ResumeViewModel
      ↓
WordResumeMapper
      ↓
WordTemplateData
      ↓
docxtemplater
      ↓
DOCX

`WordTemplateData` canonical ResumeViewModel'den türetilmelidir.

Burada:

template-specific formatting

olabilir;

fakat:

business data

yeniden oluşturulmamalıdır.

==================================================
7. WORD PLACEHOLDER SİSTEMİNİ GELİŞTİR
==================================================

Mevcut placeholder altyapısını incele ve gerekiyorsa geliştir.

Basit placeholder:

{firstName}

yanında liste/loop desteği kullan.

Örneğin kavramsal olarak:

{#experiences}
{from}
{to}
{role}
{company}
{city}
{#achievements}
...
{/achievements}
{/experiences}

Benzer şekilde:

education
languages
knowledge blocks
custom sections
certifications
projects

için generic mapping kullanılabilmelidir.

Ancak mevcut docxtemplater syntax ve mevcut projedeki implementation'a göre gerçek doğru çözümü oluştur.

Syntax'ı incelemeden varsayım yapma.

==================================================
8. WORD'DE DESIGN AYARLARI
==================================================

Yeni design system yalnızca HTML/CSS Preview'a uygulanmamalıdır.

Mümkün olan ayarlar Word çıktısına da aktarılmalıdır.

Özellikle:

- font family
- heading font
- body font size
- heading font size
- text color
- heading color
- accent color
- line color
- paragraph spacing
- section spacing
- line spacing
- page margins
- column width
- sidebar width
- alignment

Word teknik sınırları içerisinde uygulanmalıdır.

==================================================
9. WORD İÇİN DESIGN TOKEN MAPPING
==================================================

Doğrudan CSS değerlerini Word'e göndermeye çalışma.

Ortak design token:

ResumeDesignTokens

oluşturulabilir.

Sonra:

React:
tokens → CSS variables

Word:
tokens → DOCX styles/XML/template mapping

PDF:
React/print renderer veya mevcut PDF pipeline

şeklinde kullanılabilir.

Örneğin:

ResumeDesignTokens {
    typography
    colors
    spacing
    page
    columns
}

Tek değer farklı renderer'lara uygun biçimde çevrilmelidir.

==================================================
10. TEMPLATE DEFAULT + USER OVERRIDE
==================================================

Örneğin kullanıcı:

Elegant

seçtiğinde Word tarafında da Elegant'a ait professional defaults uygulanmalıdır.

Sonra kullanıcı:

font
font size
accent color
spacing
column width

değiştirirse mümkün olan ayarlar Word çıktısına da yansıtılmalıdır.

Resolution:

Template Defaults
        ↓
Global Document Settings
        ↓
Resume Settings
        ↓
User Overrides
        ↓
Resolved ResumeDesignTokens
        ↓
React / PDF / DOCX

olmalıdır.

==================================================
11. COLUMN WIDTH WORD'DE DE DESTEKLENSİN
==================================================

İki sütunlu CV'lerde kullanıcı örneğin:

32% / 68%

ayarladıysa:

Preview
PDF
Word

mümkün olduğunca aynı oranı kullanmalıdır.

Word table/section/column mekanizmasını kullanıyorsa gerçek column width değerlerine dönüştür.

Word için ayrı sabit:

30 / 70

hard-code etme.

==================================================
12. WORD VE PREVIEW GÖRSEL PARİTESİ
==================================================

Pixel-perfect birebir eşleşme her zaman mümkün olmayabilir.

Ama amaç:

Preview ≈ PDF ≈ Word

olmalıdır.

Özellikle:

- bilgi sırası
- bölüm başlıkları
- görünürlük
- renk kimliği
- font ailesi
- font büyüklüğü
- sütun oranı
- section spacing

mümkün olduğunca eşleşmelidir.

Renderer teknik farklılıklarını kullanıcı verisi farkına dönüştürme.

==================================================
13. ATS WORD
==================================================

Mevcut:

*_Lebenslauf_ATS.docx

altyapısını koru ve yeni canonical sisteme bağla.

Visual ve ATS Word ayrı DATA MODEL kullanmamalıdır.

Aynı content:

ResumeViewModel
        ↓
Visual Word Adapter
ve
ATS Word Adapter

tarafından render edilmelidir.

ATS DOCX:

- tek sütunlu
- lineer
- sade
- dekorasyonsuz
- section sırası açık
- tablo kullanımında ATS risklerini dikkate alan
- okunabilir

olmalıdır.

==================================================
14. WORD TEMPLATE'LERİN SAYISINI YÖNETİLEBİLİR TUT
==================================================

10-15 template varsa her Word dosyası için tamamen ayrı business logic yazma.

İdeal olarak:

TemplateDefinition
TemplateCapabilities
WordTemplateDefinition

kullan.

Örneğin:

WordTemplateDefinition {
    templateId
    visualTemplate
    atsTemplate
    supportsPhoto
    supportsTwoColumns
    supportsCustomSections
    ...
}

gibi declarative yapı değerlendirilebilir.

Gerçek mevcut mimariye göre doğru type isimlerini belirle.

==================================================
15. WORD CUSTOMIZATION SINIRLARI
==================================================

Word teknik olarak React/CSS kadar serbest olmayabilir.

Bu durumda kullanıcıya yalan söyleme.

Örneğin belirli bir background effect Word'de güvenilir üretilemiyorsa:

- PDF/Preview'da kullan
- Word'de güvenli fallback kullan

Ama içerik hiçbir durumda kaybolmamalıdır.

Fallback mantığı merkezi olmalıdır.

==================================================
16. WORD DOSYASI OTOMATİK KAYDEDİLSİN
==================================================

First-run sırasında seçilen BewerbungsManager workspace root sistemi Word belgeleri için de kullanılmalıdır.

Kullanıcı her Word export'ta klasör seçmemelidir.

Örneğin:

WorkspaceRoot/
├── Anschreiben/
├── Lebenslauf/
├── Bewerbungsunterlagen/
...

Bir Bewerbung için Lebenslauf DOCX otomatik olarak mevcut naming convention'a göre:

Lebenslauf/
└── Firma_Datum/
    └── Position/
        └── Firma_Datum_Lebenslauf.docx

gibi doğru yere kaydedilmelidir.

Aynı prensip Anschreiben DOCX için de geçerlidir.

==================================================
17. WORD DOSYALARINI BACKUP'A DAHİL ET
==================================================

Yeni storage migration/backup sistemi:

*.docx

dosyalarını da mutlaka kapsamalıdır.

Özellikle:

- Anschreiben DOCX
- Lebenslauf DOCX
- mevcut Muster DOCX
- kullanıcı tarafından üretilmiş Word belgeleri

veri migration sırasında kaybolmamalıdır.

==================================================
18. WORD TEMPLATE DOSYALARI İLE USER DATA'YI AYIR
==================================================

Bundled templates:

public/templates/

ile kullanıcı tarafından oluşturulan Bewerbung Word belgelerini birbirine karıştırma.

Template assets uygulama kaynaklarıdır.

Generated documents kullanıcı verisidir.

Backup/migration davranışını buna göre tasarla.

==================================================
19. WORD REGENERATION
==================================================

Profile verisi değiştiğinde mevcut Word dosyasının davranışını açık şekilde belirle.

Tercihen:

canonical data her zaman source of truth olsun.

Kullanıcı uygulama üzerinden:

"Word aktualisieren"

veya normal document generation yaptığında DOCX canonical veriden yeniden oluşturulsun.

Mevcut Word dosyasından kullanıcı verisini geri okuyarak Profile'ı değiştirmeye çalışma.

Word dosyası OUTPUT'tur.

Canonical data değildir.

==================================================
20. MANUEL WORD DÜZENLEMESİ
==================================================

Kullanıcı generated DOCX'i Microsoft Word'de sonradan manuel değiştirebilir.

Uygulama bu değişiklikleri otomatik olarak canonical profile verisi kabul etmemelidir.

Aksi halde çift yönlü synchronization çok karmaşık ve riskli olur.

Temel yön:

BewerbungsManager
        ↓
DOCX

olmalıdır.

Word → BewerbungsManager import/sync ayrı ve ileride yapılabilecek bir özellik olarak düşünülmelidir.

==================================================
21. ANSCHREIBEN WORD SİSTEMİNİ BOZMA
==================================================

Mevcut çalışan Anschreiben DOCX generation sistemini gereksiz yere yeniden yazma.

Ama yeni shared:

Typography
Colors
Fonts

ayarlarının Anschreiben + Deckblatt + Lebenslauf üzerinde tutarlı çalışması gerekiyorsa ortak Design Token katmanını kullan.

Örneğin:

Application Design
├── Shared Identity
│   ├── Font
│   ├── Heading Font
│   ├── Accent
│   └── Text Color
│
├── Anschreiben Overrides
├── Deckblatt Overrides
└── Lebenslauf Overrides

şeklinde olabilir.

==================================================
22. TESTLER
==================================================

Word için ayrıca test ekle.

Kontrol et:

- Profile verisi DOCX'e gidiyor
- custom section title DOCX'e gidiyor
- custom section content DOCX'e gidiyor
- hidden section DOCX'te görünmüyor
- section order korunuyor
- experience sırası korunuyor
- education sırası korunuyor
- knowledge blocks korunuyor
- template switch veri kaybettirmiyor
- Visual Word oluşturuluyor
- ATS Word oluşturuluyor
- font/design mapping çalışıyor
- column ratio mapping çalışıyor
- workspace içindeki doğru folder'a kayıt yapılıyor
- filename güvenli oluşturuluyor
- eski Word dosyaları migration backup'ında korunuyor

Mevcut:

electron/documents.test.ts

ve diğer uygun testleri inceleyerek bunları mevcut test mimarisine entegre et.

==================================================
23. WORD QA
==================================================

DOCX sadece dosyanın oluşturulmuş olmasıyla başarılı kabul edilmemelidir.

Mümkünse test/QA seviyesinde:

- DOCX ZIP yapısı geçerli
- gerekli XML dosyaları mevcut
- placeholder kalmamış
- oluşturulan metin mevcut
- section sırası doğru
- dosya Word tarafından açılabilecek yapıda

kontrol et.

Mevcut Word QA scriptleri varsa yeniden kullan.

==================================================
24. YENİ MİMARİ KARARI
==================================================

Yeni Lebenslauf sisteminin temel prensibi artık şu olmalıdır:

                     USER PROFILE
                          │
                          ↓
                  CANONICAL RESUME DATA
                          │
                          ↓
                   SEMANTIC SECTIONS
                          │
                          ↓
                  RESUME CONFIGURATION
                          │
                          ↓
                RESOLVED RESUME VIEW MODEL
                     /          |          \
                    /           |           \
                   ↓            ↓            ↓
             React/A4          PDF          Word
                                           /   \
                                          ↓     ↓
                                      Visual   ATS

Bu yapıdan ayrılma.

==================================================
25. İLK ANALİZDE WORD'U DA İNCELE
==================================================

İlk architecture analizinde artık aşağıdaki başlıkları da ekle:

CURRENT WORD ARCHITECTURE

CURRENT DOCX TEMPLATE SYSTEM

DOCX PLACEHOLDER MODEL

WORD DATA MAPPING

WORD DESIGN LIMITATIONS

SHARED PREVIEW/PDF/DOCX DATA MODEL

VISUAL DOCX STRATEGY

ATS DOCX STRATEGY

WORD TEMPLATE MIGRATION

WORD BACKUP STRATEGY

WORD TEST STRATEGY

==================================================
26. SON KURAL
==================================================

Yeni bir Lebenslauf özelliği geliştirirken kendine her zaman şu soruyu sor:

"Bu değişiklik yalnızca React Preview'da mı çalışıyor, yoksa PDF ve Word çıktısında da doğru çalışıyor mu?"

Örneğin yeni bir:

- section
- custom title
- visibility
- block
- column setting
- typography setting
- color
- spacing

özelliği ekliyorsan gerektiği yerde:

Preview
PDF
DOCX Visual
DOCX ATS

davranışını birlikte değerlendir.

Yalnızca ekranda çalışan ama gerçek Word Lebenslauf'a aktarılmayan yarım özellik geliştirme.
```
