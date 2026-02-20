using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Windows.Forms;

namespace DualPaneExplorer;

public class ExplorerForm : Form
{
    private readonly PaneContext _leftPane;
    private readonly PaneContext _rightPane;
    private PaneContext? _lastActivePane;

    private readonly Button _moveRightButton;
    private readonly Button _moveLeftButton;
    private readonly Button _copyButton;
    private readonly Button _deleteButton;
    private readonly Button _backButton;

    private static readonly EnumerationOptions DirectoryOptions = new()
    {
        IgnoreInaccessible = true,
        RecurseSubdirectories = false,
        ReturnSpecialDirectories = false
    };

    public ExplorerForm()
    {
        Text = "Dual Pane Explorer";
        StartPosition = FormStartPosition.CenterScreen;
        MinimumSize = new Size(1000, 600);
        Padding = new Padding(16);
        DoubleBuffered = true;

        _leftPane = new PaneContext("Left", CreatePathTextBox(), CreateListView());
        _rightPane = new PaneContext("Right", CreatePathTextBox(), CreateListView());

        var rootLayout = BuildRootLayout();
        Controls.Add(rootLayout);

        _moveRightButton = CreateCommandButton(">", (s, e) => MoveSelectedItem(_leftPane, _rightPane));
        _moveLeftButton = CreateCommandButton("<", (s, e) => MoveSelectedItem(_rightPane, _leftPane));
        _copyButton = CreateCommandButton("Copy", (s, e) => CopySelectedItem());
        _deleteButton = CreateCommandButton("Delete", (s, e) => DeleteSelectedItem());
        _backButton = CreateCommandButton("Back", (s, e) => NavigateUpFromLastPane());

        var buttonPanel = BuildButtonPanel();
        buttonPanel.Controls.Add(_moveRightButton, 0, 0);
        buttonPanel.Controls.Add(_moveLeftButton, 0, 1);
        buttonPanel.Controls.Add(_copyButton, 0, 2);
        buttonPanel.Controls.Add(_deleteButton, 0, 3);
        buttonPanel.Controls.Add(_backButton, 0, 4);

        rootLayout.Controls.Add(BuildPaneSection(_leftPane), 0, 0);
        rootLayout.Controls.Add(buttonPanel, 1, 0);
        rootLayout.Controls.Add(BuildPaneSection(_rightPane), 2, 0);

        RefreshPane(_leftPane);
        RefreshPane(_rightPane);
        UpdateButtonStates();
    }

    private TableLayoutPanel BuildRootLayout()
    {
        var layout = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            ColumnCount = 3,
            RowCount = 1
        };

        layout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 45f));
        layout.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 140f));
        layout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 45f));
        layout.RowStyles.Add(new RowStyle(SizeType.Percent, 100f));

        return layout;
    }

    private TableLayoutPanel BuildButtonPanel()
    {
        var panel = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            RowCount = 5,
            ColumnCount = 1
        };

        for (var i = 0; i < 5; i++)
        {
            panel.RowStyles.Add(new RowStyle(SizeType.Percent, 20f));
        }

        panel.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100f));
        return panel;
    }

    private Control BuildPaneSection(PaneContext context)
    {
        var panel = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            RowCount = 2,
            ColumnCount = 1
        };

        panel.RowStyles.Add(new RowStyle(SizeType.Absolute, 36f));
        panel.RowStyles.Add(new RowStyle(SizeType.Percent, 100f));
        panel.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100f));

        context.PathBox.Margin = new Padding(0, 0, 0, 6);
        context.PathBox.Tag = context;
        context.PathBox.KeyDown += OnPathBoxKeyDown;
        context.PathBox.Enter += OnPaneEntered;

        context.ListView.Tag = context;
        context.ListView.ItemActivate += OnPaneItemActivated;
        context.ListView.ItemSelectionChanged += OnPaneSelectionChanged;
        context.ListView.Enter += OnPaneEntered;
        context.ListView.Click += OnPaneEntered;
        context.ListView.KeyDown += OnPaneListKeyDown;

        panel.Controls.Add(context.PathBox, 0, 0);
        panel.Controls.Add(context.ListView, 0, 1);

        return panel;
    }

    private static TextBox CreatePathTextBox()
    {
        return new TextBox
        {
            BorderStyle = BorderStyle.FixedSingle,
            Dock = DockStyle.Fill
        };
    }

    private static ListView CreateListView()
    {
        var listView = new ListView
        {
            Dock = DockStyle.Fill,
            View = View.Details,
            FullRowSelect = true,
            HideSelection = false,
            MultiSelect = false,
            BorderStyle = BorderStyle.FixedSingle,
            UseCompatibleStateImageBehavior = false
        };

        listView.Columns.Add("Name", -2, HorizontalAlignment.Left);
        listView.Columns.Add("Type", 120, HorizontalAlignment.Left);
        return listView;
    }

    private Button CreateCommandButton(string text, EventHandler onClick)
    {
        var button = new Button
        {
            Text = text,
            Dock = DockStyle.Fill,
            Enabled = false,
            Margin = new Padding(12)
        };

        button.Click += onClick;
        return button;
    }

    private void OnPaneEntered(object? sender, EventArgs e)
    {
        if (sender is Control control && control.Tag is PaneContext context)
        {
            _lastActivePane = context;
            UpdateButtonStates();
        }
    }

    private void OnPaneSelectionChanged(object? sender, ListViewItemSelectionChangedEventArgs e)
    {
        if (sender is ListView listView && listView.Tag is PaneContext context)
        {
            _lastActivePane = context;
            UpdateButtonStates();
        }
    }

    private void OnPaneItemActivated(object? sender, EventArgs e)
    {
        if (sender is not ListView listView || listView.Tag is not PaneContext context)
        {
            return;
        }

        var item = listView.FocusedItem;
        if (item?.Tag is not PaneItemInfo info)
        {
            return;
        }

        _lastActivePane = context;
        HandleItemActivation(context, info);
    }

    private void HandleItemActivation(PaneContext context, PaneItemInfo info)
    {
        switch (info.Kind)
        {
            case PaneItemKind.Directory:
            case PaneItemKind.Drive:
                context.CurrentPath = info.FullPath;
                RefreshPane(context);
                break;
            case PaneItemKind.File:
                MessageBox.Show(
                    $"\"{info.DisplayName}\" is a file and cannot be opened from this explorer.",
                    "File Selected",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Information);
                break;
            case PaneItemKind.ParentUp:
                NavigateUp(context);
                break;
            case PaneItemKind.RootDrives:
                context.CurrentPath = null;
                RefreshPane(context);
                break;
        }
    }

    private void OnPaneListKeyDown(object? sender, KeyEventArgs e)
    {
        if (sender is not ListView listView || listView.Tag is not PaneContext context)
        {
            return;
        }

        _lastActivePane = context;

        if (e.KeyCode == Keys.Enter)
        {
            OnPaneItemActivated(listView, EventArgs.Empty);
            e.Handled = true;
        }
        else if (e.KeyCode == Keys.Back)
        {
            NavigateUp(context);
            e.Handled = true;
        }
        else if (e.KeyCode == Keys.Delete)
        {
            DeleteSelectedItem();
            e.Handled = true;
        }
    }

    private void OnPathBoxKeyDown(object? sender, KeyEventArgs e)
    {
        if (e.KeyCode != Keys.Enter || sender is not TextBox textBox || textBox.Tag is not PaneContext context)
        {
            return;
        }

        e.Handled = true;
        e.SuppressKeyPress = true;
        _lastActivePane = context;

        var desiredPath = textBox.Text.Trim();
        if (string.IsNullOrWhiteSpace(desiredPath) || desiredPath.Equals("Drives", StringComparison.OrdinalIgnoreCase))
        {
            context.CurrentPath = null;
            RefreshPane(context);
            return;
        }

        if (!Directory.Exists(desiredPath))
        {
            ShowError($"The path '{desiredPath}' does not exist.");
            textBox.Text = context.CurrentPath ?? "Drives";
            return;
        }

        context.CurrentPath = desiredPath;
        RefreshPane(context);
    }

    private void RefreshPane(PaneContext context)
    {
        context.ListView.BeginUpdate();
        context.ListView.Items.Clear();

        try
        {
            IEnumerable<ListViewItem> items = context.CurrentPath == null
                ? BuildDriveItems()
                : BuildDirectoryItems(context.CurrentPath);

            context.ListView.Items.AddRange(items.ToArray());
        }
        catch (Exception ex)
        {
            ShowError($"Unable to access the location: {ex.Message}");
            context.CurrentPath = null;
            context.ListView.Items.Clear();
            context.ListView.Items.AddRange(BuildDriveItems().ToArray());
        }
        finally
        {
            context.ListView.EndUpdate();
            AutoSizeColumns(context.ListView);
            context.PathBox.Text = context.CurrentPath ?? "Drives";
            UpdateButtonStates();
        }
    }

    private IEnumerable<ListViewItem> BuildDriveItems()
    {
        foreach (var drive in DriveInfo.GetDrives().OrderBy(d => d.Name, StringComparer.CurrentCultureIgnoreCase))
        {
            var info = new PaneItemInfo(PaneItemKind.Drive, drive.Name, drive.Name, isDirectory: true);
            yield return CreateListViewItem(drive.Name, "Drive", info);
        }
    }

    private IEnumerable<ListViewItem> BuildDirectoryItems(string path)
    {
        yield return CreateListViewItem(".", "Go Up", new PaneItemInfo(PaneItemKind.ParentUp, "."));
        yield return CreateListViewItem("..", "Drives", new PaneItemInfo(PaneItemKind.RootDrives, ".."));

        var directory = new DirectoryInfo(path);

        foreach (var dir in directory.EnumerateDirectories("*", DirectoryOptions)
                     .OrderBy(d => d.Name, StringComparer.CurrentCultureIgnoreCase))
        {
            var info = new PaneItemInfo(PaneItemKind.Directory, dir.Name, dir.FullName, isDirectory: true);
            yield return CreateListViewItem(dir.Name, "Folder", info);
        }

        foreach (var file in directory.EnumerateFiles("*", DirectoryOptions)
                     .OrderBy(f => f.Name, StringComparer.CurrentCultureIgnoreCase))
        {
            var info = new PaneItemInfo(PaneItemKind.File, file.Name, file.FullName, isDirectory: false);
            yield return CreateListViewItem(file.Name, BuildFileTypeLabel(file.Extension), info);
        }
    }

    private static string BuildFileTypeLabel(string extension)
    {
        if (string.IsNullOrWhiteSpace(extension))
        {
            return "File";
        }

        var trimmed = extension.Trim('.');
        return string.IsNullOrWhiteSpace(trimmed)
            ? "File"
            : $"{trimmed.ToUpperInvariant()} File";
    }

    private static ListViewItem CreateListViewItem(string name, string type, PaneItemInfo info)
    {
        var item = new ListViewItem(new[] { name, type }) { Tag = info };

        if (info.Kind is PaneItemKind.ParentUp or PaneItemKind.RootDrives)
        {
            item.ForeColor = Color.DimGray;
        }

        return item;
    }

    private void AutoSizeColumns(ListView listView)
    {
        foreach (ColumnHeader column in listView.Columns)
        {
            column.Width = -2;
        }
    }

    private PaneItemInfo? GetSelectedPaneItem(PaneContext context)
    {
        if (context.ListView.SelectedItems.Count == 0)
        {
            return null;
        }

        if (context.ListView.SelectedItems[0].Tag is not PaneItemInfo info)
        {
            return null;
        }

        return info.Kind switch
        {
            PaneItemKind.Directory => info,
            PaneItemKind.File => info,
            _ => null
        };
    }

    private void MoveSelectedItem(PaneContext source, PaneContext destination)
    {
        var selected = GetSelectedPaneItem(source);
        if (selected == null)
        {
            return;
        }

        if (destination.CurrentPath == null)
        {
            MessageBox.Show(
                "Open a directory in the target pane before moving items.",
                "Move Item",
                MessageBoxButtons.OK,
                MessageBoxIcon.Warning);
            return;
        }

        var destinationPath = Path.Combine(destination.CurrentPath, GetItemName(selected.FullPath!));

        try
        {
            if (selected.IsDirectory)
            {
                Directory.Move(selected.FullPath!, destinationPath);
            }
            else
            {
                File.Move(selected.FullPath!, destinationPath);
            }

            RefreshPane(source);
            RefreshPane(destination);
        }
        catch (Exception ex)
        {
            ShowError($"Move failed: {ex.Message}");
        }
    }

    private void CopySelectedItem()
    {
        if (_lastActivePane == null)
        {
            return;
        }

        var sourceItem = GetSelectedPaneItem(_lastActivePane);
        if (sourceItem == null)
        {
            return;
        }

        var destinationPane = ReferenceEquals(_lastActivePane, _leftPane) ? _rightPane : _leftPane;
        if (destinationPane.CurrentPath == null)
        {
            MessageBox.Show(
                "Open a directory in the opposite pane before copying items.",
                "Copy Item",
                MessageBoxButtons.OK,
                MessageBoxIcon.Warning);
            return;
        }

        var destinationPath = Path.Combine(destinationPane.CurrentPath, GetItemName(sourceItem.FullPath!));

        try
        {
            if (sourceItem.IsDirectory)
            {
                CopyDirectory(sourceItem.FullPath!, destinationPath);
            }
            else
            {
                File.Copy(sourceItem.FullPath!, destinationPath);
            }

            RefreshPane(destinationPane);
        }
        catch (Exception ex)
        {
            ShowError($"Copy failed: {ex.Message}");
        }
    }

    private void DeleteSelectedItem()
    {
        if (_lastActivePane == null)
        {
            return;
        }

        var selected = GetSelectedPaneItem(_lastActivePane);
        if (selected == null)
        {
            return;
        }

        var confirmation = MessageBox.Show(
            $"Are you sure you want to delete '{selected.DisplayName}'?",
            "Delete Item",
            MessageBoxButtons.YesNo,
            MessageBoxIcon.Warning);

        if (confirmation != DialogResult.Yes)
        {
            return;
        }

        try
        {
            if (selected.IsDirectory)
            {
                Directory.Delete(selected.FullPath!, true);
            }
            else
            {
                File.Delete(selected.FullPath!);
            }

            RefreshPane(_leftPane);
            RefreshPane(_rightPane);
        }
        catch (Exception ex)
        {
            ShowError($"Delete failed: {ex.Message}");
        }
    }

    private void NavigateUpFromLastPane()
    {
        if (_lastActivePane == null)
        {
            return;
        }

        NavigateUp(_lastActivePane);
    }

    private void NavigateUp(PaneContext context)
    {
        if (context.CurrentPath == null)
        {
            RefreshPane(context);
            return;
        }

        var parent = Directory.GetParent(context.CurrentPath);
        context.CurrentPath = parent?.FullName;
        RefreshPane(context);
    }

    private void UpdateButtonStates()
    {
        var leftSelection = GetSelectedPaneItem(_leftPane);
        var rightSelection = GetSelectedPaneItem(_rightPane);
        var activeSelection = _lastActivePane == null ? null : GetSelectedPaneItem(_lastActivePane);
        var oppositePane = _lastActivePane == null
            ? null
            : ReferenceEquals(_lastActivePane, _leftPane) ? _rightPane : _leftPane;

        _moveRightButton.Enabled = leftSelection != null && _rightPane.CurrentPath != null;
        _moveLeftButton.Enabled = rightSelection != null && _leftPane.CurrentPath != null;
        _copyButton.Enabled = activeSelection != null && oppositePane?.CurrentPath != null;
        _deleteButton.Enabled = activeSelection != null;
        _backButton.Enabled = _lastActivePane?.CurrentPath != null;
    }

    private void CopyDirectory(string sourceDir, string destinationDir)
    {
        var directory = new DirectoryInfo(sourceDir);
        if (!directory.Exists)
        {
            throw new DirectoryNotFoundException($"Source directory '{sourceDir}' does not exist.");
        }

        Directory.CreateDirectory(destinationDir);

        foreach (var file in directory.GetFiles())
        {
            var targetFilePath = Path.Combine(destinationDir, file.Name);
            file.CopyTo(targetFilePath);
        }

        foreach (var dir in directory.GetDirectories())
        {
            var nextTargetDir = Path.Combine(destinationDir, dir.Name);
            CopyDirectory(dir.FullName, nextTargetDir);
        }
    }

    private static string GetItemName(string fullPath)
    {
        if (string.IsNullOrWhiteSpace(fullPath))
        {
            return string.Empty;
        }

        var trimmed = fullPath.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
        return Path.GetFileName(trimmed);
    }

    private void ShowError(string message)
    {
        MessageBox.Show(message, "Dual Pane Explorer", MessageBoxButtons.OK, MessageBoxIcon.Error);
    }

    private sealed class PaneContext
    {
        public PaneContext(string name, TextBox pathBox, ListView listView)
        {
            Name = name;
            PathBox = pathBox;
            ListView = listView;
        }

        public string Name { get; }
        public string? CurrentPath { get; set; }
        public TextBox PathBox { get; }
        public ListView ListView { get; }
    }

    private sealed class PaneItemInfo
    {
        public PaneItemInfo(PaneItemKind kind, string displayName, string? fullPath = null, bool isDirectory = false)
        {
            Kind = kind;
            DisplayName = displayName;
            FullPath = fullPath;
            IsDirectory = isDirectory;
        }

        public PaneItemKind Kind { get; }
        public string DisplayName { get; }
        public string? FullPath { get; }
        public bool IsDirectory { get; }
    }

    private enum PaneItemKind
    {
        Directory,
        File,
        Drive,
        ParentUp,
        RootDrives
    }
}
