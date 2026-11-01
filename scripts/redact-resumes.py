"""Create redacted, publishable copies of the resumes.

Reads the private originals from "Resume Collections/" (git-ignored) and writes
redacted PDFs plus first-page thumbnails to public/resumes/. Redaction removes
the underlying text and image pixels, not just a black box drawn on top.

Removed: email addresses, phone numbers, mailto/tel links, document metadata,
and on the scanned Resume 1, the contact lines and the personal-details block
(parents' names, date of birth, home address).

Run locally after changing a resume:  python -I scripts/redact-resumes.py
Requires PyMuPDF (pip install pymupdf).
"""

import re
import sys
from pathlib import Path

import fitz  # PyMuPDF

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'Resume Collections'
OUT = ROOT / 'public' / 'resumes'

EMAIL = re.compile(r'[\w.+-]+@[\w-]+\.[\w.]+')
PHONE = re.compile(r'(\+?91[\s-]?)?\b[6-9]\d{9}\b')
PHONE_PART = re.compile(r'^\+?\d{2,}[\d-]*$')  # "+91", "7395971053" as separate words

# Resume 1 is a scan with no text layer, so its regions are fixed rectangles
# in PDF points (page index → rects). Found by rendering the pages.
SCANNED_REGIONS = {
    0: [fitz.Rect(28, 80, 300, 110)],     # email and phone lines
    3: [fitz.Rect(28, 428, 565, 534)],    # personal details: parents, date of birth, address
}

RESUMES = [
    ('Resume - 1 - After College.pdf', 'resume-1-after-college', True),
    ('Resume - 2 - After Gofrugal.pdf', 'resume-2-gofrugal', False),
    ('Resume - 3 - After Gofrugal.pdf', 'resume-3-gofrugal-revised', False),
    ('Resume - 4 - After Lumel.pdf', 'resume-4-lumel', False),
    ('Resume - 5 - After Tiger.pdf', 'resume-5-current', False),
]


def redact_text_pdf(doc):
    for page in doc:
        words = page.get_text('words')
        for i, w in enumerate(words):
            text = w[4]
            nxt = words[i + 1][4] if i + 1 < len(words) else ''
            is_phone_part = PHONE_PART.match(text) and (
                PHONE.search(text) or (text.lstrip('+') == '91' and PHONE.search(nxt))
            )
            if EMAIL.search(text) or PHONE.search(text) or is_phone_part:
                page.add_redact_annot(fitz.Rect(w[:4]), fill=(1, 1, 1))
        page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE)


def redact_scanned_pdf(doc):
    for index, rects in SCANNED_REGIONS.items():
        page = doc[index]
        for r in rects:
            page.add_redact_annot(r, fill=(1, 1, 1))
        page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_PIXELS)


def strip_links_and_metadata(doc):
    for page in doc:
        for link in page.get_links():
            if link.get('uri', '').lower().startswith(('mailto:', 'tel:')):
                page.delete_link(link)
    doc.set_metadata({})
    doc.del_xml_metadata()


def verify(path):
    text = ''.join(page.get_text() for page in fitz.open(path))
    leaks = EMAIL.findall(text) + [m.group(0) for m in PHONE.finditer(text)]
    if leaks:
        sys.exit(f'Redaction check failed for {path.name}: {len(leaks)} match(es) remain')


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for src_name, slug, scanned in RESUMES:
        doc = fitz.open(SRC / src_name)
        if scanned:
            redact_scanned_pdf(doc)
            # Pixel redaction re-encodes the scan losslessly; recompress it.
            doc.rewrite_images(dpi_threshold=160, dpi_target=150, quality=72)
        else:
            redact_text_pdf(doc)
        strip_links_and_metadata(doc)
        pdf_path = OUT / f'{slug}.pdf'
        doc.save(pdf_path, garbage=4, deflate=True, clean=True)

        thumb = fitz.open(pdf_path)[0].get_pixmap(dpi=54)
        thumb.save(OUT / f'{slug}.jpg', jpg_quality=82)
        verify(pdf_path)
        print(f'{slug}: {len(doc)} page(s), {pdf_path.stat().st_size // 1024} KB')


if __name__ == '__main__':
    main()
