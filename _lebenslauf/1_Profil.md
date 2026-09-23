* Konu: **BewerbungsManager – Profil/Lebenslauf içerik yönetimi, sıralama ve düzenlenebilir görünen başlıklar**
* İstenilen çıktı: Profil bölümünden Lebenslauf içeriğinin merkezi olarak yönetilmesi; içerik maddelerinin sıralanabilmesi; **Lebenslauf üzerinde görünen tüm bölüm başlıklarının/Labels kullanıcı tarafından değiştirilebilmesi**; değişikliklerin Preview, PDF ve DOCX çıktısına yansıması.
* Kullanılacak framework: **RASCEF**
* Senin yazacağın prompt:

[https://github.com/mustafa-oezdemir/bewerbung_manager.git](https://github.com/mustafa-oezdemir/bewerbung_manager.git) repository'sinin güncel `main` branch'ini önce ayrıntılı incele.

Özellikle şu alanları analiz et:

* `bewerbung-studio/src/shared/schema.ts`
* `src/views/ProfileView.tsx`
* `src/components/resume/ResumeDataEditor.tsx`
* `src/components/resume/ResumeSectionsPanel.tsx`
* `src/components/profile/EntryListEditor.tsx`
* `src/components/languages/LanguageLevelEditor.tsx`
* `src/features/resume-sections/resume-sections.ts`
* `src/features/resume-sections/resume-section-system.ts`
* knowledge/skills sistemi
* storage/save/load sistemi
* Lebenslauf Preview/PDF/DOCX renderer'ları

Bu görev **Lebenslauf'un içeriğini, içerik sıralamasını ve kullanıcıya görünen bölüm başlıklarını/Labels yönetmeyi** kapsar.

Mevcut Lebenslauf template tasarımlarını, CSS layout'unu, fontları, renkleri, kolon oranlarını veya template-specific görsel yerleşimi değiştirme.

Yeni paralel bir Lebenslauf sistemi oluşturma.

Mevcut `ApplicantProfile`, semantic resume section sistemi ve mevcut renderer altyapısını canonical veri kaynağı olarak kullan.

---

# 1. Profil Lebenslauf için merkezi içerik editörü olsun

`ProfileView.tsx` içinde Lebenslauf'a ait bilgiler mantıklı gruplar halinde düzenlenebilsin.

## Persönliche Daten

Desteklenecek mevcut alanlar:

* Vorname
* Nachname
* Berufsbezeichnung / Titel
* Straße
* PLZ
* Ort
* Land
* Telefon
* E-Mail
* LinkedIn
* GitHub
* Portfolio
* weitere Online-Profile
* Geburtsdatum
* Geburtsort
* Staatsangehörigkeit
* Familienstand
* Kinder
* Bewerbungsfoto
* Unterschrift

## Kurzprofil

* çok satırlı `textarea`
* satır sonları korunmalı
* mevcut `summary` alanı kullanılmalı

## Stärken

Her Stärke ayrı kayıt olmalı:

* Titel
* Beschreibung
* Icon, mevcut sistem destekliyorsa

## Berufserfahrung

Mevcut veri modelindeki alanları koru:

* Von
* Bis
* aktuelle Position
* Position
* Unternehmen
* Rechtsform
* Ort
* Beschäftigungsart
* Beschreibung
* Teamgröße
* Aufgaben
* Projekte
* Technologien
* Erfolge / Achievements

## Ausbildung / Bildungsweg

* Von
* Bis
* Abschluss
* Institution
* Ort
* Land
* Typ
* Fachrichtung
* Note
* Status
* Beschreibung

## Weitere Inhalte

* Kenntnisse
* Sprachen
* Zertifikate / Weiterbildungen
* Projekte
* Praktika
* Auslandserfahrung
* Stipendien
* Auszeichnungen
* Veröffentlichungen
* Ehrenamt
* Interessen & Hobbys
* Führerschein
* Zusatzangaben
* Referenzen
* Eigene Abschnitte

---

# 2. YENİ KRİTİK GEREKSİNİM: Görünen bölüm başlıkları / Labels düzenlenebilir olmalı

Lebenslauf üzerinde kullanıcıya ve işverene **gerçekte görünen section başlıkları sabit/hardcoded olmamalı**.

Örneğin kullanıcı şu varsayılan başlıkları:

* `Lebenslauf`
* `Persönliche Daten`
* `Kurzprofil`
* `Zusammenfassung`
* `Stärken`
* `Berufserfahrung`
* `Beruflicher Werdegang`
* `Ausbildung`
* `Bildungsweg`
* `Kenntnisse`
* `Besondere Kenntnisse`
* `Sprachen`
* `Zertifikate`
* `Projekte`
* `Interessen und Hobbys`
* `Zusatzangaben`
* `Referenzen`
* `Ort, Datum und Unterschrift`

istediği şekilde değiştirebilsin.

Örneğin:

`Berufserfahrung`
→ `Beruflicher Werdegang`

veya

`Zusammenfassung`
→ `Über mich`

veya

`Kenntnisse`
→ `IT-Kenntnisse`

veya

`Stärken`
→ `Persönliche Kompetenzen`

olarak değiştirilebilsin.

## UI

Her Lebenslauf section editöründe açık şekilde şu alan bulunsun:

**Angezeigte Überschrift / Label**

Örneğin:

`Angezeigte Überschrift`
`[ Beruflicher Werdegang              ]`

Bu değer **gerçek Lebenslauf'ta gösterilen başlık** olmalıdır.

Bu yalnızca editor içerisindeki açıklama değildir.

Preview/PDF/DOCX üzerinde görünen başlıktır.

---

# 3. Mevcut başlık sistemlerini analiz et ve tek canonical çözüm oluştur

Repository'de şu anda birden fazla başlık mekanizması bulunduğunu dikkate al:

* `resumeSectionTitles`
* `defaultEditableResumeSectionTitles`
* `resumeSectionLabels`
* semantic `customTitle`
* `resumeSectionDefinitions[].defaultTitle`
* `knowledgeSection.title`
* `specialSections[].title`
* `resumeKnowledgeGroups[].title`

Bunların üzerine yeni bir dördüncü/beşinci paralel title sistemi ekleme.

Önce hangisinin hangi renderer tarafından kullanıldığını analiz et.

Amaç:

**tek deterministik başlık çözümleme sistemi**

oluşturmak.

Tercihen renderer başlığı doğrudan hardcoded label'lardan almak yerine merkezi resolver üzerinden çözsün.

Örneğin konsept olarak:

`getResolvedResumeSectionTitle(profile, sectionType)`

veya mevcut resolver uygunsa onu genişlet.

Çözüm sırası mantıksal olarak şu şekilde olabilir:

`custom user title`
→ `existing profile title`
→ `semantic default title`

Ancak mevcut mimariye en uygun çözümü repository incelemesinden sonra belirle.

---

# 4. Semantic Sections başlıkları

Mevcut semantic sistemde şu bölümler bulunuyor:

* heading
* personalData
* photo
* summary
* career
* education
* knowledge
* interests
* closing

`renamable: true` olan bölümlerde kullanıcı kendi başlığını girebilmeli.

Mevcut `customTitle` mekanizması varsa bunu yeniden kullan.

Örneğin:

`career.customTitle = "Berufliche Stationen"`

olduğunda Preview/PDF/DOCX üzerinde:

**Berufliche Stationen**

görünmelidir.

`customTitle` boşsa mevcut default title gösterilsin.

---

# 5. Legacy ve semantic başlık sistemi çakışmamalı

Mevcut sistemde örneğin:

`resumeSectionTitles.experience`

ile semantic:

`career.customTitle`

aynı kavram için farklı değerler taşıyabilir.

Bunun sonucunda:

Profile ekranında `Berufserfahrung`

ama Preview'da `Beruflicher Werdegang`

gibi tutarsızlık oluşmasına izin verme.

Bir canonical resolution strategy oluştur.

Backward compatibility nedeniyle eski `resumeSectionTitles` verilerini kaybetme.

Gerekirse mevcut değerleri semantic title sistemine güvenli şekilde map et.

---

# 6. Special Sections başlıkları da düzenlenebilir kalmalı

Mevcut:

`specialSections[].title`

alanını koru.

Örneğin kullanıcı:

`Projekte`
→ `Ausgewählte Projekte`

`Ehrenamt`
→ `Soziales Engagement`

`Interessen & Hobbys`
→ `Interessen`

olarak değiştirebilsin.

Special Section title değişikliği doğrudan Lebenslauf'ta görünmeli.

---

# 7. Knowledge Group Labels

Knowledge gruplarındaki başlıklar da düzenlenebilir olmalı.

Örneğin:

`Programmiersprachen`
`Frameworks`
`Datenbanken`
`Tools`
`Cloud & DevOps`

kullanıcı tarafından değiştirilebilsin.

Mevcut:

`resumeKnowledgeGroups[].title`

ve/veya mevcut canonical knowledge structure kullanılmalı.

Yeni paralel label alanı oluşturma.

---

# 8. Persönliche Daten içindeki görünen field labels

Mevcut `resumePersonalFieldLabels` gibi hardcoded UI/render label'larını da incele.

Lebenslauf template'inde gerçekten label olarak gösterilen alanlarda, örneğin:

* Adresse
* Telefon
* E-Mail
* LinkedIn
* GitHub
* Website
* Geburtsdatum
* Geburtsort
* Staatsangehörigkeit
* Führerschein
* Xing

kullanıcının kullandığı template bu label'ları ekranda gerçekten gösteriyorsa, kullanıcıya label özelleştirme imkanı sağlayacak mimari oluştur.

Örneğin:

`Telefon`
→ `Mobil`

`Website`
→ `Portfolio`

`Adresse`
→ `Anschrift`

Ancak template ilgili alanı labelsız gösteriyorsa mevcut görsel tasarımı değiştirme.

Bu özellik yalnızca **template tarafından zaten gösterilen text label'ını değiştirmeli**, template layout'unu değiştirmemelidir.

---

# 9. Section title değişiklikleri tüm çıktılarda aynı olmalı

Kullanıcının değiştirdiği görünen başlık şu yerlerde birebir aynı kullanılmalı:

`ApplicantProfile`
→ `ProfileView`
→ `ResumeDataEditor`
→ `Lebenslauf Preview`
→ `PDF`
→ `DOCX`

Örneğin kullanıcı:

`Berufserfahrung`
→ `Beruflicher Werdegang`

olarak değiştirdiyse:

Profile ekranında da,
Lebenslauf Editor'da da,
Preview'da da,
PDF'de de,
DOCX'de de

**Beruflicher Werdegang**

görünmelidir.

Renderer içinde tekrar:

`"Berufserfahrung"`

gibi hardcoded değer kullanma.

---

# 10. Reset to default

Düzenlenebilir section title alanlarının yanında mümkünse:

**Standard wiederherstellen**

işlevi sağla.

Örneğin:

`Berufliche Stationen`

kullanıcı tarafından verilmişse:

`Standard wiederherstellen`

ile sistem default değerine dönebilsin.

Reset sırasında custom value silinsin, default değer duplicate olarak storage'a yazılmasın.

---

# 11. İçerik maddeleri kendi içinde sıralanabilir olmalı

Aşağıdaki repeatable içeriklerin tamamında ortak sıralama sistemi kullanılmalı:

* Berufserfahrung
* Berufserfahrung → Aufgaben
* Berufserfahrung → Projekte
* Berufserfahrung → Achievements
* Berufserfahrung → Technologien, uygun olduğu yerde
* Ausbildung
* Stärken
* Sprachen
* Zertifikate
* Knowledge Groups
* Knowledge Items
* Special Sections
* Special Section Entries
* Special Section Bullets
* Interessen
* Projekte
* diğer repeatable entries

Her item mümkün olduğunca şu kontrolleri desteklesin:

* `↑ Nach oben`
* `↓ Nach unten`
* `⇈ An den Anfang`
* `⇊ Ans Ende`
* `Löschen`

İlk item için:

* Nach oben disabled
* An den Anfang disabled

Son item için:

* Nach unten disabled
* Ans Ende disabled

olmalı.

Array sırası canonical sıra olarak saklansın.

Program kapatılıp yeniden açıldığında sıra korunmalı.

---

# 12. Berufserfahrung içindeki Stichpunkte

Aşağıdaki örnek tek büyük metin olarak tutulmamalı:

* Entwicklung einer funktionsfähigen Monitoring-Lösung für die Integration von PRTG-Daten in Grafana
* Produktiver Einsatz des entwickelten Plugins im Fachdienst Technische Dienste
* Verbesserung der Nachvollziehbarkeit durch Logging, Fehlerbehandlung und Metriken

Her biri ayrı item olsun.

Örneğin:

```ts
achievements: [
  "Entwicklung einer funktionsfähigen Monitoring-Lösung für die Integration von PRTG-Daten in Grafana",
  "Produktiver Einsatz des entwickelten Plugins im Fachdienst Technische Dienste",
  "Verbesserung der Nachvollziehbarkeit durch Logging, Fehlerbehandlung und Metriken"
]
```

Kullanıcı ikinci maddeyi ilk sıraya alabilmeli.

---

# 13. Reusable Sortable Editor

Mevcut `EntryListEditor` sistemini incele.

Uygunsa component'i reusable şekilde genişlet.

Örneğin desteklenmesi gereken işlemler:

* add
* edit
* delete
* moveUp
* moveDown
* moveFirst
* moveLast
* multiline

Her component içinde aynı sıralama algoritmasını tekrar yazma.

Generic immutable utility oluştur veya mevcut `moveItem` / `reorderItem` fonksiyonlarını ortaklaştır.

---

# 14. Stärken

Her Stärke kartında:

* Titel
* Beschreibung
* Icon
* Nach oben
* Nach unten
* An den Anfang
* Ans Ende
* Löschen

bulunsun.

`profile.strengths` sırası Lebenslauf sırası olmalı.

Bölüm başlığı da değiştirilebilir olsun:

`Stärken`
→ kullanıcı tarafından belirlenen label.

---

# 15. Sprachen

Mevcut `LanguageLevelEditor` bozulmamalı.

Örneğin:

* Deutsch – C1
* Türkisch – Muttersprache
* Englisch – B1

her biri bağımsız item olmalı.

Destekle:

* Sprache bearbeiten
* Niveau bearbeiten
* hinzufügen
* löschen
* nach oben
* nach unten
* an den Anfang
* ans Ende

Bölüm başlığı:

`Sprachen`

da kullanıcı tarafından değiştirilebilsin.

Örneğin:

`Sprachen`
→ `Sprachkenntnisse`

---

# 16. Zertifikate / Weiterbildungen

Mevcut `CertificateListEditor` korunmalı ve sıralama eklenmeli.

Alanlar:

* Zertifikat / Weiterbildung
* Anbieter / Institution
* Datum / Zeitraum

Ayrıca bölüm başlığı değiştirilebilmeli:

`Zertifikate`
→ `Zertifikate & Weiterbildungen`

---

# 17. Profile ve Lebenslauf aynı canonical veriyi kullanmalı

Bu kritik gereksinimdir.

Şu yapıyı oluşturma:

`ProfileView data`
+
`ResumeDataEditor data`
+
`Template-specific content data`

Tek veri akışı kullan:

`ApplicantProfile`
→ editor
→ shared resolver/view-model
→ template
→ Preview/PDF/DOCX

Profil ekranından yapılan değişiklik Lebenslauf ekranında görünmeli.

Lebenslauf ekranından yapılan değişiklik tekrar profile kaydedilmeli.

Aynı şey **başlıklar/Labels** için de geçerlidir.

---

# 18. Textarea ve structured list ayrımı

Uzun tekil açıklamalarda `textarea` kullan:

* Kurzprofil
* Beschreibung
* description alanları

Ancak bağımsız Stichpunkte tek textarea içine newline ile gömülmemeli.

Yanlış:

```ts
achievements = "Punkt 1\nPunkt 2\nPunkt 3"
```

Doğru:

```ts
achievements = [
  "Punkt 1",
  "Punkt 2",
  "Punkt 3"
]
```

Çünkü kullanıcı her maddeyi ayrı ayrı sıralayabilmelidir.

---

# 19. Editor UI

Profil ekranını kontrolsüz uzun forma dönüştürme.

Mevcut `<details>` / collapsible section yapısını kullan veya iyileştir.

Örneğin:

`Berufserfahrung (4)`
`Stärken (6)`
`Sprachen (3)`
`Zertifikate (8)`

Section açıldığında en üstte:

`Angezeigte Überschrift / Label`

alanı yer alsın.

Örneğin:

**Berufserfahrung (4)**

`Angezeigte Überschrift`
`[ Beruflicher Werdegang ]`

---

# 20. Internal name ile visible label'ı ayır

Kod tarafındaki semantic/internal identifier kullanıcı tarafından değiştirilmemeli.

Örneğin internal:

`career`

aynı kalmalı.

Kullanıcı yalnız visible title değiştirmeli:

`career`
→ visible label:
`Beruflicher Werdegang`

Bu nedenle kullanıcı başlık değiştirdiğinde:

* section type değişmemeli
* semanticType değişmemeli
* renderer mapping bozulmamalı
* template placement bozulmamalı

Yalnız görünen title değişmelidir.

---

# 21. Tasarım sistemine dokunma

Bu görev kapsamında değiştirme:

* Lebenslauf template CSS'leri
* font sistemi
* renk sistemi
* column layout
* template-specific placement
* margin/padding tasarımı
* hazır Muster görünümü

Sadece editor UI'da yeni label/input/sort controls için gereken minimal stilleri ekle.

---

# 22. Backward compatibility

Mevcut kullanıcı profilleri kaybolmamalı.

Özellikle koru:

* `resumeSectionTitles`
* `resumeSemanticSections`
* `knowledgeSection`
* `resumeKnowledgeGroups`
* `specialSections`
* `strengths`
* `languages`
* `certifications`
* experiences
* education

Sadece başlık özelleştirmek için gereksiz schema migration yapma.

Mevcut `customTitle` veya mevcut title property kullanılabiliyorsa onu kullan.

Migration gerçekten gerekiyorsa eski title değerlerinin tamamını güvenli şekilde taşı.

---

# 23. Başlık için fallback davranışı

Custom title boş olduğunda section kaybolmamalı.

Örneğin:

```text
custom title mevcut
    ↓
custom title kullan

custom title boş
    ↓
mevcut default title kullan
```

Boş string nedeniyle Lebenslauf'ta başlıksız section oluşmasına izin verme.

Kullanıcı title alanını tamamen silerse default title'a fallback yapılabilir veya mevcut validation davranışına uygun çözüm kullanılabilir.

---

# 24. Tests

Aşağıdaki durumlar test edilmeli:

1. `Berufserfahrung` başlığı değiştirilebiliyor.
2. Yeni başlık Preview'da görünüyor.
3. PDF aynı başlığı kullanıyor.
4. DOCX aynı başlığı kullanıyor.
5. Profil kaydedilip yeniden açıldığında custom title korunuyor.
6. `Standard wiederherstellen` default title'a dönüyor.
7. Semantic internal type title değişikliğinden etkilenmiyor.
8. `Stärken` başlığı değiştirilebiliyor.
9. `Sprachen` başlığı değiştirilebiliyor.
10. `Zertifikate` başlığı değiştirilebiliyor.
11. Knowledge Group title değiştirilebiliyor.
12. Special Section title değiştirilebiliyor.
13. Eski profile title verileri kaybolmuyor.
14. Achievement yukarı/aşağı/başa/sona taşınabiliyor.
15. Language sırası korunuyor.
16. Strength sırası korunuyor.
17. Special Section entry/bullet sırası korunuyor.
18. ProfileView değişikliği ResumeDataEditor'da görülüyor.
19. ResumeDataEditor değişikliği profile kaydoluyor.
20. Mevcut template tasarımlarında görsel regresyon oluşmuyor.

---

# 25. Uygulama yöntemi

Önce repository'nin gerçek mevcut durumunu analiz et.

Ardından hangi dosyaların değişmesi gerektiğini belirle.

Mevcut component ve resolver'ları yeniden kullan.

Hardcoded section title bulunan renderer'ları tespit et.

Gerekli yerlerde merkezi title resolver'a geçir.

Ancak bu işlemi template tasarım refactoring'ine dönüştürme.

Her aşamada TypeScript tip güvenliğini koru.

Repository'deki gerçek scriptleri `package.json` üzerinden kontrol ederek sonunda:

```bash
npm run typecheck
npm test
npm run build
```

veya projedeki gerçek eşdeğerlerini çalıştır.

---

# Başarı kriteri

Kullanıcı `BewerbungsManager → Profil` veya Lebenslauf içerik editörü üzerinden:

* Lebenslauf içeriklerini düzenleyebilmeli,
* Stärken, Sprachen, Zertifikate ve diğer listeleri sıralayabilmeli,
* Berufserfahrung içerisindeki Aufgaben/Projekte/Erfolge maddelerini sıralayabilmeli,
* section başlıklarını değiştirebilmeli,
* ekranda görünen **Labels/Überschriften** üzerinde tam kontrol sahibi olmalı.

Örneğin kullanıcı:

`Zusammenfassung`
→ `Über mich`

`Berufserfahrung`
→ `Beruflicher Werdegang`

`Ausbildung`
→ `Bildungsweg`

`Kenntnisse`
→ `IT-Kenntnisse`

`Sprachen`
→ `Sprachkenntnisse`

`Stärken`
→ `Persönliche Kompetenzen`

yapabilmelidir.

Bu değişiklikler tek canonical profile verisine kaydedilmeli ve **mevcut Lebenslauf tasarımını değiştirmeden** Preview, PDF ve DOCX çıktılarında aynı şekilde görünmelidi

https://github.com/mustafa-oezdemir/bewerbung_manager.git repository'sinin güncel `main` branch'ini önce ayrıntılı incele.

Özellikle şu alanları analiz et:

* `bewerbung-studio/src/shared/schema.ts`
* `src/views/ProfileView.tsx`
* `src/components/resume/ResumeDataEditor.tsx`
* `src/components/resume/ResumeSectionsPanel.tsx`
* `src/components/profile/EntryListEditor.tsx`
* `src/components/languages/LanguageLevelEditor.tsx`
* `src/features/resume-sections/resume-sections.ts`
* `src/features/resume-sections/resume-section-system.ts`
* knowledge/skills sistemi
* storage/save/load sistemi
* Lebenslauf Preview/PDF/DOCX renderer'ları

Bu görev **Lebenslauf'un içeriğini, içerik sıralamasını ve kullanıcıya görünen bölüm başlıklarını/Labels yönetmeyi** kapsar.

Mevcut Lebenslauf template tasarımlarını, CSS layout'unu, fontları, renkleri, kolon oranlarını veya template-specific görsel yerleşimi değiştirme.

Yeni paralel bir Lebenslauf sistemi oluşturma.

Mevcut `ApplicantProfile`, semantic resume section sistemi ve mevcut renderer altyapısını canonical veri kaynağı olarak kullan.

---

# 1. Profil Lebenslauf için merkezi içerik editörü olsun

`ProfileView.tsx` içinde Lebenslauf'a ait bilgiler mantıklı gruplar halinde düzenlenebilsin.

## Persönliche Daten

Desteklenecek mevcut alanlar:

* Vorname
* Nachname
* Berufsbezeichnung / Titel
* Straße
* PLZ
* Ort
* Land
* Telefon
* E-Mail
* LinkedIn
* GitHub
* Portfolio
* weitere Online-Profile
* Geburtsdatum
* Geburtsort
* Staatsangehörigkeit
* Familienstand
* Kinder
* Bewerbungsfoto
* Unterschrift

## Kurzprofil

* çok satırlı `textarea`
* satır sonları korunmalı
* mevcut `summary` alanı kullanılmalı

## Stärken

Her Stärke ayrı kayıt olmalı:

* Titel
* Beschreibung
* Icon, mevcut sistem destekliyorsa

## Berufserfahrung

Mevcut veri modelindeki alanları koru:

* Von
* Bis
* aktuelle Position
* Position
* Unternehmen
* Rechtsform
* Ort
* Beschäftigungsart
* Beschreibung
* Teamgröße
* Aufgaben
* Projekte
* Technologien
* Erfolge / Achievements

## Ausbildung / Bildungsweg

* Von
* Bis
* Abschluss
* Institution
* Ort
* Land
* Typ
* Fachrichtung
* Note
* Status
* Beschreibung

## Weitere Inhalte

* Kenntnisse
* Sprachen
* Zertifikate / Weiterbildungen
* Projekte
* Praktika
* Auslandserfahrung
* Stipendien
* Auszeichnungen
* Veröffentlichungen
* Ehrenamt
* Interessen & Hobbys
* Führerschein
* Zusatzangaben
* Referenzen
* Eigene Abschnitte

---

# 2. YENİ KRİTİK GEREKSİNİM: Görünen bölüm başlıkları / Labels düzenlenebilir olmalı

Lebenslauf üzerinde kullanıcıya ve işverene **gerçekte görünen section başlıkları sabit/hardcoded olmamalı**.

Örneğin kullanıcı şu varsayılan başlıkları:

* `Lebenslauf`
* `Persönliche Daten`
* `Kurzprofil`
* `Zusammenfassung`
* `Stärken`
* `Berufserfahrung`
* `Beruflicher Werdegang`
* `Ausbildung`
* `Bildungsweg`
* `Kenntnisse`
* `Besondere Kenntnisse`
* `Sprachen`
* `Zertifikate`
* `Projekte`
* `Interessen und Hobbys`
* `Zusatzangaben`
* `Referenzen`
* `Ort, Datum und Unterschrift`

istediği şekilde değiştirebilsin.

Örneğin:

`Berufserfahrung`
→ `Beruflicher Werdegang`

veya

`Zusammenfassung`
→ `Über mich`

veya

`Kenntnisse`
→ `IT-Kenntnisse`

veya

`Stärken`
→ `Persönliche Kompetenzen`

olarak değiştirilebilsin.

## UI

Her Lebenslauf section editöründe açık şekilde şu alan bulunsun:

**Angezeigte Überschrift / Label**

Örneğin:

`Angezeigte Überschrift`
`[ Beruflicher Werdegang              ]`

Bu değer **gerçek Lebenslauf'ta gösterilen başlık** olmalıdır.

Bu yalnızca editor içerisindeki açıklama değildir.

Preview/PDF/DOCX üzerinde görünen başlıktır.

---

# 3. Mevcut başlık sistemlerini analiz et ve tek canonical çözüm oluştur

Repository'de şu anda birden fazla başlık mekanizması bulunduğunu dikkate al:

* `resumeSectionTitles`
* `defaultEditableResumeSectionTitles`
* `resumeSectionLabels`
* semantic `customTitle`
* `resumeSectionDefinitions[].defaultTitle`
* `knowledgeSection.title`
* `specialSections[].title`
* `resumeKnowledgeGroups[].title`

Bunların üzerine yeni bir dördüncü/beşinci paralel title sistemi ekleme.

Önce hangisinin hangi renderer tarafından kullanıldığını analiz et.

Amaç:

**tek deterministik başlık çözümleme sistemi**

oluşturmak.

Tercihen renderer başlığı doğrudan hardcoded label'lardan almak yerine merkezi resolver üzerinden çözsün.

Örneğin konsept olarak:

`getResolvedResumeSectionTitle(profile, sectionType)`

veya mevcut resolver uygunsa onu genişlet.

Çözüm sırası mantıksal olarak şu şekilde olabilir:

`custom user title`
→ `existing profile title`
→ `semantic default title`

Ancak mevcut mimariye en uygun çözümü repository incelemesinden sonra belirle.

---

# 4. Semantic Sections başlıkları

Mevcut semantic sistemde şu bölümler bulunuyor:

* heading
* personalData
* photo
* summary
* career
* education
* knowledge
* interests
* closing

`renamable: true` olan bölümlerde kullanıcı kendi başlığını girebilmeli.

Mevcut `customTitle` mekanizması varsa bunu yeniden kullan.

Örneğin:

`career.customTitle = "Berufliche Stationen"`

olduğunda Preview/PDF/DOCX üzerinde:

**Berufliche Stationen**

görünmelidir.

`customTitle` boşsa mevcut default title gösterilsin.

---

# 5. Legacy ve semantic başlık sistemi çakışmamalı

Mevcut sistemde örneğin:

`resumeSectionTitles.experience`

ile semantic:

`career.customTitle`

aynı kavram için farklı değerler taşıyabilir.

Bunun sonucunda:

Profile ekranında `Berufserfahrung`

ama Preview'da `Beruflicher Werdegang`

gibi tutarsızlık oluşmasına izin verme.

Bir canonical resolution strategy oluştur.

Backward compatibility nedeniyle eski `resumeSectionTitles` verilerini kaybetme.

Gerekirse mevcut değerleri semantic title sistemine güvenli şekilde map et.

---

# 6. Special Sections başlıkları da düzenlenebilir kalmalı

Mevcut:

`specialSections[].title`

alanını koru.

Örneğin kullanıcı:

`Projekte`
→ `Ausgewählte Projekte`

`Ehrenamt`
→ `Soziales Engagement`

`Interessen & Hobbys`
→ `Interessen`

olarak değiştirebilsin.

Special Section title değişikliği doğrudan Lebenslauf'ta görünmeli.

---

# 7. Knowledge Group Labels

Knowledge gruplarındaki başlıklar da düzenlenebilir olmalı.

Örneğin:

`Programmiersprachen`
`Frameworks`
`Datenbanken`
`Tools`
`Cloud & DevOps`

kullanıcı tarafından değiştirilebilsin.

Mevcut:

`resumeKnowledgeGroups[].title`

ve/veya mevcut canonical knowledge structure kullanılmalı.

Yeni paralel label alanı oluşturma.

---

# 8. Persönliche Daten içindeki görünen field labels

Mevcut `resumePersonalFieldLabels` gibi hardcoded UI/render label'larını da incele.

Lebenslauf template'inde gerçekten label olarak gösterilen alanlarda, örneğin:

* Adresse
* Telefon
* E-Mail
* LinkedIn
* GitHub
* Website
* Geburtsdatum
* Geburtsort
* Staatsangehörigkeit
* Führerschein
* Xing

kullanıcının kullandığı template bu label'ları ekranda gerçekten gösteriyorsa, kullanıcıya label özelleştirme imkanı sağlayacak mimari oluştur.

Örneğin:

`Telefon`
→ `Mobil`

`Website`
→ `Portfolio`

`Adresse`
→ `Anschrift`

Ancak template ilgili alanı labelsız gösteriyorsa mevcut görsel tasarımı değiştirme.

Bu özellik yalnızca **template tarafından zaten gösterilen text label'ını değiştirmeli**, template layout'unu değiştirmemelidir.

---

# 9. Section title değişiklikleri tüm çıktılarda aynı olmalı

Kullanıcının değiştirdiği görünen başlık şu yerlerde birebir aynı kullanılmalı:

`ApplicantProfile`
→ `ProfileView`
→ `ResumeDataEditor`
→ `Lebenslauf Preview`
→ `PDF`
→ `DOCX`

Örneğin kullanıcı:

`Berufserfahrung`
→ `Beruflicher Werdegang`

olarak değiştirdiyse:

Profile ekranında da,
Lebenslauf Editor'da da,
Preview'da da,
PDF'de de,
DOCX'de de

**Beruflicher Werdegang**

görünmelidir.

Renderer içinde tekrar:

`"Berufserfahrung"`

gibi hardcoded değer kullanma.

---

# 10. Reset to default

Düzenlenebilir section title alanlarının yanında mümkünse:

**Standard wiederherstellen**

işlevi sağla.

Örneğin:

`Berufliche Stationen`

kullanıcı tarafından verilmişse:

`Standard wiederherstellen`

ile sistem default değerine dönebilsin.

Reset sırasında custom value silinsin, default değer duplicate olarak storage'a yazılmasın.

---

# 11. İçerik maddeleri kendi içinde sıralanabilir olmalı

Aşağıdaki repeatable içeriklerin tamamında ortak sıralama sistemi kullanılmalı:

* Berufserfahrung
* Berufserfahrung → Aufgaben
* Berufserfahrung → Projekte
* Berufserfahrung → Achievements
* Berufserfahrung → Technologien, uygun olduğu yerde
* Ausbildung
* Stärken
* Sprachen
* Zertifikate
* Knowledge Groups
* Knowledge Items
* Special Sections
* Special Section Entries
* Special Section Bullets
* Interessen
* Projekte
* diğer repeatable entries

Her item mümkün olduğunca şu kontrolleri desteklesin:

* `↑ Nach oben`
* `↓ Nach unten`
* `⇈ An den Anfang`
* `⇊ Ans Ende`
* `Löschen`

İlk item için:

* Nach oben disabled
* An den Anfang disabled

Son item için:

* Nach unten disabled
* Ans Ende disabled

olmalı.

Array sırası canonical sıra olarak saklansın.

Program kapatılıp yeniden açıldığında sıra korunmalı.

---

# 12. Berufserfahrung içindeki Stichpunkte

Aşağıdaki örnek tek büyük metin olarak tutulmamalı:

* Entwicklung einer funktionsfähigen Monitoring-Lösung für die Integration von PRTG-Daten in Grafana
* Produktiver Einsatz des entwickelten Plugins im Fachdienst Technische Dienste
* Verbesserung der Nachvollziehbarkeit durch Logging, Fehlerbehandlung und Metriken

Her biri ayrı item olsun.

Örneğin:

```ts
achievements: [
  "Entwicklung einer funktionsfähigen Monitoring-Lösung für die Integration von PRTG-Daten in Grafana",
  "Produktiver Einsatz des entwickelten Plugins im Fachdienst Technische Dienste",
  "Verbesserung der Nachvollziehbarkeit durch Logging, Fehlerbehandlung und Metriken"
]
```

Kullanıcı ikinci maddeyi ilk sıraya alabilmeli.

---

# 13. Reusable Sortable Editor

Mevcut `EntryListEditor` sistemini incele.

Uygunsa component'i reusable şekilde genişlet.

Örneğin desteklenmesi gereken işlemler:

* add
* edit
* delete
* moveUp
* moveDown
* moveFirst
* moveLast
* multiline

Her component içinde aynı sıralama algoritmasını tekrar yazma.

Generic immutable utility oluştur veya mevcut `moveItem` / `reorderItem` fonksiyonlarını ortaklaştır.

---

# 14. Stärken

Her Stärke kartında:

* Titel
* Beschreibung
* Icon
* Nach oben
* Nach unten
* An den Anfang
* Ans Ende
* Löschen

bulunsun.

`profile.strengths` sırası Lebenslauf sırası olmalı.

Bölüm başlığı da değiştirilebilir olsun:

`Stärken`
→ kullanıcı tarafından belirlenen label.

---

# 15. Sprachen

Mevcut `LanguageLevelEditor` bozulmamalı.

Örneğin:

* Deutsch – C1
* Türkisch – Muttersprache
* Englisch – B1

her biri bağımsız item olmalı.

Destekle:

* Sprache bearbeiten
* Niveau bearbeiten
* hinzufügen
* löschen
* nach oben
* nach unten
* an den Anfang
* ans Ende

Bölüm başlığı:

`Sprachen`

da kullanıcı tarafından değiştirilebilsin.

Örneğin:

`Sprachen`
→ `Sprachkenntnisse`

---

# 16. Zertifikate / Weiterbildungen

Mevcut `CertificateListEditor` korunmalı ve sıralama eklenmeli.

Alanlar:

* Zertifikat / Weiterbildung
* Anbieter / Institution
* Datum / Zeitraum

Ayrıca bölüm başlığı değiştirilebilmeli:

`Zertifikate`
→ `Zertifikate & Weiterbildungen`

---

# 17. Profile ve Lebenslauf aynı canonical veriyi kullanmalı

Bu kritik gereksinimdir.

Şu yapıyı oluşturma:

`ProfileView data`
+
`ResumeDataEditor data`
+
`Template-specific content data`

Tek veri akışı kullan:

`ApplicantProfile`
→ editor
→ shared resolver/view-model
→ template
→ Preview/PDF/DOCX

Profil ekranından yapılan değişiklik Lebenslauf ekranında görünmeli.

Lebenslauf ekranından yapılan değişiklik tekrar profile kaydedilmeli.

Aynı şey **başlıklar/Labels** için de geçerlidir.

---

# 18. Textarea ve structured list ayrımı

Uzun tekil açıklamalarda `textarea` kullan:

* Kurzprofil
* Beschreibung
* description alanları

Ancak bağımsız Stichpunkte tek textarea içine newline ile gömülmemeli.

Yanlış:

```ts
achievements = "Punkt 1\nPunkt 2\nPunkt 3"
```

Doğru:

```ts
achievements = [
  "Punkt 1",
  "Punkt 2",
  "Punkt 3"
]
```

Çünkü kullanıcı her maddeyi ayrı ayrı sıralayabilmelidir.

---

# 19. Editor UI

Profil ekranını kontrolsüz uzun forma dönüştürme.

Mevcut `<details>` / collapsible section yapısını kullan veya iyileştir.

Örneğin:

`Berufserfahrung (4)`
`Stärken (6)`
`Sprachen (3)`
`Zertifikate (8)`

Section açıldığında en üstte:

`Angezeigte Überschrift / Label`

alanı yer alsın.

Örneğin:

**Berufserfahrung (4)**

`Angezeigte Überschrift`
`[ Beruflicher Werdegang ]`

---

# 20. Internal name ile visible label'ı ayır

Kod tarafındaki semantic/internal identifier kullanıcı tarafından değiştirilmemeli.

Örneğin internal:

`career`

aynı kalmalı.

Kullanıcı yalnız visible title değiştirmeli:

`career`
→ visible label:
`Beruflicher Werdegang`

Bu nedenle kullanıcı başlık değiştirdiğinde:

* section type değişmemeli
* semanticType değişmemeli
* renderer mapping bozulmamalı
* template placement bozulmamalı

Yalnız görünen title değişmelidir.

---

# 21. Tasarım sistemine dokunma

Bu görev kapsamında değiştirme:

* Lebenslauf template CSS'leri
* font sistemi
* renk sistemi
* column layout
* template-specific placement
* margin/padding tasarımı
* hazır Muster görünümü

Sadece editor UI'da yeni label/input/sort controls için gereken minimal stilleri ekle.

---

# 22. Backward compatibility

Mevcut kullanıcı profilleri kaybolmamalı.

Özellikle koru:

* `resumeSectionTitles`
* `resumeSemanticSections`
* `knowledgeSection`
* `resumeKnowledgeGroups`
* `specialSections`
* `strengths`
* `languages`
* `certifications`
* experiences
* education

Sadece başlık özelleştirmek için gereksiz schema migration yapma.

Mevcut `customTitle` veya mevcut title property kullanılabiliyorsa onu kullan.

Migration gerçekten gerekiyorsa eski title değerlerinin tamamını güvenli şekilde taşı.

---

# 23. Başlık için fallback davranışı

Custom title boş olduğunda section kaybolmamalı.

Örneğin:

```text
custom title mevcut
    ↓
custom title kullan

custom title boş
    ↓
mevcut default title kullan
```

Boş string nedeniyle Lebenslauf'ta başlıksız section oluşmasına izin verme.

Kullanıcı title alanını tamamen silerse default title'a fallback yapılabilir veya mevcut validation davranışına uygun çözüm kullanılabilir.

---

# 24. Tests

Aşağıdaki durumlar test edilmeli:

1. `Berufserfahrung` başlığı değiştirilebiliyor.
2. Yeni başlık Preview'da görünüyor.
3. PDF aynı başlığı kullanıyor.
4. DOCX aynı başlığı kullanıyor.
5. Profil kaydedilip yeniden açıldığında custom title korunuyor.
6. `Standard wiederherstellen` default title'a dönüyor.
7. Semantic internal type title değişikliğinden etkilenmiyor.
8. `Stärken` başlığı değiştirilebiliyor.
9. `Sprachen` başlığı değiştirilebiliyor.
10. `Zertifikate` başlığı değiştirilebiliyor.
11. Knowledge Group title değiştirilebiliyor.
12. Special Section title değiştirilebiliyor.
13. Eski profile title verileri kaybolmuyor.
14. Achievement yukarı/aşağı/başa/sona taşınabiliyor.
15. Language sırası korunuyor.
16. Strength sırası korunuyor.
17. Special Section entry/bullet sırası korunuyor.
18. ProfileView değişikliği ResumeDataEditor'da görülüyor.
19. ResumeDataEditor değişikliği profile kaydoluyor.
20. Mevcut template tasarımlarında görsel regresyon oluşmuyor.

---

# 25. Uygulama yöntemi

Önce repository'nin gerçek mevcut durumunu analiz et.

Ardından hangi dosyaların değişmesi gerektiğini belirle.

Mevcut component ve resolver'ları yeniden kullan.

Hardcoded section title bulunan renderer'ları tespit et.

Gerekli yerlerde merkezi title resolver'a geçir.

Ancak bu işlemi template tasarım refactoring'ine dönüştürme.

Her aşamada TypeScript tip güvenliğini koru.

Repository'deki gerçek scriptleri `package.json` üzerinden kontrol ederek sonunda:

```bash
npm run typecheck
npm test
npm run build
```

veya projedeki gerçek eşdeğerlerini çalıştır.

---

# Başarı kriteri

Kullanıcı `BewerbungsManager → Profil` veya Lebenslauf içerik editörü üzerinden:

* Lebenslauf içeriklerini düzenleyebilmeli,
* Stärken, Sprachen, Zertifikate ve diğer listeleri sıralayabilmeli,
* Berufserfahrung içerisindeki Aufgaben/Projekte/Erfolge maddelerini sıralayabilmeli,
* section başlıklarını değiştirebilmeli,
* ekranda görünen **Labels/Überschriften** üzerinde tam kontrol sahibi olmalı.

Örneğin kullanıcı:

`Zusammenfassung`
→ `Über mich`

`Berufserfahrung`
→ `Beruflicher Werdegang`

`Ausbildung`
→ `Bildungsweg`

`Kenntnisse`
→ `IT-Kenntnisse`

`Sprachen`
→ `Sprachkenntnisse`

`Stärken`
→ `Persönliche Kompetenzen`

yapabilmelidir.

Bu değişiklikler tek canonical profile verisine kaydedilmeli ve **mevcut Lebenslauf tasarımını değiştirmeden** Preview, PDF ve DOCX çıktılarında aynı şekilde görünmelidir.

* Konu: **BewerbungsManager – Profil verilerinin Lebenslauf içinde doğrudan güncellenebilmesi**
* İstenilen çıktı: **Profil** bölümünde girilen Lebenslauf verilerinin **Lebenslauf** ekranında da düzenlenebilmesi ve yapılan değişikliklerin tekrar aynı Profil verisine kaydedilmesi.
* Kullanılacak framework: **RASCEF**
* Senin yazacağın prompt:

[https://github.com/mustafa-oezdemir/bewerbung_manager.git](https://github.com/mustafa-oezdemir/bewerbung_manager.git) repository'sinin güncel `main` branch'ini incele ve mevcut Lebenslauf içerik yönetimini geliştir.

Bu görevde temel prensip şudur:

# KRİTİK: Profil ve Lebenslauf ayrı veri tutmamalı

**BewerbungsManager → Profil** bölümünde girilen Lebenslauf verileri ana/master veri kaynağıdır.

Ancak kullanıcı aynı verileri:

**BewerbungsManager → Lebenslauf**

ekranında da doğrudan görebilmeli, düzenleyebilmeli ve güncelleyebilmelidir.

Yani sistem şu şekilde çalışmalıdır:

```text
Profil
   ↓
ApplicantProfile / canonical data
   ↕
Lebenslauf Editor
   ↓
Preview / PDF / DOCX
```

Şu yapıyı KESİNLİKLE oluşturma:

```text
Profil için ayrı veri
+
Lebenslauf için ayrı veri
+
Template için ayrı veri
```

Tek bir canonical veri kaynağı kullanılmalıdır.

Mevcut mimaride mümkün olduğunca `ApplicantProfile` bu master veri kaynağı olarak kullanılmalıdır.

---

# 1. Profil bölümünde veri girişi

**BewerbungsManager → Profil** ekranında kullanıcı Lebenslauf için temel bilgilerini girebilsin.

Örneğin:

## Persönliche Daten

* Vorname
* Nachname
* Berufsbezeichnung / Titel
* Straße
* PLZ
* Ort
* Land
* Telefon
* E-Mail
* LinkedIn
* GitHub
* Portfolio
* Online-Profile
* Geburtsdatum
* Geburtsort
* Staatsangehörigkeit
* Familienstand
* Kinder
* Bewerbungsfoto
* Unterschrift

## Lebenslauf-Inhalte

* Kurzprofil / Über mich
* Stärken
* Berufserfahrung
* Ausbildung / Bildungsweg
* Kenntnisse
* Sprachen
* Zertifikate / Weiterbildungen
* Projekte
* Praktika
* Auslandserfahrung
* Ehrenamt
* Interessen & Hobbys
* Führerschein
* Zusatzangaben
* Referenzen
* eigene Abschnitte

Profil ekranında girilen bütün bu bilgiler kaydedilmelidir.

---

# 2. Lebenslauf ekranına girildiğinde Profil verilerini yükle

Kullanıcı:

**BewerbungsManager → Lebenslauf**

bölümüne geçtiğinde seçili Profil'in verileri otomatik olarak Lebenslauf editörüne gelmelidir.

Kullanıcı aynı bilgileri tekrar girmek zorunda kalmamalıdır.

Örneğin Profil'de:

```text
Vorname: Mustafa
Nachname: Özdemir
Titel: Anwendungsentwickler
```

girildiyse Lebenslauf editörü bunları doğrudan göstermelidir.

Aynı durum bütün Lebenslauf içerikleri için geçerlidir.

---

# 3. Lebenslauf ekranında Profil verileri düzenlenebilsin

Bu görevdeki en önemli yeni gereksinim budur.

Lebenslauf ekranı yalnız Preview veya tasarım ekranı olmamalıdır.

Kullanıcı Lebenslauf ekranından da içeriği değiştirebilmelidir.

Örneğin Profil'de:

```text
Kurzprofil:
Softwareentwickler mit Schwerpunkt auf Backend-Entwicklung...
```

bulunuyorsa kullanıcı Lebenslauf ekranında bunu:

```text
Backend-orientierter Softwareentwickler mit Erfahrung in Go...
```

olarak değiştirebilmelidir.

**Speichern / Aktualisieren** yapıldığında yeni değer tekrar aynı `ApplicantProfile` içine yazılmalıdır.

Profil ekranına geri dönüldüğünde güncel değer görünmelidir.

---

# 4. Bidirectional Synchronisation

Senkronizasyon çift yönlü olmalıdır.

## Profil → Lebenslauf

Profil'de:

```text
Deutsch – C1
Türkisch – Muttersprache
Englisch – B1
```

girildiyse Lebenslauf'ta aynı veriler görünmelidir.

## Lebenslauf → Profil

Lebenslauf'ta kullanıcı:

```text
Deutsch – C1
Englisch – B2
Türkisch – Muttersprache
```

şeklinde değiştirip kaydederse Profil'e geri dönüldüğünde aynı güncel veriler görünmelidir.

Yani:

```text
ProfileView
        ↕
ApplicantProfile
        ↕
ResumeDataEditor
```

olmalıdır.

`ProfileView.tsx` ve `ResumeDataEditor.tsx` aynı profil alanlarının bağımsız kopyalarını üretmemelidir.

Local draft kullanılabilir fakat **Save** işleminde aynı canonical `ApplicantProfile` güncellenmelidir.

---

# 5. Lebenslauf ekranında düzenlenebilecek veriler

Lebenslauf editöründe en az aşağıdaki Profil verileri değiştirilebilsin:

### Persönliche Daten

* Name
* Titel
* Adresse
* Telefon
* E-Mail
* Online-Profile
* Geburtsinformationen
* weitere relevante persönliche Angaben

### Kurzprofil

* Text direkt düzenlenebilsin.

### Stärken

Her Stärke için:

* Titel
* Beschreibung
* Icon, destekleniyorsa
* Nach oben
* Nach unten
* An den Anfang
* Ans Ende
* Löschen

### Berufserfahrung

Her Station:

* Von
* Bis
* Position
* Unternehmen
* Ort
* Rechtsform
* Beschäftigungsart
* Beschreibung
* Aufgaben
* Projekte
* Technologien
* Erfolge / Achievements

alanları Lebenslauf ekranından da güncellenebilsin.

### Ausbildung

* Zeitraum
* Abschluss
* Institution
* Ort
* Land
* Fachrichtung
* Note
* Status
* Beschreibung

### Kenntnisse

Mevcut `knowledgeSection` / `resumeKnowledgeGroups` yapısını kullan.

### Sprachen

Mevcut `LanguageLevelEditor` korunmalı.

Dil adı, GER/CEFR seviyesi ve sırası Lebenslauf'tan da değiştirilebilmeli.

### Zertifikate

Mevcut `CertificateListEditor` verileri Lebenslauf'tan da güncellenebilmeli.

### Special Sections

* Projekte
* Praktika
* Weiterbildungen
* Auslandserfahrung
* Stipendien
* Auszeichnungen
* Veröffentlichungen
* Ehrenamt
* Interessen & Hobbys
* Führerschein
* Zusatzangaben
* Referenzen
* Eigene Abschnitte

aynı şekilde düzenlenebilmelidir.

---

# 6. Görünen bölüm başlıkları / Labels da düzenlenebilsin

Hem Profil hem de Lebenslauf editöründe Lebenslauf'ta görünen bölüm başlıkları kullanıcı tarafından değiştirilebilmelidir.

Örneğin:

```text
Zusammenfassung
→ Über mich
```

```text
Berufserfahrung
→ Beruflicher Werdegang
```

```text
Ausbildung
→ Bildungsweg
```

```text
Kenntnisse
→ IT-Kenntnisse
```

```text
Sprachen
→ Sprachkenntnisse
```

```text
Stärken
→ Persönliche Kompetenzen
```

Kullanıcı yalnız görünen Label/Überschrift'i değiştirmelidir.

Internal identifier değişmemelidir.

Örneğin:

```text
semanticType = career
```

aynı kalır.

Sadece:

```text
customTitle = "Beruflicher Werdegang"
```

değişir.

---

# 7. Mevcut title sistemlerini birleştir

Repository'deki mevcut:

* `resumeSectionTitles`
* `resumeSectionLabels`
* `defaultEditableResumeSectionTitles`
* `resumeSemanticSections[].customTitle`
* `resumeSectionDefinitions[].defaultTitle`
* `knowledgeSection.title`
* `resumeKnowledgeGroups[].title`
* `specialSections[].title`

yapılarını analiz et.

Yeni paralel title sistemi oluşturma.

Tek bir deterministik title resolver kullan.

Örneğin mantık:

```text
custom user title
        ↓ yoksa
existing saved title
        ↓ yoksa
default title
```

Preview, PDF ve DOCX aynı resolver'dan gelen başlığı kullanmalıdır.

---

# 8. İçeriklerin sırası Lebenslauf'tan da değiştirilebilsin

Repeatable içeriklerde:

* ↑ Nach oben
* ↓ Nach unten
* ⇈ An den Anfang
* ⇊ Ans Ende
* Löschen

kontrolleri olsun.

Özellikle:

* Stärken
* Sprachen
* Zertifikate
* Berufserfahrung
* Ausbildung
* Aufgaben
* Projekte
* Achievements
* Technologien
* Knowledge Groups
* Knowledge Items
* Special Sections
* Special Section Entries
* Bullets

için uygulanmalıdır.

Örneğin:

```text
Entwicklung einer funktionsfähigen Monitoring-Lösung für die Integration von PRTG-Daten in Grafana

Produktiver Einsatz des entwickelten Plugins im Fachdienst Technische Dienste

Verbesserung der Nachvollziehbarkeit durch Logging, Fehlerbehandlung und Metriken
```

ayrı ayrı item olarak tutulmalıdır.

Kullanıcı ikinci maddeyi birinci sıraya taşıyabilmelidir.

---

# 9. Reusable editor oluştur

Mevcut `EntryListEditor` ve diğer mevcut componentleri incele.

Aynı davranışı tekrar tekrar kodlama.

Mümkünse reusable bir sortable editor oluştur veya mevcut editorleri genişlet.

Desteklenecek işlemler:

```text
add
edit
delete
moveUp
moveDown
moveFirst
moveLast
```

Array sırası canonical sıralama olmalıdır.

---

# 10. Lebenslauf ekranında Save davranışı

Lebenslauf editöründe açık bir:

**Änderungen speichern**

veya mevcut tasarıma uygun:

**Aktualisieren**

işlemi bulunmalıdır.

Bu işlem:

1. mevcut Lebenslauf draft'ını validate etsin,
2. canonical `ApplicantProfile` verisini güncellesin,
3. `saveProfile()` üzerinden storage'a yazsın,
4. Preview'ı güncellesin,
5. Profil ekranında aynı değişikliğin görünmesini sağlasın.

Ayrı bir `resume-data.json` gibi ikinci veri kaynağı oluşturma.

---

# 11. Kullanıcı uygulamayı kapatıp açtığında veri korunmalı

Örneğin kullanıcı Lebenslauf ekranında:

```text
Deutsch – B2
```

değerini:

```text
Deutsch – C1
```

olarak değiştirdi.

Program kapatılıp tekrar açıldığında:

**Profil → Deutsch – C1**

ve

**Lebenslauf → Deutsch – C1**

olmalıdır.

Aynı davranış:

* metin
* title/label
* section sırası
* item sırası
* visibility

için geçerli olmalıdır.

---

# 12. Birden fazla Profil desteğini bozma

BewerbungsManager birden fazla `ApplicantProfile` destekliyorsa seçili profile göre çalış.

Örneğin:

```text
Profil A
Profil B
```

varsa Lebenslauf'taki değişiklik yalnız seçili/aktif profile yazılmalıdır.

Yanlış profile veri taşınmasına izin verme.

Mevcut `selectedProfileId`, `application.profileId` ve `resolveSelectedProfile()` akışını incele ve mevcut davranışı koru.

---

# 13. Preview anında güncellensin

Lebenslauf editöründe kullanıcı:

* metni,
* bir başlığı,
* bir Sprache'yi,
* bir Stärke'yi,
* bir Achievement'ı,
* sıralamayı

değiştirdiğinde mevcut Preview mekanizması destekliyorsa önizleme draft üzerinden anında güncellensin.

Ancak kalıcı Profil verisi Save/Aktualisieren işlemiyle güvenli şekilde kaydedilsin.

Mevcut autosave sistemi varsa repository'deki gerçek davranışa uy.

---

# 14. Preview / PDF / DOCX aynı veriyi kullanmalı

Data flow:

```text
ApplicantProfile
       ↓
shared ResumeViewModel / resolver
       ↓
 ┌─────────────┬─────────────┬─────────────┐
 Preview       PDF           DOCX
```

şeklinde olmalıdır.

PDF başka veri,
Preview başka veri,
DOCX başka veri

yorumlamamalıdır.

Özellikle kullanıcı tarafından değiştirilen:

* Inhalte
* Reihenfolge
* Labels / Überschriften

bütün çıktılarda aynı olmalıdır.

---

# 15. Tasarım sistemini değiştirme

Bu görev:

**Content Editing + Data Synchronisation**

görevidir.

Şunları değiştirme:

* mevcut Lebenslauf template design
* CSS layout
* renkler
* fontlar
* column layout
* spacing
* template placement tasarımı
* mevcut Muster görünümü

Sadece editor için gerekli minimal UI değişikliklerini yap.

---

# 16. Backward Compatibility

Var olan profile verilerini kaybetme.

Özellikle:

* strengths
* experiences
* education
* languages
* certifications
* knowledgeSection
* resumeKnowledgeGroups
* specialSections
* resumeSectionTitles
* resumeSemanticSections
* section layouts

korunmalıdır.

Sadece Profil ↔ Lebenslauf synchronization sağlamak için gereksiz yeni schema oluşturma.

---

# 17. Testler

Aşağıdaki senaryoları test et:

1. Profil'de girilen Kurzprofil Lebenslauf'ta görünüyor.
2. Lebenslauf'ta Kurzprofil değiştirilip kaydedildiğinde Profil güncelleniyor.
3. Profil'de eklenen Sprache Lebenslauf'ta görünüyor.
4. Lebenslauf'ta Sprache seviyesi değiştirilince Profil güncelleniyor.
5. Stärke Lebenslauf'tan değiştirilebiliyor.
6. Achievement Lebenslauf'tan değiştirilebiliyor.
7. Achievement sırası Profile'a doğru kaydediliyor.
8. Section title Lebenslauf'tan değiştirilebiliyor.
9. Yeni title Profile'da da görünüyor.
10. Preview güncel title/content kullanıyor.
11. PDF güncel title/content kullanıyor.
12. DOCX güncel title/content kullanıyor.
13. Program restart sonrası değişiklik korunuyor.
14. Bir Profil üzerinde yapılan değişiklik başka profile aktarılmıyor.
15. Eski kayıtlı profile verileri hâlâ yükleniyor.
16. Mevcut template tasarımları bozulmuyor.

Sonunda repository'deki gerçek scriptleri kontrol ederek:

```bash
npm run typecheck
npm test
npm run build
```

veya projede kullanılan eşdeğerlerini çalıştır.

---

# Başarı kriteri

Kullanıcı önce:

**BewerbungsManager → Profil**

bölümüne Lebenslauf bilgilerini girer.

Daha sonra:

**BewerbungsManager → Lebenslauf**

bölümüne geçtiğinde aynı bilgileri hazır görür.

Burada istediği bilgiyi:

* değiştirebilir,
* silebilir,
* yeni bilgi ekleyebilir,
* sıralayabilir,
* görünen başlıkları/Labels değiştirebilir.

Kaydettiğinde değişiklikler doğrudan aynı **Profil / ApplicantProfile** verisine yazılır.

Profil ekranına geri döndüğünde yeni değerler görünür.

Böylece sistemin temel veri akışı:

**Profil ↔ Lebenslauf**

çift yönlüdür ve tek canonical veri kaynağı kullanır.

Bu sürümde özellikle **“Profil'de gir → Lebenslauf'ta düzenle → tekrar aynı Profil'e kaydet”** davranışı ana mimari gereksinim haline getirildi.

https://github.com/mustafa-oezdemir/bewerbung_manager.git repository'sinin güncel `main` branch'ini incele ve **BewerbungsManager → Lebenslauf** veri/ayar yönetimindeki persistence problemini düzelt.

Bu görevde temel prensip şudur:

# KRİTİK KURAL

Kullanıcı Lebenslauf üzerinde bir değişiklik yaptıktan ve **Speichern / Aktualisieren** ile kaydettikten sonra, kaydedilen **son durum canonical durumdur**.

Lebenslauf ekranı yeniden açıldığında, başka bölüme geçilip geri dönüldüğünde, başka Bewerbung/Profile seçilip tekrar dönüldüğünde veya uygulama tamamen kapatılıp yeniden açıldığında:

**son kaydedilen durum aynen geri yüklenmelidir.**

Sistem hiçbir şekilde otomatik olarak:

* Muster değerlerine,
* template defaults değerlerine,
* `defaultDocumentDesign`,
* `defaultResumeSectionInstances`,
* default section order,
* default labels,
* default visibility,
* default colors,
* default column layout

değerlerine geri dönmemelidir.

Default/Muster değerleri yalnızca **ilk oluşturma** veya kullanıcının açıkça **Zurücksetzen / Standard wiederherstellen** işlemi yapması durumunda kullanılmalıdır.

---

# 1. Önce mevcut reset probleminin kaynağını bul

Özellikle şunları incele:

* `src/views/DocumentsView.tsx`
* `src/store/useAppStore.ts`
* `src/shared/schema.ts`
* `src/shared/documentDesign.ts`
* `src/shared/templates.ts`
* `src/views/ProfileView.tsx`
* `src/components/resume/ResumeDataEditor.tsx`
* `src/components/resume/ResumeSectionsPanel.tsx`
* `src/features/resume-sections/`
* Electron storage/save/load sistemi

Özellikle şu patternleri ara:

```ts
defaultDocumentDesign
```

```ts
templates[0]
```

```ts
getTemplate(...)
```

```ts
defaultResumeSectionInstances()
```

```ts
getDefaultResumeSectionLayout(...)
```

ve benzeri default değerlerin mevcut kayıtlı verinin üzerine tekrar yazıldığı noktaları tespit et.

Mevcut `DocumentsView` içerisinde local `design` state ile `application.designSettings`, `templateId`, `accentColor`, `secondaryColor` arasındaki lifecycle'ı özellikle incele.

---

# 2. Default değerler yalnız initialization için kullanılmalı

Şu mantığı uygula:

```text
Kayıtlı kullanıcı değeri var mı?
        │
        ├── EVET → kayıtlı değeri kullan
        │
        └── HAYIR → template/default değeri kullan
```

Şu yanlış davranışı engelle:

```text
Lebenslauf açıldı
↓
template bulundu
↓
template defaults tekrar uygulandı
↓
kullanıcının kaydettiği ayarlar kayboldu
```

Doğru davranış:

```text
Lebenslauf açıldı
↓
Application + ApplicantProfile yükle
↓
kayıtlı Lebenslauf configuration/design yükle
↓
yalnız eksik alanlarda fallback default kullan
```

Default bir **fallback** olmalıdır.

Default bir **overwrite mekanizması** olmamalıdır.

---

# 3. Kaydedilmesi gereken Lebenslauf ayarları

Kullanıcının yaptığı aşağıdaki değişikliklerin tamamı kalıcı olmalıdır.

## Template

* seçili Lebenslauf Muster / `templateId`

## Farben

* accentColor
* secondaryColor
* textColor
* headingColor
* lineColor
* backgroundColor

## Typografie

* fontId
* headingFontId
* fontSize
* lineHeightLevel

## Layout

* columnLayout
* marginLevel
* paddingLevel
* sectionSpacingLevel
* resumeColumnRatio

## Hintergrund

* backgroundId
* backgroundScope
* backgroundShadeLevel
* showBackgroundInPrint

## Ausgabe

* resumeOutputMode
* ATS/Visual ilgili kayıtlı seçenekler

## Sections

* görünür/gizli durumu
* enabled durumu
* section order
* zone / placement
* template-specific section layout
* custom title / görünen Label
* knowledge group placement
* knowledge group order
* pageBreakBefore
* closing visibility seçenekleri

## Persönliche Felder

* hangi kişisel bilgilerin Lebenslauf'ta gösterileceği

## Weitere Lebenslauf-Einstellungen

Mevcut `ApplicantProfile` veya Application içerisinde bulunan diğer kullanıcı tarafından değiştirilebilir Lebenslauf configuration alanlarını da tespit et ve persistence kapsamına dahil et.

---

# 4. Profil verileri master içerik verisi olmaya devam etsin

**BewerbungsManager → Profil** bölümünde girilen Lebenslauf içerikleri master/canonical profile verisidir.

Örneğin:

* Persönliche Daten
* Kurzprofil
* Stärken
* Berufserfahrung
* Ausbildung
* Kenntnisse
* Sprachen
* Zertifikate
* Projekte
* Special Sections

`ApplicantProfile` üzerinden yönetilmelidir.

Kullanıcı aynı verileri:

**BewerbungsManager → Lebenslauf**

ekranında da düzenleyebilmelidir.

Data flow:

```text
ProfileView
     ↕
ApplicantProfile
     ↕
ResumeDataEditor
     ↓
Preview
     ↓
PDF / DOCX
```

Lebenslauf ekranında yapılan içerik değişiklikleri tekrar aynı profile kaydedilmelidir.

---

# 5. Content ile Design persistence birbirinden ayrılmalı

Aşağıdaki ayrımı net tut:

```text
ApplicantProfile
→ CV içerikleri
→ section içerikleri
→ Labels
→ sıralamalar
→ görünürlük gibi profile özgü resume configuration
```

ve:

```text
Application / DocumentDesignSettings
→ seçili template
→ renkler
→ fontlar
→ margin
→ padding
→ column layout
→ background
→ diğer document design ayarları
```

Mevcut mimariye göre hangi ayarın hangi entity'ye ait olması gerektiğini belirle.

Ancak aynı ayarı iki farklı yerde bağımsız olarak saklama.

**Single Source of Truth** kullan.

---

# 6. Lebenslauf'ta içerikler güncellenebilsin

Profil'de girilmiş veriler Lebenslauf ekranında hazır gelsin.

Kullanıcı Lebenslauf'tan:

* içerik değiştirebilsin,
* yeni item ekleyebilsin,
* item silebilsin,
* item sıralayabilsin,
* section başlıklarını değiştirebilsin.

Kaydettiğinde aynı `ApplicantProfile` güncellensin.

Örneğin:

```text
Profil:

Deutsch – C1
Türkisch – Muttersprache
Englisch – B1
```

Lebenslauf'ta:

```text
Deutsch – C1
Englisch – B2
Türkisch – Muttersprache
```

olarak değiştirilip kaydedilirse Profil ekranı da bu son durumu göstermelidir.

---

# 7. Görünen Labels / Überschriften kalıcı olmalı

Kullanıcı:

```text
Zusammenfassung
→ Über mich
```

veya:

```text
Berufserfahrung
→ Beruflicher Werdegang
```

veya:

```text
Sprachen
→ Sprachkenntnisse
```

olarak değiştirdiğinde bu değerler kaydedilmelidir.

Lebenslauf yeniden açıldığında tekrar:

`Zusammenfassung`

görünmemelidir.

Son kaydedilen:

`Über mich`

görünmelidir.

Mevcut:

* `resumeSectionTitles`
* `resumeSemanticSections[].customTitle`
* `knowledgeSection.title`
* `resumeKnowledgeGroups[].title`
* `specialSections[].title`

yapılarını analiz et.

Yeni paralel title sistemi oluşturma.

---

# 8. Section sıraları kalıcı olmalı

Kullanıcı section sırasını değiştirirse:

```text
1. Kurzprofil
2. Berufserfahrung
3. Ausbildung
4. Kenntnisse
5. Sprachen
```

ve bunu:

```text
1. Kurzprofil
2. Kenntnisse
3. Berufserfahrung
4. Ausbildung
5. Sprachen
```

yaparsa kaydedilen ikinci sıra korunmalıdır.

Template tekrar açıldığında default section order ile üzerine yazılmamalıdır.

Aynı durum:

* `resumeSectionLayout`
* `resumeSectionLayouts`
* `resumeSemanticSections.order`
* knowledge group order

için geçerlidir.

---

# 9. İç item sıraları da kalıcı olmalı

Özellikle:

* Stärken
* Sprachen
* Zertifikate
* Berufserfahrung
* Ausbildung
* Aufgaben
* Projekte
* Achievements
* Technologien
* Knowledge Groups
* Knowledge Items
* Special Sections
* Special Section Entries
* Bullets

için kullanıcı sıralamayı değiştirdiğinde kaydet ve yeniden yükle.

Örneğin:

```text
1. Entwicklung einer Monitoring-Lösung
2. Produktiver Einsatz des Plugins
3. Verbesserung von Logging und Fehlerbehandlung
```

kullanıcı:

```text
1. Produktiver Einsatz des Plugins
2. Entwicklung einer Monitoring-Lösung
3. Verbesserung von Logging und Fehlerbehandlung
```

yapıp kaydederse tekrar eski sıraya dönmemelidir.

---

# 10. Template seçimi kullanıcı ayarlarını sıfırlamamalı

İki durumu birbirinden ayır:

## Kullanıcı yeni template'i ilk kez seçtiğinde

Template'in gerekli varsayılan layout değerleri başlangıç için kullanılabilir.

## Template daha önce kullanıcı tarafından düzenlendiyse

Daha önce kaydedilmiş template-specific ayarlar yüklenmelidir.

Örneğin mevcut:

```ts
resumeSectionLayouts: Record<templateId, ...>
```

benzeri yapı varsa bundan yararlan.

Kullanıcı:

`modern`

template'ini düzenledi,

sonra:

`klassisch`

template'ine geçti,

sonra tekrar:

`modern`

template'ine döndü.

Bu durumda daha önce `modern` için kaydettiği düzen mümkün olduğunca geri gelmelidir.

Her template seçimi:

```text
Muster laden → user settings yok et
```

şeklinde çalışmamalıdır.

---

# 11. Speichern gerçekten persistence yapmalı

**Speichern / Aktualisieren** işlemi yalnız React local state'i değiştirmemelidir.

Gerekli değişiklikler gerçek persistence katmanına yazılmalıdır.

Mevcut yapıya göre:

```text
saveProfile(...)
```

ve/veya:

```text
saveApplication(...)
```

gerçekten çağrılmalı.

Sonrasında store güncel workspace'i yansıtmalıdır.

Kaydetme işleminden sonra component yeniden render olduğunda eski state'ten veri gelmemelidir.

---

# 12. Save sonrası state race-condition kontrolü

Özellikle şu tip bug'ları araştır:

```text
setDesign(newSettings)
↓
saveApplication(oldApplication)
```

veya:

```text
saveProfile(newProfile)
↓
effect eski profile'i tekrar draft'a yazar
```

veya:

```text
save
↓
workspace hydrate
↓
default/template değerleri tekrar local state'e set edilir
```

React `useEffect`, `useState`, Zustand store güncellemesi ve async persistence sırasını dikkatlice incele.

**Stale state / stale closure / race condition** varsa düzelt.

---

# 13. Re-render default reset yapmamalı

Component mount olduğunda veya dependency değiştiğinde çalışan `useEffect`'ler:

yalnız doğru application/profile değiştiğinde state initialize etmelidir.

Her render veya save sonrasında:

```ts
setDesign(default...)
```

veya template defaults uygulayan davranış olmamalıdır.

Özellikle aşağıdaki senaryoları kontrol et:

* initial mount
* tab değişimi
* application değişimi
* profile değişimi
* template değişimi
* save sonrası workspace update
* preview update
* React remount

---

# 14. Program restart testi zorunlu

Persistence yalnız aynı session içinde çalışıyor olması yeterli değildir.

Şu gerçek senaryoyu test et:

```text
1. Uygulamayı aç
2. Bewerbung seç
3. Lebenslauf aç
4. Template seç
5. Farbe değiştir
6. Font değiştir
7. Margin değiştir
8. Section sırası değiştir
9. Label değiştir
10. Sprache sırasını değiştir
11. Speichern
12. Uygulamayı tamamen kapat
13. Uygulamayı yeniden başlat
14. Aynı Bewerbung + Profil + Lebenslauf'u aç
```

Beklenen sonuç:

**11. adımda kaydedilen durumun tamamı geri gelmelidir.**

---

# 15. Navigation persistence testi

Ayrıca test et:

```text
Lebenslauf düzenle
↓
Speichern
↓
Profil'e git
↓
Anschreiben'e git
↓
Lebenslauf'a geri dön
```

Ayarlar korunmalıdır.

---

# 16. Application değiştirme testi

```text
Bewerbung A
→ Lebenslauf ayarla
→ speichern

Bewerbung B
→ farklı Lebenslauf ayarla
→ speichern

Bewerbung A'ya geri dön
```

Bewerbung A'nın son kaydedilmiş ayarları geri gelmelidir.

Bewerbung B'nin ayarları A'nın üzerine yazılmamalıdır.

---

# 17. Profil değiştirme testi

Birden fazla profile varsa:

```text
Profil A
Profil B
```

Profil A'nın içerik/configuration değişiklikleri Profil B'nin üzerine yazılmamalıdır.

`selectedProfileId`, `application.profileId` ve `resolveSelectedProfile()` akışlarını kontrol et.

---

# 18. Reset yalnız explicit kullanıcı aksiyonu olsun

Eğer uygulamada:

* Standard wiederherstellen
* Zurücksetzen
* Muster übernehmen

gibi bir özellik olacaksa kullanıcı bunu açıkça tetiklemelidir.

Normal:

* Save
* navigation
* reload
* application restart
* preview refresh

işlemleri reset sebebi olmamalıdır.

---

# 19. Preview / PDF / DOCX kaydedilmiş son durumu kullanmalı

Tüm çıktılar:

```text
Persisted Application
+
Persisted ApplicantProfile
+
Resolved Resume Configuration
          ↓
     ResumeViewModel
     ↙      ↓      ↘
Preview   PDF     DOCX
```

mantığıyla çalışmalıdır.

Preview'da doğru olup PDF'de eski/default ayar çıkmasına izin verme.

---

# 20. Gereksiz schema oluşturma

Sorun React state / save/load lifecycle kaynaklıysa yeni database/schema oluşturma.

Önce mevcut:

* `Application`
* `ApplicantProfile`
* `DocumentDesignSettings`
* `resumeSectionLayouts`
* `resumeSemanticSections`
* mevcut persistence

alanlarını doğru kullan.

Yeni alan yalnız gerçekten mevcut modelin saklayamadığı bir kullanıcı ayarı varsa eklenmelidir.

---

# 21. Backward compatibility

Mevcut kullanıcı verilerini bozma.

Eski Bewerbung/Profile kayıtları açılabilmelidir.

Eksik yeni alanlarda default fallback kullan.

Ancak mevcut kayıtlı değer varsa default ile overwrite etme.

Temel kural:

```ts
savedValue ?? defaultValue
```

mantığıdır.

Şu mantıktan kaçın:

```ts
defaultValue
```

ve ardından kullanıcı değerini kaybetmek.

---

# 22. Testler

En az aşağıdaki regression testlerini ekle:

1. Design settings save sonrası korunuyor.
2. Lebenslauf ekranı yeniden açıldığında korunuyor.
3. Application restart sonrası korunuyor.
4. Template seçimi korunuyor.
5. Accent/secondary color korunuyor.
6. Fontlar korunuyor.
7. Margin/padding korunuyor.
8. Column layout korunuyor.
9. Background korunuyor.
10. Resume output mode korunuyor.
11. Section visibility korunuyor.
12. Section order korunuyor.
13. Template-specific section layout korunuyor.
14. Custom Labels korunuyor.
15. Knowledge group order/title korunuyor.
16. Personal field visibility korunuyor.
17. Sprache sırası korunuyor.
18. Stärke sırası korunuyor.
19. Achievement sırası korunuyor.
20. Profil ↔ Lebenslauf içerik değişiklikleri korunuyor.
21. Bewerbung A ayarı Bewerbung B'ye sızmıyor.
22. Profil A verisi Profil B'ye sızmıyor.
23. Save sonrası hiçbir effect default/Muster ayarını tekrar uygulamıyor.
24. Eski workspace/profile/application verileri açılmaya devam ediyor.

---

# 23. Uygulama yöntemi

Önce problemi yeniden üret.

Daha sonra hangi state'in:

```text
UI local state
→ Zustand
→ IPC
→ Electron storage
→ workspace.json
```

zincirinin hangi noktasında kaybolduğunu belirle.

Tahmin ederek patch yazma.

Persistence zincirini uçtan uca doğrula.

Özellikle şu soruların cevabını kod üzerinden bul:

```text
Kullanıcı hangi ayarı değiştirdi?
↓
Hangi state güncellendi?
↓
Save sırasında hangi object oluşturuldu?
↓
saveApplication/saveProfile'a hangi değer gönderildi?
↓
Storage gerçekte hangi değeri yazdı?
↓
Workspace tekrar yüklendiğinde hangi değer okundu?
↓
DocumentsView hangi değeri local state'e aldı?
↓
Bir default değer sonradan üzerine yazdı mı?
```

Root cause'u bul ve orada düzelt.

Semptomu gizleyen geçici workaround yapma.

---

# 24. Doğrulama

Repository'deki gerçek scriptleri `package.json` üzerinden kontrol et.

Sonunda en az:

```bash
npm run typecheck
npm test
npm run build
```

veya repository'deki gerçek eşdeğerlerini çalıştır.

---

# 25. Sonuç raporu

İş bittiğinde kısa ve teknik rapor ver:

1. Reset probleminin gerçek nedeni neydi?
2. Hangi dosyalar değiştirildi?
3. Hangi Lebenslauf ayarları artık persist ediliyor?
4. Application'a kaydedilen ayarlar hangileri?
5. Profile'a kaydedilen ayarlar hangileri?
6. Template defaults ne zaman uygulanıyor?
7. Save sonrası neden artık Muster haline dönmüyor?
8. Restart testi sonucu nedir?
9. Typecheck/test/build sonucu nedir?

# BAŞARI KRİTERİ

Kullanıcı **BewerbungsManager → Lebenslauf** ekranında bir Lebenslauf'u istediği şekilde düzenler ve **Speichern** yapar.

Bundan sonra:

```text
Speichern
→ başka sayfaya git
→ geri dön
```

veya:

```text
Speichern
→ uygulamayı kapat
→ yeniden aç
```

yapıldığında Lebenslauf:

**Muster / Standard haline dönmemelidir.**

Son kaydedilen:

* içerik,
* Labels,
* sıralamalar,
* görünürlük,
* template,
* renkler,
* fontlar,
* margin/padding,
* column layout,
* background,
* diğer Lebenslauf ayarları

aynen korunmalı ve yeniden yüklenmelidir.

**Kaydedilen son durum her zaman kullanıcı için geçerli durumdur.**


.
