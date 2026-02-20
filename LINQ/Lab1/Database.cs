using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System.Linq;

namespace EmployeeLab
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Department { get; set; }
    }

    public static class Database
    {
        private const string ConnStr =
            @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=EmployeeDB;Integrated Security=True";

        public static void Initialize()
        {
            string masterConn = ConnStr.Replace("Initial Catalog=EmployeeDB", "Initial Catalog=master");

            using (var con = new SqlConnection(masterConn))
            {
                con.Open();

                var cmd = new SqlCommand(
                    @"IF NOT EXISTS (SELECT name FROM sys.databases WHERE name='EmployeeDB')
                          CREATE DATABASE EmployeeDB;", con);
                cmd.ExecuteNonQuery();
            }

            using (var con = new SqlConnection(ConnStr))
            {
                con.Open();

                var cmd = new SqlCommand(
                    @"IF NOT EXISTS (SELECT * FROM sys.tables WHERE name='Employees')
                      CREATE TABLE Employees (
                          Id         INT PRIMARY KEY,
                          Name       NVARCHAR(100) NOT NULL,
                          Department NVARCHAR(100) NOT NULL
                      );", con);
                cmd.ExecuteNonQuery();
            }
        }

        private static List<Employee> LoadAll(SqlConnection con)
        {
            var list = new List<Employee>();
            using (var cmd = new SqlCommand("SELECT Id, Name, Department FROM Employees", con))
            using (var rdr = cmd.ExecuteReader())
                while (rdr.Read())
                    list.Add(new Employee
                    {
                        Id = (int)rdr["Id"],
                        Name = rdr["Name"].ToString(),
                        Department = rdr["Department"].ToString()
                    });
            return list;
        }

        public static List<Employee> GetAll()
        {
            using (var con = new SqlConnection(ConnStr))
            {
                con.Open();
                return LoadAll(con).OrderBy(e => e.Id).ToList();
            }
        }

        public static string Insert(int id, string name, string department)
        {
            using (var con = new SqlConnection(ConnStr))
            {
                con.Open();

                bool exists = LoadAll(con).Any(e => e.Id == id);
                if (exists)
                    return $"Employee with ID {id} already exists.";

                var cmd = new SqlCommand(
                    "INSERT INTO Employees (Id, Name, Department) VALUES (@id, @name, @dept)", con);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@name", name);
                cmd.Parameters.AddWithValue("@dept", department);
                cmd.ExecuteNonQuery();
                return $"Employee '{name}' inserted successfully.";
            }
        }

        public static string Delete(int id)
        {
            using (var con = new SqlConnection(ConnStr))
            {
                con.Open();

                bool exists = LoadAll(con).Any(e => e.Id == id);
                if (!exists)
                    return $"No employee found with ID {id}.";

                var cmd = new SqlCommand("DELETE FROM Employees WHERE Id=@id", con);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.ExecuteNonQuery();
                return $"Employee with ID {id} deleted.";
            }
        }

        public static string Update(int id, string name, string newDepartment)
        {
            using (var con = new SqlConnection(ConnStr))
            {
                con.Open();

                var match = LoadAll(con).FirstOrDefault(
                    e => e.Id == id && e.Name.Equals(name, StringComparison.OrdinalIgnoreCase));

                if (match == null)
                    return $"No employee found with ID {id} and name '{name}'.";

                var cmd = new SqlCommand(
                    "UPDATE Employees SET Department=@dept WHERE Id=@id", con);
                cmd.Parameters.AddWithValue("@dept", newDepartment);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.ExecuteNonQuery();
                return $"Department updated to '{newDepartment}' for employee '{name}'.";
            }
        }

        public static Employee SearchById(int id)
        {
            using (var con = new SqlConnection(ConnStr))
            {
                con.Open();
                return LoadAll(con).SingleOrDefault(e => e.Id == id);
            }
        }
    }
}
