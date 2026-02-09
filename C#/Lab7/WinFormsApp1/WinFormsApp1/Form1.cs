using System;
using System.Drawing;
using System.Windows.Forms;

namespace ABCRevenueApp
{
    public class Form1 : Form
    {
        private RevenueRenderer _engine;

        public Form1()
        {

            this.Text = "ABC Financial Report";
            this.Size = new Size(1000, 600);
            this.BackColor = Color.GhostWhite;
            this.DoubleBuffered = true;
            this.StartPosition = FormStartPosition.CenterScreen;

            _engine = new RevenueRenderer();
        }

        protected override void OnKeyDown(KeyEventArgs e)
        {
            base.OnKeyDown(e);

            if (e.Control)
            {
                switch (e.KeyCode)
                {
                    case Keys.R: _engine.CurrentLineColor = Color.Red; break;
                    case Keys.G: _engine.CurrentLineColor = Color.Green; break;
                    case Keys.B: _engine.CurrentLineColor = Color.Blue; break;
                    default: return;
                }
                this.Refresh();
            }
        }

        protected override void OnMouseDown(MouseEventArgs e)
        {
            base.OnMouseDown(e);

            if (e.Button == MouseButtons.Left)
            {
                var result = _engine.CheckHit(e.X, e.Y, this.ClientSize.Width, this.ClientSize.Height);

                if (result.HasValue)
                {
                    MessageBox.Show(
                        $"Fiscal Year: {result.Value.Year}\nTotal Revenue: {result.Value.Revenue}M",
                        "Data Point Found"
                    );
                }
            }
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            _engine.DrawScene(e.Graphics, this.ClientSize.Width, this.ClientSize.Height);
        }
    }
}