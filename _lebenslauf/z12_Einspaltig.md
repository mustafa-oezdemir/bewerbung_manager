
* Konu: BewerbungsManager için mavi vurgulu, tek sütunlu ve ATS uyumlu “Einspaltig” Word Lebenslauf şablonu
* İstenilen çıktı: Ekli görseldeki yapıyı temel alan; fotoğraflı başlık, Zusammenfassung, Stärken, Erfahrung, Ausbildung, Kenntnisse ve Sprachen bölümlerinden oluşan, düzenlenebilir `.docx` Lebenslauf Muster
* Kullanılacak framework: RASCEF
* Senin yazacağın prompt:

Sen kıdemli bir TypeScript, React, Node.js ve Word belge otomasyonu geliştiricisisin. Mevcut BewerbungsManager projem için, ekli referans görselin yerleşim mantığını temel alan **“Einspaltig”** adlı düzenlenebilir bir Word Lebenslauf şablonu oluştur ve mevcut şablon sistemine entegre et.

Amaç, referans görseli birebir kopyalamak değil; aynı görsel karaktere sahip, mavi vurgu renkli, sade, profesyonel, bütün sektörlerde kullanılabilir ve yüksek ATS uyumluluğuna sahip özgün bir `.docx` Lebenslauf Muster geliştirmektir.

## Şablon tanımı

```ts
{
  id: "word-lebenslauf-einspaltig",
  name: "Einspaltig",
  documentType: "lebenslauf",
  format: "docx",
  source: "system-word-template",
  category: "single-column",
  layout: "single-column",
  atsFriendly: true,
  supportsPhoto: true,
  supportsBackground: true,
  supportsPlaceholders: true,
  editableInWord: true,
  emphasis: "simple-ats-readable"
}
```

Şablonun sırasını mevcut merkezi `sortOrder` sistemi üzerinden belirle. Mevcut şablonların sırasını bozma ve dosya adına göre alfabetik sıralamaya güvenme.

## A4 sayfa standardı

Word belgesi gerçek A4 ölçüsünde oluşturulsun:

```text
Genişlik: 210 mm
Yükseklik: 297 mm
Yön: Dikey
```

Varsayılan kenar boşlukları:

```text
Üst: 16–18 mm
Alt: 16–18 mm
Sol: 15–18 mm
Sağ: 15–18 mm
```

Kenar boşlukları uygulamadaki `Seitenränder` ayarından değiştirilebilir olsun.

## Tasarım yapısı

Şablon aşağıdaki özellikleri taşısın:

* Beyaz ana arka plan
* Doğal yukarıdan aşağıya okunan tek sütunlu içerik
* Sol üstte büyük aday adı
* Adın altında meslek unvanı ve uzmanlık alanları
* İki satıra kadar kompakt iletişim bilgileri
* Sağ üstte dairesel profil fotoğrafı
* Koyu mavi ana renk
* Açık mavi vurgu rengi
* Koyu gri gövde metni
* Her ana bölümün altında belirgin mavi yatay çizgi
* Çok açık mavi, düşük kontrastlı geometrik arka plan şekilleri
* Temiz, düzenli ve kurumsal görünüm
* Karmaşık grafiklerden ve ana içeriği bölen çok sütunlu yapılardan kaçınma

Varsayılan renk paleti:

```ts
const singleColumnColors = {
  primary: "#0B3485",
  accent: "#4AAAF4",
  heading: "#0B3485",
  text: "#3E484E",
  mutedText: "#68747A",
  border: "#0B3485",
  background: "#FFFFFF",
  pattern: "#EAF5FD",
  inactiveLevel: "#E3E7EA"
};
```

Renkler mevcut `Design und Schriftart` panelinden değiştirilebilsin.

## Üst başlık alanı

Üst bölümde şu placeholder alanlarını kullan:

```text
{{VORNAME}} {{NACHNAME}}
{{BERUFSBEZEICHNUNG}} | {{FACHGEBIET_1}} | {{FACHGEBIET_2}}

{{TELEFON}} | {{EMAIL}}
{{LINKEDIN}} | {{GITHUB}} | {{WEBSITE}}
{{ORT}} | {{GEBURTSDATUM}} | {{GEBURTSORT}}

{{PROFILFOTO}}
```

Örnek görünüm:

```text
ANNA KOCH
Regionaler Vertriebsleiter | Baustoffe | Teamführung

+49 30 12345678                  annakoch@web.de
linkedin.com/in/                 Berlin, Deutschland
Geb. 01.03.1990 in München
```

Kurallar:

* Ad ve soyad büyük, koyu mavi ve kalın olsun.
* Meslek unvanı açık mavi renkle vurgulansın.
* İletişim bilgileri gerçek Word metni olarak saklansın.
* E-posta, LinkedIn, GitHub ve web adresleri gerçek hyperlink olsun.
* Boş değerler gereksiz ayraç, boş paragraf veya çift boşluk bırakmadan kaldırılsın.
* Uzun meslek unvanları ve URL’ler tasarımı bozmadan satır kırabilsin.

## Profil fotoğrafı

Profil fotoğrafı sağ üstte gösterilsin:

* Dairesel kırpma
* Yaklaşık 34–40 mm çap
* Görüntü oranını bozmadan `cover` mantığında kırpma
* Fotoğraf yoksa alan tamamen kaldırılsın
* Boş çerçeve veya placeholder çıktıda gösterilmesin
* Fotoğraf kaldırıldığında başlık metni mevcut alanı kullanarak genişlesin
* ATS modunda kullanıcı tercihiyle gizlenebilsin

## Dekoratif arka plan

Referans görseldeki gibi çok açık mavi geometrik şekiller oluştur:

* Üst orta ve sağ bölgede açık köşe formları
* Zusammenfassung ve Stärken çevresinde düşük kontrastlı soyut çizgiler
* Alt bölümde açık mavi daire veya köşe parçaları
* Metin içermeyen dekoratif öğeler
* İçeriğin altında kalan arka plan katmanı

Arka plan seçeneğini mevcut `Hintergründe` sistemine ekle:

```ts
{
  id: "minimal-blue-geometric",
  name: "Minimal Blau Geometrisch",
  category: "minimal",
  previewType: "svg",
  supportsPrint: true,
  atsFriendly: false
}
```

ATS modunda arka plan otomatik kapatılsın.

## Bölüm sırası

Varsayılan bölüm sırası:

```text
Kopfbereich
Zusammenfassung
Stärken
Erfahrung
Ausbildung
Kenntnisse
Sprachen
Zusatzangaben
```

Kullanıcı bölümlerin görünürlüğünü ve sıralamasını değiştirebilsin.

## Zusammenfassung

Başlık:

```text
ZUSAMMENFASSUNG
```

Placeholder:

```text
{{ZUSAMMENFASSUNG}}
```

Kurallar:

* Sayfa genişliğini kullansın.
* Başlığın altında koyu mavi yatay çizgi yer alsın.
* Yaklaşık 3–6 cümle desteklensin.
* Önerilen uzunluk `400–700 Zeichen` olarak gösterilsin.
* İçerik boşsa başlık ve çizgiyle birlikte bölüm tamamen gizlensin.

## Stärken

Başlık:

```text
STÄRKEN
```

Dinamik veri alanları:

```text
{{STAERKE_1_TITEL}}
{{STAERKE_1_BESCHREIBUNG}}

{{STAERKE_2_TITEL}}
{{STAERKE_2_BESCHREIBUNG}}

{{STAERKE_3_TITEL}}
{{STAERKE_3_BESCHREIBUNG}}
```

Varsayılan görünüm:

* Bir öğe varsa tüm genişlik
* İki öğe varsa eşit iki alan
* Üç öğe varsa üç yatay alan
* Daha fazla öğe varsa yeni satıra geçiş
* Başlıklar koyu mavi ve kalın
* Açıklamalar koyu gri
* Açık mavi sade ikonlar isteğe bağlı

ATS modunda ikonları kaldır ve Stärken kayıtlarını düz metin olarak alt alta göster.

## Erfahrung

Başlık:

```text
ERFAHRUNG
```

Her deneyim kaydı şu alanları desteklesin:

```text
{{POSITION_1}}
{{UNTERNEHMEN_1}}
{{STARTDATUM_1}}
{{ENDDATUM_1}}
{{ARBEITSORT_1}}
{{BESCHREIBUNG_1}}
{{ERFOLG_1_1}}
{{ERFOLG_1_2}}
{{ERFOLG_1_3}}
{{ERFOLG_1_4}}
{{ERFOLG_1_5}}
{{TECHNOLOGIEN_1}}
```

Dinamik olarak en az sekiz deneyim kaydı oluşturulabilsin.

Gösterim örneği:

```text
Bereichsleiter Vertrieb
BASF

01/2018 – 12/2023 · Ludwigshafen, Deutschland

Verantwortlich für die Steuerung des gesamten Vertriebsteams.

• Steigerung des Jahresumsatzes um 20 %
• Einführung neuer Produkte
• Umsetzung eines Schulungsprogramms
• Erschließung neuer Märkte
```

Kurallar:

* Pozisyon adı koyu mavi ve belirgin olsun.
* Şirket adı açık mavi ve kalın gösterilsin.
* Tarihler `MM/JJJJ – MM/JJJJ` formatında olsun.
* Devam eden çalışma için `MM/JJJJ – Heute` kullanılsın.
* Deneyimler antikronolojik sıralansın.
* Açıklamalar kısa paragraf, sonuçlar bullet listesi olarak gösterilsin.
* Boş başarı alanları boş bullet oluşturmamalı.
* Deneyim kayıtları arasında ince açık gri kesik çizgi kullanılabilsin.
* Son deneyimden sonra ayırıcı gösterilmesin.
* Deneyim kaydı mümkün olduğunca sayfalar arasında bölünmesin.

## Ausbildung

Başlık:

```text
AUSBILDUNG
```

Alanlar:

```text
{{ABSCHLUSS_1}}
{{FACHRICHTUNG_1}}
{{HOCHSCHULE_1}}
{{AUSBILDUNG_START_1}}
{{AUSBILDUNG_ENDE_1}}
{{AUSBILDUNG_ORT_1}}
{{AUSBILDUNG_BESCHREIBUNG_1}}
```

Gösterim örneği:

```text
Master in Betriebswirtschaft
Universität München

10/2008 – 09/2010 · München, Deutschland
```

Birden fazla eğitim kaydı desteklensin. Bölüm boşsa başlığıyla birlikte gizlensin.

## Kenntnisse & Zusatzangaben

Bu bölüm sabit bir metin alanı olmamalıdır. Kullanıcı kendi kategori, alt kategori ve yetkinliklerini oluşturabilsin.

Hazır kategori örnekleri:

```text
Programmiersprachen
Backend
Frontend
Fullstack
Frameworks
Datenbanken
Cloud
DevOps
API Design
Agile Development
Projektmanagement
SAP
CAD
AutoCAD
FEM
Prozessplanung
Qualitätsmanagement
```

Word placeholder yapısı:

```text
{{KENNTNIS_KATEGORIE_1}}
{{KENNTNIS_EINTRAEGE_1}}
```

veya:

```text
{{KENNTNISSE}}
```

Desteklenen gösterim biçimleri:

```text
Kommagetrennt
Eine Zeile je Eintrag
Aufzählung
Kompakte Tabelle
Tags
Kenntnisstufe als Text
Kenntnisstufe als Punkte
```

Bu ATS odaklı şablonda varsayılan gösterim:

```text
Backend: C#, ASP.NET Core, Java
Frontend: TypeScript, React, Angular
Cloud: Azure, Docker
Methoden: Scrum, Kanban, Agile Development
```

Tüm yetkinlikler gerçek Word metni olarak saklansın.

## Sprachen

Başlık:

```text
SPRACHEN
```

Alanlar:

```text
{{SPRACHE_1}}
{{SPRACHNIVEAU_1}}
{{SPRACHE_1_PUNKTE}}
```

Örnek:

```text
Deutsch – Muttersprache
Englisch – Fortgeschrittene Kenntnisse
```

Nokta göstergesi isteğe bağlı olsun. ATS uyumluluğu için metinsel seviye her zaman korunsun.

## Zusatzangaben

Kullanıcı şu alanları ekleyebilsin:

```text
Führerschein
Reisebereitschaft
Umzugsbereitschaft
Arbeitserlaubnis
Aufenthaltsstatus
Verfügbarkeit
Interessen
Ehrenamt
Referenzen
Eigene Zusatzangabe
```

Referanslar için varsayılan ifade:

```text
Referenzen auf Anfrage erhältlich.
```

Boş alanlar çıktıda görünmesin.

## Word yerleşim kuralları

* Ana içerik floating text box içine yerleştirilmesin.
* Ana okuma sırası doğal yukarıdan aşağıya olsun.
* Üst başlık hizalaması için yalnızca gerektiğinde görünmez kenarlıklı tablo kullan.
* Tab veya ardışık boşluklarla sütun hizalaması yapma.
* Dekoratif öğeleri ana içerikten ayrı tut.
* Tüm içerikler Word içinde seçilebilir gerçek metin olarak saklansın.
* Font olarak varsayılan `Inter`, `Rubik` veya `Lato` kullan.
* Gövde yazısı 10,5–11 pt, bölüm başlıkları 13–15 pt olsun.
* Satır yüksekliği yaklaşık 1,10–1,15 olsun.

## Çok sayfalı davranış

Şablon en fazla iki A4 sayfasını desteklesin.

* Birinci sayfada büyük başlık ve fotoğraf gösterilsin.
* İkinci sayfada büyük üst alan tekrar edilmesin.
* İkinci sayfada küçük aday adı ve isteğe bağlı sayfa numarası gösterilsin.
* Bölüm başlığı sayfa sonunda tek başına kalmasın.
* Deneyim ve eğitim kayıtları mümkün olduğunca bölünmesin.
* Gövde yazısı otomatik olarak 10 pt altına düşürülmesin.
* İki sayfa aşılırsa kullanıcıya Almanca uyarı göster:

```text
Der Lebenslauf umfasst mehr als zwei Seiten.
Bitte kürzen Sie einzelne Beschreibungen oder blenden Sie weniger relevante Inhalte aus.
```

Kullanıcı onayı olmadan içerik silme veya özetleme yapma.

## Word dosya konumu

Şablonu şu klasöre kaydet:

```text
C:\Users\musta\OneDrive\Dokumente\BewerbungsManager\data\Muster\Lebenslauf\Einspaltig_Lebenslauf_Muster.docx
```

Klasör yoksa oluştur. Dosya mevcutsa kullanıcı onayı olmadan üzerine yazma; güvenli sürüm adı üret:

```text
Einspaltig_Lebenslauf_Muster_v2.docx
```

## Kullanım akışı

Kullanıcı `Einspaltig` şablonunu seçtiğinde:

1. Orijinal DOCX şablonunu oku.
2. Orijinal dosyada değişiklik yapma.
3. Yeni bir çalışma kopyası oluştur.
4. Kullanıcının Lebenslauf verilerini kopyaya uygula.
5. Dinamik Erfahrung, Ausbildung, Kenntnisse ve Sprachen kayıtlarını oluştur.
6. Profil fotoğrafını ekle.
7. Arka plan ayarını uygula.
8. Boş placeholder, paragraf, ayraç ve bullet öğelerini kaldır.
9. Boş bölümleri başlıklarıyla birlikte gizle.
10. Sayfa sayısı ve taşma kontrolü yap.
11. Dosyayı Lebenslauf klasörüne kaydet.
12. Önizleme, Word’de açma ve PDF oluşturma seçeneklerini sun.

Çıktı dosya adı:

```text
Lebenslauf_Vorname_Nachname_YYYYMMDD_HHmmss.docx
```

## Placeholder işleme kuralları

Word placeholder metinleri farklı `run` alanlarına bölünebilir. Yalnızca basit string replacement kullanma.

Şunları koru:

* Font ailesi ve büyüklüğü
* Kalın ve italik biçim
* Metin rengi
* Paragraf hizalaması
* Satır ve paragraf aralıkları
* Bullet listeleri
* Hyperlink yapısı
* Üst başlık yerleşimi
* Profil fotoğrafı
* Bölüm çizgileri
* Arka plan dekorasyonu
* Sayfa kenar boşlukları
* Header ve footer
* Sayfa numarası

Boş placeholder olduğunda ilgili paragraf, boş bullet, gereksiz ayraç ve tamamen boş bölüm temizlensin.

## Şablon kartı

Şablon seçim ekranında şu bilgiler gösterilsin:

```text
Einspaltig

Einfache Word-Lebenslaufvorlage mit klarer,
einspaltiger Struktur und blauem Akzent.

Für alle Branchen · Mit Foto · ATS-freundlich · DOCX
```

Kart işlemleri:

```text
Vorlage verwenden
Vorschau
In Word öffnen
Duplizieren
Als Favorit markieren
Dateipfad öffnen
```

## ATS gereksinimleri

* İçerik gerçek Word metni olarak saklansın.
* Doğal yukarıdan aşağıya okuma sırası korunsun.
* Ana içerik metin kutularına yerleştirilmesin.
* Pozisyon, şirket, tarih ve konum ayrı okunabilir alanlar olsun.
* Yetkinlik ve dil seviyelerinin metinsel karşılığı bulunsun.
* İkonlar anlamın tek taşıyıcısı olmasın.
* Dekoratif arka plan ATS modunda kapatılsın.
* Fotoğraf ATS modunda gizlenebilsin.
* Ana içerikte karmaşık tablo, grafik veya timeline kullanılmasın.

## Beklenen çıktı sırası

1. Mevcut template sisteminin analizi
2. `Einspaltig` template config tanımı
3. Lebenslauf ve placeholder veri modeli
4. A4 DOCX Muster oluşturma kodu
5. Tek sütunlu Word yerleşimi
6. Üst başlık ve dairesel profil fotoğrafı
7. Minimal mavi geometrik arka plan
8. Zusammenfassung ve Stärken bölümleri
9. Dinamik Erfahrung ve Ausbildung üretimi
10. Kenntnisse, Sprachen ve Zusatzangaben entegrasyonu
11. Çok sayfalı kullanım
12. Güvenli DOCX kopyalama ve doldurma servisi
13. Şablon kartı ve önizleme
14. ATS modu
15. Word ve PDF çıktısı
16. Hata yönetimi
17. Test senaryoları
18. Tam proje yollarıyla eksiksiz kodlar

Her dosyanın tam proje yolunu başlık olarak göster. Pseudo-code verme. Kodları doğrudan projeye eklenebilir, eksiksiz ve TypeScript strict mode ile uyumlu yaz. Önce mevcut mimariyi incele; kullanılan template sistemi, state yönetimi, DOCX üretimi, önizleme, PDF ve tasarım ayarlarıyla uyumlu ilerle.
