/// <reference path="angular.min.js" />

//method chaining example
var myApp = angular
    .module("myModule", ["ngRoute"])
    .config(function ($routeProvider,$locationProvider) {
        $routeProvider
        .when("/home", {
            templateUrl: "../Templates/home.html",
            controller: "homeController"
        })
         .when("/courses", {
             templateUrl: "../Templates/courses.html",
             controller: "coursesController"
         })
         .when("/students", {
             templateUrl: "../Templates/students.html",
             controller: "studentsController"
         })
        $locationProvider.html5Mode(true);
    })
    .controller("homeController",function($scope) {
        $scope.message = "Home Page";
    })
    .controller("coursesController", function ($scope) {
        $scope.courses = ["C#","AngularJS","SQL Server","ADO.Net","ASP.Net"];
    })
    .controller("studentsController", function ($scope,$http) {
        $http.get("/Services/StudentService.asmx/GetAllStudents")
        .then(function(response) {
            $scope.students = response.data;        
            })        
    })
    .controller("myController", function ($scope, $http, $log, $location, $anchorScroll, stringService) {
        $scope.scrollTo = function (scrollLocation) {
            $location.hash(scrollLocation);
            $anchorScroll.yOffset = 20;
            $anchorScroll();
        };

        $scope.transformString = function (input) {
            $scope.output = stringService.processString(input);
        }

        var successCallBack = function (response) {
            $scope.employees = response.data;
            $log.info(response);
        };

        var errorCallBack = function (response) {
            $scope.error = response.data;
            $log.info(response);
        };
        $http({
            method: 'GET',
            url: '/Services/EmployeeService.asmx/GetAllEmployees'
        }).then(successCallBack, errorCallBack);

        $http.get("/Services/CountryService.asmx/GetData")
            .then(function (response) {
                $scope.serviceCountries = response.data;
            });


        var employees = [
            {
                firstName: "Alice",
                lastName: "Bbb",
                gender: "Male",
                salary: 55000,
                dob: new Date("January 01,1980")
            },
            {
                firstName: "Cat",
                lastName: "Ddd",
                gender: "Female",
                salary: 55000.2678,
                dob: new Date("January 02,1981")

            },
            {
                firstName: "Elephant",
                lastName: "Fff",
                gender: "Male",
                salary: 55000.7998,
                dob: new Date("January 03,1982")
            },
            {
                firstName: "Goat",
                lastName: "Hhh",
                gender: "Female",
                salary: 55000,
                dob: new Date("January 04,1983")
            },
            {
                firstName: "Alishah",
                lastName: "Hhh",
                gender: "Female",
                salary: 55000,
                dob: new Date("January 04,1983")
            },
            {
                firstName: "Ben",
                lastName: "Hhh",
                gender: "Female",
                salary: 55000,
                dob: new Date("January 04,1983")
            },
            {
                firstName: "Todd",
                lastName: "Hhh",
                gender: "Female",
                salary: 55000,
                dob: new Date("January 04,1983")
            }
        ];

        var employeesIntGender = [
                {
                    firstName: "Alice",
                    lastName: "Bbb",
                    gender: 1,
                    salary: 55000,
                    dob: new Date("January 01,1980")
                },
                {
                    firstName: "Cat",
                    lastName: "Ddd",
                    gender: 2,
                    salary: 55000.2678,
                    dob: new Date("January 02,1981")

                },
                {
                    firstName: "Elephant",
                    lastName: "Fff",
                    gender: 1,
                    salary: 55000.7998,
                    dob: new Date("January 03,1982")
                },
                {
                    firstName: "Goat",
                    lastName: "Hhh",
                    gender: 2,
                    salary: 55000,
                    dob: new Date("January 04,1983")
                },
                {
                    firstName: "Alishah",
                    lastName: "Hhh",
                    gender: 2,
                    salary: 55000,
                    dob: new Date("January 04,1983")
                },
                {
                    firstName: "Ben",
                    lastName: "Hhh",
                    gender: 2,
                    salary: 55000,
                    dob: new Date("January 04,1983")
                },
                {
                    firstName: "Todd",
                    lastName: "Hhh",
                    gender: 3,
                    salary: 55000,
                    dob: new Date("January 04,1983")
                }
        ];

        var countries = [
            {
                name: "India",
                cities: [
                    { name: "Bangalore" },
                    { name: "Delhi" },
                    { name: "Mumbai" }
                ]
            },
            {
                name: "United Kingdom",
                cities: [
                    { name: "London" },
                    { name: "Manchester" },
                    { name: "Birmingham" }
                ]
            },
        {
            name: "United States Of America",
            cities: [
                { name: "New york" },
                { name: "Florida" },
                { name: "New jersey" }
            ]
        }
        ];

        var technologies = [
            { name: "C#", likes: 0, dislikes: 1 },
            { name: "SQL Server", likes: 0, dislikes: 1 },
            { name: "Java", likes: 0, dislikes: 1 },
            { name: "Angular JS", likes: 0, dislikes: 1 }
        ];
        $scope.message = "AngulaJS Tutorials";
        $scope.countries = countries;

        $scope.technologies = technologies;

        $scope.IncrementLikes = function (technology) {
            technology.likes++;
        }

        $scope.IncrementDisLikes = function (technology) {
            technology.dislikes++;
        }
        $scope.rowLimit = 4;
        $scope.sortColumn = "firstName";

        $scope.reverseSort = false;

        $scope.sortData = function (column) {
            $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
            $scope.sortColumn = column;
        }

        $scope.getSortClass = function (column) {
            if ($scope.sortColumn == column) {
                return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
            }
            return '';
        }

        $scope.search = function (item) {
            if ($scope.searchText == undefined) {
                return true;
            } else if (item.firstName.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1 || item.lastName.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1) {
                return true;
            }
            return false;
        }

        $scope.employeesIntGender = employeesIntGender;

        //$scope.employees = employees;

        $scope.employeeView = "EmployeeTable.html";
    });

