app.controller("myctrl", ($scope, myfactory) => {

    $scope.item = {};
    $scope.items = {};
    $scope.selectedBloodGroup = "";
    $scope.requiredBloodBottles = "";
    $scope.draggedItems = {};
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
    $scope.onDrop = function () {
        return function (event, dropzone, draggable, data) {
            if (data.color == 'grey') {
                alert("lol, try again!");
                return;
            }
        

            // console.log('Element has been dropped into the dropzone!');
            let cloneElem = draggable.clone();
            dropzone.append(cloneElem);
            $scope.$apply(function () {
                if(data.color=='lightgreen'){
                    $scope.items[data.bname].bcount -= data.bcount;
                }
                else{ 
                    $scope.items[data.bname].bcount -= $scope.requiredBloodBottles;
                }
                // console.log('boom; ' + status);
                //$scope.items[data.bname].bcount -= data.bcount
            });

        }
    };
});