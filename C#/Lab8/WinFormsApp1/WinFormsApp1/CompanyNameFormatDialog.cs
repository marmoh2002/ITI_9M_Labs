using System;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;

namespace ABCRevenueApp
{
    public class CompanyNameFormatDialog : Form
    {
        private readonly RadioButton _fontTimes;
        private readonly RadioButton _fontAdal;
        private readonly RadioButton _fontCourier;

        private readonly RadioButton _size16;
        private readonly RadioButton _size20;
        private readonly RadioButton _size24;

        private readonly Button _colorButton;
        private readonly Panel _colorPreview;

        private readonly TextBox _oldText;
        private readonly TextBox _newText;

        public string SelectedFontName { get; private set; }
        public float SelectedFontSize { get; private set; }
        public Color SelectedColor { get; private set; }
        public string SelectedText { get; private set; }

        public CompanyNameFormatDialog(string currentText, string fontName, float fontSize, Color color)
        {
            Text = "Company Name Format";
            FormBorderStyle = FormBorderStyle.FixedDialog;
            MaximizeBox = false;
            MinimizeBox = false;
            StartPosition = FormStartPosition.CenterParent;
            ClientSize = new Size(420, 300);

            SelectedFontName = fontName;
            SelectedFontSize = fontSize;
            SelectedColor = color;
            SelectedText = currentText;

            var tabs = new TabControl
            {
                Dock = DockStyle.Top,
                Height = 210
            };

            var fontTab = new TabPage("Font");
            _fontTimes = new RadioButton { Text = "Times New Roman", Location = new Point(20, 20), AutoSize = true };
            _fontAdal = new RadioButton { Text = "Adal", Location = new Point(20, 55), AutoSize = true };
            _fontCourier = new RadioButton { Text = "Courier", Location = new Point(20, 90), AutoSize = true };
            fontTab.Controls.AddRange(new Control[] { _fontTimes, _fontAdal, _fontCourier });

            var sizeTab = new TabPage("Size");
            _size16 = new RadioButton { Text = "16", Location = new Point(20, 20), AutoSize = true };
            _size20 = new RadioButton { Text = "20", Location = new Point(20, 55), AutoSize = true };
            _size24 = new RadioButton { Text = "24", Location = new Point(20, 90), AutoSize = true };
            sizeTab.Controls.AddRange(new Control[] { _size16, _size20, _size24 });

            var colorTab = new TabPage("Color");
            _colorButton = new Button { Text = "Choose Color", Location = new Point(20, 20), Size = new Size(120, 30) };
            _colorPreview = new Panel { Location = new Point(160, 20), Size = new Size(60, 30), BackColor = color, BorderStyle = BorderStyle.FixedSingle };
            _colorButton.Click += OnChooseColor;
            colorTab.Controls.AddRange(new Control[] { _colorButton, _colorPreview });

            var textTab = new TabPage("Text");
            var oldLabel = new Label { Text = "Old Value", Location = new Point(20, 20), AutoSize = true };
            _oldText = new TextBox { Location = new Point(20, 40), Width = 340, ReadOnly = true, Text = currentText };
            var newLabel = new Label { Text = "New Value", Location = new Point(20, 80), AutoSize = true };
            _newText = new TextBox { Location = new Point(20, 100), Width = 340, Text = currentText };
            textTab.Controls.AddRange(new Control[] { oldLabel, _oldText, newLabel, _newText });

            tabs.TabPages.Add(fontTab);
            tabs.TabPages.Add(sizeTab);
            tabs.TabPages.Add(colorTab);
            tabs.TabPages.Add(textTab);

            var okButton = new Button { Text = "OK", DialogResult = DialogResult.OK, Location = new Point(230, 230), Size = new Size(75, 30) };
            var cancelButton = new Button { Text = "Cancel", DialogResult = DialogResult.Cancel, Location = new Point(315, 230), Size = new Size(75, 30) };

            AcceptButton = okButton;
            CancelButton = cancelButton;

            Controls.Add(tabs);
            Controls.Add(okButton);
            Controls.Add(cancelButton);

            SetInitialSelections(fontName, fontSize);

            okButton.Click += OnOkClicked;
        }

        private void SetInitialSelections(string fontName, float fontSize)
        {
            string normalizedFont = fontName?.Trim() ?? string.Empty;
            if (string.Equals(normalizedFont, "Times New Roman", StringComparison.OrdinalIgnoreCase))
            {
                _fontTimes.Checked = true;
            }
            else if (string.Equals(normalizedFont, "Adal", StringComparison.OrdinalIgnoreCase))
            {
                _fontAdal.Checked = true;
            }
            else if (string.Equals(normalizedFont, "Courier", StringComparison.OrdinalIgnoreCase))
            {
                _fontCourier.Checked = true;
            }
            else
            {
                _fontTimes.Checked = true;
            }

            if (Math.Abs(fontSize - 16f) < 0.1f)
            {
                _size16.Checked = true;
            }
            else if (Math.Abs(fontSize - 20f) < 0.1f)
            {
                _size20.Checked = true;
            }
            else if (Math.Abs(fontSize - 24f) < 0.1f)
            {
                _size24.Checked = true;
            }
            else
            {
                _size16.Checked = true;
            }
        }

        private void OnChooseColor(object? sender, EventArgs e)
        {
            using var colorDialog = new ColorDialog { Color = SelectedColor };
            if (colorDialog.ShowDialog(this) == DialogResult.OK)
            {
                SelectedColor = colorDialog.Color;
                _colorPreview.BackColor = SelectedColor;
            }
        }

        private void OnOkClicked(object? sender, EventArgs e)
        {
            SelectedFontName = _fontTimes.Checked ? "Times New Roman" : _fontAdal.Checked ? "Adal" : "Courier";
            SelectedFontSize = _size16.Checked ? 16f : _size20.Checked ? 20f : 24f;
            SelectedText = _newText.Text;
        }
    }
}
