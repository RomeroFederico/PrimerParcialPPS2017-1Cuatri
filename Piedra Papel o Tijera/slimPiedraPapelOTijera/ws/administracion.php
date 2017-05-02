<?php

require_once "../Clases/AccesoDatos.php";
require_once "../Clases/Usuario.php";
require_once "../Clases/Resultado.php";

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
        $usuarioAlta->partidas = 0;
        $usuarioAlta->partidasGanadas = 0;
        $usuarioAlta->partidasEmpatadas = 0;
        $usuarioAlta->partidasPerdidas = 0;
        $usuarioAlta->jugPiedra = 0;
        $usuarioAlta->jugPapel = 0;
        $usuarioAlta->jugTijera = 0;
        $usuarioAlta->imagen = null;
    
        $exitoAlRegistrar = Usuario::Agregar($usuarioAlta);
        
        if ($exitoAlRegistrar === false)
            $resultado->mensaje = "Error en el alta de usuario.";
        else
        {
            $resultado->exito = true;
            $resultado->mensaje = "Usuario registrado con exito";
            $usuarioAlta->idJugador = $exitoAlRegistrar;
            $resultado->jugador = $usuarioAlta;
        }
    }
    else
        $resultado->mensaje = "Ya se ha ingresado un usuario con el nombre indicado.";

    $response = $response->withJson($resultado);
    return $response->withHeader('Content-type', 'application/json');
});

$app->get('/usuario/{idJugador}', function (Request $request, Response $response)
{
    $idJugador = $request->getAttribute('idJugador');

    $usuario = Usuario::TraerUnUsuarioPorId($idJugador);

    $response = $response->withJson($usuario);
    return $response->withHeader('Content-type', 'application/json');
});

$app->get('/usuarios', function (Request $request, Response $response)
{
    $usuarios = Usuario::TraerTodosLosUsuarios();

    if (count($usuarios) < 1)
        $usuarios = false;

    $response = $response->withJson($usuarios);

     return $response->withHeader('Content-type', 'application/json');
});

$app->put('/usuario/{idJugador}', function (Request $request, Response $response)
{
    $usuarioModificar = new stdclass();
    $usuarioModificar->nombre = $request->getParams()["nombre"];
    $usuarioModificar->partidas = $request->getParams()["partidas"];
    $usuarioModificar->partidasGanadas = $request->getParams()["partidasGanadas"];
    $usuarioModificar->partidasEmpatadas = $request->getParams()["partidasEmpatadas"];
    $usuarioModificar->partidasPerdidas = $request->getParams()["partidasPerdidas"];
    $usuarioModificar->jugPiedra = $request->getParams()["jugPiedra"];
    $usuarioModificar->jugPapel = $request->getParams()["jugPapel"];
    $usuarioModificar->jugTijera = $request->getParams()["jugTijera"];
    $usuarioModificar->imagen = $request->getParams()["imagen"];
    $usuarioModificar->idJugador = $request->getAttribute('idJugador');

    if (!Usuario::TraerUnUsuarioPorId($usuarioModificar->idJugador))
        $exito = false;
    else
        $exito = Usuario::Modificar($usuarioModificar);

    $response = $response->withJson($exito);
    return $response->withHeader('Content-type', 'application/json');
});

$app->get('/resultados', function (Request $request, Response $response)
{
    $resultados = Resultado::TraerResultados();

    if (count($resultados) < 1)
        $resultados = false;

    $response = $response->withJson($resultados);

    return $response->withHeader('Content-type', 'application/json');
});

$app->get('/resultados/{idJugador}', function (Request $request, Response $response)
{
    $idJugador = $request->getAttribute('idJugador');

    $resultado = Resultado::TraerUltimoResultadoDeJugador($idJugador);

    $response = $response->withJson($resultado);

    return $response->withHeader('Content-type', 'application/json');
});

$app->post('/resultados/agregar', function (Request $request, Response $response)
{
    date_default_timezone_set('America/Argentina/Buenos_Aires');

    $resultado = new stdclass();
    $resultado->idJugador =  $request->getParams()["idJugador"];
    $resultado->estado =  $request->getParams()["estado"];
    $resultado->fecha = strftime("%Y-%m-%d %H:%M:%S", time() );

    $exito = Resultado::AgregarResultado($resultado);

    $response = $response->withJson($exito);

    return $response->withHeader('Content-type', 'application/json');
});

$app->run();