// app.js
var app = angular.module('myApp', []);

app.controller('MainController', function ($scope) {
    $scope.sliderValue = 50;
});

app.directive('customSlider', function () {
    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            min: '=',
            max: '='
        },
        template: `
            <div class="custom-slider-bar" ng-mousedown="onMouseDown($event)">
                <div class="custom-slider-thumb" ng-style="{ left: thumbPosition() }"></div>
            </div>
        `,
        link: function (scope, element) {
            scope.thumbPosition = function () {
                // Calculate the thumb position based on the current value
                var percentage = (scope.ngModel - scope.min) / (scope.max - scope.min) * 100;
                return percentage + '%';
            };

            scope.onMouseDown = function (event) {
                // Handle mouse down event to update the slider value
                var barWidth = element.find('.custom-slider-bar').width();
                var clickX = event.clientX - element.find('.custom-slider-bar').offset().left;
                var percentage = (clickX / barWidth) * 100;
                scope.ngModel = Math.round((percentage / 100) * (scope.max - scope.min) + scope.min);
                scope.$apply(); // Notify AngularJS to update the view
            };
        }
    };
});
