using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;

namespace EmployeeLab
{
    public class MainForm : Form
    {
        private Button btnDisplay, btnInsert, btnDelete, btnUpdate, btnSearch;
        private DataGridView dgv;
        private Label lblStatus;

        public MainForm()
        {
            Text = "Employee Management";
            Size = new Size(900, 580);
            StartPosition = FormStartPosition.CenterScreen;
            BackColor = Color.WhiteSmoke;
            Font = new Font("Segoe UI", 9f);

            BuildUI();

            try { Database.Initialize(); }
            catch (Exception ex) { ShowStatus("DB Init Error: " + ex.Message, error: true); }
        }

        private void BuildUI()
        {
            var panel = new Panel
            {
                Dock = DockStyle.Left,
                Width = 160,
                Padding = new Padding(10),
                BackColor = Color.FromArgb(45, 62, 80)
            };

            btnDisplay = MakeButton("Display / Connect", Color.FromArgb(39, 174, 96));
            btnInsert = MakeButton("Insert Employee", Color.FromArgb(41, 128, 185));
            btnDelete = MakeButton("Delete Employee", Color.FromArgb(192, 57, 43));
            btnUpdate = MakeButton("Update Department", Color.FromArgb(142, 68, 173));
            btnSearch = MakeButton("Search by ID", Color.FromArgb(211, 84, 0));

            btnDisplay.Click += BtnDisplay_Click;
            btnInsert.Click += BtnInsert_Click;
            btnDelete.Click += BtnDelete_Click;
            btnUpdate.Click += BtnUpdate_Click;
            btnSearch.Click += BtnSearch_Click;

            panel.Controls.Add(btnDisplay);
            panel.Controls.Add(btnInsert);
            panel.Controls.Add(btnDelete);
            panel.Controls.Add(btnUpdate);
            panel.Controls.Add(btnSearch);

            // position buttons vertically
            int y = 20;
            foreach (Control c in panel.Controls)
            {
                c.Top = y;
                c.Left = 10;
                y += c.Height + 10;
            }

            dgv = new DataGridView
            {
                Dock = DockStyle.Fill,
                ReadOnly = true,
                AllowUserToAddRows = false,
                AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill,
                BackgroundColor = Color.White,
                BorderStyle = BorderStyle.None,
                RowHeadersVisible = false,
                SelectionMode = DataGridViewSelectionMode.FullRowSelect
            };
            dgv.ColumnHeadersDefaultCellStyle.BackColor = Color.FromArgb(45, 62, 80);
            dgv.ColumnHeadersDefaultCellStyle.ForeColor = Color.White;
            dgv.ColumnHeadersDefaultCellStyle.Font = new Font("Segoe UI", 9f, FontStyle.Bold);
            dgv.EnableHeadersVisualStyles = false;
            dgv.AlternatingRowsDefaultCellStyle.BackColor = Color.FromArgb(240, 245, 250);

            lblStatus = new Label
            {
                Dock = DockStyle.Bottom,
                Height = 28,
                TextAlign = ContentAlignment.MiddleLeft,
                Padding = new Padding(6, 0, 0, 0),
                BackColor = Color.FromArgb(45, 62, 80),
                ForeColor = Color.White,
                Text = "Ready."
            };

            Controls.Add(dgv);
            Controls.Add(panel);
            Controls.Add(lblStatus);
        }

        private static Button MakeButton(string text, Color back)
        {
            return new Button
            {
                Text = text,
                Width = 140,
                Height = 45,
                BackColor = back,
                ForeColor = Color.White,
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Segoe UI", 8.5f, FontStyle.Bold),
                Cursor = Cursors.Hand
            };
        }

        private void ShowStatus(string msg, bool error = false)
        {
            lblStatus.Text = msg;
            lblStatus.BackColor = error ? Color.FromArgb(192, 57, 43) : Color.FromArgb(39, 174, 96);
        }

        private void LoadGrid(List<Employee> employees)
        {
            dgv.DataSource = employees.Count > 0 ? employees : new List<Employee>();
            if (employees.Count > 0)
            {
                dgv.Columns["Id"].HeaderText = "ID";
                dgv.Columns["Name"].HeaderText = "Name";
                dgv.Columns["Department"].HeaderText = "Department";
            }
        }

        private void BtnDisplay_Click(object sender, EventArgs e)
        {
            try
            {
                var list = Database.GetAll();
                LoadGrid(list);
                ShowStatus($"Connected. {list.Count} employee(s) loaded.");
            }
            catch (Exception ex) { ShowStatus("Error: " + ex.Message, error: true); }
        }

        private void BtnInsert_Click(object sender, EventArgs e)
        {
            using (var dlg = new InsertDialog())
            {
                if (dlg.ShowDialog() != DialogResult.OK) return;
                try
                {
                    string result = Database.Insert(dlg.EmpId, dlg.EmpName, dlg.EmpDept);
                    ShowStatus(result, result.Contains("already"));
                    BtnDisplay_Click(sender, e);
                }
                catch (Exception ex) { ShowStatus("Error: " + ex.Message, error: true); }
            }
        }

        private void BtnDelete_Click(object sender, EventArgs e)
        {
            string input = Prompt("Delete Employee", "Enter Employee ID to delete:");
            if (input == null) return;
            if (!int.TryParse(input, out int id))
            { ShowStatus("Invalid ID.", error: true); return; }

            try
            {
                string result = Database.Delete(id);
                ShowStatus(result, result.Contains("No employee"));
                BtnDisplay_Click(sender, e);
            }
            catch (Exception ex) { ShowStatus("Error: " + ex.Message, error: true); }
        }

        private void BtnUpdate_Click(object sender, EventArgs e)
        {
            using (var dlg = new UpdateDialog())
            {
                if (dlg.ShowDialog() != DialogResult.OK) return;
                try
                {
                    string result = Database.Update(dlg.EmpId, dlg.EmpName, dlg.NewDept);
                    ShowStatus(result, result.Contains("No employee"));
                    BtnDisplay_Click(sender, e);
                }
                catch (Exception ex) { ShowStatus("Error: " + ex.Message, error: true); }
            }
        }

        private void BtnSearch_Click(object sender, EventArgs e)
        {
            string input = Prompt("Search Employee", "Enter Employee ID to search:");
            if (input == null) return;
            if (!int.TryParse(input, out int id))
            { ShowStatus("Invalid ID.", error: true); return; }

            try
            {
                var emp = Database.SearchById(id);
                if (emp == null)
                {
                    dgv.DataSource = null;
                    ShowStatus($"No employee found with ID {id}.", error: true);
                }
                else
                {
                    LoadGrid(new List<Employee> { emp });
                    ShowStatus($"Found: {emp.Name} – {emp.Department}");
                }
            }
            catch (Exception ex) { ShowStatus("Error: " + ex.Message, error: true); }
        }

        private static string Prompt(string title, string message)
        {
            Form f = new Form { Text = title, Size = new Size(360, 150), StartPosition = FormStartPosition.CenterParent, FormBorderStyle = FormBorderStyle.FixedDialog, MaximizeBox = false, MinimizeBox = false };
            Label lb = new Label { Text = message, Left = 12, Top = 14, Width = 320 };
            TextBox tb = new TextBox { Left = 12, Top = 38, Width = 320 };
            Button ok = new Button { Text = "OK", Left = 175, Top = 72, Width = 80, DialogResult = DialogResult.OK };
            Button cn = new Button { Text = "Cancel", Left = 260, Top = 72, Width = 80, DialogResult = DialogResult.Cancel };
            f.Controls.AddRange(new Control[] { lb, tb, ok, cn });
            f.AcceptButton = ok; f.CancelButton = cn;
            return f.ShowDialog() == DialogResult.OK ? tb.Text.Trim() : null;
        }
    }

    public class InsertDialog : Form
    {
        public int EmpId { get; private set; }
        public string EmpName { get; private set; }
        public string EmpDept { get; private set; }

        private TextBox tbId, tbName, tbDept;

        public InsertDialog()
        {
            Text = "Insert New Employee";
            Size = new Size(360, 240);
            StartPosition = FormStartPosition.CenterParent;
            FormBorderStyle = FormBorderStyle.FixedDialog;
            MaximizeBox = false;

            AddRow("Employee ID:", out tbId, 40);
            AddRow("Name:", out tbName, 80);
            AddRow("Department:", out tbDept, 120);

            var ok = new Button { Text = "Insert", Left = 175, Top = 165, Width = 80, DialogResult = DialogResult.OK };
            var cancel = new Button { Text = "Cancel", Left = 260, Top = 165, Width = 80, DialogResult = DialogResult.Cancel };
            Controls.AddRange(new Control[] { ok, cancel });
            AcceptButton = ok; CancelButton = cancel;

            ok.Click += (s, e) =>
            {
                if (!int.TryParse(tbId.Text.Trim(), out int id))
                { MessageBox.Show("ID must be a number."); DialogResult = DialogResult.None; return; }
                if (string.IsNullOrWhiteSpace(tbName.Text) || string.IsNullOrWhiteSpace(tbDept.Text))
                { MessageBox.Show("Name and Department cannot be empty."); DialogResult = DialogResult.None; return; }
                EmpId = id;
                EmpName = tbName.Text.Trim();
                EmpDept = tbDept.Text.Trim();
            };
        }

        private void AddRow(string label, out TextBox tb, int top)
        {
            Controls.Add(new Label { Text = label, Left = 12, Top = top, Width = 110 });
            tb = new TextBox { Left = 130, Top = top - 2, Width = 200 };
            Controls.Add(tb);
        }
    }

    public class UpdateDialog : Form
    {
        public int EmpId { get; private set; }
        public string EmpName { get; private set; }
        public string NewDept { get; private set; }

        private TextBox tbId, tbName, tbDept;

        public UpdateDialog()
        {
            Text = "Update Department";
            Size = new Size(360, 215);
            StartPosition = FormStartPosition.CenterParent;
            FormBorderStyle = FormBorderStyle.FixedDialog;
            MaximizeBox = false;

            AddRow("Employee ID:", out tbId, 40);
            AddRow("Name:", out tbName, 80);
            AddRow("New Department:", out tbDept, 120);

            var ok = new Button { Text = "Update", Left = 175, Top = 148, Width = 80, DialogResult = DialogResult.OK };
            var cancel = new Button { Text = "Cancel", Left = 260, Top = 148, Width = 80, DialogResult = DialogResult.Cancel };
            Controls.AddRange(new Control[] { ok, cancel });
            AcceptButton = ok; CancelButton = cancel;

            ok.Click += (s, e) =>
            {
                if (!int.TryParse(tbId.Text.Trim(), out int id))
                { MessageBox.Show("ID must be a number."); DialogResult = DialogResult.None; return; }
                if (string.IsNullOrWhiteSpace(tbName.Text) || string.IsNullOrWhiteSpace(tbDept.Text))
                { MessageBox.Show("Name and New Department cannot be empty."); DialogResult = DialogResult.None; return; }
                EmpId = id;
                EmpName = tbName.Text.Trim();
                NewDept = tbDept.Text.Trim();
            };
        }

        private void AddRow(string label, out TextBox tb, int top)
        {
            Controls.Add(new Label { Text = label, Left = 12, Top = top, Width = 120 });
            tb = new TextBox { Left = 140, Top = top - 2, Width = 190 };
            Controls.Add(tb);
        }
    }
}
