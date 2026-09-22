Mevcut proje:

https://github.com/mustafa-oezdemir/bewerbung_manager.git

BewerbungsManager projesinin mevcut kodunu önce güncel repository üzerinden ayrıntılı şekilde incele.

Önceki Lebenslauf sistemi konusunda artık daha fazla mimari esnekliğe sahipsin:

ESKİ SİSTEMİ MUTLAKA KORUMAK ZORUNDA DEĞİLSİN.

Eğer mevcut:

- resumeSections
- resumeSectionTitles
- resumeSectionLayout
- resumeSectionLayouts
- resumeSemanticSections
- resumeKnowledgeGroups
- specialSections
- knowledgeSection
- strengths
- skills
- certifications
- languages
- template-specific eski ayarlar

yeni mimariyi gereksiz şekilde karmaşıklaştırıyorsa, eski sistemi güvenli biçimde yedekledikten sonra yeni ve temiz bir Lebenslauf sistemi kurabilirsin.

Ancak VERİ KAYBI kesinlikle kabul edilemez.

==================================================

1. ÖNCE TAM YEDEK
   ===============

Herhangi bir destructive migration veya büyük schema değişikliği yapmadan önce mevcut sistemde bulunan TÜM kullanıcı verilerini yedekle.

Yedek şunları kapsamalıdır:

- workspace.json
- Bewerbungen
- Profile
- ApplicantProfile verileri
- Lebenslauf verileri
- Anschreiben verileri
- Deckblatt verileri
- E-Mail içerikleri
- Settings
- Templates ile ilgili kullanıcı ayarları
- Zeugnisse
- Zertifikate
- PDF/DOCX dosyaları
- Fotoğraflar
- Unterschrift
- Attachments
- kullanıcı tarafından oluşturulan custom sections
- mevcut layout/design ayarları
- uygulamanın kullandığı diğer kalıcı kullanıcı verileri

Migration öncesinde otomatik timestamp'li bir backup oluştur:

Backups/
└── Migration_YYYY-MM-DD_HH-mm-ss/
    ├── workspace.json
    ├── ...
    └── migration-manifest.json

`migration-manifest.json` içinde en az:

- migration tarihi
- eski schema version
- yeni schema version
- kaynak path
- backup path
- taşınan/veri dönüştürülen alanlar
- hata/uyarılar

bulunsun.

Backup başarıyla oluşturulmadan migration BAŞLAMAMALI.

==================================================
2. YENİ SİSTEM KURULABİLİR
==============================

Mevcut Lebenslauf mimarisi çok fazla legacy bağımlılık içeriyorsa yeni sistemi temiz şekilde tasarla.

Hedef ayrım:

MASTER PROFILE DATA
        ↓
RESUME CONTENT MODEL
        ↓
SEMANTIC SECTIONS
        ↓
RESUME CONFIGURATION
        ↓
TEMPLATE CAPABILITIES
        ↓
DESIGN TOKENS
        ↓
RESOLVED RESUME VIEW MODEL
        ↓
TEMPLATE RENDERER
        ↓
PREVIEW / PDF / DOCX

Content ile presentation kesin olarak birbirinden ayrılmalıdır.

Örneğin:

Java
Docker
Englisch C1
Berufserfahrung

= CONTENT

"Kernkompetenzen"
"Fachkenntnisse"
"Kenntnisse"

= DISPLAY LABEL

sidebar / main / full

= PLACEMENT

font, renk, spacing, column width

= DESIGN

Elegant / Modern / Pehlione

= TEMPLATE

Bunları aynı veri modeline karıştırma.

==================================================
3. ESKİ VERİLERİ YENİ SİSTEME AKTAR
========================================

Backup aldıktan sonra eski alanlardan yeni modele mümkün olan verileri migrate et.

Örneğin:

old strengths
→ yeni competency/content blocks

old specialSections
→ semantic/custom sections

old resumeSectionTitles
→ section customTitle

old resumeSections
→ visibility

old resumeSectionLayouts
→ template layout preferences

old resumeKnowledgeGroups
→ reusable content blocks

old skills
→ canonical knowledge/skills data

Veri dönüştürülemiyorsa SİLME.

Bunun yerine backup'ta koru ve migration report içine yaz.

Migration mümkün olduğunca deterministic ve test edilebilir olsun.

==================================================
4. CLEAN BREAK YAPABİLİRSİN
==============================

Migration tamamlandıktan sonra yalnızca backwards compatibility uğruna eski mimarinin tamamını uygulama içinde taşımak zorunda değilsin.

Yeni sistem daha temiz olacaksa:

legacy schema
      ↓
one-time migration
      ↓
new schema

yaklaşımını tercih edebilirsin.

Ama eski verilerin güvenli backup'ı mutlaka mevcut olmalıdır.

==================================================
5. SCHEMA VERSION
=================

Yeni sistem için versioned persistence kullan.

Örneğin:

schemaVersion: 2

Uygulama açılırken:

schemaVersion 1
→ backup
→ migration
→ schemaVersion 2

şeklinde çalışabilir.

Migration başarısız olursa eski dosyanın üzerine yazma.

==================================================
6. YENİ FIRST-RUN SETUP
========================

BewerbungsManager ilk kez açıldığında kullanıcıdan çalışma klasörünü seçmesini iste.

Bu soru yalnızca:

- ilk kurulumda
  veya
- henüz workspace path tanımlanmamışsa

gösterilmelidir.

Başlık örneği:

BewerbungsManager einrichten

Açıklama:

"Wo sollen Ihre Bewerbungsunterlagen gespeichert werden?"

Kullanıcı:

"Ordner auswählen"

ile klasör seçsin.

Örneğin kullanıcı:

D:\Bewerbungen

seçerse uygulama gerekli yapıyı otomatik oluştursun.

Örnek:

D:\Bewerbungen
├── data
│   ├── Bewerbungen
│   ├── Backups
│   ├── Muster
│   └── Settings
├── Anschreiben
├── Lebenslauf
├── Bewerbungsunterlagen
├── Zeugnisse
├── Zertifikate
└── Absagen

Mevcut proje yapısını inceleyerek bundan daha uygun bir klasör mimarisi varsa onu kullanabilirsin.

Ancak kullanıcı manuel olarak her Anschreiben için tekrar klasör seçmemelidir.

==================================================
7. ANSCHREIBEN OTOMATİK KAYIT
==============================

İlk kurulumda seçilen workspace root path bundan sonra canonical storage root olmalıdır.

Örneğin:

Workspace:
D:\Bewerbungen

Bir Bewerbung:

Firma: Beispiel GmbH
Datum: 22.09.2026
Position: Softwareentwickler

ise mevcut naming convention'a uygun şekilde:

D:\Bewerbungen\Anschreiben
    Beispiel GmbH_22.09.2026
        Softwareentwickler
            Beispiel GmbH_22.09.2026_Anschreiben.docx

veya mevcut proje convention'ı neyse onu kullan.

Önemli olan:

Kullanıcı ilk kurulumda root folder seçer.

Sonrasında Anschreiben otomatik olarak doğru klasöre kaydedilir.

Her export sırasında tekrar Save As isteme.

Manuel "Speichern unter..." gerekirse ayrıca sunulabilir, fakat normal workflow otomatik olmalıdır.

==================================================
8. SADECE ANSCHREIBEN DEĞİL
=============================

Aynı workspace root mümkün olduğunca:

- Anschreiben
- Lebenslauf
- Bewerbungsmappe
- PDF
- Bewerbungen
- Zeugnisse
- Zertifikate
- Backups

için merkezi temel olmalıdır.

Dosyalar uygulama tarafından deterministik olarak doğru alt klasöre yerleştirilmelidir.

==================================================
9. BOOTSTRAP CONFIG
===================

Workspace yolunu yalnızca workspace.json içinde saklama.

Çünkü program açılırken workspace.json'ın nerede olduğunu bulabilmek için önce root path bilinmelidir.

Bu nedenle Electron'ın platforma uygun uygulama config alanında küçük bir bootstrap config tut.

Örneğin Electron:

app.getPath("userData")

altında:

config.json

veya:

bootstrap.json

İçeriği örneğin:

{
  "workspaceRootPath": "D:\\Bewerbungen",
  "setupCompleted": true
}

olabilir.

Bu dosyada yalnızca uygulamanın workspace'i bulması için gerekli minimum bilgiler olsun.

Asıl kullanıcı verileri seçilmiş workspace altında kalmalıdır.

==================================================
10. PROGRAM AÇILIŞ AKIŞI
===========================

Beklenen startup:

APP START
    ↓
bootstrap config var mı?
    ↓

HAYIR
→ First Run Setup
→ klasör seç
→ izin/yazılabilirlik kontrolü
→ klasör yapısını oluştur
→ bootstrap config kaydet
→ workspace oluştur
→ uygulamayı aç

EVET
→ workspaceRootPath oku
→ klasör erişilebilir mi kontrol et

EVET
→ workspace yükle

HAYIR
→ kullanıcıya anlaşılır hata göster:

"Der gespeicherte Bewerbungsordner wurde nicht gefunden."

Seçenekler:

- Ordner erneut auswählen
- Einstellungen öffnen
- Abbrechen

Sessizce başka klasör oluşturma.

==================================================
11. EINSTELLUNGEN
=================

BewerbungsManager → Einstellungen bölümünde yeni bir alan oluştur:

Speicherort / Bewerbungsordner

Göster:

Aktueller Speicherort:
D:\Bewerbungen

Buton:

"Speicherort ändern"

Ek olarak mümkünse:

"Ordner öffnen"

olsun.

==================================================
12. SPEICHERORT DEĞİŞTİRME
==============================

Kullanıcı Einstellungen üzerinden yeni klasör seçerse mevcut verileri kaybetme.

Doğrudan path string'i değiştirip eski dosyaları geride bırakma.

Kullanıcıya seçenek sun:

1. Bestehende Daten in den neuen Ordner verschieben
2. Bestehende Daten kopieren
3. Nur neuen Speicherort verwenden

Default ve güvenli seçenek:

Bestehende Daten in den neuen Ordner verschieben

olabilir.

Ama işlem öncesinde backup oluştur.

==================================================
13. STORAGE MIGRATION TRANSACTION
=================================

Path değişikliği mümkün olduğunca transaction benzeri çalışmalı:

1. hedef klasörü doğrula
2. yazma yetkisini kontrol et
3. backup oluştur
4. dosyaları copy/move et
5. kopyalanan dosyaları doğrula
6. workspace'i yeni path'ten yükleyerek doğrula
7. ancak bundan sonra bootstrap config path'ini değiştir
8. işlem başarılıysa eski dosyaları gerekiyorsa temizle

Hata durumunda mevcut çalışan path korunmalıdır.

==================================================
14. PATH VALIDATION
===================

Seçilen klasör için kontrol et:

- mevcut mu?
- oluşturulabilir mi?
- yazılabilir mi?
- uygulama tarafından kullanılabilir mi?
- gerekli alt klasörler oluşturulabiliyor mu?

Kullanıcıya teknik hata stack trace'i değil anlaşılır Almanca mesaj göster.

==================================================
15. MEVCUT ENV VARIABLE
=======================

Projede bulunan:

BEWERBUNG_ROOT_PATH

davranışını incele.

Development/test override olarak yararlıysa koru.

Örneğin priority:

BEWERBUNG_ROOT_PATH
        ↓
bootstrap config workspaceRootPath
        ↓
First Run Setup

olabilir.

Ancak normal production kullanıcısının environment variable ayarlamasına gerek olmamalıdır.

==================================================
16. WINDOWS PATH HARD-CODE ETME
===============================

Şu anda README'de bulunan:

D:\bewerbung_mustafa

gibi sabit path production default'u olmamalıdır.

Bu path yalnızca eski sistem/migration kaynağı olarak ele alınabilir.

Yeni production sisteminde kullanıcı ilk kurulumda workspace seçmelidir.

==================================================
17. FIRST-RUN UX
================

İlk kurulum ekranı sade olsun.

Örneğin:

BewerbungsManager

Ihre Bewerbungsunterlagen an einem Ort.

Speicherort
[ D:\Bewerbungen                         ]
[ Ordner auswählen ]

Unter diesem Ordner werden Bewerbungen, Anschreiben,
Lebensläufe und Backups automatisch organisiert.

[ Weiter ]

Kullanıcının anlamadığı teknik ayarlar gösterme.

==================================================
18. KLASÖR SEÇİMİ
=====================

Electron native directory picker kullan.

Renderer'a unrestricted filesystem erişimi verme.

Mevcut güvenlik modelini koru:

contextIsolation: true
nodeIntegration: false
sandbox: true

Directory dialog Electron Main Process üzerinden açılmalıdır.

Typed IPC kullan.

==================================================
19. YENİ LEBENSLAUF SİSTEMİYLE BİRLİKTE ÇALIŞ
====================================================

Storage refactoring ile Lebenslauf refactoring birbirinden tamamen kopuk olmamalıdır.

Yeni sistemde:

Profile data
Resume configuration
Template configuration
Design overrides

workspace içerisinde güvenli şekilde persist edilmelidir.

Template değiştirmek içerik kaybettirmemelidir.

Workspace path değiştirmek de içerik kaybettirmemelidir.

==================================================
20. BACKUP UI
=============

Einstellungen içinde mümkünse:

Datensicherung

bölümü oluştur.

En az:

- Jetzt sichern
- Backup-Ordner öffnen

özellikleri olabilir.

Otomatik backup sistemi zaten mevcutsa onu yeniden yazma; yeni workspace sistemine adapte et.

==================================================
21. GÜVENLİK
==============

File operations için mevcut güvenlik modelini bozma.

Özellikle:

- renderer'dan arbitrary absolute path alma
- path traversal
- relative path escape
- unsafe file names
- overwrite without confirmation

gibi riskleri engelle.

Mevcut filename sanitization yardımcılarını mümkün olduğunca kullan.

==================================================
22. TESTLER
===========

Yeni testler ekle:

First run:

- config yok → setup açılır
- klasör seç → config yazılır
- klasör yapısı oluşur
- app restart → tekrar setup sorulmaz

Storage:

- configured path yüklenir
- missing workspace path
- readonly path
- invalid path
- folder change
- migration success
- migration failure rollback

Backup:

- migration öncesi backup oluşur
- backup başarısızsa destructive migration başlamaz

Schema:

- schema v1 → v2 migration
- eski profile verilerinin korunması
- custom Lebenslauf sections
- knowledge blocks
- experiences
- education
- personal data
- attachments

Resume:

- template switch sırasında content korunur
- section visibility korunur
- custom titles korunur
- design settings korunur

Her önemli aşamada:

npm run typecheck
npm test
npm run build

çalıştır.

==================================================
23. UYGULAMA STRATEJİSİ
=========================

Bu büyük değişikliği tek commit mantığında karmakarışık yapma.

Mantıksal olarak aşamalara böl:

PHASE 1
Mevcut persistence/storage/Lebenslauf mimarisini analiz et.

PHASE 2
Tam backup mekanizmasını güvence altına al.

PHASE 3
First-run workspace setup ve bootstrap config.

PHASE 4
Einstellungen → Speicherort yönetimi.

PHASE 5
Yeni Lebenslauf canonical schema.

PHASE 6
Legacy → new migration.

PHASE 7
Yeni semantic section/block sistemi.

PHASE 8
Template adapter/capability sistemi.

PHASE 9
Yeni Lebenslauf editor ve live preview.

PHASE 10
Eski legacy kodun güvenli temizliği.

Her phase sonrası testleri çalıştır.

==================================================
24. ÖNEMLİ KARAR
==================

Yeni sistem teknik olarak daha temiz ve sürdürülebilir olacaksa eski Lebenslauf iç mimarisini korumaya çalışma.

Öncelik sırası:

1. Kullanıcı verilerinin kaybolmaması
2. Tam backup
3. Basit ve temiz canonical model
4. Kullanıcı dostu UX
5. Template'ler arasında tutarlılık
6. Kolay genişletilebilir mimari
7. Legacy kodu mümkün olduğunca azaltmak

Backward compatibility'yi sonsuza kadar legacy kod taşıyarak değil:

BACKUP
+
MIGRATION
+
VERSIONED SCHEMA

ile çöz.

==================================================
25. İLK ÇALIŞMA
==================

Şimdi hemen kod değiştirmeye başlama.

Önce repository'nin mevcut halini yeniden oku ve bana şu başlıklarla implementation plan hazırla:

CURRENT STORAGE ARCHITECTURE
CURRENT RESUME ARCHITECTURE
LEGACY DATA TO BACK UP
NEW WORKSPACE ARCHITECTURE
FIRST-RUN SETUP DESIGN
SETTINGS STORAGE DESIGN
NEW RESUME DATA MODEL
MIGRATION V1 → V2
BACKUP & ROLLBACK STRATEGY
FILES TO CHANGE
FILES TO REMOVE AFTER MIGRATION
TEST STRATEGY
IMPLEMENTATION PHASES

Özellikle hangi mevcut dosyaların değişeceğini gerçek repository üzerinden belirle.

Teorik olarak dosya adı uydurma.

Planı mevcut kod üzerine kur.

Plan tamamlandıktan sonra  benden onay bekleme git push et .
