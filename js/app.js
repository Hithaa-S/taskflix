var app = angular.module("todoApp",["ngRoute"]);

app.config(function($routeProvider){

    $routeProvider

    .when("/",{
        templateUrl:
        "templates/allTasks.html",
        controller:
        "TaskController"
    })

    .when("/active",{
        templateUrl:
        "templates/activeTasks.html",
        controller:
        "TaskController"
    })

    .when("/completed",{
        templateUrl:
        "templates/completedTasks.html",
        controller:
        "TaskController"
    })

    .otherwise({
        redirectTo:"/"
    });

});

//controller
app.controller(
"TaskController",

function(
$scope,
TaskService
){

$scope.tasks =
TaskService.getTasks();

$scope.newTask = {};

$scope.showReward = false;

$scope.addTask =
function(){

    if(!$scope.newTask.title)
    return;

    let task = {

        id:Date.now(),

        title:
        $scope.newTask.title,

        category:
        $scope.newTask.category,

        priority:
        $scope.newTask.priority,

        dueDate:
        $scope.newTask.dueDate,

        completed:false

    };

    TaskService.addTask(task);

    $scope.newTask = {};

};

$scope.toggleTask =
function(task){

    task.completed =
    !task.completed;

    if(task.completed){

        let today =
        new Date();

        let due =
        new Date(
        task.dueDate
        );

        if(today <= due){

            $scope.showReward =
            true;

            setTimeout(
            function(){

                $scope.$apply(
                function(){

                    $scope.showReward =
                    false;

                });

            },5000);

        }

    }

    TaskService.updateTasks();

};

$scope.deleteTask =
function(id){

    if(confirm(
    "Delete Task?"
    )){

        TaskService.deleteTask(id);

        $scope.tasks =
        TaskService.getTasks();

    }

};

});