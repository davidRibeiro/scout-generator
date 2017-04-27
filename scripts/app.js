var scoutApp = angular.module('scoutApp', ['ngCookies']);
scoutApp.constant('playerTypes', {
  types: ['Any',
    'Attacker',
    'Defensive minded',
    'Goalkeeper',
    'Physically strong',
    'Playmaker',
    'Technically gifted',
    'Winger'
  ]
});
scoutApp.constant('duration', {
  types: [3, 6, 9]
});
scoutApp.constant('regions', {
  regions: [{
      name: 'Asia',
      countries: ['China PR', 'Japan', 'Korea Republic', 'Saudi Arabia']
    },
    {
      name: 'Northern Europe',
      countries: ['Denmark', 'England', 'Finland', 'Republic of Ireland', 'Northern Ireland', 'Norway', 'Russia', 'Scotland', 'Sweden']
    },
    {
      name: 'Central Europe',
      countries: ['Austria', 'Belgium', 'France', 'Germany', 'Netherlands', 'Switzerland']
    },
    {
      name: 'Southern Europe',
      countries: ['Croatia', 'Greece', 'Italy', 'Portugal', 'Spain', 'Turkey']
    },
    {
      name: 'Rest Of Europe',
      countries: ['Czech Republic', 'Poland', 'Romania', 'Slovakia', 'Slovenia', 'Serbia']
    },
    {
      name: 'North America',
      countries: ['Canada', 'Mexico', 'United States']
    },
    {
      name: 'South America',
      countries: ['Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Paraguay', 'Peru', 'Uruguay', 'Venezuela']
    },
    {
      name: 'Australia',
      countries: ['Australia', 'New Zealand']
    },
    {
      name: 'Africa',
      countries: ['Algeria', 'Cameroon', 'Egypt', 'Ghana', 'Ivory Coast', 'Morocco', 'Nigeria', 'South Africa']
    }
  ]
});
scoutApp.service('constantsService', function(duration, playerTypes, regions) {
  this.duration = duration;
  this.playerTypes = playerTypes;
  this.regions = regions;
});
scoutApp.controller('MainCtrl', function($scope, constantsService) {
  $scope.duration = constantsService.duration;
  $scope.playerTypes = constantsService.playerTypes;
  $scope.countries = constantsService.countries;
  $scope.results = [];

  $scope.randomizeScout = function() {
    $scope.results.push($scope.generateScout());
    console.log($scope.results);
  }
  $scope.generateScout = function() {
    var duration = $scope.duration.types[Math.floor(Math.random() * $scope.duration.types.length)];
    var playerType = $scope.playerTypes.types[Math.floor(Math.random() * $scope.playerTypes.types.length)];
    var region = $scope.countries.regions[Math.floor(Math.random() * $scope.countries.regions.length)];
    var country = region.countries[Math.floor(Math.random() * region.countries.length)];
    var result = {
      continent: region.name,
      country: country,
      playerType: playerType,
      duration: duration
    };
    return result;
  }
});

function startElement(el) {
  return {
    value: el,
    active: true
  }
}
scoutApp.controller('scoutCtrl', ['constantsService', '$scope', '$cookies', function(constantsService, $scope, $cookies) {
  // $scope.config = {
  //   duration: constantsService.duration
  // }
  // $scope.time = $cookies.get('time') || 0;
  // console.log(constantsService.duration.types);
  $scope.config = {
    duration: constantsService.duration.types.map(startElement),
    playerTypes: constantsService.playerTypes.types.map(startElement),
    regions: constantsService.regions.regions.map(startElement)
  };

  $scope.scouts = [{}, {}, {}];
  // console.log($cookies.get('asdf'));
  // console.log($cookies.put('asdf', 'Hello world'));
}]);
