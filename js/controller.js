app.controller("myctrl", ($scope, myfactory) => {

    $scope.item = {};
    $scope.items = {};
    $scope.selectedBloodGroup = "";
    $scope.requiredBloodBottles = "";
    $scope.add = () => {
        //console.log("Add ",scope.item);
        var items = myfactory.add($scope.item, $scope.bloodGroupToReceiverBloodsMap);
        $scope.items = items;
    };

    $scope.deleteAll = () => {
        $scope.items = myfactory.deleteAll();
    }

    let bloodGroupToReceiverBloodsMap = {};
    bloodGroupToReceiverBloodsMap['A+'] = ['A+', 'A-', 'O+', 'O-'];
    bloodGroupToReceiverBloodsMap['O+'] = ['O+', 'O-'];
    bloodGroupToReceiverBloodsMap['B+'] = ['B+', 'B-', 'O+', 'O-'];
    bloodGroupToReceiverBloodsMap['AB+'] = ['A+', 'A-', 'O+', 'O-', 'B+', 'B-', 'AB+', 'AB-'];
    bloodGroupToReceiverBloodsMap['A-'] = ['A-', 'O-'];
    bloodGroupToReceiverBloodsMap['O-'] = ['O-'];
    bloodGroupToReceiverBloodsMap['B-'] = ['B-', 'O-'];
    bloodGroupToReceiverBloodsMap['AB-'] = ['B-', 'O-', 'AB-', 'A-'];
    $scope.bloodGroupToReceiverBloodsMap = bloodGroupToReceiverBloodsMap;

    $scope.selectBloodGroup = () => {
        let receiverBloodGroup = $scope.selectedBloodGroup;
        let bloodGroupsCompatible = $scope.bloodGroupToReceiverBloodsMap[receiverBloodGroup];
        let requiredBloodBottles = $scope.requiredBloodBottles;
        //On change of selected blood group, set default color grey to all blood groups
        for (let index in $scope.items) {
            $scope.items[index].color = 'grey';
        }
        if (bloodGroupsCompatible) {
            for (let bloodGroup of bloodGroupsCompatible) {
                if (!$scope.items[bloodGroup]) {
                    continue;
                }
                if (requiredBloodBottles && (requiredBloodBottles <= $scope.items[bloodGroup].bcount)) {
                    $scope.items[bloodGroup].color = 'darkgreen';
                    //$scope.items[bloodGroup].bcount -= requiredBloodBottles;
                } else {
                    $scope.items[bloodGroup].color = 'lightgreen';
                }
            }
        }
    }
})