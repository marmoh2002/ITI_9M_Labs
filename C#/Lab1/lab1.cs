using System;

// Enum for job type
public enum JobType
{
    FullTime,
    PartTime
}

// Enum for job position
public enum JobPosition
{
    Admin,
    Engineer,
    Technician
}

// Employee struct
public struct Employee
{
    public int id;
    public string name;
    public double salary;
    public JobType jobType;
    public JobPosition jobPosition;
}

class Program
{
    static void Main()
    {
        // Create an employee variable
        Employee emp;

        Console.WriteLine("Enter Employee ID:");
        emp.id = int.Parse(Console.ReadLine());

        Console.WriteLine("Enter Employee Name:");
        emp.name = Console.ReadLine();

        Console.WriteLine("Enter Employee Salary:");
        emp.salary = double.Parse(Console.ReadLine());

        Console.WriteLine("Enter Job Type (1=FullTime, 2=PartTime):");
        int typeChoice = int.Parse(Console.ReadLine());
        if (typeChoice == 1)
        {
            emp.jobType = JobType.FullTime;
        }
        else
        {
            emp.jobType = JobType.PartTime;
        }

        Console.WriteLine("Enter Job Position (1=Admin, 2=Engineer, 3=Technician):");
        int positionChoice = int.Parse(Console.ReadLine());
        if (positionChoice == 1)
        {
            emp.jobPosition = JobPosition.Admin;
        }
        else if (positionChoice == 2)
        {
            emp.jobPosition = JobPosition.Engineer;
        }
        else
        {
            emp.jobPosition = JobPosition.Technician;
        }

        // Output employee information
        Console.WriteLine("\n--- Employee Information ---");
        Console.WriteLine("ID: " + emp.id);
        Console.WriteLine("Name: " + emp.name);
        Console.WriteLine("Salary: " + emp.salary);
        Console.WriteLine("Job Type: " + emp.jobType);
        Console.WriteLine("Job Position: " + emp.jobPosition);
    }
}
