$ErrorActionPreference = 'Stop'

$outputPath = 'D:\bewerbung\outputs\su_filtresi_takip\Su_Filtresi_Musteri_Takip.xlsm'
$projectName = 'SuFiltresiTakip'
$protectPassword = 'SuTakip2026'
$accessVbomPath = 'HKCU:\Software\Microsoft\Office\16.0\Excel\Security'
$previousAccess = $null
$hadAccessValue = $false

function Release-ComObject($obj) {
    if ($null -ne $obj) {
        try { [void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($obj) } catch {}
    }
}

function Set-CellStyle($range, $fill, $fontColor, $bold, $fontSize) {
    if ($fill) { $range.Interior.Color = $fill }
    if ($fontColor) { $range.Font.Color = $fontColor }
    $range.Font.Bold = $bold
    $range.Font.Size = $fontSize
    $range.Font.Name = 'Aptos'
    $range.VerticalAlignment = -4108
}

function Set-RangeValues($range, $values) {
    $flat = New-Object System.Collections.Generic.List[object]
    foreach ($value in $values) {
        if ($value -is [System.Array]) {
            foreach ($inner in $value) { $flat.Add($inner) }
        } else {
            $flat.Add($value)
        }
    }
    $rowCount = $range.Rows.Count
    $colCount = $range.Columns.Count
    if ($flat.Count -ne ($rowCount * $colCount)) {
        throw "Value count $($flat.Count) does not match range size $rowCount x $colCount."
    }
    $matrix = New-Object 'object[,]' $rowCount, $colCount
    for ($r = 0; $r -lt $rowCount; $r++) {
        for ($c = 0; $c -lt $colCount; $c++) {
            $matrix[$r,$c] = $flat[($r * $colCount) + $c]
        }
    }
    $range.Value2 = $matrix
}

function Add-Button($sheet, $cellAddress, $width, $height, $caption, $macro, $fillColor) {
    $cell = $sheet.Range($cellAddress)
    $shape = $sheet.Shapes.AddShape(5, $cell.Left, $cell.Top, $width, $height)
    $shape.Name = ('btn_' + ($macro -replace '[^A-Za-z0-9]', '_'))
    $shape.Fill.ForeColor.RGB = $fillColor
    $shape.Line.Visible = 0
    $shape.TextFrame2.TextRange.Text = $caption
    $shape.TextFrame2.TextRange.Font.Name = 'Aptos'
    $shape.TextFrame2.TextRange.Font.Size = 10
    $shape.TextFrame2.TextRange.Font.Bold = -1
    $shape.TextFrame2.TextRange.Font.Fill.ForeColor.RGB = 16777215
    $shape.TextFrame2.VerticalAnchor = 3
    $shape.OnAction = $macro
    Release-ComObject $cell
    return $shape
}

$navy = 6434088        # RGB(40,46,98)
$teal = 10197815       # RGB(55,155,155)
$lightTeal = 14873841  # RGB(241,244,226)
$lightBlue = 16448250  # RGB(250,250,250)
$orange = 49407        # RGB(255,192,0)
$red = 8421631         # RGB(255,128,128)
$green = 10079487      # RGB(127,205,153)
$white = 16777215
$dark = 3355443
$gray = 15132390

# Enable programmatic VBA project access only for this build session.
if (-not (Test-Path $accessVbomPath)) { New-Item -Path $accessVbomPath -Force | Out-Null }
try {
    $existing = Get-ItemProperty -Path $accessVbomPath -Name AccessVBOM -ErrorAction Stop
    $previousAccess = $existing.AccessVBOM
    $hadAccessValue = $true
} catch {}
Set-ItemProperty -Path $accessVbomPath -Name AccessVBOM -Type DWord -Value 1

$excel = $null
$workbook = $null
try {
    $excel = New-Object -ComObject Excel.Application
    $excel.Visible = $false
    $excel.DisplayAlerts = $false
    $excel.EnableEvents = $false
    $excel.ScreenUpdating = $false
    $excel.AutomationSecurity = 3
    $workbook = $excel.Workbooks.Open($outputPath)

    $sheetNames = @('Ana_Sayfa','Dashboard','Musteriler','Filtre_Takip','Marka_Model_Filtre','Listeler','VBA_Kurulum','Ihtiyac_Listesi')
    foreach ($name in $sheetNames) {
        $sheet = $workbook.Worksheets.Item($name)
        try { $sheet.Unprotect($protectPassword) } catch {}
        while ($sheet.ListObjects.Count -gt 0) { $sheet.ListObjects.Item(1).Unlist() }
        while ($sheet.Shapes.Count -gt 0) { $sheet.Shapes.Item(1).Delete() }
        $sheet.Cells.UnMerge()
        $sheet.Cells.Clear()
        $sheet.Cells.ClearFormats()
        $sheet.Cells.Font.Name = 'Aptos'
        $sheet.Cells.Font.Size = 10
        $sheet.Cells.VerticalAlignment = -4108
        $sheet.Cells.HorizontalAlignment = -4131
        $sheet.Activate()
        $excel.ActiveWindow.DisplayGridlines = $false
        Release-ComObject $sheet
    }

    # Catalog
    $catalog = $workbook.Worksheets.Item('Marka_Model_Filtre')
    Set-RangeValues $catalog.Range('A1:F1') @('FiltreID','Marka','Model','Filtre Adı','Değişim Periyodu (Ay)','Aktif')
    Set-RangeValues $catalog.Range('A2:F10') @(
        @('F0001','ÖrnekMarka A','A100','Sediment 5 Mikron',6,'Evet'),
        @('F0002','ÖrnekMarka A','A100','Karbon Blok',6,'Evet'),
        @('F0003','ÖrnekMarka A','A200','Membran 75 GPD',24,'Evet'),
        @('F0004','ÖrnekMarka B','B10','Ön Karbon',6,'Evet'),
        @('F0005','ÖrnekMarka B','B10','Son Karbon',12,'Evet'),
        @('F0006','ÖrnekMarka B','B20','UF Membran',12,'Evet'),
        @('F0007','ÖrnekMarka C','C1','Mineral Filtre',12,'Evet'),
        @('F0008','ÖrnekMarka C','C2','Alkalin Filtre',12,'Evet'),
        @('F0009','LG','LG-12','Demo Filtre',6,'Evet')
    )
    $tblCatalog = $catalog.ListObjects.Add(1, $catalog.Range('A1:F10'), $null, 1)
    $tblCatalog.Name = 'tblKatalog'
    $tblCatalog.TableStyle = 'TableStyleMedium2'
    $catalog.Columns('A').ColumnWidth = 12
    $catalog.Columns('B:D').ColumnWidth = 24
    $catalog.Columns('E').ColumnWidth = 24
    $catalog.Columns('F').ColumnWidth = 12
    $catalog.Range('A1:F10').Borders.Color = $gray
    $catalog.Range('E2:E1000').NumberFormat = '0'
    $catalog.Range('H2').Value2 = 'Katalog ana sayfadaki Katalog Yönetimi bölümünden düzenlenir.'
    $catalog.Range('H2').Font.Italic = $true
    $catalog.Range('H2').Font.Color = 8421504
    $catalog.Columns('H').ColumnWidth = 55

    # Customer table
    $customers = $workbook.Worksheets.Item('Musteriler')
    Set-RangeValues $customers.Range('A1:N1') @('MusteriID','Ad','Soyad','Telefon','Adres','Kayıt Tarihi','Marka','Model','Filtre Adı','FiltreID','Son Değişim','Sonraki Değişim','Durum','Not')
    Set-RangeValues $customers.Range('A2:N2') @('M0001','Örnek','Müşteri','+49 170 0000000','Örnek adres',[datetime]'2026-09-01','ÖrnekMarka A','A100','Sediment 5 Mikron','F0001',[datetime]'2026-09-01',[datetime]'2027-03-01','Aktif','Örnek kayıt')
    $tblCustomers = $customers.ListObjects.Add(1, $customers.Range('A1:N2'), $null, 1)
    $tblCustomers.Name = 'tblMusteriler'
    $tblCustomers.TableStyle = 'TableStyleMedium2'
    $customers.Columns('A').ColumnWidth = 12
    $customers.Columns('B:C').ColumnWidth = 16
    $customers.Columns('D').ColumnWidth = 20
    $customers.Columns('E').ColumnWidth = 34
    $customers.Columns('F').ColumnWidth = 14
    $customers.Columns('G:I').ColumnWidth = 21
    $customers.Columns('J').ColumnWidth = 12
    $customers.Columns('K:L').ColumnWidth = 16
    $customers.Columns('M').ColumnWidth = 12
    $customers.Columns('N').ColumnWidth = 28
    $customers.Range('F2:F10000').NumberFormatLocal = 'TT.MM.JJJJ'
    $customers.Range('K2:L10000').NumberFormatLocal = 'TT.MM.JJJJ'
    $customers.Range('A1:N2').Borders.Color = $gray
    $customers.Application.ActiveWindow.SplitRow = 1
    $customers.Application.ActiveWindow.FreezePanes = $true

    # Filter change history
    $tracking = $workbook.Worksheets.Item('Filtre_Takip')
    Set-RangeValues $tracking.Range('A1:K1') @('TakipID','MusteriID','FiltreID','Marka','Model','Filtre Adı','Değişim Tarihi','Sonraki Değişim','Kullanılan Adet','İşlem Tipi','Açıklama')
    Set-RangeValues $tracking.Range('A2:K2') @('T0001','M0001','F0001','ÖrnekMarka A','A100','Sediment 5 Mikron',[datetime]'2026-09-01',[datetime]'2027-03-01',1,'İlk Kurulum','Örnek işlem')
    $tblTracking = $tracking.ListObjects.Add(1, $tracking.Range('A1:K2'), $null, 1)
    $tblTracking.Name = 'tblTakip'
    $tblTracking.TableStyle = 'TableStyleMedium4'
    $tracking.Columns('A:C').ColumnWidth = 12
    $tracking.Columns('D:F').ColumnWidth = 21
    $tracking.Columns('G:H').ColumnWidth = 16
    $tracking.Columns('I').ColumnWidth = 14
    $tracking.Columns('J').ColumnWidth = 18
    $tracking.Columns('K').ColumnWidth = 32
    $tracking.Range('G2:H10000').NumberFormatLocal = 'TT.MM.JJJJ'
    $tracking.Application.ActiveWindow.SplitRow = 1
    $tracking.Application.ActiveWindow.FreezePanes = $true

    # Dynamic helper lists
    $lists = $workbook.Worksheets.Item('Listeler')
    Set-RangeValues $lists.Range('A1:D1') @('Markalar','Seçili Marka Modelleri','Seçili Model Filtreleri','Filtre ID Sonucu')
    Set-RangeValues $lists.Range('A2:A5') @('ÖrnekMarka A','ÖrnekMarka B','ÖrnekMarka C','LG')
    $lists.Columns('A:D').ColumnWidth = 28
    foreach ($n in @('MarkaListesi','ModelListesi','FiltreListesi')) {
        try { $workbook.Names.Item($n).Delete() } catch {}
    }
    [void]$workbook.Names.Add('MarkaListesi','=Listeler!$A$2:$A$500')
    [void]$workbook.Names.Add('ModelListesi','=Listeler!$B$2:$B$500')
    [void]$workbook.Names.Add('FiltreListesi','=Listeler!$C$2:$C$500')

    # Main entry form
    $main = $workbook.Worksheets.Item('Ana_Sayfa')
    $main.Range('A2:H2').Merge()
    $main.Range('A2').Value2 = 'SU FİLTRESİ MÜŞTERİ VE SERVİS YÖNETİMİ'
    Set-CellStyle $main.Range('A2:H2') $null $navy $true 16
    $main.Range('A2:H2').HorizontalAlignment = -4131
    $main.Range('A3:H3').Borders.Item(9).Color = $teal
    $main.Range('A3:H3').Borders.Item(9).Weight = 3

    $main.Range('A4:D4').Merge(); $main.Range('A4').Value2 = 'MÜŞTERİ BİLGİLERİ'
    $main.Range('E4:H4').Merge(); $main.Range('E4').Value2 = 'CİHAZ VE FİLTRE BİLGİLERİ'
    Set-CellStyle $main.Range('A4:D4') $navy $white $true 10
    Set-CellStyle $main.Range('E4:H4') $navy $white $true 10

    Set-RangeValues $main.Range('A5:A10') @('Müşteri ID','Ad','Soyad','Telefon','Adres','Kayıt Tarihi')
    Set-RangeValues $main.Range('E5:E11') @('Marka','Model','Filtre Adı','Filtre ID','Son Değişim','Sonraki Değişim','Durum')
    $main.Range('B5').Value2 = 'Yeni kayıt'
    $main.Range('B10').Value2 = [datetime]::Today
    $main.Range('F9').Value2 = [datetime]::Today
    $main.Range('F11').Value2 = 'Aktif'
    $main.Range('F8').Formula = '=IF(Listeler!D2="","",Listeler!D2)'
    $main.Range('F10').ClearContents()
    $main.Range('B10').NumberFormatLocal = 'TT.MM.JJJJ'
    $main.Range('F9:F10').NumberFormatLocal = 'TT.MM.JJJJ'
    $main.Range('A5:A10').Font.Bold = $true
    $main.Range('E5:E11').Font.Bold = $true
    $main.Range('A5:B10').Borders.Color = $gray
    $main.Range('E5:F11').Borders.Color = $gray
    $main.Range('B6:B10').Interior.Color = 13434879
    $main.Range('F5:F7').Interior.Color = 13434879
    $main.Range('F9').Interior.Color = 13434879
    $main.Range('F11').Interior.Color = 13434879
    $main.Range('B5').Interior.Color = 15790320
    $main.Range('F8').Interior.Color = 15790320
    $main.Range('F10').Interior.Color = 15790320

    foreach ($addr in @('F5','F6','F7','F11')) { $main.Range($addr).Validation.Delete() }
    $main.Range('F5').Validation.Add(3,1,1,'=MarkaListesi')
    $main.Range('F6').Validation.Add(3,1,1,'=ModelListesi')
    $main.Range('F7').Validation.Add(3,1,1,'=FiltreListesi')
    $main.Range('F11').Validation.Add(3,1,1,'Aktif,Pasif')
    $main.Range('F22').Validation.Delete()
    $main.Range('F22').Validation.Add(3,1,1,'Evet,Hayır')

    $main.Range('A15:D15').Merge(); $main.Range('A15').Value2 = 'MÜŞTERİ ID İLE ARA'
    $main.Range('E15:H15').Merge(); $main.Range('E15').Value2 = 'KATALOG YÖNETİMİ'
    Set-CellStyle $main.Range('A15:D15') $navy $white $true 10
    Set-CellStyle $main.Range('E15:H15') $navy $white $true 10
    $main.Range('A17').Value2 = 'Müşteri ID'
    $main.Range('B17').NumberFormat = '@'
    $main.Range('B17').Interior.Color = 13434879
    $main.Range('A17:B17').Borders.Color = $gray
    $main.Range('A19:D21').Merge()
    $main.Range('A19').Value2 = 'Müşteri ID girin, ARA düğmesine basın, bilgileri düzenleyin ve MÜŞTERİ GÜNCELLE ile kaydedin.'
    $main.Range('A19').WrapText = $true
    $main.Range('A19').Font.Color = 8421504
    $main.Range('A19').Font.Italic = $true

    Set-RangeValues $main.Range('E17:E22') @('Filtre ID','Marka','Model','Filtre Adı','Periyot (Ay)','Aktif')
    $main.Range('F17').NumberFormat = '@'
    $main.Range('F22').Value2 = 'Evet'
    $main.Range('E17:E22').Font.Bold = $true
    $main.Range('E17:F22').Borders.Color = $gray
    $main.Range('F17:F22').Interior.Color = 13434879

    $main.Range('A28:H28').Merge(); $main.Range('A28').Value2 = '14 gün kuralı: Sonraki değişim tarihi bugün + 14 gün veya daha erkense ürün İhtiyaç Listesine dahil edilir. Gecikmiş kayıtlar da dahildir.'
    $main.Range('A28').Font.Italic = $true
    $main.Range('A28').Font.Color = 8421504

    $main.Columns('A').ColumnWidth = 18
    $main.Columns('B').ColumnWidth = 23
    $main.Columns('C:D').ColumnWidth = 13
    $main.Columns('E').ColumnWidth = 19
    $main.Columns('F').ColumnWidth = 24
    $main.Columns('G:H').ColumnWidth = 13
    $main.Rows('2:28').RowHeight = 22
    $main.Rows('2').RowHeight = 28
    $main.Rows('4').RowHeight = 24
    $main.Rows('15').RowHeight = 24
    $main.Rows('19:21').RowHeight = 22
    $main.Rows('28').RowHeight = 30

    $buttons = @()
    $buttons += Add-Button $main 'A12' 120 28 'MÜŞTERİ KAYDET' 'MusteriKaydet' $teal
    $buttons += Add-Button $main 'C12' 120 28 'MÜŞTERİ GÜNCELLE' 'MusteriGuncelle' $teal
    $buttons += Add-Button $main 'E12' 120 28 'FİLTRE DEĞİŞİMİ' 'FiltreDegisimi' $orange
    $buttons += Add-Button $main 'G12' 120 28 'FORMU TEMİZLE' 'FormTemizle' $navy
    $buttons += Add-Button $main 'C17' 90 24 'ARA' 'MusteriAra' $teal
    $buttons += Add-Button $main 'G17' 90 24 'KATALOG ARA' 'KatalogAra' $navy
    $buttons += Add-Button $main 'G19' 90 24 'YENİ KAYDET' 'KatalogKaydet' $teal
    $buttons += Add-Button $main 'G21' 90 24 'GÜNCELLE' 'KatalogGuncelle' $orange
    $buttons += Add-Button $main 'A25' 120 26 'DASHBOARD' 'DashboardGit' $navy
    $buttons += Add-Button $main 'C25' 120 26 'İHTİYAÇ LİSTESİ' 'IhtiyacListesineGit' $navy
    $buttons += Add-Button $main 'E25' 120 26 'MÜŞTERİ LİSTESİ' 'MusteriListesineGit' $navy
    $buttons += Add-Button $main 'G25' 120 26 'KATALOG' 'KatalogListesineGit' $navy
    foreach ($b in $buttons) { Release-ComObject $b }

    # Needs list: grouped product demand and detailed due customers
    $needs = $workbook.Worksheets.Item('Ihtiyac_Listesi')
    $needs.Range('A2:H2').Merge(); $needs.Range('A2').Value2 = '14 GÜN İÇİNDE FİLTRE İHTİYAÇ LİSTESİ'
    Set-CellStyle $needs.Range('A2:H2') $null $navy $true 16
    $needs.Range('A3:H3').Merge(); $needs.Range('A3').Value2 = 'Gecikmiş ve önümüzdeki 14 gün içinde değişmesi gereken aktif müşteri filtreleri'
    $needs.Range('A3').Font.Italic = $true; $needs.Range('A3').Font.Color = 8421504
    Set-RangeValues $needs.Range('A5:D5') @('Marka','Model','Filtre Adı','Gerekli Adet')
    Set-CellStyle $needs.Range('A5:D5') $navy $white $true 10
    $needs.Range('A6').Value2 = 'İhtiyaç yok'
    Set-RangeValues $needs.Range('F5:M5') @('Müşteri ID','Ad Soyad','Telefon','Marka','Model','Filtre Adı','Sonraki Değişim','Kalan Gün')
    Set-CellStyle $needs.Range('F5:M5') $navy $white $true 10
    $needs.Range('F6').Value2 = 'İhtiyaç yok'
    $needs.Columns('A:B').ColumnWidth = 18
    $needs.Columns('C').ColumnWidth = 24
    $needs.Columns('D').ColumnWidth = 15
    $needs.Columns('E').ColumnWidth = 3
    $needs.Columns('F').ColumnWidth = 13
    $needs.Columns('G').ColumnWidth = 22
    $needs.Columns('H').ColumnWidth = 20
    $needs.Columns('I:K').ColumnWidth = 18
    $needs.Columns('L').ColumnWidth = 17
    $needs.Columns('M').ColumnWidth = 12
    $needs.Range('L6:L1000').NumberFormatLocal = 'TT.MM.JJJJ'
    $needs.Range('M6:M1000').NumberFormat = '0'
    $needs.Range('A6:M1000').FormatConditions.Delete()
    $dueRule = $needs.Range('M6:M1000').FormatConditions.Add(1,8,'=0')
    $dueRule.Interior.Color = 13551615
    $dueRule.Font.Color = 192

    # Dashboard
    $dashboard = $workbook.Worksheets.Item('Dashboard')
    $dashboard.Range('A2:H2').Merge(); $dashboard.Range('A2').Value2 = 'YÖNETİM DASHBOARD'
    Set-CellStyle $dashboard.Range('A2:H2') $null $navy $true 16
    $dashboard.Range('A4:B4').Merge(); $dashboard.Range('C4:D4').Merge(); $dashboard.Range('E4:F4').Merge(); $dashboard.Range('G4:H4').Merge()
    $dashboard.Range('A4').Value2 = 'AKTİF MÜŞTERİ'; $dashboard.Range('C4').Value2 = '14 GÜN İÇİNDE'; $dashboard.Range('E4').Value2 = 'GECİKEN'; $dashboard.Range('G4').Value2 = 'İHTİYAÇ KALEMİ'
    Set-CellStyle $dashboard.Range('A4:H4') $navy $white $true 9
    $dashboard.Range('A5:B6').Merge(); $dashboard.Range('C5:D6').Merge(); $dashboard.Range('E5:F6').Merge(); $dashboard.Range('G5:H6').Merge()
    $dashboard.Range('A5').Formula2 = '=COUNTIF(tblMusteriler[Durum],"Aktif")'
    $dashboard.Range('C5').Formula2 = '=COUNTIFS(tblMusteriler[Durum],"Aktif",tblMusteriler[Sonraki Değişim],"<>",tblMusteriler[Sonraki Değişim],"<="&TODAY()+14)'
    $dashboard.Range('E5').Formula2 = '=COUNTIFS(tblMusteriler[Durum],"Aktif",tblMusteriler[Sonraki Değişim],"<"&TODAY())'
    $dashboard.Range('G5').Formula2 = '=COUNTIF(Ihtiyac_Listesi!D6:D500,">0")'
    $dashboard.Range('A5:H6').Font.Size = 22; $dashboard.Range('A5:H6').Font.Bold = $true; $dashboard.Range('A5:H6').Font.Color = $navy
    $dashboard.Range('A5:H6').HorizontalAlignment = -4108
    $dashboard.Range('A8:D8').Merge(); $dashboard.Range('A8').Value2 = 'GEREKECEK FİLTRELER'
    Set-CellStyle $dashboard.Range('A8:D8') $teal $white $true 10
    Set-RangeValues $dashboard.Range('A9:D9') @('Marka','Model','Filtre Adı','Gerekli Adet')
    Set-CellStyle $dashboard.Range('A9:D9') $navy $white $true 10
    $dashboard.Range('A10').Formula = '=IF(Ihtiyac_Listesi!A6="","",Ihtiyac_Listesi!A6)'
    $dashboard.Range('B10').Formula = '=IF(OR(Ihtiyac_Listesi!A6="",Ihtiyac_Listesi!A6="İhtiyaç yok"),"",Ihtiyac_Listesi!B6)'
    $dashboard.Range('C10').Formula = '=IF(OR(Ihtiyac_Listesi!A6="",Ihtiyac_Listesi!A6="İhtiyaç yok"),"",Ihtiyac_Listesi!C6)'
    $dashboard.Range('D10').Formula = '=IF(OR(Ihtiyac_Listesi!A6="",Ihtiyac_Listesi!A6="İhtiyaç yok"),"",Ihtiyac_Listesi!D6)'
    $dashboard.Range('A10:D21').FillDown()
    $dashboard.Range('F8:H8').Merge(); $dashboard.Range('F8').Value2 = 'DURUM'
    Set-CellStyle $dashboard.Range('F8:H8') $teal $white $true 10
    $dashboard.Range('F9:H11').Merge()
    $dashboard.Range('F9').Formula2 = '=IF(E5>0,"Geciken değişimler var",IF(C5>0,"Yaklaşan değişimler var","Planlı değişim yok"))'
    $dashboard.Range('F9').WrapText = $true; $dashboard.Range('F9').HorizontalAlignment = -4108; $dashboard.Range('F9').Font.Bold = $true
    $dashboard.Range('A23:H23').Merge(); $dashboard.Range('A23').Value2 = 'Detay için İhtiyaç_Listesi sayfasını açın.'
    $dashboard.Range('A23').Font.Italic = $true; $dashboard.Range('A23').Font.Color = 8421504
    $dashboard.Columns('A:B').ColumnWidth = 18
    $dashboard.Columns('C').ColumnWidth = 24
    $dashboard.Columns('D').ColumnWidth = 15
    $dashboard.Columns('E').ColumnWidth = 3
    $dashboard.Columns('F:H').ColumnWidth = 17
    $dashboard.Rows('2').RowHeight = 28
    $dashboard.Rows('4').RowHeight = 22
    $dashboard.Rows('5:6').RowHeight = 25
    $dashboard.Range('A10:D21').FormatConditions.Delete()
    $dashboard.Range('A10:D21').Borders.Color = 15790320
    $dashButton = Add-Button $dashboard 'F14' 150 28 'ANA SAYFAYA DÖN' 'AnaSayfayaGit' $navy
    Release-ComObject $dashButton

    # Embedded usage note, kept hidden.
    $install = $workbook.Worksheets.Item('VBA_Kurulum')
    $install.Range('A1').Value2 = 'Makrolar bu çalışma kitabına gömülüdür.'
    $install.Range('A2').Value2 = 'Ana ekran düğmeleri müşteri, filtre değişimi ve katalog işlemlerini yönetir.'
    $install.Range('A3').Value2 = 'Koruma parolası: SuTakip2026'
    $install.Range('A4').Value2 = 'Stok takibi yoktur. İhtiyaç listesi 14 gün kuralıyla otomatik hesaplanır.'

    # VBA standard module and workbook change event.
    $vbaCode = @'
Option Explicit

Private Const S_ANA As String = "Ana_Sayfa"
Private Const S_MUS As String = "Musteriler"
Private Const S_TAK As String = "Filtre_Takip"
Private Const S_KAT As String = "Marka_Model_Filtre"
Private Const S_IHT As String = "Ihtiyac_Listesi"
Private Const PAROLA As String = "SuTakip2026"
Public SessizMod As Boolean

Private Sub Mesaj(ByVal metin As String, ByVal tur As VbMsgBoxStyle)
    If Not SessizMod Then MsgBox metin, tur
End Sub

Public Sub TestModuAc(): SessizMod = True: End Sub
Public Sub TestModuKapat(): SessizMod = False: End Sub

Private Function Tablo(ByVal sayfa As String, ByVal tabloAdi As String) As ListObject
    Set Tablo = ThisWorkbook.Worksheets(sayfa).ListObjects(tabloAdi)
End Function

Private Function TabloSatiri(ByVal lo As ListObject, ByVal id As String) As Long
    Dim i As Long
    TabloSatiri = 0
    If lo.DataBodyRange Is Nothing Then Exit Function
    For i = 1 To lo.ListRows.Count
        If StrComp(Trim$(CStr(lo.DataBodyRange.Cells(i, 1).Value)), Trim$(id), vbTextCompare) = 0 Then
            TabloSatiri = i
            Exit Function
        End If
    Next i
End Function

Private Function YeniID(ByVal prefix As String, ByVal lo As ListObject) As String
    Dim i As Long, n As Long, enBuyuk As Long, s As String
    If Not lo.DataBodyRange Is Nothing Then
        For i = 1 To lo.ListRows.Count
            s = CStr(lo.DataBodyRange.Cells(i, 1).Value)
            If UCase$(Left$(s, Len(prefix))) = UCase$(prefix) Then
                n = Val(Mid$(s, Len(prefix) + 1))
                If n > enBuyuk Then enBuyuk = n
            End If
        Next i
    End If
    YeniID = prefix & Format$(enBuyuk + 1, "0000")
End Function

Private Function FiltrePeriyodu(ByVal filtreID As String) As Long
    Dim lo As ListObject, i As Long
    Set lo = Tablo(S_KAT, "tblKatalog")
    If lo.DataBodyRange Is Nothing Then Exit Function
    For i = 1 To lo.ListRows.Count
        If StrComp(CStr(lo.DataBodyRange.Cells(i, 1).Value), filtreID, vbTextCompare) = 0 Then
            FiltrePeriyodu = CLng(Val(lo.DataBodyRange.Cells(i, 5).Value))
            Exit Function
        End If
    Next i
End Function

Private Function SonrakiTarih(ByVal filtreID As String, ByVal sonDegisim As Variant) As Variant
    Dim ay As Long
    ay = FiltrePeriyodu(filtreID)
    If IsDate(sonDegisim) And ay > 0 Then SonrakiTarih = DateAdd("m", ay, CDate(sonDegisim)) Else SonrakiTarih = Empty
End Function

Public Sub SonrakiDegisimiGuncelle()
    Dim a As Worksheet
    Set a = ThisWorkbook.Worksheets(S_ANA)
    If IsDate(a.Range("F9").Value) And IsNumeric(a.Range("F21").Value) And CLng(Val(a.Range("F21").Value)) > 0 Then
        a.Range("F10").Value = DateAdd("m", CLng(Val(a.Range("F21").Value)), CDate(a.Range("F9").Value))
    Else
        a.Range("F10").ClearContents
    End If
End Sub

Public Sub Auto_Open()
    KorumaUygula
    MarkaListesiniYenile
    BagimliListeleriYenile "Tum"
    IhtiyacListesiniYenile
    Application.CalculateFull
End Sub

Public Sub KorumaUygula()
    Dim ws As Worksheet
    For Each ws In ThisWorkbook.Worksheets
        On Error Resume Next
        ws.Unprotect PAROLA
        On Error GoTo 0
        If ws.Name <> S_ANA Then
            ws.Protect Password:=PAROLA, DrawingObjects:=True, Contents:=True, Scenarios:=True, UserInterfaceOnly:=True, AllowFiltering:=True, AllowSorting:=True
        End If
    Next ws
End Sub

Public Sub MarkaListesiniYenile()
    Dim lo As ListObject, wl As Worksheet, dict As Object, i As Long, r As Long, k As Variant
    Set lo = Tablo(S_KAT, "tblKatalog")
    Set wl = ThisWorkbook.Worksheets("Listeler")
    Set dict = CreateObject("Scripting.Dictionary")
    wl.Unprotect PAROLA
    wl.Range("A2:A500").ClearContents
    If Not lo.DataBodyRange Is Nothing Then
        For i = 1 To lo.ListRows.Count
            If StrComp(Trim$(CStr(lo.DataBodyRange.Cells(i, 6).Value)), "Evet", vbTextCompare) = 0 Then
                If Trim$(CStr(lo.DataBodyRange.Cells(i, 2).Value)) <> "" Then dict(CStr(lo.DataBodyRange.Cells(i, 2).Value)) = 1
            End If
        Next i
    End If
    r = 2
    For Each k In dict.Keys
        wl.Cells(r, 1).Value = k
        r = r + 1
    Next k
    If r > 3 Then wl.Range("A2:A" & r - 1).Sort Key1:=wl.Range("A2"), Order1:=xlAscending, Header:=xlNo
    wl.Protect Password:=PAROLA, DrawingObjects:=True, Contents:=True, Scenarios:=True, UserInterfaceOnly:=True
End Sub

Public Sub BagimliListeleriYenile(ByVal seviye As String)
    Dim lo As ListObject, wl As Worksheet, a As Worksheet, modeller As Object, filtreler As Object
    Dim i As Long, r As Long, k As Variant, marka As String, model As String, filtre As String
    Set lo = Tablo(S_KAT, "tblKatalog")
    Set wl = ThisWorkbook.Worksheets("Listeler")
    Set a = ThisWorkbook.Worksheets(S_ANA)
    Set modeller = CreateObject("Scripting.Dictionary")
    Set filtreler = CreateObject("Scripting.Dictionary")
    marka = Trim$(CStr(a.Range("F5").Value))
    model = Trim$(CStr(a.Range("F6").Value))
    filtre = Trim$(CStr(a.Range("F7").Value))
    wl.Unprotect PAROLA
    wl.Range("B2:D500").ClearContents
    If Not lo.DataBodyRange Is Nothing Then
        For i = 1 To lo.ListRows.Count
            If StrComp(Trim$(CStr(lo.DataBodyRange.Cells(i, 6).Value)), "Evet", vbTextCompare) = 0 And StrComp(CStr(lo.DataBodyRange.Cells(i, 2).Value), marka, vbTextCompare) = 0 Then
                modeller(CStr(lo.DataBodyRange.Cells(i, 3).Value)) = 1
                If StrComp(CStr(lo.DataBodyRange.Cells(i, 3).Value), model, vbTextCompare) = 0 Then
                    filtreler(CStr(lo.DataBodyRange.Cells(i, 4).Value)) = 1
                    If StrComp(CStr(lo.DataBodyRange.Cells(i, 4).Value), filtre, vbTextCompare) = 0 Then wl.Range("D2").Value = lo.DataBodyRange.Cells(i, 1).Value
                End If
            End If
        Next i
    End If
    r = 2
    For Each k In modeller.Keys: wl.Cells(r, 2).Value = k: r = r + 1: Next k
    If r > 3 Then wl.Range("B2:B" & r - 1).Sort Key1:=wl.Range("B2"), Order1:=xlAscending, Header:=xlNo
    r = 2
    For Each k In filtreler.Keys: wl.Cells(r, 3).Value = k: r = r + 1: Next k
    If r > 3 Then wl.Range("C2:C" & r - 1).Sort Key1:=wl.Range("C2"), Order1:=xlAscending, Header:=xlNo
    wl.Protect Password:=PAROLA, DrawingObjects:=True, Contents:=True, Scenarios:=True, UserInterfaceOnly:=True
    Application.CalculateFull
End Sub

Public Sub IhtiyacListesiniYenile()
    Dim lm As ListObject, wi As Worksheet, dict As Object
    Dim i As Long, outRow As Long, detailRow As Long, k As Variant, parts As Variant
    Dim marka As String, model As String, filtre As String, key As String
    Set lm = Tablo(S_MUS, "tblMusteriler")
    Set wi = ThisWorkbook.Worksheets(S_IHT)
    Set dict = CreateObject("Scripting.Dictionary")
    On Error Resume Next
    wi.Unprotect PAROLA
    On Error GoTo 0
    wi.Range("A6:D1000").ClearContents
    wi.Range("F6:M1000").ClearContents
    outRow = 6
    detailRow = 6
    If Not lm.DataBodyRange Is Nothing Then
        For i = 1 To lm.ListRows.Count
            If StrComp(Trim$(CStr(lm.DataBodyRange.Cells(i, 13).Value)), "Aktif", vbTextCompare) = 0 Then
                If IsDate(lm.DataBodyRange.Cells(i, 12).Value) Then
                    If CDate(lm.DataBodyRange.Cells(i, 12).Value) <= Date + 14 Then
                        marka = CStr(lm.DataBodyRange.Cells(i, 7).Value)
                        model = CStr(lm.DataBodyRange.Cells(i, 8).Value)
                        filtre = CStr(lm.DataBodyRange.Cells(i, 9).Value)
                        key = marka & Chr$(30) & model & Chr$(30) & filtre
                        If dict.Exists(key) Then dict(key) = dict(key) + 1 Else dict.Add key, 1
                        wi.Cells(detailRow, 6).Value = lm.DataBodyRange.Cells(i, 1).Value
                        wi.Cells(detailRow, 7).Value = lm.DataBodyRange.Cells(i, 2).Value & " " & lm.DataBodyRange.Cells(i, 3).Value
                        wi.Cells(detailRow, 8).Value = lm.DataBodyRange.Cells(i, 4).Value
                        wi.Cells(detailRow, 9).Value = marka
                        wi.Cells(detailRow, 10).Value = model
                        wi.Cells(detailRow, 11).Value = filtre
                        wi.Cells(detailRow, 12).Value = CDate(lm.DataBodyRange.Cells(i, 12).Value)
                        wi.Cells(detailRow, 13).Value = DateDiff("d", Date, CDate(lm.DataBodyRange.Cells(i, 12).Value))
                        detailRow = detailRow + 1
                    End If
                End If
            End If
        Next i
    End If
    If dict.Count = 0 Then
        wi.Range("A6").Value = ChrW(304) & "htiyaç yok"
        wi.Range("F6").Value = ChrW(304) & "htiyaç yok"
    Else
        For Each k In dict.Keys
            parts = Split(CStr(k), Chr$(30))
            wi.Cells(outRow, 1).Value = parts(0)
            wi.Cells(outRow, 2).Value = parts(1)
            wi.Cells(outRow, 3).Value = parts(2)
            wi.Cells(outRow, 4).Value = dict(k)
            outRow = outRow + 1
        Next k
        wi.Range("A6:D" & outRow - 1).Sort Key1:=wi.Range("A6"), Order1:=xlAscending, Header:=xlNo
        wi.Range("F6:M" & detailRow - 1).Sort Key1:=wi.Range("L6"), Order1:=xlAscending, Header:=xlNo
    End If
    wi.Protect Password:=PAROLA, DrawingObjects:=True, Contents:=True, Scenarios:=True, UserInterfaceOnly:=True, AllowFiltering:=True, AllowSorting:=True
    Application.CalculateFull
End Sub

Public Sub MusteriAra()
    Dim a As Worksheet, lo As ListObject, r As Long, id As String
    Set a = ThisWorkbook.Worksheets(S_ANA)
    Set lo = Tablo(S_MUS, "tblMusteriler")
    id = Trim$(CStr(a.Range("B17").Value))
    If id = "" Then id = Trim$(CStr(a.Range("B5").Value))
    If id = "" Or id = "Yeni kayıt" Then Mesaj "Müşteri ID girin.", vbExclamation: Exit Sub
    r = TabloSatiri(lo, id)
    If r = 0 Then Mesaj "Müşteri bulunamadı: " & id, vbExclamation: Exit Sub
    Application.EnableEvents = False
    With lo.DataBodyRange.Rows(r)
        a.Range("B5").Value = .Cells(1, 1).Value
        a.Range("B6").Value = .Cells(1, 2).Value
        a.Range("B7").Value = .Cells(1, 3).Value
        a.Range("B8").Value = .Cells(1, 4).Value
        a.Range("B9").Value = .Cells(1, 5).Value
        a.Range("B10").Value = .Cells(1, 6).Value
        a.Range("F5").Value = .Cells(1, 7).Value
        a.Range("F6").Value = .Cells(1, 8).Value
        a.Range("F7").Value = .Cells(1, 9).Value
        a.Range("F9").Value = .Cells(1, 11).Value
        a.Range("F11").Value = .Cells(1, 13).Value
        a.Range("F21").Value = FiltrePeriyodu(CStr(.Cells(1, 10).Value))
    End With
    Application.EnableEvents = True
    SonrakiDegisimiGuncelle
    BagimliListeleriYenile "Tum"
    Application.CalculateFull
End Sub

Public Sub MusteriKaydet()
    Dim a As Worksheet, lo As ListObject, lr As ListRow, id As String, sonDeg As Variant, sonraki As Variant
    Set a = ThisWorkbook.Worksheets(S_ANA)
    If Trim$(CStr(a.Range("B6").Value)) = "" Then Mesaj "Ad alanı boş olamaz.", vbExclamation: Exit Sub
    If Trim$(CStr(a.Range("F8").Value)) = "" Then Mesaj "Marka, model ve filtre seçin.", vbExclamation: Exit Sub
    Set lo = Tablo(S_MUS, "tblMusteriler")
    ThisWorkbook.Worksheets(S_MUS).Unprotect PAROLA
    id = YeniID("M", lo)
    sonDeg = a.Range("F9").Value
    If Not IsDate(sonDeg) Then sonDeg = IIf(IsDate(a.Range("B10").Value), a.Range("B10").Value, Date)
    SonrakiDegisimiGuncelle
    sonraki = a.Range("F10").Value
    Set lr = lo.ListRows.Add
    With lr.Range
        .Cells(1, 1).Value = id
        .Cells(1, 2).Value = a.Range("B6").Value
        .Cells(1, 3).Value = a.Range("B7").Value
        .Cells(1, 4).Value = a.Range("B8").Value
        .Cells(1, 5).Value = a.Range("B9").Value
        .Cells(1, 6).Value = IIf(IsDate(a.Range("B10").Value), a.Range("B10").Value, Date)
        .Cells(1, 7).Value = a.Range("F5").Value
        .Cells(1, 8).Value = a.Range("F6").Value
        .Cells(1, 9).Value = a.Range("F7").Value
        .Cells(1, 10).Value = a.Range("F8").Value
        .Cells(1, 11).Value = sonDeg
        .Cells(1, 12).Value = sonraki
        .Cells(1, 13).Value = IIf(Trim$(CStr(a.Range("F11").Value)) = "", "Aktif", a.Range("F11").Value)
    End With
    a.Range("B5").Value = id
    ThisWorkbook.Worksheets(S_MUS).Protect Password:=PAROLA, DrawingObjects:=True, Contents:=True, Scenarios:=True, UserInterfaceOnly:=True, AllowFiltering:=True, AllowSorting:=True
    IhtiyacListesiniYenile
    Application.CalculateFull
    Mesaj "Müşteri kaydedildi: " & id, vbInformation
End Sub

Public Sub MusteriGuncelle()
    Dim a As Worksheet, lo As ListObject, r As Long, id As String, sonDeg As Variant
    Set a = ThisWorkbook.Worksheets(S_ANA)
    Set lo = Tablo(S_MUS, "tblMusteriler")
    id = Trim$(CStr(a.Range("B5").Value))
    r = TabloSatiri(lo, id)
    If r = 0 Then Mesaj "Önce geçerli bir Müşteri ID ile arama yapın.", vbExclamation: Exit Sub
    If Trim$(CStr(a.Range("F8").Value)) = "" Then Mesaj "Marka, model ve filtre seçin.", vbExclamation: Exit Sub
    ThisWorkbook.Worksheets(S_MUS).Unprotect PAROLA
    sonDeg = a.Range("F9").Value
    With lo.DataBodyRange.Rows(r)
        .Cells(1, 2).Value = a.Range("B6").Value
        .Cells(1, 3).Value = a.Range("B7").Value
        .Cells(1, 4).Value = a.Range("B8").Value
        .Cells(1, 5).Value = a.Range("B9").Value
        .Cells(1, 6).Value = a.Range("B10").Value
        .Cells(1, 7).Value = a.Range("F5").Value
        .Cells(1, 8).Value = a.Range("F6").Value
        .Cells(1, 9).Value = a.Range("F7").Value
        .Cells(1, 10).Value = a.Range("F8").Value
        .Cells(1, 11).Value = sonDeg
        SonrakiDegisimiGuncelle
        .Cells(1, 12).Value = a.Range("F10").Value
        .Cells(1, 13).Value = a.Range("F11").Value
    End With
    ThisWorkbook.Worksheets(S_MUS).Protect Password:=PAROLA, DrawingObjects:=True, Contents:=True, Scenarios:=True, UserInterfaceOnly:=True, AllowFiltering:=True, AllowSorting:=True
    IhtiyacListesiniYenile
    Application.CalculateFull
    Mesaj "Müşteri güncellendi.", vbInformation
End Sub

Public Sub FiltreDegisimi()
    Dim a As Worksheet, lm As ListObject, lt As ListObject, mr As Long, i As Long
    Dim id As String, filtreID As String, takipID As String, yeniTarih As Variant, lr As ListRow
    Set a = ThisWorkbook.Worksheets(S_ANA)
    Set lm = Tablo(S_MUS, "tblMusteriler")
    Set lt = Tablo(S_TAK, "tblTakip")
    id = Trim$(CStr(a.Range("B5").Value))
    filtreID = Trim$(CStr(a.Range("F8").Value))
    mr = TabloSatiri(lm, id)
    If mr = 0 Then Mesaj "Önce kayıtlı bir müşteriyi ID ile arayın.", vbExclamation: Exit Sub
    If filtreID = "" Then Mesaj "Filtre seçin.", vbExclamation: Exit Sub
    If Not lt.DataBodyRange Is Nothing Then
        For i = 1 To lt.ListRows.Count
            If CStr(lt.DataBodyRange.Cells(i, 2).Value) = id And CStr(lt.DataBodyRange.Cells(i, 3).Value) = filtreID Then
                If IsDate(lt.DataBodyRange.Cells(i, 7).Value) Then
                    If DateValue(lt.DataBodyRange.Cells(i, 7).Value) = Date Then Mesaj "Bu müşteri ve filtre için bugün zaten değişim kaydı var.", vbExclamation: Exit Sub
                End If
            End If
        Next i
    End If
    ThisWorkbook.Worksheets(S_TAK).Unprotect PAROLA
    ThisWorkbook.Worksheets(S_MUS).Unprotect PAROLA
    a.Range("F9").Value = Date
    SonrakiDegisimiGuncelle
    yeniTarih = a.Range("F10").Value
    takipID = YeniID("T", lt)
    Set lr = lt.ListRows.Add
    With lr.Range
        .Cells(1, 1).Value = takipID
        .Cells(1, 2).Value = id
        .Cells(1, 3).Value = filtreID
        .Cells(1, 4).Value = a.Range("F5").Value
        .Cells(1, 5).Value = a.Range("F6").Value
        .Cells(1, 6).Value = a.Range("F7").Value
        .Cells(1, 7).Value = Date
        .Cells(1, 8).Value = yeniTarih
        .Cells(1, 9).Value = 1
        .Cells(1, 10).Value = "Filtre Değişimi"
        .Cells(1, 11).Value = "Ana sayfadan işlem"
    End With
    With lm.DataBodyRange.Rows(mr)
        .Cells(1, 7).Value = a.Range("F5").Value
        .Cells(1, 8).Value = a.Range("F6").Value
        .Cells(1, 9).Value = a.Range("F7").Value
        .Cells(1, 10).Value = filtreID
        .Cells(1, 11).Value = Date
        .Cells(1, 12).Value = yeniTarih
    End With
    a.Range("F9").Value = Date
    ThisWorkbook.Worksheets(S_TAK).Protect Password:=PAROLA, DrawingObjects:=True, Contents:=True, Scenarios:=True, UserInterfaceOnly:=True, AllowFiltering:=True, AllowSorting:=True
    ThisWorkbook.Worksheets(S_MUS).Protect Password:=PAROLA, DrawingObjects:=True, Contents:=True, Scenarios:=True, UserInterfaceOnly:=True, AllowFiltering:=True, AllowSorting:=True
    IhtiyacListesiniYenile
    Application.CalculateFull
    Mesaj "Filtre değişimi kaydedildi. İhtiyaç listesi güncellendi.", vbInformation
End Sub

Public Sub KatalogAra()
    Dim a As Worksheet, lo As ListObject, r As Long, id As String
    Set a = ThisWorkbook.Worksheets(S_ANA)
    Set lo = Tablo(S_KAT, "tblKatalog")
    id = Trim$(CStr(a.Range("F17").Value))
    r = TabloSatiri(lo, id)
    If r = 0 Then Mesaj "Filtre ID bulunamadı: " & id, vbExclamation: Exit Sub
    With lo.DataBodyRange.Rows(r)
        a.Range("F18").Value = .Cells(1, 2).Value
        a.Range("F19").Value = .Cells(1, 3).Value
        a.Range("F20").Value = .Cells(1, 4).Value
        a.Range("F21").Value = .Cells(1, 5).Value
        a.Range("F22").Value = .Cells(1, 6).Value
    End With
End Sub

Public Sub KatalogKaydet()
    Dim a As Worksheet, lo As ListObject, lr As ListRow, id As String
    Set a = ThisWorkbook.Worksheets(S_ANA)
    If Trim$(CStr(a.Range("F18").Value)) = "" Or Trim$(CStr(a.Range("F19").Value)) = "" Or Trim$(CStr(a.Range("F20").Value)) = "" Then Mesaj "Marka, model ve filtre adını girin.", vbExclamation: Exit Sub
    If Val(a.Range("F21").Value) <= 0 Then Mesaj "Geçerli bir değişim periyodu girin.", vbExclamation: Exit Sub
    Set lo = Tablo(S_KAT, "tblKatalog")
    ThisWorkbook.Worksheets(S_KAT).Unprotect PAROLA
    id = YeniID("F", lo)
    Set lr = lo.ListRows.Add
    With lr.Range
        .Cells(1, 1).Value = id
        .Cells(1, 2).Value = a.Range("F18").Value
        .Cells(1, 3).Value = a.Range("F19").Value
        .Cells(1, 4).Value = a.Range("F20").Value
        .Cells(1, 5).Value = CLng(a.Range("F21").Value)
        .Cells(1, 6).Value = IIf(Trim$(CStr(a.Range("F22").Value)) = "", "Evet", a.Range("F22").Value)
    End With
    a.Range("F17").Value = id
    ThisWorkbook.Worksheets(S_KAT).Protect Password:=PAROLA, DrawingObjects:=True, Contents:=True, Scenarios:=True, UserInterfaceOnly:=True, AllowFiltering:=True, AllowSorting:=True
    MarkaListesiniYenile
    Application.CalculateFull
    Mesaj "Katalog kaydı oluşturuldu: " & id, vbInformation
End Sub

Public Sub KatalogGuncelle()
    Dim a As Worksheet, lo As ListObject, r As Long, id As String
    Set a = ThisWorkbook.Worksheets(S_ANA)
    Set lo = Tablo(S_KAT, "tblKatalog")
    id = Trim$(CStr(a.Range("F17").Value))
    r = TabloSatiri(lo, id)
    If r = 0 Then Mesaj "Önce geçerli Filtre ID ile katalog kaydını arayın.", vbExclamation: Exit Sub
    If Val(a.Range("F21").Value) <= 0 Then Mesaj "Geçerli bir değişim periyodu girin.", vbExclamation: Exit Sub
    ThisWorkbook.Worksheets(S_KAT).Unprotect PAROLA
    With lo.DataBodyRange.Rows(r)
        .Cells(1, 2).Value = a.Range("F18").Value
        .Cells(1, 3).Value = a.Range("F19").Value
        .Cells(1, 4).Value = a.Range("F20").Value
        .Cells(1, 5).Value = CLng(a.Range("F21").Value)
        .Cells(1, 6).Value = a.Range("F22").Value
    End With
    ThisWorkbook.Worksheets(S_KAT).Protect Password:=PAROLA, DrawingObjects:=True, Contents:=True, Scenarios:=True, UserInterfaceOnly:=True, AllowFiltering:=True, AllowSorting:=True
    MarkaListesiniYenile
    BagimliListeleriYenile "Tum"
    Application.CalculateFull
    Mesaj "Katalog kaydı güncellendi.", vbInformation
End Sub

Public Sub FormTemizle()
    Dim a As Worksheet
    Set a = ThisWorkbook.Worksheets(S_ANA)
    Application.EnableEvents = False
    a.Range("B5:B10").ClearContents
    a.Range("F5:F7").ClearContents
    a.Range("F9:F11").ClearContents
    a.Range("B17").ClearContents
    a.Range("B5").Value = "Yeni kayıt"
    a.Range("B10").Value = Date
    a.Range("F9").Value = Date
    a.Range("F11").Value = "Aktif"
    Application.EnableEvents = True
    BagimliListeleriYenile "Tum"
    Application.CalculateFull
End Sub

Public Sub AnaSayfayaGit(): ThisWorkbook.Worksheets(S_ANA).Activate: End Sub
Public Sub DashboardGit(): IhtiyacListesiniYenile: Application.CalculateFull: ThisWorkbook.Worksheets("Dashboard").Activate: End Sub
Public Sub IhtiyacListesineGit(): IhtiyacListesiniYenile: Application.CalculateFull: ThisWorkbook.Worksheets(S_IHT).Activate: End Sub
Public Sub MusteriListesineGit(): ThisWorkbook.Worksheets(S_MUS).Activate: End Sub
Public Sub KatalogListesineGit(): ThisWorkbook.Worksheets(S_KAT).Activate: End Sub
'@

    $vbProject = $workbook.VBProject
    $standardModules = @()
    foreach ($component in $vbProject.VBComponents) {
        if ($component.Type -eq 1) { $standardModules += $component }
    }
    foreach ($component in $standardModules) { $vbProject.VBComponents.Remove($component) }
    $module = $vbProject.VBComponents.Add(1)
    $module.Name = $projectName
    $module.CodeModule.AddFromString($vbaCode)

    $thisWorkbookComponent = $vbProject.VBComponents.Item($workbook.CodeName)
    $thisCode = @'
Option Explicit

Private Sub Workbook_Open()
    On Error Resume Next
    SuFiltresiTakip.KorumaUygula
    SuFiltresiTakip.MarkaListesiniYenile
    SuFiltresiTakip.BagimliListeleriYenile "Tum"
    SuFiltresiTakip.IhtiyacListesiniYenile
    Application.CalculateFull
End Sub

Private Sub Workbook_SheetChange(ByVal Sh As Object, ByVal Target As Range)
    If Sh.Name <> "Ana_Sayfa" Then Exit Sub
    On Error GoTo GuvenliCikis
    Application.EnableEvents = False
    If Not Intersect(Target, Sh.Range("F5")) Is Nothing Then Sh.Range("F6:F7").ClearContents
    If Not Intersect(Target, Sh.Range("F6")) Is Nothing Then Sh.Range("F7").ClearContents
    If Not Intersect(Target, Sh.Range("F5:F7")) Is Nothing Then SuFiltresiTakip.BagimliListeleriYenile "Tum"
    If Not Intersect(Target, Sh.Range("F9,F21")) Is Nothing Then SuFiltresiTakip.SonrakiDegisimiGuncelle
GuvenliCikis:
    Application.EnableEvents = True
End Sub
'@
    if ($thisWorkbookComponent.CodeModule.CountOfLines -gt 0) { $thisWorkbookComponent.CodeModule.DeleteLines(1, $thisWorkbookComponent.CodeModule.CountOfLines) }
    $thisWorkbookComponent.CodeModule.AddFromString($thisCode)

    # Lock/protect all back-end sheets. Main stays editable at designated cells.
    foreach ($name in @('Dashboard','Musteriler','Filtre_Takip','Marka_Model_Filtre','Listeler','VBA_Kurulum','Ihtiyac_Listesi')) {
        $ws = $workbook.Worksheets.Item($name)
        $ws.Cells.Locked = $true
        $ws.Protect($protectPassword, $true, $true, $true, $true)
        Release-ComObject $ws
    }
    $main.Cells.Locked = $true
    $main.Range('B6:B10').Locked = $false
    $main.Range('F5:F7').Locked = $false
    $main.Range('F9').Locked = $false
    $main.Range('F11').Locked = $false
    $main.Range('B17').Locked = $false
    $main.Range('F17:F22').Locked = $false
    $main.Protect($protectPassword, $true, $true, $true, $true)
    $main.Unprotect($protectPassword)

    $workbook.Worksheets.Item('Listeler').Visible = 2
    $workbook.Worksheets.Item('VBA_Kurulum').Visible = 2
    $workbook.Worksheets.Item('Dashboard').Tab.Color = $navy
    $workbook.Worksheets.Item('Ana_Sayfa').Tab.Color = $teal
    $workbook.Worksheets.Item('Ihtiyac_Listesi').Tab.Color = $orange
    $workbook.Worksheets.Item('Ana_Sayfa').Activate()
    $excel.ActiveWindow.Zoom = 90
    $excel.CalculateFull()
    $workbook.Save()

    # Compact PDF preview for visual QA.
    $printAreas = @{
        'Ana_Sayfa' = '$A$1:$H$29'
        'Dashboard' = '$A$1:$H$24'
        'Musteriler' = '$A$1:$N$20'
        'Filtre_Takip' = '$A$1:$K$20'
        'Marka_Model_Filtre' = '$A$1:$H$15'
        'Ihtiyac_Listesi' = '$A$1:$M$25'
    }
    foreach ($wsName in @('Ana_Sayfa','Dashboard','Musteriler','Filtre_Takip','Marka_Model_Filtre','Ihtiyac_Listesi')) {
        $ws = $workbook.Worksheets.Item($wsName)
        $ws.PageSetup.Orientation = 2
        $ws.PageSetup.Zoom = $false
        $ws.PageSetup.FitToPagesWide = 1
        $ws.PageSetup.FitToPagesTall = 1
        $ws.PageSetup.PrintArea = $printAreas[$wsName]
        Release-ComObject $ws
    }
    $previewPath = 'D:\bewerbung\outputs\su_filtresi_takip\qa_preview.pdf'
    $workbook.ExportAsFixedFormat(0, $previewPath)

    Write-Output ('Saved=' + $outputPath)
    Write-Output ('Sheets=' + (($workbook.Worksheets | ForEach-Object { $_.Name + ':' + $_.Visible }) -join ','))
    Write-Output ('VBA=' + (($vbProject.VBComponents | ForEach-Object { $_.Name + ':' + $_.CodeModule.CountOfLines }) -join ','))
    Write-Output ('Buttons=' + $main.Shapes.Count)
    Write-Output ('Protection=' + (($workbook.Worksheets | ForEach-Object { $_.Name + ':' + $_.ProtectContents }) -join ','))
    $workbook.Close($true)
} finally {
    if ($null -ne $workbook) { try { Release-ComObject $workbook } catch {} }
    if ($null -ne $excel) {
        try { $excel.Quit() } catch {}
        Release-ComObject $excel
    }
    [GC]::Collect(); [GC]::WaitForPendingFinalizers(); [GC]::Collect(); [GC]::WaitForPendingFinalizers()
    if ($hadAccessValue) { Set-ItemProperty -Path $accessVbomPath -Name AccessVBOM -Type DWord -Value $previousAccess }
    else { Remove-ItemProperty -Path $accessVbomPath -Name AccessVBOM -ErrorAction SilentlyContinue }
}
