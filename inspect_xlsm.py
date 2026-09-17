import json
import re
import zipfile

path = r"D:\bewerbung\outputs\su_filtresi_takip\Su_Filtresi_Musteri_Takip.xlsm"
with zipfile.ZipFile(path) as zf:
    result = {}
    for name in zf.namelist():
        if name.startswith("xl/drawings/drawing") and name.endswith(".xml"):
            text = zf.read(name).decode("utf-8", "ignore")
            result[name] = {
                "shape_names": re.findall(r'<xdr:cNvPr[^>]*name="([^"]+)"', text),
                "captions": re.findall(r"<a:t>(.*?)</a:t>", text),
                "macros": re.findall(r'macro="([^"]+)"', text),
            }
    print(json.dumps(result, ensure_ascii=False, indent=2))
