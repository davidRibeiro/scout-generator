var scoutApp = angular.module('scoutApp', []);
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
scoutApp.constant('countries', {
  continents: [{
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
      name: 'Oceania',
      countries: ['Australia', 'New Zealand']
    },
    {
      name: 'Africa',
      countries: ['Algeria', 'Cameroon', 'Egypt', 'Ghana', 'Ivory Coast', 'Morocco', 'Nigeria', 'South Africa']
    }
  ]
});
scoutApp.service('constantsService', function(duration, playerTypes, countries) {
  this.duration = duration;
  this.playerTypes = playerTypes;
  this.countries = countries;
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
    var continent = $scope.countries.continents[Math.floor(Math.random() * $scope.countries.continents.length)];
    var country = continent.countries[Math.floor(Math.random() * continent.countries.length)];
    var result = {
      continent: continent.name,
      country: country,
      playerType: playerType,
      duration: duration
    };
    return result;
  }
});
