using System;
using System.Collections.Generic;

namespace Lab6
{
    public delegate double MathOperation(double a, double b);

    public delegate void NotifyHandler(string message);

    public delegate bool IntFilter(int value);

    public delegate bool NumberFilter(int n);

    public delegate void TemperatureHandler(string msg, double temp);

    public delegate void ClickHandler(object sender, string buttonName);

    class Calculator
    {
        public static double Add(double a, double b)
        {
            return a + b;
        }

        public static double Subtract(double a, double b)
        {
            return a - b;
        }

        public static double Multiply(double a, double b)
        {
            return a * b;
        }

        public static double Divide(double a, double b)
        {
            return a / b;
        }
    }

    class NotificationSystem
    {
        public static void SendEmail(string message)
        {
            Console.WriteLine("Email sent: " + message);
        }

        public static void SendSMS(string message)
        {
            Console.WriteLine("SMS sent: " + message);
        }

        public static void LogToFile(string message)
        {
            Console.WriteLine("Logged: " + message);
        }
    }

    class ArrayOperations
    {
        public static int[] FilterArray(int[] array, IntFilter filter)
        {
            List<int> result = new List<int>();
            foreach (int item in array)
            {
                if (filter(item))
                {
                    result.Add(item);
                }
            }
            return result.ToArray();
        }

        public static bool IsEven(int n)
        {
            return n % 2 == 0;
        }

        public static bool IsOdd(int n)
        {
            return n % 2 != 0;
        }

        public static bool IsGreaterThan5(int n)
        {
            return n > 5;
        }
    }

    class Person
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public string Department { get; set; }

        public Person(string name, int age, string department)
        {
            Name = name;
            Age = age;
            Department = department;
        }
    }

    class TemperatureSensor
    {
        public event TemperatureHandler? TemperatureHigh;
        public event TemperatureHandler? TemperatureLow;

        public void SetTemperature(double temp)
        {
            if (temp > 30)
            {
                if (TemperatureHigh != null)
                {
                    TemperatureHigh("Warning!", temp);
                }
            }
            else if (temp < 10)
            {
                if (TemperatureLow != null)
                {
                    TemperatureLow("Cold Alert!", temp);
                }
            }
        }
    }

    class TemperatureMonitor
    {
        public void OnHighTemperature(string msg, double temp)
        {
            Console.WriteLine("Alert: " + temp + "°C - " + msg);
        }

        public void OnLowTemperature(string msg, double temp)
        {
            Console.WriteLine("Cold Warning: " + temp + "°C - " + msg);
        }
    }

    class Logger
    {
        public void LogTemp(string msg, double temp)
        {
            Console.WriteLine("Log Entry: Temperature " + temp + "°C - " + msg);
        }
    }

    class Button
    {
        public string ButtonName { get; set; }
        public event ClickHandler? Click;

        public Button(string name)
        {
            ButtonName = name;
        }

        public void PerformClick()
        {
            if (Click != null)
            {
                Click(this, ButtonName);
            }
        }
    }

    class ButtonHandler
    {
        public void OnClick(object sender, string name)
        {
            Console.WriteLine("Button clicked: " + name);
        }
    }

    class ClickLogger
    {
        public void LogClick(object sender, string name)
        {
            Console.WriteLine("Click logged for: " + name);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Task 1: Calculator Delegate");
            MathOperation operation = Calculator.Add;
            double result = operation(10, 5);
            Console.WriteLine("10 + 5 = " + result);

            operation = Calculator.Multiply;
            result = operation(10, 5);
            Console.WriteLine("10 * 5 = " + result);

            operation = Calculator.Divide;
            result = operation(10, 5);
            Console.WriteLine("10 / 5 = " + result);
            Console.WriteLine();

            Console.WriteLine("Task 2: Multicast Delegate");
            NotifyHandler notify = NotificationSystem.SendEmail;
            notify += NotificationSystem.SendSMS;
            notify += NotificationSystem.LogToFile;
            notify("order confirmed!");
            Console.WriteLine();


            notify -= NotificationSystem.SendSMS;
            notify("order shipped!");
            Console.WriteLine();

            Console.WriteLine("Task 3: Array Filter Delegate");
            int[] numbers = { -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
            int[] evens = ArrayOperations.FilterArray(numbers, ArrayOperations.IsEven);
            Console.Write("Evens: ");
            foreach (int n in evens)
            {
                Console.Write(n + " ");
            }
            Console.WriteLine();

            int[] odds = ArrayOperations.FilterArray(numbers, ArrayOperations.IsOdd);
            Console.Write("Odds: ");
            foreach (int n in odds)
            {
                Console.Write(n + " ");
            }
            Console.WriteLine();

            int[] big = ArrayOperations.FilterArray(numbers, ArrayOperations.IsGreaterThan5);
            Console.Write("Greater than 5: ");
            foreach (int n in big)
            {
                Console.Write(n + " ");
            }
            Console.WriteLine();
            Console.WriteLine();

            Console.WriteLine("Task 4: Anonymous Method");
            NumberFilter filter = delegate (int n)
            {
                return n % 2 == 0;
            };

            int[] nums = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
            int[] evenNumbers = ArrayOperations.FilterArray(nums, delegate (int n) { return n % 2 == 0; });
            Console.Write("Even numbers using anonymous method: ");
            foreach (int n in evenNumbers)
            {
                Console.Write(n + " ");
            }
            Console.WriteLine();
            Console.WriteLine();

            Console.WriteLine("Task 5: Lambda Expression Filter");
            List<int> numberList = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
            int first = numberList.Find(n => n > 5);
            Console.WriteLine("First number > 5: " + first);

            List<int> evensList = numberList.FindAll(n => n % 2 == 0);
            Console.Write("Evens using lambda: ");
            foreach (int n in evensList)
            {
                Console.Write(n + " ");
            }
            Console.WriteLine();

            bool hasNeg = numberList.Exists(n => n < 0);
            Console.WriteLine("Has negative numbers: " + hasNeg);
            Console.WriteLine();

            Console.WriteLine("Task 6: Lambda Sort");
            List<Person> people = new List<Person>();
            people.Add(new Person("Ahmed", 30, "IT"));
            people.Add(new Person("Sara", 25, "HR"));
            people.Add(new Person("Omar", 35, "IT"));
            people.Add(new Person("Fatima", 28, "HR"));

            people.Sort((a, b) => a.Age.CompareTo(b.Age));
            Console.WriteLine("Sorted by Age (ascending):");
            foreach (Person p in people)
            {
                Console.WriteLine(p.Name + " - " + p.Age);
            }
            Console.WriteLine();

            people.Sort((a, b) => b.Age.CompareTo(a.Age));
            Console.WriteLine("Sorted by Age (descending):");
            foreach (Person p in people)
            {
                Console.WriteLine(p.Name + " - " + p.Age);
            }
            Console.WriteLine();

            people.Sort((a, b) => a.Name.CompareTo(b.Name));
            Console.WriteLine("Sorted by Name:");
            foreach (Person p in people)
            {
                Console.WriteLine(p.Name + " - " + p.Age);
            }
            Console.WriteLine();

            Console.WriteLine("Task 7: Temperature Monitor Events");
            TemperatureSensor sensor = new TemperatureSensor();
            TemperatureMonitor monitor = new TemperatureMonitor();
            Logger logger = new Logger();

            sensor.TemperatureHigh += monitor.OnHighTemperature;
            sensor.TemperatureHigh += logger.LogTemp;
            sensor.TemperatureLow += monitor.OnLowTemperature;

            sensor.SetTemperature(35);
            Console.WriteLine();
            sensor.SetTemperature(5);
            Console.WriteLine();
            sensor.SetTemperature(20);
            Console.WriteLine();

            Console.WriteLine("Task 8: Button Click Events");
            Button button = new Button("Submit");
            ButtonHandler handler = new ButtonHandler();
            ClickLogger clickLogger = new ClickLogger();

            button.Click += handler.OnClick;
            button.Click += clickLogger.LogClick;
            button.Click += (sender, name) => Console.WriteLine("Lambda handler: " + name + " was pressed");

            button.PerformClick();
            Console.WriteLine();

            button.Click -= handler.OnClick;
            Console.WriteLine("After removing handler:");
            button.PerformClick();

            Console.ReadLine();
        }
    }
}
