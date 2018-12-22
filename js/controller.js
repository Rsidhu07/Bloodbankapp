app.controller("myctrl", ($scope, myfactory) => {

    $scope.item = {};
    //$scope.items = {};
    $scope.selectedBloodGroup = "";
    $scope.requiredBloodBottles = 0;
    $scope.add = () => {
        //console.log("Add ",scope.item);
        var items = myfactory.add($scope.item);
        $scope.items = items;
    };

    $scope.deleteAll = () => {
        $scope.items = myfactory.deleteAll()
    }

    // $scope.getBloodGroupToReceiverBloodsMap = () => {
    let bloodGroupToReceiverBloodsMap = {}
    bloodGroupToReceiverBloodsMap['A+'] = ['A+', 'A-', 'O+', 'O-']
    bloodGroupToReceiverBloodsMap['O+'] = ['O+', 'O-']
    bloodGroupToReceiverBloodsMap['B+'] = ['B+', 'B-', 'O+', 'O-']
    bloodGroupToReceiverBloodsMap['AB+'] = ['A+', 'A-', 'O+', 'O-', 'B+', 'B-', 'AB+', 'AB-']
    bloodGroupToReceiverBloodsMap['A-'] = ['A-', 'O-']
    bloodGroupToReceiverBloodsMap['O-'] = ['O-']
    bloodGroupToReceiverBloodsMap['B-'] = ['B-', 'O-']
    bloodGroupToReceiverBloodsMap['AB-'] = ['B-', 'O-', 'AB-', 'A-']
    $scope.bloodGroupToReceiverBloodsMap = bloodGroupToReceiverBloodsMap;
    //  return bloodGroupToReceiverBloodsMap
    //}

    // $scope.$watch("selectedBloodGroup", function (newValue, oldValue) {
    $scope.selectBloodGroup = () => {
        //if (newValue && newValue != oldValue) {
            let receiverBloodGroup = $scope.selectedBloodGroup;
            let bloodGroupsCompatible = $scope.bloodGroupToReceiverBloodsMap[receiverBloodGroup]

            //On change of selected blood group, set default color grey to all blood groups
            for (let bloodGroup in $scope.items) {
                $scope.items[bloodGroup].color = 'grey'
            }
            if (bloodGroupsCompatible) {
                for (let bloodGroup of bloodGroupsCompatible) {
                    if (!$scope.items[bloodGroup]) {
                        continue;
                    }
                    $scope.items[bloodGroup].color = 'lightgreen'
                }
            }
        //}
    }
    //})

})