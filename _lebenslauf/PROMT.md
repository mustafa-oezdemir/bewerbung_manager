
* Konu: BewerbungsManager uygulamasına takvim, hatırlatmalar ve otomatik başvuru durumu yönetimi eklenmesi
* İstenilen çıktı: Başvuru tarihlerini, Vorstellungsgespräch randevularını, sözleşme sürelerini ve takip hatırlatmalarını gösteren takvim sistemi ile başvuruların durumlarına göre doğru bölümlere otomatik taşınması
* Kullanılacak framework: RASCEF
* Senin yazacağın prompt:

Mevcut **Electron.js + React + TypeScript BewerbungsManager** projesine aşağıdaki takvim, hatırlatma ve otomatik durum yönetimi özelliklerini eksiksiz biçimde entegre et. Mevcut mimariyi, güvenli IPC yapısını, JSON tabanlı veri saklama sistemini ve TypeScript strict mode kurallarını koru.

## 1. Takvim modülü

Ana navigasyona **Kalender** bölümü ekle. Takvim şu görünümleri desteklesin:

* Monatsansicht
* Wochenansicht
* Tagesansicht
* Agenda / Listenansicht

Takvimde aşağıdaki olay türleri farklı ikonlar ve görsel etiketlerle gösterilsin:

* Bewerbung gesendet
* Bewerbungsfrist
* Vorstellungsgespräch
* Zweites Vorstellungsgespräch
* Telefoninterview
* Online-Interview
* Probearbeit
* Einstellungstest
* Rückruf-Erinnerung
* Nachfass-E-Mail
* Vertragsbeginn
* Vertragsende
* Befristungsende
* Probezeitende
* Eigene Aufgabe / Notiz

Takvim olayları ilgili başvuruyla bağlantılı olsun. Kullanıcı bir olaya tıkladığında ilgili başvurunun detay sayfasına gidebilsin.

## 2. Otomatik takvim kayıtları

Yeni başvuru oluşturulurken formdaki tarihlere göre otomatik takvim kayıtları oluştur:

* Başvuru gönderim tarihi
* Son başvuru tarihi
* Vorstellungsgespräch tarihi ve saati
* İkinci görüşme tarihi
* İşe başlangıç tarihi
* Sözleşme bitiş tarihi
* Befristungsende
* Probezeitende

Kullanıcı bu olayları sonradan düzenleyebilsin veya silebilsin. Ana başvurudaki tarih değiştirildiğinde bağlantılı takvim olayı da otomatik güncellensin.

## 3. İki hafta sonra takip hatırlatması

Bir başvurunun durumu **Beworben** olarak değiştirildiğinde sistem varsayılan olarak başvuru tarihinden 14 gün sonrasına bir takip hatırlatması oluştursun:

```text
Bei [Firma] zum Stand der Bewerbung nachfragen
```

Hatırlatma şu seçenekleri desteklesin:

* Firma arama
* Nachfass-E-Mail gönderme
* Hatırlatmayı erteleme
* Tamamlandı olarak işaretleme
* İptal etme

Kullanıcı ayarlardan varsayılan takip süresini değiştirebilsin:

* 7 gün
* 10 gün
* 14 gün
* 21 gün
* Özel gün sayısı
* Otomatik hatırlatma oluşturma kapalı

Başvurunun daha önce sonuçlanması durumunda gereksiz takip hatırlatmaları otomatik iptal edilsin.

## 4. Bildirim sistemi

Yaklaşan olaylar için masaüstü bildirimi göster:

* Görüşmeden 1 gün önce
* Görüşmeden 1 saat önce
* Son başvuru tarihinden 3 gün önce
* Son başvuru tarihinden 1 gün önce
* Takip araması günü
* Befristungsende öncesinde
* Probezeitende öncesinde

Hatırlatma süresi olay bazında değiştirilebilsin. Electron Native Notification API yalnızca Main Process üzerinden kullanılmalı.

Uygulama kapalıyken kaçırılan bildirimler, uygulama tekrar açıldığında “Fällige Aufgaben” alanında gösterilsin.

## 5. Başvuru durumu ve listeler arası otomatik geçiş

Başvurular tek bir merkezi veri kaydında saklansın. Aktive Bewerbungen, Vorstellungsgespräche ve Absagen bölümleri ayrı kopyalar oluşturmasın; başvuru durumuna göre filtrelenmiş görünümler kullansın.

Durum değişiklikleri aşağıdaki kurallara göre otomatik uygulanmalı:

### Absage seçildiğinde

Kullanıcı bir başvurunun durumunu **Absage** olarak değiştirdiğinde:

* Başvuru Aktive Bewerbungen listesinden hemen kaldırılmalı.
* Absagen bölümünde görünmeli.
* Başvuru verileri ve belgeleri silinmemeli.
* Absage tarihi kaydedilmeli.
* İsteğe bağlı Absage nedeni girilebilmeli.
* Bekleyen takip hatırlatmaları iptal edilmeli.
* Gelecekteki gereksiz görüşme olayları iptal edilmeli veya kullanıcı onayıyla kaldırılmalı.
* Durum geçmişine tarih, saat ve eski/yeni durum eklenmeli.
* Dashboard istatistikleri anında güncellenmeli.

Absage nedenleri için şu seçenekleri sun:

* Keine Begründung
* Andere Kandidatin / anderer Kandidat
* Qualifikation nicht passend
* Stelle bereits besetzt
* Stelle gestrichen
* Gehaltsvorstellung
* Standort / Entfernung
* Sprachkenntnisse
* Berufserfahrung
* Automatische Absage
* Eigene Absage
* Sonstiges

### Vorstellungsgespräch seçildiğinde

Durum **Vorstellungsgespräch** olduğunda:

* Başvuru Aktive Bewerbungen içinde kalmalı.
* Vorstellungsgespräche bölümünde de görünmeli.
* Görüşme tarihi zorunlu veya sonradan eklenebilir olmalı.
* Takvim olayı oluşturulmalı.
* Dashboard görüşme sayısı güncellenmeli.

### Zusage seçildiğinde

Durum **Zusage** olduğunda:

* Başvuru aktif listede başarı durumuyla gösterilmeli veya kullanıcı tercihiyle arşivlenebilmeli.
* Zusage tarihi kaydedilmeli.
* İşe başlangıç tarihi eklenebilmeli.
* Sözleşme türü seçilebilmeli:

  * Unbefristet
  * Befristet
  * Probezeit
  * Praktikum
  * Ausbildung
  * Werkstudent
* Befristet seçilirse sözleşme bitiş tarihi zorunlu olmalı.
* Sözleşme başlangıç ve bitiş tarihleri takvime eklenmeli.

### Zurückgezogen seçildiğinde

Başvuru Aktive Bewerbungen listesinden çıkarılsın ancak Absagen bölümüne değil, Archiviert veya ayrı **Zurückgezogen** filtresine taşınsın.

## 6. Liste filtreleme kuralları

Liste görünümünde şu merkezi filtre mantığını uygula:

```ts
Aktive Bewerbungen:
status !== "Absage"
status !== "Zurückgezogen"
status !== "Archiviert"
status !== "Zusage"

Absagen:
status === "Absage"

Vorstellungsgespräche:
status === "Vorstellungsgespräch"
status === "Zweites Gespräch"

Zusagen:
status === "Zusage"
```

Bu filtreleme Renderer içinde dağınık biçimde tekrarlanmamalı. Merkezi selector veya service fonksiyonları oluştur.

## 7. Takvim veri modeli

Aşağıdaki veri modelini oluştur ve Zod ile doğrula:

```ts
type CalendarEventType =
  | "application-sent"
  | "application-deadline"
  | "interview"
  | "second-interview"
  | "phone-interview"
  | "online-interview"
  | "trial-work"
  | "assessment"
  | "follow-up-call"
  | "follow-up-email"
  | "contract-start"
  | "contract-end"
  | "fixed-term-end"
  | "probation-end"
  | "custom";

interface CalendarEvent {
  id: string;
  applicationId?: string;
  type: CalendarEventType;
  title: string;
  description?: string;
  startAt: string;
  endAt?: string;
  allDay: boolean;
  completed: boolean;
  cancelled: boolean;
  reminderMinutes: number[];
  createdAt: string;
  updatedAt: string;
}
```

Takvim olaylarını şu dosyada sakla:

```text
data/Calendar/calendar-events.json
```

Her başvuruya bağlı olay kimlikleri ilgili `bewerbung.json` içinde de referans olarak tutulabilsin.

## 8. Dashboard entegrasyonu

Home Dashboard’a şu kart ve listeleri ekle:

* Heute
* Diese Woche
* Überfällige Aufgaben
* Nächste Vorstellungsgespräche
* Offene Rückrufe
* Bald endende Bewerbungsfristen
* Bald endende befristete Verträge

Kullanıcı dashboard üzerinden görevleri tamamlandı olarak işaretleyebilsin veya ilgili başvuruyu açabilsin.

## 9. Teknik kurallar

* Tarihleri JSON içinde ISO 8601 formatında sakla.
* Arayüzde Almanca tarih formatı kullan: `dd.MM.yyyy`.
* Saatlerde 24 saat formatı kullan.
* Tarih işlemleri için tek bir merkezi date utility katmanı oluştur.
* Yerel saat dilimini doğru yönet.
* Takvim ile başvuru kayıtları arasında çift yönlü senkronizasyon sağla.
* Aynı başvuru için mükerrer otomatik olay oluşturulmasını engelle.
* Durum değişikliklerini atomik biçimde kaydet.
* JSON yazımı başarısız olursa önceki durum korunmalı.
* Durum geçmişi silinmemeli.
* Başvuruyu Absage bölümüne geçirmek fiziksel dosya taşıma veya silme işlemi yapmamalı.
* Kullanıcı arayüzündeki listeler durum değişikliğinden sonra yeniden başlatma gerektirmeden güncellenmeli.
* Takvim olayları sürükle-bırak ile başka tarihe taşınabilsin.
* Sürükle-bırak değişikliği bağlantılı başvurudaki ilgili tarihi de güncellesin.
* Erişilebilirlik ve klavye navigasyonu desteklensin.

Bu özellikleri mevcut proje planına ekle. Önce güncellenmiş klasör yapısını, veri modellerini, durum geçiş kurallarını ve ekran akışını göster. Ardından ilgili dosyaların tam yollarıyla çalışan kodları aşamalı olarak üret.
