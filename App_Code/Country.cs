using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Employee
/// </summary>
public class Country
{
    public Country()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public int Id { get; set; }

    public string Name { get; set; }

    public List<City> Cities { get; set; }    
}