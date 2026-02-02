using System;
using System.Linq;

namespace Lec3Tasks
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("LAB3\n");

            Task1_ArrayRotation();
            Task2_SpiralMatrix();
            Task3_PascalsTriangle();
            Task4_SortingAlgorithms();
            Task5_VarLimitations();
            Task6_BankAccountSystem();
            Task7_ArrayUtilityClass();
            Task8_WordFrequencyCounter();

            Console.WriteLine("\nAll tasks completed. Press any key to exit.");
            Console.ReadKey();
        }

        static void Task1_ArrayRotation()
        {
            Console.WriteLine("=== TASK 1: ARRAY ROTATION ===\n");

            int[] arr = { 1, 2, 3, 4, 5 };
            int k = 2;

            Console.WriteLine("Original Array: [" + string.Join(", ", arr) + "]");
            Console.WriteLine($"Rotation Count (K): {k}");

            RotateArray(arr, k);

            Console.WriteLine("After Rotation: [" + string.Join(", ", arr) + "]");
            Console.WriteLine();
        }

        static void RotateArray(int[] arr, int k)
        {
            int n = arr.Length;
            k %= n;

            if (k == 0) return;

            Reverse(arr, 0, n - 1);
            Reverse(arr, 0, k - 1);
            Reverse(arr, k, n - 1);
        }

        static void Reverse(int[] arr, int start, int end)
        {
            while (start < end)
            {
                int temp = arr[start];
                arr[start] = arr[end];
                arr[end] = temp;
                start++;
                end--;
            }
        }

        static void Task2_SpiralMatrix()
        {
            Console.WriteLine("=== TASK 2: SPIRAL MATRIX ===\n");

            Console.Write("Enter N (size of matrix): ");
            int n = int.Parse(Console.ReadLine());

            int[,] matrix = CreateSpiralMatrix(n);

            Console.WriteLine("\nSpiral Matrix:");
            for (int i = 0; i < n; i++)
            {
                for (int j = 0; j < n; j++)
                {
                    Console.Write($"{matrix[i, j],4} ");
                }
                Console.WriteLine();
            }
            Console.WriteLine();
        }

        static int[,] CreateSpiralMatrix(int n)
        {
            int[,] matrix = new int[n, n];
            int top = 0, bottom = n - 1, left = 0, right = n - 1;
            int num = 1;

            while (top <= bottom && left <= right)
            {
                for (int i = left; i <= right; i++)
                    matrix[top, i] = num++;
                top++;

                for (int i = top; i <= bottom; i++)
                    matrix[i, right] = num++;
                right--;

                if (top <= bottom)
                {
                    for (int i = right; i >= left; i--)
                        matrix[bottom, i] = num++;
                    bottom--;
                }

                if (left <= right)
                {
                    for (int i = bottom; i >= top; i--)
                        matrix[i, left] = num++;
                    left++;
                }
            }
            return matrix;
        }

        static void Task3_PascalsTriangle()
        {
            Console.WriteLine("=== TASK 3: PASCAL'S TRIANGLE ===\n");

            Console.Write("Enter number of rows: ");
            int n = int.Parse(Console.ReadLine());

            int[][] triangle = GeneratePascalsTriangle(n);

            Console.WriteLine("\nPascal's Triangle:");
            for (int i = 0; i < n; i++)
            {
                for (int space = 0; space < n - i; space++)
                    Console.Write(" ");

                for (int j = 0; j < triangle[i].Length; j++)
                    Console.Write(triangle[i][j] + " ");

                Console.WriteLine();
            }
            Console.WriteLine();
        }

        static int[][] GeneratePascalsTriangle(int n)
        {
            int[][] triangle = new int[n][];

            for (int i = 0; i < n; i++)
            {
                triangle[i] = new int[i + 1];
                triangle[i][0] = 1;
                triangle[i][i] = 1;

                for (int j = 1; j < i; j++)
                {
                    triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
                }
            }

            return triangle;
        }

        static void Task4_SortingAlgorithms()
        {
            Console.WriteLine("=== TASK 4: SORTING ALGORITHMS ===\n");

            int[] original = { 64, 34, 25, 12, 22, 11, 90 };

            int[] arr1 = (int[])original.Clone();
            Console.WriteLine("Original Array: [" + string.Join(", ", arr1) + "]");

            BubbleSort(arr1);
            Console.WriteLine("Bubble Sort:    [" + string.Join(", ", arr1) + "]");

            int[] arr2 = (int[])original.Clone();
            SelectionSort(arr2);
            Console.WriteLine("Selection Sort: [" + string.Join(", ", arr2) + "]");

            int[] arr3 = (int[])original.Clone();
            Array.Sort(arr3);
            Console.WriteLine("Array.Sort():   [" + string.Join(", ", arr3) + "]");
            Console.WriteLine();
        }

        static void BubbleSort(int[] arr)
        {
            int n = arr.Length;

            for (int i = 0; i < n - 1; i++)
            {
                for (int j = 0; j < n - i - 1; j++)
                {
                    if (arr[j] > arr[j + 1])
                    {
                        int temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
        }

        static void SelectionSort(int[] arr)
        {
            int n = arr.Length;

            for (int i = 0; i < n - 1; i++)
            {
                int minIndex = i;

                for (int j = i + 1; j < n; j++)
                {
                    if (arr[j] < arr[minIndex])
                    {
                        minIndex = j;
                    }
                }

                if (minIndex != i)
                {
                    int temp = arr[i];
                    arr[i] = arr[minIndex];
                    arr[minIndex] = temp;
                }
            }
        }

        static void Task5_VarLimitations()
        {
            Console.WriteLine("=== TASK 5: VAR LIMITATIONS ===\n");

            Console.WriteLine("✓ WHAT WORKS:");
            var number = 10;
            Console.WriteLine($"var number = 10; → Type: {number.GetType().Name}");

            var name = "Ahmed";
            Console.WriteLine($"var name = \"Ahmed\"; → Type: {name.GetType().Name}");

            var prices = new[] { 1, 2, 3 };
            Console.WriteLine($"var prices = new[] {{1,2,3}}; → Type: {prices.GetType().Name}");

            Console.WriteLine("\n✗ WHAT DOES NOT WORK (shown as comments):\n");

            Console.WriteLine("1. MUST INITIALIZE IMMEDIATELY");
            Console.WriteLine("   ✗ var x;           // Error: Must initialize!");
            Console.WriteLine("   ✓ var x = 10;      // OK");

            Console.WriteLine("\n2. CANNOT BE NULL");
            Console.WriteLine("   ✗ var y = null;    // Error: Cannot infer type!");
            Console.WriteLine("   ✓ string y = null; // OK with explicit type");

            Console.WriteLine("\n3. CANNOT USE AS CLASS FIELD");
            Console.WriteLine("   class MyClass {");
            Console.WriteLine("       ✗ var field = 10;  // Error!");
            Console.WriteLine("       ✓ int field = 10;  // OK");
            Console.WriteLine("   }");

            Console.WriteLine("\n4. CANNOT USE IN OWN INITIALIZATION");
            Console.WriteLine("   ✗ var i = i + 1;   // Error: i doesn't exist yet!");
            Console.WriteLine("   ✓ int i = 0;");
            Console.WriteLine("     i = i + 1;       // OK");

            Console.WriteLine("\n5. CANNOT DECLARE MULTIPLE");
            Console.WriteLine("   ✗ var a = 1, b = 2; // Error!");
            Console.WriteLine("   ✓ var a = 1;");
            Console.WriteLine("     var b = 2;        // OK");

            Console.WriteLine("\n6. CANNOT USE AS RETURN TYPE");
            Console.WriteLine("   ✗ static var GetValue() { } // Error!");
            Console.WriteLine("   ✓ static int GetValue() { } // OK");
            Console.WriteLine();
        }

        static void Task6_BankAccountSystem()
        {
            Console.WriteLine("=== TASK 6: BANK ACCOUNT SYSTEM ===\n");

            BankAccount account1 = new BankAccount("ACC001", "Ahmed", 5000);
            BankAccount account2 = new BankAccount("ACC002", "Sara", 3000);

            Console.WriteLine("Initial State:");
            account1.DisplayInfo();
            account2.DisplayInfo();

            Console.WriteLine("\n--- Operations ---");

            Console.WriteLine("\nAhmed deposits $1,000");
            account1.Deposit(1000);
            account1.DisplayInfo();

            Console.WriteLine("\nAhmed withdraws $500");
            account1.Withdraw(500);
            account1.DisplayInfo();

            Console.WriteLine("\nAhmed transfers $2,000 to Sara");
            account1.Transfer(account2, 2000);

            Console.WriteLine("\nFinal State:");
            account1.DisplayInfo();
            account2.DisplayInfo();

            Console.WriteLine("\n--- Reference Type Demonstration ---");
            Console.WriteLine("Adding bonus to Ahmed's account through a method...");
            AddBonus(account1, 500);
            account1.DisplayInfo();
            Console.WriteLine("Notice: The original account was modified!");
            Console.WriteLine();
        }

        static void AddBonus(BankAccount account, decimal bonus)
        {
            account.Deposit(bonus);
            Console.WriteLine($"Bonus of ${bonus} added!");
        }

        static void Task7_ArrayUtilityClass()
        {
            Console.WriteLine("=== TASK 7: ARRAY UTILITY CLASS ===\n");

            int[] arr = { 5, 2, 8, 1, 9 };
            Console.WriteLine("Original Array: [" + string.Join(", ", arr) + "]");

            Console.WriteLine($"\nArrayUtils.FindMax(arr) → {ArrayUtils.FindMax(arr)}");
            Console.WriteLine($"ArrayUtils.FindMin(arr) → {ArrayUtils.FindMin(arr)}");
            Console.WriteLine($"ArrayUtils.IsSorted(arr) → {ArrayUtils.IsSorted(arr)}");

            ArrayUtils.Reverse(arr);
            Console.WriteLine($"ArrayUtils.Reverse(arr) → [" + string.Join(", ", arr) + "]");

            int[] arr2 = { 1, 2, 2, 3, 2, 4 };
            Console.WriteLine($"\nArray: [" + string.Join(", ", arr2) + "]");
            Console.WriteLine($"ArrayUtils.CountOccurrences(arr2, 2) → {ArrayUtils.CountOccurrences(arr2, 2)}");

            int[] sorted1 = { 1, 3, 5, 7 };
            int[] sorted2 = { 2, 4, 6 };
            int[] merged = ArrayUtils.Merge(sorted1, sorted2);
            Console.WriteLine($"\nMerge [1,3,5,7] and [2,4,6]:");
            Console.WriteLine($"Result: [" + string.Join(", ", merged) + "]");
            Console.WriteLine();
        }

        static void Task8_WordFrequencyCounter()
        {
            Console.WriteLine("=== TASK 8: WORD FREQUENCY COUNTER ===\n");

            string sentence = "The cat and the dog and the bird";
            Console.WriteLine($"Input: \"{sentence}\"\n");

            CountWordFrequency(sentence);
            Console.WriteLine();
        }

        static void CountWordFrequency(string sentence)
        {
            string lowerSentence = sentence.ToLower();
            string[] words = lowerSentence.Split(new char[] { ' ', ',', '.', '!', '?', ';', ':' },
                                                  StringSplitOptions.RemoveEmptyEntries);

            WordClass[] results = new WordClass[words.Length];
            int distinctCount = 0;

            foreach (string word in words)
            {
                bool found = false;

                for (int i = 0; i < distinctCount; i++)
                {
                    if (string.Compare(results[i].Word, word) == 0)
                    {
                        results[i].Count++;
                        found = true;
                        break;
                    }
                }

                if (!found)
                {
                    results[distinctCount] = new WordClass();
                    results[distinctCount].Word = word;
                    results[distinctCount].Count = 1;
                    distinctCount++;
                }
            }

            for (int i = 0; i < distinctCount - 1; i++)
            {
                for (int j = 0; j < distinctCount - i - 1; j++)
                {
                    if (results[j].Count < results[j + 1].Count)
                    {
                        WordClass temp = results[j];
                        results[j] = results[j + 1];
                        results[j + 1] = temp;
                    }
                }
            }

            Console.WriteLine("Word Frequency (sorted by count):");
            for (int i = 0; i < distinctCount; i++)
            {
                Console.WriteLine($"{results[i].Word} - {results[i].Count}");
            }
        }
    }

    class WordClass
    {
        public string Word { get; set; }
        public int Count { get; set; }

        public WordClass()
        {
            Word = "";
            Count = 0;
        }
    }

    class BankAccount
    {
        private string accountNumber;
        private string ownerName;
        private decimal balance;

        public BankAccount(string accountNumber, string ownerName, decimal initialBalance)
        {
            this.accountNumber = accountNumber;
            this.ownerName = ownerName;
            this.balance = initialBalance;
        }

        public void Deposit(decimal amount)
        {
            if (amount > 0)
            {
                balance += amount;
                Console.WriteLine($"Deposited ${amount}. New balance: ${balance}");
            }
            else
            {
                Console.WriteLine("Deposit amount must be positive!");
            }
        }

        public void Withdraw(decimal amount)
        {
            if (amount > 0 && amount <= balance)
            {
                balance -= amount;
                Console.WriteLine($"Withdrew ${amount}. New balance: ${balance}");
            }
            else if (amount > balance)
            {
                Console.WriteLine("Insufficient funds!");
            }
            else
            {
                Console.WriteLine("Withdrawal amount must be positive!");
            }
        }

        public void Transfer(BankAccount targetAccount, decimal amount)
        {
            if (amount > 0 && amount <= balance)
            {
                this.balance -= amount;
                targetAccount.balance += amount;
                Console.WriteLine($"Transferred ${amount} to {targetAccount.ownerName}");
            }
            else if (amount > balance)
            {
                Console.WriteLine("Insufficient funds for transfer!");
            }
            else
            {
                Console.WriteLine("Transfer amount must be positive!");
            }
        }

        public decimal GetBalance()
        {
            return balance;
        }

        public void DisplayInfo()
        {
            Console.WriteLine($"Account: {accountNumber} | Owner: {ownerName} | Balance: ${balance}");
        }
    }

    static class ArrayUtils
    {
        public static void Reverse(int[] arr)
        {
            int left = 0;
            int right = arr.Length - 1;

            while (left < right)
            {
                int temp = arr[left];
                arr[left] = arr[right];
                arr[right] = temp;

                left++;
                right--;
            }
        }

        public static int FindMax(int[] arr)
        {
            if (arr.Length == 0)
                throw new ArgumentException("Array cannot be empty");

            int max = arr[0];
            for (int i = 1; i < arr.Length; i++)
            {
                if (arr[i] > max)
                {
                    max = arr[i];
                }
            }
            return max;
        }

        public static int FindMin(int[] arr)
        {
            if (arr.Length == 0)
                throw new ArgumentException("Array cannot be empty");

            int min = arr[0];
            for (int i = 1; i < arr.Length; i++)
            {
                if (arr[i] < min)
                {
                    min = arr[i];
                }
            }
            return min;
        }

        public static bool IsSorted(int[] arr)
        {
            for (int i = 0; i < arr.Length - 1; i++)
            {
                if (arr[i] > arr[i + 1])
                {
                    return false;
                }
            }
            return true;
        }

        public static int CountOccurrences(int[] arr, int value)
        {
            int count = 0;
            foreach (int num in arr)
            {
                if (num == value)
                {
                    count++;
                }
            }
            return count;
        }

        public static int[] Merge(int[] arr1, int[] arr2)
        {
            int[] result = new int[arr1.Length + arr2.Length];
            int i = 0, j = 0, k = 0;

            while (i < arr1.Length && j < arr2.Length)
            {
                if (arr1[i] <= arr2[j])
                {
                    result[k++] = arr1[i++];
                }
                else
                {
                    result[k++] = arr2[j++];
                }
            }

            while (i < arr1.Length)
            {
                result[k++] = arr1[i++];
            }

            while (j < arr2.Length)
            {
                result[k++] = arr2[j++];
            }

            return result;
        }
    }
}