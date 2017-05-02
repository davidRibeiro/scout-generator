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
// scoutApp.controller('MainCtrl', function($scope, constantsService) {
//   $scope.duration = constantsService.duration;
//   $scope.playerTypes = constantsService.playerTypes;
//   $scope.countries = constantsService.countries;
//   $scope.results = [];
//
//   $scope.randomizeScout = function() {
//     $scope.results.push($scope.generateScout());
//     console.log($scope.results);
//   }
//   $scope.generateScout = function() {
//     var duration = $scope.duration.types[Math.floor(Math.random() * $scope.duration.types.length)];
//     var playerType = $scope.playerTypes.types[Math.floor(Math.random() * $scope.playerTypes.types.length)];
//     var region = $scope.countries.regions[Math.floor(Math.random() * $scope.countries.regions.length)];
//     var country = region.countries[Math.floor(Math.random() * region.countries.length)];
//     var result = {
//       continent: region.name,
//       country: country,
//       playerType: playerType,
//       duration: duration
//     };
//     return result;
//   }
// });

function startElement(el) {
  return {
    value: el,
    active: true
  }
}

function checkIfItIsActive(el) {
  return (el.active == true);
}

scoutApp.controller('scoutCtrl', ['constantsService', '$scope', '$cookies', '$window', '$filter',
  function(constantsService, $scope, $cookies, $window, $filter) {
    $scope.config = $cookies.getObject('config');
    if ($scope.config == undefined) {
      $scope.config = {
        duration: constantsService.duration.types.map(startElement),
        playerTypes: constantsService.playerTypes.types.map(startElement),
        regions: constantsService.regions.regions.map(startElement),
        time: 0
      };
    }
    $scope.scouts = $cookies.getObject('scouts');
    if ($scope.scouts == undefined) {
      $scope.scouts = [{
        name: 'Scout #1',
        active: true,
        history: []
      }, {
        name: 'Scout #2',
        active: true,
        history: []

      }, {
        name: 'Scout #3',
        active: true,
        history: []
      }];
    }
    // watch any config changes
    $scope.$watch(function() {
      return $scope.config;
    }, function(newValue, oldValue) {
      $cookies.putObject('config', newValue)
    }, true)
    // watch any scout changes
    $scope.$watch(function() {
      return $scope.scouts;
    }, function(newValue, oldValue) {
      $cookies.putObject('scouts', newValue)
    }, true)
    // delete cookies and restart app
    $scope.clearCookies = function() {
      $cookies.remove('scouts');
      $cookies.remove('config');
      $window.location.reload();
    }

    $scope.generateAllScouts = function() {

      var months = $scope.config.duration.filter(checkIfItIsActive);
      if (months.length <= 0) {
        months = constantsService.duration.types.map(startElement);
      }
      var playerTypes = $scope.config.playerTypes.filter(checkIfItIsActive);
      if (playerTypes.length <= 0) {
        playerTypes = constantsService.playerTypes.types.map(startElement);
      }
      var regions = $scope.config.regions.filter(checkIfItIsActive);
      if (regions.length <= 0) {
        regions = constantsService.regions.regions.map(startElement);
      }
      var countries = regions[Math.floor(Math.random() * regions.length)].value.countries;

      // check how many scouts are active
      var nScoutsActive = $scope.scouts.filter(function(scout) {
        return (scout.active == true);
      }).length;
      // if there is any scout active then generate a job for him
      if (nScoutsActive > 0) {
        var maxTime = 10;
        for (var i = 0; i < $scope.scouts.length; i++) {
          var scout = $scope.scouts[i];
          var job = (scout.active == false) ? {} : $scope.generateJob(months, playerTypes, countries);
          if (scout.active == true) {
            maxTime = Math.min(maxTime, job.duration);
          }
          scout.history.push(job);
        }
        $scope.config.time += maxTime;
      }
      // otherwise we'll just wait three months
      else {
        $scope.config.time += 3;
      }
    }

    // randomize job for a scout according to the configs
    $scope.generateJob = function(months, playerTypes, countries) {
      var job = {
        country: countries[Math.floor(Math.random() * countries.length)],
        playerType: playerTypes[Math.floor(Math.random() * playerTypes.length)].value,
        duration: months[Math.floor(Math.random() * months.length)].value
      };
      return job;
    }


  }
]);
