using System;
using System.Collections;
using System.Collections.Generic;

namespace Lecture5Tasks
{
    class Person
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public int Age { get; set; }
        public string? City { get; set; }

        public void Display()
        {
            Console.WriteLine($"{FirstName} {LastName}, Age: {Age}, City: {City}");
        }
    }

    class Rectangle
    {
        public double Width { get; set; }
        public double Height { get; set; }
        public string Color { get; set; } = "White";
        public string Unit { get; set; } = "cm";
        public int Id { get; }
        public double Area => Width * Height;

        public Rectangle()
        {
            Id = new Random().Next(1000, 9999);
        }

        public void ShowInfo()
        {
            Console.WriteLine($"Rectangle ID: {Id}");
            Console.WriteLine($"Dimensions: {Width} x {Height} {Unit}");
            Console.WriteLine($"Color: {Color}");
            Console.WriteLine($"Area: {Area} {Unit}²");
        }
    }

    class Gradebook
    {
        private double[] grades;

        public Gradebook(int size)
        {
            grades = new double[size];
        }

        public double this[int index]
        {
            get
            {
                if (index >= 0 && index < grades.Length)
                    return grades[index];
                else
                    return -1;
            }
            set
            {
                if (index >= 0 && index < grades.Length)
                    grades[index] = value;
            }
        }

        public void ShowAllGrades()
        {
            for (int i = 0; i < grades.Length; i++)
            {
                Console.WriteLine($"Grade {i}: {grades[i]}");
            }
        }
    }

    class StringCollection
    {
        private string?[] items;
        private int count;

        public StringCollection(int size)
        {
            items = new string?[size];
            count = 0;
        }

        public string? this[int index]
        {
            get
            {
                if (index >= 0 && index < count)
                    return items[index];
                return null;
            }
            set
            {
                if (index >= 0 && index < items.Length)
                {
                    items[index] = value;
                    if (index >= count)
                        count = index + 1;
                }
            }
        }

        public string? this[string key]
        {
            get
            {
                for (int i = 0; i < count; i++)
                {
                    string? currentItem = items[i];

                    if (currentItem != null && currentItem.StartsWith(key + ":"))
                    {
                        string[] parts = currentItem.Split(':');
                        if (parts.Length > 1)
                            return parts[1];
                    }
                }
                return null;
            }
            set
            {
                for (int i = 0; i < count; i++)
                {
                    string? currentItem = items[i];

                    if (currentItem != null && currentItem.StartsWith(key + ":"))
                    {
                        items[i] = key + ":" + value;
                        return;
                    }
                }
                if (count < items.Length)
                {
                    items[count] = key + ":" + value;
                    count++;
                }
            }
        }
        public void Display()
        {
            for (int i = 0; i < count; i++)
            {
                if (items[i] != null)
                    Console.WriteLine($"[{i}]: {items[i]}");
            }
        }
    }

    class ShoppingCart
    {
        private ArrayList cart;

        public ShoppingCart()
        {
            cart = new ArrayList();
        }

        public void AddItem(object item)
        {
            cart.Add(item);
        }

        public void RemoveItem(object item)
        {
            cart.Remove(item);
        }

        public void ShowCart()
        {
            Console.WriteLine($"Cart has {cart.Count} items:");
            for (int i = 0; i < cart.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {cart[i]}");
            }
        }

        public void SortCart()
        {
            cart.Sort();
        }

        public void ReverseCart()
        {
            cart.Reverse();
        }
    }

    class Student
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public double GPA { get; set; }

        public void Display()
        {
            Console.WriteLine($"ID: {Id}, Name: {Name}, GPA: {GPA}");
        }
    }

    class Calculator
    {
        public double Divide(double a, double b)
        {
            if (b == 0)
                throw new DivideByZeroException("Cannot divide by zero!");
            return a / b;
        }

        public int ParseNumber(string input)
        {
            if (string.IsNullOrEmpty(input))
                throw new FormatException("Input cannot be empty!");
            return int.Parse(input);
        }

        public double Add(double a, double b)
        {
            return a + b;
        }

        public double Subtract(double a, double b)
        {
            return a - b;
        }
    }

    class Resource
    {
        private string fileName;
        private bool isOpen;

        public Resource(string name)
        {
            fileName = name;
            isOpen = false;
        }

        public void Open()
        {
            Console.WriteLine($"Opening {fileName}...");
            isOpen = true;
        }

        public string Read()
        {
            if (!isOpen)
                throw new Exception("File is not open!");
            return "Sample data from file";
        }

        public void Close()
        {
            if (isOpen)
            {
                Console.WriteLine($"Closing {fileName}...");
                isOpen = false;
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("  Task 1: Person Object Initializer  ");
            var person1 = new Person
            {
                FirstName = "Ahmed",
                LastName = "Hassan",
                Age = 25,
                City = "Cairo"
            };
            person1.Display();

            var person2 = new Person
            {
                FirstName = "Sara",
                LastName = "Ali",
                Age = 22,
                City = "Alexandria"
            };
            person2.Display();
            Console.WriteLine();

            Console.WriteLine("  Task 2: Rectangle with Auto Properties  ");
            var rect1 = new Rectangle
            {
                Width = 10.5,
                Height = 5.2
            };
            rect1.ShowInfo();
            Console.WriteLine();

            var rect2 = new Rectangle
            {
                Width = 8.0,
                Height = 6.0,
                Color = "Blue",
                Unit = "mm"
            };
            rect2.ShowInfo();
            Console.WriteLine();

            Console.WriteLine("  Task 3: Student Gradebook Indexer  ");
            Gradebook grades = new Gradebook(5);
            grades[0] = 95;
            grades[1] = 88;
            grades[2] = 72;
            grades[3] = 91;
            grades[4] = 85;

            Console.WriteLine($"Math Grade: {grades[0]}");
            Console.WriteLine($"Science Grade: {grades[1]}");
            grades.ShowAllGrades();
            Console.WriteLine();

            Console.WriteLine("  Task 4: String Collection Indexer  ");
            StringCollection config = new StringCollection(10);
            config["server"] = "localhost";
            config["port"] = "8080";
            config["database"] = "mydb";

            Console.WriteLine($"Server: {config["server"]}");
            Console.WriteLine($"Port: {config["port"]}");
            config.Display();
            Console.WriteLine();

            Console.WriteLine("  Task 5: Shopping Cart with ArrayList  ");
            ShoppingCart cart = new ShoppingCart();
            cart.AddItem("Laptop");
            cart.AddItem(1299.99);
            cart.AddItem("Mouse");
            cart.AddItem(25.50);
            cart.ShowCart();

            cart.RemoveItem("Mouse");
            Console.WriteLine("\nAfter removing Mouse:");
            cart.ShowCart();
            Console.WriteLine();

            Console.WriteLine("  Task 6: Generic Student List  ");
            var students = new List<Student>
            {
                new Student { Id = 1, Name = "Ahmed", GPA = 3.5 },
                new Student { Id = 2, Name = "Sara", GPA = 3.8 },
                new Student { Id = 3, Name = "Omar", GPA = 3.2 },
                new Student { Id = 4, Name = "Fatima", GPA = 3.9 }
            };

            Student? topStudent = students.Find(s => s.GPA > 3.7);
            if (topStudent != null)
            {
                Console.WriteLine("Student with GPA > 3.7:");
                topStudent.Display();
            }

            List<Student> honorStudents = students.FindAll(s => s.GPA >= 3.5);
            Console.WriteLine("\nHonor Students (GPA >= 3.5):");
            foreach (var student in honorStudents)
            {
                student.Display();
            }

            students.Sort((a, b) => b.GPA.CompareTo(a.GPA));
            Console.WriteLine("\nSorted by GPA (highest first):");
            foreach (var student in students)
            {
                student.Display();
            }
            Console.WriteLine();

            Console.WriteLine("  Task 7: Calculator with Exceptions  ");
            Calculator calc = new Calculator();

            try
            {
                double result = calc.Divide(10, 0);
            }
            catch (DivideByZeroException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }

            try
            {
                int num = calc.ParseNumber("abc");
            }
            catch (FormatException)
            {
                Console.WriteLine("Error: Invalid number format!");
            }

            try
            {
                double validResult = calc.Divide(20, 5);
                Console.WriteLine($"20 / 5 = {validResult}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unexpected error: {ex.Message}");
            }
            Console.WriteLine();

            Console.WriteLine("  Task 8: File Processor with Finally  ");
            Resource file = new Resource("data.txt");
            try
            {
                file.Open();
                string data = file.Read();
                Console.WriteLine($"Data read: {data}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            finally
            {
                file.Close();
                Console.WriteLine("Cleanup completed!");
            }

            Console.WriteLine("\nAll tasks completed!");
            Console.ReadKey();
        }
    }
}