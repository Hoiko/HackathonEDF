<?php

class Homes extends Controller
{
	public $model;

	public function __construct() {
		$this->load_model('Home');
		$this->model = new Home();
	}

	public function index()
	{
		$this->render('index');
	}
}
