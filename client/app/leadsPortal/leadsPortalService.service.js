'use strict';

angular.module('erp2015App')
  .service('LeadsPortalService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
  	return {
      createDeal:function(data){
        return $http.post('/api/deals', data).then(function(response){
          return response.data;
          console.log(response.data);
        });
      },
  		getAllDeals: function () {
  			return $http.get('/api/deals').then(function (response) {
  				return response.data;
  			});
  		},
  		getDealsAssigned: function () {
  			return $http.get('/api/deals/myDeals').then(function (response) {
  				return response.data;
  			});
  		},
  		editDeal: function () {
  			 return $http.post('/api/deals').then(function (response) {
  				return response.data;
  			 });
  		},
  		createUpdate: function (data) {
  			return $http.post('/api/updates', data).then(function (response) {
  			 	return response.data;
  			});
  		},
  		editUpdate: function () {
  			 return $http.put('/api/updates').then(function (response) {
  				return response.data;
  			 });
  		},
      getAllDealsObj: function () {
        return $http.get('/api/deals/allDealsPage').then(function (response) {
          return response.data;
        })
      },
      getDeal: function (dealId) {
        return $http.get('api/deals/' + dealId).then(function (response) {
          return response.data;
        });
      },
      getCoords:function(){
        return $http.get('/api/users/get/coords/').then(function(response){
          return response.data;
        })
      }
  	};
  });
