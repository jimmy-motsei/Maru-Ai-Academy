#!/usr/bin/env python3
"""
Markdown to PDF Converter for Maru AI Academy
Converts .md files to beautifully styled PDFs for recording sessions.
"""

import markdown
from weasyprint import HTML, CSS
import os
import sys

# Professional styling for the PDF
CSS_STYLES = """
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #1a1a2e;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
    font-size: 11pt;
}

h1 {
    color: #00d4aa;
    border-bottom: 3px solid #00d4aa;
    padding-bottom: 10px;
    font-size: 24pt;
    margin-top: 0;
}

h2 {
    color: #1a1a2e;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 8px;
    margin-top: 30px;
    font-size: 16pt;
    page-break-before: always;
}

h2:first-of-type {
    page-break-before: avoid;
}

h3 {
    color: #00d4aa;
    margin-top: 25px;
    font-size: 13pt;
}

h4 {
    color: #666;
    margin-top: 15px;
    font-size: 11pt;
}

blockquote {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-left: 4px solid #00d4aa;
    margin: 15px 0;
    padding: 15px 20px;
    border-radius: 0 8px 8px 0;
    font-style: normal;
}

blockquote p {
    margin: 0;
}

code {
    background: #f4f4f4;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'SF Mono', Monaco, monospace;
    font-size: 10pt;
}

pre {
    background: #1a1a2e;
    color: #00d4aa;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
}

pre code {
    background: none;
    color: inherit;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

th {
    background: #00d4aa;
    color: white;
    font-weight: 600;
}

tr:nth-child(even) {
    background: #f9f9f9;
}

ul, ol {
    padding-left: 25px;
}

li {
    margin: 5px 0;
}

hr {
    border: none;
    border-top: 2px solid #e0e0e0;
    margin: 30px 0;
}

strong {
    color: #1a1a2e;
}

em {
    color: #666;
}

/* Script section styling */
p:has(strong:first-child) {
    margin-top: 15px;
}

/* Page break hints */
.page-break {
    page-break-before: always;
}

@page {
    margin: 2cm;
    @bottom-center {
        content: "Maru AI Academy - Recording Scripts";
        font-size: 9pt;
        color: #999;
    }
    @bottom-right {
        content: counter(page);
        font-size: 9pt;
        color: #999;
    }
}
"""


def md_to_pdf(input_path, output_folder):
    """Convert a single markdown file or all .md files in a folder to PDF."""
    
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        print(f"📁 Created output folder: {output_folder}")

    # Determine if input is a file or folder
    if os.path.isfile(input_path):
        files_to_convert = [(os.path.dirname(input_path), os.path.basename(input_path))]
    else:
        files_to_convert = [
            (input_path, f) for f in os.listdir(input_path) if f.endswith(".md")
        ]

    if not files_to_convert:
        print("❌ No .md files found to convert.")
        return

    for folder, filename in files_to_convert:
        input_file = os.path.join(folder, filename)
        output_filename = os.path.splitext(filename)[0] + ".pdf"
        output_path = os.path.join(output_folder, output_filename)

        print(f"📄 Converting: {filename}")
        
        try:
            # Read markdown content
            with open(input_file, 'r', encoding='utf-8') as f:
                md_content = f.read()
            
            # Convert to HTML with extensions for tables, etc.
            html_content = markdown.markdown(
                md_content,
                extensions=['tables', 'fenced_code', 'toc', 'nl2br']
            )
            
            # Wrap in full HTML document
            full_html = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>{os.path.splitext(filename)[0]}</title>
            </head>
            <body>
                {html_content}
            </body>
            </html>
            """
            
            # Generate PDF with styling
            HTML(string=full_html).write_pdf(
                output_path,
                stylesheets=[CSS(string=CSS_STYLES)]
            )
            
            print(f"   ✅ Created: {output_filename}")
            
        except Exception as e:
            print(f"   ❌ Error converting {filename}: {e}")

    print(f"\n🎉 Done! PDFs saved to: {output_folder}")


if __name__ == "__main__":
    # Default paths
    input_path = "/Users/ramoloimotsei/maru-ai-academy/documents/RECORDING_SCRIPTS_MASTER.md"
    output_folder = "/Users/ramoloimotsei/maru-ai-academy/documents/pdfs"
    
    # Allow command line arguments
    if len(sys.argv) >= 2:
        input_path = sys.argv[1]
    if len(sys.argv) >= 3:
        output_folder = sys.argv[2]
    
    print("🎬 Maru AI Academy - Markdown to PDF Converter")
    print("=" * 50)
    
    md_to_pdf(input_path, output_folder)
