<?php

require_once "../Clases/AccesoDatos.php";
require_once "../Clases/Usuario.php";

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

$app = new \Slim\App;

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:8100')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

$app->post('/login', function (Request $request, Response $response)
{
    $usuario = new stdclass();
    $usuario->nombre =  $request->getParams()["nombre"];

    $usuarioLogin = Usuario::TraerUsuarioLogueado($usuario);

    $resultado = new stdClass();
    $resultado->exito = false;

    if ($usuarioLogin == false)
        $resultado->mensaje = "No se encontro el usuario ingresado.";
    else
    {
        $resultado->exito = true;
        $resultado->usuario = $usuarioLogin;
    }

    $response = $response->withJson($resultado);
    return $response->withHeader('Content-type', 'application/json');
});

$app->post('/registro', function (Request $request, Response $response)
{
    $usuario = new stdclass();
    $usuario->nombre =  $request->getParams()["nombre"];

    $usuarioLogin = Usuario::TraerUsuarioLogueado($usuario);

    $resultado = new stdclass();
    $resultado->exito = false;

    if (!$usuarioLogin)
    {
        $usuarioAlta = new stdclass();
        $usuarioAlta->nombre =  $request->getParams()["nombre"];
    
        $exitoAlRegistrar = Usuario::Agregar($usuarioAlta);
        
        if ($exitoAlRegistrar === false)
            $resultado->mensaje = "Error en el alta de usuario.";
        else
        {
            $resultado->exito = true;
            $resultado->mensaje = "Usuario registrado con exito";
            $usuarioAlta->id = $exitoAlRegistrar;
            $resultado->jugador = $usuarioAlta;
        }
    }
    else
        $resultado->mensaje = "Ya se ha ingresado un usuario con el nombre indicado.";

    $response = $response->withJson($resultado);
    return $response->withHeader('Content-type', 'application/json');
});

$app->get('/usuario/{id}', function (Request $request, Response $response)
{
    $id = $request->getAttribute('id');

    $usuario = Usuario::TraerUnUsuarioPorId($id);

    $response = $response->withJson($usuario);
    return $response->withHeader('Content-type', 'application/json');
});

$app->run();