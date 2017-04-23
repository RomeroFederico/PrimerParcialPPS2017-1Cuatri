<?php
    class Pregunta 
    {
        public $idPregunta;
        public $pregunta;
        public $resp1;
        public $resp2;
        public $resp3;
        public $resp4;
        public $correcta;
        public $imagenPregunta;

        public function __construct()
        {
        }

        public static function TraerPreguntas()
        {
            $preguntas = array();

            $objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso();

            $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT * FROM preguntas ORDER BY RAND( ) LIMIT 3;");

            $consulta->execute();

            $consulta->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'Pregunta');

            foreach ($consulta as $pregunta)
                array_push($preguntas, $pregunta);

            return $preguntas;
        }
    }

?>