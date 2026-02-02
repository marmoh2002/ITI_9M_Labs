using System;
using System.Collections.Generic;

namespace Lecture04Tasks
{
    //task 1
    class Date
    {
        public int Day;
        public int Month;
        public int Year;

        public Date() : this(1990, 1, 1)
        {
        }

        public Date(int year) : this(year, 1, 1)
        {
        }

        public Date(int year, int month) : this(year, month, 1)
        {
        }

        public Date(int year, int month, int day)
        {
            this.Year = year;
            this.Month = month;
            this.Day = day;
        }

        public void Display()
        {
            Console.WriteLine(Day + "/" + Month + "/" + Year);
        }
    }

    //task 2
    class Counter
    {
        public static int totalObjectsCreated;
        public int instanceId;

        static Counter()
        {
            totalObjectsCreated = 0;
            Console.WriteLine("Static constructor called!");
        }

        public Counter()
        {
            totalObjectsCreated = totalObjectsCreated + 1;
            instanceId = totalObjectsCreated;
        }

        public void DisplayInfo()
        {
            Console.WriteLine("Instance ID: " + instanceId);
            Console.WriteLine("Total Objects Created: " + totalObjectsCreated);
        }
    }

    // task 3
    class Employee
    {
        protected int id;
        protected string name;
        protected double baseSalary;

        public Employee(int id, string name, double baseSalary)
        {
            this.id = id;
            this.name = name;
            this.baseSalary = baseSalary;
        }

        public virtual void DisplayInfo()
        {
            Console.WriteLine("ID: " + id);
            Console.WriteLine("Name: " + name);
            Console.WriteLine("Base Salary: " + baseSalary);
        }

        public virtual double CalculateSalary()
        {
            return baseSalary;
        }
    }

    class Manager : Employee
    {
        private double bonus;
        private int teamSize;

        public Manager(int id, string name, double baseSalary, double bonus, int teamSize) : base(id, name, baseSalary)
        {
            this.bonus = bonus;
            this.teamSize = teamSize;
        }

        public override double CalculateSalary()
        {
            return baseSalary + bonus;
        }

        public void DisplayManagerInfo()
        {
            DisplayInfo();
            Console.WriteLine("Bonus: " + bonus);
            Console.WriteLine("Team Size: " + teamSize);
            Console.WriteLine("Total Salary: " + CalculateSalary());
        }
    }

    class Developer : Employee
    {
        private string language;
        private int projects;

        public Developer(int id, string name, double baseSalary, string language, int projects) : base(id, name, baseSalary)
        {
            this.language = language;
            this.projects = projects;
        }

        public override double CalculateSalary()
        {
            return baseSalary + (projects * 100);
        }

        public void DisplayDeveloperInfo()
        {
            DisplayInfo();
            Console.WriteLine("Language: " + language);
            Console.WriteLine("Projects: " + projects);
            Console.WriteLine("Total Salary: " + CalculateSalary());
        }
    }

    class Intern : Employee
    {
        private string university;
        private int duration;

        public Intern(int id, string name, double baseSalary, string university, int duration) : base(id, name, baseSalary)
        {
            this.university = university;
            this.duration = duration;
        }

        public void DisplayInternInfo()
        {
            DisplayInfo();
            Console.WriteLine("University: " + university);
            Console.WriteLine("Duration (months): " + duration);
        }
    }

    // task 4
    class Shape
    {
        public virtual double CalculateArea()
        {
            return 0;
        }

        public virtual double CalculatePerimeter()
        {
            return 0;
        }
    }

    class Circle : Shape
    {
        private double radius;

        public Circle(double radius)
        {
            this.radius = radius;
        }

        public override double CalculateArea()
        {
            return 3.14 * radius * radius;
        }

        public override double CalculatePerimeter()
        {
            return 2 * 3.14 * radius;
        }
    }

    class Rectangle : Shape
    {
        private double width;
        private double height;

        public Rectangle(double width, double height)
        {
            this.width = width;
            this.height = height;
        }

        public override double CalculateArea()
        {
            return width * height;
        }

        public override double CalculatePerimeter()
        {
            return 2 * (width + height);
        }
    }

    class Triangle : Shape
    {
        private double a;
        private double b;
        private double c;

        public Triangle(double a, double b, double c)
        {
            this.a = a;
            this.b = b;
            this.c = c;
        }

        public override double CalculateArea()
        {
            double s = (a + b + c) / 2;
            return Math.Sqrt(s * (s - a) * (s - b) * (s - c));
        }

        public override double CalculatePerimeter()
        {
            return a + b + c;
        }
    }

    //task 5
    abstract class Animal
    {
        public abstract void MakeSound();
        public abstract void Move();

        public void Sleep()
        {
            Console.WriteLine("Sleeping...");
        }
    }

    class Dog : Animal
    {
        public override void MakeSound()
        {
            Console.WriteLine("Woof! Woof!");
        }

        public override void Move()
        {
            Console.WriteLine("Running on four legs!");
        }
    }

    class Cat : Animal
    {
        public override void MakeSound()
        {
            Console.WriteLine("Meow! Meow!");
        }

        public override void Move()
        {
            Console.WriteLine("Walking silently!");
        }
    }

    class Bird : Animal
    {
        public override void MakeSound()
        {
            Console.WriteLine("Tweet! Tweet!");
        }

        public override void Move()
        {
            Console.WriteLine("Flying in the sky!");
        }
    }

    // task 6
    interface IMovable
    {
        void Move();
        void Stop();
        int GetSpeed();
    }

    interface IChargeable
    {
        void Charge();
        int GetBatteryLevel();
    }

    class Car : IMovable
    {
        private int speed;

        public void Move()
        {
            speed = 60;
            Console.WriteLine("Car is moving at " + speed + " km/h");
        }

        public void Stop()
        {
            speed = 0;
            Console.WriteLine("Car stopped");
        }

        public int GetSpeed()
        {
            return speed;
        }
    }

    class Robot : IMovable, IChargeable
    {
        private int speed;
        private int battery;

        public Robot()
        {
            battery = 100;
        }

        public void Move()
        {
            if (battery > 0)
            {
                speed = 10;
                battery = battery - 5;
                Console.WriteLine("Robot walking at " + speed + " km/h");
            }
            else
            {
                Console.WriteLine("Battery low! Cannot move.");
            }
        }

        public void Stop()
        {
            speed = 0;
            Console.WriteLine("Robot halted");
        }

        public int GetSpeed()
        {
            return speed;
        }

        public void Charge()
        {
            battery = 100;
            Console.WriteLine("Robot fully charged!");
        }

        public int GetBatteryLevel()
        {
            return battery;
        }
    }

    //task 7
    class Student
    {
        private int age;
        private string name;
        private double gpa;

        public int Age
        {
            get
            {
                return age;
            }
            set
            {
                if (value >= 16 && value <= 100)
                {
                    age = value;
                }
                else
                {
                    Console.WriteLine("Invalid age! Must be between 16 and 100.");
                }
            }
        }

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public double GPA
        {
            get
            {
                return gpa;
            }
            set
            {
                if (value >= 0 && value <= 4.0)
                {
                    gpa = value;
                }
                else
                {
                    Console.WriteLine("Invalid GPA! Must be between 0 and 4.0.");
                }
            }
        }

        public void DisplayInfo()
        {
            Console.WriteLine("Name: " + Name);
            Console.WriteLine("Age: " + Age);
            Console.WriteLine("GPA: " + GPA);
        }
    }

    // task 8
    interface IPrintable
    {
        void PrintDetails();
    }

    interface ITransactable
    {
        void Deposit(double amount);
        bool Withdraw(double amount);
    }

    abstract class Account : IPrintable, ITransactable
    {
        protected string accountNumber;
        protected double balance;
        protected string ownerName;

        public string AccountNumber
        {
            get { return accountNumber; }
        }

        public double Balance
        {
            get { return balance; }
        }

        public string OwnerName
        {
            get { return ownerName; }
            set { ownerName = value; }
        }

        public Account(string ownerName, double initialBalance)
        {
            this.ownerName = ownerName;
            this.balance = initialBalance;
            Random r = new Random();
            this.accountNumber = "ACC" + r.Next(1000, 9999);
        }

        public abstract double CalculateInterest();

        public virtual void Deposit(double amount)
        {
            if (amount > 0)
            {
                balance = balance + amount;
                Console.WriteLine("Deposited: " + amount + ". New balance: " + balance);
            }
        }

        public virtual bool Withdraw(double amount)
        {
            if (amount > 0 && amount <= balance)
            {
                balance = balance - amount;
                Console.WriteLine("Withdrew: " + amount + ". New balance: " + balance);
                return true;
            }
            Console.WriteLine("Insufficient funds!");
            return false;
        }

        public void PrintDetails()
        {
            Console.WriteLine("Account Number: " + accountNumber);
            Console.WriteLine("Owner: " + ownerName);
            Console.WriteLine("Balance: " + balance);
        }
    }

    class SavingsAccount : Account
    {
        private double interestRate;
        private double minimumBalance;

        public SavingsAccount(string ownerName, double initialBalance, double interestRate) : base(ownerName, initialBalance)
        {
            this.interestRate = interestRate;
            this.minimumBalance = 500;
        }

        public override double CalculateInterest()
        {
            return balance * (interestRate / 100);
        }

        public void ApplyInterest()
        {
            double interest = CalculateInterest();
            balance = balance + interest;
            Console.WriteLine("Interest applied: " + interest + ". New balance: " + balance);
        }

        public override bool Withdraw(double amount)
        {
            if (balance - amount >= minimumBalance)
            {
                balance = balance - amount;
                Console.WriteLine("Withdrew: " + amount + ". New balance: " + balance);
                return true;
            }
            else
            {
                Console.WriteLine("Cannot withdraw! Minimum balance of " + minimumBalance + " required.");
                return false;
            }
        }
    }

    class CheckingAccount : Account
    {
        private double overdraftLimit;
        private int freeTransactions;
        private int transactionCount;

        public CheckingAccount(string ownerName, double initialBalance, double overdraftLimit) : base(ownerName, initialBalance)
        {
            this.overdraftLimit = overdraftLimit;
            this.freeTransactions = 5;
            this.transactionCount = 0;
        }

        public override double CalculateInterest()
        {
            return 0;
        }

        public override bool Withdraw(double amount)
        {
            transactionCount++;
            if (balance + overdraftLimit >= amount)
            {
                balance = balance - amount;
                if (transactionCount > freeTransactions)
                {
                    balance = balance - 2;
                    Console.WriteLine("Transaction fee: 2");
                }
                Console.WriteLine("Withdrew: " + amount + ". New balance: " + balance);
                return true;
            }
            else
            {
                Console.WriteLine("Cannot withdraw! Overdraft limit exceeded.");
                return false;
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== Task 1: Date Class ===");
            Date d1 = new Date();
            Date d2 = new Date(2024);
            Date d3 = new Date(2024, 6);
            Date d4 = new Date(2024, 6, 15);
            d1.Display();
            d2.Display();
            d3.Display();
            d4.Display();

            Console.WriteLine("\n=== Task 2: Counter ===");
            Counter c1 = new Counter();
            Counter c2 = new Counter();
            Counter c3 = new Counter();
            c1.DisplayInfo();
            c2.DisplayInfo();
            c3.DisplayInfo();

            Console.WriteLine("\n=== Task 3: Employee System ===");
            Manager mgr = new Manager(101, "Ahmed", 8000, 2000, 5);
            mgr.DisplayManagerInfo();
            Console.WriteLine();
            Developer dev = new Developer(102, "Sara", 7000, "C#", 3);
            dev.DisplayDeveloperInfo();

            Console.WriteLine("\n=== Task 4: Shapes ===");
            Shape[] shapes = new Shape[3];
            shapes[0] = new Circle(5);
            shapes[1] = new Rectangle(4, 6);
            shapes[2] = new Triangle(3, 4, 5);
            for (int i = 0; i < shapes.Length; i++)
            {
                Console.WriteLine("Area: " + shapes[i].CalculateArea());
                Console.WriteLine("Perimeter: " + shapes[i].CalculatePerimeter());
                Console.WriteLine();
            }

            Console.WriteLine("=== Task 5: Animals ===");
            Dog dog = new Dog();
            dog.MakeSound();
            dog.Move();
            dog.Sleep();
            Console.WriteLine();
            Cat cat = new Cat();
            cat.MakeSound();
            cat.Move();

            Console.WriteLine("\n=== Task 6: IMovable ===");
            Car car = new Car();
            car.Move();
            Console.WriteLine("Speed: " + car.GetSpeed());
            car.Stop();
            Console.WriteLine();
            Robot robot = new Robot();
            robot.Move();
            Console.WriteLine("Battery: " + robot.GetBatteryLevel() + "%");

            Console.WriteLine("\n=== Task 7: Student ===");
            Student student = new Student();
            student.Name = "Ali";
            student.Age = 20;
            student.GPA = 3.5;
            student.DisplayInfo();
            student.Age = 10;

            Console.WriteLine("\n=== Task 8: Bank System ===");
            SavingsAccount savings = new SavingsAccount("Ahmed", 1000, 5);
            savings.PrintDetails();
            savings.Deposit(500);
            savings.ApplyInterest();
            savings.Withdraw(200);
            Console.WriteLine();
            CheckingAccount checking = new CheckingAccount("Fatima", 2000, 500);
            checking.PrintDetails();
            checking.Withdraw(100);
            checking.Withdraw(2300);

            Console.ReadLine();
        }
    }
}