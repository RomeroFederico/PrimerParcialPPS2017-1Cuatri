<?php
    class Usuario 
    {
        public $idJugador;
        public $nombre;
        public $partidas;
        public $partidasGanadas;
        public $partidasEmpatadas;
        public $partidasPerdidas;
        public $jugPiedra;
        public $jugPapel;
        public $jugTijera;
        public $imagen;

        public function __construct($id = NULL)
        {
            if ($id !== NULL)
            {
                $usuario = Usuario::TraerUnUsuarioPorId($id);
                $this->idJugador = $usuario->idJugador;
                $this->nombre = $usuario->nombre;
                $this->partidas = $usuario->partidas;
                $this->partidasGanadas = $usuario->partidasGanadas;
                $this->partidasEmpatadas = $usuario->partidasEmpatadas;
                $this->partidasPerdidas = $usuario->partidasPerdidas;
                $this->jugPiedra = $usuario->jugPiedra;
                $this->jugPapel = $usuario->jugPapel;
                $this->jugTijera = $usuario->jugTijera;
                $this->imagen = $usuario->imagen;
            }
        }

        public static function TraerUnUsuarioPorId($id)
        {
            $objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso();

            $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT * FROM pptjugadores WHERE (idJugador = :id)");

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

            $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT * FROM pptjugadores ORDER BY idJugador");

            $consulta->execute();

            $consulta->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'Usuario');

            foreach ($consulta as $usuario)
                array_push($usuarios, $usuario);

            return $usuarios;
        }

        public static function TraerUsuarioLogueado($obj)
        {
            $objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso();

            $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT * FROM pptjugadores WHERE (nombre = :nombre)");

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

                $consulta = $objetoAccesoDatos->RetornarConsulta("INSERT INTO pptjugadores (nombre, partidas, partidasGanadas, partidasEmpatadas, partidasPerdidas, jugPiedra, jugPapel, jugTijera, imagen) 
                                                 VALUES (:Nombre, :Partidas, :PartidasGanadas, :PartidasEmpatadas, :PartidasPerdidas, :JugPiedra, :JugPapel, :JugTijera, :Imagen)");

                //$consulta->bindValue(':Id', $obj->id, PDO::PARAM_INT);
                $consulta->bindValue(':Nombre', $obj->nombre, PDO::PARAM_STR);
                $consulta->bindValue(':Partidas', $obj->partidas, PDO::PARAM_INT);
                $consulta->bindValue(':PartidasGanadas', $obj->partidasGanadas, PDO::PARAM_INT);
                $consulta->bindValue(':PartidasEmpatadas', $obj->partidasEmpatadas, PDO::PARAM_INT);
                $consulta->bindValue(':PartidasPerdidas', $obj->partidasPerdidas, PDO::PARAM_INT);
                $consulta->bindValue(':JugPiedra', $obj->jugPiedra, PDO::PARAM_INT);
                $consulta->bindValue(':JugPapel', $obj->jugPapel, PDO::PARAM_INT);
                $consulta->bindValue(':JugTijera', $obj->jugTijera, PDO::PARAM_INT);
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

                $consulta = $objetoAccesoDatos->RetornarConsulta("UPDATE pptjugadores SET nombre = :Nombre, partidas = :Partidas, partidasGanadas = :PartidasGanadas, partidasEmpatadas = :PartidasEmpatadas, partidasPerdidas = :PartidasPerdidas, jugPiedra = :JugPiedra, jugPapel = :JugPapel, jugTijera = :JugTijera, imagen = :Imagen 
                                                 WHERE (idJugador = :IdJugador)");

                $consulta->bindValue(':IdJugador', $obj->idJugador, PDO::PARAM_INT);
                $consulta->bindValue(':Nombre', $obj->nombre, PDO::PARAM_STR);
                $consulta->bindValue(':Partidas', $obj->partidas, PDO::PARAM_INT);
                $consulta->bindValue(':PartidasGanadas', $obj->partidasGanadas, PDO::PARAM_INT);
                $consulta->bindValue(':PartidasEmpatadas', $obj->partidasEmpatadas, PDO::PARAM_INT);
                $consulta->bindValue(':PartidasPerdidas', $obj->partidasPerdidas, PDO::PARAM_INT);
                $consulta->bindValue(':JugPiedra', $obj->jugPiedra, PDO::PARAM_INT);
                $consulta->bindValue(':JugPapel', $obj->jugPapel, PDO::PARAM_INT);
                $consulta->bindValue(':JugTijera', $obj->jugTijera, PDO::PARAM_INT);
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