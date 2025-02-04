(function (angular) {
    'use strict';
    app.controller('AppClientController', 
        ['$rootScope', '$scope', 'GlobalSettingsService', 'CommonService', 'AuthService'
        , 'localStorageService', 'TranslatorService', 'SharedModuleDataService',
        function ($rootScope, $scope, globalSettingsService, commonService, authService,
            localStorageService, translatorService, moduleDataService) {
            $scope.lang = '';
            $scope.isInit = false;       
            $scope.cartData = {
                items: [],
                totalItems:0,
                total:0,
            };
            $rootScope.globalSettingsService = globalSettingsService;
            $scope.changeLang = $rootScope.changeLang;
            $scope.init = function (lang) {
                if (!$rootScope.isBusy) {
                    $rootScope.isBusy = true;
                    // globalSettingsService.fillGlobalSettings().then(function (response) {
                        $scope.cartData = localStorageService.get('shoppingCart');
                        if(!$scope.cartData){
                            $scope.cartData = {
                                items: [],
                                totalItems:0,
                                total:0,
                            };
                        }
                        commonService.fillAllSettings(lang).then(function (response) {                            
                            if ($rootScope.globalSettings) {
                                    authService.fillAuthData().then(function (response) {
                                        $rootScope.authentication = authService.authentication;
                                        $scope.isInit = true;
                                        $rootScope.isInit = true;
                                        $rootScope.isBusy = false;
                                        $scope.$apply();
                                    });
                                    
                                // });                                
                            } else {
                                $scope.isInit = true;
                                $rootScope.isInit = true;
                                $rootScope.isBusy = false;
                            }
                        });
                        
                    // });

                }
            };

            $scope.translate = $rootScope.translate;
            $scope.previewData = function (moduleId, id) {
                var obj = {
                    moduleId: moduleId,
                    id: id
                };
                $rootScope.preview('module-data', obj, null, 'modal-lg');
            }
            
            $scope.initModuleForm = async function (name, successCallback, failCallback) {
                var resp = null;
                $scope.successCallback = successCallback;
                $scope.failCallback = failCallback;
                setTimeout(async () => {
                    $scope.name = name;
                    if ($scope.id) {
                        resp = await moduleDataService.getModuleData($scope.id, $scope.dataId, 'portal');
                    }
                    else {
                        resp = await moduleDataService.initModuleForm($scope.name);
                    }

                    if (resp && resp.isSucceed) {
                        $scope.activedModuleData = resp.data;
                        $rootScope.isBusy = false;
                        $scope.$apply();
                    }
                    else {
                        if (resp) { 
                            if($scope.errorCallback){
                                $rootScope.executeFunctionByName($scope.errorCallback, [resp], window);
                            }
                            else{
                                $rootScope.showErrors(resp.errors); 
                            }
                        }
                        $rootScope.isBusy = false;
                        $scope.$apply();
                    }
                }, 500);
            };
            $scope.saveModuleData = async function () {

                var resp = await moduleDataService.saveModuleData($scope.activedModuleData);
                if (resp && resp.isSucceed) {
                    $scope.activedModuleData = resp.data;
                    if($scope.successCallback){
                        $rootScope.executeFunctionByName($scope.successCallback, [resp], window);
                    }
                    else{
                        var msg = $rootScope.translate('success');
                        $rootScope.showMessage(msg, 'success');
                    }
                    
                    $rootScope.isBusy = false;
                    $scope.initModuleForm($scope.name);
                    $rootScope.isBusy = false;
                    $scope.$apply();
                }
                else {
                    if (resp) { 
                        if($scope.failCallback){
                            $rootScope.executeFunctionByName($scope.failCallback, [resp], window);
                        }
                        else{
                            $rootScope.showErrors(resp.errors); 
                        }
                    }
                    $rootScope.isBusy = false;
                    $scope.$apply();
                }
            };
            $scope.shareFB = function (url){
                FB.ui({
                    method: 'share',
                    href: url,
                }, function (response) { });
            }
            $scope.shareTwitter = function (url, content) {
                var text = encodeURIComponent(content);
                var shareUrl = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + text;
                var win = window.open(shareUrl, 'ShareOnTwitter', getWindowOptions());
                win.opener = null; // 2
            }
            $scope.saveShoppingCart = function(){
                localStorageService.set('shoppingCart', $scope.cartData);
            }

            var getWindowOptions = function() {
                var width = 500;
                var height = 350;
                var left = (window.innerWidth / 2) - (width / 2);
                var top = (window.innerHeight / 2) - (height / 2);
              
                return [
                  'resizable,scrollbars,status',
                  'height=' + height,
                  'width=' + width,
                  'left=' + left,
                  'top=' + top,
                ].join();
              };
        }]);


})(window.angular);