/**
 * Jeferson Pacheco - 18/11/2020
 */

var crud = angular.module("crud", []);

crud.controller("controller", function ($scope, $http) {

   $scope.novaEmpresa = {};
   $scope.empresaSelecionada = {};
   $scope.nome = null;
   $scope.cnpj = null;
   $scope.data = null;

   $scope.getRequest = function() {

        var nome = $scope.nomepesquisa;
        var cnpj = $scope.cnpjpesquisa;

        if($scope.nomepesquisa == null){
            nome = "Vazio"; 
        }
        if($scope.cnpjpesquisa == null){
            cnpj = "123"; 
        }else{
            cnpj = $scope.cnpjpesquisa = $scope.cnpjpesquisa.replace("/","").replace(".","").replace("-","").replace(".","");
        }

        $http.get('https://localhost:44396/api/empresas/pesquisar/'+nome+'/'+cnpj+'').then(  
        function successCallback(response) {
            $scope.empresas = response.data;
        },
        function errorCallback(response) {
            console.log("Unable to perform get request");
        }
        );
    };

   $scope.empresas = carregarEmpresas();

   function carregarEmpresas(){
        $http.get("https://localhost:44396/api/empresas").then(
            function successCallback(response) {
                $scope.empresas = response.data;
            },
            function errorCallback(response) {
                console.log("Erro ao processar requisição");
            }
        )
    }

    $scope.selecionaEmpresa = function (empresa) {
        $scope.empresaSelecionada = empresa;
    };

    $scope.pesquisarEmpresa = function() {
        $http.get('https://localhost:44396/api/empresas/pesquisar/'+$scope.nomepesquisa+'/'+$scope.nomepesquisa+'').then(
            function successCallback(response) {
                console.log(response.data);
                $scope.empresas = response.data;
                //$scope.response = response.data;
            },
            function errorCallback(response) {
                console.log("Erro ao processar requisição");
            }
        )
    };

    $scope.salvar = function (nome, cnpj, data) {

        var data = {
            Nome: nome,
            Cnpj: cnpj,
            Data: data
        }

        var url = 'https://localhost:44396/api/empresas', data = JSON.stringify(data), config='Content-Type';

        $http.post(url, data, config).then(function (response) {
            carregarEmpresas();
        }, function (response) {
            console.log("Erro na operação");
        });
    };

    $scope.alterarEmpresa = function () {

        var url = 'https://localhost:44396/api/empresas/' + $scope.empresaSelecionada.id;

        var data = JSON.stringify($scope.empresaSelecionada);

        $http.put(url, data).then(function (response) {
            carregarEmpresas();
        }, function (response) {
            console.log("Erro na operação");
        });
       
    };

    $scope.excluirEmpresa = function(){

        var url = 'https://localhost:44396/api/empresas/' + $scope.empresaSelecionada.id;

        $http.delete(url).then(function (response) {
            carregarEmpresas();
        }, function (response) {
            console.log("Erro na operação");
        });
    };
   
});