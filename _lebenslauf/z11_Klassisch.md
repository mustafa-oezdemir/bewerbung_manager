
* Konu: BewerbungsManager için sekizinci Word Lebenslauf şablonu olarak geleneksel ve modern “Klassisch” tasarımının eklenmesi
* İstenilen çıktı: Konservatif sektörlere uygun, sade tek sütunlu yapıya sahip, üstte fotoğraflı başlık alanı, geniş Zusammenfassung, yatay Stärken, deneyim, eğitim ve dil bölümleri bulunan düzenlenebilir `.docx` Lebenslauf Muster
* Kullanılacak framework: RASCEF
* Senin yazacağın prompt:

Sen kıdemli bir TypeScript, React, Node.js ve Word belge otomasyonu geliştiricisisin. BewerbungsManager uygulamam için sekizinci Lebenslauf Muster olarak, ekli referans görseldeki yerleşim mantığını temel alan **“Klassisch”** adlı düzenlenebilir Word şablonunu oluştur ve mevcut template sistemine entegre et.

Bu şablon özellikle kamu kurumları, bankacılık, sigorta, hukuk, sağlık, eğitim, idari işler ve diğer konservatif sektörler için uygun olmalıdır. Referans görseli birebir kopyalama; geleneksel Lebenslauf düzenini koruyan, ancak açık mavi dekoratif şekiller ve modern tipografiyle güncellenmiş özgün bir tasarım geliştir.

## Şablon kimliği

```ts
{
  id: "word-lebenslauf-klassisch",
  name: "Klassisch",
  documentType: "lebenslauf",
  format: "docx",
  source: "system-word-template",
  sortOrder: 8,
  category: "classic",
  layout: "single-column-classic",
  atsFriendly: true,
  supportsPhoto: true,
  supportsBackground: true,
  supportsPlaceholders: true,
  editableInWord: true,
  emphasis: "traditional-professional"
}
```

Şablon seçim sırası:

```text
1. Birinci Lebenslauf Muster
2. İkinci Lebenslauf Muster
3. Zeitgenössisch
4. Kreativ
5. Kompakt
6. Tabellarisch
7. Einspaltig
8. Klassisch
9. Diğer Vorlagen
```

Sıralamayı dosya adına göre değil, merkezi `sortOrder` alanına göre yönet.

## Genel tasarım

Şablon şu özellikleri taşısın:

* Dikey A4 sayfa: `210 × 297 mm`
* Beyaz ana arka plan
* Tek ana içerik sütunu
* Sol üstte büyük aday adı
* Aday adının altında meslek unvanı ve uzmanlık alanları
* Altında tek veya iki satırlık kompakt iletişim bilgileri
* Sağ üstte dairesel profil fotoğrafı
* Üst bölümde çok açık mavi organik dalga dekorasyonu
* Alt sol köşede aynı tasarım dilini devam ettiren açık mavi dekoratif alan
* Koyu siyah veya antrasit başlıklar
* Turkuaz/açık mavi vurgu rengi
* Gri gövde metni
* Geniş Zusammenfassung alanı
* Yan yana üç Stärken alanı
* Deneyim odaklı ana içerik
* Sade Ausbildung ve Sprachen bölümleri
* Konservatif sektörlere uygun, temiz ve ciddi görünüm
* ATS tarafından doğal sırayla okunabilir gerçek Word metni

Varsayılan renkler:

```ts
const classicTemplateColors = {
  primary: "#2B2F32",
  accent: "#00AFC5",
  heading: "#5A6267",
  text: "#3F484D",
  mutedText: "#68747A",
  background: "#FFFFFF",
  softBackground: "#CDEFF3",
  border: "#D5DBDE",
  inactiveLevel: "#E4E8EA"
};
```

Kullanıcı ana ve vurgu rengini `Design und Schriftart` panelinden değiştirebilsin. Ancak varsayılan görünüm sade ve profesyonel kalsın.

## Sayfa ve kenar boşlukları

Varsayılan Word ayarları:

```text
Format: A4
Oben: 16–18 mm
Unten: 16–18 mm
Links: 15–18 mm
Rechts: 15–18 mm
Zeilenhöhe: yaklaşık 1,10–1,15
Fließtext: 10–11 pt
Überschriften: 12–15 pt
```

Sayfa kenar boşlukları mevcut `Seitenränder` ayarı üzerinden merkezi olarak değiştirilebilsin.

## Word yerleşimi

Ana içerik tek sütunda doğal yukarıdan aşağıya ilerlesin.

```text
Sayfa
├── Kopfbereich
│   ├── İsim ve unvan
│   ├── Kontaktdaten
│   └── Profilfoto
├── Zusammenfassung
├── Stärken
├── Erfahrung
├── Ausbildung
├── Kenntnisse
├── Sprachen
└── Zusatzangaben
```

Kurallar:

* Ana içerikleri floating text box içinde oluşturma.
* Sütun hizalamaları için ardışık boşluk veya tab kullanma.
* Üst başlık ve yatay Stärken alanı için görünmez kenarlıklı Word tablosu kullanılabilir.
* Diğer içerikler gerçek Word paragrafları ve sade tablolarla oluşturulsun.
* Ana DOM/Word okuma sırası aday adıyla başlayıp aşağı doğru devam etsin.
* Fotoğraf metnin doğal okuma sırasını bozmamalı.
* Dekoratif şekiller içerik alanının arkasında kalmalı.

## Üst başlık alanı

Sol tarafta:

```text
{{VORNAME}} {{NACHNAME}}
{{BERUFSBEZEICHNUNG}} | {{FACHGEBIET_1}} | {{FACHGEBIET_2}}
```

Örnek:

```text
JULIAN FISCHER
Oberkellner | Japanische Kultur | Teamführung
```

İletişim bilgileri aynı satırda veya en fazla iki satırda gösterilebilsin:

```text
{{TELEFON}} | {{EMAIL}} | {{LINKEDIN}} | {{ORT}}
{{GEBURTSDATUM}} | {{GEBURTSORT}}
```

Kurallar:

* İsim büyük, koyu ve kalın olsun.
* Meslek unvanı isimden küçük ancak belirgin olsun.
* İletişim bilgileri kompakt ve sade gösterilsin.
* E-posta, LinkedIn, GitHub ve web adresleri gerçek Word hyperlink olarak oluşturulsun.
* Boş alanlarda gereksiz ayraç veya çift boşluk bırakılmasın.
* Uzun unvan ve URL alanlarında güvenli satır kırılması uygulansın.

## Profil fotoğrafı

Sağ üstte:

```text
{{PROFILFOTO}}
```

Fotoğraf özellikleri:

* Dairesel kırpma
* Yaklaşık `34–40 mm` çap
* Görüntü oranı korunmalı
* İnce veya çerçevesiz kullanım
* Fotoğraf yoksa alan tamamen kaldırılmalı
* Fotoğraf gizlendiğinde isim ve iletişim alanı otomatik genişlemeli
* ATS modunda fotoğraf kullanıcı tercihine göre kapatılabilmeli

## Organik açık mavi arka plan

Referans görseldeki gibi üst ve alt bölgelerde yumuşak, organik açık mavi şekiller kullan.

Özellikler:

* Üst bölümde dalga veya geniş eğri form
* Sağ üstte fotoğrafın arkasını destekleyen açık mavi alan
* Alt sol köşede ikinci dekoratif dalga
* İnce beyaz kontur çizgileri
* Çok düşük kontrast
* İçerik okunabilirliğini bozmayan yapı
* Gerçek metin içermeyen dekorasyon
* Kullanıcı tarafından açılıp kapatılabilir
* ATS modunda otomatik gizlenebilir

Mevcut `Hintergründe` sistemine şu tanımla ekle:

```ts
{
  id: "classic-soft-blue-waves",
  name: "Klassische blaue Wellen",
  category: "minimal",
  previewType: "svg",
  supportsPrint: true,
  atsFriendly: false
}
```

Word uyumluluğu için dekorasyonu SVG, EMF veya yüksek kaliteli şeffaf PNG olarak oluştur. Ana metni görsele dönüştürme.

## Zusammenfassung

Başlık:

```text
ZUSAMMENFASSUNG
```

İçerik:

```text
{{ZUSAMMENFASSUNG}}
```

Bu bölüm sayfa genişliğinde gösterilsin.

Kurallar:

* Başlık koyu gri, büyük harf ve kalın olsun.
* Yaklaşık 4–8 satırlık profesyonel özet desteklesin.
* Metin sola hizalı olsun.
* Uzun metinde satır kırılması düzenli çalışsın.
* Bölüm boşsa başlık ve boşluk tamamen kaldırılmalı.
* Kullanıcıya şu öneri gösterilsin:

```text
Empfohlen: 400–700 Zeichen
```

## Stärken

Başlık:

```text
STÄRKEN
```

Varsayılan olarak üç yatay sütun kullan:

```text
{{STAERKE_1_TITEL}}
{{STAERKE_1_BESCHREIBUNG}}

{{STAERKE_2_TITEL}}
{{STAERKE_2_BESCHREIBUNG}}

{{STAERKE_3_TITEL}}
{{STAERKE_3_BESCHREIBUNG}}
```

Örnek:

```text
Teamleitung
Erfolgreiche Führung von Teams mit bis zu 30 Mitarbeitern.

Kommunikation
Effektive Zusammenarbeit mit Küchen- und Managementteams.

Konfliktmanagement
Professionelle Lösung von Kundenbeschwerden.
```

Kurallar:

* Güçlü yön başlıkları vurgu renginde ve kalın olsun.
* Açıklamalar daha küçük koyu gri metin olsun.
* Tek kayıt varsa tüm genişliği kullanabilsin.
* İki kayıt varsa eşit iki sütun oluşturulsun.
* Üç kayıt varsa üçlü yatay düzen kullanılsın.
* Dört veya daha fazla kayıt varsa yeni satıra geçilsin veya kullanıcıya kompakt görünüm seçeneği sunulsun.
* ATS modunda sütun görünümü sade alt alta metne dönüştürülebilsin.

## Erfahrung

Başlık:

```text
ERFAHRUNG
```

Her kayıt şu alanları desteklesin:

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

En az sekiz deneyim kaydına genişletilebilir dinamik yapı kur.

Gösterim örneği:

```text
Stellvertretender Restaurantleiter                         Düsseldorf
Sushi Palace                                               2019–2023

Verantwortung für das tägliche Geschäft und Unterstützung des
Restaurantleiters.

• Schulung von 25 neuen Mitarbeitern
• Optimierung der operativen Abläufe
• Einführung eines neuen Menü- und Inventarsystems
• Führung eines Teams von 30 Mitarbeitern
```

Kurallar:

* Pozisyon adı büyük ve koyu antrasit olsun.
* Şirket adı vurgu renginde gösterilsin.
* Yer ve tarih sağa hizalanabilsin.
* Görev açıklaması kısa paragraf olarak yer alsın.
* Başarılar madde işaretli listede gösterilsin.
* Metin gerçek Word içeriği olarak saklansın.
* Kayıtlar arasında kontrollü boşluk kullanılsın.
* Deneyim kayıtları mümkün olduğunca sayfa ortasında bölünmesin.
* Boş başarı alanları boş bullet oluşturmamalı.
* Tarihler antikronolojik sırayla gösterilsin.

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
Master in Hotel- und Restaurantmanagement                  München
Technische Universität München                             2011–2013

Bachelor in Gastgewerbemanagement                          Heidelberg
Universität Heidelberg                                     2008–2011
```

Kurallar:

* Abschluss büyük ve koyu olsun.
* Hochschule daha küçük gösterilsin.
* Yer ve tarih sağda hizalanabilsin.
* Birden fazla eğitim kaydı desteklensin.
* Bölüm boşsa başlığıyla birlikte gizlensin.

## Kenntnisse & Zusatzangaben

Bu bölüm sabit liste olmamalıdır. Kullanıcı ana kategori, alt kategori ve bilgi girişlerini kendisi oluşturabilsin.

Hazır kategori örnekleri:

```text
Backend
Frontend
Fullstack
Programmiersprachen
Frameworks
Datenbanken
Cloud
DevOps
Projektmanagement
Teamführung
Kommunikation
Serviceorientierung
CAD
AutoCAD
FEM
Prozessplanung
Qualitätsmanagement
Buchhaltung
SAP
```

Placeholder yapısı:

```text
{{KENNTNIS_KATEGORIE_1}}
{{KENNTNIS_EINTRAEGE_1}}
```

veya tüm alan:

```text
{{KENNTNISSE}}
```

Gösterim seçenekleri:

```text
Kommagetrennt
Eine Zeile je Eintrag
Aufzählung
Kompakte Tabelle
Tags
Kenntnisstufe als Text
Kenntnisstufe als Punkte
```

Klassisch şablonunda varsayılan ATS dostu görünüm:

```text
Projektmanagement: Jira, Scrum, Kanban
Software: Microsoft Office, SAP
Fachkenntnisse: Qualitätsmanagement, Prozessplanung
```

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

{{SPRACHE_2}}
{{SPRACHNIVEAU_2}}
{{SPRACHE_2_PUNKTE}}
```

Varsayılan kompakt görünüm:

```text
Deutsch (Muttersprache)        Englisch (Versiert)
```

Kullanıcı isterse seviye noktalarını etkinleştirebilsin. ATS uyumluluğu için metinsel seviye her zaman korunsun.

## Zusatzangaben

Aşağıdaki bilgiler eklenebilsin:

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

Referanslar için varsayılan metin:

```text
Referenzen auf Anfrage erhältlich.
```

Boş alanlar Word ve PDF çıktısında gösterilmesin.

## Çok sayfalı kullanım

Şablon bir veya iki A4 sayfasını desteklesin.

Kurallar:

* İlk sayfada büyük başlık ve fotoğraf gösterilsin.
* İkinci sayfada büyük başlık ve fotoğraf tekrar edilmesin.
* İkinci sayfada yalnızca küçük aday adı ve sayfa numarası içeren minimal header kullanılabilsin.
* Bölüm başlığı sayfa sonunda yalnız kalmasın.
* Deneyim ve eğitim kayıtları mümkün olduğunca bölünmesin.
* Gövde yazısı otomatik olarak `10 pt` altına indirilmesin.
* İçerik iki sayfayı geçerse kullanıcıya uyarı göster:

```text
Der Lebenslauf umfasst mehr als zwei Seiten.
Bitte kürzen Sie einzelne Beschreibungen oder blenden Sie weniger relevante Inhalte aus.
```

Kullanıcı onayı olmadan hiçbir içeriği otomatik silme veya özetleme.

## Word şablon dosyası

Şablonu şu klasöre kaydet:

```text
C:\Users\musta\OneDrive\Dokumente\BewerbungsManager\data\Muster\Lebenslauf\Klassisch_Lebenslauf_Muster.docx
```

Klasör mevcut değilse oluştur:

```ts
await fs.mkdir(templateDirectory, { recursive: true });
```

Dosya zaten varsa kullanıcı onayı olmadan üzerine yazma. Güvenli sürüm adı üret:

```text
Klassisch_Lebenslauf_Muster_v2.docx
```

## Şablon kullanım akışı

Kullanıcı `Klassisch` şablonunu seçtiğinde:

1. Orijinal DOCX Muster dosyasını oku.
2. Orijinal şablonu hiçbir zaman değiştirme.
3. Yeni bir çalışma kopyası oluştur.
4. Kullanıcının Lebenslauf verilerini kopyaya uygula.
5. Dinamik Erfahrung, Ausbildung, Kenntnisse ve Sprachen kayıtlarını oluştur.
6. Profil fotoğrafını uygun alana ekle.
7. Açık mavi dekoratif arka planı seçilen ayara göre uygula.
8. Boş placeholder, paragraf, ayraç ve liste öğelerini kaldır.
9. Boş bölümleri başlıklarıyla birlikte gizle.
10. Sayfa sayısı ve taşma kontrolünü çalıştır.
11. Sonucu Lebenslauf klasörüne kaydet.
12. Önizleme, Word’de açma ve PDF oluşturma seçeneklerini sun.

Çıktı dosya adı:

```text
Lebenslauf_Vorname_Nachname_YYYYMMDD_HHmmss.docx
```

## Placeholder işleme kuralları

Word placeholder metinlerinin birden fazla `run` içine bölünmüş olabileceğini dikkate al. Yalnızca basit string replacement kullanma.

Şunları koru:

* Font ailesi
* Font büyüklüğü
* Kalın ve italik stil
* Metin rengi
* Paragraf hizalaması
* Satır ve paragraf aralıkları
* Madde işaretleri
* Hyperlink yapısı
* Üst başlık tablosu
* Profil fotoğrafı
* Stärken yerleşimi
* Arka plan dekorasyonu
* Sayfa kenar boşlukları
* Header ve footer
* Sayfa numarası

Placeholder değeri boşsa:

* İlgili paragrafı kaldır
* Boş bullet öğesini sil
* Gereksiz ayırıcıları temizle
* Çift boşluk bırakma
* Tamamen boş bölümü başlığıyla birlikte gizle
* Fotoğraf yoksa ayrılmış boş alan bırakma

## Şablon seçim kartı

Sekizinci kartta şu bilgiler gösterilsin:

```text
Klassisch

Traditionelle Word-Lebenslaufvorlage mit einem
klaren, modernen Erscheinungsbild.

Einspaltig · Mit Foto · Für konservative Branchen · ATS-freundlich · DOCX
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

## ATS uyumluluğu

* Tüm içerik gerçek Word metni olarak saklansın.
* Ana okuma sırası yukarıdan aşağıya doğal ilerlesin.
* Ana içerik metin kutularına yerleştirilmesin.
* Pozisyon, firma, tarih ve yer ayrı okunabilir metinler olsun.
* Dil ve yetkinlik seviyeleri metinsel karşılık içersin.
* İkonlar anlamın tek taşıyıcısı olmasın.
* Dekoratif mavi dalgalar ATS modunda gizlensin.
* Fotoğraf ATS modunda isteğe bağlı olarak kaldırılabilsin.
* Karmaşık timeline ve çok sütunlu ana içerik kullanılmasın.
* Tablo kullanımı yalnızca güvenli hizalama gereken üst alan ve Stärken için sınırlı tutulsun.

## Teknik gereksinimler

* TypeScript strict mode kullan.
* `any` kullanma.
* Dosya sistemi işlemlerini React bileşenlerinde yapma.
* Electron kullanılıyorsa main process ve güvenli preload API kullan.
* Web API kullanılıyorsa DOCX üretimini backend servisinde gerçekleştir.
* OneDrive dosya kilidi ve senkronizasyon hatalarını kontrollü yönet.
* Orijinal Word Muster dosyasını hiçbir zaman değiştirme.
* Dosya adı çakışmalarında mevcut dosyanın üzerine yazma.
* `sortOrder: 8` değerini koru.
* Önizleme üretilemediğinde uygulamanın çökmesini engelle.
* Kullanıcı onayı olmadan içerik silme, yeniden yazma veya otomatik özetleme yapma.

## Beklenen çıktı sırası

1. Mevcut template sisteminin kısa analizi
2. Sekizinci template config tanımı
3. Lebenslauf ve placeholder veri modeli
4. `Klassisch` DOCX Muster oluşturma kodu
5. A4 sayfa ve tek sütunlu Word yerleşimi
6. Başlık alanı ve dairesel profil fotoğrafı
7. Açık mavi organik arka plan dekorasyonu
8. Zusammenfassung ve yatay Stärken yapısı
9. Dinamik Erfahrung ve Ausbildung üretimi
10. Kenntnisse, Sprachen ve Zusatzangaben entegrasyonu
11. İki sayfalı kullanım ve ikinci sayfa header sistemi
12. Güvenli DOCX kopyalama ve doldurma servisi
13. Template kartı ve önizleme
14. ATS modu
15. Word ve PDF çıktısı
16. Hata yönetimi
17. Test senaryoları
18. Tam proje yollarıyla eksiksiz ve doğrudan çalıştırılabilir kodlar

Pseudo-code verme. Her dosyanın tam proje yolunu başlık olarak göster ve eksiksiz kodunu yaz. Önce mevcut proje mimarisini incele; kullanılan template sistemi, state yönetimi, DOCX üretimi, önizleme, PDF altyapısı ve tasarım ayarlarıyla uyumlu ilerle. Çalışan yapıyı gereksiz yere değiştirme.
