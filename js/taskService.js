app.service(
"TaskService",

function(){

    let tasks =

    JSON.parse(
    localStorage.getItem(
    "tasks"
    )) || [];

    function save(){

        localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
        );

    }

    this.getTasks =
    function(){

        return tasks;

    };

    this.addTask =
    function(task){

        tasks.push(task);

        save();

    };

    this.updateTasks =
    function(){

        save();

    };

    this.deleteTask =
    function(id){

        tasks =
        tasks.filter(function(task){

            return task.id !== id;

        });

        save();

    };

});