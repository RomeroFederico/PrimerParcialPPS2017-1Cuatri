<?php
    class Usuario 
    {
        public $idJugador;
        public $nombre;
        public $puntaje;
        public $partidasJugadas;
        public $respCorrectas;
        public $respIncorrectas;
        public $imagen;

        public function __construct($id = NULL)
        {
            if ($id !== NULL)
            {
                $usuario = Usuario::TraerUnUsuarioPorId($id);
                $this->idJugadorid = $usuario->idJugador;
                $this->nombre = $usuario->nombre;
                $this->puntaje = $usuario->puntaje;
                $this->partidasJugadas = $usuario->partidasJugadas;
                $this->respCorrectas = $usuario->respCorrectas;
                $this->respIncorrectas = $usuario->respIncorrectas;
                $this->imagen = $usuario->imagen;
            }
        }

        public static function TraerUnUsuarioPorId($id)
        {
            $objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso();

            $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT * FROM jugadores WHERE (idJugador = :id)");

            $consulta->bindValue(':id', $id, PDO::PARAM_INT);

            $consulta->execute();

            if ($consulta->rowCount() != 1)
                return false;

            return $consulta->fetchObject('Usuario');
        }

        public static function TraerTodosLosUsuarios()
        {
            $usuarios = array();

            $objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso();

            $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT * FROM jugadores ORDER BY idJugador");

            $consulta->execute();

            $consulta->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'Usuario');

            foreach ($consulta as $usuario)
                array_push($usuarios, $usuario);

            return $usuarios;
        }

        public static function TraerUsuarioLogueado($obj)
        {
            $objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso();

            $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT * FROM jugadores WHERE (nombre = :nombre)");

            $consulta->bindValue(':nombre', $obj->nombre, PDO::PARAM_STR);

            $consulta->execute();

            if ($consulta->rowCount() != 1)
                return false;

            return $consulta->fetchObject('Usuario');
        }

        public static function Agregar($obj)
        {
            try
            {
                $objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso();

                $consulta = $objetoAccesoDatos->RetornarConsulta("INSERT INTO jugadores (nombre, puntaje, partidasJugadas, respCorrectas, respIncorrectas, imagen) 
                                                 VALUES (:Nombre, :Puntaje, :PartidasJugadas, :RespCorrectas, :RespIncorrectas, :Imagen)");

                //$consulta->bindValue(':Id', $obj->id, PDO::PARAM_INT);
                $consulta->bindValue(':Nombre', $obj->nombre, PDO::PARAM_STR);
                $consulta->bindValue(':Puntaje', $obj->puntaje, PDO::PARAM_INT);
                $consulta->bindValue(':PartidasJugadas', $obj->partidasJugadas, PDO::PARAM_INT);
                $consulta->bindValue(':RespCorrectas', $obj->respCorrectas, PDO::PARAM_INT);
                $consulta->bindValue(':RespIncorrectas', $obj->respIncorrectas, PDO::PARAM_INT);
                $consulta->bindValue(':Imagen', $obj->imagen, PDO::PARAM_STR);

                $consulta->execute();
            }
            catch (Exception $e) 
            {
                return FALSE;
            }

            return $objetoAccesoDatos->RetornarUltimoIdInsertado();
        }

        public static function Modificar($obj)
        {
            try
            {
                $objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso();

                $consulta = $objetoAccesoDatos->RetornarConsulta("UPDATE jugadores SET nombre = :Nombre, puntaje = :Puntaje, partidasJugadas = :PartidasJugadas, respCorrectas = :RespCorrectas, respIncorrectas = :RespIncorrectas, imagen = :Imagen 
                                                 WHERE (idJugador = :IdJugador)");

                $consulta->bindValue(':IdJugador', $obj->idJugador, PDO::PARAM_INT);
                $consulta->bindValue(':Nombre', $obj->nombre, PDO::PARAM_STR);
                $consulta->bindValue(':Puntaje', $obj->puntaje, PDO::PARAM_INT);
                $consulta->bindValue(':PartidasJugadas', $obj->partidasJugadas, PDO::PARAM_INT);
                $consulta->bindValue(':RespCorrectas', $obj->respCorrectas, PDO::PARAM_INT);
                $consulta->bindValue(':RespIncorrectas', $obj->respIncorrectas, PDO::PARAM_INT);
                $consulta->bindValue(':Imagen', $obj->imagen, PDO::PARAM_STR);

                $consulta->execute();
            }
            catch (Exception $e) 
            {
                return FALSE;
            }

            return TRUE;
        }
    }

?>