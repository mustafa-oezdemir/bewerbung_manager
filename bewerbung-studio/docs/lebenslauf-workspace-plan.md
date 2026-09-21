# BewerbungsManager: workspace ve Lebenslauf uygulama planı

Bu plan 22.09.2026 tarihinde `main` üzerindeki gerçek kod incelenerek hazırlandı. Öncelik sırası: kullanıcı verisi, tam yedek, çalışma alanı kurulumu, sürümlü CV modeli, ortak renderer. İlk uygulama aşaması yalnızca storage/backup/first-run'dır.

## CURRENT STORAGE ARCHITECTURE / CURRENT STORAGE FLOW

`electron/main.ts` modül yüklenirken `resolveApplicationPaths()` çağırıyor ve `data/Electron`, `ElectronSession`, `Logs`, `CrashDumps` klasörlerini oluşturuyor. `src/config/application-paths.ts` ortam değişkeni yoksa `D:\bewerbung_mustafa` kullanıyor. `DataStore` (`electron/storage.ts`) `data/Settings/workspace.json` dosyasını yükleyip her açılışta yeniden yazıyor. `FileManagementService` (`electron/file-management.ts`) veri ve belge klasörlerini oluşturuyor. Renderer dosya sistemine doğrudan erişmiyor; `electron/preload.ts` ve `src/shared/ipc.ts` typed API sağlıyor.

## USER DATA LOCATIONS / LEGACY DATA TO BACK UP

Seçilen root altındaki `data/Settings` (workspace, taslak ve ayarlar), `data/Bewerbungen`, `data/Profile`, `data/Muster`, `data/Backups`, `Anschreiben`, `Lebenslauf`, `Zeugnisse`, `Zertifikate`, `Absagen`, `Vorstellungsgespräch` ve kullanıcı tarafından açılmış diğer kalıcı dosyalar kapsanmalı. `workspace.json` içindeki `applications`, `profiles`, `events`, `attachments`, `settings`, `DocumentDraft` ve `DocumentDesignSettings` birbiriyle ilişkili. DOCX, PDF, fotoğraf, imza ve ek dosyaları JSON dışındaki bağımsız kullanıcı verileridir.

## CURRENT BACKUP SYSTEM / PROBLEMS

`DataStore.createAutomaticBackup()` günde bir kez yalnızca `workspace.json` kopyalıyor. `writeBackup()` da sadece JSON üretiyor. `importBackup()` eksik ikili ekleri veri modelinden çıkartıyor. `migrateLegacyData()` öncesinde yalnızca JSON acil yedeği alınıyor. Bu yöntem bütün belge ve ekleri geri getiremez. `DataStore.loadWorkspace()` geçersiz ve eksik dosyada sessizce boş workspace döndürüyor; var olan bir root için bu veri kaybı riski. Root yolu production'da sabit. PDF export `electron/main.ts` içinde her seferinde Save As açıyor; DOCX template servisi zaten uygulama klasörlerine otomatik yazıyor.

## NEW WORKSPACE ARCHITECTURE / FIRST-RUN SETUP DESIGN / BOOTSTRAP CONFIG

Platformun Electron `app.getPath('userData')` konumundaki küçük `bootstrap.json` yalnızca root yolunu ve setup durumunu saklayacak. Öncelik: `BEWERBUNG_ROOT_PATH` geliştirme/test override'ı, sonra bootstrap, sonra ilk kurulum. İlk kurulum penceresi native Electron klasör seçiciyi main process'ten açacak. Seçilen yol yazılabilirlik ve mevcut workspace açısından doğrulanıp mevcut `resolveApplicationPaths()` dizin yapısıyla hazırlanacak. Var olan workspace yolu bulunamazsa yeni boş root sessizce açılmayacak. `src/App.tsx` setup/gone-folder ekranını gösterecek; başarılı kurulumdan sonra normal hydrate çalışacak. `userData` artık sabit bir workspace'in içinde olmayacak.

## WORKSPACE DIRECTORY STRUCTURE / SETTINGS STORAGE DESIGN

Mevcut `ApplicationPaths` yapısı korunacak: `data/{Bewerbungen,Backups,Muster,Profile,Settings}`, üst seviyede `Anschreiben`, `Lebenslauf`, `Zeugnisse`, `Zertifikate`, `Absagen`, `Vorstellungsgespräch`. `SettingsView.tsx` mevcut root'u, açma ve değiştirme eylemlerini gösterecek. Değiştirme için kopyala, taşı, yalnız yeni yeri kullan seçenekleri verilecek. Taşı/kopyala önce tam snapshot alıp hedefi doğrulayacak; bootstrap yalnız başarılı doğrulamadan sonra yazılacak. Taşımada kaynak yedek olarak korunacak veya temizleme yalnız güvenli ve açık işlemden sonra yapılacak.

## CURRENT RESUME ARCHITECTURE / PROBLEMS

`ApplicantProfile` (`src/shared/schema.ts`) master veri, legacy görünürlük (`resumeSections`), başlık (`resumeSectionTitles`), global ve template layout (`resumeSectionLayout`, `resumeSectionLayouts`), semantic sections, knowledge groups ve `specialSections` alanlarını bir arada tutuyor. `ProfileView.tsx` ile `ResumeDataEditor.tsx` aynı profil alanlarını farklı editörlerden değiştiriyor. `ResumeSectionsPanel.tsx` semantic ve eski section durumlarını birlikte yazıyor. `src/features/resume-sections/resume-sections.ts` 13 template için zone capability ve fallback tanımlıyor; `resume-section-system.ts` semantic section ve block resolver sunuyor. Buna rağmen `DocumentsView.tsx`, `electron/documents.ts` ve template bileşenleri profil alanlarını ayrı ayrı yorumluyor. `src/shared/documentDesign.ts` ortak ayarları içeriyor; template `*.defaults.ts` ve CSS hâlâ özel oran, spacing ve tipografi kullanıyor.

## NEW RESUME DATA MODEL / SHARED PREVIEW-PDF-DOCX DATA MODEL

Storage güvenli olduktan sonra `schemaVersion: 2`: profil master içeriği; ayrı `ResumeConfiguration` içinde semantic sections, görünürlük, sıralama, placement, özel başlıklar ve reusable content blocks; `DocumentDesignSettings` üzerindeki paylaşılan kimlik ve CV override'ları. `createResumeViewModel()` bütün çıktılar için tek çözümleyici olacak. Template capabilities yalnız desteklenen yerleşim ve varsayılanları bildirecek; uygun olmayan placement içerik kaybetmeden fallback alacak. Profile alanlarının eski adları migration sırasında okunacak, silinmeden önce raporlanacak.

## MIGRATION V1 → V2 / BACKUP & ROLLBACK STRATEGY

V1 workspace tespit edilince dönüşümden önce `data/Backups/Migration_YYYY-MM-DD_HH-mm-ss/` içine JSON ve tüm kalıcı dosyaların snapshot'ı, hash/size doğrulaması ve `migration-manifest.json` yazılacak. Manifest tarih, eski/yeni sürüm, kaynak/hedef, dönüştürülen alanlar ve uyarıları içerecek. Başarısız yedek migration'ı durduracak. Dönüşüm geçici dosyada doğrulanıp atomik yazılacak; hata halinde V1 dosyası korunacak. Migration idempotent olacak; `strengths`, `skills`, `knowledgeSection`, `specialSections`, `resumeSections`, titles, layouts, semantic sections ve knowledge groups dahil tüm alanlar ya dönüştürülecek ya da raporla yedekte korunacak.

## CURRENT WORD ARCHITECTURE / CURRENT DOCX TEMPLATE SYSTEM / DOCX PLACEHOLDER MODEL

`electron/templates/template.service.ts` mevcut DOCX şablonlarını tarayıp hedef klasöre üretiyor. `template-placeholder.service.ts` docxtemplater/PizZip ile placeholder dolduruyor. `template-mapper.ts` template metadata'sını çözüyor; `public/templates` bundled asset, `data/Muster` kullanıcı şablonudur. `electron/storage.ts` template veri alanlarını, `electron/documents.ts` HTML/PDF içeriğini ayrı kuruyor. DOCX placeholder'ları ve görsel Word stilleri şu an bütün React semantic section değişikliklerinin otomatik eşdeğeri değil.

## WORD DATA MAPPING / WORD DESIGN LIMITATIONS / VISUAL DOCX STRATEGY / ATS DOCX STRATEGY

V2 `ResumeViewModel` sıralı ve görünür semantic sections ile design tokens döndürecek. Word adapter bu modelden docxtemplater verisi üretecek; iş verisi tekrar hesaplanmayacak. Visual DOCX şablonu desteklenen font/renk/margin/column özelliklerini Word stillerine çevirecek. ATS DOCX aynı section dizisini tek sütunda, dekorasyonsuz kullanacak. Word'de CSS arka planları veya tam piksel eşleşmesi olmayan ayarlar açık merkezi fallback alacak; metin ve sıralama hiçbir durumda düşmeyecek. DOCX otomatik workspace içine kaydedilecek; manuel Word değişiklikleri canonical veriyi değiştirmeyecek.

## WORD TEMPLATE MIGRATION / WORD BACKUP STRATEGY / WORD TEST STRATEGY

Eski DOCX şablonları kaynak asset olarak kalacak; yeni adapter'e geçiş aşamalı olacak. Üretilmiş DOCX, kullanıcı Muster dosyaları ve bütün diğer Word belgeleri tam snapshot'a dahil. `electron/documents.test.ts`, template servis testleri ve yeni adapter testlerinde ZIP/XML bütünlüğü, placeholder kalmaması, başlık/içerik/görünürlük/sıra, ATS ve visual çıktı ve güvenli dosya yolu doğrulanacak.

## FILES TO CHANGE / FILES TO REMOVE AFTER MIGRATION

İlk aşama: `src/config/application-paths.ts`, `electron/main.ts`, `electron/storage.ts`, `electron/file-management.ts`, `electron/preload.ts`, `src/shared/ipc.ts`, `src/App.tsx`, `src/views/SettingsView.tsx` ve ilgili testler; yeni `electron/workspace-management.ts` ve kurulum UI dosyası. Sonraki aşamalar: `src/shared/schema.ts`, `src/shared/documentDesign.ts`, `src/shared/templates.ts`, `src/views/ProfileView.tsx`, `src/views/DocumentsView.tsx`, `src/components/resume/`, `src/features/resume-sections/`, `src/features/knowledge/`, `electron/documents.ts`, `electron/templates/` ve testleri. Legacy alan/yardımcılar yalnız migration ve bütün renderer testleri geçtikten sonra kaldırılacak; şu anda güvenle silinecek dosya belirlenmedi.

## TEST STRATEGY / IMPLEMENTATION PHASES / IMPLEMENTATION STEPS

1. Tam yedek, manifest ve başarısızlıkta durma; first-run ve bootstrap; root yok/yazılamaz davranışı; settings üzerinden transaction benzeri yol değişikliği; otomatik export yolları. Test: kurulum/yeniden başlatma, değişiklik/rollback, binary backup. `npm run typecheck`, `npm test`, `npm run build`.
2. V2 canonical model ve deterministik migration; eski profil ve bütün içerik alanlarının korunması. Aynı üç doğrulama.
3. Ortak ResumeViewModel, template capabilities ve semantic block sistemi; 13 template için fallback ve içerik testleri.
4. Editor, design token çözümlemesi, canlı A4 preview ve PDF eşliği; ATS kontrolü.
5. Visual/ATS Word adapter'ları, otomatik DOCX kayıt, ZIP/XML ve parity testleri.
6. Eski kod temizliği yalnız tüm migration ve çıktı testleri geçtikten sonra.
