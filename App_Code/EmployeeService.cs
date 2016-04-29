using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Script.Serialization;



/// <summary>
/// Summary description for EmployeeService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class EmployeeService : System.Web.Services.WebService
{

    public EmployeeService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public void GetAllEmployees()
    {
        List<Employee> listEmployees =  new List<Employee>();
        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        using (SqlConnection connection = new SqlConnection(cs))
        {
            SqlCommand command=new SqlCommand("Select * from tblEmployees",connection);
            connection.Open();
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                Employee employee=new Employee();
                employee.Id = Convert.ToInt32(reader["Id"]);
                employee.Salary = Convert.ToInt32(reader["Salary"]);
                employee.name = reader["Name"].ToString();
                employee.gender = reader["Gender"].ToString();
                listEmployees.Add(employee);
            }
        }
        JavaScriptSerializer javaScriptSerializer=new JavaScriptSerializer();
        this.Context.Response.Write(javaScriptSerializer.Serialize(listEmployees));
    }
}
