var app = angular.module("kivvikLanding", ["firebase"]);

app.controller("LandingPageController", ["$scope", "$firebase",
  function($scope, $firebase) {
    $scope.emails = $firebase(new Firebase("https://vivid-heat-8936.firebaseio.com/users"));
    $scope.messages = $firebase(new Firebase("https://vivid-heat-8936.firebaseio.com/messages"));

    // var store = $firebase(ref);

    // create an AngularFire reference to the data
    // $scope.emails = store.$child('emails');
    // $scope.messages = store.$child('messages');
    $scope.newUser = {};

    $scope.message = {};

    $scope.signUp = function() {
    	$scope.emails.$push({
    		name: $scope.newUser.name,
    		email: $scope.newUser.email,
    		company: $scope.newUser.company
    	});

    	$scope.newUser.name = '';
    	$scope.newUser.email = '';
    	$scope.newUser.company = '';
    };

    $scope.sendMessage = function() {
    	$scope.messages.$push({
    		name: $scope.message.name,
    		email: $scope.message.email,
    		message: $scope.message.message

    	});

    	$scope.message.name = '';
    	$scope.message.email = '';
    	$scope.message.message = '';
    };

  }
]);