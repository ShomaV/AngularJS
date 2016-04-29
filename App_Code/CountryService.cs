using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for CountryService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class CountryService : System.Web.Services.WebService
{

    public CountryService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public void GetData()
    {
        List<Country> listCountries = new List<Country>();
        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        using (SqlConnection connection = new SqlConnection(cs))
        {
            SqlCommand command = new SqlCommand("Select * from tblCountry;Select * from tblCity", connection);
            SqlDataAdapter sqlDataAdapter=new SqlDataAdapter(command);
            DataSet dataSet=new DataSet();
            sqlDataAdapter.Fill(dataSet);
            DataView dataView=new DataView(dataSet.Tables[1]);
            foreach (DataRow countryDataRow in dataSet.Tables[0].Rows)
            {
                Country country=new Country();
                country.Id = Convert.ToInt32(countryDataRow["Id"]);
                country.Name = countryDataRow["Name"].ToString();

                dataView.RowFilter = "CountryId='" + country.Id + "'";
                List<City> listCites = new List<City>();
                foreach (DataRowView cityDataRowView in dataView)
                {
                    DataRow cityDataRow = cityDataRowView.Row;
                    City city = new City();
                    city.Id = Convert.ToInt32(cityDataRow["Id"]);
                    city.Name = cityDataRow["Name"].ToString();
                    city.CountryId = Convert.ToInt32(cityDataRow["CountryId"]);
                    listCites.Add(city);
                }
                country.Cities = listCites;
                listCountries.Add(country);
            }

        }
        JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
        this.Context.Response.Write(javaScriptSerializer.Serialize(listCountries));
    }

}
