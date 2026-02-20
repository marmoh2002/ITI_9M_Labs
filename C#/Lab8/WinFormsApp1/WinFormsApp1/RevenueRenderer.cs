using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;

namespace ABCRevenueApp
{
    public struct FiscalEntry
    {
        public int Year;
        public int Revenue;
        public FiscalEntry(int y, int r) { Year = y; Revenue = r; }
    }

    public class RevenueRenderer
    {
        private List<FiscalEntry> _financialData;
        public Color CurrentLineColor { get; set; } = Color.Blue;
        public string CompanyNameText { get; set; } = "ABC Company";
        public string CompanyNameFontName { get; set; } = "Verdana";
        public float CompanyNameFontSize { get; set; } = 18f;
        public Color CompanyNameColor { get; set; } = Color.DarkBlue;

        public RevenueRenderer()
        {
            _financialData = new List<FiscalEntry>
            {
                new FiscalEntry(1988, 150), new FiscalEntry(1989, 170),
                new FiscalEntry(1990, 180), new FiscalEntry(1991, 175),
                new FiscalEntry(1992, 200), new FiscalEntry(1993, 250),
                new FiscalEntry(1994, 210), new FiscalEntry(1995, 240),
                new FiscalEntry(1996, 280), new FiscalEntry(1997, 140)
            };
        }

        public FiscalEntry? CheckHit(int mouseX, int mouseY, int clientW, int clientH)
        {
            int margin = 60;
            int gHeight = 350;
            int gWidth = clientW - 450;
            int startY = 120;
            float barSpace = gWidth / (float)_financialData.Count;
            float barW = 25f;
            float maxVal = 320f;

            for (int i = 0; i < _financialData.Count; i++)
            {
                float xVal = margin + (i * barSpace) + 15;
                float barH = (_financialData[i].Revenue / maxVal) * gHeight;
                float yVal = (startY + gHeight) - barH;

                if (mouseX >= xVal && mouseX <= xVal + barW &&
                    mouseY >= yVal && mouseY <= yVal + barH)
                {
                    return _financialData[i];
                }
            }
            return null;
        }

        public void DrawScene(Graphics g, int w, int h)
        {
            g.SmoothingMode = SmoothingMode.HighQuality;
            DrawTitle(g, w);
            DrawGrid(g, w);
            DrawGraph(g, w);
        }

        private void DrawTitle(Graphics g, int w)
        {
            using (Font headFont = new Font(CompanyNameFontName, CompanyNameFontSize, FontStyle.Bold))
            using (Font subFont = new Font("Verdana", 12, FontStyle.Italic | FontStyle.Underline))
            {
                float mid = w / 2;
                SizeF tSize = g.MeasureString(CompanyNameText, headFont);
                using (Brush titleBrush = new SolidBrush(CompanyNameColor))
                {
                    g.DrawString(CompanyNameText, headFont, titleBrush, mid - (tSize.Width / 2), 20);
                }

                SizeF sSize = g.MeasureString("Annual Revenue", subFont);
                g.DrawString("Annual Revenue", subFont, Brushes.Gray, mid - (sSize.Width / 2), 55);
            }
        }

        private void DrawGrid(Graphics g, int w)
        {
            int startX = w - 280;
            int startY = 120;
            int rowH = 35;
            int colW = 110;

            using (Font gridFont = new Font("Tahoma", 11))
            using (Pen gridPen = new Pen(Color.Black, 1))
            {
                g.DrawRectangle(gridPen, startX, startY, colW, rowH);
                g.DrawString("Fiscal Year", gridFont, Brushes.Black, startX + 10, startY + 8);
                g.DrawRectangle(gridPen, startX + colW, startY, colW, rowH);
                g.DrawString("Revenue (M)", gridFont, Brushes.Black, startX + colW + 10, startY + 8);

                for (int i = 0; i < _financialData.Count; i++)
                {
                    int y = startY + ((i + 1) * rowH);
                    g.DrawRectangle(gridPen, startX, y, colW, rowH);
                    g.DrawString(_financialData[i].Year.ToString(), gridFont, Brushes.Black, startX + 15, y + 8);
                    g.DrawRectangle(gridPen, startX + colW, y, colW, rowH);
                    g.DrawString(_financialData[i].Revenue.ToString(), gridFont, Brushes.Black, startX + colW + 15, y + 8);
                }
            }
        }

        private void DrawGraph(Graphics g, int w)
        {
            int margin = 60;
            int gHeight = 350;
            int gWidth = w - 450;
            int startY = 120;

            using (Pen axisPen = new Pen(Color.DimGray, 3))
            {
                g.DrawLine(axisPen, margin, startY, margin, startY + gHeight);
                g.DrawLine(axisPen, margin, startY + gHeight, margin + gWidth, startY + gHeight);
            }

            float barSpace = gWidth / (float)_financialData.Count;
            float barW = 25f;
            float maxVal = 320f;
            PointF[] pts = new PointF[_financialData.Count];

            using (HatchBrush fill = new HatchBrush(HatchStyle.ForwardDiagonal, Color.Red, Color.WhiteSmoke))
            using (Pen outline = new Pen(Color.Black))
            using (Font lblFont = new Font("Arial", 8))
            {
                for (int i = 0; i < _financialData.Count; i++)
                {
                    float x = margin + (i * barSpace) + 15;
                    float h = (_financialData[i].Revenue / maxVal) * gHeight;
                    float y = (startY + gHeight) - h;

                    g.FillRectangle(fill, x, y, barW, h);
                    g.DrawRectangle(outline, x, y, barW, h);
                    g.DrawString(_financialData[i].Year.ToString(), lblFont, Brushes.Black, x - 5, startY + gHeight + 10);

                    pts[i] = new PointF(x + (barW / 2), y);
                }
            }

            if (pts.Length > 1)
            {
                using (Pen linePen = new Pen(CurrentLineColor, 2))
                {
                    g.DrawLines(linePen, pts);
                }
            }
        }
    }
}