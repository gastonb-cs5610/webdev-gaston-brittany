(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)
        .controller("DisplayController", DisplayController)
        .controller("EditController", EditController);

    function EditController(currentUser, UserService, $timeout) {
        var vm = this;
        vm.user = currentUser;
        vm.apps = [];

        function init() {
            var len = vm.user.apps.length;
            for (var i = 0; i < len; i++) {
                var name = vm.user.apps[i];
                vm.apps[name] = true;
            }
        }

        init();
        vm.updateUser = updateUser;

        function updateUser(newUser, apps) {
            if (!vm.user || vm.user.device === "" ||  vm.user.device === undefined) {
                vm.error = "Must select device.";
                $timeout(function () {
                    vm.error = null;
                }, 3000);

                return;
            }

            var len = apps.length;
            vm.user.apps = [];
            for (var property in apps) {
                if (apps.hasOwnProperty(property) && apps[property]) {
                    vm.user.apps.push(property);
                }
            }

            if (vm.user.apps.length <= 0) {
                vm.error = "Must select at least one app.";
                $timeout(function () {
                    vm.error = null;
                }, 3000);
                return;
            }


            console.log('updating', newUser);

            UserService
                .updateUser(vm.user._id, newUser)
                .then(function () {
                    vm.updated = "Profile changes saved!!";
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);

                }, function () {
                    vm.updated = "Could not update, please try again later.";
                });
        }

    }

    function ProfileController(currentUser, $location, UserService) {
        var vm = this;
        vm.logout = logout;

        function init() {
            vm.user = currentUser;
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/');
                })

        }

    }

    function DisplayController($routeParams, UserService) {
        var vm = this;
        vm.username = $routeParams["username"];

        function init() {
            UserService
                .findUserByUsername(vm.username)
                .then(renderPage);
        }
        init();

        function renderPage(user) {
            vm.user = user;
            vm.date = user.dateCreated.split("-")[0];
        }
    }

})();

