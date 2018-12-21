app.controller("myctrl",($scope,myfactory)=>{

    $scope.item = {};
    $scope.items = [];

    $scope.add=()=>{
        //console.log("Add ",scope.item);
        var items = myfactory.add($scope.item);
        $scope.items = items;
    };





})