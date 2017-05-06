<?php
    class Usuario 
    {
        public $id;
        public $nombre;

        public function __construct($id = NULL)
        {
            if ($id !== NULL)
            {
                $usuario = Usuario::TraerUnUsuarioPorId($id);
                $this->id = $usuario->id;
                $this->nombre = $usuario->nombre;
            }
        }

        public static function TraerUnUsuarioPorId($id)
        {
            $objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso();

            $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT * FROM pianojugadores WHERE (id = :id)");

            $consulta->bindValue(':id', $id, PDO::PARAM_INT);

            $consulta->execute();

            if ($consulta->rowCount() != 1)
                return false;

            return $consulta->fetchObject('Usuario');
        }

        public static function TraerUsuarioLogueado($obj)
        {
            $objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso();

            $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT * FROM pianojugadores WHERE (nombre = :nombre)");

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

                $consulta = $objetoAccesoDatos->RetornarConsulta("INSERT INTO pianojugadores (nombre) 
                                                 VALUES (:Nombre)");

                //$consulta->bindValue(':Id', $obj->id, PDO::PARAM_INT);
                $consulta->bindValue(':Nombre', $obj->nombre, PDO::PARAM_STR);             

                $consulta->execute();
            }
            catch (Exception $e) 
            {
                return FALSE;
            }

            return $objetoAccesoDatos->RetornarUltimoIdInsertado();
        }

    }

?>