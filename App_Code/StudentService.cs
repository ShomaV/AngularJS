using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.Remoting.Contexts;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for StudentService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class StudentService : System.Web.Services.WebService
{

    public StudentService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public void GetAllStudents()
    {
        List<Student> listStudents = new List<Student>();
        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        using (SqlConnection connection = new SqlConnection(cs))
        {
            SqlCommand command = new SqlCommand("Select * from tblStudents", connection);
            connection.Open();
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                Student student = new Student();
                student.Id = Convert.ToInt32(reader["Id"]);
                student.city = reader["City"].ToString();
                student.name = reader["Name"].ToString();
                student.gender = reader["Gender"].ToString();
                listStudents.Add(student);
            }
        }
        JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
        this.Context.Response.Write(javaScriptSerializer.Serialize(listStudents));
    }

}
