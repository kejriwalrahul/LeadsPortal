'use strict';

angular.module('erp2015App')
.controller('CoresCtrl', function ($scope, LeadsPortalService, $location, $http, $state,$q) {
  LeadsPortalService.getCoords()
  .then(function (data) {
    $scope.coords = data;
  },function (err){
     console.log(err);
  });
   $scope.selectedCoords = [];
   $scope.coordsIds=[];
   
   $scope.newDeal=function(form){
    $scope.submitted = true;
    angular.forEach($scope.selectedCoords,function(item){
     $scope.coordsIds.push(item._id);
   })
     if(form.$valid) {
    LeadsPortalService.createDeal({
      title: $scope.deal.title,
      info: $scope.deal.info,
      companyName: $scope.deal.company,
      initialPointOfContactName: $scope.deal.poc_name,
      initialPointOfContactNumber: $scope.deal.poc_phone,
      initialPointOfContactEmail: $scope.deal.poc_email,
      assignees: $scope.coordsIds,
      status: false
   })
    .then(function (data) {
          $state.go('allDeals');
        })
    .catch(function (err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });}
  };
});
