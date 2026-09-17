$ErrorActionPreference = 'Stop'
$source = 'D:\bewerbung\outputs\su_filtresi_takip\Su_Filtresi_Musteri_Takip.xlsm'
$test = 'D:\bewerbung\outputs\su_filtresi_takip\qa_test_f21.xlsm'
Copy-Item -LiteralPath $source -Destination $test -Force

function Release-ComObject($obj) {
    if ($null -ne $obj) { try { [void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($obj) } catch {} }
}

$xl = $null
$wb = $null
try {
    $xl = New-Object -ComObject Excel.Application
    $xl.Visible = $false
    $xl.DisplayAlerts = $false
    $xl.AutomationSecurity = 1
    $wb = $xl.Workbooks.Open($test)
    $prefix = "'qa_test_f21.xlsm'!"
    $xl.Run($prefix + 'TestModuAc')

    $main = $wb.Worksheets.Item('Ana_Sayfa')
    $lists = $wb.Worksheets.Item('Listeler')
    $needs = $wb.Worksheets.Item('Ihtiyac_Listesi')
    $customers = $wb.Worksheets.Item('Musteriler').ListObjects.Item('tblMusteriler')
    $tracking = $wb.Worksheets.Item('Filtre_Takip').ListObjects.Item('tblTakip')
    $catalog = $wb.Worksheets.Item('Marka_Model_Filtre').ListObjects.Item('tblKatalog')

    $main.Range('F5').Value2 = 'LG'
    $xl.Run($prefix + 'BagimliListeleriYenile', 'Tum')
    $model = [string]$lists.Range('B2').Value2
    $main.Range('F6').Value2 = 'LG-12'
    $xl.Run($prefix + 'BagimliListeleriYenile', 'Tum')
    $filter = [string]$lists.Range('C2').Value2
    $main.Range('F7').Value2 = 'Demo Filtre'
    $xl.Run($prefix + 'BagimliListeleriYenile', 'Tum')
    $xl.CalculateFull()
    $filterId = [string]$main.Range('F8').Value2

    $main.Range('B6').Value2 = 'Test'
    $main.Range('B7').Value2 = 'Müşteri'
    $main.Range('B8').Value2 = '+49 170 1111111'
    $main.Range('B9').Value2 = 'Test adresi'
    $main.Range('B10').Value = [datetime]::Today
    $main.Range('F9').Value = [datetime]::Today.AddMonths(-6).AddDays(10)
    $main.Range('F21').Value2 = 6
    $xl.Run($prefix + 'SonrakiDegisimiGuncelle')
    $main.Range('F11').Value2 = 'Aktif'
    $xl.Run($prefix + 'MusteriKaydet')
    $newId = [string]$main.Range('B5').Value2
    $customerCount = $customers.ListRows.Count
    $needBrand = [string]$needs.Range('A6').Value2
    $needModel = [string]$needs.Range('B6').Value2
    $needFilter = [string]$needs.Range('C6').Value2
    $needQty = $needs.Range('D6').Value2
    $daysLeft = $needs.Range('M6').Value2
    $nextDateSerial = $main.Range('F10').Value2
    $nextDate = [datetime]::FromOADate([double]$nextDateSerial)

    $main.Range('B17').Value2 = $newId
    $xl.Run($prefix + 'MusteriAra')
    $loadedName = [string]$main.Range('B6').Value2
    $main.Range('B9').Value2 = 'Güncellenmiş test adresi'
    $xl.Run($prefix + 'MusteriGuncelle')
    $updatedAddress = [string]$customers.DataBodyRange.Cells($customerCount,5).Value2

    $beforeTracking = $tracking.ListRows.Count
    $xl.Run($prefix + 'FiltreDegisimi')
    $afterTracking = $tracking.ListRows.Count
    $needsAfterChange = [string]$needs.Range('A6').Value2
    $xl.Run($prefix + 'FiltreDegisimi')
    $afterDuplicate = $tracking.ListRows.Count

    $main.Range('F18').Value2 = 'TestMarka'
    $main.Range('F19').Value2 = 'T-1'
    $main.Range('F20').Value2 = 'Test Filtre'
    $main.Range('F21').Value2 = 7
    $main.Range('F22').Value2 = 'Evet'
    $xl.Run($prefix + 'KatalogKaydet')
    $newFilterId = [string]$main.Range('F17').Value2
    $catalogCount = $catalog.ListRows.Count
    $main.Range('F21').Value2 = 8
    $xl.Run($prefix + 'KatalogGuncelle')
    $updatedPeriod = $catalog.DataBodyRange.Cells($catalogCount,5).Value2

    $result = [ordered]@{
        model = $model
        filter = $filter
        filter_id = $filterId
        customer_id = $newId
        customer_count = $customerCount
        need = "$needBrand|$needModel|$needFilter|$needQty"
        days_left = $daysLeft
        next_date = $nextDate.ToString('yyyy-MM-dd')
        loaded_name = $loadedName
        updated_address = $updatedAddress
        tracking_delta = ($afterTracking - $beforeTracking)
        duplicate_delta = ($afterDuplicate - $afterTracking)
        needs_after_change = $needsAfterChange
        catalog_id = $newFilterId
        catalog_count = $catalogCount
        updated_period = $updatedPeriod
    }
    $result | ConvertTo-Json -Compress

    if ($model -ne 'LG-12' -or $filter -ne 'Demo Filtre' -or $filterId -ne 'F0009') { throw 'Dependent dropdown test failed.' }
    if ($newId -ne 'M0002' -or $customerCount -ne 2 -or $needBrand -ne 'LG' -or $needQty -ne 1) { throw 'Customer/need test failed.' }
    if ($daysLeft -ne 10 -or $nextDate.Date -ne [datetime]::Today.AddDays(10).Date -or $loadedName -ne 'Test' -or $updatedAddress -ne 'Güncellenmiş test adresi') { throw 'Search/update test failed.' }
    if (($afterTracking - $beforeTracking) -ne 1 -or ($afterDuplicate - $afterTracking) -ne 0 -or $needsAfterChange -ne 'İhtiyaç yok') { throw 'Filter change/duplicate test failed.' }
    if ($newFilterId -ne 'F0010' -or $catalogCount -ne 10 -or $updatedPeriod -ne 8) { throw 'Catalog test failed.' }

    $wb.Close($false)
} finally {
    if ($null -ne $wb) { try { Release-ComObject $wb } catch {} }
    if ($null -ne $xl) { try { $xl.Quit() } catch {}; Release-ComObject $xl }
    [GC]::Collect(); [GC]::WaitForPendingFinalizers(); [GC]::Collect(); [GC]::WaitForPendingFinalizers()
}
