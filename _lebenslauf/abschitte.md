
* Konu: Tüm Lebenslauf modellerinde “Abschnitte neu ordnen” özelliğinin uygulanabilirliği
* İstenilen çıktı: Bölümlerin fareyle yeniden sıralanmasının hangi şablonlarda serbest, hangi şablonlarda kontrollü uygulanabileceğinin belirlenmesi ve güvenli ortak sistemin tasarlanması
* Kullanılacak framework: RASCEF
* Senin yazacağın prompt:

Mevcut BewerbungsManager projemde aşağıdaki Lebenslauf modellerinin tümünde **“Abschnitte neu ordnen”** özelliğini uygulamak istiyorum:

```text
Zweispaltig
Gepflegt
Tabellarisch
Modern
Elegant
Zeitgenössisch
Kreativ
Ivy League
Stillvoll
Kompakt
Einspaltig
Klassisch
```

Bu özellik teknik olarak mümkündür; ancak bütün modellerde tamamen serbest sürükle-bırak uygulanmamalıdır. Şablonun sütun, timeline, sidebar ve ATS yapısına göre **kontrollü drag-and-drop** sistemi geliştir.

## Temel karar

Aşağıdaki yaklaşımı kullan:

* Bölüm içerikleri tek bir merkezi veri modelinde saklansın.
* Şablonların içinde sabit içerik sırası bulunmasın.
* Kullanıcı fare, dokunmatik ekran veya klavye ile bölümleri taşıyabilsin.
* Her şablon hangi bölümlerin hangi alanlara taşınabileceğini config üzerinden belirlesin.
* Başlık, fotoğraf ve temel kimlik alanları gerektiğinde kilitli kalsın.
* İçerik hiçbir taşıma işleminde silinmesin.
* Word, PDF ve ekran önizlemesi aynı bölüm sırasını kullansın.

## Şablonlara göre uygulanabilirlik

### Serbest sıralamaya en uygun modeller

Aşağıdaki tek sütunlu veya doğal akışlı modellerde bölümler yukarı-aşağı serbestçe taşınabilsin:

```text
Ivy League
Stillvoll
Kompakt
Einspaltig
Klassisch
```

Bu modellerde:

* `Zusammenfassung`
* `Stärken`
* `Berufserfahrung`
* `Ausbildung`
* `Projekte`
* `Kenntnisse`
* `Zertifikate`
* `Sprachen`
* `Zusatzangaben`
* `Referenzen`

bölümleri aynı ana akış içinde yeniden sıralanabilsin.

`Kopfbereich` varsayılan olarak en üstte ve kilitli olsun.

### Kontrollü sütun sistemi gereken modeller

Aşağıdaki iki sütunlu modellerde kullanıcı hem sıralamayı hem de uygun bölümlerin sütununu değiştirebilsin:

```text
Zweispaltig
Gepflegt
Modern
Elegant
Zeitgenössisch
Kreativ
```

Desteklenen alanlar:

```text
Hauptspalte
Seitenleiste
Gesamte Breite
```

Varsayılan kurallar:

* `Berufserfahrung` → Hauptspalte
* `Ausbildung` → Hauptspalte
* `Projekte` → Hauptspalte
* `Zusammenfassung` → Seitenleiste veya Gesamte Breite
* `Stärken` → Seitenleiste veya Gesamte Breite
* `Kenntnisse` → Seitenleiste veya Hauptspalte
* `Sprachen` → Seitenleiste
* `Zertifikate` → her iki sütunda kullanılabilir
* `Kopfbereich` → kilitli üst alan

Kullanıcı, şablonun desteklemediği bir konuma bölüm taşımaya çalışırsa işlem engellensin ve Almanca açıklama gösterilsin.

### Özel kısıt gereken modeller

#### Tabellarisch

`Berufserfahrung` ve `Ausbildung` timeline yapısını korumalıdır.

Kullanıcı:

* `Berufserfahrung` bölümünü bütün bölüm olarak taşıyabilsin.
* Deneyim kayıtlarını kendi içinde yeniden sıralayabilsin.
* `Ausbildung` bölümünü taşıyabilsin.
* Timeline kayıtları timeline dışındaki sıradan bir alana dönüştürülmesin.

#### Kompakt

Bölümler yeniden sıralanabilsin ancak tek sayfa hedefi nedeniyle her taşıma sonrasında taşma kontrolü çalıştırılsın.

İçerik tek sayfaya sığmazsa kullanıcıya şu uyarıyı göster:

```text
Die neue Abschnittsreihenfolge überschreitet eine Seite.
Bitte reduzieren Sie Inhalte oder erlauben Sie eine zweite Seite.
```

İçeriği otomatik silme veya özetleme.

#### Ivy League

ATS uyumluluğunu korumak için tüm bölümler tek doğal akışta bulunmalı. Sütun değiştirme özelliği gösterilmesin; yalnızca yukarı-aşağı sıralama desteklensin.

## Kilitli ve hareketli alanlar

Varsayılan olarak:

```text
Kopfbereich: kilitli
Name und Berufsbezeichnung: kilitli
Profilfoto: Kopfbereich içinde konfigüre edilebilir
Kontaktdaten: kilitli veya sınırlı hareketli
Diğer içerik bölümleri: hareketli
```

Her şablon şu yapıyla kendi kurallarını tanımlasın:

```ts
interface TemplateSectionCapabilities {
  templateId: string;
  availableZones: SectionZone[];
  lockedSectionTypes: LebenslaufSectionType[];
  allowedZonesBySection: Partial<
    Record<LebenslaufSectionType, SectionZone[]>
  >;
  defaultSectionOrder: LebenslaufSectionType[];
}
```

## Word şablonları için kritik teknik şart

Statik placeholder konumlarına dayalı hazır DOCX dosyalarında gerçek bölüm sıralaması sınırlı kalabilir. Bu nedenle Word çıktısında bölümleri yalnızca mevcut placeholder’lara metin basarak doldurma.

Word belgesini merkezi Lebenslauf verisinden programatik olarak oluştur veya şablondaki işaretlenmiş bölüm bloklarını klonlayıp kullanıcının seçtiği sıraya göre belgeye ekle.

Aksi hâlde:

* Ekran önizlemesindeki sıralama Word belgesine yansımaz.
* Sütun değiştirme güvenilir çalışmaz.
* Boş alanlar ve biçim bozuklukları oluşabilir.

Word ve PDF üretim akışı şu sırayı kullansın:

1. Görünür bölümleri filtrele.
2. Bölümleri kullanıcının sırasına göre sırala.
3. Şablonun zone kurallarını uygula.
4. Her bölümü kendi renderer’ı ile üret.
5. DOCX veya PDF belgesine aynı sırada yerleştir.

## Kullanıcı deneyimi

Panel adı:

```text
Abschnitte neu ordnen
```

Her bölüm kartında:

```text
Drag-Handle
Abschnittsname
Position
Anzeigen / Ausblenden
Bearbeiten
```

Alt işlemler:

```text
Änderungen übernehmen
Standardreihenfolge wiederherstellen
Abbrechen
```

Şablon değiştirildiğinde kullanıcıya sor:

```text
Aktuelle Abschnittsreihenfolge beibehalten
Standardreihenfolge der neuen Vorlage verwenden
```

Yeni şablon önceki sütun konumunu desteklemiyorsa içerik silinmeden güvenli alana taşınsın ve kullanıcı bilgilendirilsin.

## Sonuç

Özelliği bütün modellerde uygula ancak **tamamen sınırsız sürükle-bırak yerine şablona bağlı kontrollü yeniden sıralama** kullan. Böylece tasarım bozulmaz, ATS okuma sırası korunur ve ekran, Word ve PDF çıktıları tutarlı kalır.

Her dosyanın tam proje yolunu göstererek; ortak section veri modeli, template capability config’leri, drag-and-drop bileşenleri, canlı önizleme, DOCX/PDF entegrasyonu ve testleri eksiksiz kodla. Pseudo-code kullanma ve mevcut çalışan mimariyi gereksiz yere değiştirme.
