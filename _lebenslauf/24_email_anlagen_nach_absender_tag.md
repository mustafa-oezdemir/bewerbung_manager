
* **Markdown dosya adı:** `24_email_anlagen_nach_absender_tag.md`
* **Konu:** Bewerbungs-E-Mail içinde **Anlagen** bölümünün imza/gönderen bilgisinden sonra gösterilmesi
* **İstenilen çıktı:** `buildApplicationEmailMarkdown()` fonksiyonunda Anlagen listesinin e-posta metninin sonunda, `Mit freundlichen Grüßen` ve gönderen adından sonra oluşturulması
* **Kullanılacak framework:** TAG
* **Senin yazacağın prompt:**

````markdown
# 1. Görev

Mevcut `applicationEmail.ts` kodunu güncelle.

Bewerbungs-E-Mail çıktısındaki sıralama aşağıdaki gibi olmalıdır:

1. Anrede
2. Nachricht
3. Abschlussformulierung
4. Grußformel
5. Absender / Name
6. Anlagen

Yani **Anlagen bölümü kesinlikle gönderenin isminden sonra gelmelidir.**

---

# 2. İstenen E-Mail Yapısı

Final e-posta aşağıdaki sırada oluşturulmalıdır:

```text
Sehr geehrte Frau Müller,

anbei übersende ich Ihnen meine Bewerbung für die ausgeschriebene Position als Softwareentwickler bei Muster GmbH.

Meine vollständigen Bewerbungsunterlagen finden Sie im beigefügten PDF.

Für Rückfragen stehe ich Ihnen gerne zur Verfügung. Über die Gelegenheit zu einem persönlichen Gespräch freue ich mich.

Mit freundlichen Grüßen

Mustafa Özdemir

Anlagen
- Bewerbungsunterlagen.pdf
````

---

# 3. Anlagen Konumu

Şu sıra
