
* **Markdown dosya adı:** `20_lebenslauf_builder_professional_erweiterungen_rascef.md`
* **Konu:** Mevcut esnek Lebenslauf Builder'ın profesyonel kullanım, Bewerbung-spezifische Anpassung, içerik yönetimi, layout güvenliği ve Coach/Teilnehmer iş akışı açısından geliştirilmesi
* **İstenilen çıktı:** `Kenntnisse & Zusatzangaben`, section seçimi, sağ/sol kolon yerleşimi ve template sistemine ek olarak; kullanıcıya gerçek fayda sağlayacak içerik varyantları, başvuruya özel CV oluşturma, sayfa kontrolü, otomatik layout optimizasyonu, geçmiş/sürüm yönetimi, completeness, ATS kontrolü ve Coach review gibi gelişmiş özelliklerin mevcut mimariye eklenmesi
* **Kullanılacak framework:** RASCEF
* **Senin yazacağın prompt:**

```text
Sen kıdemli bir Product Architect, ElectronJS + TypeScript geliştiricisi, UI/UX Designer ve profesyonel Bewerbungs-/Lebenslauf sistemleri konusunda uzman bir Software Architect'sin.

Mevcut Lebenslauf Builder artık şu temel özelliklere sahiptir:

- birden fazla Lebenslauf template
- Vorlage wählen
- Design anpassen
- canlı A4 preview
- section bazlı edit
- 9 semantic Lebenslauf alanı
- Kenntnisse & Zusatzangaben
- Kernkompetenzen
- Technische Schwerpunkte
- Stärken
- Zertifikate
- Sprachen
- Weiterbildungen
- Projekt-Highlight
- custom sections
- madde bazlı içerik
- section göster/gizle
- section rename
- iki sütunlu template'lerde sağ/sol/full-width yerleşim
- PDF/DOCX/LibreOffice export

Şimdi bu sistemi profesyonel bir Bewerbung ürünü haline getirecek aşağıdaki geliştirmeleri mevcut mimariye ekle.

==================================================
1. MASTER PROFILE VE BEWERBUNG-VARIANTE AYRIMI
==================================================

En önemli geliştirme budur.

Kullanıcının bütün kariyer bilgileri merkezi bir:

MasterProfile

içinde tutulmalıdır.

Örneğin:

- tüm Berufserfahrung
- tüm Ausbildung
- bütün Skills
- bütün Projekte
- bütün Zertifikate
- bütün Weiterbildungen
- Sprachen
- Stärken
- Kernkompetenzen

burada bulunmalıdır.

Ancak her Bewerbung için yalnızca ilgili bilgiler seçilmelidir.

Model:

MasterProfile
↓
Bewerbungsprofil
↓
Resume Draft
↓
Application-specific Resume

olmalıdır.

Örneğin aynı kullanıcı:

Java Developer Bewerbung

için:
- Java
- Spring Boot
- REST
- SQL
- Java projeleri

gösterirken,

Sachbearbeiter Kundenservice

için:
- Prozessverständnis
- Dokumentation
- strukturierte Arbeitsweise
- relevante Koordinationserfahrung

gösterebilmelidir.

Master Profile değişmemelidir.

==================================================
2. CONTENT LIBRARY
==================================================

Tekrar tekrar aynı metni yazmamak için merkezi:

Inhaltsbibliothek

oluştur.

Örneğin:

Berufserfahrung:
„API-Integration“

için birden fazla bullet varyantı tutulabilir.

Kullanıcı Bewerbung sırasında bunlardan istediğini seçebilir.

Content Library kategorileri:

- Tätigkeiten
- Erfolge
- Skills
- Kompetenzen
- Projekte
- Kurzprofile
- Stärken
- Weiterbildungen
- Zertifikate

==================================================
3. BİR İÇERİĞİN BİRDEN FAZLA VARYANTI
==================================================

Aynı deneyim için farklı anlatım biçimleri destekle.

Örneğin:

Experience:
Grafana Datasource Plugin

Variant A:
teknik odaklı

Variant B:
proces/data odaklı

Variant C:
kısa ATS odaklı

Kullanıcı Bewerbung'a göre varyant seçebilsin.

==================================================
4. BEWERBUNGS-SPEZIFISCHE SICHTBARKEIT
==================================================

Sadece section değil:

- Berufserfahrung entry
- bullet
- skill
- certificate
- project
- Weiterbildung

seviyesinde visibility bulunmalıdır.

Örneğin:

Application A:
Grafana bullet 1–4

Application B:
yalnızca bullet 2 ve 3

Master content korunmalıdır.

==================================================
5. RELEVANZ İŞARETLEME
==================================================

Her CV öğesine kullanıcı relevance verebilsin:

Sehr relevant
Relevant
Optional
Nicht relevant

Bu değer otomatik silme yapmamalıdır.

Ancak CV oluştururken kullanıcıya yardımcı olsun.

Örneğin:

„3 nicht relevante Angaben sind aktuell sichtbar.“

==================================================
6. STELLENANZEIGE İLE EŞLEŞTİRME
==================================================

İleride KI-Coach için altyapı hazırla.

Job Description içindeki:

- Technologien
- Anforderungen
- Aufgaben
- Soft Skills
- Qualifikationen

ile CV öğeleri eşleştirilebilsin.

Ama sistem kullanıcı hakkında yeni bilgi uydurmamalıdır.

Sadece var olan bilgilerden:

„Bu Bewerbung için şunlar daha ilgili olabilir“

önerisi vermelidir.

==================================================
7. PAGE BUDGET
==================================================

Kullanıcı CV'nin ne kadar dolu olduğunu gerçek zamanlı görebilsin.

Örneğin:

Seite 1: 91 %
Seite 2: 63 %

veya:

Dokumentlänge
1,7 Seiten

Göster.

Ama bunu dosya byte ölçüsü değil gerçek layout ölçüsünden hesapla.

==================================================
8. SMART PAGE BALANCING
==================================================

PDF'de bir sayfa aşırı dolu, diğer sayfa aşırı boş olmamalıdır.

Automatic Layout Balancer oluştur.

Şu sırayla optimize et:

1. section spacing
2. item spacing
3. paragraph spacing
4. uygun section'ın sonraki sayfaya taşınması
5. kolon dağılımı
6. izin verilen ölçüde line-height

Font küçültme son çare olmalıdır.

==================================================
9. MANUEL PAGE BREAK
==================================================

Kullanıcı istediği section için:

[ ] Neue Seite davor

seçebilsin.

Örneğin:

Weiterbildungen
→ Seite 2'de başlasın

veya:

Projekte
→ Neue Seite

Ancak default automatic pagination olsun.

==================================================
10. LAYOUT HEALTH CHECK
==================================================

Canlı kontrol sistemi oluştur.

Kontrol et:

- section overflow
- text overlap
- orphan heading
- widow line
- clipped URL
- uzun Jobtitel
- uzun Firmenname
- aşırı küçük font
- çok dar margin
- yetersiz contrast
- boş section

Sonuç:

ERROR
WARNING
INFO

==================================================
11. MODERN STATUS GÖSTERGESİ
==================================================

Vollständigkeit yalnızca yüzde olmamalıdır.

Örneğin:

Profil
✓ Persönliche Daten
✓ Berufserfahrung
✓ Bildungsweg
! Kurzprofil
! Kenntnisse
○ Foto optional

gibi anlamlı durum sun.

==================================================
12. CV CHECK
==================================================

Export öncesinde:

„Lebenslauf prüfen“

butonu oluştur.

Kontrol:

- zorunlu section eksik mi?
- tarih aralıkları tutarlı mı?
- boş section var mı?
- görünür ama boş item var mı?
- contact bilgileri eksik mi?
- link bozuk mu?
- email formatı doğru mu?
- phone formatı doğru mu?
- section sırası mantıklı mı?
- iki sayfa arasında kötü kırılma var mı?

==================================================
13. DUPLICATE DETECTION
==================================================

Aynı bilgi CV içinde iki kere gösteriliyorsa warning ver.

Örneğin:

Java

hem:
Kernkompetenzen

hem:
IT-Kenntnisse

hem:
Technische Schwerpunkte

altında gereksiz tekrar ediyorsa:

„Java wird in mehreren Bereichen wiederholt.“

uyarısı gösterilebilir.

Kullanıcı isterse yine bırakabilmelidir.

==================================================
14. SECTION PRESETS
==================================================

Kenntnisse & Zusatzangaben için hazır paketler oluştur.

Örneğin:

Softwareentwicklung:
- IT-Kenntnisse
- Technologien
- Projekte
- Sprachen

Technisch:
- Kernkompetenzen
- Technische Schwerpunkte
- Zertifikate

Kaufmännisch:
- Fachliche Kenntnisse
- Stärken
- Sprachen

Ancak bunlar öneri presetidir.

Kullanıcı sonradan özgürce değiştirebilir.

==================================================
15. TEMPLATE + CONTENT PRESET AYRIMI
==================================================

Karıştırma:

Template
=
görsel layout

Content Preset
=
hangi bölümlerin kullanıldığı

Örneğin:

Pehlione White Blue
+
Software Developer Content Preset

veya:

Pehlione White Blue
+
Sachbearbeiter Content Preset

mümkün olmalıdır.

==================================================
16. CV VERSIONS
==================================================

Her Bewerbung için CV version history oluştur.

Örneğin:

Lebenslauf v1
Lebenslauf v2
Lebenslauf v3

Her versiyonda:

- timestamp
- user
- template
- content changes
- design changes

tut.

==================================================
17. SNAPSHOT
==================================================

Önemli aksiyonlarda snapshot alınabilir:

- Bewerbung versendet
- Coach freigegeben
- Vorstellungsgespräch
- Bewerbung aktualisiert

Böylece gönderilen CV sonradan değişse bile:

„Bu firmaya tam olarak hangi Lebenslauf gönderilmişti?“

sorusu cevaplanabilir.

==================================================
18. COMPARE VERSIONS
==================================================

İki CV versiyonu karşılaştırılabilsin.

Örneğin:

v2 → v3

Değişiklikler:

+ Zertifikate
- Hobbys
~ Kurzprofil geändert
~ Kernkompetenzen Reihenfolge geändert

gibi gösterilebilir.

==================================================
19. UNDO / REDO
==================================================

Editor:

Undo
Redo

desteklemelidir.

Özellikle:

- section move
- delete
- hide
- text edit
- design change

işlemlerinde yararlıdır.

Ctrl+Z / Ctrl+Y veya platform karşılığı desteklenmelidir.

==================================================
20. AUTOSAVE
==================================================

Editor düzenli olarak autosave yapmalıdır.

Örneğin debounce:

1–3 saniye

Ama her keypress'te server request gönderme.

State:

Saving...
Gespeichert
Fehler beim Speichern

gibi gösterilsin.

==================================================
21. UNSAVED CHANGES PROTECTION
==================================================

Kullanıcı editorü kapatırken kaydedilmemiş değişiklik varsa veri kaybolmamalıdır.

Navigation guard oluştur.

==================================================
22. TEMPLATE SWITCH PREVIEW
==================================================

Kullanıcı template'e tıklamadan önce hover veya preview ile kendi gerçek CV verisiyle küçük preview görebilir.

Generic Muster verisi yerine mümkün olduğunca:

current ResumeDocument

kullan.

==================================================
23. FAVORITEN
==================================================

14 template arasında kullanıcı favori template'lerini işaretleyebilsin.

Örneğin:

★ Pehlione White Blue
★ Klassisch

Filtre:

Favoriten

==================================================
24. RECENT TEMPLATES
==================================================

Son kullanılan template'leri üstte gösterebilirsin.

Ancak gereksiz karmaşa yaratma.

==================================================
25. DESIGN PRESETS
==================================================

Her template için birden fazla Design Preset destekle.

Örneğin Pehlione:

- White Blue
- Light Blue
- Dark Blue
- Monochrome

Ancak bunlar aynı template family altında variant/preset olmalıdır.

==================================================
26. PROFESSIONAL SAFE MODE
==================================================

Kullanıcı çok fazla tasarım özgürlüğüne sahip olacak.

Bu yüzden:

Professional Mode

oluştur.

Aktif olduğunda:

- minimum font
- maksimum renk sayısı
- contrast
- margin limits
- line-height limits

korunsun.

Kullanıcı isterse:

Advanced Design Mode

açabilsin.

==================================================
27. DESIGN LOCK
==================================================

Coach veya Tenant Admin bir corporate template belirlediğinde bazı değerleri lock edebilsin.

Örneğin:

Logo
Primary Color
Font
Footer

değiştirilemesin.

Ama içerik kullanıcı tarafından düzenlenebilsin.

==================================================
28. COACH REVIEW
==================================================

Coach ve Teilnehmer modeli kullanılıyorsa CV review akışı ekle.

Teilnehmer:

„Zur Prüfung senden“

Coach:

- yorum ekler
- section'a comment ekler
- değişiklik önerir
- freigeben

yapabilir.

==================================================
29. INLINE COMMENTS
==================================================

Coach CV'nin belirli section'ına comment bırakabilsin.

Örneğin Berufserfahrung üzerine:

„Hier bitte konkrete Ergebnisse ergänzen.“

Comment final PDF'de görünmemelidir.

==================================================
30. CHANGE SUGGESTIONS
==================================================

Coach doğrudan içeriği değiştirmek yerine:

Änderung vorschlagen

yapabilsin.

Teilnehmer:

Annehmen
Ablehnen

seçebilsin.

==================================================
31. DOCUMENT CONSISTENCY
==================================================

Lebenslauf'taki Design Profile değiştiğinde:

Deckblatt
Anschreiben

uyumlu şekilde güncellenebilmelidir.

Ancak içerik değişmemelidir.

==================================================
32. DESIGN PREVIEW – ALLE DOKUMENTE
==================================================

Design anpassen panelinde mini preview göster:

[Deckblatt]
[Anschreiben]
[Lebenslauf]

Kullanıcı renk/font değişikliğinin üç belgede nasıl göründüğünü kontrol edebilsin.

==================================================
33. GLOBAL DESIGN VS DOCUMENT OVERRIDE
==================================================

UI'de açıkça göster:

Design gilt für:
(•) Gesamte Bewerbungsmappe
( ) Nur Lebenslauf

Bu sayede kullanıcı neyi değiştirdiğini bilir.

==================================================
34. PROFILE-SPECIFIC DEFAULTS
==================================================

Her Bewerbungsprofil kendi default section seçimine sahip olabilir.

Örneğin:

Java Developer:

Kenntnisse & Zusatzangaben:
✓ Technologien
✓ Projekte
✓ Zertifikate
✓ Sprachen

Sachbearbeiter:

✓ Stärken
✓ Fachliche Kenntnisse
✓ Sprachen

==================================================
35. DATA IMPORT / REUSE
==================================================

Kullanıcı eski bir Bewerbung'dan CV ayarlarını yeni Bewerbung'a kopyalayabilsin.

Örneğin:

„Lebenslauf aus Bewerbung XYZ übernehmen“

Ancak yeni bir independent draft oluşmalıdır.

==================================================
36. CLEAN DUPLICATE
==================================================

Kullanıcı:

„Lebenslauf duplizieren“

ile mevcut CV'nin kopyasını oluşturabilsin.

Örneğin:

Java Developer – Standard
Java Developer – Backend
Java Developer – Full Stack

==================================================
37. SEMANTIC CV MODEL
==================================================

En önemli teknik prensiplerden biri:

ResumeDocument içerik olarak semantic olmalıdır.

Örneğin:

experience

education

skills

projects

gibi.

Final render sırasında:

Modern
Klassisch
Pehlione

template'leri bunu kendi layout'una dönüştürmelidir.

Template içinde ana business data saklama.

==================================================
38. EXPORT HISTORY
==================================================

Her export kaydedilebilir.

Örneğin:

21.09.2026 14:32
Lebenslauf.pdf
Pehlione White Blue
Version 4

Bu özellikle Bewerbung gönderildiğinde yararlıdır.

==================================================
39. FILE NAMING
==================================================

Export dosya adı otomatik üretilebilir.

Örneğin:

Mustafa_Oezdemir_Lebenslauf.pdf

Application folder içinde gerekiyorsa:

Heizungsdiscount_24_GmbH_Sachbearbeiter_Kundenservice_Lebenslauf.pdf

Filename sanitize et.

==================================================
40. ATS VIEW
==================================================

Opsiyonel çok yararlı özellik:

„ATS Ansicht“

Kullanıcı CV’nin görsel tasarım olmadan text extraction sırasını görebilsin.

Örneğin:

Mustafa Özdemir
Kontakt
Kurzprofil
Berufserfahrung
...

Bu özellikle iki kolonlu template'lerde çok yararlıdır.

==================================================
41. PRINT PREVIEW
==================================================

Normal edit preview dışında:

Druckvorschau

modu ekle.

Burada editor border, section overlay ve toolbar görünmez.

Kullanıcı final PDF'e en yakın sonucu görür.

==================================================
42. PAGE ZOOM VE NAVIGATION
==================================================

Çok sayfalı CV için:

Seite 1 / 2
← →
Fit Page
100%

gibi navigation ekle.

==================================================
43. KEYBOARD SHORTCUTS
==================================================

Profesyonel kullanıcı için:

Ctrl+S → Speichern
Ctrl+Z → Undo
Ctrl+Y → Redo
Ctrl+P → Druckvorschau
Ctrl+Shift+E → Export

gibi shortcutlar düşünülebilir.

==================================================
44. EMPTY STATE UX
==================================================

Boş section sadece boş beyaz alan olarak görünmemelidir.

Editor modunda:

„Noch keine Angaben – hinzufügen“

gibi placeholder göster.

Final PDF'de bu placeholder kesinlikle görünmemelidir.

==================================================
45. TEMPLATE VALIDATION
==================================================

Yeni template geliştirildiğinde otomatik test et:

- bütün required semantic sections render edilebiliyor mu?
- multi-page çalışıyor mu?
- Unicode çalışıyor mu?
- long text taşıyor mu?
- DOCX çalışıyor mu?
- LibreOffice çalışıyor mu?
- PDF çalışıyor mu?

==================================================
46. BENİM EN ÖNEMLİ ÖNERİM
==================================================

Uygulamanın temel mimarisini şu dört şeyi birbirinden kesin olarak ayır:

1. Profile Data
2. Resume Content
3. Resume Template
4. Resume Design

Yani:

PROFILE
„Kullanıcı hakkında hangi bilgiler var?“

RESUME CONTENT
„Bu Bewerbung'da hangi bilgiler kullanılacak?“

TEMPLATE
„Bu bilgiler nerede gösterilecek?“

DESIGN
„Bu bilgiler nasıl görünecek?“

Bu ayrım yapılırsa sistem gelecekte çok daha kolay genişletilebilir.

==================================================
47. KABUL KRİTERLERİ
==================================================

Yeni sistemde en az şu özellikler çalışmalıdır:

- Master Profile
- Bewerbung-specific CV
- content variants
- bullet/item visibility
- page budget
- page balancing
- CV validation
- version history
- snapshots
- undo/redo
- autosave
- template switching
- design consistency
- ATS view
- print preview
- export history

Bu özellikleri tek seferde devasa component içinde oluşturma.

Domain
Application Services
Editor State
Renderer
UI

katmanlarına böl.

==================================================
48. SONUÇ
==================================================

Amaç yalnızca güzel bir CV hazırlayan editor yapmak değildir.

Amaç:

**Bir kullanıcının aynı kariyer verilerini onlarca farklı Bewerbung için hızlı, güvenli ve kontrollü biçimde yeniden kullanabildiği profesyonel bir Lebenslauf Management System oluşturmaktır.**

Özellikle şu kullanıcı akışı çok hızlı olmalıdır:

Stellenanzeige seç
↓
Profil seç
↓
Mevcut Master Profile yüklenir
↓
İlgili bilgiler seçilir
↓
Kenntnisse & Zusatzangaben düzenlenir
↓
Template seçilir
↓
Layout ayarlanır
↓
CV Check
↓
Druckvorschau
↓
PDF / DOCX
↓
Gönderilen versiyon snapshot olarak saklanır
```

Ben özellikle **Master Profile → Bewerbung-spezifischer Lebenslauf** ayrımını en baştan kurardım. Böylece kullanıcı her başvuruda CV'yi yeniden yazmak yerine, mevcut kariyer havuzundan sadece göstermek istediği bölümleri ve maddeleri seçer; template ise yalnızca bunların nasıl görüneceğini belirler.
