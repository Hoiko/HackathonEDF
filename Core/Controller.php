<?php
class Controller
{
    public $vars = array();
    public $layout = "default";

    function __construct()
    {
        if(isset($_POST))
        {
            $this->set($_POST);
        }
    }

    public function set($data)
    {
        $this->vars  = array_merge($this->vars,$data);
    }

    public function render($filename){
        extract($this->vars);
        ob_start();

        require(ROOT.'views/'.strtolower(get_class($this)).'/'
            .$filename.'.php');

        $content_for_layout = ob_get_clean();

        if($this->layout==false)
        {
            echo $content_for_layout;
        }
        else
        {
            require(ROOT.'views/layout/'.$this->layout.'.php');
        }
    }

    public function check() {
  		if(empty($_SESSION['login'])){
  			header('location: '. WEBROOT . 'Homes/index');
  		}
  	}

    public function load_model($name){
    
        require_once(ROOT.'model/'.$name.'Model.php');
        $this->name = new $name;
    }
}
